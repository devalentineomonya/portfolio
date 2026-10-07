import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { heroContent } from "@/data/hero";
import { getProject } from "@/data/work";
import { ArrowDownIcon, CircleCheckIcon, CodeIcon } from "@/components/ui/icons";

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
      <div className="mt-2 flex items-center justify-center gap-1.5 border border-white/30 rounded-md py-1.5">
        {rowIcon}
        <span className="text-xs">{rowText}</span>
      </div>
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
        <div className="relative w-full max-w-5xl h-[62vh] flex items-center justify-center">
          <HeroCard
            id="card1"
            className="absolute w-40 sm:w-48 md:w-56 will-change-transform"
            style={{ transform: "rotateY(22deg) rotateZ(-8deg)" }}
            titleClass="text-base"
            title={["Nine", "Hertz"]}
            subtitle="AI healthcare · Personal"
            image={nineHertz.mobileImage ?? ""}
            imageAlt="Nine Hertz mobile screen"
            action={{ label: "View project", href: nineHertz.url, external: true }}
            rowIcon={<CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            rowText="react · nestjs · docker"
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
            rowIcon={
              <CircleCheckIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            }
            rowText="Open for roles"
          />
          <HeroCard
            id="card3"
            className="absolute w-40 sm:w-48 md:w-56 will-change-transform"
            style={{ transform: "rotateY(-22deg) rotateZ(9deg)" }}
            shadow="shadow-[-30px_40px_60px_rgba(0,0,0,0.45)]"
            titleClass="text-base"
            title={["Journaling", "App"]}
            subtitle="Mobile · M-Pesa finance"
            image={journaling.mobileImage ?? ""}
            imageAlt="Journaling mobile screen"
            action={{ label: "View project", href: journaling.url, external: true }}
            rowIcon={<CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            rowText="react native · expo · ai"
          />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 border-t border-white/40 z-20"
        id="heroCopy"
      >
        <div className="px-5 md:px-8 py-5 flex items-end justify-between text-white">
          <p className="text-base md:text-lg font-medium leading-snug max-w-sm">
            {heroContent.copy}
          </p>
          <ArrowDownIcon
            className="w-5 h-5 mb-1 animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
};
