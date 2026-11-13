"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const TANGERINE = "#ff6a2b";
const CHALK = "#f2efe6";

// Rope points per wire, and when (in timeline seconds) the board counts as built and can be played with.
const POINTS = 14;
const BUILT = 4.6;

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
}

/**
 * Scroll motion for the system section. While the board is pinned: the hub appears in the mess,
 * the notes and cables dissolve, each app is pulled into its slot and wired up, Brace walks on,
 * then the hub switches on, the notifications clear and the headline lands. Once it is built the
 * apps and the hub can be dragged around, and the wires swing after them like ropes.
 *
 * CSS paints the starting state (the mess), so nothing depends on GSAP rendering ahead of time.
 */
export const SystemMotion = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".site-system");
    const board = section?.querySelector<HTMLElement>("[data-sys='board']");
    const wires = section?.querySelector<SVGSVGElement>("[data-sys='wires']");
    if (!section || !board || !wires) return;

    const hubSlot = board.querySelector<HTMLElement>("[data-sys='hub-slot']")!;
    const hub = hubSlot.querySelector<HTMLElement>("[data-sys='hub']")!;
    const slots = Array.from(board.querySelectorAll<HTMLElement>("[data-sys='slot']"));
    const apps = Array.from(board.querySelectorAll<HTMLElement>("[data-sys='app']"));
    const spots = apps.map((app) => app.parentElement as HTMLElement);
    const base = Array.from(board.querySelectorAll<SVGPathElement>("[data-sys='wire']"));
    const live = Array.from(board.querySelectorAll<SVGPathElement>("[data-sys='live']"));

    // Distance from where an app lies in the mess to its slot around the hub.
    const dx = (i: number) => slots[i].offsetLeft - spots[i].offsetLeft;
    const dy = (i: number) => slots[i].offsetTop - spots[i].offsetTop;
    const tilt = (el: Element) => Number((el as HTMLElement).dataset.r ?? 0);
    const prop = (el: Element, key: string) => Number(gsap.getProperty(el, key)) || 0;

    // The resting shape of a wire: a soft S-curve from the hub to the slot.
    const curve = (i: number, t: number) => {
      const hx = hubSlot.offsetLeft;
      const hy = hubSlot.offsetTop;
      const tx = slots[i].offsetLeft;
      const ty = slots[i].offsetTop;
      const mx = (hx + tx) / 2;
      const u = 1 - t;
      return {
        x: u * u * u * hx + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * tx,
        y: u * u * u * hy + 3 * u * u * t * hy + 3 * u * t * t * ty + t * t * t * ty,
      };
    };

    const drawCurves = () => {
      wires.setAttribute("viewBox", `0 0 ${board.clientWidth} ${board.clientHeight}`);
      slots.forEach((_slot, i) => {
        const a = curve(i, 0);
        const b = curve(i, 1);
        const mx = (a.x + b.x) / 2;
        const d = `M${a.x} ${a.y}C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
        base[i].setAttribute("d", d);
        live[i].setAttribute("d", d);
      });
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // The board is shown finished and still: CSS handles the rest, the apps just sit in their slots.
      const settle = () => {
        drawCurves();
        apps.forEach((app, i) => gsap.set(app, { x: dx(i), y: dy(i), rotate: 0 }));
      };
      settle();
      const ro = new ResizeObserver(settle);
      ro.observe(board);
      return () => ro.disconnect();
    }

    // ---- Ropes: each wire is a verlet chain pinned to the hub and to its app. ----

    let hubHome = { x: 0, y: 0 };
    let spotHome: { x: number; y: number }[] = [];
    const ropes = slots.map(() => ({ pts: [] as Point[], rest: 0 }));

    const measure = () => {
      wires.setAttribute("viewBox", `0 0 ${board.clientWidth} ${board.clientHeight}`);
      hubHome = { x: hubSlot.offsetLeft, y: hubSlot.offsetTop };
      spotHome = spots.map((s) => ({ x: s.offsetLeft, y: s.offsetTop }));
      ropes.forEach((rope, i) => {
        // Lay the rope along the S-curve with a little slack, so it rests close to that shape.
        rope.pts = Array.from({ length: POINTS }, (_, k) => {
          const p = curve(i, k / (POINTS - 1));
          return { ...p, px: p.x, py: p.y };
        });
        let len = 0;
        for (let k = 1; k < POINTS; k++) {
          len += Math.hypot(rope.pts[k].x - rope.pts[k - 1].x, rope.pts[k].y - rope.pts[k - 1].y);
        }
        rope.rest = len * 1.04;
      });
    };

    const step = (i: number) => {
      const { pts, rest } = ropes[i];
      const ax = hubHome.x + prop(hubSlot, "x");
      const ay = hubHome.y + prop(hubSlot, "y");
      const bx = spotHome[i].x + prop(spots[i], "x") + prop(apps[i], "x");
      const by = spotHome[i].y + prop(spots[i], "y") + prop(apps[i], "y");
      const seg = rest / (POINTS - 1);

      for (let k = 1; k < POINTS - 1; k++) {
        const p = pts[k];
        const vx = (p.x - p.px) * 0.97;
        const vy = (p.y - p.py) * 0.97;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.35;
      }

      for (let iter = 0; iter < 12; iter++) {
        Object.assign(pts[0], { x: ax, y: ay });
        Object.assign(pts[POINTS - 1], { x: bx, y: by });
        for (let k = 0; k < POINTS - 1; k++) {
          const a = pts[k];
          const b = pts[k + 1];
          const ddx = b.x - a.x;
          const ddy = b.y - a.y;
          const dist = Math.hypot(ddx, ddy) || 1e-6;
          const diff = (dist - seg) / dist;
          const wa = k === 0 ? 0 : 1;
          const wb = k + 1 === POINTS - 1 ? 0 : 1;
          const sum = wa + wb;
          if (!sum) continue;
          a.x += (ddx * diff * wa) / sum;
          a.y += (ddy * diff * wa) / sum;
          b.x -= (ddx * diff * wb) / sum;
          b.y -= (ddy * diff * wb) / sum;
        }
      }

      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let k = 1; k < POINTS - 1; k++) {
        const mx = (pts[k].x + pts[k + 1].x) / 2;
        const my = (pts[k].y + pts[k + 1].y) / 2;
        d += ` Q${pts[k].x} ${pts[k].y} ${mx} ${my}`;
      }
      d += ` L${pts[POINTS - 1].x} ${pts[POINTS - 1].y}`;
      base[i].setAttribute("d", d);
      live[i].setAttribute("d", d);
    };

    let onScreen = false;
    const tick = () => {
      if (onScreen) ropes.forEach((_rope, i) => step(i));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(board);
    gsap.ticker.add(tick);

    // ---- Dragging: the apps and the hub, only once the board is built. ----

    const lift = (el: Element, scale: number) =>
      gsap.to(el, { scale, duration: 0.25, ease: "back.out(2)" });

    const draggables = [
      ...spots.map((spot, i) => ({ target: spot, handle: apps[i] })),
      { target: hubSlot, handle: hub },
    ].flatMap(({ target, handle }) =>
      Draggable.create(target, {
        type: "x,y",
        trigger: handle,
        bounds: board,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress: () => lift(handle, 1.08),
        onRelease: () => lift(handle, 1),
      }),
    );
    draggables.forEach((d) => d.disable());

    let built = false;
    const setBuilt = (on: boolean) => {
      if (on === built) return;
      built = on;
      section.toggleAttribute("data-built", on);
      draggables.forEach((d) => (on ? d.enable() : d.disable()));
      // Scrolling back up undoes the rearranging, so the apps head home before the mess returns.
      if (!on) {
        gsap.to([...spots, hubSlot], { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      }
    };

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const notes = q<HTMLElement>("[data-sys='note']");
      const cables = q<SVGElement>("[data-sys='cable']");
      const brace = q<HTMLElement>("[data-sys='brace']");

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
      const hero = document.querySelector(".site-hero");
      if (hero) {
        gsap.to(hero, {
          scale: 0.92,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: true },
        });
      }

      // Brace idles once it is on the board: a wave and the odd blink.
      gsap.to(q(".site-system__brace .b-armr"), {
        rotation: -14,
        svgOrigin: "134 80",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(q(".site-system__brace .b-eyes"), {
        scaleY: 0.1,
        svgOrigin: "80 72",
        duration: 0.08,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3.1,
      });

      // Every tween is a fromTo whose start matches the CSS, so a refresh can safely re-measure.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setBuilt(self.progress * tl.duration() >= BUILT),
        },
      });

      tl
        // The business shows up in the middle of the mess.
        .fromTo(
          hub,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.8)" },
          0.8,
        )
        // The clutter dissolves where it lies.
        .fromTo(
          [...notes, ...cables],
          { opacity: 1, scale: 1, rotate: (_i: number, el: Element) => tilt(el) },
          {
            opacity: 0,
            scale: 0.85,
            rotate: (i, el) => tilt(el) + (i % 2 ? 12 : -12),
            duration: 0.9,
            stagger: 0.08,
            ease: "power1.in",
          },
          1.3,
        )
        // One by one, each app is pulled into its slot and wired to the hub as it lands.
        .fromTo(
          apps,
          { x: 0, y: 0, rotate: (_i: number, el: Element) => tilt(el) },
          {
            x: (i) => dx(i),
            y: (i) => dy(i),
            rotate: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.inOut",
          },
          1.7,
        )
        .fromTo(
          base,
          { strokeDashoffset: 1.02 },
          { strokeDashoffset: 0, duration: 0.7, stagger: 0.18, ease: "power2.out" },
          2.6,
        )
        // Brace strolls in from the right and stops on the wire.
        .fromTo(
          brace,
          { opacity: 1, x: () => board.clientWidth * 0.7 },
          { x: 0, duration: 1.4, ease: "power1.out" },
          4,
        )
        .fromTo(brace, { y: 0 }, { keyframes: { y: [-14, 0, -14, 0, -14, 0] }, duration: 1.4 }, 4)
        // The hub switches on, the signal runs out and the notifications clear.
        .fromTo(hub, { backgroundColor: CHALK }, { backgroundColor: TANGERINE, duration: 0.4 }, 5.5)
        .fromTo(
          live,
          { strokeDashoffset: 1.02 },
          { strokeDashoffset: 0, duration: 0.9, stagger: 0.06, ease: "power2.out" },
          5.6,
        )
        .fromTo(
          q("[data-sys='badge']"),
          { scale: 1 },
          { scale: 0, duration: 0.4, stagger: 0.06, ease: "back.in(2)" },
          6,
        )
        .fromTo(
          apps,
          { scale: 1 },
          { keyframes: { scale: [1.15, 1] }, duration: 0.6, stagger: 0.06 },
          6,
        )
        // The headline lands last.
        .fromTo(
          q("[data-sys='word']"),
          { y: 0, yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "power3.out" },
          6.4,
        )
        .fromTo(
          q("[data-sys='label']"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          6.4,
        )
        .fromTo(
          q("[data-sys='copy'], [data-sys='hint']"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          7,
        )
        .to({}, { duration: 1 });
    }, section);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      draggables.forEach((d) => d.kill());
      section.removeAttribute("data-built");
      ctx.revert();
    };
  }, []);

  return null;
};
