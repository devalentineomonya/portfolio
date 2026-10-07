import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectCard } from "@/components/ui/project-card";
import { workProjects } from "@/data/work";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites and apps built by Valentine Omonya for clinics, schools, businesses and everyday people.",
};

export default function WorkPage() {
  const active = workProjects.filter((p) => !p.archived);
  const archived = workProjects.filter((p) => p.archived);

  return (
    <main>
      <PageHeader
        word="WORK"
        tone="violet"
        copy={`Websites and apps I've built. ${active.length} live, ${archived.length} retired.`}
      />
      <section className="bg-lavender text-black">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-black/60">
            Live / {String(active.length).padStart(2, "0")}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <p className="mb-2 mt-16 text-xs font-bold uppercase tracking-[0.18em] text-black/60">
            Older projects / {String(archived.length).padStart(2, "0")}
          </p>
          <div>
            {archived.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 border-t border-black/25 py-4 transition-opacity hover:opacity-60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="display flex items-center gap-2 text-2xl">
                  {project.title}
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
                <span className="max-w-xl text-sm text-black/70">
                  {project.description}
                </span>
              </a>
            ))}
          </div>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
