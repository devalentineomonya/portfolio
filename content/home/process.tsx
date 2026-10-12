import { heroContent } from "@/data/hero";
import { SparklesIcon } from "@/components/ui/icons";
import { Headline, Kicker } from "./parts";

const steps = [
  {
    label: "01 / Chat",
    title: "WE TALK",
    copy: "I start by understanding the problem and the people it's for, then agree on the smallest useful version.",
  },
  {
    label: "02 / Build",
    title: "BUILT",
    copy: "I build in small steps, review often and keep the code easy for the next person.",
  },
  {
    label: "03 / Launch",
    title: "LAUNCHED",
    copy: "Docker and CI/CD put it live, then I watch it, fix it and improve it.",
  },
];

export const Process = () => (
  <section className="home-section text-white" id="process">
    <Kicker index="07" label="How I work" />
    <div className="section-body">
      <Headline text="PROCESS" className="text-[24vw] md:text-[13vw]" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => (
          <div data-reveal key={step.title}>
            <article className="support-panel h-full" data-tilt>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                {step.label}
              </p>
              <h3 className="display text-5xl leading-none mt-6">
                {step.title}
              </h3>
              <p className="text-sm mt-6 max-w-[240px] text-white/80">
                {step.copy}
              </p>
            </article>
          </div>
        ))}
        <div data-reveal>
          <article
            className="support-panel h-full bg-amber text-black border-black/10 flex flex-col"
            data-tilt
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-black/55">
                Right now
              </p>
              <SparklesIcon className="w-4 h-4" />
            </div>
            <h3 className="display text-5xl leading-none mt-6">
              OPEN TO WORK
            </h3>
            <p className="text-sm font-semibold mt-6">
              Full-time roles · {heroContent.profile.location}
            </p>
            <a
              className="mt-auto pt-6 block"
              href={heroContent.links.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="block w-full text-center bg-black text-white text-sm font-semibold py-3 rounded-full hover:bg-ink/80 transition-colors">
                See my résumé
              </span>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
);
