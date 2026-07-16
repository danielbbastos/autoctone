/* Organizations dataset. Claims about companies stay factual and sourced
 * (market position, financials, sector role) — stronger characterisation
 * belongs in narrative copy, attributed and cited there. */
import type { Organization } from "./types";

export const ORGANIZATIONS = [
  // ── The pulp economy ────────────────────────────────────────────────
  {
    slug: "navigator",
    name: "The Navigator Company",
    kind: "company",
    side: "profits",
    since: 1953, // founded as Portucel (Cacia mill); renamed Navigator in 2016
    site: "https://thenavigatorcompany.com",
    claim: {
      pt:
        "A Navigator (ex-Portucel, fundada em 1953 e rebatizada em 2016) foi pioneira mundial da pasta de " +
        "eucalipto e é hoje o maior produtor português de papel fino de impressão e escrita e um dos maiores " +
        "exportadores nacionais, com a fileira do eucalipto no centro do negócio.",
      en:
        "Navigator (formerly Portucel, founded in 1953 and renamed in 2016) was a global pioneer of " +
        "eucalyptus pulp and is today Portugal's largest producer of fine printing and writing paper and " +
        "one of the country's biggest exporters, with the eucalyptus chain at the heart of the business.",
      sources: [
        { id: "navigator", note: "Portucel fundada em 1953; primeira pasta kraft de eucalipto em 1957; nome Navigator desde 2016." },
      ],
    },
    facts: [
      {
        labelPt: "Receita 2024",
        labelEn: "2024 revenue",
        value: "≈ 2 mil M€",
        valueEn: "≈ €2bn",
        sources: [{ id: "navigator", note: "Receita ~2,24 mil M$ em 2024." }],
      },
      {
        labelPt: "Quota na Europa",
        labelEn: "European share",
        value: "~29% papel · ~16% pasta",
        valueEn: "~29% paper · ~16% pulp",
        sources: [{ id: "navigator", note: "Líder europeu de papel UWF (~29%) e de pasta BEK (~16%)." }],
      },
      {
        labelPt: "Floresta gerida",
        labelEn: "Forest managed",
        value: "≈ 109 000 ha",
        valueEn: "≈ 109,000 ha",
        sources: [{ id: "navigatorArrendamento", note: "~50 000 ha são terrenos arrendados a proprietários." }],
      },
    ],
  },
  {
    slug: "altri",
    name: "Altri",
    kind: "company",
    side: "profits",
    since: 2005,
    site: "https://www.altri.pt",
    claim: {
      pt:
        "A Altri, constituída em 2005, é o segundo grande produtor português de pasta de eucalipto, operando " +
        "as fábricas das marcas Celbi, Caima e Celtejo.",
      en:
        "Altri, incorporated in 2005, is Portugal's second large producer of eucalyptus pulp, operating the " +
        "mills of the Celbi, Caima and Celtejo brands.",
      sources: [{ id: "altri", note: "Constituída em março de 2005; detém Celbi, Caima e Celtejo." }],
    },
    facts: [
      {
        labelPt: "Fundação",
        labelEn: "Founded",
        value: "2005",
        sources: [{ id: "altri" }],
      },
      {
        labelPt: "Capitalização",
        labelEn: "Market cap",
        value: "≈ 1 mil M€",
        valueEn: "≈ €1bn",
        sources: [{ id: "altri", note: "Capitalização bolsista ~1 mil M€ (2026)." }],
      },
      {
        labelPt: "Capacidade",
        labelEn: "Capacity",
        value: "≈ 900 mil t/ano",
        valueEn: "≈ 900k t/yr",
        sources: [{ id: "altri", note: "Três fábricas de pasta branqueada de eucalipto (Celbi, Caima, Celtejo)." }],
      },
    ],
  },
  {
    slug: "celpa",
    name: "CELPA — Associação da Indústria Papeleira",
    kind: "association",
    side: "profits",
    site: "https://www.celpa.pt",
    claim: {
      pt:
        "A CELPA é a associação que representa a indústria portuguesa da pasta e do papel, " +
        "publicando o Boletim Estatístico anual do setor.",
      en:
        "CELPA is the association representing the Portuguese pulp and paper industry, " +
        "publishing the sector's annual Statistical Bulletin.",
      sources: [{ id: "celpa", note: "Representa os produtores nacionais de pasta e papel." }],
    },
  },

  // ── The resistance ──────────────────────────────────────────────────
  {
    slug: "quercus",
    name: "Quercus — Associação Nacional de Conservação da Natureza",
    kind: "ngo",
    side: "resists",
    since: 1985,
    site: "https://www.quercus.pt",
    claim: {
      pt:
        "A Quercus, fundada em 1985, é uma das mais antigas ONG ambientais portuguesas e faz campanha " +
        "pela floresta autóctone e contra a monocultura de eucalipto.",
      en:
        "Quercus, founded in 1985, is one of Portugal's oldest environmental NGOs and campaigns " +
        "for native forest and against the eucalyptus monoculture.",
      sources: [{ id: "quercus", note: "Fundada em 31 de outubro de 1985." }],
    },
  },
  {
    slug: "zero",
    name: "ZERO — Associação Sistema Terrestre Sustentável",
    kind: "ngo",
    side: "resists",
    since: 2015,
    site: "https://zero.ong",
    claim: {
      pt:
        "A ZERO, criada em 2015, intervém em políticas de floresta, clima e ordenamento do território, " +
        "defendendo a redução da área de eucalipto em zonas de risco.",
      en:
        "ZERO, founded in 2015, works on forest, climate and land-use policy, " +
        "advocating for reducing the eucalyptus area in high-risk zones.",
      sources: [{ id: "zero" }],
    },
  },
  {
    slug: "montis",
    name: "Montis — Associação de Conservação da Natureza",
    kind: "ngo",
    side: "resists",
    site: "https://www.montis.pt",
    claim: {
      pt:
        "A Montis pratica custódia do território: adquire ou gere terrenos abandonados para recuperar " +
        "floresta autóctone de baixa inflamabilidade.",
      en:
        "Montis practises land stewardship: it acquires or manages abandoned plots to restore " +
        "low-flammability native forest.",
      sources: [{ id: "montis", note: "Modelo de custódia do território / recuperação de floresta nativa." }],
    },
  },
  {
    slug: "atn",
    name: "ATN — Associação Transumância e Natureza",
    kind: "ngo",
    side: "resists",
    site: "https://www.atnatureza.org",
    claim: {
      pt:
        "A ATN gere a Reserva da Faia Brava, no vale do Côa — a primeira área protegida privada de Portugal — " +
        "restaurando habitats e reintroduzindo herbívoros selvagens.",
      en:
        "ATN manages the Faia Brava Reserve, in the Côa valley — Portugal's first private protected area — " +
        "restoring habitats and reintroducing wild herbivores.",
      sources: [{ id: "atn", note: "Faia Brava: primeira reserva privada reconhecida em Portugal." }],
    },
  },
  {
    slug: "plantar-uma-arvore",
    name: "Plantar uma Árvore",
    kind: "ngo",
    side: "resists",
    site: "https://www.plantarumaarvore.org",
    claim: {
      pt:
        "A associação Plantar uma Árvore organiza ações de reflorestação com espécies autóctones, " +
        "envolvendo voluntários na recuperação de áreas ardidas.",
      en:
        "The Plantar uma Árvore association runs reforestation drives with native species, " +
        "involving volunteers in the recovery of burnt areas.",
      sources: [{ id: "plantar", note: "Reflorestação com espécies autóctones." }],
    },
  },

  // ── The law ─────────────────────────────────────────────────────────
  {
    slug: "lei-77-2017",
    name: "Lei n.º 77/2017 — regime de arborização",
    kind: "law",
    side: "resists",
    since: 2017,
    site: "https://diariodarepublica.pt",
    claim: {
      pt:
        "Na sequência dos incêndios de 2017, a Lei n.º 77/2017 alterou o regime jurídico de arborização e " +
        "rearborização, travando o alargamento líquido da área de eucalipto — novas plantações passaram, em regra, " +
        "a exigir a substituição de eucaliptal existente.",
      en:
        "Following the 2017 fires, Law no. 77/2017 amended the legal regime for afforestation and " +
        "reforestation, halting the net expansion of the eucalyptus area — new plantations were, as a rule, " +
        "made conditional on replacing existing eucalyptus stands.",
      sources: [{ id: "lei77", note: "Altera o regime jurídico das ações de arborização e rearborização (RJAAR)." }],
    },
  },
] as const satisfies readonly Organization[];

export type OrgSlug = (typeof ORGANIZATIONS)[number]["slug"];

/** Split the two sides of the story for the "Who profits" / "Resistance" sections. */
export const PROFIT_ORGS = ORGANIZATIONS.filter((o) => o.side === "profits");
export const RESIST_ORGS = ORGANIZATIONS.filter((o) => o.side === "resists");
