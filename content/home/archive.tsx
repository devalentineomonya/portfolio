import { getHost } from "@/data/work";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Headline, Kicker } from "./parts";
import { ringProjects } from "./scene";

const total = String(ringProjects.length).padStart(2, "0");

/**
 * The screens themselves are the 3D ring (stage.tsx); scrolling turns it one
 * project at a time. This layer names the project in front and lists them all.
 */
export const Archive = () => (
  <section className="home-section h-svh text-white" id="archive">
    <Kicker index="03" label="Selected work" />
    <Headline
      text="MY WORK"
      className="absolute left-5 md:left-8 top-32 md:top-36 text-[19vw] md:text-[8.5vw]"
    />

    <div className="work-stack absolute left-5 right-5 bottom-24 md:right-auto md:left-8 md:bottom-10 md:w-[25rem]">
      {ringProjects.map((project, index) => (
        <article
          className="work-item"
          data-work-item={index}
          data-active={index === 0 ? "true" : "false"}
          key={project.title}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">
            {String(index + 1).padStart(2, "0")} / {total} · {project.category}{" "}
            · {project.status}
          </p>
          <h3 className="display text-4xl md:text-5xl leading-none tracking-tight mt-3">
            {project.title}
          </h3>
          <p className="mt-3 text-sm md:text-base text-white/75 leading-snug line-clamp-3">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.technologies.map((tech) => (
              <span
                className="border border-white/25 px-2 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/70"
                key={tech}
              >
                {tech}
              </span>
            ))}
            <a
              className="ml-auto flex items-center gap-1.5 bg-white text-black text-xs font-semibold rounded-full pl-3.5 pr-2.5 py-1.5 hover:bg-amber transition-colors"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {getHost(project.url)}
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      ))}
    </div>

    <ol
      className="work-index hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-56"
      aria-label="All projects"
    >
      {ringProjects.map((project, index) => (
        <li key={project.title}>
          <a
            className="work-index-row"
            data-work-row={index}
            data-active={index === 0 ? "true" : "false"}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-[0.65rem] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.title}</span>
          </a>
        </li>
      ))}
    </ol>
  </section>
);
