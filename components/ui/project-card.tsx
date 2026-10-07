import Image from "next/image";
import { getHost, type WorkProject } from "@/data/work";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export const ProjectCard = ({ project }: { project: WorkProject }) => (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col border border-white/20 bg-ink text-white shadow-[18px_22px_42px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1"
  >
    {project.image && (
      <div className="relative h-44 overflow-hidden border-b border-white/15">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 368px"
          className="object-cover object-top grayscale contrast-[1.08] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
    )}
    <div className="flex flex-1 flex-col gap-1.5 p-4">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
        {project.category}
      </p>
      <h3 className="display text-3xl leading-none">{project.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-white/70">
        {project.description}
      </p>
      <p className="mt-auto pt-3 text-xs text-white/60">
        {project.technologies.join(" · ")}
      </p>
    </div>
    <div className="flex items-center justify-between gap-4 border-t border-white/15 px-4 py-2.5 text-xs">
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 bg-current" />
        {project.status ?? "Live"}
      </span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="truncate">{getHost(project.url)}</span>
        <ArrowUpRightIcon
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-45"
          strokeWidth={1.5}
        />
      </span>
    </div>
  </a>
);
