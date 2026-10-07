import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { heroContent } from "@/data/hero";
import { getProject } from "@/data/work";
import { ArrowDownIcon, CodeIcon, FileTextIcon } from "@/components/ui/icons";

interface HeroCardProps {
  id: string;
  className: string;
  style: CSSProperties;
  shadow?: string;
  titleClass: string;
  title: [string, string];
  subtitle: string;
  image: string;
  imageAlt: string;
  action: { label: string; href: string; external?: boolean };
  rowIcon: ReactNode;
  rowText: string;
  rowHref?: string;
}

const HeroCard = ({
  id,
  className,
  style,
  shadow = "",
  titleClass,
  title,
  subtitle,
  image,
  imageAlt,
  action,
  rowIcon,
  rowText,
  rowHref,
}: HeroCardProps) => (
  <article id={id} className={className} style={style}>
    <div
      className={`profile-card soft-sheen relative overflow-hidden p-4 ${shadow}`}
    >
      <p className={`display ${titleClass} leading-tight tracking-tight`}>
        {title[0]}
        <br />
        {title[1]}
      </p>
      <p className="text-xs text-white/60 mt-1">{subtitle}</p>
      <Image
        alt={imageAlt}
        className="w-full aspect-square object-cover object-top mt-3 grayscale"
        src={image}
        width={300}
        height={300}
        sizes="240px"
        priority
      />
      <a
        className="mt-3 block w-full text-center text-xs font-medium bg-white text-black rounded-full py-1.5"
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener noreferrer" : undefined}
      >
        {action.label}
      </a>
      {rowHref ? (
        <a
          className="mt-2 flex items-center justify-center gap-1.5 border border-white/30 rounded-md py-1.5 hover:bg-white/10 transition-colors"
          href={rowHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {rowIcon}
          <span className="text-xs">{rowText}</span>
        </a>
      ) : (
        <div className="mt-2 flex items-center justify-center gap-1.5 border border-white/30 rounded-md py-1.5">
          {rowIcon}
          <span className="text-xs">{rowText}</span>
        </div>
      )}
    </div>
  </article>
);

export const Hero = () => {
  const nineHertz = getProject("Nine Hertz");
  const journaling = getProject("Journaling");

  return (
    <section
      className="poster-section h-screen bg-violet divider-grid"
      id="hero"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        id="heroWord"
      >
        <h1 className="display text-white text-[28vw] md:text-[22vw] leading-none tracking-[-0.055em] whitespace-nowrap select-none">
          {heroContent.word}
        </h1>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ perspective: "1400px" }}
      >
        <div
          id="heroCards"
          className="relative w-full max-w-5xl h-[62vh] flex items-center justify-center"
        >
          <HeroCard
            id="card1"
            className="absolute w-40 sm:w-48 md:w-56 will-change-transform"
            style={{ transform: "rotateY(22deg) rotateZ(-8deg)" }}
            titleClass="text-base"
            title={["Nine", "Hertz"]}
            subtitle="Healthcare app for clinics"
            image={nineHertz.mobileImage ?? ""}
            imageAlt="Nine Hertz mobile screen"
            action={{ label: "See it live", href: nineHertz.url, external: true }}
            rowIcon={<CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            rowText="React + NestJS"
          />
          <HeroCard
            id="card2"
            className="absolute w-44 sm:w-52 md:w-60 z-10 will-change-transform"
            style={{ transform: "rotateY(-4deg) rotateZ(2deg)" }}
            shadow="shadow-[0_50px_80px_rgba(0,0,0,0.52)]"
            titleClass="text-lg"
            title={["Valentine", "Omonya"]}
            subtitle={`${heroContent.profile.role} · ${heroContent.profile.location}`}
            image={heroContent.profile.image}
            imageAlt={heroContent.profile.name}
            action={{ label: "Say hello", href: heroContent.links.email }}
            rowIcon={<FileTextIcon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            rowText="Full résumé"
            rowHref={heroContent.links.resume}
          />
          <HeroCard
            id="card3"
            className="absolute w-40 sm:w-48 md:w-56 will-change-transform"
            style={{ transform: "rotateY(-22deg) rotateZ(9deg)" }}
            shadow="shadow-[-30px_40px_60px_rgba(0,0,0,0.45)]"
            titleClass="text-base"
            title={["Journaling", "App"]}
            subtitle="Tracks your M-Pesa spending"
            image={journaling.mobileImage ?? ""}
            imageAlt="Journaling mobile screen"
            action={{ label: "See it live", href: journaling.url, external: true }}
            rowIcon={<CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            rowText="React Native"
          />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 border-t border-white/40 z-20"
        id="heroCopy"
      >
        <div className="px-5 md:px-8 pt-5 pb-[5.5rem] md:pb-5 flex items-end justify-between gap-6 text-white">
          <div className="max-w-[15rem] sm:max-w-md">
            <p className="text-base md:text-lg font-medium leading-snug">
              {heroContent.copy}
            </p>
            <p className="mt-2 hidden text-sm text-white/80 sm:block">
              {heroContent.status}
            </p>
          </div>
          <ArrowDownIcon
            className="hidden md:block w-5 h-5 mb-1 animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </div>
      <aside
        id="heroAbout"
        aria-label="What I do"
        className="absolute left-5 right-5 top-24 md:left-auto md:right-8 md:w-64 z-20 text-white"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          What I do
        </p>
        <ul className="mt-3">
          {heroContent.services.map((service, index) => (
            <li
              key={service}
              className="flex gap-3 border-t border-white/30 py-2 text-sm md:text-base font-medium leading-snug"
            >
              <span className="pt-0.5 text-xs text-white/60">0{index + 1}</span>
              {service}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};
