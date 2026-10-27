"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { stories } from "@/data/stories";

gsap.registerPlugin(ScrollTrigger);

const TONES = ["butter", "lilac", "mint", "tangerine"] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export const StoriesIndex = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-head] > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.utils.toArray<HTMLElement>("[data-story]").forEach((story) => {
        gsap.from(story, {
          y: 70,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: story, start: "top 85%", toggleActions: "play none none none" },
        });
        // The cover drifts a little against the scroll.
        gsap.fromTo(
          story.querySelector("[data-glyph]"),
          { yPercent: -14 },
          {
            yPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="site-st" ref={root}>
      <header className="site-st__head" data-head="">
        <span className="site-st__label">Stories</span>
        <h1 className="site-st__headline">Notes from the build.</h1>
        <p className="site-st__lede">
          What I&rsquo;m learning about software, and writing down along the way.
        </p>
      </header>

      <ol className="site-st__list">
        {stories.map((story, i) => {
          const live = story.url !== "#";
          const Tag = live ? "a" : "div";
          const link = live
            ? { href: story.url, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <li key={story.title} data-story="">
              <Tag className={`site-story site-story--${TONES[i % TONES.length]}`} {...link}>
                <div className="site-story__cover" aria-hidden="true">
                  <span className="site-story__glyph" data-glyph="">
                    {pad(i + 1)}
                  </span>
                  <span className="site-story__cat">{story.category}</span>
                </div>

                <div className="site-story__body">
                  <p className="site-story__meta">
                    <span>{story.date}</span>
                    <span>{story.readTime}</span>
                    {!live && <b>Coming soon</b>}
                  </p>
                  <h2>{story.title}</h2>
                  <p className="site-story__text">{story.description}</p>
                  <ul className="site-story__tags">
                    {story.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {live && (
                    <span className="site-story__read">
                      Read it <ArrowUpRightIcon className="site-btn__icon" strokeWidth={2} />
                    </span>
                  )}
                </div>
              </Tag>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
