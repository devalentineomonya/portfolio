"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAMES: Record<string, string> = {
  "/": "Home",
  "/work": "Work",
  "/experience": "Experience",
  "/stories": "Stories",
};

/**
 * Page transition: a forest curtain (with a tangerine edge) wipes up over the page,
 * the route changes behind it, then it lifts away. Internal links are intercepted.
 */
export const PageCurtain = () => {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const covered = useRef(false);
  const target = useRef<string | null>(null);

  useEffect(() => {
    const el = curtain.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { yPercent: 100, display: "none" });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element).closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || covered.current)
        return;

      e.preventDefault();
      covered.current = true;
      // Tells the home intro this visit already started, so its loader will not play on arrival.
      Object.assign(window, { siteNavigated: true });
      target.current = url.pathname;
      if (label.current) label.current.textContent = NAMES[url.pathname] ?? "";

      gsap.set(el, { display: "grid", yPercent: 100 });
      gsap.to(el, {
        yPercent: 0,
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
      gsap.fromTo(
        label.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.35, ease: "power3.out" },
      );
    };

    // Capture phase: next/link marks the click as handled before a bubbling listener would see it.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has rendered: jump to the top, then lift the curtain.
  useEffect(() => {
    const el = curtain.current;
    if (!el || !covered.current || pathname !== target.current) return;

    window.scrollTo(0, 0);
    gsap.to(el, {
      yPercent: -100,
      duration: 0.8,
      delay: 0.35,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(el, { display: "none", yPercent: 100 });
        covered.current = false;
        target.current = null;
      },
    });
  }, [pathname]);

  return (
    <div className="site-curtain" ref={curtain} aria-hidden="true">
      <span className="site-curtain__label" ref={label} />
    </div>
  );
};
