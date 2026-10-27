import { heroContent } from "@/data/hero";
import { PhysicsStack } from "@/components/home/physics-stack";

export const Services = () => (
  <section className="site-services" id="services">
    <span className="site-services__label">What I build</span>
    <h2 className="site-services__headline">From pixels to production.</h2>

    <div className="site-services__body">
      {/* Empty on purpose: the run path draws through this space. */}
      <div className="site-walk" aria-hidden="true" />

      <div className="site-services__side">
        <PhysicsStack />

        <ul className="site-services__list">
          {heroContent.services.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
