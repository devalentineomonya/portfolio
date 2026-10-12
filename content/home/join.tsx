import { heroContent } from "@/data/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { Kicker } from "./parts";

export const Join = () => (
  <section className="home-section text-white flex flex-col" id="join">
    <Kicker index="08" label="Contact" />
    <div className="relative flex-1 min-h-[88svh]">
      {/* the ring comes back here, behind the word, to close the loop */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-[4vw] overflow-hidden">
        <h2
          className="display text-[44vw] md:text-[30vw] leading-none tracking-[-0.07em] select-none will-change-transform"
          id="joinWord"
        >
          TALK
        </h2>
      </div>
      <span
        className="hand absolute text-amber text-[15vw] md:text-[8vw] left-[28%] md:left-[34%] top-[58%] md:top-[56%] -rotate-12 select-none drop-shadow-lg z-10"
        id="yourCardWord"
      >
        to me
      </span>
      <div className="absolute left-5 right-5 bottom-8 md:left-auto md:bottom-auto md:right-[8vw] md:top-[31%] md:max-w-xs z-20">
        <p className="text-lg md:text-xl font-semibold leading-snug">
          Hiring, or building a team? Tell me about the role and I&apos;ll get
          back to you.
        </p>
        <a
          className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-amber transition-colors"
          href={heroContent.links.email}
        >
          {heroContent.links.emailAddress}
        </a>
        <p className="mt-3 text-sm">
          <a
            className="font-semibold underline underline-offset-4 hover:text-amber transition-colors"
            href={heroContent.links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
          {" · "}
          <a
            className="font-semibold underline underline-offset-4 hover:text-amber transition-colors"
            href={heroContent.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
        <p className="mt-3 text-sm text-white/75">
          Need a website for your business?{" "}
          <a
            className="font-semibold text-white underline underline-offset-4 hover:text-amber transition-colors"
            href={heroContent.links.studio}
            target="_blank"
            rel="noopener noreferrer"
          >
            Devaltech builds them →
          </a>
        </p>
      </div>
    </div>
    <SiteFooter tone="light" />
  </section>
);
