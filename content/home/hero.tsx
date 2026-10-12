import Image from "next/image";
import { heroContent } from "@/data/hero";
import { FileTextIcon } from "@/components/ui/icons";

export const Hero = () => (
  <section className="home-section h-svh text-white" id="hero">
    {/* the 3D ring of projects orbits behind this word (stage.tsx) */}
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      id="heroWord"
    >
      <h1 className="display text-[27vw] md:text-[21vw] leading-none tracking-[-0.055em] whitespace-nowrap select-none">
        {heroContent.word}
      </h1>
    </div>

    <aside
      id="heroAbout"
      aria-label="About me"
      className="absolute left-5 right-5 top-24 sm:left-auto md:right-8 sm:w-80 z-20 flex items-center gap-3 border border-white/25 bg-ink/40 backdrop-blur-md p-2.5 pr-3"
    >
      <Image
        alt={heroContent.profile.name}
        className="w-12 h-12 shrink-0 rounded-full bg-lilac object-cover object-top"
        src={heroContent.profile.image}
        width={96}
        height={96}
        priority
      />
      <div className="min-w-0 flex-1">
        <p className="display text-lg leading-none tracking-tight whitespace-nowrap">
          {heroContent.profile.name}
        </p>
        <p className="text-xs text-white/65 mt-1.5">
          {heroContent.profile.role}
        </p>
      </div>
      <a
        className="flex items-center gap-1.5 text-xs font-medium bg-white text-black rounded-full px-3 py-1.5 hover:bg-amber transition-colors"
        href={heroContent.links.resume}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileTextIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        Résumé
      </a>
    </aside>

    <div
      className="absolute bottom-0 left-0 right-0 border-t border-white/40 z-20 bg-gradient-to-t from-violet/70 to-transparent"
      id="heroCopy"
    >
      <div className="px-5 md:px-8 pt-5 pb-[5.5rem] md:pb-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="text-base md:text-lg font-medium leading-snug">
            {heroContent.copy}
          </p>
          <p className="mt-2 hidden text-base text-white/90 sm:block">
            {heroContent.examples}
          </p>
          <p className="mt-2 hidden text-sm text-white/75 sm:block">
            {heroContent.status}
          </p>
        </div>
        <ul
          aria-label="What I do"
          className="hidden md:grid md:col-span-6 lg:col-span-5 grid-cols-3 gap-4"
        >
          {heroContent.services.map((service, index) => (
            <li
              key={service.title}
              className="border-t border-white/30 pt-2 text-base font-medium leading-snug"
            >
              <span className="block text-xs text-white/60">0{index + 1}</span>
              {service.title}
              <span className="block text-sm font-normal text-white/75">
                {service.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
