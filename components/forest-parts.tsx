/* Shared forest artwork for the reveal/restore scenes: tree images placed
 * across depth layers that slide different distances on scroll (--slide in
 * globals.css) — near travels furthest, which is what sells the parallax. */

/** Shared atmosphere (mist, shafts, ground, motes) — all styling in globals.css. */
export function ForestAtmosphere() {
  return (
    <>
      <div className="forest-mist forest-mist-far" aria-hidden />
      <div className="forest-mist forest-mist-close" aria-hidden />
      <div className="forest-lightshafts" aria-hidden />
      <div className="forest-ground" aria-hidden />
      <div className="forest-motes" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  );
}

/* Embers generated with index math — deterministic, so SSR and client render
 * the same markup (Math.random() here would be a hydration mismatch). The flight
 * loop is time-based, not scroll-driven, so this drops into any scene. */
const EMBER_COUNT = 22;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: (i * 100) / (EMBER_COUNT - 1) + (((i * 13) % 7) - 3),
  bottom: 14 + ((i * 23) % 54),
  size: 0.3 + ((i * 11) % 4) * 0.1,
  red: i % 3 === 2,
  delay: -((i * 1.7) % 8),
  duration: 6 + ((i * 5) % 9) * 0.5,
}));

/** Drifting embers. `className` lets a scene add its own positioning/z-index. */
export function EmberField({ className }: { className?: string }) {
  return (
    <div className={`forest-embers ${className ?? ""}`} aria-hidden>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          style={{
            left: `${e.left}%`,
            bottom: `${e.bottom}%`,
            width: `calc(${e.size} * var(--fu, 1vh))`,
            height: `calc(${e.size} * var(--fu, 1vh))`,
            background: e.red ? "#f87171" : "#fdba74",
            boxShadow: e.red
              ? "0 0 5px 2px rgba(220, 38, 38, 0.6)"
              : "0 0 6px 2px rgba(249, 115, 22, 0.65)",
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Casting: 0–2 (oaks) carry the forest; 3 (chestnut) is an accent; 4+5 are the
// riparian pair and only ever appear side by side — they grow along water.
const TREE_IMAGES = [
  "/trees/sobreiro.webp", // 0 — cork oak, the protagonist
  "/trees/carvalho.webp", // 1 — common oak
  "/trees/azinheira.webp", // 2 — holm oak
  "/trees/castanheiro.webp", // 3 — chestnut (sparing)
  "/trees/freixo.webp", // 4 — ash (riparian pair, sparing)
  "/trees/salgueiro.webp", // 5 — willow (riparian pair, sparing)
  "/trees/mato.webp", // 6 — understory shrubs (pilriteiro + giesta), pre-darkened
];

/** img = index into TREE_IMAGES; left = % across; height = --fu units (≈vh); flip = mirror. */
export type ImgTree = { img: number; left: number; height: number; flip?: boolean };

/* One depth layer; the layer div is what the CSS slides. `sink` overhangs the
 * artwork's ground mound below the stage so trunk bases sit on the ground line.
 * Sizes are multiples of --fu (globals.css) so phones get a zoomed-out forest. */
export function ImgTreeLayer({
  trees,
  className,
  sink = 0,
}: {
  trees: ImgTree[];
  className?: string;
  sink?: number;
}) {
  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      {trees.map((t, i) => (
        <img
          key={i}
          src={TREE_IMAGES[t.img]}
          alt=""
          aria-hidden
          draggable={false}
          style={{
            position: "absolute",
            bottom: `calc(${-sink} * var(--fu, 1vh))`,
            left: `${t.left}%`,
            height: `calc(${t.height} * var(--fu, 1vh))`,
            transform: `translateX(-50%) scaleX(${t.flip ? -1 : 1})`,
          }}
        />
      ))}
    </div>
  );
}

// Permanent backdrop: no reveal-*/restore-* class, so the parting animation
// never matches it — the centre stays wooded. Index-driven values keep the
// generated band deterministic (SSR-safe).
const BACKDROP_COUNT = 30;
const BACKDROP_MIX = [0, 1, 2, 0, 3, 1, 4, 5, 2, 0, 1, 2, 3, 0, 2];
export const BACKDROP: ImgTree[] = Array.from({ length: BACKDROP_COUNT }, (_, i) => ({
  img: BACKDROP_MIX[i % BACKDROP_MIX.length],
  left: (i * 100) / (BACKDROP_COUNT - 1) + (i % 2 === 0 ? 0 : 2.5) - 2,
  height: 22 + ((i * 7) % 5) * 3,
  flip: i % 2 === 0,
}));

// Reveal stay-layer: the final domino piece — barely slides, opening only a
// ~20vw centre gap so the scene never fully unfolds.
const STAY_MIX = [1, 2, 0, 2, 1, 0, 3, 2];
const STAY_HALF = 13;
function stayHalf(from: number, to: number, seed: number): ImgTree[] {
  return Array.from({ length: STAY_HALF }, (_, i) => ({
    img: STAY_MIX[(i + seed) % STAY_MIX.length],
    left: from + (i * (to - from)) / (STAY_HALF - 1) + (i % 2 === 0 ? 0 : 1.8),
    height: 37 + (((i + seed) * 7) % 5) * 2,
    flip: (i + seed) % 2 === 0,
  }));
}
export const REVEAL_STAY_LEFT = stayHalf(-2, 46, 0);
export const REVEAL_STAY_RIGHT = stayHalf(54, 102, 3);

// Depth compositions, near (front, slides fastest) → far3 (back, slowest).
// Hand-placed: centre stays dense so the scene reads as closed before parting;
// the riparian pair only sits together at the FAR layer's outer edges.
const LEFT_NEAR: ImgTree[] = [
  { img: 0, left: 6, height: 84 },
  { img: 6, left: 17, height: 40, flip: true },
];
const RIGHT_NEAR: ImgTree[] = [
  { img: 2, left: 94, height: 84, flip: true },
  { img: 6, left: 83, height: 42 },
];

const LEFT_MID: ImgTree[] = [
  { img: 2, left: 0, height: 74 },
  { img: 1, left: 9, height: 71, flip: true },
  { img: 3, left: 15, height: 69, flip: true },
  { img: 6, left: 24, height: 34 },
  { img: 0, left: 32, height: 76 },
  { img: 1, left: 40, height: 72, flip: true },
  { img: 2, left: 47, height: 71 },
];
const RIGHT_MID: ImgTree[] = [
  { img: 1, left: 100, height: 74, flip: true },
  { img: 2, left: 91, height: 71 },
  { img: 3, left: 85, height: 69 },
  { img: 6, left: 77, height: 33, flip: true },
  { img: 0, left: 68, height: 76, flip: true },
  { img: 2, left: 60, height: 72 },
  { img: 1, left: 53, height: 71 },
];

const LEFT_FAR: ImgTree[] = [
  { img: 5, left: 2, height: 62 },
  { img: 4, left: 10, height: 64, flip: true },
  { img: 2, left: 24, height: 60, flip: true },
  { img: 0, left: 40, height: 66 },
  { img: 1, left: 52, height: 62, flip: true },
  { img: 6, left: 32, height: 29 },
];
const RIGHT_FAR: ImgTree[] = [
  { img: 5, left: 98, height: 62, flip: true },
  { img: 4, left: 90, height: 64 },
  { img: 2, left: 76, height: 60 },
  { img: 6, left: 68, height: 28, flip: true },
  { img: 0, left: 60, height: 66, flip: true },
  { img: 1, left: 48, height: 62 },
];

const LEFT_FAR2: ImgTree[] = [
  { img: 0, left: 5, height: 58 },
  { img: 2, left: 20, height: 55, flip: true },
  { img: 1, left: 36, height: 60 },
  { img: 2, left: 50, height: 55, flip: true },
];
const RIGHT_FAR2: ImgTree[] = [
  { img: 0, left: 95, height: 58, flip: true },
  { img: 2, left: 80, height: 55 },
  { img: 1, left: 64, height: 60, flip: true },
  { img: 0, left: 50, height: 55 },
];

const LEFT_FAR3: ImgTree[] = [
  { img: 2, left: 12, height: 52 },
  { img: 0, left: 30, height: 50, flip: true },
  { img: 1, left: 46, height: 54 },
];
const RIGHT_FAR3: ImgTree[] = [
  { img: 3, left: 88, height: 52, flip: true },
  { img: 0, left: 70, height: 50 },
  { img: 1, left: 54, height: 54, flip: true },
];

/** Depth layers, back → front; `sink` grows with distance (see ImgTreeLayer). */
export const DEPTHS = [
  { name: "far3", left: LEFT_FAR3, right: RIGHT_FAR3, sink: 4 },
  { name: "far2", left: LEFT_FAR2, right: RIGHT_FAR2, sink: 4 },
  { name: "far", left: LEFT_FAR, right: RIGHT_FAR, sink: 3.5 },
  { name: "mid", left: LEFT_MID, right: RIGHT_MID, sink: 2 },
  { name: "near", left: LEFT_NEAR, right: RIGHT_NEAR, sink: 0 },
] as const;

/** Sink for the generated back bands (BACKDROP and the reveal stay-halves). */
export const BAND_SINK = 3;
