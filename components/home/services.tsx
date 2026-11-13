import { Fragment, type ReactNode } from "react";
import { heroContent } from "@/data/hero";
import { Brace } from "@/components/ui/brace";
import { ServicesMotion } from "@/components/home/services-motion";

const TONES = ["#fbf1cf", "#8fe3b8", "#ffc21a", "#f7d0c6"];

/** Little window with a title bar, used by the payments scene. */
const Window = ({ title, className }: { title: string; className: string }) => (
  <span className={`sc-window ${className}`}>
    <span className="sc-window__bar">
      <i />
      <i />
      {title}
    </span>
    <span className="sc-window__line" />
    <span className="sc-window__line sc-window__line--short" />
    <span className="sc-window__check" data-s="check">
      ✓
    </span>
  </span>
);

/** One illustration per service: Brace acting it out, like a slide in a pitch. */
const SCENES: ReactNode[] = [
  // E-commerce: Brace weighs up the products, then one gets picked and ordered.
  <Fragment key="store">
    <span className="sc-bubble" data-s="bubble">
      <i />
      <i />
      <span className="sc-bubble__mark" data-s="ask">
        ?
      </span>
      <span className="sc-bubble__mark" data-s="got">
        !
      </span>
    </span>
    <span className="sc-products">
      {["#ff9f7a", "#8fe3b8", "#c9b6ff"].map((tone, i) => (
        <span className="sc-product" data-s={i === 1 ? "pick" : undefined} key={tone}>
          <span className="sc-product__img" style={{ background: tone }} />
          <span className="sc-product__lines">
            <i />
            <i />
          </span>
          <span className="sc-product__price">KSh {["1,800", "2,400", "3,100"][i]}</span>
          {i === 1 && (
            <span className="sc-product__ring" data-s="ring">
              <span className="sc-chip">+1 order</span>
            </span>
          )}
        </span>
      ))}
    </span>
  </Fragment>,
  // Payments: Brace plugs the checkout into M-Pesa and both sides go green.
  <Fragment key="payments">
    <Window title="Checkout" className="sc-window--left" />
    <Window title="M-Pesa" className="sc-window--right" />
    <svg className="sc-cables" viewBox="0 0 100 100" preserveAspectRatio="none" data-s="cables">
      {["M25 46C25 72 36 80 47 74", "M75 54C75 78 64 82 53 74"].map((d) => (
        <g key={d}>
          <path className="sc-cables__out" d={d} />
          <path className="sc-cables__in" d={d} />
        </g>
      ))}
    </svg>
  </Fragment>,
  // Business systems: the layers drop onto the stack one at a time.
  <span className="sc-stack" key="systems">
    {["POS · ERP · CRM", "API", "Database"].map((label, i) => (
      <span className={`sc-layer sc-layer--${i}`} data-s="layer" key={label}>
        {label}
      </span>
    ))}
  </span>,
  // Launch: the plan goes up on the board and the first customers pay.
  <Fragment key="launch">
    <span className="sc-board">
      <span className="sc-board__row">
        {["Idea", "Live", "Paid"].map((step, i) => (
          <span className="sc-board__step" data-s="step" key={step}>
            {i > 0 && <span className="sc-board__arrow" data-s="arrow" />}
            {step}
          </span>
        ))}
      </span>
      <span className="sc-board__note" data-s="note">
        first customer!
      </span>
    </span>
    <span className="sc-crowd">
      {["#8fe3b8", "#ffd84a", "#ff9f7a"].map((tone) => (
        <span className="sc-head" style={{ background: tone }} key={tone}>
          <span className="sc-coin" data-s="coin">
            KSh
          </span>
        </span>
      ))}
    </span>
  </Fragment>,
];

/** Services: full-screen slides that wipe in over each other while pinned, then the run path starts. */
export const Services = () => (
  <section className="site-services" id="services">
    <span className="site-services__label">What I build</span>
    <h2 className="site-services__headline">Websites that sell. Systems that run.</h2>

    <div className="site-slides" data-slides="">
      <div className="site-slides__pin">
        <ol className="site-slides__card">
          {heroContent.services.map((service, i) => (
            <li
              className={`site-slide site-slide--${i}`}
              style={{ background: TONES[i] }}
              data-slide=""
              key={service.short}
            >
              <div className="site-slide__text">
                <span className="site-slide__num">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(heroContent.services.length).padStart(2, "0")}
                </span>
                <h3 className="site-slide__title">
                  {/* Non-breaking hyphen: "E-Commerce" stays on one line. */}
                  {service.short.replace("-", "\u2011")}
                </h3>
                <p className="site-slide__sub">{service.title}</p>
                <p className="site-slide__detail">{service.detail}</p>
                <ul className="site-slide__tags">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="site-slide__scene" aria-hidden="true">
                <span className="site-slide__ground" />
                {SCENES[i]}
                <span className="site-slide__brace">
                  <Brace aria-hidden="true" />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>

    <div className="site-services__body">
      {/* Empty on purpose: the run path draws through this space once the slides are done. */}
      <div className="site-walk" aria-hidden="true" />

      <div className="site-services__next">
        <p>
          Most projects mix all four: a store that takes M-Pesa, wired into the stock system behind
          it.
        </p>
        <span className="site-services__hint">here&apos;s some of it, live</span>
      </div>
    </div>

    <ServicesMotion />
  </section>
);
