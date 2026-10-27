"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "@/data/hero";
import { experiences } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const TONES = ["lilac", "mint", "butter", "tangerine"] as const;

const stops = experiences.flatMap((exp) =>
  exp.roles.map((role) => ({ company: exp.company, location: exp.location, role })),
);

const pad = (n: number) => String(n).padStart(2, "0");

export const ExperienceTimeline = () => {
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

      gsap.utils.toArray<HTMLElement>("[data-stop]").forEach((stop) => {
        const dot = stop.querySelector("[data-dot]");
        const line = stop.querySelector("[data-line]");
        const card = stop.querySelector("[data-card]");
        const when = stop.querySelector("[data-when]");

        gsap.from([card, when], {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: stop, start: "top 82%", toggleActions: "play none none none" },
        });

        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: stop, start: "top 75%", toggleActions: "play none none none" },
        });

        if (line) {
          // The spine runs from this stop's dot down to the next one, drawn as you scroll.
          gsap.from(line, {
            scaleY: 0,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: { trigger: stop, start: "top 70%", end: "bottom 70%", scrub: 0.5 },
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="site-tl" ref={root}>
      <header className="site-tl__head" data-head="">
        <span className="site-tl__label">Career</span>
        <h1 className="site-tl__headline">Where I&rsquo;ve worked.</h1>
        <p className="site-tl__lede">
          Four teams, five roles. Real clients, real users, and a society that grew 40% while I led
          its build.
        </p>
        <a
          className="site-tl__resume"
          href={heroContent.links.resume}
          target="_blank"
          rel="noreferrer"
        >
          Download resume <span aria-hidden="true">↓</span>
        </a>
      </header>

      <ol className="site-tl__list">
        {stops.map(({ company, location, role }, i) => (
          <li
            className={`site-stop site-stop--${TONES[i % TONES.length]}`}
            key={`${company}-${role.title}`}
            data-stop=""
          >
            <p className="site-stop__when" data-when="">
              <span>{role.dateRange}</span>
              {role.isCurrent && <b>Now</b>}
            </p>

            <div className="site-stop__rail" aria-hidden="true">
              <span className="site-stop__dot" data-dot="" />
              {i < stops.length - 1 && <span className="site-stop__line" data-line="" />}
            </div>

            <article className="site-stop__card" data-card="">
              <span className="site-stop__num">{pad(i + 1)}</span>
              <h2>{company}</h2>
              <p className="site-stop__role">
                {role.title} <span>{role.type}</span>
              </p>
              <p className="site-stop__place">{location}</p>
              <p className="site-stop__text">{role.description}</p>
              {role.technologies && (
                <ul className="site-stop__tech">
                  {role.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>

      <div className="site-tl__end">
        <p>Next chapter&rsquo;s open.</p>
        <a href={heroContent.links.email}>
          Say hello <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};
