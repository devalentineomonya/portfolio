import type { SVGProps } from "react";

interface BraceProps extends SVGProps<SVGSVGElement> {
  /** Lets the intro script make the pupils follow the cursor. */
  tracking?: boolean;
}

/** Brace, the mascot: a tangerine blob with curly-brace arms and big eyes. */
export const Brace = ({ tracking = false, ...props }: BraceProps) => (
  <svg
    viewBox="0 0 160 190"
    role="img"
    aria-label="Brace, the tangerine mascot"
    data-eyes={tracking ? "" : undefined}
    {...props}
  >
    <g className="b-legl">
      <path d="M62 130 L58 162" stroke="#151515" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="50" cy="168" rx="14" ry="7" fill="#151515" />
    </g>
    <g className="b-legr">
      <path d="M98 130 L102 162" stroke="#151515" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="110" cy="168" rx="14" ry="7" fill="#151515" />
    </g>
    <g className="b-body">
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
        className="b-armr"
        d="M134 40 C148 40 138 70 150 80 C138 90 148 120 134 120"
        fill="none"
        stroke="#151515"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g className="b-eyes">
        <circle
          className="b-eye"
          cx="62"
          cy="72"
          r="16"
          fill="#FFFFFF"
          stroke="#151515"
          strokeWidth="3"
        />
        <circle className="b-pupil" cx="62" cy="72" r="6" fill="#151515" />
        <circle
          className="b-eye"
          cx="98"
          cy="72"
          r="16"
          fill="#FFFFFF"
          stroke="#151515"
          strokeWidth="3"
        />
        <circle className="b-pupil" cx="98" cy="72" r="6" fill="#151515" />
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

/** Just the eyes, for the "creative studio" style sign-off beside the logo. */
export const Eyes = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 84 44" aria-hidden="true" data-eyes="" {...props}>
    <circle
      className="b-eye"
      cx="22"
      cy="22"
      r="19"
      fill="#FFFFFF"
      stroke="#151515"
      strokeWidth="3"
    />
    <circle className="b-pupil" cx="22" cy="22" r="8" fill="#151515" />
    <circle
      className="b-eye"
      cx="62"
      cy="22"
      r="19"
      fill="#FFFFFF"
      stroke="#151515"
      strokeWidth="3"
    />
    <circle className="b-pupil" cx="62" cy="22" r="8" fill="#151515" />
  </svg>
);
