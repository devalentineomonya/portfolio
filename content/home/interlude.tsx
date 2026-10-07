export const Interlude = () => (
  <section
    className="poster-section h-screen bg-lilac divider-grid dark-lines"
    id="interlude"
  >
    <div
      className="absolute -top-[8vw] left-0 right-0 h-[18vw] -rotate-2 origin-left bg-lilac z-10"
      id="interludeWipe"
    ></div>
    <div
      className="absolute top-[55%] left-[8%] w-[34vw] h-[14vw] rounded-[50%] border-[1.2vw] opacity-85 -rotate-6 border-violet z-10"
      id="brush1"
    ></div>
    <div
      className="absolute top-[30%] right-[10%] w-[18vw] h-[18vw] rounded-full blur-[2px] bg-amber/80 z-10"
      id="brush2"
    ></div>
    <div className="absolute inset-0 flex items-center overflow-hidden z-20">
      <h2
        className="display text-black text-[29vw] md:text-[24vw] leading-none tracking-[-0.06em] whitespace-nowrap select-none will-change-transform"
        id="skillsWord"
      >
        WEBSITES AND APPS
      </h2>
    </div>
    <div
      className="absolute bottom-0 left-0 right-0 border-t border-black/25 z-30"
      id="interludeCopy"
    >
      <div className="px-5 md:px-8 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <p className="text-base font-semibold">
          For businesses, founders and teams.
        </p>
        <p className="text-base text-black/70 md:col-span-2 max-w-md">
          I design, build and launch websites and apps, from the first idea to
          the first customer. I handle the front and the back, so you only
          deal with one person.
        </p>
      </div>
    </div>
  </section>
);
