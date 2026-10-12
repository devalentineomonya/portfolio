import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/hero";
import { getHost, getProject } from "@/data/work";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeIcon,
} from "@/components/ui/icons";
import { Headline, Kicker } from "./parts";

export const Product = () => {
  const nineHertz = getProject("Nine Hertz");
  const journaling = getProject("Journaling");
  const thumbs = [
    getProject("Nine Hertz"),
    getProject("Tekobliss"),
    getProject("PBQ Simulator"),
  ];

  return (
    <section className="home-section text-white" id="product">
      <Kicker index="02" label="Live now" />
      <div className="section-body grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="lg:col-span-5">
          <Headline text={"LIVE\nNOW"} className="text-[34vw] lg:text-[13vw]" />
          <p
            className="mt-6 text-lg font-semibold max-w-xs leading-snug"
            data-reveal
          >
            Two of the apps I&apos;ve built that are live today. Open one and
            try it.
          </p>
        </div>

        <div
          className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 md:gap-10"
          style={{ perspective: "1600px" }}
        >
          <div className="w-64 md:w-72" data-reveal>
            <a
              className="block p-5 bg-lilac text-black shadow-[20px_40px_70px_rgba(0,0,0,0.35)]"
              data-tilt
              href={nineHertz.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-between">
                <p className="display text-xs uppercase tracking-tight">
                  {heroContent.brand}
                </p>
                <span className="text-xs text-black/70">PROJECT 01</span>
              </div>
              <div className="mt-4 border-t border-black/20 pt-4">
                <p className="display text-2xl leading-tight tracking-tight">
                  Nine
                  <br />
                  Hertz
                </p>
                <p className="text-xs text-black/70 mt-1">
                  Healthcare app · Personal project
                </p>
              </div>
              <div className="mt-5 bg-white p-3">
                <Image
                  alt="Nine Hertz dashboard"
                  className="w-full h-36 object-cover object-top"
                  src={nineHertz.image ?? ""}
                  width={480}
                  height={300}
                  sizes="288px"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-black/80">
                <span>{getHost(nineHertz.url)}</span>
                <ArrowUpRightIcon className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </a>
          </div>

          <div className="w-64 md:w-72 sm:mt-16" data-reveal>
            <div
              className="bg-black p-2 rounded-md shadow-[-20px_40px_70px_rgba(0,0,0,0.4)]"
              data-tilt
            >
              <div className="bg-neutral-950 overflow-hidden">
                <Image
                  alt="Journaling app"
                  className="w-full h-28 object-cover object-top opacity-90"
                  src={journaling.mobileImage ?? ""}
                  width={500}
                  height={280}
                  sizes="288px"
                />
                <div className="p-4">
                  <p className="display text-base tracking-tight">Journaling</p>
                  <p className="text-xs text-white/60">
                    Tracks your M-Pesa spending, privately
                  </p>
                  <a
                    className="mt-4 block w-full text-center text-xs font-medium bg-white text-black rounded-full py-2 hover:bg-amber transition-colors"
                    href={journaling.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try it live
                  </a>
                  <div className="mt-2 flex items-center justify-center gap-1.5 border border-white/30 rounded-md py-2">
                    <CodeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="text-xs">Built with React Native</span>
                  </div>
                  <div className="mt-4 space-y-px">
                    <Link
                      className="w-full flex items-center justify-between text-xs py-2.5 px-3 bg-white/5 hover:bg-white/10 transition-colors"
                      href="/work"
                    >
                      <span>See all work</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </Link>
                    <a
                      className="w-full flex items-center justify-between text-xs py-2.5 px-3 bg-white/5 hover:bg-white/10 transition-colors"
                      href={heroContent.links.email}
                    >
                      <span>Get in touch</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};
