"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// When each slide starts wiping in, in timeline units. A wipe takes WIPE units.
const STARTS = [0, 1.7, 3.6, 5.5];
const WIPE = 0.6;

/**
 * Scroll motion for the services slides. The stack is pinned (CSS sticky) while you scroll: each
 * slide wipes in over the last and Brace acts the service out. CSS paints every scene finished,
 * which is also the reduced-motion view; this rewinds them first.
 */
export const ServicesMotion = () => {
  useEffect(() => {
    const stack = document.querySelector<HTMLElement>("[data-slides]");
    if (!stack || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const pick = (i: number, key: string) =>
        Array.from(slides[i].querySelectorAll<HTMLElement>(`[data-s='${key}']`));
      const arm = (i: number) => slides[i].querySelectorAll(".b-armr");

      // Rewind every scene to its opening frame.
      // Parked just past the right edge, far enough that the dark leading edge stays hidden too.
      gsap.set(slides.slice(1), { xPercent: 100, x: 12 });
      gsap.set(stack.querySelectorAll(".b-armr"), { svgOrigin: "134 80" });
      gsap.set(pick(0, "ask"), { opacity: 1, scale: 1 });
      gsap.set(pick(0, "got"), { opacity: 0, scale: 0.3 });
      gsap.set(pick(0, "ring"), { opacity: 0, scale: 0.9 });
      gsap.set(pick(1, "cables"), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(pick(1, "check"), { scale: 0 });
      gsap.set(pick(2, "layer"), { yPercent: -420, opacity: 0 });
      gsap.set(pick(3, "step"), { opacity: 0, scale: 0.6 });
      gsap.set(pick(3, "arrow"), { scaleX: 0 });
      gsap.set(pick(3, "note"), { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(pick(3, "coin"), { opacity: 0, y: 16, scale: 0.4 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stack, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      const wave = (i: number, angles: number[], at: number, duration: number) =>
        tl.to(arm(i), { keyframes: { rotation: angles }, duration, ease: "sine.inOut" }, at);

      // A slide comes in from the right while the one under it drifts back a little.
      STARTS.slice(1).forEach((at, k) => {
        const i = k + 1;
        tl.to(slides[i], { xPercent: 0, x: 0, duration: WIPE, ease: "power2.inOut" }, at).to(
          slides[i - 1],
          { xPercent: -15, duration: WIPE, ease: "power2.inOut" },
          at,
        );
      });

      // 01 E-commerce: "?" turns into "!" and one product gets ordered.
      // Starts a beat after the card settles, so the first scene is not missed.
      wave(0, [-30, 0, -30, 0], 0.3, 0.9);
      tl.to(pick(0, "ask"), { opacity: 0, scale: 0.4, duration: 0.15 }, 0.55)
        .to(pick(0, "got"), { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, 0.65)
        .to(pick(0, "pick"), { keyframes: { scale: [1.08, 1.04] }, duration: 0.3 }, 0.85)
        .to(pick(0, "ring"), { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.9);

      // 02 Payments: both cables plug in, then each side confirms.
      const s1 = STARTS[1] + WIPE + 0.1;
      wave(1, [-24, 0, -24, 0], s1, 0.8);
      tl.to(pick(1, "cables"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 }, s1).to(
        pick(1, "check"),
        { scale: 1, duration: 0.25, stagger: 0.15, ease: "back.out(3)" },
        s1 + 0.55,
      );

      // 03 Business systems: database, then API, then the apps land on the stack.
      const s2 = STARTS[2] + WIPE + 0.1;
      wave(2, [-30, 0, -30, 0, -30, 0], s2, 1);
      tl.to(
        pick(2, "layer"),
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: { each: 0.3, from: "end" },
          ease: "bounce.out",
        },
        s2,
      );

      // 04 Launch: the plan goes up on the board and the first customers pay.
      const s3 = STARTS[3] + WIPE + 0.1;
      wave(3, [-34, -10, -34, 0], s3, 0.9);
      tl.to(
        pick(3, "step"),
        { opacity: 1, scale: 1, duration: 0.25, stagger: 0.2, ease: "back.out(2)" },
        s3,
      )
        .to(pick(3, "arrow"), { scaleX: 1, duration: 0.2, stagger: 0.2 }, s3 + 0.15)
        .to(pick(3, "note"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35 }, s3 + 0.65)
        .to(
          pick(3, "coin"),
          { opacity: 1, y: 0, scale: 1, duration: 0.25, stagger: 0.1, ease: "back.out(3)" },
          s3 + 0.85,
        )
        .to({}, { duration: 1.2 });
    }, stack);

    return () => ctx.revert();
  }, []);

  return null;
};
