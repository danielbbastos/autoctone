/**
 * Shared content types for the Autóctone datasets.
 *
 * Concept demonstrated: a typed "content layer". Every fact the site shows
 * lives in `lib/` as a plain object that must match one of these types, so the
 * compiler — not a human reviewer — guarantees each claim carries at least one
 * source. Components downstream just map over these; they never hold copy of
 * their own.
 *
 * Sources are referenced, not inlined: a claim holds `SourceRef`s (an id into
 * the `lib/sources.ts` registry plus an optional per-use note). See that file
 * for why (de-duplication + stable footnote numbering).
 */
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
  /** Fuller description, 2–4 sentences, PT-first. */
  bodyPt: string;
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
  value: string;
  sources: SourceRef[];
};

/** A headline statistic rendered as a big number in the narrative. */
export type Stat = {
  slug: string;
  /** The number itself, pre-formatted, e.g. "845 000" or "66". */
  value: string;
  /** Unit or short qualifier, e.g. "hectares" or "mortos". */
  unitPt: string;
  /** What the number means, PT-first. */
  labelPt: string;
  sources: SourceRef[];
  /**
   * Optional "how big is that?" reference points (e.g. "84× a cidade de
   * Lisboa"). Typed as `Claim` so each comparison must cite the area it is
   * derived from — same compiler guarantee as body copy.
   */
  comparisons?: Claim[];
};
