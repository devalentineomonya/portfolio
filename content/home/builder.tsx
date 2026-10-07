import { experiences } from "@/data/experience";
import { heroContent } from "@/data/hero";
import { ArrowUpRightIcon, ScanFaceIcon } from "@/components/ui/icons";

const byCompany = (company: string) => {
  const found = experiences.find((e) => e.company === company);
  if (!found) throw new Error(`Unknown company: ${company}`);
  return found;
};

export const Builder = () => {
  const transcom = byCompany("Transcom Media");
  const society = byCompany("University Computer Society");
  const teach2give = byCompany("Teach2Give");
  const godan = byCompany("Godan Info");
  const societyTech = society.roles[1].technologies?.slice(0, 4) ?? [];

  return (
    <section
      className="poster-section h-screen bg-lavender divider-grid dark-lines"
      id="builder"
    >
      <h2
        className="huge-word absolute left-[-4vw] top-1/2 -translate-y-1/2 z-0 text-black"
        id="buildWord"
      >
        TEAMS
      </h2>
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-5 md:px-8 pt-24 pb-20">
        <div className="hidden lg:block"></div>
        <article className="builder-shell ml-auto overflow-hidden" id="builderCard">
          <header className="p-5 flex items-start justify-between border-b border-white/20">
            <div>
              <p className="display text-3xl tracking-tight leading-none">
                MY STORY
              </p>
              <p className="text-xs text-white/55 mt-2">Where I&apos;ve worked so far</p>
            </div>
            <ScanFaceIcon
              className="w-5 h-5 text-white/60"
              strokeWidth={1.5}
            />
          </header>
          <div className="builder-module p-5" data-number="01">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Right now
            </p>
            <p className="mt-2 text-sm text-white max-w-xs">
              Building business websites and tools at {transcom.company}, since{" "}
              {transcom.roles[0].dateRange.split(" - ")[0]}.
            </p>
          </div>
          <div className="builder-module p-5" data-number="02">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Community
            </p>
            <p className="mt-2 text-sm text-white max-w-xs">
              Helping run {society.company} as vice chairperson, and leading its
              developers.
            </p>
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
              Built with
            </p>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {societyTech.map((tech) => (
                <span
                  key={tech}
                  className="aspect-square border border-white/25 flex items-end p-1.5 text-[0.62rem] uppercase tracking-[0.1em]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="builder-module grid grid-cols-2" data-number="03">
            <div className="p-5 text-left border-r border-white/15 bg-white text-black text-sm font-semibold">
              {teach2give.company}
              <span className="block text-xs font-normal opacity-60 mt-0.5">
                Attaché · 2025
              </span>
            </div>
            <div className="p-5 text-left text-sm font-semibold">
              {godan.company}
              <span className="block text-xs font-normal opacity-60 mt-0.5">
                Intern · 2025
              </span>
            </div>
          </div>
          <div className="builder-module grid grid-cols-2" data-number="04">
            <div className="p-5 text-left text-sm font-semibold border-r border-white/15">
              What you see
              <span className="block text-xs font-normal opacity-60 mt-0.5">
                React · Next.js
              </span>
            </div>
            <div className="p-5 text-left text-sm font-semibold">
              What you don&apos;t
              <span className="block text-xs font-normal opacity-60 mt-0.5">
                NestJS · Docker
              </span>
            </div>
          </div>
          <div
            className="builder-module p-5 flex items-center justify-between"
            data-number="05"
          >
            <span className="text-sm font-semibold"> Full résumé </span>
            <a
              href={heroContent.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs border border-white/25 px-3 py-2 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Open
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      </div>
      <div className="absolute left-5 md:left-8 top-[26%] z-20 hidden md:block">
        <p className="display text-[11vw] leading-none tracking-[-0.055em] text-violet">
          04
        </p>
        <p className="text-xs uppercase tracking-[0.18em] max-w-[180px]">
          Teams I&apos;ve worked with, in five roles. Each one taught me something new.
        </p>
      </div>
    </section>
  );
};
