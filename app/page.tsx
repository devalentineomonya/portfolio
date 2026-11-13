import { Intro } from "@/components/home/intro";
import { Hero } from "@/components/home/hero";
import { System } from "@/components/home/system";
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
        <style>{`.site-loader,.site-system__note,.site-system__cable{display:none}.site-system__hub,.site-system__brace,.site-system__label,.site-system__copy{opacity:1;transform:none}.site-system__word{transform:none}`}</style>
      </noscript>
      <Intro />
      <main>
        <div className="site-cover">
          <Hero />
          <System />
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
