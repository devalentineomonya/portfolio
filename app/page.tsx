import { Intro } from "@/components/home/intro";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { Services } from "@/components/home/services";
import { Work } from "@/components/home/work";
import { Trail } from "@/components/home/trail";
import { Process } from "@/components/home/process";
import { Experience } from "@/components/home/experience";
import { Cta } from "@/components/home/cta";
import { RunPath } from "@/components/home/run-path";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`.site-loader{display:none}`}</style>
      </noscript>
      <Intro />
      <main>
        <div className="site-cover">
          <Hero />
          <Manifesto />
        </div>
        <div className="site-run">
          <RunPath />
          <Services />
          <Work />
          <Trail />
        </div>
        <Process />
        <Experience />
        <Cta />
      </main>
    </>
  );
}
