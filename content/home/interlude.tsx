import { Kicker } from "./parts";

export const Interlude = () => (
  <section className="home-section h-svh text-white" id="interlude">
    <Kicker index="01" label="What I do" />
    <div className="absolute inset-0 flex items-center overflow-hidden">
      <h2
        className="display text-[29vw] md:text-[24vw] leading-none tracking-[-0.06em] whitespace-nowrap select-none will-change-transform"
        id="skillsWord"
      >
        I BUILD WEB AND MOBILE APPS
      </h2>
    </div>
    <div
      className="absolute bottom-0 left-0 right-0 border-t border-white/30"
      id="interludeCopy"
    >
      <div className="px-5 md:px-8 pt-5 pb-[5.5rem] md:pb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <p className="text-base font-semibold">
          Front end, back end and the servers they run on.
        </p>
        <p className="text-base text-white/75 md:col-span-2 max-w-lg">
          I take features from idea to production: React and Next.js on the
          front, NestJS and PHP on the back, Docker and CI/CD to ship it. I&apos;ve
          done it inside teams and on my own.
        </p>
      </div>
    </div>
  </section>
);
