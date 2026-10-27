"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const POINTS = 14;

interface Rope {
  pts: { x: number; y: number; px: number; py: number }[];
  path: SVGPathElement;
  socket: HTMLElement;
  tag: HTMLElement;
  length: number;
}

/** Scroll motion for the manifesto: word reveal, tilting photo, tags that drift in and can be dragged. */
export const ManifestoMotion = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".site-manifesto");
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draggables: Draggable[] = [];
    const stage = section.querySelector<HTMLElement>(".site-stage");
    const photo = section.querySelector<HTMLElement>("[data-photo]");
    const ropeSvg = section.querySelector<SVGElement>("[data-ropes]");
    const tagEls = Array.from(section.querySelectorAll<HTMLElement>("[data-tag]"));
    const paths = Array.from(section.querySelectorAll<SVGPathElement>("[data-rope]"));
    const sockets = Array.from(section.querySelectorAll<HTMLElement>("[data-socket]"));

    // Each tag is tied to the photo by a verlet rope: both ends are pinned, the middle sags and swings.
    let frozen = false;
    let ropesOn = false;
    let onScreen = true;
    const ropes: Rope[] = tagEls.map((tag, i) => ({
      tag,
      path: paths[i],
      socket: sockets[i],
      length: 0,
      pts: [],
    }));

    const ends = (rope: Rope) => {
      const sr = stage!.getBoundingClientRect();
      const pr = photo!.getBoundingClientRect();
      const tr = rope.tag.getBoundingClientRect();
      const tx = tr.left + tr.width / 2 - sr.left;
      const ty = tr.top + tr.height / 2 - sr.top;
      const l = pr.left - sr.left;
      const r = pr.right - sr.left;
      const t = pr.top - sr.top;
      const b = pr.bottom - sr.top;
      let ax = Math.min(Math.max(tx, l), r);
      let ay = Math.min(Math.max(ty, t), b);
      if (tx > l && tx < r && ty > t && ty < b) {
        // Tag is over the photo: anchor on whichever edge is closest.
        const d = [tx - l, r - tx, ty - t, b - ty];
        const m = Math.min(...d);
        if (m === d[0]) ax = l;
        else if (m === d[1]) ax = r;
        else if (m === d[2]) ay = t;
        else ay = b;
      }
      return { ax, ay, tx, ty };
    };

    const initRope = (rope: Rope) => {
      const { ax, ay, tx, ty } = ends(rope);
      rope.length = Math.hypot(tx - ax, ty - ay) * 1.25 + 30;
      rope.pts = Array.from({ length: POINTS }, (_, k) => {
        const f = k / (POINTS - 1);
        const x = ax + (tx - ax) * f;
        const y = ay + (ty - ay) * f;
        return { x, y, px: x, py: y };
      });
    };

    const stepRope = (rope: Rope) => {
      const { ax, ay, tx, ty } = ends(rope);
      if (!frozen) rope.length = Math.hypot(tx - ax, ty - ay) * 1.3 + 50;
      const seg = rope.length / (POINTS - 1);
      const { pts } = rope;

      for (let i = 1; i < POINTS - 1; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * 0.985;
        const vy = (p.y - p.py) * 0.985;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.6;
      }

      for (let iter = 0; iter < 10; iter++) {
        Object.assign(pts[0], { x: ax, y: ay });
        Object.assign(pts[POINTS - 1], { x: tx, y: ty });
        for (let i = 0; i < POINTS - 1; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - seg) / d;
          const wa = i === 0 ? 0 : 1;
          const wb = i + 1 === POINTS - 1 ? 0 : 1;
          const sum = wa + wb;
          if (!sum) continue;
          a.x += (dx * diff * wa) / sum;
          a.y += (dy * diff * wa) / sum;
          b.x -= (dx * diff * wb) / sum;
          b.y -= (dy * diff * wb) / sum;
        }
      }

      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < POINTS - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q${pts[i].x} ${pts[i].y} ${mx} ${my}`;
      }
      d += ` L${pts[POINTS - 1].x} ${pts[POINTS - 1].y}`;
      rope.path.setAttribute("d", d);
      rope.socket.style.transform = `translate(${ax - 9}px, ${ay - 9}px)`;
    };

    const tickRopes = () => {
      if (ropesOn && onScreen) ropes.forEach(stepRope);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    if (stage) io.observe(stage);

    const refreeze = () => {
      ropes.forEach((rope) => {
        const { ax, ay, tx, ty } = ends(rope);
        rope.length = Math.hypot(tx - ax, ty - ay) * 1.25 + 30;
      });
      frozen = true;
    };

    const ro = new ResizeObserver(() => {
      if (frozen && stage && photo) refreeze();
    });
    if (stage) ro.observe(stage);

    const teardown = () => {
      gsap.ticker.remove(tickRopes);
      io.disconnect();
      ro.disconnect();
    };

    if (reduce) {
      // No motion: tags stay where CSS puts them, ropes are drawn once, already settled.
      if (!stage || !photo) return teardown;
      gsap.set([ropeSvg, ...sockets], { opacity: 1 });
      const frame = requestAnimationFrame(() => {
        ropes.forEach(initRope);
        refreeze();
        for (let i = 0; i < 200; i++) ropes.forEach(stepRope);
      });
      return () => {
        cancelAnimationFrame(frame);
        teardown();
      };
    }

    gsap.ticker.add(tickRopes);

    const ctx = gsap.context(() => {
      gsap.set([ropeSvg, ...sockets], { opacity: 0 });

      // The yellow rises over the sticky hero as a dome that flattens once it covers the screen.
      const dome = `50% ${Math.round(window.innerHeight * 0.14)}px`;
      gsap.fromTo(
        section,
        { borderTopLeftRadius: dome, borderTopRightRadius: dome },
        {
          borderTopLeftRadius: "0% 0px",
          borderTopRightRadius: "0% 0px",
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: true },
        },
      );
      gsap.to(".site-hero", {
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: true },
      });

      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".site-manifesto__headline",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        "[data-photo]",
        { rotate: -9, yPercent: 14, scale: 0.88 },
        {
          rotate: 2,
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".site-stage",
            start: "top bottom",
            end: "center 60%",
            scrub: true,
          },
        },
      );

      const tags = gsap.utils.toArray<HTMLElement>("[data-tag]");
      gsap.set(tags, {
        opacity: 0,
        scale: 0.4,
        x: () => gsap.utils.random(-260, 260),
        y: () => gsap.utils.random(-220, 220),
        rotate: () => gsap.utils.random(-70, 70),
      });

      gsap.to(tags, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: (_i, el: HTMLElement) => Number(el.dataset.rot ?? 0),
        duration: 1.1,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".site-stage",
          start: "top 70%",
          once: true,
          onEnter: () => {
            // Start the ropes while the tags are still flying in, so they whip around behind them.
            ropes.forEach(initRope);
            ropesOn = true;
            gsap.to([ropeSvg, ...sockets], { opacity: 1, duration: 0.5 });
          },
        },
        onComplete: () => {
          refreeze();
          draggables.push(
            ...Draggable.create(tags, {
              type: "x,y",
              bounds: section,
              onPress() {
                gsap.to(this.target, { scale: 1.08, rotate: 0, duration: 0.2 });
              },
              onRelease() {
                gsap.to(this.target, {
                  scale: 1,
                  rotate: Number((this.target as HTMLElement).dataset.rot ?? 0),
                  duration: 0.4,
                  ease: "back.out(2)",
                });
              },
            }),
          );
        },
      });
    }, section);

    return () => {
      teardown();
      draggables.forEach((d) => d.kill());
      ctx.revert();
    };
  }, []);

  return null;
};
