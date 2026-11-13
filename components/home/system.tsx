import type { CSSProperties, ReactNode } from "react";
import { Brace } from "@/components/ui/brace";
import { SystemMotion } from "@/components/home/system-motion";

const TITLE = "From tech chaos to a working system.";

const COPY =
  "Orders in WhatsApp, stock in a spreadsheet, payments somewhere else. I connect your store, M-Pesa and card payments, stock and customers into one system your team actually uses.";

/** A point on the board: x/y on desktop, mx/my on small screens, as % of the board. */
type Spot = { x: number; y: number; mx: number; my: number };

const spot = ({ x, y, mx, my }: Spot) =>
  ({ "--x": `${x}%`, "--y": `${y}%`, "--mx": `${mx}%`, "--my": `${my}%` }) as CSSProperties;

const ICONS: Record<string, ReactNode> = {
  chat: (
    <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-5 4v-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
  chart: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="m7 15 3-4 3 2 4-5" />
    </>
  ),
  sheet: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M3 15h18M9 4v16" />
    </>
  ),
  bell: <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4ZM10 20a2 2 0 0 0 4 0" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 15h2M14 15h2" />
    </>
  ),
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 10 4 4 0 0 0 7 18Z" />,
};

/**
 * The apps, in the order they get wired up (clockwise from the folder).
 * `from` is where each one lies in the mess, tilted by `r`; `to` is its slot around the hub.
 */
const APPS = [
  {
    icon: "folder",
    tone: "#ff6a2b",
    badge: 4,
    r: 6,
    from: { x: 6, y: 40, mx: 9, my: 36 },
    to: { x: 28, y: 44, mx: 20, my: 50 },
  },
  {
    icon: "bell",
    tone: "#c7e86b",
    badge: 9,
    r: -10,
    from: { x: 32, y: 84, mx: 22, my: 86 },
    to: { x: 46, y: 20, mx: 38, my: 42 },
  },
  {
    icon: "chat",
    tone: "#8fe3b8",
    badge: 2,
    r: -8,
    from: { x: 10, y: 18, mx: 13, my: 14 },
    to: { x: 70, y: 22, mx: 67, my: 43 },
  },
  {
    icon: "sheet",
    tone: "#c7e86b",
    badge: 0,
    r: 4,
    from: { x: 53, y: 24, mx: 76, my: 11 },
    to: { x: 85, y: 42, mx: 84, my: 55 },
  },
  {
    icon: "mail",
    tone: "#ffc21a",
    badge: 12,
    r: 8,
    from: { x: 69, y: 88, mx: 66, my: 84 },
    to: { x: 83, y: 70, mx: 82, my: 68 },
  },
  {
    icon: "calendar",
    tone: "#c9b6ff",
    badge: 0,
    r: -6,
    from: { x: 95, y: 88, mx: 88, my: 80 },
    to: { x: 67, y: 86, mx: 62, my: 78 },
  },
  {
    icon: "chart",
    tone: "#ffb4a2",
    badge: 0,
    r: -5,
    from: { x: 30, y: 38, mx: 40, my: 30 },
    to: { x: 42, y: 86, mx: 35, my: 77 },
  },
  {
    icon: "cloud",
    tone: "#f2efe6",
    badge: 0,
    r: 10,
    from: { x: 97, y: 72, mx: 88, my: 46 },
    to: { x: 24, y: 70, mx: 16, my: 65 },
  },
] as const;

const NOTES = [
  { text: "Which CRM??", tone: "#ffcf33", r: -3, at: { x: 17, y: 57, mx: 20, my: 58 } },
  {
    text: "Password is on the fridge",
    tone: "#ffcf33",
    r: 3,
    at: { x: 40, y: 79, mx: 46, my: 76 },
  },
  {
    text: "M-Pesa total doesn't match",
    tone: "#ffcf33",
    r: 7,
    at: { x: 64, y: 42, mx: 60, my: 44 },
  },
  { text: "Export to Excel. Again.", tone: "#ff9f7a", r: 9, at: { x: 80, y: 27, mx: 48, my: 15 } },
  { text: "Who owns this?", tone: "#c7e86b", r: -4, at: { x: 91, y: 38, mx: 82, my: 64 } },
] as const;

