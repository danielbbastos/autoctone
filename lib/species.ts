/**
 * Species dataset — the native fire-fighting forest and the eucalyptus that
 * replaced it. Ordered as the gallery reads: allies first, invader last.
 *
 * Concept demonstrated: `satisfies` + `as const`. Writing
 * `[...] as const satisfies readonly Species[]` type-checks every entry against
 * `Species` (a missing citation fails the build) while *preserving* the literal
 * `slug` values, so `SPECIES[0].slug` is the string "sobreiro", not `string`.
 * That literal precision is what later lets `getSpecies("sobreiro")` autocomplete.
 *
 * SOURCES: every figure below references the `lib/sources.ts` registry by id;
 * the per-use `note` records the exact figure. URLs live in the registry and
 * should be re-verified before the site ships (README, Phase 5).
 */
import type { Species } from "./types";

export const SPECIES = [
  {
    slug: "sobreiro",
    namePt: "Sobreiro",
    nameEn: "Cork oak",
    scientific: "Quercus suber",
    role: "native",
    fireBehaviour: "resists",
    taglinePt: "A árvore nacional — a casca de cortiça que sobrevive ao fogo.",
    bodyPt:
      "A cortiça é um isolante natural: a casca espessa protege o tronco e os gomos, " +
      "e a árvore rebenta de novo depois do fogo. É a árvore nacional de Portugal desde 2011, " +
      "e o país é o maior produtor mundial de cortiça, com cerca de metade da produção global.",
    sources: [
      { id: "arvoreNacional", note: "Árvore Nacional aprovada em dezembro de 2011." },
      { id: "apcor", note: "Portugal ~50% da produção mundial de cortiça." },
    ],
  },
  {
    slug: "azinheira",
    namePt: "Azinheira",
    nameEn: "Holm oak",
    scientific: "Quercus rotundifolia",
    role: "native",
    fireBehaviour: "resprouts",
    taglinePt: "A guardiã seca do montado — resistente à seca e ao calor.",
    bodyPt:
      "Companheira do sobreiro no montado do sul, a azinheira tolera secas prolongadas e solos pobres. " +
      "Depois de queimada rebenta da toiça, e as suas bolotas alimentam o porco de montanheira. " +
      "O montado de sobro e azinho é um dos habitats protegidos pela Rede Natura 2000.",
    sources: [
      { id: "natura2000", note: "Montado listado como habitat de interesse comunitário (6310)." },
    ],
  },
  {
    slug: "carvalhos",
    namePt: "Carvalhos",
    nameEn: "Deciduous oaks",
    scientific: "Quercus robur, Q. pyrenaica, Q. faginea",
    role: "native",
    fireBehaviour: "resprouts",
    taglinePt: "As florestas caducifólias do norte e interior — húmidas e frias.",
    bodyPt:
      "Os carvalhais caducifólios — alvarinho, negral e cerquinho — dominavam o norte e o interior de Portugal " +
      "antes da expansão do eucalipto e do pinheiro. O seu sub-bosque húmido e a sombra densa retêm humidade, " +
      "reduzindo a intensidade do fogo em comparação com os povoamentos de eucalipto.",
    sources: [
      { id: "ifn6", note: "Distribuição de carvalhos; dados de campo de 2015, publicados em 2019." },
    ],
  },
  {
    slug: "medronheiro",
    namePt: "Medronheiro",
    nameEn: "Strawberry tree",
    scientific: "Arbutus unedo",
    role: "native",
    fireBehaviour: "resprouts",
    taglinePt: "O arbusto que rebenta depois do fogo — e dá a aguardente de medronho.",
    bodyPt:
      "Espécie mediterrânica resiliente ao fogo: rebenta vigorosamente da toiça após queimada. " +
      "O seu fruto é destilado na tradicional aguardente de medronho, e é hoje promovido em plantações " +
      "de baixa inflamabilidade como alternativa económica ao eucalipto em zonas de risco.",
    sources: [
      { id: "medronho", note: "Rebentação pós-fogo a partir da toiça (lignotúber)." },
    ],
  },
  {
    slug: "galeria-ripicola",
    namePt: "Galerias ripícolas",
    nameEn: "Riparian gallery",
    scientific: "Fraxinus angustifolia, Alnus glutinosa, Salix, Populus",
    role: "native",
    fireBehaviour: "firebreak",
    taglinePt: "Corredores verdes junto à água — barreiras naturais ao fogo.",
    bodyPt:
      "Freixos, amieiros, salgueiros e choupos junto às linhas de água mantêm folhagem húmida durante o verão. " +
      "Estas galerias funcionam como barreiras corta-fogo naturais, abrandando ou parando a progressão das chamas, " +
      "além de sustentarem a biodiversidade e a qualidade da água.",
    sources: [
      { id: "apaRipicola", note: "Vegetação ribeirinha húmida reduz a propagação do fogo." },
    ],
  },
  {
    slug: "eucalipto",
    namePt: "Eucalipto",
    nameEn: "Blue gum eucalyptus",
    scientific: "Eucalyptus globulus",
    role: "invader",
    fireBehaviour: "accelerant",
    taglinePt: "A espécie mais comum de Portugal — e um acelerador de incêndios.",
    bodyPt:
      "Introduzido no século XIX e expandido em massa a partir dos anos 1960 para a indústria da pasta de papel, " +
      "o eucalipto é hoje a espécie florestal mais comum de Portugal, ocupando cerca de 845 mil hectares (IFN6). " +
      "Os seus óleos inflamáveis e a casca que se solta e voa em brasas favorecem a projeção de focos secundários a grande distância.",
    sources: [
      { id: "ifn6", note: "Eucalipto ~845 400 ha, a espécie mais representada (~26% da área florestal)." },
    ],
  },
] as const satisfies readonly Species[];

/**
 * Typed lookup by slug. The `SpeciesSlug` union is derived from the data
 * itself, so callers get autocomplete and the compiler rejects a typo like
 * `getSpecies("sobriero")`.
 */
export type SpeciesSlug = (typeof SPECIES)[number]["slug"];

export function getSpecies(slug: SpeciesSlug): Species {
  // Non-null: the union guarantees a match exists, so `find` cannot return undefined.
  return SPECIES.find((s) => s.slug === slug)!;
}

/** The native allies, in gallery order. */
export const NATIVE_SPECIES = SPECIES.filter((s) => s.role === "native");
