"use client";

import { useRef } from "react";
import gsap from "gsap";
import Matter from "matter-js";
import { usePhysicsBlocks } from "@/components/home/use-physics-blocks";

const PILLS = [
  { label: "Front end", tone: "butter", shape: "round" },
  { label: "Back end", tone: "mint", shape: "block" },
  { label: "DevOps", tone: "lilac", shape: "tab" },
  { label: "React", tone: "tangerine", shape: "round" },
  { label: "Next.js", tone: "chalk", shape: "block" },
  { label: "NestJS", tone: "mint", shape: "tab" },
  { label: "React Native", tone: "butter", shape: "block" },
  { label: "Docker", tone: "lilac", shape: "round" },
] as const;

/** Brace is plain SVG, so give the physics a hidden block where its head is. */
const braceHead = (layer: HTMLElement) => {
  const art = layer.parentElement?.querySelector<HTMLElement>(".site-panel__brace");
  if (!art) return [];
  const lr = layer.getBoundingClientRect();
  const ar = art.getBoundingClientRect();
  const ratio = lr.width / layer.offsetWidth || 1;
  const k = ar.width / ratio / 160;
  const left = (ar.left - lr.left) / ratio;
  const top = (ar.top - lr.top) / ratio;
  return [
    Matter.Bodies.rectangle(left + 80 * k, top + 80 * k, 100 * k, 100 * k, {
      isStatic: true,
      chamfer: { radius: 40 * k },
      friction: 0.2,
    }),
  ];
};

/**
 * Skill blocks that drop into the hero panel, stack on each other and on Brace's head,
 * and can be grabbed and thrown.
 */
export const PhysicsPills = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  usePhysicsBlocks(layerRef, {
    // The intro fires this as the hero reveals.
    trigger: (begin) => {
      window.addEventListener("site:hero-in", begin, { once: true });
      return () => window.removeEventListener("site:hero-in", begin);
    },
    spawn: (i, { w, h }, { width, height }, settled) => ({
      x: gsap.utils.random(w / 2 + 12, Math.max(w / 2 + 13, width - w / 2 - 12)),
      y: settled ? gsap.utils.random(20, height / 2) : -h - i * 74,
    }),
    statics: braceHead,
  });

  return (
    <div className="site-physics" ref={layerRef}>
      {PILLS.map((pill) => (
        <span
          key={pill.label}
          className={`site-pill site-pill--${pill.tone} site-pill--${pill.shape}`}
          data-pill=""
        >
          {pill.label}
        </span>
      ))}
      <span className="site-hint" data-hint="">
        drag the blocks
      </span>
    </div>
  );
};
