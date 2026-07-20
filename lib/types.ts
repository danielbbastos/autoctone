/* Content-layer types. Every dataset entry must match one of these, so the
 * compiler — not a reviewer — guarantees each claim carries a source. */
import type { SourceRef } from "./sources";

export type { SourceRef } from "./sources";

/** A claim is a sentence plus the source(s) that back it. */
export type Claim = {
  /** PT-first copy. The `en` field is filled during the Phase 5 i18n pass. */
  pt: string;
  en?: string;
  sources: SourceRef[];
};

/** How a species behaves when fire arrives — drives the narrative contrast. */
export type FireBehaviour = "resists" | "resprouts" | "firebreak" | "accelerant";

/**
 * A tree/plant profile. `slug` doubles as the DOM id an animation targets and
 * the React `key`, so it must be unique and URL-safe.
 */
export type Species = {
  slug: string;
  /** Common Portuguese name, e.g. "Sobreiro". */
  namePt: string;
  /** Common English name, e.g. "Cork oak". */
  nameEn: string;
  /** Botanical name, italicised in the UI, e.g. "Quercus suber". */
  scientific: string;
  /** Whether this is a native ally or the introduced eucalyptus. */
  role: "native" | "invader";
  fireBehaviour: FireBehaviour;
  /** One-line hook shown in the gallery card. */
  taglinePt: string;
  taglineEn?: string;
  /** Fuller description, 2–4 sentences, PT-first. */
  bodyPt: string;
  bodyEn?: string;
  sources: SourceRef[];
};

/** Where an organization sits in the story. */
export type OrgKind = "company" | "association" | "ngo" | "law";

/**
 * A company, industry body, NGO, or piece of legislation the story names.
 * The project rule requires any claim about these actors to be cited, so the
 * defining `claim` is a full `Claim`, not a bare string.
 */
export type Organization = {
  slug: string;
  name: string;
  kind: OrgKind;
  /** "profits" = part of the pulp economy; "resists" = fighting eucalyptus. */
  side: "profits" | "resists" | "neutral";
  /** Founded / enacted year, when relevant. */
  since?: number;
  /** Public website — makes the org name a link where present. */
  site?: string;
  /** Optional key figures shown as a small stat row (capital, share, growth…). */
  facts?: OrgFact[];
  claim: Claim;
};

/** A compact labelled figure about an organization (e.g. "Capitalização · ~2,5 mM€"). */
export type OrgFact = {
  labelPt: string;
  labelEn?: string;
  /** The figure itself. Mostly language-neutral, but `valueEn` overrides it
   * when the string embeds words (e.g. "papel"/"pasta", "mil t/ano"). */
  value: string;
  valueEn?: string;
  sources: SourceRef[];
};

/**
 * One thing a reader can actually do. `claim` carries the cited justification;
 * `href` is where the doing happens, so an action without a link is still
 * valid copy (e.g. "don't lease your land").
 */
export type Action = {
  slug: string;
  labelPt: string;
  labelEn?: string;
  /** Outbound link — an org site, a law, a register. */
  href?: string;
  claim: Claim;
};

/** A themed cluster of actions in the closing call-to-action section. */
export type ActionGroup = {
  slug: string;
  titlePt: string;
  titleEn?: string;
  /** One line framing why this cluster matters. */
  ledePt: string;
  ledeEn?: string;
  actions: Action[];
};

/**
 * One country's forest split for the international comparison. Areas are in
 * 1000 ha as FRA reports them; the rendered percentage is derived, never
 * stored, so the bar can never drift from the cited hectares.
 */
export type ForestShare = {
  /** ISO 3166-1 alpha-3, doubles as the React key. */
  code: "PRT" | "ESP" | "ITA" | "GRC";
  namePt: string;
  nameEn: string;
  /** Total forest area, 1000 ha. */
  totalKha: number;
  /** Planted forest (FRA category), 1000 ha. Includes native planted stands. */
  plantedKha: number;
  sources: SourceRef[];
};

/** A headline statistic rendered as a big number in the narrative. */
export type Stat = {
  slug: string;
  /** The number itself, pre-formatted, e.g. "845 000" or "66". */
  value: string;
  /** Overrides `value` when EN formatting differs (e.g. "845,000"). */
  valueEn?: string;
  /** Unit or short qualifier, e.g. "hectares" or "mortos". */
  unitPt: string;
  unitEn?: string;
  /** What the number means, PT-first. */
  labelPt: string;
  labelEn?: string;
  sources: SourceRef[];
  /**
   * Optional "how big is that?" reference points (e.g. "84× a cidade de
   * Lisboa"). Typed as `Claim` so each comparison must cite the area it is
   * derived from — same compiler guarantee as body copy.
   */
  comparisons?: Claim[];
};
