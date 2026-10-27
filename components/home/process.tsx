import { ProcessMotion } from "@/components/home/process-motion";

const W = 1440;
const H = 960;

const HUB = { x: 900, y: 18 };

const branches = [
  {
    num: "01",
    title: "Blueprint",
    tone: "lilac",
    x: 240,
    y: 450,
    leaves: [
      { text: "Talk to users", dx: -130, y: 720 },
      { text: "Pick the stack", dx: 130, y: 720 },
      { text: "Design that converts", dx: 0, y: 860 },
    ],
  },
  {
    num: "02",
    title: "Build",
    tone: "forest",
    x: 720,
    y: 520,
    leaves: [
      { text: "Polish every pixel", dx: -130, y: 740 },
      { text: "Tests that matter", dx: 130, y: 740 },
      { text: "Demo every week", dx: 0, y: 870 },
    ],
  },
  {
    num: "03",
    title: "Ship",
    tone: "tangerine",
    x: 1200,
    y: 450,
    leaves: [
      { text: "Docker + CI/CD", dx: -130, y: 720 },
      { text: "Minimal downtime", dx: 130, y: 720 },
      { text: "Fix fast", dx: 0, y: 860 },
    ],
  },
] as const;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;
const at = (x: number, y: number) => ({ left: pct(x, W), top: pct(y, H) });

/** Branch curve from the hub down to the top of a node. */
const trunk = (x: number, y: number) =>
  `M${HUB.x} ${HUB.y + 30} C${HUB.x} ${y - 200} ${x} ${y - 230} ${x} ${y - 56}`;

/** Thin line from the bottom of a node to the top of a leaf. */
const twig = (x: number, y: number, lx: number, ly: number) =>
  `M${x} ${y + 56} C${x} ${(y + ly) / 2 + 40} ${lx} ${(y + ly) / 2 - 40} ${lx} ${ly - 26}`;

export const Process = () => (
  <section className="site-process" id="process">
    <div className="site-process__map" data-map="">
      <div className="site-process__head">
        <span className="site-process__label">How I work</span>
        <h2 className="site-process__headline">Plan it. Build it. Ship it.</h2>
      </div>

      <svg className="site-process__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {branches.map((b, i) => (
          <g key={b.title} data-branch={i}>
            <path
              data-trunk=""
              d={trunk(b.x, b.y)}
              className="site-process__trunk"
              pathLength={1}
            />
            {b.leaves.map((leaf) => (
              <path
                key={leaf.text}
                data-twig=""
                d={twig(b.x, b.y, b.x + leaf.dx, leaf.y)}
                className="site-process__twig"
                pathLength={1}
              />
            ))}
          </g>
        ))}
      </svg>

      <div className="site-process__pos" style={at(HUB.x, HUB.y)}>
        <span className="site-process__hub" data-hub="">
          Your idea
        </span>
      </div>

      {branches.map((b, i) => (
        <div className="site-branch" key={b.title} data-branch={i}>
          <div className="site-process__pos" style={at(b.x, b.y)}>
            <div className={`site-node site-node--${b.tone}`} data-node="">
              <span className="site-node__num">{b.num}</span>
              <h3>{b.title}</h3>
            </div>
          </div>

          {b.leaves.map((leaf, j) => (
            <div className="site-process__pos" style={at(b.x + leaf.dx, leaf.y)} key={leaf.text}>
              <span className="site-leaf" data-leaf="" style={{ rotate: `${(j - 1) * 2.5}deg` }}>
                {leaf.text}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>

    <ProcessMotion />
  </section>
);
