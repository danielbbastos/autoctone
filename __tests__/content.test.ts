/**
 * Content-layer invariants — the runtime half of the "facts need sources" rule.
 * TypeScript guarantees every `SourceRef.id` exists in the registry, but it
 * cannot stop an EMPTY `sources: []` or a duplicated slug; these tests can.
 */
import { describe, expect, it } from "vitest";
import { ORGANIZATIONS } from "@/lib/organizations";
import { SPECIES } from "@/lib/species";
import { SECTIONS, STATS } from "@/lib/narrative";
import { SOURCES, SOURCE_ORDER, sourceNumber } from "@/lib/sources";
import type { SourceRef } from "@/lib/sources";

/** A label plus the (readonly, `as const`) sources array behind it. */
type Citation = [string, readonly SourceRef[]];

/** Every citable thing on the site, labelled for a readable failure message.
 * The datasets are `as const` union types, so optional fields like `facts` /
 * `comparisons` only exist on SOME members — the `in` operator narrows to them. */
function allCitations(): Citation[] {
  return [
    ...SPECIES.map((s): Citation => [`species:${s.slug}`, s.sources]),
    ...ORGANIZATIONS.flatMap((o): Citation[] => [
      [`org:${o.slug}`, o.claim.sources],
      ...("facts" in o
        ? o.facts.map((f, i): Citation => [`org:${o.slug}:fact${i}`, f.sources])
        : []),
    ]),
    ...STATS.flatMap((s): Citation[] => [
      [`stat:${s.slug}`, s.sources],
      ...("comparisons" in s
        ? s.comparisons.map((c, i): Citation => [`stat:${s.slug}:comparison${i}`, c.sources])
        : []),
    ]),
    ...SECTIONS.flatMap((sec) =>
      sec.body.map((claim, i): Citation => [`section:${sec.id}:body${i}`, claim.sources]),
    ),
  ];
}

describe("facts need sources", () => {
  it("every claim carries at least one source", () => {
    for (const [label, sources] of allCitations()) {
      expect(sources.length, `${label} has no sources`).toBeGreaterThan(0);
    }
  });
});

describe("dataset slugs and ids", () => {
  it.each([
    ["species", SPECIES.map((s) => s.slug)],
    ["organizations", ORGANIZATIONS.map((o) => o.slug)],
    ["stats", STATS.map((s) => s.slug)],
    ["sections", SECTIONS.map((s) => s.id)],
  ])("%s are unique (React keys / DOM anchors)", (_name, slugs) => {
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("source registry numbering", () => {
  it("footnote numbers are 1-based and follow insertion order", () => {
    expect(SOURCE_ORDER[0]).toBeDefined();
    expect(sourceNumber(SOURCE_ORDER[0])).toBe(1);
    expect(sourceNumber(SOURCE_ORDER[SOURCE_ORDER.length - 1])).toBe(SOURCE_ORDER.length);
  });

  it("every registered source has a footer citation text", () => {
    for (const [id, source] of Object.entries(SOURCES)) {
      expect(source.source.trim().length, `source:${id}`).toBeGreaterThan(0);
      expect(source.short.trim().length, `source:${id}`).toBeGreaterThan(0);
    }
  });
});
