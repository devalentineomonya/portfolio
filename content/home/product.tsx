import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/hero";
import { getHost, getProject } from "@/data/work";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeIcon,
} from "@/components/ui/icons";

export const Product = () => {
  const nineHertz = getProject("Nine Hertz");
  const journaling = getProject("Journaling");
  const thumbs = [
    getProject("Nine Hertz"),
    getProject("Tekobliss"),
    getProject("PBQ Simulator"),
  ];

  return (
    <section
      className="poster-section h-screen bg-iris divider-grid"
      id="product"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform z-0"
        id="productWord"
      >
        <h2 className="display text-white text-[30vw] md:text-[25vw] leading-none tracking-[-0.06em] whitespace-nowrap select-none">
          LIVE NOW
        </h2>
      </div>
      <div
        className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-9 md:gap-[14vw] pt-12 z-10"
        style={{ perspective: "1600px" }}
      >
        <article className="w-56 md:w-64 will-change-transform" id="casePass">
          <a
            className="block p-5 shadow-[20px_40px_70px_rgba(0,0,0,0.42)] relative overflow-hidden bg-lilac"
            style={{ transform: "rotateY(14deg)" }}
            href={nineHertz.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative flex items-center justify-between">
              <p className="display text-xs text-black uppercase tracking-tight">
                {heroContent.brand}
              </p>
              <span className="text-xs text-black/70"> PROJECT 01 </span>
            </div>
            <div className="relative mt-4 border-t border-black/20 pt-4">
              <p className="display text-xl text-black leading-tight tracking-tight">
                Nine
                <br />
                Hertz
              </p>
              <p className="text-xs text-black/70 mt-1">
                Healthcare app · Personal project
              </p>
            </div>
            <div className="relative mt-5 bg-white p-3">
              <Image
                alt="Nine Hertz dashboard"
                className="w-full h-32 object-cover object-top"
                src={nineHertz.image ?? ""}
                width={480}
                height={300}
                sizes="256px"
              />
            </div>
            <div className="relative mt-4 flex items-center justify-between text-xs text-black/80">
              <span>{getHost(nineHertz.url)}</span>
              <ArrowUpRightIcon className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </a>
        </article>
        <article className="w-56 md:w-64 will-change-transform" id="phoneMock">
          <div
            className="bg-black p-2 shadow-[-20px_40px_70px_rgba(0,0,0,0.45)] rounded-md"
            style={{ transform: "rotateY(-12deg)" }}
          >
            <div className="bg-neutral-950 text-white overflow-hidden">
              <Image
                alt="Journaling app"
                className="w-full h-28 object-cover object-top opacity-90"
                src={journaling.mobileImage ?? ""}
                width={500}
                height={280}
                sizes="256px"
              />
              <div className="p-4">
                <p className="display text-base tracking-tight">Journaling</p>
                <p className="text-xs text-white/60">
                  Tracks your M-Pesa spending, privately
                </p>
                <a
                  className="mt-4 block w-full text-center text-xs font-medium bg-white text-black rounded-full py-2"
                  href={journaling.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try it live
                </a>
                <div className="mt-2 flex items-center justify-center gap-1.5 border border-white/30 rounded-md py-2">
                  <CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span className="text-xs"> Built with React Native </span>
                </div>
                <div className="mt-4 space-y-px">
                  <Link
                    className="w-full flex items-center justify-between text-xs py-2.5 px-3 bg-white/5 hover:bg-white/10 transition-colors"
                    href="/work"
                  >
                    <span> See all work </span>
                    <ArrowRightIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                  <a
                    className="w-full flex items-center justify-between text-xs py-2.5 px-3 bg-white/5 hover:bg-white/10 transition-colors"
                    href={heroContent.links.email}
                  >
                    <span> Get in touch </span>
                    <ArrowRightIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-1">
                  {thumbs.map((project) => (
                    <Image
                      key={project.title}
                      alt=""
                      className="aspect-square object-cover object-top"
                      src={project.mobileImage ?? ""}
                      width={120}
                      height={120}
                      sizes="80px"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/30 z-20">
        <div className="px-5 md:px-8 py-5 flex items-end justify-between text-white">
          <p className="text-base font-semibold max-w-xs leading-snug">
            Things I&apos;ve built that real people use. Take a look.
          </p>
          <p className="text-xs text-white/60 hidden sm:block">
            Plan · Build · Launch
          </p>
        </div>
      </div>
    </section>
  );
};
