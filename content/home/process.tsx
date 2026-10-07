import { heroContent } from "@/data/hero";
import { SparklesIcon } from "@/components/ui/icons";

export const Process = () => (
  <section
    className="poster-section h-screen bg-violet divider-grid px-5 md:px-8 flex items-center"
    id="process"
  >
    <h2
      className="huge-word absolute z-0 text-white/15 left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
      id="processWord"
    >
      PROCESS
    </h2>
    <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 pt-20 pb-20">
      <article className="support-panel support-step">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          01 / Chat
        </p>
        <h3 className="display text-5xl md:text-6xl leading-none mt-6">
          WE TALK
        </h3>
        <p className="text-sm mt-6 max-w-[220px]">
          You tell me what you need and who it&apos;s for. I ask a few questions
          and give you an honest plan.
        </p>
      </article>
      <article className="support-panel support-step bg-white text-black">
        <p className="text-xs uppercase tracking-[0.2em] text-black/45">
          02 / Build
        </p>
        <h3 className="display text-5xl md:text-6xl leading-none mt-6">
          BUILT
        </h3>
        <p className="text-sm mt-6 max-w-[220px] text-black/70">
          I build it step by step and show you progress as it grows.
        </p>
        <a
          className="mt-6 block w-full text-center bg-black text-white text-sm font-semibold py-3 rounded-full"
          href={heroContent.links.email}
        >
          Say hello
        </a>
      </article>
      <article className="support-panel support-step">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          03 / Launch
        </p>
        <h3 className="display text-5xl md:text-6xl leading-none mt-6">
          LAUNCHED
        </h3>
        <p className="text-sm mt-6 max-w-[220px]">
          It goes live on the internet, and I help keep it running smoothly.
        </p>
      </article>
    </div>
    <div
      className="absolute z-20 right-5 md:right-[9vw] bottom-[16vh] w-72 bg-white text-black p-4 shadow-[20px_24px_70px_rgba(0,0,0,0.38)] border border-black/10"
      id="notifyCard"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-black/45">
          Right now
        </p>
        <SparklesIcon className="w-4 h-4" />
      </div>
      <p className="display text-4xl leading-none mt-4">OPEN TO WORK</p>
      <p className="text-sm font-semibold mt-1">
        Full-time roles and projects · {heroContent.profile.location}
      </p>
      <p className="text-xs text-black/55 mt-2">
        {heroContent.links.emailAddress}
      </p>
    </div>
  </section>
);
