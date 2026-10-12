import { heroContent } from "@/data/hero";
import { Kicker } from "./parts";

const words = heroContent.story.split(" ");
/** the two words that carry the proof get the accent colour */
const emphasis = new Set(["40%.", "ship."]);

export const Manifesto = () => (
  <section
    className="home-section h-svh text-black flex items-center justify-center px-5"
    id="manifesto"
  >
    <Kicker index="04" label="About me" />
    <h2 className="relative z-10 manifesto-sentence">
      {words.map((word, index) => (
        <span
          className={`manifesto-word ${emphasis.has(word) ? "text-violet" : ""}`}
          key={`${word}-${index}`}
        >
          {word}
        </span>
      ))}
    </h2>
    <span
      className="hand absolute z-20 text-violet text-[18vw] md:text-[9vw] left-[10%] md:left-[16%] bottom-[12%] md:bottom-[9%] -rotate-12 select-none"
      id="handWord"
    >
      for real
    </span>
  </section>
);
