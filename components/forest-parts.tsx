/**
 * Shared forest artwork for the reveal/restore scenes.
 *
 * The trees are illustrated PNG→WebP images (public/trees/*.webp), placed as a
 * dense, overlapping forest across three DEPTH layers (far / mid / near). Each
 * depth slides a different distance on scroll (`--slide` in globals.css), so the
 * near trees travel faster than the far ones — a parallax that sells perspective.
 * Instances are reused and flipped/resized for variety.
 *
 * `<ForestDefs />` still holds the gradients the burning eucalyptus needs; it is
 * rendered once at page level. `<ForestAtmosphere />` is the shared decorative
 * layer (mist, light shafts, ground plane, motes) both scenes render.
 */
export function ForestDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <radialGradient id="fol-euc" cx="0.4" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#c7d4c2" />
          <stop offset="1" stopColor="#5a7b60" />
        </radialGradient>
        <linearGradient id="bark-pale" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f5f5f4" />
          <stop offset="1" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient id="char" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0c0a09" />
        </linearGradient>
        <linearGradient id="flame-outer" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#b91c1c" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="flame-inner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#fde047" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Atmosphere overlay shared by the reveal and restore scenes: mist bands slotted
 * between the depth layers, diagonal light shafts, a forest-floor gradient and
 * drifting motes. Static markup only — every effect (and its reduced-motion
 * fallback) lives in globals.css.
 */
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

// Species artwork with a deliberate casting hierarchy:
// 0–2 (sobreiro, carvalho, azinheira) carry the forest and appear everywhere;
// 3 (castanheiro) is an occasional accent; 4+5 (freixo, salgueiro) are the
// riparian pair — they only ever appear side by side (a galeria ripícola grows
// along water, not scattered through a hillside), at the edges or in the back.
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

/**
 * One depth layer of tree images. The layer div is what the CSS slides.
 * `sink` pushes every image below the section bottom: the artwork's
 * elliptical ground mound puts the trunk base a little above the image's
 * bottom edge, so far layers read as floating unless they overhang — the
 * scrollport's overflow clipping hides the sunken part.
 *
 * Heights are multiples of `--fu` (defined on .forest-stage in globals.css):
 * `min(1vh, 1.5vw)`, i.e. 1vh on wide screens but width-clamped on phones so
 * the trees shrink with the viewport instead of overcrowding it.
 */
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

// ── Permanent backdrop ─────────────────────────────────────────────────────
// A dense band of small, far-off trees that ALWAYS fills the centre. Unlike the
// depth layers below, its layer div carries no `reveal-*`/`restore-*` class, so
// the parting animation's selectors never match it — it stays put while the
// forest opens, and the scene never reveals empty sky at its core.
// Generated (not hand-placed) so it can be truly dense: ~2 trees every 7% of
// width, in two slightly offset rows, with an index-driven (deterministic, so
// SSR-safe) uneven skyline.
// The mix is weighted (oaks dominate, chestnut occasional) and slots the
// freixo+salgueiro riparian pair in as adjacent entries, twice across the band.
const BACKDROP_COUNT = 30;
const BACKDROP_MIX = [0, 1, 2, 0, 3, 1, 4, 5, 2, 0, 1, 2, 3, 0, 2];
export const BACKDROP: ImgTree[] = Array.from({ length: BACKDROP_COUNT }, (_, i) => ({
  img: BACKDROP_MIX[i % BACKDROP_MIX.length],
  // Spread across the full width with a small per-row offset so trunks don't line up.
  left: (i * 100) / (BACKDROP_COUNT - 1) + (i % 2 === 0 ? 0 : 2.5) - 2,
  // 22–34vh, gently uneven so the treetops read as a distant canopy, not a wall.
  height: 22 + ((i * 7) % 5) * 3,
  flip: i % 2 === 0,
}));

// ── Reveal stay-layer ──────────────────────────────────────────────────────
// The FINAL domino piece of the reveal: two half-bands that barely slide
// (--slide in globals.css), opening a ~20vw gap at the centre and stopping —
// the scene never fully unfolds. Generated like BACKDROP; a shuffled image
// order (not 1-2-3-4 marching) so the band doesn't read as one repeated tree.
const STAY_MIX = [1, 2, 0, 2, 1, 0, 3, 2];
const STAY_HALF = 13;
function stayHalf(from: number, to: number, seed: number): ImgTree[] {
  return Array.from({ length: STAY_HALF }, (_, i) => ({
    img: STAY_MIX[(i + seed) % STAY_MIX.length],
    left: from + (i * (to - from)) / (STAY_HALF - 1) + (i % 2 === 0 ? 0 : 1.8),
    height: 37 + (((i + seed) * 7) % 5) * 2, // 37–45vh: 20% under the old band
    flip: (i + seed) % 2 === 0,
  }));
}
export const REVEAL_STAY_LEFT = stayHalf(-2, 46, 0);
export const REVEAL_STAY_RIGHT = stayHalf(54, 102, 3);

// ── Depth compositions ─────────────────────────────────────────────────────
// Left-side trees slide left, right-side slide right. Five depths from near
// (big, front, fastest) to far3 (back, slowest) build a deep forest; the
// centre columns keep the middle dense so it reads as closed before it parts.
// Even the deepest layer stays ≥50vh so the forest fills the frame.
// Casting per depth: near/mid are carried by the oak trio (one chestnut accent
// each side, mid only); the riparian freixo+salgueiro pair sits together at the
// outer edges of the FAR layer — background and sides, never centre stage.
// Understory shrubs (img 6) fill the gaps between trunks in near/mid/far, kept
// under half the height of their layer's trees, flips varied so the one asset
// reads as several different bushes.
// The foreground is deliberately sparse: ONE hero tree per side (~84vh, not
// full-bleed) plus a shrub; everything else lives from mid back, so the big
// trees frame the scene instead of walling it off.
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

/** Depth layers, back → front. The scene maps over these; the burning
 * eucalyptus is layered between `far` and `mid` purely via z-index (globals).
 * `sink` grows with distance: back layers overhang the bottom more so their
 * trunk bases sit on the ground line (see ImgTreeLayer). */
export const DEPTHS = [
  { name: "far3", left: LEFT_FAR3, right: RIGHT_FAR3, sink: 4 },
  { name: "far2", left: LEFT_FAR2, right: RIGHT_FAR2, sink: 4 },
  { name: "far", left: LEFT_FAR, right: RIGHT_FAR, sink: 3.5 },
  { name: "mid", left: LEFT_MID, right: RIGHT_MID, sink: 2 },
  { name: "near", left: LEFT_NEAR, right: RIGHT_NEAR, sink: 0 },
] as const;

/** Sink for the generated back bands (BACKDROP and the reveal stay-halves). */
export const BAND_SINK = 3;
