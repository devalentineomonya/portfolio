import { heroContent } from "@/data/hero";
import { Brace } from "@/components/ui/brace";
import { CtaMotion } from "@/components/home/cta-motion";

const { links } = heroContent;

export const Cta = () => (
  <section className="site-cta" id="contact">
    <span className="site-cta__label">Contact</span>
    <h2 className="site-cta__headline">
      Have a project?
      <br />
      Plug me in.
    </h2>

    <svg className="site-cta__cable" aria-hidden="true">
      <path data-cable="" fill="none" />
    </svg>

    <div className="site-cta__plug" data-plug="" aria-hidden="true">
      <svg viewBox="0 0 110 56">
        <rect x="0" y="12" width="26" height="8" rx="2" fill="#151515" />
        <rect x="0" y="36" width="26" height="8" rx="2" fill="#151515" />
        <rect x="24" y="2" width="74" height="52" rx="14" fill="#151515" />
        <rect
          x="20"
          y="0"
          width="74"
          height="52"
          rx="14"
          fill="#F2EFE6"
          stroke="#151515"
          strokeWidth="4"
        />
        <path d="M44 18 H70 M44 34 H70" stroke="#151515" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>

    <div className="site-cta__row">
      <div className="site-cta__stage">
        <Brace className="site-cta__brace" data-brace="" />
        <a className="site-cta__mail" href={links.email} data-mail="">
          <span>{links.emailAddress}</span>
          <span className="site-outlet" data-outlet="" aria-hidden="true">
            <i />
            <i />
          </span>
        </a>
      </div>

      <ul className="site-cta__links">
        <li>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={links.studio} target="_blank" rel="noreferrer">
            Studio
          </a>
        </li>
      </ul>
    </div>

    <CtaMotion />
  </section>
);
