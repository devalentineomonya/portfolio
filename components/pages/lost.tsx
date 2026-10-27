"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Brace } from "@/components/ui/brace";

/** The 404 scene: Brace stands where the zero should be, looking for the way home. */
export const Lost = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-in]", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.to("[data-brace]", {
        y: -14,
        rotate: 2,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Looks left, right, up, then back to the middle, over and over.
      const look = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      [
        [-7, 0],
        [7, -2],
        [0, -7],
        [0, 0],
      ].forEach(([x, y]) =>
        look.to(".b-pupil", { x, y, duration: 0.35, ease: "power2.inOut" }, "+=0.7"),
      );

      gsap.to("[data-q]", {
        y: -22,
        opacity: 0,
        duration: 1.8,
        ease: "sine.out",
        repeat: -1,
        stagger: { each: 0.6, repeat: -1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="site-lost" ref={root}>
      <div className="site-lost__scene" data-in="">
        <span className="site-lost__digit" aria-hidden="true">
          4
        </span>
        <div className="site-lost__brace" data-brace="">
          <Brace />
          <span className="site-lost__q site-lost__q--a" data-q="" aria-hidden="true">
            ?
          </span>
          <span className="site-lost__q site-lost__q--b" data-q="" aria-hidden="true">
            ?
          </span>
          <span className="site-lost__q site-lost__q--c" data-q="" aria-hidden="true">
            ?
          </span>
        </div>
        <span className="site-lost__digit" aria-hidden="true">
          4
        </span>
      </div>

      <h1 className="site-lost__title" data-in="">
        Brace is lost.
      </h1>
      <p className="site-lost__text" data-in="">
        404. That page isn&rsquo;t here, and neither is the way out. Let&rsquo;s head home.
      </p>
      <Link className="site-btn site-btn--solid" href="/" data-in="">
        Back home <ArrowUpRightIcon className="site-btn__icon" strokeWidth={2} />
      </Link>
    </section>
  );
};
