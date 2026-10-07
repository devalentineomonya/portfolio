"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll choreography ported 1:1 from the reference: on-load intro, then ten
 * pinned, scrubbed sections. Only the element ids differ (renamed to match this
 * site's content); every value, ease, duration and offset is the reference's.
 */
export const HomeMotion = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loader = document.querySelector<HTMLElement>("#noemaLoader");

    // The loader is React-owned markup: hide it rather than detach it.
    const finishIntro = () => {
      document.body.classList.remove("is-loading");
      if (loader) loader.style.display = "none";
    };

    if (reducedMotion) {
      finishIntro();
      return;
    }

    document.body.classList.add("is-loading");

    // Pinned sections add scroll distance, so a plain #anchor lands in the wrong
    // place. Resolve section anchors to their ScrollTrigger start instead.
    const scrollToSection = (hash: string, smooth: boolean) => {
      const el = document.querySelector(hash);
      if (!el) return false;
      const pinned = ScrollTrigger.getAll().find(
        (t) => t.trigger === el && t.pin,
      );
      const top = pinned
        ? pinned.start
        : el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
      return true;
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (scrollToSection(url.hash, true)) {
        event.preventDefault();
        window.history.pushState(null, "", url.hash);
      }
    };
    document.addEventListener("click", onAnchorClick, true);

    const ctx = gsap.context(() => {
      /* ---------- 0 · on load intro ---------- */
      gsap.set(["#siteNav", "#createcta", "#heroWord", "#heroCopy"], {
        autoAlpha: 0,
      });
      gsap.set(["#card1", "#card2", "#card3"], { autoAlpha: 0 });
      gsap.set(".loader-letter", { yPercent: 115, autoAlpha: 0 });
      gsap.set([".loader-tag", ".loader-meta"], { y: 14, autoAlpha: 0 });
      gsap.set(".loader-mark svg path", {
        strokeDasharray: 80,
        strokeDashoffset: 80,
      });
      gsap.set(".loader-scanline", { scaleX: 0 });

      const onLoadTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          finishIntro();
          ScrollTrigger.refresh();
          if (window.location.hash) {
            requestAnimationFrame(() =>
              scrollToSection(window.location.hash, false),
            );
          }
        },
      });

      onLoadTimeline
        .to(
          ".loader-mark svg path",
          {
            strokeDashoffset: 0,
            duration: 0.62,
            stagger: 0.08,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".loader-letter",
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.64,
            stagger: 0.035,
            ease: "expo.out",
          },
          0.14,
        )
        .to(".loader-tag", { y: 0, autoAlpha: 1, duration: 0.44 }, 0.54)
        .to(".loader-meta", { y: 0, autoAlpha: 1, duration: 0.42 }, 0.66)
        .to(
          ".loader-brand",
          { y: -22, scale: 0.94, duration: 0.52, ease: "power2.inOut" },
          1.05,
        )
        .to(
          ".loader-scanline",
          { scaleX: 1, duration: 0.46, ease: "power2.inOut" },
          1.08,
        )
        .to(
          ".loader-strip",
          {
            scaleY: 1,
            duration: 0.72,
            stagger: { each: 0.065, from: "start" },
            ease: "expo.inOut",
          },
          1.16,
        )
        .to(
          "#noemaLoader",
          { yPercent: -100, duration: 0.76, ease: "expo.inOut" },
          1.82,
        )
        .to(
          ["#siteNav", "#createcta"],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.045,
            ease: "power2.out",
          },
          1.96,
        )
        .fromTo(
          "#heroWord",
          { autoAlpha: 0, y: 36, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.84, ease: "expo.out" },
          1.94,
        )
        .fromTo(
          ["#card1", "#card2", "#card3"],
          { y: 95, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.82,
            ease: "power3.out",
          },
          2.16,
        )
        .fromTo(
          "#heroCopy",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.62, ease: "power2.out" },
          2.38,
        );

      /* ---------- 1 · hero pinned ---------- */
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
        },
      });
      heroTimeline
        .to("#card1", { x: "-16vw", y: "6vh", rotate: -16, ease: "none" }, 0)
        .to("#card3", { x: "16vw", y: "-5vh", rotate: 16, ease: "none" }, 0)
        .to("#card2", { y: "-9vh", rotate: 4, scale: 1.05, ease: "none" }, 0)
        .to("#heroWord", { scale: 1.12, y: "-6vh", ease: "none" }, 0)
        .to("#heroCopy", { autoAlpha: 0, y: 40, ease: "none" }, 0.3);

      /* ---------- 2 · interlude ---------- */
      const interludeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#interlude",
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
        },
      });
      interludeTimeline
        .fromTo(
          "#skillsWord",
          { x: "24vw", rotate: 5 },
          { x: "-58vw", rotate: -3, ease: "none" },
          0,
        )
        .fromTo(
          "#brush1",
          { x: "-8vw", scale: 0.6, rotate: -20 },
          { x: "6vw", scale: 1.15, rotate: 4, ease: "none" },
          0,
        )
        .fromTo(
          "#brush2",
          { y: "14vh", scale: 0.5 },
          { y: "-8vh", scale: 1.1, ease: "none" },
          0,
        )
        .from("#interludeCopy", { autoAlpha: 0, y: 40, ease: "none" }, 0.2);

      /* ---------- 3 · product ---------- */
      const productTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#product",
          start: "top top",
          end: "+=170%",
          scrub: 1,
          pin: true,
        },
      });
      productTimeline
        .fromTo(
          "#casePass",
          { x: "-65vw", y: "24vh", rotate: -32 },
          { x: 0, y: 0, rotate: -7, ease: "none" },
          0,
        )
        .fromTo(
          "#phoneMock",
          { x: "65vw", y: "32vh", rotate: 28 },
          { x: 0, y: 0, rotate: 7, ease: "none" },
          0.08,
        )
        .fromTo(
          "#productWord",
          { y: "8vh", scale: 1.05 },
          { y: "-8vh", scale: 1, ease: "none" },
          0,
        )
        .to("#casePass", { y: "-4vh", rotate: -9, ease: "none" }, 0.7)
        .to("#phoneMock", { y: "4vh", rotate: 9, ease: "none" }, 0.7);

      /* ---------- 4 · manifesto ---------- */
      const messyStarts = [
        { x: "-36vw", y: "-28vh", rotate: -18, scale: 0.78 },
        { x: "26vw", y: "-34vh", rotate: 14, scale: 0.6 },
        { x: "-12vw", y: "32vh", rotate: 24, scale: 0.72 },
        { x: "36vw", y: "26vh", rotate: -22, scale: 0.68 },
        { x: "-42vw", y: "8vh", rotate: 10, scale: 0.58 },
        { x: "18vw", y: "-10vh", rotate: -12, scale: 0.78 },
        { x: "-22vw", y: "-3vh", rotate: 28, scale: 0.62 },
        { x: "42vw", y: "-4vh", rotate: -8, scale: 0.72 },
        { x: "-30vw", y: "24vh", rotate: -16, scale: 0.64 },
        { x: "30vw", y: "30vh", rotate: 18, scale: 0.7 },
      ];

      gsap.set(".manifesto-word", {
        x: (i: number) => messyStarts[i].x,
        y: (i: number) => messyStarts[i].y,
        rotate: (i: number) => messyStarts[i].rotate,
        scale: (i: number) => messyStarts[i].scale,
      });

      const manifestoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#manifesto",
          start: "top top",
          end: "+=170%",
          scrub: 1,
          pin: true,
        },
      });
      manifestoTimeline
        .to(
          ".manifesto-word",
          { x: 0, y: 0, rotate: 0, scale: 1, stagger: 0.025, ease: "none" },
          0,
        )
        .fromTo(
          "#handWord",
          { autoAlpha: 0, x: "-20vw", rotate: -30, scale: 0.5 },
          { autoAlpha: 1, x: 0, rotate: -12, scale: 1, ease: "none" },
          0.55,
        );

      /* ---------- 5 · archive grid ---------- */
      const archiveTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#archive",
          start: "top top",
          end: "+=190%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      archiveTimeline
        .fromTo(
          ".archive-img",
          {
            x: (_i: number, el: HTMLElement) => {
              const parent = el.parentElement!.getBoundingClientRect();
              const rect = el.getBoundingClientRect();
              return (
                parent.left + parent.width / 2 - (rect.left + rect.width / 2)
              );
            },
            y: (_i: number, el: HTMLElement) => {
              const parent = el.parentElement!.getBoundingClientRect();
              const rect = el.getBoundingClientRect();
              return (
                parent.top + parent.height / 2 - (rect.top + rect.height / 2)
              );
            },
            scale: (i: number) => (i === 7 ? 1.9 : 0.24),
            autoAlpha: (i: number) => (i === 7 ? 1 : 0),
            rotate: (i: number) => (i - 7) * 3,
            zIndex: (i: number) => (i === 7 ? 5 : 1),
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            rotate: 0,
            stagger: { each: 0.025, from: "center" },
            ease: "none",
          },
          0,
        )
        .fromTo(
          "#archiveWord",
          { y: "8vh", scale: 1.08 },
          { y: "-8vh", scale: 0.98, ease: "none" },
          0,
        );

      /* ---------- 6 · builder ---------- */
      const builderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#builder",
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
        },
      });
      builderTimeline
        .fromTo(
          "#builderCard",
          { x: "38vw", rotate: 8, scale: 0.9 },
          { x: 0, rotate: 0, scale: 1, ease: "none" },
          0,
        )
        .fromTo(
          "#buildWord",
          { x: "-8vw", y: "7vh" },
          { x: "3vw", y: "-5vh", ease: "none" },
          0,
        )
        .from(
          ".builder-module",
          {
            x: (i: number) => [140, -120, 90, -70, 110][i] || 80,
            y: (i: number) => [-40, 50, 20, -20, 40][i] || 20,
            autoAlpha: 0,
            scale: 0.92,
            stagger: 0.12,
            ease: "none",
          },
          0.18,
        );

      /* ---------- 7 · board ---------- */
      const boardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#board",
          start: "top top",
          end: "+=170%",
          scrub: 1,
          pin: true,
        },
      });
      boardTimeline
        .fromTo(
          ".op-card",
          {
            x: (i: number) => [-260, 80, 240, -120, 180, -200, 130][i] || 0,
            y: (i: number) => [-120, 180, -80, 150, -150, 110, 200][i] || 0,
            rotate: (i: number) => [-16, 12, -9, 18, -14, 8, 15][i] || 0,
            scale: 0.86,
            autoAlpha: 0.35,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.035,
            ease: "none",
          },
          0,
        )
        .fromTo(
          "#boardWord",
          { xPercent: -58, yPercent: -50, rotate: -4 },
          { xPercent: -48, yPercent: -50, rotate: 3, ease: "none" },
          0,
        );

      /* ---------- 8 · process flow ---------- */
      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#process",
          start: "top top",
          end: "+=170%",
          scrub: 1,
          pin: true,
        },
      });
      processTimeline
        .fromTo(
          ".support-step:nth-child(1)",
          { x: "-50vw", y: "8vh", rotate: -9, autoAlpha: 0 },
          { x: 0, y: 0, rotate: 0, autoAlpha: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".support-step:nth-child(2)",
          { scale: 0.62, y: "18vh", autoAlpha: 0 },
          { scale: 1, y: 0, autoAlpha: 1, ease: "none" },
          0.18,
        )
        .fromTo(
          ".support-step:nth-child(3)",
          { x: "50vw", y: "-8vh", rotate: 9, autoAlpha: 0 },
          { x: 0, y: 0, rotate: 0, autoAlpha: 1, ease: "none" },
          0.36,
        )
        .fromTo(
          "#notifyCard",
          { x: "34vw", y: "10vh", rotate: 8, scale: 0.82, autoAlpha: 0 },
          { x: 0, y: 0, rotate: -2, scale: 1, autoAlpha: 1, ease: "none" },
          0.62,
        )
        .fromTo(
          "#processWord",
          { y: "8vh", scale: 1.1 },
          { y: "-7vh", scale: 0.98, ease: "none" },
          0,
        );

      /* ---------- 9 · CTA build-up ---------- */
      const ctaBuildTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#cta-build",
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
        },
      });
      ctaBuildTimeline
        .fromTo(
          "#ideaWord",
          { x: "-110vw", autoAlpha: 1 },
          { x: 0, autoAlpha: 1, ease: "none" },
          0,
        )
        .to("#ideaWord", { x: "110vw", autoAlpha: 0, ease: "none" }, 0.32)
        .to("#wipeRose", { scaleY: 1, ease: "none" }, 0.24)
        .fromTo(
          "#builtWord",
          { y: "110vh", autoAlpha: 1 },
          { y: 0, autoAlpha: 1, ease: "none" },
          0.34,
        )
        .to("#builtWord", { y: "-110vh", autoAlpha: 0, ease: "none" }, 0.64)
        .to("#wipeEmerald", { scaleX: 1, ease: "none" }, 0.58)
        .fromTo(
          "#shippedWord",
          { x: "120vw", autoAlpha: 1 },
          { x: 0, autoAlpha: 1, ease: "none" },
          0.68,
        )
        .to(
          "#shippedWord",
          { scale: 1.12, autoAlpha: 0, ease: "none" },
          0.96,
        );

      /* ---------- 10 · final ---------- */
      const finalTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#join",
          start: "top 85%",
          end: "top 10%",
          scrub: 1,
        },
      });
      finalTimeline
        .fromTo("#joinWord", { y: "14vh" }, { y: 0, ease: "none" }, 0)
        .from(
          ".member",
          { scale: 0, rotate: -20, stagger: 0.06, ease: "none" },
          0.1,
        )
        .from(
          "#yourCardWord",
          { autoAlpha: 0, scale: 0.4, rotate: -40, ease: "none" },
          0.4,
        )
        .from(
          "#handArrow path",
          { strokeDasharray: 200, strokeDashoffset: 200, ease: "none" },
          0.5,
        );

      gsap.to("#card2", {
        y: "+=10",
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
      });
      ScrollTrigger.refresh();
    });

    return () => {
      document.removeEventListener("click", onAnchorClick, true);
      ctx.revert();
      document.body.classList.remove("is-loading");
    };
  }, []);

  return null;
};
