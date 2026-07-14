/**
 * i18n invariants. TypeScript already guarantees the dictionary SHAPES match
 * (`Dictionary` is derived from the PT entry); these tests cover what types
 * can't: runtime fallback behaviour and that no locale ships an empty string.
 */
import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDictionary,
  isLocale,
  localize,
  otherLocale,
} from "@/lib/i18n";

/** Flatten a nested dictionary into "path.to.key" → value pairs. */
function flatten(obj: Record<string, unknown>, prefix = ""): [string, unknown][] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flatten(value as Record<string, unknown>, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value] as [string, unknown]],
  );
}

describe("dictionaries", () => {
  it("expose the same keys in every locale", () => {
    const [reference, ...rest] = LOCALES.map((l) =>
      flatten(getDictionary(l)).map(([path]) => path).sort(),
    );
    for (const keys of rest) expect(keys).toEqual(reference);
  });

  it("have no empty strings", () => {
    for (const locale of LOCALES) {
      for (const [path, value] of flatten(getDictionary(locale))) {
        expect(typeof value, `${locale}:${path}`).toBe("string");
        expect((value as string).trim().length, `${locale}:${path}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("localize", () => {
  it("returns the EN value when present", () => {
    expect(localize("en", { pt: "Sobreiro", en: "Cork oak" })).toBe("Cork oak");
  });

  it("falls back to PT while EN content is pending", () => {
    expect(localize("en", { pt: "Sobreiro" })).toBe("Sobreiro");
  });

  it("never serves EN copy on the PT route", () => {
    expect(localize("pt", { pt: "Sobreiro", en: "Cork oak" })).toBe("Sobreiro");
  });
});

describe("locale helpers", () => {
  it("isLocale narrows valid route params and rejects the rest", () => {
    for (const locale of LOCALES) expect(isLocale(locale)).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("otherLocale toggles between the two locales", () => {
    expect(otherLocale("pt")).toBe("en");
    expect(otherLocale("en")).toBe("pt");
    expect(otherLocale(DEFAULT_LOCALE)).not.toBe(DEFAULT_LOCALE);
  });
});
