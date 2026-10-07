import { Loader } from "@/content/home/loader";
import { Hero } from "@/content/home/hero";
import { Interlude } from "@/content/home/interlude";
import { Product } from "@/content/home/product";
import { Manifesto } from "@/content/home/manifesto";
import { Archive } from "@/content/home/archive";
import { Builder } from "@/content/home/builder";
import { Board } from "@/content/home/board";
import { Process } from "@/content/home/process";
import { CtaBuild } from "@/content/home/cta-build";
import { Join } from "@/content/home/join";
import { HomeMotion } from "@/content/home/home-motion";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`.noema-loader{display:none}body.is-loading{height:auto;overflow:auto}`}</style>
      </noscript>
      <Loader />
      <main>
        <Hero />
        <Interlude />
        <Product />
        <Manifesto />
        <Archive />
        <Builder />
        <Board />
        <Process />
        <CtaBuild />
        <Join />
      </main>
      <HomeMotion />
    </>
  );
}
