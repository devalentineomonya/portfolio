import Image from "next/image";
import { workProjects } from "@/data/work";

type Shot = { src: string; title: string; kind: "desktop" | "mobile"; url: string };

/** 7 desktop + 8 mobile screens, interleaved. Index 7 is the hero cell. */
const order: Array<[string, Shot["kind"]]> = [
  ["PBQ Simulator", "mobile"],
  ["Tekobliss", "desktop"],
  ["Arorwet Secondary", "mobile"],
  ["Journaling", "desktop"],
  ["lazyDLP", "mobile"],
  ["Studio", "mobile"],
  ["University Computer Society", "desktop"],
  ["Nine Hertz", "desktop"],
  ["University Computer Society", "mobile"],
  ["Tekobliss", "mobile"],
  ["Journaling", "mobile"],
  ["PBQ Simulator", "desktop"],
  ["Arorwet Secondary", "desktop"],
  ["Nine Hertz", "mobile"],
  ["lazyDLP", "desktop"],
];

const shots: Shot[] = order.map(([title, kind]) => {
  const project = workProjects.find((p) => p.title === title);
  const src = kind === "desktop" ? project?.image : project?.mobileImage;
  if (!project || !src) throw new Error(`Missing ${kind} screenshot: ${title}`);
  return { src, title, kind, url: project.url };
});

export const Archive = () => (
  <section
    className="poster-section h-screen bg-ink divider-grid flex items-center justify-center px-5"
    id="archive"
  >
    <h2
      className="huge-word absolute z-0 text-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      id="archiveWord"
    >
      ARCHIVE
    </h2>
    <div className="archive-grid">
      {shots.map((shot, index) => (
        <a
          key={`${shot.title}-${shot.kind}`}
          className="archive-img group"
          href={shot.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${shot.title} (${shot.kind} preview)`}
        >
          <Image
            alt=""
            className="object-cover object-top"
            src={shot.src}
            fill
            sizes="(max-width: 768px) 30vw, 216px"
            loading="eager"
            priority={index === 7}
          />
          <span className="absolute inset-x-0 bottom-0 bg-black/80 px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {shot.title}
          </span>
        </a>
      ))}
    </div>
    <div className="absolute bottom-0 left-0 right-0 border-t border-white/25 z-10">
      <div className="px-5 md:px-8 py-5 flex items-end justify-between text-white">
        <p className="text-base font-semibold max-w-sm leading-snug">
          From one focused build to a full archive of work.
        </p>
        <p className="text-xs text-white/55 hidden sm:block">
          3 × 5 living gallery
        </p>
      </div>
    </div>
  </section>
);