const CABLES = [
  { tone: "#f2efe6", r: 8, at: { x: 34, y: 17, mx: 30, my: 48 } },
  { tone: "#8fe3b8", r: 22, at: { x: 93, y: 52, mx: 86, my: 30 } },
  { tone: "#ff6a2b", r: -12, at: { x: 11, y: 84, mx: 14, my: 72 } },
] as const;

const HUB: Spot = { x: 56, y: 56, mx: 50, my: 60 };
const BRACE: Spot = { x: 48.5, y: 72, mx: 42, my: 71 };

/** Second section: a mess of apps, sticky notes and loose cables gets put in order around the business. */
export const System = () => (
  <section className="site-system" id="about" aria-labelledby="system-title">
    <div className="site-system__pin">
      <header className="site-system__head">
        <span className="site-system__label" data-sys="label">
          Operations, in order
        </span>
        <h2 className="site-system__title" id="system-title" aria-label={TITLE}>
          {TITLE.split(" ").map((word, i) => (
            <span key={i}>
              <span className="site-system__mask" aria-hidden="true">
                <span className="site-system__word" data-sys="word">
                  {word}
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>
        <p className="site-system__copy" data-sys="copy">
          {COPY}
        </p>
      </header>

      <span className="site-system__hint" data-sys="hint" aria-hidden="true">
        go on, pull them around
      </span>

      <div
        className="site-system__board"
        role="img"
        aria-label="Scattered apps, sticky notes and loose cables pulled into one connected system around your business."
        data-sys="board"
      >
        <svg className="site-system__wires" aria-hidden="true" data-sys="wires">
          <g className="site-system__wires-base">
            {APPS.map((app) => (
              <path key={app.icon} pathLength={1} data-sys="wire" />
            ))}
          </g>
          <g className="site-system__wires-live">
            {APPS.map((app) => (
              <path key={app.icon} pathLength={1} data-sys="live" />
            ))}
          </g>
        </svg>

        {/* Empty anchors marking where each app ends up; the wires and the motion aim at these. */}
        {APPS.map((app) => (
          <span
            className="site-system__spot"
            style={spot(app.to)}
            key={`slot-${app.icon}`}
            data-sys="slot"
          />
        ))}

        {CABLES.map((c, i) => (
          <span className="site-system__spot" style={spot(c.at)} key={`cable-${i}`}>
            <svg
              className="site-system__cable"
              viewBox="0 0 160 60"
              data-sys="cable"
              data-r={c.r}
              style={{ transform: `rotate(${c.r}deg)` }}
            >
              <path className="site-system__cable-out" d="M24 30C48 4 72 56 96 30S124 8 136 30" />
              <path
                className="site-system__cable-in"
                d="M24 30C48 4 72 56 96 30S124 8 136 30"
                stroke={c.tone}
              />
              <path className="site-system__prong" d="M0 26h4M0 34h4M156 26h4M156 34h4" />
              <rect x="4" y="22" width="20" height="16" rx="3" fill={c.tone} />
              <rect x="136" y="22" width="20" height="16" rx="3" fill={c.tone} />
            </svg>
          </span>
        ))}

        {NOTES.map((n) => (
          <span className="site-system__spot" style={spot(n.at)} key={n.text}>
            <span
              className="site-system__note"
              style={{ background: n.tone, transform: `rotate(${n.r}deg)` }}
              data-sys="note"
              data-r={n.r}
            >
              {n.text}
            </span>
          </span>
        ))}

        {APPS.map((app) => (
          <span className="site-system__spot" style={spot(app.from)} key={app.icon}>
            <span
              className="site-system__app"
              style={{ background: app.tone, transform: `rotate(${app.r}deg)` }}
              data-sys="app"
              data-r={app.r}
            >
              <svg viewBox="0 0 24 24" className="site-system__icon">
                {ICONS[app.icon]}
              </svg>
              {app.badge > 0 && (
                <span className="site-system__badge" data-sys="badge">
                  <span>{app.badge}</span>
                </span>
              )}
            </span>
          </span>
        ))}

        <span className="site-system__spot" style={spot(HUB)} data-sys="hub-slot">
          <span className="site-system__hub" data-sys="hub">
            <strong>Your business</strong>
            <small>One connected system</small>
          </span>
        </span>

        <span className="site-system__spot" style={spot(BRACE)}>
          <span className="site-system__brace" data-sys="brace">
            <Brace tracking />
          </span>
        </span>
      </div>
    </div>

    <SystemMotion />
  </section>
);
