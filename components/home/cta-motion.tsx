"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLUG_W = 110;
const PLUG_H = 56;

/**
 * The cable hangs from the ceiling and the plug swings loose. Hover (or focus, or
 * scrolling it into view on touch) pulls the plug into the email socket and Brace winks.
 */
export const CtaMotion = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".site-cta");
    const cable = section?.querySelector<SVGPathElement>("[data-cable]");
    const plug = section?.querySelector<HTMLElement>("[data-plug]");
    const mail = section?.querySelector<HTMLElement>("[data-mail]");
    const headline = section?.querySelector<HTMLElement>(".site-cta__headline");
    const socket = section?.querySelector<HTMLElement>("[data-outlet]");
    const brace = section?.querySelector<SVGElement>("[data-brace]");
    if (!section || !cable || !plug || !mail || !headline || !socket || !brace) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (max-width: 820px)");

    const eyes = brace.querySelectorAll<SVGElement>(".b-eye");
    const pupils = brace.querySelectorAll<SVGElement>(".b-pupil");
    const wink = [eyes[1], pupils[1]].filter(Boolean);
    gsap.set(wink, { svgOrigin: "98 72" });

    // st.lock: 0 swings loose, 1 plugged in. st.slack: how baggy the cable is.
    const st = { x: 0, y: 0, lock: 0, slack: 0 };
    let sock = { x: 0, y: 0 };
    let rest = { x: 0, y: 0 };
    let anchor = { x: 0, y: -12 };
    let visible = true;
    let plugged = false;

    const measure = () => {
      const s = section.getBoundingClientRect();
      const k = socket.getBoundingClientRect();
      sock = { x: k.left - s.left + k.width / 2, y: k.top - s.top + k.height / 2 };
      const small = s.width < 820;
      rest = { x: sock.x + (small ? 60 : 200), y: sock.y - (small ? 120 : 150) };
      anchor = { x: s.width * (small ? 0.82 : 0.9), y: -12 };
    };

    const draw = (time: number) => {
      const wobble = 1 - st.lock;
      const px = st.x + Math.sin(time * 1.1) * 7 * wobble;
      const py = st.y + Math.cos(time * 1.5) * 8 * wobble;

      // Plug sits with its prong tips at (px, py); the cable leaves its right side.
      const tilt = gsap.utils.clamp(-14, 14, (py - sock.y) * 0.05) * wobble;
      plug.style.transform = `translate(${px}px, ${py - PLUG_H / 2}px) rotate(${tilt}deg)`;

      const cx = px + PLUG_W - 12;
      const sag = 60 + st.slack * 90;
      cable.setAttribute(
        "d",
        `M${anchor.x} ${anchor.y} C${anchor.x} ${anchor.y + (py - anchor.y) * 0.6 + sag} ${cx + 70 + st.slack * 50} ${py + sag * 0.2} ${cx} ${py}`,
      );
    };

    const tick = (time: number) => {
      if (!visible) return;
      if (plugged && !gsap.isTweening(st)) {
        st.x = sock.x + 4;
        st.y = sock.y;
      }
      draw(time);
    };

    const wave = () => {
      if (!wink.length) return;
      gsap
        .timeline()
        .to(wink, { scaleY: 0.1, duration: 0.1, ease: "power2.in" })
        .to(wink, { scaleY: 1, duration: 0.18, delay: 0.35, ease: "power2.out" });
    };

    const plugIn = () => {
      if (plugged) return;
      measure();
      plugged = true;
      section.classList.add("is-plugged");
      gsap.to(st, {
        x: sock.x + 4,
        y: sock.y,
        lock: 1,
        slack: 1,
        duration: reduce ? 0 : 0.5,
        ease: "back.out(1.6)",
        overwrite: true,
        onComplete: reduce ? undefined : wave,
      });
    };

    const unplug = () => {
      if (!plugged) return;
      measure();
      plugged = false;
      section.classList.remove("is-plugged");
      gsap.to(st, {
        x: rest.x,
        y: rest.y,
        lock: 0,
        slack: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.45)",
        overwrite: true,
      });
    };

    const ctx = gsap.context(() => {
      measure();
      st.x = rest.x;
      st.y = rest.y;

      if (reduce) {
        plugIn();
        draw(0);
        return;
      }

      // The cable drops in from above when the panel arrives.
      gsap.from(st, {
        y: () => rest.y - 420,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: section, start: "top 55%", once: true },
      });

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

      if (touch.matches) {
        ScrollTrigger.create({
          trigger: mail,
          start: "top 80%",
          onEnter: plugIn,
        });
      }

      gsap.ticker.add(tick);
    }, section);

    // Hovering the email or the "Plug me in." headline plugs in; leaving both unplugs.
    const hot = new Set<Element>();
    const enter = (el: Element) => () => {
      hot.add(el);
      plugIn();
    };
    const leave = (el: Element) => () => {
      hot.delete(el);
      window.setTimeout(() => {
        if (!hot.size) unplug();
      }, 60);
    };
    const targets = [mail, headline];
    const handlers = targets.map((el) => ({ el, enter: enter(el), leave: leave(el) }));
    handlers.forEach(({ el, enter: on, leave: off }) => {
      el.addEventListener("pointerenter", on);
      el.addEventListener("pointerleave", off);
    });
    mail.addEventListener("focus", plugIn);
    mail.addEventListener("blur", unplug);

    const ro = new ResizeObserver(() => {
      measure();
      if (plugged) {
        st.x = sock.x + 4;
        st.y = sock.y;
      } else if (!gsap.isTweening(st)) {
        st.x = rest.x;
        st.y = rest.y;
      }
      if (reduce) draw(0);
    });
    ro.observe(section);
    ro.observe(mail);
    document.fonts?.ready.then(measure);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(section);

    return () => {
      gsap.ticker.remove(tick);
      handlers.forEach(({ el, enter: on, leave: off }) => {
        el.removeEventListener("pointerenter", on);
        el.removeEventListener("pointerleave", off);
      });
      mail.removeEventListener("focus", plugIn);
      mail.removeEventListener("blur", unplug);
      ro.disconnect();
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
};
