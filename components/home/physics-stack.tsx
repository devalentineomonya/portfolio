"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePhysicsBlocks } from "@/components/home/use-physics-blocks";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { label: "E-Commerce Stores", tone: "tangerine" },
  { label: "Payment Integrations", tone: "butter" },
  { label: "High-speed Next.js", tone: "forest" },
  { label: "POS, ERP & CRM", tone: "lilac" },
  { label: "Idea to paying user", tone: "mint" },
] as const;

/** The services as big blocks that drop into a box when it scrolls in and pile into a stack. */
export const PhysicsStack = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  usePhysicsBlocks(layerRef, {
    trigger: (begin) => {
      const st = ScrollTrigger.create({
        trigger: layerRef.current,
        start: "top 70%",
        once: true,
        onEnter: begin,
      });
      return () => st.kill();
    },
    // Nearly one column, so they land on each other instead of side by side.
    spawn: (i, { h }, { width, height }, settled) => ({
      x: width / 2 + gsap.utils.random(-24, 24),
      y: settled ? height - h * (i + 1) : -h - i * 110,
    }),
    ceilingDelay: 4200,
  });

  return (
    <div className="site-stack" ref={layerRef} aria-hidden="true">
      {SERVICES.map((service, i) => (
        <span key={service.label} className={`site-block site-block--${service.tone}`} data-pill="">
          <span className="site-block__num">{String(i + 1).padStart(2, "0")}</span>
          {service.label}
        </span>
      ))}
      <span className="site-hint site-hint--dark" data-hint="">
        throw them around
      </span>
    </div>
  );
};
