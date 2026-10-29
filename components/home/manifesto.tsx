import Image from "next/image";
import { heroContent } from "@/data/hero";
import { ManifestoMotion } from "@/components/home/manifesto-motion";

const HEADLINE = "I build the whole product, from screen to server.";

const TAGS = [
  { label: "E-Commerce", tone: "tangerine", shape: "round", left: "5%", top: "10%", rot: -8 },
  { label: "Next.js + NestJS", tone: "ink", shape: "block", left: "1%", top: "42%", rot: -3 },
  { label: "POS & ERP", tone: "chalk", shape: "tab", left: "13%", top: "70%", rot: 5 },
  { label: "Payment APIs", tone: "forest", shape: "block", left: "76%", top: "6%", rot: 6 },
  { label: "Conversions", tone: "lilac", shape: "round", left: "80%", top: "50%", rot: -5 },
  { label: "Nairobi", tone: "mint", shape: "tab", left: "70%", top: "84%", rot: 3 },
] as const;

export const Manifesto = () => (
  <section className="site-manifesto" id="about">
    <span className="site-manifesto__label">About</span>

    <h2 className="site-manifesto__headline" aria-label={HEADLINE}>
      {HEADLINE.split(" ").map((word, i) => (
        <span className="site-word-reveal" data-word="" key={i} aria-hidden="true">
          {word}{" "}
        </span>
      ))}
    </h2>

    <p className="site-manifesto__story">{heroContent.story}</p>

    <div className="site-stage">
      <figure className="site-photo" data-photo="">
        <Image
          src={heroContent.profile.image}
          alt={`${heroContent.profile.name}, ${heroContent.profile.role}`}
          width={1000}
          height={1000}
          sizes="(max-width: 820px) 80vw, 480px"
        />
      </figure>

      <svg className="site-ropes" aria-hidden="true" data-ropes="">
        {TAGS.map((tag) => (
          <path key={tag.label} data-rope="" />
        ))}
      </svg>
      {TAGS.map((tag) => (
        <span
          key={`socket-${tag.label}`}
          className="site-socket"
          data-socket=""
          aria-hidden="true"
        />
      ))}

      {TAGS.map((tag) => (
        <span
          key={tag.label}
          className={`site-tag site-tag--${tag.tone} site-tag--${tag.shape}`}
          style={{ left: tag.left, top: tag.top }}
          data-tag=""
          data-rot={tag.rot}
        >
          {tag.label}
        </span>
      ))}
    </div>

    <ManifestoMotion />
  </section>
);
