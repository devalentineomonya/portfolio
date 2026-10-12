import { Loader } from "@/content/home/loader";
import { Hero } from "@/content/home/hero";
import { Interlude } from "@/content/home/interlude";
import { Product } from "@/content/home/product";
import { Manifesto } from "@/content/home/manifesto";
import { Archive } from "@/content/home/archive";
import { Builder } from "@/content/home/builder";
import { Board } from "@/content/home/board";
import { Process } from "@/content/home/process";
import { Join } from "@/content/home/join";
import { HomeMotion } from "@/content/home/home-motion";
import { Stage } from "@/content/home/stage";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`.noema-loader{display:none}body.is-loading{height:auto;overflow:auto}`}</style>
      </noscript>
      <Loader />
      {/* one background, one grid, one 3D stage for the whole page */}
      <div className="home-backdrop" id="homeBackdrop" aria-hidden="true"></div>
      <Stage />
      <div className="home-grid" id="homeGrid" aria-hidden="true"></div>
      <main className="home-main">
        <Hero />
        <Interlude />
        <Product />
        <Archive />
        <Manifesto />
        <Builder />
        <Board />
        <Process />
        <Join />
      </main>
      <HomeMotion />
    </>
  );
}
