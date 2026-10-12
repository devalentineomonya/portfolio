"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  SCENES,
  blendInto,
  hexToRgb,
  rgbCss,
  ringProjects,
  scene,
  toBlend,
  type Blend,
  type Rgb,
  type SceneName,
} from "./scene";

/** Sections after the hero, in page order, with the scene each one shows. */
const SCENE_ORDER: Array<[string, SceneName]> = [
  ["#interlude", "interlude"],
  ["#product", "product"],
  ["#archive", "archive"],
  ["#manifesto", "manifesto"],
  ["#builder", "builder"],
  ["#board", "board"],
  ["#process", "process"],
  ["#join", "join"],
];

/** Scroll distance per project while the work ring turns. */
const WORK_STEP = 55;

const smooth = (t: number) => t * t * (3 - 2 * t);

const VIOLET = hexToRgb("#6d27da");
const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const lerpRgb = (into: Rgb, from: Rgb, to: Rgb, t: number) => {
  for (let i = 0; i < 3; i++) into[i] = from[i] + (to[i] - from[i]) * t;
};

/**
 * Background colour after one section's entry. Dark to light (or back) goes
 * through violet: a straight blend would pass through muddy grey.
 */
const blendBackground = (bg: Rgb, to: Rgb, t: number) => {
  if (Math.abs(luminance(bg) - luminance(to)) < 90) {
    lerpRgb(bg, bg.slice() as Rgb, to, t);
  } else if (t < 0.5) {
    lerpRgb(bg, bg.slice() as Rgb, VIOLET, t * 2);
  } else {
    lerpRgb(bg, VIOLET, to, t * 2 - 1);
  }
};

const copyBlend = (into: Blend, from: Blend) => {
  Object.assign(into, from, { bg: into.bg, ink: into.ink });
  for (let i = 0; i < 3; i++) {
    into.bg[i] = from.bg[i];
    into.ink[i] = from.ink[i];
  }
};

/**
 * All home page motion. Two systems:
 * - Section motion: the loader, four pinned scenes (hero, skills, work ring,
 *   about) and one shared reveal for everything else: headline letters rise
 *   out of their line, blocks tilt up into place. Nothing flies in sideways.
 * - The scene director: every frame it reads scroll progress and blends the
 *   background colour, grid colour and 3D ring state between sections.
 */
