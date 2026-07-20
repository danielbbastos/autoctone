/* Inline SVG tree per species, drawn in `currentColor` so the parent sets the
 * hue with a text-* class. Crown/trunk keep addressable ids for animation. */
import { getSpecies, type SpeciesSlug } from "@/lib/species";
import { pick, type Locale } from "@/lib/i18n";

type TreeShape = "cork-oak" | "holm-oak" | "oak" | "shrub" | "riparian" | "eucalyptus";

// Presentation mapping lives here so lib/species.ts stays pure content.
const SHAPE_BY_SLUG: Record<SpeciesSlug, TreeShape> = {
  sobreiro: "cork-oak",
  azinheira: "holm-oak",
  carvalhos: "oak",
  medronheiro: "shrub",
  "galeria-ripicola": "riparian",
  eucalipto: "eucalyptus",
};

/* What the silhouette actually shows. The card already prints the species name,
 * so labelling the drawing with the name alone would just repeat it — the shape
 * is the part a screen reader would otherwise lose. */
const SHAPE_DESCRIPTION: Record<TreeShape, { pt: string; en: string }> = {
  "cork-oak": {
    pt: "copa larga e arredondada sobre um tronco espesso, com a base descortiçada a vermelho",
    en: "a broad rounded crown over a thick trunk, its lower bark stripped to red cork",
  },
  "holm-oak": {
    pt: "copa densa e compacta, mais escura e baixa que a do sobreiro",
    en: "a dense, compact crown, darker and lower than the cork oak's",
  },
  oak: {
    pt: "copa ampla e ramificada, de folha caduca",
    en: "a wide, branching, deciduous crown",
  },
  shrub: {
    pt: "arbusto baixo e denso, de vários troncos finos",
    en: "a low, dense shrub with several thin stems",
  },
  riparian: {
    pt: "árvores esguias inclinadas sobre a linha de água",
    en: "slender trees leaning over a watercourse",
  },
  eucalyptus: {
    pt: "tronco alto, direito e nu, com a copa estreita empurrada para o topo",
    en: "a tall, straight, bare trunk with a narrow crown pushed to the top",
  },
};

type TreeSvgProps = {
  slug: SpeciesSlug;
  locale: Locale;
  className?: string;
};

export function TreeSvg({ slug, locale, className }: TreeSvgProps) {
  const shape = SHAPE_BY_SLUG[slug];
  const species = getSpecies(slug);
  const crownId = `${slug}-crown`;
  const trunkId = `${slug}-trunk`;

  const description = SHAPE_DESCRIPTION[shape];
  const label = `${pick(locale, species.namePt, species.nameEn)}: ${pick(
    locale,
    description.pt,
    description.en,
  )}`;

  return (
    <svg
      viewBox="0 0 80 120"
      role="img"
      aria-label={label}
      className={className}
      fill="currentColor"
    >
      <title>{label}</title>
      {SHAPES[shape](crownId, trunkId)}
    </svg>
  );
}

// Amber trunk shared by most trees; the cork oak overrides its lower trunk.
const trunk = (id: string, x = 36, y = 66, w = 8, h = 50) => (
  <g id={id} className="text-amber-950/80">
    <rect x={x} y={y} width={w} height={h} fill="currentColor" />
  </g>
);

const SHAPES: Record<TreeShape, (crownId: string, trunkId: string) => React.ReactNode> = {
  // Cork oak: broad rounded crown; lower trunk stripped to reddish cork.
  "cork-oak": (crownId, trunkId) => (
    <>
      {trunk(trunkId, 35, 60, 10, 56)}
      <g id={`${trunkId}-cork`} className="text-orange-800/80" aria-hidden>
        <rect x={35} y={88} width={10} height={28} fill="currentColor" />
      </g>
      <g id={crownId}>
        <circle cx="40" cy="42" r="30" />
        <circle cx="22" cy="52" r="16" />
        <circle cx="58" cy="52" r="16" />
      </g>
    </>
  ),

  // Holm oak: smaller, denser, darker-reading rounded crown.
  "holm-oak": (crownId, trunkId) => (
    <>
      {trunk(trunkId, 37, 62, 7, 54)}
      <g id={crownId}>
        <circle cx="40" cy="46" r="26" />
        <circle cx="26" cy="54" r="13" />
        <circle cx="54" cy="54" r="13" />
      </g>
    </>
  ),

  // Deciduous oak: wide, slightly lobed canopy.
  oak: (crownId, trunkId) => (
    <>
      {trunk(trunkId, 36, 58, 9, 58)}
      <g id={crownId}>
        <circle cx="40" cy="40" r="28" />
        <circle cx="18" cy="46" r="15" />
        <circle cx="62" cy="46" r="15" />
        <circle cx="40" cy="58" r="20" />
      </g>
    </>
  ),

  // Strawberry tree: low multi-stem shrub with red berries.
  shrub: (crownId, trunkId) => (
    <>
      <g id={trunkId} className="text-amber-950/80">
        <rect x={32} y={72} width={6} height={44} fill="currentColor" />
        <rect x={42} y={78} width={6} height={38} fill="currentColor" />
      </g>
      <g id={crownId}>
        <circle cx="30" cy="66" r="18" />
        <circle cx="52" cy="70" r="16" />
        <circle cx="42" cy="54" r="16" />
      </g>
      <g aria-hidden className="text-red-500">
        <circle cx="28" cy="70" r="2.4" fill="currentColor" />
        <circle cx="48" cy="66" r="2.4" fill="currentColor" />
        <circle cx="40" cy="76" r="2.4" fill="currentColor" />
      </g>
    </>
  ),

  // Riparian gallery: slender, willowy cluster along water.
  riparian: (crownId, trunkId) => (
    <>
      <g id={trunkId} className="text-amber-950/80">
        <rect x={30} y={54} width={5} height={62} fill="currentColor" />
        <rect x={45} y={48} width={5} height={68} fill="currentColor" />
      </g>
      <g id={crownId}>
        <ellipse cx="32" cy="44" rx="12" ry="30" />
        <ellipse cx="48" cy="38" rx="12" ry="34" />
      </g>
    </>
  ),

  // Eucalyptus: tall, narrow, sparse crown on a long pale trunk.
  eucalyptus: (crownId, trunkId) => (
    <>
      <g id={trunkId} className="text-stone-300/80">
        <rect x={37} y={30} width={6} height={86} fill="currentColor" />
      </g>
      <g id={crownId}>
        <ellipse cx="40" cy="30" rx="12" ry="26" />
        <ellipse cx="30" cy="40" rx="6" ry="16" />
        <ellipse cx="50" cy="40" rx="6" ry="16" />
      </g>
    </>
  ),
};
