import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering roles, leadership and technical attachments across Kenya.",
};

export default function ExperiencePage() {
  return (
    <main>
      <PageHeader
        word="CAREER"
        tone="lilac"
        copy="Software engineering roles, leadership and technical attachments."
      />
      <section className="bg-lavender text-black">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          {experiences.map((experience, index) => (
            <article
              key={experience.company}
              className="grid grid-cols-1 gap-6 border-t border-black/25 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display text-4xl leading-none md:text-5xl">
                  {experience.company}
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  {experience.location}
                </p>
              </div>
              <div className="flex flex-col gap-8">
                {experience.roles.map((role) => (
                  <div key={role.title + role.dateRange}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-lg font-semibold">{role.title}</h3>
                      <span className="border border-black/40 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                        {role.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
                          role.isCurrent
                            ? "bg-black text-white"
                            : "border border-black/40"
                        }`}
                      >
                        {role.dateRange}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/75">
                      {role.description}
                    </p>
                    {role.technologies && role.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="border border-black/40 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
