import Link from "next/link";
import type { ReactNode } from "react";
import { stories } from "@/data/stories";
import { getHost, workProjects } from "@/data/work";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Headline, Kicker } from "./parts";

interface BoardCard {
  label: string;
  title: ReactNode;
  meta: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  tone?: "dark" | "accent";
}

const archived = workProjects.filter((p) => p.archived).slice(0, 3);

// Stories fill the first row, older projects the second; "read all" spans both
// rows on the right so the grid closes as a clean rectangle.
const cards: BoardCard[] = [
  ...stories.slice(0, 3).map((story) => ({
    label: `Read · ${story.category}`,
    title: story.title,
    meta: (
      <>
        {story.date}
        <br />
        {story.readTime}
      </>
    ),
    href: story.url,
    external: story.url.startsWith("http"),
  })),
  {
    label: "Writing",
    title: (
      <>
        Read all
        <br />
        my stories
      </>
    ),
    meta: (
      <>
        Every post
        <br />
        /stories
      </>
    ),
    href: "/stories",
    tone: "accent",
    className: "lg:row-span-2",
  },
  ...archived.map((project) => ({
    label: "Older project",
    title: project.title,
    meta: <>{getHost(project.url)}</>,
    href: project.url,
    external: true,
  })),
];

export const Board = () => (
  <section className="home-section text-black" id="board">
    <Kicker index="06" label="Writing & older work" />
    <div className="section-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <Headline text="MORE" className="text-[34vw] md:text-[13vw]" />
        <p className="text-lg font-semibold max-w-xs leading-snug md:mb-3" data-reveal>
          Things I&apos;ve written, and projects I&apos;ve since retired.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => {
          const accent = card.tone === "accent";
          const className = `op-card h-full ${
            accent ? "bg-amber text-black border-black/20" : ""
          }`;
          const body = (
            <>
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.18em] ${
                    accent ? "text-black/55" : "text-white/45"
                  }`}
                >
                  {card.label}
                </p>
                <h3 className="display text-3xl leading-none mt-3">
                  {card.title}
                </h3>
              </div>
              <div
                className={`flex items-end justify-between text-xs ${
                  accent ? "text-black/65" : ""
                }`}
              >
                <span>{card.meta}</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </div>
            </>
          );
          return (
            <div className={card.className} data-reveal key={card.href + card.label}>
              {card.external ? (
                <a
                  className={className}
                  data-tilt
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              ) : (
                <Link className={className} data-tilt href={card.href}>
                  {body}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
