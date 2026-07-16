/* Species dataset, ordered as the gallery reads (allies first, invader last).
 * `as const satisfies` keeps literal slugs while type-checking every citation.
 * Registry URLs must be re-verified before the site ships. */
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
    taglineEn: "The national tree — the cork bark that survives fire.",
    bodyPt:
      "A cortiça é um isolante natural: a casca espessa protege o tronco e os gomos, " +
      "e a árvore rebenta de novo depois do fogo. É a árvore nacional de Portugal desde 2011, " +
      "e o país é o maior produtor mundial de cortiça, com cerca de metade da produção global.",
    bodyEn:
      "Cork is a natural insulator: the thick bark protects the trunk and the buds, " +
      "and the tree resprouts after fire. It has been Portugal's national tree since 2011, " +
      "and the country is the world's largest cork producer, with about half of global output.",
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
    taglineEn: "The dry guardian of the montado — resistant to drought and heat.",
    bodyPt:
      "Companheira do sobreiro no montado do sul, a azinheira tolera secas prolongadas e solos pobres. " +
      "Depois de queimada rebenta da toiça, e as suas bolotas alimentam o porco de montanheira. " +
      "O montado de sobro e azinho é um dos habitats protegidos pela Rede Natura 2000.",
    bodyEn:
      "A companion to the cork oak in the southern montado, the holm oak tolerates prolonged droughts and " +
      "poor soils. After burning it resprouts from the stump, and its acorns feed free-ranging pigs. " +
      "The cork and holm oak montado is one of the habitats protected by the Natura 2000 network.",
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
    taglineEn: "The deciduous woods of the north and interior — humid and cool.",
    bodyPt:
      "Os carvalhais caducifólios — alvarinho, negral e cerquinho — dominavam o norte e o interior de Portugal " +
      "antes da expansão do eucalipto e do pinheiro. O seu sub-bosque húmido e a sombra densa retêm humidade, " +
      "reduzindo a intensidade do fogo em comparação com os povoamentos de eucalipto.",
    bodyEn:
      "The deciduous oak woods — pedunculate, Pyrenean and Portuguese oak — dominated the north and interior " +
      "of Portugal before the spread of eucalyptus and pine. Their humid understorey and dense shade hold " +
      "moisture, lowering fire intensity compared with eucalyptus stands.",
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
    taglineEn: "The shrub that resprouts after fire — and yields medronho brandy.",
    bodyPt:
      "Espécie mediterrânica resiliente ao fogo: rebenta vigorosamente da toiça após queimada. " +
      "O seu fruto é destilado na tradicional aguardente de medronho, e é hoje promovido em plantações " +
      "de baixa inflamabilidade como alternativa económica ao eucalipto em zonas de risco.",
    bodyEn:
      "A fire-resilient Mediterranean species: it resprouts vigorously from the stump after burning. " +
      "Its fruit is distilled into the traditional medronho brandy, and it is now promoted in " +
      "low-flammability plantations as an economic alternative to eucalyptus in high-risk areas.",
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
    taglineEn: "Green corridors along the water — natural firebreaks.",
    bodyPt:
      "Freixos, amieiros, salgueiros e choupos junto às linhas de água mantêm folhagem húmida durante o verão. " +
      "Estas galerias funcionam como barreiras corta-fogo naturais, abrandando ou parando a progressão das chamas, " +
      "além de sustentarem a biodiversidade e a qualidade da água.",
    bodyEn:
      "Ash, alder, willow and poplar along watercourses keep humid foliage through the summer. " +
      "These galleries act as natural firebreaks, slowing or halting the advance of the flames, " +
      "while also sustaining biodiversity and water quality.",
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
    taglineEn: "Portugal's most common species — and a fire accelerant.",
    bodyPt:
      "Introduzido no século XIX e expandido em massa a partir dos anos 1960 para a indústria da pasta de papel, " +
      "o eucalipto é hoje a espécie florestal mais comum de Portugal, ocupando cerca de 845 mil hectares (IFN6). " +
      "Os seus óleos inflamáveis e a casca que se solta e voa em brasas favorecem a projeção de focos secundários a grande distância.",
    bodyEn:
      "Introduced in the 19th century and expanded en masse from the 1960s for the pulp and paper industry, " +
      "the eucalyptus is today Portugal's most common forest species, covering about 845,000 hectares (IFN6). " +
      "Its flammable oils and its bark, which peels off and flies as embers, drive the long-distance spread of secondary fires.",
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
