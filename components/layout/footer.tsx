import { heroContent } from "@/data/hero";
import { BackToTop } from "@/components/layout/back-to-top";
import { NairobiClock } from "@/components/home/nairobi-clock";

const { links, profile } = heroContent;

const SIGN_OFF = ["Full-time, remote or local", "Based in Nairobi", "Say hello"];

const PAGES = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Stories", href: "/stories" },
];

const ELSEWHERE = [
  { label: links.emailAddress, href: links.email },
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "Resume", href: links.resume },
];

export const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__marquee" aria-hidden="true">
      <div className="site-footer__track">
        {[0, 1].map((n) => (
          <div className="site-footer__set" key={n}>
            {SIGN_OFF.map((text) => (
              <span key={text}>
                {text}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="site-footer__grid">
      <div>
        <p className="site-footer__name">{profile.name}</p>
        <p className="site-footer__sub">
          {profile.role} in {profile.location}.
        </p>
        <p className="site-footer__time">
          Nairobi <NairobiClock />
        </p>
      </div>

      <nav aria-label="Pages">
        <h2>Pages</h2>
        <ul>
          {PAGES.map((page) => (
            <li key={page.label}>
              <a href={page.href}>{page.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Elsewhere">
        <h2>Elsewhere</h2>
        <ul>
          {ELSEWHERE.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="site-footer__bar">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <BackToTop />
    </div>
  </footer>
);
