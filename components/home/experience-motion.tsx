"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The dark panel opens up, then the film strip is pinned and pulled sideways as you scroll. */
export const ExperienceMotion = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".site-exp");
    const rail = section?.querySelector<HTMLElement>("[data-rail]");
    const strip = section?.querySelector<HTMLElement>("[data-strip]");
    if (!section || !rail || !strip) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
      section.classList.add("is-pinned");

      gsap.fromTo(
        section,
        { clipPath: "inset(0% 14% 0% 14% round 44px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 44px)",
          ease: "none",
          clearProps: "clipPath",
          scrollTrigger: { trigger: section, start: "top 95%", end: "top top", scrub: true },
        },
      );

      // Stop with the last frame a gutter away from the right edge.
      const distance = () => {
        const gutter = parseFloat(getComputedStyle(rail).paddingRight) || 0;
        return Math.max(0, strip.scrollWidth - rail.clientWidth + gutter);
      };

      gsap.to(strip, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      return () => section.classList.remove("is-pinned");
    });

    return () => mm.revert();
  }, []);

  return null;
};
