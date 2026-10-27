"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/** The mind-map draws itself as you scroll: hub, trunks, nodes, then each branch's twigs and leaves. */
export const ProcessMotion = () => {
  useEffect(() => {
    const map = document.querySelector<HTMLElement>("[data-map]");
    if (!map) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 821px)", () => {
      const pop = { scale: 0, ease: "back.out(2)", duration: 0.5, transformOrigin: "50% 50%" };
      const trunks = gsap.utils.toArray<SVGPathElement>("[data-trunk]", map);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", map);
      const branches = gsap.utils.toArray<HTMLElement>(".site-branch", map);
      const twigGroups = gsap.utils.toArray<SVGGElement>("svg [data-branch]", map);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: map, start: "top 80%", end: "bottom 85%", scrub: 0.6 },
      });

      tl.from(map.querySelector("[data-hub]"), { ...pop, rotation: -12 }, 0);

      trunks.forEach((trunk, i) => {
        const at = 0.4 + i * 0.5;
        tl.from(trunk, { drawSVG: "0%", duration: 0.9 }, at);
        tl.from(nodes[i], { ...pop, rotation: i % 2 ? 6 : -6 }, at + 0.8);

        const twigs = twigGroups[i].querySelectorAll("[data-twig]");
        const leaves = branches[i].querySelectorAll("[data-leaf]");
        twigs.forEach((twig, j) => {
          tl.from(twig, { drawSVG: "0%", duration: 0.5 }, at + 1.3 + j * 0.25);
          tl.from(leaves[j], { ...pop, rotation: j % 2 ? -8 : 8 }, at + 1.7 + j * 0.25);
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
};
