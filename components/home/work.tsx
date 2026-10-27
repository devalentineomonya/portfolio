import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getHost, workProjects } from "@/data/work";
import { WorkMotion } from "@/components/home/work-motion";

const SELECTED = workProjects.filter((p) => !p.archived && p.image).slice(0, 6);
const TOTAL = workProjects.filter((p) => !p.archived).length;

export const Work = () => (
  <section className="site-work" id="work">
    <span className="site-work__label">Work</span>
    <h2 className="site-work__headline">Things I shipped. Live right now.</h2>

    <ul className="site-work__list" data-work-list="">
      {SELECTED.map((project, i) => (
        <li key={project.title}>
          <a
            className="site-work__row"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-row=""
            data-index={i}
          >
            <span className="site-work__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="site-work__title">
              {project.title}
              <span className="site-work__host">{getHost(project.url)}</span>
            </span>
            <span className="site-work__chip">{project.category}</span>
            <span className="site-work__tech">{project.technologies.join(" / ")}</span>
            <span className="site-work__go">
              <ArrowUpRightIcon className="site-work__arrow" strokeWidth={2.2} />
            </span>
            <Image
              className="site-work__thumb"
              src={project.image!}
              alt=""
              width={640}
              height={400}
              sizes="(max-width: 820px) 90vw, 0px"
            />
          </a>
        </li>
      ))}
    </ul>

    <a className="site-btn site-btn--solid site-work__all" href="/work">
      See all {TOTAL} projects
      <ArrowUpRightIcon className="site-btn__icon" strokeWidth={2} />
    </a>

    <div className="site-preview" data-preview="" aria-hidden="true">
      <div className="site-preview__bar">
        <i />
        <i />
        <i />
      </div>
      {SELECTED.map((project) => (
        <Image
          key={project.title}
          className="site-preview__img"
          src={project.image!}
          alt=""
          fill
          sizes="380px"
        />
      ))}
    </div>

    <WorkMotion />
  </section>
);
