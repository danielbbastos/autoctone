/**
 * Narrative dataset — the site's script, one entry per scroll section, in the
 * order they render top-to-bottom (see README "The story the site tells").
 *
 * Concept demonstrated: separating *content order* from *component code*. The
 * page will `SECTIONS.map(...)` to lay out the scrollytelling spine, so
 * reordering the story is a data edit, not a JSX refactor. `kicker`/`title`
 * are plain copy; anything factual is a cited `Claim` or lives in `STATS`.
 * `pullQuote` is optional editorial framing (no new numbers); `link` is an
 * optional cross-reference button that jumps to a deep-dive section.
 */
import type { Claim, Stat } from "./types";

/** One scroll section of the single-page story. */
export type Section = {
  /** DOM id / anchor / animation target. Matches the README section names. */
  id: string;
  /** Small overline label, e.g. "01 · A floresta". */
  kicker: string;
  /** Section heading, PT-first. */
  titlePt: string;
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
    titlePt: "A floresta que resiste ao fogo",
    body: [
      {
        pt:
          "Antes do eucalipto, a paisagem portuguesa era feita de sobreiros, carvalhos e medronheiros — " +
          "espécies que evoluíram para conviver com o fogo mediterrânico, não para o alimentar.",
        sources: [{ id: "ifn6" }],
      },
      {
        pt:
          "Durante séculos, o montado, os carvalhais e o mato formaram um mosaico que ardia devagar e " +
          "recuperava depressa. O fogo sempre fez parte deste clima — mas era um fogo que a floresta " +
          "nativa sabia sobreviver, rebentando da toiça e da raiz assim que passava.",
        sources: [{ id: "fireEcology" }],
      },
    ],
  },
  {
    id: "invasao",
    kicker: "02 · A invasão",
    titlePt: "As nativas saem, o eucalipto entra",
    body: [
      {
        pt:
          "Hoje o eucalipto é a espécie florestal mais comum de Portugal, com cerca de 845 mil hectares — " +
          "aproximadamente um quarto de toda a área florestal do país.",
        sources: [{ id: "ifn6", note: "~845 400 ha; ~26% da área florestal." }],
      },
      {
        pt:
          "Em pouco mais de meio século, o Eucalyptus globulus passou de curiosidade botânica a paisagem " +
          "dominante. Onde havia carvalho, mato e sobreiro, alinham-se agora filas plantadas, cortadas em " +
          "ciclos curtos para alimentar as fábricas de pasta de papel.",
        sources: [{ id: "celpa", note: "Eucalipto explorado em rotações curtas (talhadia) para pasta." }],
      },
    ],
    pullQuote: {
      pt: "Uma floresta plantada para ser cortada, não para durar.",
    },
  },
  {
    id: "porque",
    kicker: "03 · Porquê?",
    titlePt: "A economia da pasta de papel",
    body: [
      {
        pt:
          "A partir dos anos 1960, incentivos à indústria da celulose e o rápido crescimento do eucalipto " +
          "levaram milhares de pequenos proprietários a plantá-lo, substituindo matos e floresta autóctone.",
        sources: [{ id: "celpa", note: "Expansão do eucalipto e da fileira da pasta, 1960–1990." }],
      },
      {
        pt:
          "A lógica é simples e implacável: o eucalipto cresce depressa e dá dinheiro depressa, pronto a " +
          "cortar em cerca de uma década, enquanto um sobreiro leva perto de 25 anos até dar a primeira " +
          "cortiça. Para cada proprietário foi a escolha racional — e o país inteiro fê-la ao mesmo tempo.",
        sources: [{ id: "apcor", note: "Primeira extração de cortiça (desbóia) ~25 anos; seguintes de 9 em 9 anos." }],
      },
      {
        pt:
          "E há um atalho ainda mais cómodo: muitos donos, sem tempo nem vontade de limpar e gerir a mata, " +
          "arrendam simplesmente o terreno a uma grande empresa de pasta, que o planta de eucalipto e paga " +
          "uma renda. A terra rende sem dar trabalho — mas deixa de ser floresta e passa a ser fábrica.",
        sources: [{ id: "navigatorArrendamento" }],
      },
    ],
    link: {
      pt: "Porque é que os donos aceitam isto?",
      to: "#economia-terra",
    },
  },
  {
    id: "economia-terra",
    kicker: "04 · A terra",
    titlePt: "A conta que não fecha",
    body: [
      {
        pt:
          "Arrendar a terra a uma empresa de pasta é, à primeira vista, um bom negócio para quem não quer " +
          "trabalho: só a Navigator gere cerca de 109 mil hectares de floresta, dos quais perto de 50 mil são " +
          "terrenos arrendados a proprietários. O dono recebe uma renda anual fixa — ou uma parte do valor da " +
          "madeira no corte — em contratos que podem chegar aos 25 anos.",
        sources: [{ id: "navigatorArrendamento", note: "~109 000 ha geridos; ~50 000 ha arrendados." }],
      },
      {
        pt:
          "Mas a conta a prazo é outra. O eucalipto corta-se de 10 em 10 anos e, a cada rotação, esgota água " +
          "e nutrientes do solo. A cortiça leva 25 anos até à primeira extração — mas depois um sobreiro dá " +
          "cortiça durante mais de um século. E a cortiça é a joia da floresta portuguesa: exportou 1 148 " +
          "milhões de euros só em 2024.",
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
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "Recebes uma renda pequena; a paisagem paga o resto.",
    },
  },
  {
    id: "lucro",
    kicker: "05 · Quem lucra",
    titlePt: "Quem lucra com o eucalipto",
    body: [
      {
        pt:
          "A fileira concentra-se em poucos grandes atores — Navigator e Altri na produção de pasta e papel, " +
          "com a CELPA a representar o setor.",
        sources: [{ id: "celpa" }],
      },
      {
        pt:
          "A pasta e o papel estão entre as maiores exportações industriais portuguesas, e o eucalipto é a " +
          "matéria-prima dessa fileira. O modelo é rentável para quem transforma — mas o risco de incêndio " +
          "recai sobre quem vive no meio das plantações.",
        sources: [{ id: "navigator" }],
      },
    ],
  },
  {
    id: "fogo",
    kicker: "06 · O fogo",
    titlePt: "Pedrógão Grande, junho de 2017",
    body: [
      {
        pt:
          "A 17 de junho de 2017, um incêndio em Pedrógão Grande matou 66 pessoas, muitas em fuga nas estradas. " +
          "A projeção de brasas a longa distância — favorecida pela casca do eucalipto — abriu novas frentes " +
          "à frente das chamas.",
        sources: [{ id: "cti2017", note: "66 vítimas mortais; projeção de focos secundários." }],
      },
      {
        pt:
          "Não foi um caso isolado. Em outubro do mesmo ano, uma segunda vaga de incêndios varreu o centro " +
          "e o norte do país, e 2017 fechou como o ano mais mortífero de que há registo — mais de uma " +
          "centena de vidas perdidas ao fogo. No meio da destruição, os sobreiros ficaram de pé.",
        sources: [{ id: "cti2017", note: "Junho (Pedrógão) 66 mortos; total do ano superior a uma centena." }],
      },
    ],
    pullQuote: {
      pt: "No meio da destruição, os sobreiros permaneceram de pé.",
    },
  },
  {
    id: "ciclo",
    kicker: "07 · O ciclo",
    titlePt: "O fogo ajuda o eucalipto a vencer",
    body: [
      {
        pt:
          "O eucalipto rebenta vigorosamente após o fogo e a sua regeneração beneficia da perturbação, " +
          "criando um ciclo em que arder favorece o próprio eucalipto face às espécies autóctones.",
        sources: [{ id: "fireEcology" }],
      },
      {
        pt:
          "Cada incêndio limpa a concorrência e entrega o terreno aos rebentos e às sementes que o calor " +
          "liberta. Quanto mais arde, mais eucalipto ocupa o espaço — e quanto mais eucalipto, mais depressa " +
          "e mais longe volta a arder. É um ciclo que se alimenta a si próprio.",
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "Quanto mais arde, mais eucalipto. Quanto mais eucalipto, mais arde.",
    },
    link: {
      pt: "Porque é que isto acontece?",
      to: "#fogo-eucalipto",
    },
  },
  {
    id: "fogo-eucalipto",
    kicker: "08 · Fogo e semente",
    titlePt: "Como o eucalipto usa o fogo",
    body: [
      {
        pt:
          "O Eucalyptus globulus não só sobrevive ao fogo como o aproveita. A casca fibrosa solta-se em tiras " +
          "que ardem e voam quilómetros à frente da frente de fogo, abrindo novos focos muito antes de as " +
          "chamas chegarem — foi este mecanismo que ajudou a alastrar o incêndio de Pedrógão.",
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
        sources: [{ id: "fireEcology" }],
      },
    ],
    pullQuote: {
      pt: "O fogo não é o inimigo do eucalipto — é o seu semeador.",
    },
  },
  {
    id: "galeria",
    kicker: "09 · As nativas",
    titlePt: "As espécies que combatem o fogo",
    body: [
      {
        pt:
          "Nem todas as árvores ardem da mesma maneira. Estas espécies nativas resistem ao fogo, rebentam " +
          "depois dele ou funcionam como barreiras naturais — a verdadeira infraestrutura de defesa de " +
          "Portugal contra os incêndios, e ela cresce sozinha.",
        sources: [{ id: "ifn6" }],
      },
    ], // cards rendered from SPECIES (see lib/species.ts)
  },
  {
    id: "resistencia",
    kicker: "10 · A resistência",
    titlePt: "Quem está a lutar",
    body: [
      {
        pt:
          "Contra a monocultura há quem plante, quem compre terreno abandonado para o deixar voltar a ser " +
          "floresta, e quem tenha mudado a lei. A resistência é científica, associativa e política — e " +
          "espalha-se de norte a sul do país.",
        sources: [{ id: "quercus" }, { id: "lei77" }],
      },
    ], // cards rendered from RESIST_ORGS (see lib/organizations.ts)
  },
  {
    id: "acao",
    kicker: "11 · O que podes fazer",
    titlePt: "A floresta é das pessoas",
    body: [
      {
        pt:
          "Mesmo quem arrenda o seu campo a uma grande empresa sai, no fundo, a perder: recebe pouco em troca " +
          "de um custo ambiental enorme que só se cobra décadas depois. Vivemos pouco para ver o estrago de " +
          "perto — mas já estamos a ver o que uma indústria semeada há meio século nos deixou.",
        sources: [{ id: "navigatorArrendamento" }, { id: "fireEcology" }],
      },
      {
        pt:
          "A floresta é das pessoas, não das empresas. Plantar autóctones, apoiar associações de conservação e " +
          "custódia do território, e preferir produtos de floresta nativa — como a cortiça — são formas " +
          "concretas de inverter a monocultura.",
        sources: [{ id: "montis" }, { id: "plantar" }],
      },
      {
        pt:
          "Nenhum gesto isolado inverte meio século de eucalipto. Mas escolher cortiça em vez de plástico, " +
          "apoiar quem restaura floresta autóctone e saber a origem daquilo que se compra são decisões que, " +
          "somadas, mudam a procura. E é a procura que, no fim, decide o que se planta.",
        sources: [{ id: "apcor" }],
      },
    ],
    pullQuote: {
      pt: "A floresta é das pessoas, não das empresas.",
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
    unitPt: "hectares",
    labelPt: "de eucalipto — a espécie mais comum de Portugal",
    sources: [{ id: "ifn6", note: "~845 400 ha." }],
    comparisons: [
      {
        pt: "Quase um décimo de todo o território de Portugal continental.",
        sources: [{ id: "dgtCaop", note: "Portugal continental ≈ 89 100 km²; 845 000 ha = 8 450 km² ≈ 9,5%." }],
      },
      {
        pt: "Mais de uma vez e meia a região do Algarve inteira.",
        sources: [{ id: "dgtCaop", note: "Algarve ≈ 4 997 km²; 8 450 km² ≈ 1,7× o Algarve." }],
      },
      {
        pt: "O equivalente a 84 cidades de Lisboa lado a lado.",
        sources: [{ id: "dgtCaop", note: "Município de Lisboa ≈ 100 km²; 8 450 km² ≈ 84,5×." }],
      },
    ],
  },
  {
    slug: "pedrogao-mortos",
    value: "66",
    unitPt: "mortos",
    labelPt: "no incêndio de Pedrógão Grande, 17 de junho de 2017",
    sources: [{ id: "cti2017" }],
  },
  {
    slug: "ano-2017-ardido",
    value: "≈ 540 000",
    unitPt: "hectares ardidos",
    labelPt: "em 2017 — o pior ano de incêndios registado em Portugal",
    sources: [{ id: "icnfArdida", note: "Verificar valor exato antes de publicar." }],
  },
  {
    slug: "floresta-privada",
    value: "≈ 97%",
    unitPt: "não é do Estado",
    labelPt:
      "da floresta portuguesa é privada ou comunitária — o Estado gere apenas uma pequena fração",
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
