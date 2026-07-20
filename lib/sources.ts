/* Normalized source registry: claims reference these by id. Insertion order
 * defines the footnote numbers, and keys are anchor targets (#fonte-<id>) —
 * renaming a key is a breaking change; add, don't rename. */

/** A canonical source. `note` is NOT here — notes are per-use, on the ref. */
export type Source = {
  /** 1–2 word marker label shown beside the inline number. */
  short: string;
  /** Full human-readable citation for the footer list. */
  source: string;
  /** Stable link, when one exists. Verify before publishing. */
  url?: string;
  /** Publication year of the cited document, for "as of" framing. */
  year?: number;
};

export const SOURCES = {
  ifn6: {
    short: "ICNF",
    source: "ICNF — 6.º Inventário Florestal Nacional (IFN6)",
    url: "https://www.icnf.pt/florestas/ifn",
    year: 2019,
  },
  fireEcology: {
    short: "Ecologia do fogo",
    source:
      "Literatura sobre ecologia do fogo mediterrânico: inflamabilidade comparada, " +
      "regeneração pós-fogo de espécies autóctones (rebentação de toiça e raiz) e de " +
      "Eucalyptus globulus (talhadia e libertação de sementes pelo calor)",
  },
  celpa: {
    short: "CELPA",
    source: "CELPA — Associação da Indústria Papeleira, Boletim Estatístico",
    url: "https://www.celpa.pt",
  },
  apcor: {
    short: "APCOR",
    source: "APCOR — Associação Portuguesa da Cortiça",
    url: "https://www.apcor.pt",
  },
  navigator: {
    short: "Navigator",
    source: "The Navigator Company — Relatório e Contas 2024 / apresentação institucional",
    url: "https://thenavigatorcompany.com/en/investors/financial-information/",
    year: 2024,
  },
  navigatorArrendamento: {
    short: "Clube PF",
    source:
      "Clube de Produtores Florestais / The Navigator Company — programa de arrendamento e gestão de terrenos florestais",
    url: "https://clubeprodutoresflorestais.com/rent-opportunity",
  },
  altri: {
    short: "Altri",
    source: "Altri SGPS — Relatório e Contas / Euronext Lisbon",
    url: "https://www.altri.pt",
  },
  cti2017: {
    short: "CTI 2017",
    source:
      "Comissão Técnica Independente (Assembleia da República) — relatórios dos incêndios de junho e de outubro de 2017",
    year: 2017,
  },
  icnfArdida: {
    short: "ICNF",
    source: "ICNF — estatísticas de área ardida",
    url: "https://www.icnf.pt",
    year: 2017,
  },
  cortica2024: {
    short: "Cortiça 2024",
    source: "APCOR / INE — exportações portuguesas de cortiça (noticiado pela RTP/Lusa)",
    url: "https://www.rtp.pt/noticias/economia/exportacoes-de-cortica-caem-52-para-1148-me-em-2024-apos-anos-de-recordes_n1635228",
    year: 2024,
  },
  propriedadeFlorestal: {
    short: "Florestas.pt",
    source:
      "Florestas.pt / ICNF — estrutura da propriedade florestal em Portugal (privada, fragmentada)",
    url: "https://florestas.pt/conhecer/propriedade-florestal-em-portugal-privada-fragmentada-e-com-escassos-planos-de-gestao/",
  },
  dgtCaop: {
    short: "DGT",
    source: "DGT — Carta Administrativa Oficial de Portugal (CAOP), áreas administrativas",
    url: "https://www.dgterritorio.gov.pt",
  },
  quercus: {
    short: "Quercus",
    source: "Quercus — Associação Nacional de Conservação da Natureza",
    url: "https://www.quercus.pt",
    year: 1985,
  },
  zero: {
    short: "ZERO",
    source: "ZERO — Associação Sistema Terrestre Sustentável",
    url: "https://zero.ong",
    year: 2015,
  },
  montis: {
    short: "Montis",
    source: "Montis — Associação de Conservação da Natureza",
    url: "https://www.montis.pt",
  },
  atn: {
    short: "ATN",
    source: "ATN — Associação Transumância e Natureza / Reserva da Faia Brava",
    url: "https://www.atnatureza.org",
  },
  plantar: {
    short: "Plantar",
    source: "Plantar uma Árvore — associação de reflorestação com espécies autóctones",
    url: "https://www.plantarumaarvore.org",
  },
  lei77: {
    short: "Lei 77/2017",
    source: "Diário da República — Lei n.º 77/2017, de 17 de agosto",
    url: "https://diariodarepublica.pt",
    year: 2017,
  },

  // ── Species profiles (gallery) ──────────────────────────────────────
  arvoreNacional: {
    short: "AR 2011",
    source:
      "Assembleia da República — Resolução que consagra o sobreiro como Árvore Nacional de Portugal",
    year: 2011,
  },
  natura2000: {
    short: "Rede Natura",
    source:
      "ICNF — Habitat 6310 'Montados de Quercus spp. de folha perene' (Rede Natura 2000)",
    url: "https://www.icnf.pt",
  },
  medronho: {
    short: "ICNF",
    source:
      "ICNF — programas de valorização do medronheiro como espécie de menor inflamabilidade",
    url: "https://www.icnf.pt",
  },
  apaRipicola: {
    short: "APA",
    source:
      "APA — gestão de galerias ripícolas / literatura sobre corredores ripários como corta-fogos",
    url: "https://www.apambiente.pt",
  },

  // ── International comparison ────────────────────────────────────────
  /* One entry for all four countries: FRA applies a single harmonised
   * methodology across them, which is the only reason the comparison holds.
   * Per-country report ids live in each ref's `note`. */
  fra2020: {
    short: "FAO FRA 2020",
    source:
      "FAO — Global Forest Resources Assessment 2020, relatórios nacionais (Portugal cb0048en, " +
      "Espanha cb0103es, Itália cb0012en, Grécia ca9999en), Tabela 1b «Forest characteristics»",
    url: "https://www.fao.org/forest-resources-assessment/past-assessments/fra-2020/country-reports/en",
    year: 2020,
  },
} satisfies Record<string, Source>;

/** The precise union of registry keys — what a `SourceRef.id` must be. */
export type SourceId = keyof typeof SOURCES;

/**
 * A reference from a claim to a source. `note` records the specific figure,
 * page, or table for this particular use, so a shared source can still be
 * re-checked against the exact claim it backs.
 */
export type SourceRef = { id: SourceId; note?: string };

/** Insertion-ordered list of ids — the footnote numbering. */
export const SOURCE_ORDER = Object.keys(SOURCES) as SourceId[];

/** 1-based footnote number for a source (its position in the registry). */
export function sourceNumber(id: SourceId): number {
  return SOURCE_ORDER.indexOf(id) + 1;
}

export function getSource(id: SourceId): Source {
  return SOURCES[id];
}