export const HomeMotion = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loader = document.querySelector<HTMLElement>("#noemaLoader");
    const backdrop = document.querySelector<HTMLElement>("#homeBackdrop");
    const grid = document.querySelector<HTMLElement>("#homeGrid");

    const lenis = reducedMotion ? null : new Lenis({ lerp: 0.085 });
    const onLenisFrame = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onLenisFrame);
      gsap.ticker.lagSmoothing(0);
    }

    // The loader is React-owned markup: hide it rather than detach it.
    const finishIntro = () => {
      document.body.classList.remove("is-loading");
      if (loader) loader.style.display = "none";
      lenis?.start();
    };

    // Pinned sections add scroll distance, so a plain #anchor lands in the wrong
    // place. Resolve section anchors to their ScrollTrigger start instead.
    const scrollToSection = (hash: string, animate: boolean) => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return false;
      const pinned = ScrollTrigger.getAll().find(
        (t) => t.trigger === el && t.pin,
      );
      const top = pinned
        ? pinned.start
        : el.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(top, { immediate: !animate, duration: 1.6 });
      else window.scrollTo({ top, behavior: animate ? "smooth" : "auto" });
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

    const removeTilt: Array<() => void> = [];
    let heroPin: ScrollTrigger | undefined;
    let workPin: ScrollTrigger | undefined;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        finishIntro();
        scene.intro = 1;
      } else {
        lenis?.stop();
        document.body.classList.add("is-loading");

        /* ---------- 0 · on load intro ---------- */
        gsap.set(
          ["#siteNav", "#createcta", "#heroWord", "#heroCopy", "#heroAbout"],
          { autoAlpha: 0 },
        );
        gsap.set(".loader-letter", { yPercent: 115, autoAlpha: 0 });
        gsap.set([".loader-tag", ".loader-meta"], { y: 14, autoAlpha: 0 });
        gsap.set(".loader-mark svg path", {
          strokeDasharray: 80,
          strokeDashoffset: 80,
        });
        gsap.set(".loader-scanline", { scaleX: 0 });

        gsap
          .timeline({
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
          })
          .to(
            ".loader-mark svg path",
            { strokeDashoffset: 0, duration: 0.62, stagger: 0.08, ease: "power2.out" },
            0,
          )
          .to(
            ".loader-letter",
            { yPercent: 0, autoAlpha: 1, duration: 0.64, stagger: 0.035, ease: "expo.out" },
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
          // the ring spins in from small and fast as the loader lifts
          .to(scene, { intro: 1, duration: 1.4, ease: "power2.out" }, 1.82)
          .to(
            ["#siteNav", "#createcta"],
            { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.045, ease: "power2.out" },
            1.96,
          )
          .fromTo(
            "#heroWord",
            { autoAlpha: 0, y: 36, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.84, ease: "expo.out" },
            1.94,
          )
          .fromTo(
            "#heroCopy",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.62, ease: "power2.out" },
            2.3,
          )
          .fromTo(
            "#heroAbout",
            { y: -24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.62, ease: "power2.out" },
            2.38,
          );

        /* ---------- 1 · hero: the camera flies through the ring ---------- */
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          },
        });
        const out = { immediateRender: false, ease: "none" };
        heroTimeline
          .fromTo(
            "#heroWord",
            { scale: 1, autoAlpha: 1 },
            { scale: 1.3, autoAlpha: 0, ...out, ease: "power1.in" },
            0,
          )
          .fromTo("#heroAbout", { y: 0, autoAlpha: 1 }, { y: -40, autoAlpha: 0, ...out }, 0)
          .fromTo("#heroCopy", { y: 0, autoAlpha: 1 }, { y: 40, autoAlpha: 0, ...out }, 0);
        heroPin = heroTimeline.scrollTrigger;

        /* ---------- 2 · skills marquee ---------- */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#interlude",
              start: "top top",
              end: "+=120%",
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            "#skillsWord",
            { x: "24vw", rotate: 4 },
            {
              // Travel far enough that the whole phrase ends inside the viewport.
              x: () => {
                const word = document.querySelector<HTMLElement>("#skillsWord");
                return word ? window.innerWidth * 0.94 - word.offsetWidth : 0;
              },
              rotate: -2,
              ease: "none",
            },
            0,
          )
          .fromTo(
            "#interludeCopy",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, ease: "none", duration: 0.3 },
            0.15,
          );

        /* ---------- 3 · work: the ring turns one project per step ---------- */
        workPin = ScrollTrigger.create({
          trigger: "#archive",
          start: "top top",
          end: `+=${(ringProjects.length - 1) * WORK_STEP}%`,
          pin: true,
        });

        /* ---------- 4 · about: the sentence flips up word by word ---------- */
        // The words start while the section scrolls in, so the pin never
        // opens on an empty screen.
        const aboutPin = ScrollTrigger.create({
          trigger: "#manifesto",
          start: "top top",
          end: "+=90%",
          pin: true,
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#manifesto",
              start: "top 55%",
              end: () => aboutPin.end - window.innerHeight * 0.2,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            ".manifesto-word",
            {
              yPercent: 70,
              rotationX: -85,
              autoAlpha: 0,
              transformPerspective: 700,
              transformOrigin: "50% 100%",
            },
            { yPercent: 0, rotationX: 0, autoAlpha: 1, stagger: 0.05, ease: "power2.out" },
            0,
          )
          .fromTo(
            "#handWord",
            { autoAlpha: 0, scale: 0.6, rotate: -24 },
            { autoAlpha: 1, scale: 1, rotate: -12, ease: "back.out(2)", duration: 0.25 },
            ">-0.1",
          );

        /* ---------- one reveal for every other section ---------- */
        gsap.utils.toArray<HTMLElement>(".home-section").forEach((section) => {
          if (section.id === "hero") return;
          const chars = section.querySelectorAll(".headline-char");
          const blocks = section.querySelectorAll("[data-reveal]");
          if (!chars.length && !blocks.length) return;
          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 22%",
              scrub: 0.8,
            },
          });
          if (chars.length) {
            reveal.fromTo(
              chars,
              { yPercent: 112 },
              { yPercent: 0, stagger: 0.035, ease: "power3.out" },
              0,
            );
          }
          if (blocks.length) {
            reveal.fromTo(
              blocks,
              {
                y: 90,
                rotationX: -24,
                autoAlpha: 0,
                transformPerspective: 1100,
                transformOrigin: "50% 100%",
              },
              { y: 0, rotationX: 0, autoAlpha: 1, stagger: 0.08, ease: "power2.out" },
              0.12,
            );
          }
        });

        /* ---------- finale ---------- */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#join",
              start: "top 85%",
              end: "top 15%",
              scrub: 1,
            },
          })
          .fromTo("#joinWord", { yPercent: 40 }, { yPercent: 0, ease: "none" }, 0)
          .fromTo(
            "#yourCardWord",
            { autoAlpha: 0, scale: 0.4, rotate: -40 },
            { autoAlpha: 1, scale: 1, rotate: -12, ease: "none" },
            0.4,
          );

        /* ---------- hover tilt on cards (mouse only) ---------- */
        if (window.matchMedia("(hover: hover)").matches) {
          gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 900 });
            const toX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
            const toY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
            const onMove = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect();
              toY(((event.clientX - rect.left) / rect.width - 0.5) * 12);
              toX(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
            };
            const onLeave = () => {
              toX(0);
              toY(0);
            };
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerleave", onLeave);
            removeTilt.push(() => {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerleave", onLeave);
            });
          });
        }
      }

      /* ---------- scene director (runs with reduced motion too) ---------- */
      // Created last so every pin above is already in the layout it measures.
      const entries = SCENE_ORDER.map(([selector, name]) => ({
        state: toBlend(SCENES[name]),
        trigger: ScrollTrigger.create({
          trigger: selector,
          start: "top 85%",
          end: "top 15%",
        }),
      }));
      const heroState = toBlend(SCENES.hero);
      const heroOut = toBlend(SCENES.heroOut);
      const mix = toBlend(SCENES.hero);
      const background: Rgb = [...mix.bg];
      const workItems = gsap.utils.toArray<HTMLElement>("[data-work-item]");
      const workRows = gsap.utils.toArray<HTMLElement>("[data-work-row]");
      const last = ringProjects.length - 1;
      let active = 0;
      let lastBg = "";
      let lastInk = "";

      const direct = () => {
        copyBlend(mix, heroState);
        if (heroPin) blendInto(mix, heroOut, smooth(heroPin.progress));
        for (let i = 0; i < 3; i++) background[i] = mix.bg[i];
        for (const entry of entries) {
          const p = entry.trigger.progress;
          if (p <= 0) continue;
          blendInto(mix, entry.state, smooth(p));
          blendBackground(background, entry.state.bg, smooth(p));
        }
        copyBlend(scene.target, mix);

        const bg = rgbCss(background);
        if (bg !== lastBg && backdrop) backdrop.style.backgroundColor = bg;
        lastBg = bg;
        const ink = rgbCss(mix.ink);
        if (ink !== lastInk && grid) grid.style.color = ink;
        lastInk = ink;

        // Hold on each project for the first half of its step, then turn.
        if (workPin) {
          const raw = workPin.progress * last;
          const base = Math.min(Math.floor(raw), last);
          const turn = smooth(Math.min(1, Math.max(0, (raw - base - 0.45) / 0.55)));
          scene.focus = Math.min(last, base + turn);
        }
        const next = Math.round(scene.focus);
        if (next !== active) {
          active = next;
          workItems.forEach((el, i) => (el.dataset.active = String(i === active)));
          workRows.forEach((el, i) => (el.dataset.active = String(i === active)));
        }
      };
      gsap.ticker.add(direct);
      direct();

      ScrollTrigger.refresh();
      return () => gsap.ticker.remove(direct);
    });

    return () => {
      document.removeEventListener("click", onAnchorClick, true);
      removeTilt.forEach((remove) => remove());
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(onLenisFrame);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      }
      scene.intro = 0;
      document.body.classList.remove("is-loading");
    };
  }, []);

  return null;
};
