import Link from "next/link";
import type { ReactNode } from "react";
import { stories } from "@/data/stories";
import { getHost, workProjects } from "@/data/work";
import { ArrowUpRightIcon } from "@/components/ui/icons";

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

const cards: BoardCard[] = [
  ...stories.map((story) => ({
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
  ...archived.map((project, index) => ({
    label: "Older project",
    title: project.title,
    meta: (
      <>
        {getHost(project.url)}
      </>
    ),
    href: project.url,
    external: true,
    // 4th card of the second row: the row starts one column in, as in the reference
    className: index === 1 ? "lg:col-start-2" : undefined,
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
  },
];

export const Board = () => (
  <section
    className="poster-section min-h-screen bg-lilac divider-grid dark-lines px-5 md:px-8 pt-28 pb-16 flex items-center"
    id="board"
  >
    <h2
      className="huge-word absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      id="boardWord"
    >
      MORE
    </h2>
    <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const rose = card.tone === "accent";
        const className = `op-card ${card.className ?? ""} ${
          rose ? "bg-amber text-black border-black/20" : ""
        }`;
        const body = (
          <>
            <div>
              <p
                className={`text-xs uppercase tracking-[0.18em] ${
                  rose ? "text-black/55" : "text-white/45"
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
                rose ? "text-black/65" : ""
              }`}
            >
              <span>{card.meta}</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </div>
          </>
        );
        return card.external ? (
          <a
            key={card.href + card.label}
            className={className}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {body}
          </a>
        ) : (
          <Link key={card.href + card.label} className={className} href={card.href}>
            {body}
          </Link>
        );
      })}
    </div>
    <svg
      className="absolute inset-0 w-full h-full z-[2] opacity-40 pointer-events-none"
      fill="none"
      stroke="black"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path
        d="M90 220 C 360 110, 690 420, 1040 190"
        strokeDasharray="6 10"
      ></path>
      <path
        d="M120 680 C 420 520, 760 740, 1160 480"
        strokeDasharray="6 10"
      ></path>
    </svg>
  </section>
);
