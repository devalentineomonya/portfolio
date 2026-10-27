"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import Matter from "matter-js";

interface Options {
  /** Subscribe to whatever releases the blocks. Call `begin` once and return a cleanup. */
  trigger: (begin: () => void) => () => void;
  /** First position of block `i`, in the layer's own coordinates. */
  spawn: (
    i: number,
    size: { w: number; h: number },
    layer: { width: number; height: number },
    settled: boolean,
  ) => { x: number; y: number };
  /** Fixed bodies the blocks can land on, such as a mascot's head. Rebuilt on resize. */
  statics?: (layer: HTMLElement) => Matter.Body[];
  /** Ms after the drop before a ceiling keeps thrown blocks inside. */
  ceilingDelay?: number;
}

/**
 * Turns every `[data-pill]` inside the layer into a Matter body: they drop, stack,
 * and can be grabbed and thrown. The DOM elements follow the bodies each frame.
 */
export const usePhysicsBlocks = (ref: RefObject<HTMLElement | null>, options: Options) => {
  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;

    const { Engine, Bodies, Body, Composite, Constraint } = Matter;
    const pills = Array.from(layer.querySelectorAll<HTMLElement>("[data-pill]"));
    const hint = layer.querySelector<HTMLElement>("[data-hint]");
    const engine = Engine.create({ gravity: { x: 0, y: 1.15 } });
    const bodies: Matter.Body[] = [];

    let width = layer.offsetWidth;
    let height = layer.offsetHeight;
    let walls: Matter.Body[] = [];
    let fixed: Matter.Body[] = [];
    let ceiling: Matter.Body | null = null;
    let started = false;
    let visible = true;
    let ceilingTimer = 0;

    const buildWalls = () => {
      if (walls.length) Composite.remove(engine.world, walls);
      const opts = { isStatic: true, friction: 0.6 };
      walls = [
        Bodies.rectangle(width / 2, height + 100, width * 3, 200, opts),
        Bodies.rectangle(-100, 0, 200, 8000, opts),
        Bodies.rectangle(width + 100, 0, 200, 8000, opts),
      ];
      Composite.add(engine.world, walls);
    };

    const buildFixed = () => {
      if (fixed.length) Composite.remove(engine.world, fixed);
      fixed = options.statics?.(layer) ?? [];
      Composite.add(engine.world, fixed);
    };

    const buildCeiling = () => {
      if (ceiling) Composite.remove(engine.world, ceiling);
      ceiling = Bodies.rectangle(width / 2, -100, width * 3, 200, { isStatic: true });
      Composite.add(engine.world, ceiling);
    };

    const render = () => {
      pills.forEach((el, i) => {
        const b = bodies[i];
        if (!b) return;
        el.style.transform = `translate3d(${b.position.x - el.offsetWidth / 2}px, ${b.position.y - el.offsetHeight / 2}px, 0) rotate(${b.angle}rad)`;
      });
    };

    const tick = (_time: number, delta: number) => {
      if (!visible || !started) return;
      Engine.update(engine, Math.min(delta, 16.667));
      for (const b of bodies) {
        // A hard throw can tunnel out. Put strays back above the floor.
        if (b.position.y > height + 150 || b.position.x < -150 || b.position.x > width + 150) {
          Body.setPosition(b, { x: width / 2, y: 40 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      }
      render();
    };

    const start = (settled: boolean) => {
      if (started) return;
      started = true;
      width = layer.offsetWidth;
      height = layer.offsetHeight;
      buildWalls();
      buildFixed();

      pills.forEach((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const at = options.spawn(i, { w, h }, { width, height }, settled);
        bodies.push(
          Bodies.rectangle(at.x, at.y, w, h, {
            chamfer: { radius: Math.min(h / 2, 14) },
            restitution: 0.25,
            friction: 0.5,
            frictionAir: 0.01,
            angle: gsap.utils.random(-0.5, 0.5),
          }),
        );
      });
      Composite.add(engine.world, bodies);
      layer.dataset.ready = "";

      if (settled) {
        for (let i = 0; i < 400; i++) Engine.update(engine, 16);
      }
      render();

      ceilingTimer = window.setTimeout(buildCeiling, settled ? 0 : (options.ceilingDelay ?? 3200));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopTrigger = reduce ? () => {} : options.trigger(() => start(false));
    if (reduce) start(true);

    gsap.ticker.add(tick);

    // Drag: a spring joins the pointer to the block, so it swings and collides like a real object.
    const toLocal = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      const ratio = r.width / layer.offsetWidth || 1;
      return { x: (e.clientX - r.left) / ratio, y: (e.clientY - r.top) / ratio };
    };

    const cleanups = pills.map((el, i) => {
      let joint: Matter.Constraint | null = null;

      const down = (e: PointerEvent) => {
        const body = bodies[i];
        if (!body || joint) return;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-dragging");
        if (hint) hint.style.opacity = "0";
        const p = toLocal(e);
        joint = Constraint.create({
          pointA: p,
          bodyB: body,
          pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
          stiffness: 0.2,
          damping: 0.12,
          length: 0,
        });
        Composite.add(engine.world, joint);
      };
      const move = (e: PointerEvent) => {
        if (joint) joint.pointA = toLocal(e);
      };
      const up = () => {
        if (!joint) return;
        Composite.remove(engine.world, joint);
        joint = null;
        el.classList.remove("is-dragging");
      };

      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
      };
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(layer);

    const ro = new ResizeObserver(() => {
      if (!started) return;
      width = layer.offsetWidth;
      height = layer.offsetHeight;
      buildWalls();
      buildFixed();
      if (ceiling) buildCeiling();
    });
    ro.observe(layer);

    return () => {
      window.clearTimeout(ceilingTimer);
      stopTrigger();
      gsap.ticker.remove(tick);
      cleanups.forEach((fn) => fn());
      io.disconnect();
      ro.disconnect();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
    // Options are read once; the layer's blocks never change after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
