"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** One Lenis instance driven by the GSAP ticker so every ScrollTrigger stays in sync. */
export const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The footer's back-to-top button asks for a smooth ride up.
    const toTop = (e: Event) => {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 1.8 });
    };
    window.addEventListener("site:scroll-top", toTop);

    return () => {
      window.removeEventListener("site:scroll-top", toTop);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
};
