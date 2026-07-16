/* The site's script, one entry per scroll section, in render order.
 * Reordering the story is a data edit, not a JSX refactor; anything factual
 * must be a cited Claim or live in STATS. */
import type { Claim, Stat } from "./types";

/** One scroll section of the single-page story. */
export type Section = {
  /** DOM id / anchor / animation target. Matches the README section names. */
  id: string;
  /** Small overline label, e.g. "01 · A floresta". */
  kicker: string;
  kickerEn?: string;
  /** Section heading, PT-first. */
  titlePt: string;
  titleEn?: string;
  /** Optional standfirst paragraphs — cited where they assert fact. */
  body: Claim[];
  /** Optional rhetorical line pulled out large. Reframes cited copy; no new facts. */
  pullQuote?: { pt: string; en?: string };
  /** Optional "read why" button linking to a deep-dive section (`to` = "#id"). */
  link?: { pt: string; en?: string; to: string };
};

export const SECTIONS = [
  {
    id: "hero",
    kicker: "01 · A floresta",
    kickerEn: "01 · The forest",
    titlePt: "A floresta que resiste ao fogo",
    titleEn: "The forest that resists fire",
    body: [
      {
        pt:
          "Antes do eucalipto, a paisagem portuguesa era feita de sobreiros, carvalhos e medronheiros — " +
          "espécies que evoluíram para conviver com o fogo mediterrânico, não para o alimentar.",
        en:
          "Before the eucalyptus, the Portuguese landscape was made of cork oaks, deciduous oaks and " +
          "strawberry trees — species that evolved to live with Mediterranean fire, not to feed it.",
        sources: [{ id: "ifn6" }],
      },
      {
        pt:
          "Durante séculos, o montado, os carvalhais e o mato formaram um mosaico que ardia devagar e " +
          "recuperava depressa. O fogo sempre fez parte deste clima — mas era um fogo que a floresta " +
          "nativa sabia sobreviver, rebentando da toiça e da raiz assim que passava.",
        en:
          "For centuries, the montado, the oak woods and the scrub formed a mosaic that burned slowly and " +
          "recovered quickly. Fire has always been part of this climate — but it was a fire the native " +
          "forest knew how to survive, resprouting from stump and root as soon as it passed.",
        sources: [{ id: "fireEcology" }],
      },
    ],
  },
  {
    id: "invasao",
    kicker: "02 · A invasão",
    kickerEn: "02 · The invasion",
    titlePt: "As nativas saem, o eucalipto entra",
    titleEn: "The natives move out, the eucalyptus moves in",
    body: [
      {
        pt:
          "Hoje o eucalipto é a espécie florestal mais comum de Portugal, com cerca de 845 mil hectares — " +
          "aproximadamente um quarto de toda a área florestal do país.",
        en:
          "Today the eucalyptus is Portugal's most common forest species, covering about 845,000 hectares — " +
          "roughly a quarter of the country's entire forested area.",
        sources: [{ id: "ifn6", note: "~845 400 ha; ~26% da área florestal." }],
      },
      {
        pt:
          "Em pouco mais de meio século, o Eucalyptus globulus passou de curiosidade botânica a paisagem " +
          "dominante. Onde havia carvalho, mato e sobreiro, alinham-se agora filas plantadas, cortadas em " +
          "ciclos curtos para alimentar as fábricas de pasta de papel.",
        en:
          "In little more than half a century, Eucalyptus globulus went from botanical curiosity to dominant " +
          "landscape. Where there was oak, scrub and cork oak, planted rows now line up, cut on short " +
          "cycles to feed the pulp mills.",
        sources: [{ id: "celpa", note: "Eucalipto explorado em rotações curtas (talhadia) para pasta." }],
      },
    ],
    pullQuote: {
      pt: "Uma floresta plantada para ser cortada, não para durar.",
      en: "A forest planted to be cut, not to last.",
    },
  },
  {
    id: "porque",
    kicker: "03 · Porquê?",
    kickerEn: "03 · Why?",
    titlePt: "A economia da pasta de papel",
    titleEn: "The pulp economy",
    body: [
      {
        pt:
          "A partir dos anos 1960, incentivos à indústria da celulose e o rápido crescimento do eucalipto " +
          "levaram milhares de pequenos proprietários a plantá-lo, substituindo matos e floresta autóctone.",
        en:
          "From the 1960s onwards, incentives for the pulp industry and the eucalyptus's rapid growth led " +
          "thousands of smallholders to plant it, replacing scrubland and native forest.",
        sources: [{ id: "celpa", note: "Expansão do eucalipto e da fileira da pasta, 1960–1990." }],
      },
      {
        pt:
          "A lógica é simples e implacável: o eucalipto cresce depressa e dá dinheiro depressa, pronto a " +
          "cortar em cerca de uma década, enquanto um sobreiro leva perto de 25 anos até dar a primeira " +
          "cortiça. Para cada proprietário foi a escolha racional — e o país inteiro fê-la ao mesmo tempo.",
        en:
          "The logic is simple and relentless: eucalyptus grows fast and pays fast, ready to cut in about a " +
          "decade, while a cork oak takes close to 25 years to yield its first cork. For each landowner it " +
          "was the rational choice — and the whole country made it at the same time.",
        sources: [{ id: "apcor", note: "Primeira extração de cortiça (desbóia) ~25 anos; seguintes de 9 em 9 anos." }],
      },
      {
        pt:
          "E há um atalho ainda mais cómodo: muitos donos, sem tempo nem vontade de limpar e gerir a mata, " +
          "arrendam simplesmente o terreno a uma grande empresa de pasta, que o planta de eucalipto e paga " +
          "uma renda. A terra rende sem dar trabalho — mas deixa de ser floresta e passa a ser fábrica.",
        en:
          "And there is an even easier shortcut: many owners, with no time or will to clear and manage their " +
          "woodland, simply lease the land to a big pulp company, which plants it with eucalyptus and pays " +
          "rent. The land earns without any work — but it stops being a forest and becomes a factory.",
        sources: [{ id: "navigatorArrendamento" }],
      },
    ],
    link: {
      pt: "Porque é que os donos aceitam isto?",
      en: "Why do landowners accept this?",
      to: "#economia-terra",
    },
  },
  {
    id: "economia-terra",
    kicker: "04 · A terra",
    kickerEn: "04 · The land",
    titlePt: "A conta que não fecha",
    titleEn: "The maths that don't add up",
    body: [
      {
        pt:
          "Arrendar a terra a uma empresa de pasta é, à primeira vista, um bom negócio para quem não quer " +
          "trabalho: só a Navigator gere cerca de 109 mil hectares de floresta, dos quais perto de 50 mil são " +
          "terrenos arrendados a proprietários. O dono recebe uma renda anual fixa — ou uma parte do valor da " +
          "madeira no corte — em contratos que podem chegar aos 25 anos.",
        en:
          "Leasing land to a pulp company looks, at first glance, like a good deal for anyone who wants no " +
          "work: Navigator alone manages about 109,000 hectares of forest, of which close to 50,000 are " +
          "plots leased from private owners. The owner collects a fixed annual rent — or a share of the " +
          "timber's value at harvest — on contracts that can run for 25 years.",
        sources: [{ id: "navigatorArrendamento", note: "~109 000 ha geridos; ~50 000 ha arrendados." }],
      },
      {
        pt:
          "Mas a conta a prazo é outra. O eucalipto corta-se de 10 em 10 anos e, a cada rotação, esgota água " +
          "e nutrientes do solo. A cortiça leva 25 anos até à primeira extração — mas depois um sobreiro dá " +
          "cortiça durante mais de um século. E a cortiça é a joia da floresta portuguesa: exportou 1 148 " +
          "milhões de euros só em 2024.",
        en:
          "But the long-term maths tell another story. Eucalyptus is cut every 10 years and, with each " +
          "rotation, drains water and nutrients from the soil. Cork takes 25 years until the first harvest — " +
          "but after that a cork oak keeps giving cork for over a century. And cork is the jewel of the " +
          "Portuguese forest: it exported 1,148 million euros in 2024 alone.",
        sources: [
          { id: "celpa", note: "Eucalipto em rotações curtas (~10–12 anos)." },
          { id: "apcor" },
          { id: "cortica2024", note: "Exportações de cortiça: 1 148 M€ em 2024." },
        ],
      },
      {
        pt:
          "A monocultura paga pouco a quem arrenda e cobra caro a toda a gente: solo empobrecido, linhas de " +
          "água mais secas, biodiversidade perdida e um risco de incêndio que recai sobre quem vive ao lado " +
          "das plantações — não sobre quem lucra com elas.",
        en:
          "The monoculture pays the landlord little and charges everyone else dearly: depleted soil, drier " +
          "streams, lost biodiversity, and a fire risk that falls on the people living beside the " +
          "plantations — not on those who profit from them.",
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "Recebes uma renda pequena; a paisagem paga o resto.",
      en: "You collect a small rent; the landscape pays the rest.",
    },
  },
  {
    id: "lucro",
    kicker: "05 · Quem lucra",
    kickerEn: "05 · Who profits",
    titlePt: "Quem lucra com o eucalipto",
    titleEn: "Who profits from the eucalyptus",
    body: [
      {
        pt:
          "A fileira concentra-se em poucos grandes atores — Navigator e Altri na produção de pasta e papel, " +
          "com a CELPA a representar o setor.",
        en:
          "The industry is concentrated in a few big players — Navigator and Altri in pulp and paper " +
          "production, with CELPA representing the sector.",
        sources: [{ id: "celpa" }],
      },
      {
        pt:
          "A pasta e o papel estão entre as maiores exportações industriais portuguesas, e o eucalipto é a " +
          "matéria-prima dessa fileira. O modelo é rentável para quem transforma — mas o risco de incêndio " +
          "recai sobre quem vive no meio das plantações.",
        en:
          "Pulp and paper rank among Portugal's biggest industrial exports, and eucalyptus is the raw " +
          "material of that chain. The model is profitable for those who process it — but the fire risk " +
          "falls on those who live among the plantations.",
        sources: [{ id: "navigator" }],
      },
    ],
  },
  {
    id: "fogo",
    kicker: "06 · O fogo",
    kickerEn: "06 · The fire",
    titlePt: "Pedrógão Grande, junho de 2017",
    titleEn: "Pedrógão Grande, June 2017",
    body: [
      {
        pt:
          "A 17 de junho de 2017, um incêndio em Pedrógão Grande matou 66 pessoas, muitas em fuga nas estradas. " +
          "A projeção de brasas a longa distância — favorecida pela casca do eucalipto — abriu novas frentes " +
          "à frente das chamas.",
        en:
          "On 17 June 2017, a wildfire in Pedrógão Grande killed 66 people, many while fleeing along the roads. " +
          "Long-distance ember showers — aided by the eucalyptus's bark — opened new fronts ahead of " +
          "the flames.",
        sources: [{ id: "cti2017", note: "66 vítimas mortais; projeção de focos secundários." }],
      },
      {
        pt:
          "Não foi um caso isolado. Em outubro do mesmo ano, uma segunda vaga de incêndios varreu o centro " +
          "e o norte do país, e 2017 fechou como o ano mais mortífero de que há registo — mais de uma " +
          "centena de vidas perdidas ao fogo. No meio da destruição, os sobreiros ficaram de pé.",
        en:
          "It was not an isolated case. In October of the same year, a second wave of fires swept the centre " +
          "and north of the country, and 2017 closed as the deadliest year on record — more than a hundred " +
          "lives lost to fire. Amid the destruction, the cork oaks were left standing.",
        sources: [{ id: "cti2017", note: "Junho (Pedrógão) 66 mortos; total do ano superior a uma centena." }],
      },
    ],
    pullQuote: {
      pt: "No meio da destruição, os sobreiros permaneceram de pé.",
      en: "Amid the destruction, the cork oaks remained standing.",
    },
  },
  {
    id: "ciclo",
    kicker: "07 · O ciclo",
    kickerEn: "07 · The cycle",
    titlePt: "O fogo ajuda o eucalipto a vencer",
    titleEn: "Fire helps the eucalyptus win",
    body: [
      {
        pt:
          "O eucalipto rebenta vigorosamente após o fogo e a sua regeneração beneficia da perturbação, " +
          "criando um ciclo em que arder favorece o próprio eucalipto face às espécies autóctones.",
        en:
          "Eucalyptus resprouts vigorously after fire and its regeneration benefits from the disturbance, " +
          "creating a cycle in which burning favours the eucalyptus itself over native species.",
        sources: [{ id: "fireEcology" }],
      },
      {
        pt:
          "Cada incêndio limpa a concorrência e entrega o terreno aos rebentos e às sementes que o calor " +
          "liberta. Quanto mais arde, mais eucalipto ocupa o espaço — e quanto mais eucalipto, mais depressa " +
          "e mais longe volta a arder. É um ciclo que se alimenta a si próprio.",
        en:
          "Each wildfire clears out the competition and hands the ground to the shoots and to the seeds the " +
          "heat releases. The more it burns, the more eucalyptus takes over — and the more eucalyptus, the " +
          "faster and farther it burns again. It is a cycle that feeds itself.",
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "Quanto mais arde, mais eucalipto. Quanto mais eucalipto, mais arde.",
      en: "The more it burns, the more eucalyptus. The more eucalyptus, the more it burns.",
    },
    link: {
      pt: "Porque é que isto acontece?",
      en: "Why does this happen?",
      to: "#fogo-eucalipto",
    },
  },
  {
    id: "fogo-eucalipto",
    kicker: "08 · Fogo e semente",
    kickerEn: "08 · Fire and seed",
    titlePt: "Como o eucalipto usa o fogo",
    titleEn: "How the eucalyptus uses fire",
    body: [
      {
        pt:
          "O Eucalyptus globulus não só sobrevive ao fogo como o aproveita. A casca fibrosa solta-se em tiras " +
          "que ardem e voam quilómetros à frente da frente de fogo, abrindo novos focos muito antes de as " +
          "chamas chegarem — foi este mecanismo que ajudou a alastrar o incêndio de Pedrógão.",
        en:
          "Eucalyptus globulus doesn't just survive fire — it puts it to work. Its fibrous bark peels off in " +
          "strips that burn and fly kilometres ahead of the fire front, starting new ignitions long before " +
          "the flames arrive — the very mechanism that helped the Pedrógão fire spread.",
        sources: [
          { id: "cti2017", note: "Projeção de brasas / focos secundários a longa distância." },
          { id: "fireEcology" },
        ],
      },
      {
        pt:
          "Depois de arder, rebenta com vigor a partir de gomos protegidos sob a casca e de um lenhotúber na " +
          "base do tronco, enquanto as cápsulas abertas pelo calor libertam sementes sobre um solo limpo de " +
          "concorrência. Onde a floresta nativa demora anos a voltar, o eucalipto reocupa o terreno numa só estação.",
        en:
          "After burning, it resprouts vigorously from buds protected under the bark and from a lignotuber at " +
          "the base of the trunk, while heat-opened capsules release seeds onto ground cleared of " +
          "competition. Where the native forest takes years to return, the eucalyptus reclaims the land in a single season.",
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "O fogo não é o inimigo do eucalipto — é o seu semeador.",
      en: "Fire is not the eucalyptus's enemy — it is its sower.",
    },
  },
  {
    id: "galeria",
    kicker: "09 · As nativas",
    kickerEn: "09 · The natives",
    titlePt: "As espécies que combatem o fogo",
    titleEn: "The species that fight fire",
    body: [
      {
        pt:
          "Nem todas as árvores ardem da mesma maneira. Estas espécies nativas resistem ao fogo, rebentam " +
          "depois dele ou funcionam como barreiras naturais — a verdadeira infraestrutura de defesa de " +
          "Portugal contra os incêndios, e ela cresce sozinha.",
        en:
          "Not all trees burn the same way. These native species resist fire, resprout after it or act as " +
          "natural barriers — Portugal's true defence infrastructure against wildfire, and it grows on its own.",
        sources: [{ id: "ifn6" }],
      },
    ], // cards rendered from SPECIES (see lib/species.ts)
  },
  {
    id: "resistencia",
    kicker: "10 · A resistência",
    kickerEn: "10 · The resistance",
    titlePt: "Quem está a lutar",
    titleEn: "Who is fighting back",
    body: [
      {
        pt:
          "Contra a monocultura há quem plante, quem compre terreno abandonado para o deixar voltar a ser " +
          "floresta, e quem tenha mudado a lei. A resistência é científica, associativa e política — e " +
          "espalha-se de norte a sul do país.",
        en:
          "Against the monoculture there are those who plant, those who buy abandoned land to let it become " +
          "forest again, and those who changed the law. The resistance is scientific, grassroots and " +
          "political — and it spans the country from north to south.",
        sources: [{ id: "quercus" }, { id: "lei77" }],
      },
    ], // cards rendered from RESIST_ORGS (see lib/organizations.ts)
  },
  {
    id: "acao",
    kicker: "11 · O que podes fazer",
    kickerEn: "11 · What you can do",
    titlePt: "A floresta é das pessoas",
    titleEn: "The forest belongs to people",
    body: [
      {
        pt:
          "Mesmo quem arrenda o seu campo a uma grande empresa sai, no fundo, a perder: recebe pouco em troca " +
          "de um custo ambiental enorme que só se cobra décadas depois. Vivemos pouco para ver o estrago de " +
          "perto — mas já estamos a ver o que uma indústria semeada há meio século nos deixou.",
        en:
          "Even those who lease their land to a big company come out losing in the end: they get little in " +
          "return for an enormous environmental cost that only comes due decades later. We live too short to " +
          "see the damage up close — but we are already seeing what an industry sown half a century ago left us.",
        sources: [{ id: "navigatorArrendamento" }, { id: "fireEcology" }],
      },
      {
        pt:
          "A floresta é das pessoas, não das empresas. Plantar autóctones, apoiar associações de conservação e " +
          "custódia do território, e preferir produtos de floresta nativa — como a cortiça — são formas " +
          "concretas de inverter a monocultura.",
        en:
          "The forest belongs to people, not to companies. Planting native species, supporting conservation " +
          "and land-stewardship groups, and choosing native-forest products — such as cork — are concrete " +
          "ways to reverse the monoculture.",
        sources: [{ id: "montis" }, { id: "plantar" }],
      },
      {
        pt:
          "Nenhum gesto isolado inverte meio século de eucalipto. Mas escolher cortiça em vez de plástico, " +
          "apoiar quem restaura floresta autóctone e saber a origem daquilo que se compra são decisões que, " +
          "somadas, mudam a procura. E é a procura que, no fim, decide o que se planta.",
        en:
          "No single gesture reverses half a century of eucalyptus. But choosing cork over plastic, " +
          "supporting those who restore native forest, and knowing the origin of what you buy are decisions " +
          "that, added together, shift demand. And demand is what, in the end, decides what gets planted.",
        sources: [{ id: "apcor" }],
      },
    ],
    pullQuote: {
      pt: "A floresta é das pessoas, não das empresas.",
      en: "The forest belongs to people, not to companies.",
    },
  },
] as const satisfies readonly Section[];

export type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * Headline statistics rendered as oversized numbers in the narrative. Kept
 * separate from `SECTIONS` so a section can pull the stats it needs by slug.
 */
export const STATS = [
  {
    slug: "eucalipto-ha",
    value: "845 000",
    valueEn: "845,000",
    unitPt: "hectares",
    unitEn: "hectares",
    labelPt: "de eucalipto — a espécie mais comum de Portugal",
    labelEn: "of eucalyptus — Portugal's most common species",
    sources: [{ id: "ifn6", note: "~845 400 ha." }],
    comparisons: [
      {
        pt: "Quase um décimo de todo o território de Portugal continental.",
        en: "Almost a tenth of the whole territory of mainland Portugal.",
        sources: [{ id: "dgtCaop", note: "Portugal continental ≈ 89 100 km²; 845 000 ha = 8 450 km² ≈ 9,5%." }],
      },
      {
        pt: "Mais de uma vez e meia a região do Algarve inteira.",
        en: "More than one and a half times the entire Algarve region.",
        sources: [{ id: "dgtCaop", note: "Algarve ≈ 4 997 km²; 8 450 km² ≈ 1,7× o Algarve." }],
      },
      {
        pt: "O equivalente a 84 cidades de Lisboa lado a lado.",
        en: "The equivalent of 84 cities of Lisbon side by side.",
        sources: [{ id: "dgtCaop", note: "Município de Lisboa ≈ 100 km²; 8 450 km² ≈ 84,5×." }],
      },
    ],
  },
  {
    slug: "pedrogao-mortos",
    value: "66",
    unitPt: "mortos",
    unitEn: "dead",
    labelPt: "no incêndio de Pedrógão Grande, 17 de junho de 2017",
    labelEn: "in the Pedrógão Grande fire, 17 June 2017",
    sources: [{ id: "cti2017" }],
  },
  {
    slug: "ano-2017-ardido",
    value: "≈ 540 000",
    valueEn: "≈ 540,000",
    unitPt: "hectares ardidos",
    unitEn: "hectares burned",
    labelPt: "em 2017 — o pior ano de incêndios registado em Portugal",
    labelEn: "in 2017 — the worst wildfire year on record in Portugal",
    sources: [{ id: "icnfArdida", note: "Verificar valor exato antes de publicar." }],
  },
  {
    slug: "floresta-privada",
    value: "≈ 97%",
    unitPt: "não é do Estado",
    unitEn: "not state-owned",
    labelPt:
      "da floresta portuguesa é privada ou comunitária — o Estado gere apenas uma pequena fração",
    labelEn:
      "of Portuguese forest is private or community-owned — the State manages only a small fraction",
    sources: [
      {
        id: "propriedadeFlorestal",
        note: "~91% propriedade privada + ~6% baldios comunitários; Estado/ICNF gere uma fração menor.",
      },
    ],
  },
] as const satisfies readonly Stat[];

export type StatSlug = (typeof STATS)[number]["slug"];

export function getStat(slug: StatSlug): Stat {
  return STATS.find((s) => s.slug === slug)!;
}
