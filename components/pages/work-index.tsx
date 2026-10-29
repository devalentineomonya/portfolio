"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getHost, workProjects } from "@/data/work";

gsap.registerPlugin(Flip, ScrollTrigger);

const projects = workProjects.filter((p) => !p.archived);
const TONES = ["lilac", "mint", "butter", "tangerine"] as const;
const ALL = "all";

/** Most-used technologies first, so the chips that filter the most come first. */
const topTech = Object.entries(
  projects
    .flatMap((p) => p.technologies)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([tech]) => tech);

const categories = Array.from(new Set(projects.map((p) => p.category)));

export const WorkIndex = () => {
  const [category, setCategory] = useState(ALL);
  const [tech, setTech] = useState(ALL);
  const root = useRef<HTMLDivElement>(null);
  const before = useRef<Flip.FlipState | null>(null);
  const first = useRef(true);

  const visible = useMemo(
    () =>
      new Set(
        projects
          .filter(
            (p) =>
              (category === ALL || p.category === category) &&
              (tech === ALL || p.technologies.includes(tech)),
          )
          .map((p) => p.title),
      ),
    [category, tech],
  );

  const cards = () => gsap.utils.toArray<HTMLElement>("[data-card]", root.current);

  // Remember where every card is, then let React hide or show them.
  const choose = (apply: () => void) => {
    before.current = Flip.getState(cards());
    apply();
  };

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!before.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      before.current = null;
      return;
    }

    Flip.from(before.current, {
      targets: cards(),
      duration: 0.7,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    before.current = null;
  }, [category, tech]);

  // Header and cards arrive as they scroll into view.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-head] > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.set(cards(), { opacity: 0, y: 60 });
      ScrollTrigger.batch(cards(), {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="site-wi" ref={root}>
      <header className="site-wi__head" data-head="">
        <span className="site-wi__label">Work</span>
        <h1 className="site-wi__headline">Client work &amp; systems.</h1>
        <p className="site-wi__lede">
          High-performance Next.js websites, e-commerce stores, clinic platforms and custom business
          systems. Engineered for speed, payment integrations and customer conversions.
        </p>
      </header>

      <div className="site-wi__filters" role="group" aria-label="Filter projects">
        <div>
          <span className="site-wi__legend">Type</span>
          <div className="site-wi__chips">
            {[ALL, ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className="site-chip"
                aria-pressed={category === c}
                onClick={() => choose(() => setCategory(c))}
              >
                {c === ALL ? "All" : c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="site-wi__legend">Stack</span>
          <div className="site-wi__chips">
            {[ALL, ...topTech].map((t) => (
              <button
                key={t}
                type="button"
                className="site-chip"
                aria-pressed={tech === t}
                onClick={() => choose(() => setTech(t))}
              >
                {t === ALL ? "Any" : t}
              </button>
            ))}
          </div>
        </div>
        <p className="site-wi__count" aria-live="polite">
          Showing {visible.size} of {projects.length}
        </p>
      </div>

      <ul className="site-wi__grid">
        {projects.map((p, i) => (
          <li
            key={p.title}
            data-card=""
            className={`site-pcard site-pcard--${TONES[i % TONES.length]}${p.featured ? " site-pcard--featured" : ""}${
              visible.has(p.title) ? "" : " is-hidden"
            }`}
          >
            <a
              className="site-pcard__stage"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.title}`}
            >
              <div className="site-browser">
                <div className="site-browser__bar">
                  <i />
                  <i />
                  <i />
                  <span>{getHost(p.url)}</span>
                </div>
                {p.image && (
                  <Image
                    src={p.image}
                    alt=""
                    width={1440}
                    height={900}
                    sizes="(max-width: 820px) 100vw, 50vw"
                    className="site-browser__img"
                  />
                )}
              </div>
              {(p.mobileImage ?? p.image) && (
                <div className="site-phone">
                  <Image
                    src={(p.mobileImage ?? p.image)!}
                    alt=""
                    width={390}
                    height={844}
                    sizes="140px"
                  />
                </div>
              )}
            </a>

            <div className="site-pcard__body">
              <div className="site-pcard__meta">
                <span>{p.category}</span>
                {p.year && <span>{p.year}</span>}
                <span>{p.status ?? "Live"}</span>
              </div>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <ul className="site-pcard__tech">
                {p.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a
                className="site-pcard__link"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {getHost(p.url)}
                <ArrowUpRightIcon className="site-btn__icon" strokeWidth={2} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      {visible.size === 0 && (
        <p className="site-wi__empty">
          Nothing matches that mix.{" "}
          <button
            type="button"
            onClick={() =>
              choose(() => {
                setCategory(ALL);
                setTech(ALL);
              })
            }
          >
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
};
