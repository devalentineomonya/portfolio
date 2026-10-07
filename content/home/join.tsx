import Image from "next/image";
import { heroContent } from "@/data/hero";
import { getProject } from "@/data/work";
import { SiteFooter } from "@/components/layout/site-footer";

const members: Array<{
  project: string;
  className: string;
}> = [
  {
    project: "Nine Hertz",
    className:
      "w-12 h-12 md:w-16 md:h-16 left-[14%] top-[28%]",
  },
  {
    project: "Journaling",
    className: "w-10 h-10 md:w-14 md:h-14 left-[30%] top-[68%]",
  },
  {
    project: "Tekobliss",
    className: "w-12 h-12 md:w-16 md:h-16 left-[52%] top-[24%]",
  },
  {
    project: "lazyDLP",
    className: "w-10 h-10 md:w-14 md:h-14 left-[8%] top-[58%]",
  },
  {
    project: "PBQ Simulator",
    className: "w-12 h-12 md:w-16 md:h-16 left-[44%] top-[78%]",
  },
  {
    project: "Arorwet Secondary",
    className: "w-10 h-10 md:w-14 md:h-14 left-[24%] top-[12%]",
  },
];

export const Join = () => (
  <section
    className="poster-section min-h-screen w-full z-10 flex flex-col bg-lilac divider-grid dark-lines"
    id="join"
  >
    <div className="relative flex-1 min-h-[88vh]">
      <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-[4vw] overflow-hidden z-0">
        <h2
          className="display text-black text-[44vw] md:text-[32vw] leading-none tracking-[-0.07em] select-none will-change-transform"
          id="joinWord"
        >
          TALK
        </h2>
      </div>
      <span
        className="hand absolute text-amber text-[15vw] md:text-[8vw] left-[28%] md:left-[36%] top-[45%] -rotate-12 select-none drop-shadow-lg z-10"
        id="yourCardWord"
      >
        to me
      </span>
      {members.map(({ project, className }) => {
        const data = getProject(project);
        return (
          <Image
            key={project}
            alt=""
            className={`member absolute rounded-full border-2 border-white object-cover object-top shadow-xl z-10 ${className}`}
            src={data.mobileImage ?? ""}
            width={120}
            height={120}
            sizes="64px"
          />
        );
      })}
      <div className="absolute right-5 md:right-[8vw] top-[23%] md:top-[31%] max-w-xs text-black z-20">
        <p className="text-lg md:text-xl font-semibold leading-snug">
          Building something? Tell me what it is, who it&apos;s for and when you
          need it. I&apos;ll tell you honestly if I&apos;m the right fit.
        </p>
        <a
          className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity"
          href={heroContent.links.email}
        >
          {heroContent.links.emailAddress}
        </a>
        <svg
          className="w-24 md:w-32 mt-6 ml-auto text-black"
          fill="none"
          id="handArrow"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
          viewBox="0 0 120 90"
          aria-hidden="true"
        >
          <path d="M8 10 C 40 20, 70 40, 100 72"></path>
          <path d="M86 68 L 102 74 L 96 56"></path>
        </svg>
      </div>
    </div>
    <SiteFooter />
  </section>
);
