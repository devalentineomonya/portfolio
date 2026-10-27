import Link from "next/link";
import { experiences } from "@/data/experience";
import { ExperienceMotion } from "@/components/home/experience-motion";

const frames = experiences.flatMap((exp) =>
  exp.roles.map((role) => ({ company: exp.company, location: exp.location, role })),
);

const pad = (n: number) => String(n).padStart(2, "0");

export const Experience = () => (
  <section className="site-exp" id="experience">
    <header className="site-exp__head">
      <span className="site-exp__label">Where I&rsquo;ve worked</span>
      <h2 className="site-exp__headline">Roles, in order.</h2>
    </header>

    <div className="site-exp__rail" data-rail="">
      <ol className="site-exp__strip" data-strip="">
        {frames.map(({ company, location, role }, i) => (
          <li className="site-frame" key={`${company}-${role.title}`}>
            <div className="site-frame__top">
              <span className="site-frame__num">{pad(i + 1)}</span>
              {role.isCurrent && <span className="site-frame__now">Now</span>}
            </div>
            <h3 className="site-frame__company">{company}</h3>
            <p className="site-frame__role">
              {role.title} <span>{role.type}</span>
            </p>
            <p className="site-frame__meta">
              {role.dateRange} · {location}
            </p>
            <p className="site-frame__text">{role.description}</p>
            {role.technologies && (
              <ul className="site-frame__tech">
                {role.technologies.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li className="site-frame site-frame--end">
          <Link href="/experience">
            The full story
            <span aria-hidden="true">→</span>
          </Link>
        </li>
      </ol>
    </div>

    <ExperienceMotion />
  </section>
);
