import { workProjects } from "@/data/work";

/**
 * One scene runs behind the whole home page: a fixed background colour, one
 * grid and a 3D ring of project screens. Each section names a SceneState; the
 * director in home-motion blends between them as you scroll and the stage
 * (stage.tsx) eases toward the result every frame. Nothing else moves the ring.
 */
export interface SceneState {
  /** ring position in world units; the camera sits at z = 11 */
  x: number;
  y: number;
  z: number;
  scale: number;
  /** tilt toward the camera (rad): 0 is face-on, ~1.4 is edge-on */
  tiltX: number;
  tiltZ: number;
  opacity: number;
  /** idle spin, rad per second */
  spin: number;
  /** 0 = screens at full colour, 1 = greyscale */
  gray: number;
  /** how far the screens are washed toward the violet tint */
  tint: number;
  /** 1 = the ring stops spinning and turns to the focused project */
  lock: number;
  bg: string;
  /** grid lines and dust */
  ink: string;
}

const VIOLET = "#6d27da";
const IRIS = "#4f46e5";
const INK = "#0f0a1f";
const LAVENDER = "#ece8f3";
const LILAC = "#cbb6f6";
const WHITE = "#ffffff";
const BLACK = "#000000";

const hidden = { opacity: 0, spin: 0.1, gray: 1, tint: 0.6, lock: 0 };

export const SCENES = {
  hero: {
    x: 0, y: 0.1, z: 0, scale: 0.8, tiltX: 0.3, tiltZ: -0.1,
    opacity: 1, spin: 0.12, gray: 0.2, tint: 0.85, lock: 0,
    bg: VIOLET, ink: WHITE,
  },
  /** end of the hero pin: the camera has flown into the ring */
  heroOut: {
    x: 0, y: 0, z: 3.5, scale: 1.9, tiltX: 0.08, tiltZ: -0.02,
    opacity: 0.9, spin: 0.3, gray: 0.2, tint: 0.85, lock: 0,
    bg: VIOLET, ink: WHITE,
  },
  interlude: {
    x: 0, y: 0.4, z: -7, scale: 1.1, tiltX: 0.42, tiltZ: -0.06,
    opacity: 0.55, spin: 0.16, gray: 0.3, tint: 0.95, lock: 0,
    bg: VIOLET, ink: WHITE,
  },
  product: {
    x: 0, y: -4.2, z: -2, scale: 1.2, tiltX: 1.3, tiltZ: 0,
    ...hidden, bg: IRIS, ink: WHITE,
  },
  archive: {
    x: -0.35, y: 0.05, z: 0.4, scale: 0.92, tiltX: 0.06, tiltZ: 0,
    opacity: 1, spin: 0, gray: 0, tint: 0, lock: 1,
    bg: INK, ink: WHITE,
  },
  manifesto: {
    x: 0, y: 4.5, z: -2, scale: 0.9, tiltX: -0.5, tiltZ: 0.1,
    ...hidden, bg: LAVENDER, ink: BLACK,
  },
  builder: {
    x: 0, y: 4.5, z: -2, scale: 0.9, tiltX: -0.5, tiltZ: 0.1,
    ...hidden, bg: LAVENDER, ink: BLACK,
  },
  board: {
    x: 0, y: 4.5, z: -2, scale: 0.9, tiltX: -0.5, tiltZ: 0.1,
    ...hidden, bg: LILAC, ink: BLACK,
  },
  process: {
    x: 0, y: -4.5, z: -2, scale: 0.9, tiltX: 1.2, tiltZ: 0,
    ...hidden, bg: INK, ink: WHITE,
  },
  join: {
    x: -1.4, y: 0.35, z: -1, scale: 0.6, tiltX: 0.36, tiltZ: 0.12,
    opacity: 0.95, spin: 0.1, gray: 0.2, tint: 0.85, lock: 0,
    bg: VIOLET, ink: WHITE,
  },
} satisfies Record<string, SceneState>;

export type SceneName = keyof typeof SCENES;

/** Live values: the director writes `target`, the stage reads it. */
export const scene = {
  target: toBlend(SCENES.hero),
  /** 0..ring.length-1, which project faces the camera while locked */
  focus: 0,
  /** 0 → 1 as the loader hands over to the page */
  intro: 0,
  /** pointer, -1..1 from the centre of the viewport */
  pointer: { x: 0, y: 0 },
  /** the stage fills this in so clicks on the front screen can open it */
  hoveredProject: -1,
};

/** The eight projects on the ring, in ring order. */
export const ringProjects = workProjects
  .filter((p) => !p.archived && p.image)
  .map((p) => ({
    title: p.title,
    category: p.category,
    description: p.description,
    technologies: p.technologies,
    status: p.status ?? "Live",
    image: p.image as string,
    url: p.url,
  }));

export type Rgb = [number, number, number];

/** A SceneState with its colours as 0..255 channels, ready to blend. */
export type Blend = Omit<SceneState, "bg" | "ink"> & { bg: Rgb; ink: Rgb };

// Declarations, not arrow consts: `scene` above calls these at module load.
export function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function toBlend(state: SceneState): Blend {
  return { ...state, bg: hexToRgb(state.bg), ink: hexToRgb(state.ink) };
}

/** Moves every number in `from` toward `to` by t, in place. */
export const blendInto = (from: Blend, to: Blend, t: number) => {
  const keys = Object.keys(to) as Array<keyof Blend>;
  for (const key of keys) {
    const a = from[key];
    const b = to[key];
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < 3; i++) a[i] += (b[i] - a[i]) * t;
    } else if (typeof a === "number" && typeof b === "number") {
      (from[key] as number) = a + (b - a) * t;
    }
  }
  return from;
};

export const rgbCss = ([r, g, b]: Rgb) =>
  `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
