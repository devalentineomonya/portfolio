"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Brace } from "@/components/ui/brace";

/**
 * One stroke that runs the whole way down the services, work and trail sections.
 * It sits behind the green work panel, so Brace disappears into the panel and
 * comes out the other side. Its tip follows the scroll position.
 */
export const RunPath = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const braceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const brace = braceRef.current;
    const wrap = svg?.parentElement;
    if (!svg || !path || !brace || !wrap) return;

    const small = window.matchMedia("(max-width: 820px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const legL = brace.querySelector<SVGElement>(".b-legl");
    const legR = brace.querySelector<SVGElement>(".b-legr");
    if (legL) gsap.set(legL, { svgOrigin: "62 130" });
    if (legR) gsap.set(legR, { svgOrigin: "98 130" });

    let length = 0;
    let table: { len: number; y: number }[] = [];
    let current = 0;
    let visible = true;

    const build = () => {
      if (small.matches) {
        path.setAttribute("d", "");
        length = 0;
        return;
      }
      const walkEl = wrap.querySelector<HTMLElement>(".site-walk");
      const workEl = wrap.querySelector<HTMLElement>(".site-work");
      const trailEl = wrap.querySelector<HTMLElement>(".site-trail");
      if (!walkEl || !workEl || !trailEl) return;

      const wr = wrap.getBoundingClientRect();
      const walk = walkEl.getBoundingClientRect();
      const work = workEl.getBoundingClientRect();
      const trail = trailEl.getBoundingClientRect();

      const W = wr.width;
      svg.setAttribute("viewBox", `0 0 ${W} ${wr.height}`);

      // Stretch 1: the services path, ending a little way inside the panel's top edge.
      const wl = walk.left - wr.left;
      const wt = walk.top - wr.top;
      const panelTop = work.top - wr.top;
      const sx = walk.width / 600;
      const sy = (panelTop + 75 - wt) / 940;
      const ax = (x: number) => wl + x * sx;
      const ay = (y: number) => wt + y * sy;

      // Stretch 3: the trail below the panel.
      const k = W / 1440;
      const trailTop = trail.top - wr.top;
      const tx = (x: number) => x * k;
      const ty = (y: number) => trailTop + y * k;

      const endX = ax(420);
      const endY = ay(940);
      const nextX = tx(900);
      const nextY = ty(-30);
      const gap = nextY - endY;

      const d = [
        `M${ax(-40)} ${ay(130)}`,
        `C${ax(170)} ${ay(40)} ${ax(360)} ${ay(90)} ${ax(350)} ${ay(250)}`,
        `C${ax(340)} ${ay(400)} ${ax(90)} ${ay(380)} ${ax(130)} ${ay(540)}`,
        `C${ax(170)} ${ay(700)} ${ax(430)} ${ay(620)} ${endX} ${endY}`,
        // Stretch 2: behind the panel. Nobody sees it, it only joins the two ends.
        `C${endX} ${endY + gap * 0.4} ${nextX} ${nextY - gap * 0.4} ${nextX} ${nextY}`,
        `C${tx(900)} ${ty(53)} ${tx(820)} ${ty(86)} ${tx(700)} ${ty(125)}`,
        `S${tx(440)} ${ty(185)} ${tx(490)} ${ty(264)}`,
        `S${tx(760)} ${ty(343)} ${tx(900)} ${ty(422)}`,
      ].join(" ");
      path.setAttribute("d", d);

      length = path.getTotalLength();
      // Height-to-length table, kept monotonic so a binary search can find the tip for a scroll position.
      table = [];
      let top = -Infinity;
      for (let i = 0; i <= 600; i++) {
        const len = (i / 600) * length;
        top = Math.max(top, path.getPointAtLength(len).y);
        table.push({ len, y: top });
      }
    };

    const targetLength = () => {
      if (!length) return 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      // The tip rides a little below the middle of the screen and ends level with the page bottom.
      const anchor = window.scrollY + window.innerHeight * (0.55 + 0.4 * progress) - wrapTop;

      let lo = 0;
      let hi = table.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (table[mid].y < anchor) lo = mid + 1;
        else hi = mid;
      }
      return table[lo].len;
    };

    const draw = () => {
      path.style.strokeDasharray = `${current} ${length + 10}`;
      const p = path.getPointAtLength(current);
      const w = brace.offsetWidth;
      const h = brace.offsetHeight;
      brace.style.transform = `translate(${p.x - w / 2}px, ${p.y - h * 0.97}px)`;
      const swing = Math.sin(current / 38) * 26;
      if (legL) gsap.set(legL, { rotation: swing });
      if (legR) gsap.set(legR, { rotation: -swing });
    };

    const tick = (_t: number, delta: number) => {
      if (!visible || !length) return;
      const ease = 1 - Math.pow(0.0005, delta / 1000);
      current += (targetLength() - current) * ease;
      draw();
    };

    build();
    if (reduce) {
      current = length;
      draw();
    } else {
      gsap.ticker.add(tick);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) {
        current = length;
        draw();
      }
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <svg className="site-run__svg" ref={svgRef} aria-hidden="true">
        <path
          ref={pathRef}
          fill="none"
          stroke="#0E5A43"
          strokeWidth="44"
          strokeLinecap="round"
          strokeDasharray="0 99999"
        />
      </svg>
      <div className="site-run__brace" ref={braceRef} aria-hidden="true">
        <Brace />
      </div>
    </>
  );
};
