"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brace } from "@/components/ui/brace";

gsap.registerPlugin(ScrollTrigger);

const WORD = "valentine.";

/** The loader only plays on a fresh page load, not when you navigate back home. */
let played = false;

/** Skip the loader when this visit already played it, or when we arrived by an in-site link. */
const skipLoader = () => played || (typeof window !== "undefined" && "siteNavigated" in window);

/**
 * Opening loader plus the hero entrance and the idle motion that follows it.
 * Hero elements are found by `data-hero` so the hero itself stays a server component.
 */
export const Intro = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-hero="${name}"]`);
    const html = document.documentElement;

    if (reduce) {
      root.style.display = "none";
      return;
    }

    let cancelled = false;
    let skipTimer = 0;
    html.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const count = root.querySelector<HTMLElement>("[data-count]");
      const walker = root.querySelector<HTMLElement>("[data-walker]");
      const word = root.querySelector<HTMLElement>("[data-word]");
      const chrome = root.querySelectorAll("[data-chrome]");
      const legL = root.querySelector(".b-legl");
      const legR = root.querySelector(".b-legr");

      if (skipLoader()) {
        root.style.display = "none";
        html.style.overflow = "";
        idle();
        // The loader normally starts the hero reveal; here the blocks just need their cue.
        skipTimer = window.setTimeout(() => window.dispatchEvent(new Event("site:hero-in")), 150);
        return;
      }
      played = true;

      // Start state for everything the hero reveals. The loader covers it meanwhile.
      gsap.set(hero("letter"), { yPercent: 115 });
      gsap.set(hero("fade"), { y: 28, opacity: 0 });
      gsap.set(hero("panel"), { scale: 0.7, rotate: -6, opacity: 0, transformOrigin: "50% 100%" });
      gsap.set(hero("nav"), { yPercent: 220 });

      const legTweens = [
        gsap.to(legL, {
          rotation: 28,
          svgOrigin: "62 130",
          duration: 0.22,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        }),
        gsap.to(legR, {
          rotation: -28,
          svgOrigin: "98 130",
          duration: 0.22,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        }),
      ];
      gsap.to(root.querySelector(".b-eyes"), {
        scaleY: 0.1,
        svgOrigin: "80 72",
        duration: 0.08,
        yoyo: true,
        repeat: -1,
        repeatDelay: 1.4,
      });

      const heroIn = gsap
        .timeline()
        .to(hero("letter"), { yPercent: 0, duration: 1.1, stagger: 0.07, ease: "power4.out" })
        .to(
          hero("fade"),
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=0.8",
        )
        .to(
          hero("panel"),
          { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
          "-=0.9",
        )
        .to(hero("nav"), { yPercent: 0, duration: 0.8, ease: "power3.out" }, "-=0.7");

      // Lets the skill blocks start dropping as the hero reveals.
      heroIn.eventCallback("onStart", () => window.dispatchEvent(new Event("site:hero-in")));

      const progress = { p: 0 };
      const master = gsap.timeline({ paused: true });
      master
        .to(progress, {
          p: 1,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => {
            root.style.setProperty("--p", String(progress.p));
            if (count) count.textContent = String(Math.round(progress.p * 100)).padStart(3, "0");
          },
        })
        .add(() => {
          legTweens.forEach((t) => t.pause());
          gsap.to([legL, legR], { rotation: 0, svgOrigin: "80 130", duration: 0.2 });
        })
        .to(walker, { y: -56, duration: 0.28, ease: "power2.out", yoyo: true, repeat: 1 })
        .to(word, { y: -36, opacity: 0, duration: 0.5, ease: "power2.in" }, "<0.2")
        .to(chrome, { opacity: 0, duration: 0.4 }, "<")
        .to(
          root,
          {
            borderBottomLeftRadius: "50% 12vh",
            borderBottomRightRadius: "50% 12vh",
            duration: 0.4,
          },
          ">-0.05",
        )
        .to(root, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "<")
        .add(heroIn, "-=0.55")
        .add(() => {
          root.style.display = "none";
          html.style.overflow = "";
          ScrollTrigger.refresh();
          idle();
        });

      function idle() {
        gsap.to("[data-hero-brace] .b-armr", {
          rotation: -14,
          svgOrigin: "134 80",
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to("[data-hero-brace] .b-eyes", {
          scaleY: 0.1,
          svgOrigin: "80 72",
          duration: 0.08,
          yoyo: true,
          repeat: -1,
          repeatDelay: 2.6,
        });
        gsap.to(".site-word", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".site-manifesto",
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }

      // Wait for the display fonts so the wordmark does not reflow mid-intro.
      document.fonts.ready.then(() => {
        if (!cancelled) master.play();
      });
    }, root);

    // Eyes on the mascot and the logo sign-off follow the pointer.
    const rigs = gsap.utils.toArray<SVGSVGElement>("[data-eyes]").map((svg) => ({
      svg,
      pupils: Array.from(svg.querySelectorAll<SVGElement>(".b-pupil")).map((el) => ({
        el,
        eye: el.previousElementSibling as SVGElement,
        x: gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" }),
      })),
    }));

    const onMove = (e: PointerEvent) => {
      for (const { svg, pupils } of rigs) {
        const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
        for (const p of pupils) {
          const r = p.eye.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const angle = Math.atan2(dy, dx);
          const reach = Math.min(6, Math.hypot(dx, dy) / (scale * 10));
          p.x(Math.cos(angle) * reach);
          p.y(Math.sin(angle) * reach);
        }
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(skipTimer);
      window.removeEventListener("pointermove", onMove);
      html.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="site-loader"
      ref={rootRef}
      aria-hidden="true"
      // Already played this visit: render it hidden so it never flashes on a client-side return to Home.
      style={skipLoader() ? { display: "none" } : undefined}
    >
      <div className="site-loader__word" data-word="">
        <span className="site-loader__outline">{WORD}</span>
        <span className="site-loader__fill">{WORD}</span>
      </div>
      <div className="site-loader__track" data-chrome="">
        <div className="site-loader__walker" data-walker="">
          <Brace />
        </div>
        <span className="site-loader__line" />
      </div>
      <div className="site-loader__meta" data-chrome="">
        <span>Loading portfolio</span>
        <span data-count="">000</span>
      </div>
    </div>
  );
};
