import { heroContent } from "@/data/hero";

const words = heroContent.story.split(" ");

export const Manifesto = () => (
  <section
    className="poster-section h-screen bg-lavender divider-grid dark-lines flex items-center justify-center px-5"
    id="manifesto"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(109,39,218,0.22),transparent_32%),radial-gradient(circle_at_80%_72%,rgba(245,166,35,0.26),transparent_30%)]"></div>
    <h2 className="relative z-10 manifesto-sentence text-black">
      {words.map((word, index) => (
        <span className="manifesto-word" key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </h2>
    <span
      className="hand absolute z-20 text-violet text-[18vw] md:text-[10vw] left-[18%] top-[68%] -rotate-12 select-none"
      id="handWord"
    >
      for real
    </span>
    <div
      aria-hidden="true"
      className="absolute top-[12%] left-[8%] display text-[9vw] leading-none text-black/5 rotate-[-8deg]"
    >
      WEBSITES APPS SHOPS CLINICS SCHOOLS STARTUPS TEAMS IDEAS
    </div>
    <p className="section-label text-black/60">04 / A little about me</p>
  </section>
);
