"use client";

import { useEffect, useState } from "react";
import { ThinkingOrb, type OrbSize, type OrbState } from "thinking-orbs";
import { heroContent } from "@/data/hero";

const STATES: OrbState[] = ["searching", "connecting", "weaving", "working"];

/** Top-centre availability pill: an orb that keeps changing shape beside the status. */
export const RoleOrb = () => {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState<OrbSize>(64);

  // A smaller orb on phones so the pill stays compact.
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 560px)");
    const update = () => setSize(phone.matches ? 32 : 64);
    update();
    phone.addEventListener("change", update);
    return () => phone.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % STATES.length), 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <a className="site-role" href={heroContent.links.email} data-hero="fade">
      <ThinkingOrb
        state={STATES[index]}
        size={size}
        theme="light"
        color="#151515"
        aria-hidden="true"
      />
      <span>Taking on projects</span>
    </a>
  );
};
