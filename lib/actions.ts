/* The closing call-to-action. Most actions link through an organization in
 * ORGANIZATIONS or a source in SOURCES, so a moved URL is a one-line fix there.
 * A few point somewhere the citation doesn't — a reserve's own site, a report
 * page — and carry that `href` inline. */
import { ORGANIZATIONS, type OrgSlug } from "./organizations";
import { getSource } from "./sources";
import type { ActionGroup } from "./types";

/** Website of a known organization. Compile-time checked against OrgSlug. */
function orgSite(slug: OrgSlug): string | undefined {
  return ORGANIZATIONS.find((o) => o.slug === slug)?.site;
}

export const ACTION_GROUPS = [
  {
    slug: "plantar",
    titlePt: "Plantar e renaturalizar",
    titleEn: "Plant and rewild",
    ledePt: "A forma mais direta: pôr autóctones no chão, ou pagar a quem as põe.",
    ledeEn: "The most direct route: put native trees in the ground, or fund those who do.",
    actions: [
      {
        slug: "plantacoes-voluntarias",
        labelPt: "Inscrever-se numa ação de plantação",
        labelEn: "Join a planting day",
        href: orgSite("plantar-uma-arvore"),
        claim: {
          pt:
            "A Plantar uma Árvore organiza reflorestações com espécies autóctones e recebe voluntários " +
            "na recuperação de áreas ardidas — não é preciso experiência nem terra própria.",
          en:
            "Plantar uma Árvore runs native-species reforestation drives and takes volunteers for the " +
            "recovery of burnt areas — no experience and no land of your own required.",
          sources: [{ id: "plantar" }],
        },
      },
      {
        slug: "apoiar-custodia",
        labelPt: "Apoiar custódia do território",
        labelEn: "Support land stewardship",
        href: orgSite("montis"),
        claim: {
          pt:
            "A Montis compra ou gere terrenos abandonados para os deixar voltar a floresta autóctone de " +
            "baixa inflamabilidade. Apoiar é comprar tempo a terra que ninguém está a gerir.",
          en:
            "Montis buys or manages abandoned plots and lets them return to low-flammability native " +
            "forest. Supporting it buys time for land nobody is managing.",
          sources: [{ id: "montis" }],
        },
      },
      {
        slug: "faia-brava",
        labelPt: "Visitar e apoiar a Faia Brava",
        labelEn: "Visit and support Faia Brava",
        // The reserve's own site, not ATN's (which the resistance list links).
        href: "https://www.faiabrava.com/",
        claim: {
          pt:
            "A ATN gere a Reserva da Faia Brava, a primeira área protegida privada do país — visitas e " +
            "apoios financiam restauro de habitat no vale do Côa.",
          en:
            "ATN manages the Faia Brava Reserve, the country's first private protected area — visits and " +
            "donations fund habitat restoration in the Côa valley.",
          sources: [{ id: "atn" }],
        },
      },
    ],
  },
  {
    slug: "terra",
    titlePt: "Se tens terra",
    titleEn: "If you own land",
    ledePt:
      "Cerca de 91% da floresta é privada. Se alguma é tua, a decisão sobre o que lá cresce é literalmente tua.",
    ledeEn:
      "Around 91% of the forest is privately owned. If any of it is yours, what grows there is literally your decision.",
    actions: [
      {
        slug: "nao-arrendar",
        labelPt: "Pensar duas vezes antes de arrendar a eucaliptal",
        labelEn: "Think twice before leasing for eucalyptus",
        claim: {
          pt:
            "Os programas de arrendamento florestal garantem uma renda estável por décadas, mas fixam o " +
            "uso do solo a eucalipto durante esse período — o custo ambiental só se cobra muito depois " +
            "do contrato assinado.",
          en:
            "Forest leasing programmes guarantee a steady rent for decades, but lock the land into " +
            "eucalyptus for that whole period — the environmental cost only comes due long after the " +
            "contract is signed.",
          sources: [{ id: "navigatorArrendamento" }],
        },
      },
      {
        slug: "entrar-custodia",
        labelPt: "Entregar terreno abandonado a custódia",
        labelEn: "Put idle land into stewardship",
        href: orgSite("montis"),
        claim: {
          pt:
            "Quem tem parcelas pequenas e sem uso pode cedê-las a associações de custódia do território, " +
            "que assumem a gestão e o restauro sem transferência de propriedade.",
          en:
            "Owners of small, unused plots can hand them to land-stewardship associations, which take on " +
            "management and restoration without any transfer of ownership.",
          sources: [{ id: "montis" }],
        },
      },
      {
        slug: "gestao-conjunta",
        labelPt: "Juntar-se a baldios ou gestão conjunta",
        labelEn: "Join a commons or joint-management scheme",
        claim: {
          pt:
            "A floresta portuguesa é sobretudo minifúndio disperso, o que impede gestão à escala. " +
            "Baldios comunitários e agrupamentos de proprietários devolvem essa escala sem vender a terra.",
          en:
            "Portuguese forest is mostly scattered smallholdings, which makes management at scale " +
            "impossible. Commons and owner groupings restore that scale without selling the land.",
          sources: [{ id: "propriedadeFlorestal" }],
        },
      },
    ],
  },
  {
    slug: "consumir",
    titlePt: "Consumir de outra maneira",
    titleEn: "Consume differently",
    ledePt: "É a procura que decide o que se planta. Inclui a tua.",
    ledeEn: "Demand decides what gets planted. Yours included.",
    actions: [
      {
        slug: "cortica",
        labelPt: "Escolher cortiça em vez de plástico",
        labelEn: "Choose cork over plastic",
        href: getSource("apcor").url,
        claim: {
          pt:
            "A cortiça vem de sobreiros que não são abatidos para a produzir — a árvore é descortiçada e " +
            "continua viva, pelo que a procura de cortiça sustenta montado de pé.",
          en:
            "Cork comes from cork oaks that are not felled to produce it — the tree is stripped and lives " +
            "on, so demand for cork keeps montado standing.",
          sources: [{ id: "apcor" }],
        },
      },
      {
        slug: "origem",
        labelPt: "Perguntar a origem do papel e da madeira",
        labelEn: "Ask where paper and timber come from",
        claim: {
          pt:
            "Papel e pasta portugueses assentam sobretudo na fileira do eucalipto. Saber a origem — e " +
            "preferir fornecedores de floresta nativa certificada — muda o sinal que chega ao produtor.",
          en:
            "Portuguese paper and pulp rest largely on the eucalyptus chain. Knowing the origin — and " +
            "preferring certified native-forest suppliers — changes the signal that reaches the producer.",
          sources: [{ id: "celpa" }],
        },
      },
    ],
  },
  {
    slug: "civico",
    titlePt: "Cívico e político",
    titleEn: "Civic and political",
    ledePt: "A área de eucalipto parou de crescer porque a lei mudou. As leis mudam sob pressão.",
    ledeEn: "The eucalyptus area stopped growing because the law changed. Laws change under pressure.",
    actions: [
      {
        slug: "apoiar-ong",
        labelPt: "Associar-se à Quercus ou à ZERO",
        labelEn: "Join Quercus or ZERO",
        href: orgSite("quercus"),
        claim: {
          pt:
            "A Quercus (1985) e a ZERO (2015) fazem campanha pela floresta autóctone e intervêm nas " +
            "consultas públicas de política florestal e de ordenamento do território.",
          en:
            "Quercus (1985) and ZERO (2015) campaign for native forest and take part in public " +
            "consultations on forest and land-use policy.",
          sources: [{ id: "quercus" }, { id: "zero" }],
        },
      },
      {
        slug: "lei-77",
        labelPt: "Exigir que a Lei 77/2017 se cumpra",
        labelEn: "Demand Law 77/2017 is enforced",
        href: getSource("lei77").url,
        claim: {
          pt:
            "A Lei n.º 77/2017 travou o alargamento líquido do eucalipto: novas plantações exigem, em " +
            "regra, substituir eucaliptal existente. Vale o que valer a fiscalização.",
          en:
            "Law no. 77/2017 halted the net expansion of eucalyptus: new plantations must, as a rule, " +
            "replace existing stands. It is worth exactly as much as its enforcement.",
          sources: [{ id: "lei77" }],
        },
      },
      {
        slug: "denunciar",
        labelPt: "Comunicar plantações irregulares ao ICNF",
        labelEn: "Report irregular plantings to ICNF",
        href: "https://www.icnf.pt/",
        claim: {
          pt:
            "As ações de arborização e rearborização estão sujeitas a autorização do ICNF, o que torna " +
            "as plantações não autorizadas comunicáveis à autoridade florestal.",
          en:
            "Afforestation and reforestation operations require ICNF authorisation, which makes " +
            "unauthorised plantings reportable to the forestry authority.",
          sources: [{ id: "lei77" }],
        },
      },
    ],
  },
  {
    slug: "saber-mais",
    titlePt: "Saber mais",
    titleEn: "Read further",
    ledePt: "As fontes primárias desta página, se quiseres verificar em vez de acreditar.",
    ledeEn: "This page's primary sources, if you would rather verify than believe.",
    actions: [
      {
        slug: "ifn6",
        labelPt: "Inventário Florestal Nacional (IFN6)",
        labelEn: "National Forest Inventory (IFN6)",
        // Government announcement of IFN6's completion, not the ICNF inventory
        // landing page (which the citation footnote still points to).
        href: "https://portugal.gov.pt/gc21/comunicacao/comunicados/6-inventario-florestal-nacional-esta-concluido",
        claim: {
          pt:
            "O levantamento oficial do que cresce em Portugal e em que área — a base de quase todos os " +
            "números desta página.",
          en:
            "The official survey of what grows in Portugal and over what area — the basis for nearly " +
            "every figure on this page.",
          sources: [{ id: "ifn6" }],
        },
      },
      {
        slug: "cti2017",
        labelPt: "Relatórios da Comissão Técnica Independente (2017)",
        labelEn: "Independent Technical Commission reports (2017)",
        claim: {
          pt:
            "A análise parlamentar independente dos incêndios de junho e outubro de 2017, incluindo " +
            "Pedrógão Grande.",
          en:
            "The independent parliamentary analysis of the June and October 2017 fires, including " +
            "Pedrógão Grande.",
          sources: [{ id: "cti2017" }],
        },
      },
      {
        slug: "fra2020",
        labelPt: "FAO — Global Forest Resources Assessment 2020",
        labelEn: "FAO — Global Forest Resources Assessment 2020",
        href: getSource("fra2020").url,
        claim: {
          pt:
            "Relatórios nacionais com metodologia harmonizada — é o que permite comparar Portugal com " +
            "Espanha, Itália e Grécia sem comparar definições diferentes.",
          en:
            "National reports on a harmonised methodology — what makes it possible to compare Portugal " +
            "with Spain, Italy and Greece without comparing different definitions.",
          sources: [{ id: "fra2020" }],
        },
      },
    ],
  },
] as const satisfies readonly ActionGroup[];
