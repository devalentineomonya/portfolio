import { heroContent } from "@/data/hero";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Brace, Eyes } from "@/components/ui/brace";
import { NairobiClock } from "@/components/home/nairobi-clock";
import { RoleOrb } from "@/components/home/role-orb";
import { PhysicsPills } from "@/components/home/physics-pills";

const WORD = "valentine";

export const Hero = () => (
  <section className="site-hero" id="top">
    <div className="site-topbar" data-hero="fade">
      <NairobiClock />
      <RoleOrb />
      <a className="site-topbar__mail" href={heroContent.links.email}>
        {heroContent.links.emailAddress}
      </a>
    </div>

    <h1 className="site-word" aria-label={WORD}>
      {WORD.split("").map((letter, i) => (
        <span className="site-mask" key={i} aria-hidden="true">
          <span className="site-letter" data-hero="letter">
            {letter}
          </span>
        </span>
      ))}
    </h1>

    <div className="site-bottom">
      <div className="site-intro" data-hero="fade">
        <div className="site-sign">
          <span className="site-hand">software engineer</span>
          <Eyes className="site-sign__eyes" />
        </div>
        <p className="site-copy">{heroContent.copy}</p>
        <div className="site-actions">
          <a className="site-btn site-btn--solid" href="/work">
            See my work
            <ArrowUpRightIcon className="site-btn__icon" strokeWidth={2} />
          </a>
          <a className="site-btn" href={heroContent.links.email}>
            Say hello
          </a>
        </div>
      </div>

      <div className="site-panel" data-hero="panel">
        <p className="site-panel__title" data-hero="fade">
          Open for a full-time role, remote or local, in any of these fields.
        </p>

        <div className="site-panel__brace" data-hero-brace="">
          <Brace tracking />
        </div>
        <PhysicsPills />
      </div>
    </div>
  </section>
);
