"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Rows slide in on scroll; a browser-frame preview follows the cursor and swaps per project. */
export const WorkMotion = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".site-work");
    const list = section?.querySelector<HTMLElement>("[data-work-list]");
    const preview = section?.querySelector<HTMLElement>("[data-preview]");
    if (!section || !list || !preview) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));
    const images = Array.from(preview.querySelectorAll<HTMLElement>(".site-preview__img"));

    const ctx = gsap.context(() => {
      if (!reduce) {
        // The green arrives with the stroke: the panel starts narrow and opens out to full width.
        gsap.fromTo(
          section,
          { clipPath: "inset(0% 14% 0% 14% round 44px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 44px)",
            ease: "none",
            clearProps: "clipPath",
            scrollTrigger: { trigger: section, start: "top 95%", end: "top 30%", scrub: true },
          },
        );

        gsap.from(rows, {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: list, start: "top 80%", once: true },
        });
      }

      gsap.set(preview, { scale: 0, opacity: 0, xPercent: 0, rotation: 0 });
      gsap.set(images, { opacity: 0 });

      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });
      const rotTo = gsap.quickTo(preview, "rotation", { duration: 0.5, ease: "power3.out" });

      let settle = 0;
      let shown = false;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!shown) {
          gsap.set(preview, { x: e.clientX + 32, y: e.clientY - 130 });
          shown = true;
        }
        xTo(e.clientX + 32);
        yTo(e.clientY - 130);
        rotTo(gsap.utils.clamp(-10, 10, e.movementX * 0.6));
        window.clearTimeout(settle);
        settle = window.setTimeout(() => rotTo(0), 90);
      };

      const show = (index: number) => {
        images.forEach((img, i) => gsap.to(img, { opacity: i === index ? 1 : 0, duration: 0.25 }));
        gsap.to(preview, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });
      };

      const hide = () => {
        shown = false;
        gsap.to(preview, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          overwrite: "auto",
        });
      };

      const enterHandlers = rows.map((row, i) => {
        const fn = (e: PointerEvent) => {
          if (e.pointerType === "mouse") show(i);
        };
        row.addEventListener("pointerenter", fn);
        return () => row.removeEventListener("pointerenter", fn);
      });

      list.addEventListener("pointermove", onMove, { passive: true });
      list.addEventListener("pointerleave", hide);

      return () => {
        window.clearTimeout(settle);
        enterHandlers.forEach((fn) => fn());
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerleave", hide);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return null;
};
