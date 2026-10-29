import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#151515";
const INK_SOFT = "#3a3530";
const MUTED = "#5a5750";
const CHALK = "#f2efe6";
const PAPER = "#fcfbf9";
const BUTTER = "#ffd84a";

/** The grid behind the card: a faint rule every five squares, and a dot at every crossing. */
const RULES =
  "linear-gradient(to right, rgba(21,21,21,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,21,21,0.06) 1px, transparent 1px)";
const DOTS = "radial-gradient(rgba(21,21,21,0.25) 2px, transparent 2px)";

const font = (file: string) => readFile(path.join(process.cwd(), "lib/og-fonts", file));

type Props = {
  /** Small line in the tab, e.g. "Work", "Experience", "Stories". */
  eyebrow?: string;
  title: string;
  /** One line under the title. Keep it punchy: it is read at thumbnail size. */
  subtitle?: string;
  badgeColor?: string;
  footerRight?: string;
};

/** Brace mascot rendered as an SVG mark. */
function BraceMark({ size = 72 }: { size?: number }) {
  const height = (size * 190) / 160;
  return (
    <svg width={size} height={height} viewBox="0 0 160 190">
      <g>
        <path d="M62 130 L58 162" stroke="#151515" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="50" cy="168" rx="14" ry="7" fill="#151515" />
      </g>
      <g>
        <path d="M98 130 L102 162" stroke="#151515" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="110" cy="168" rx="14" ry="7" fill="#151515" />
      </g>
      <g>
        <rect x="36" y="36" width="100" height="100" rx="40" fill="#151515" />
        <rect
          x="30"
          y="30"
          width="100"
          height="100"
          rx="40"
          fill="#FF6A2B"
          stroke="#151515"
          strokeWidth="4"
        />
        <path
          d="M26 40 C12 40 22 70 10 80 C22 90 12 120 26 120"
          fill="none"
          stroke="#151515"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M134 40 C148 40 138 70 150 80 C138 90 148 120 134 120"
          fill="none"
          stroke="#151515"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g>
          <circle cx="62" cy="72" r="16" fill="#FFFFFF" stroke="#151515" strokeWidth="3" />
          <circle cx="62" cy="72" r="6" fill="#151515" />
          <circle cx="98" cy="72" r="16" fill="#FFFFFF" stroke="#151515" strokeWidth="3" />
          <circle cx="98" cy="72" r="6" fill="#151515" />
        </g>
        <path
          d="M66 106 Q80 120 94 106"
          fill="none"
          stroke="#151515"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * Editorial OpenGraph card drawing the portfolio's signature aesthetic:
 * dotted grid background, solid ink outline, bold tab badge, and Brace mascot tile.
 */
export async function ogImage({
  eyebrow,
  title,
  subtitle,
  badgeColor = BUTTER,
  footerRight = "Taking on projects · Next.js & NestJS",
}: Props) {
  const [display, mono, text] = await Promise.all([
    font("BigShoulders.woff"),
    font("MartianMono.woff"),
    font("BricolageGrotesque.woff"),
  ]);

  const size = title.length <= 32 ? 96 : title.length <= 48 ? 78 : title.length <= 70 ? 68 : 56;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "64px 60px 56px",
        background: CHALK,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: RULES,
          backgroundSize: "180px 180px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: DOTS,
          backgroundSize: "36px 36px",
          backgroundPosition: "18px 18px",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "62px 56px 40px",
          background: PAPER,
          border: `4px solid ${INK}`,
          borderRadius: 22,
          boxShadow: `0 10px 0 ${INK}`,
        }}
      >
        {/* Eyebrow tab */}
        <div
          style={{
            position: "absolute",
            top: -26,
            left: 36,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "6px 20px",
            background: badgeColor,
            border: `3.5px solid ${INK}`,
            borderRadius: 12,
            color: INK,
            fontFamily: "Martian Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>devalentine.</span>
          {eyebrow ? <span style={{ opacity: 0.6 }}>/</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </div>

        {/* Mascot tile */}
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 112,
            height: 112,
            background: CHALK,
            border: `3.5px solid ${INK}`,
            borderRadius: 26,
            boxShadow: "0 6px 0 rgba(21,21,21,0.18)",
          }}
        >
          <BraceMark size={70} />
        </div>

        {/* Center copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 860,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: "Big Shoulders",
              fontSize: size,
              lineHeight: 0.92,
              letterSpacing: -1,
              textTransform: "uppercase",
              color: INK,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: "Bricolage Grotesque",
                fontSize: 27,
                lineHeight: 1.35,
                color: INK_SOFT,
                maxWidth: 820,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom rule and links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 18,
            borderTop: `2px dashed ${INK}`,
            fontFamily: "Martian Mono",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>devalentine.com</span>
          <span style={{ color: INK }}>{footerRight}</span>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 900, style: "normal" },
        { name: "Martian Mono", data: mono, weight: 500, style: "normal" },
        { name: "Bricolage Grotesque", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
