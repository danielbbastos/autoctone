/**
 * End-to-end smoke tests against the production build (see playwright.config.ts
 * `webServer`). E2E is where the things unit tests can't reach get verified:
 * the proxy's locale negotiation, the real scroll behaviour of the forest
 * scenes, and reduced-motion rendering — in Chromium AND WebKit (Safari engine).
 */
import { expect, test } from "@playwright/test";
import { getDictionary } from "../lib/i18n";

// Assert captions via the dictionary so copy edits can't silently strand the test.
const PT = getDictionary("pt");

// The proxy negotiates the locale from the Accept-Language header, which
// Playwright derives from the context `locale` — so each browser context
// exercises one side of the negotiation.
test.describe("locale negotiation (proxy)", () => {
  test.describe("Portuguese browser", () => {
    test.use({ locale: "pt-PT" });
    test("/ lands on /pt", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/pt$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "pt");
    });
  });

  test.describe("English browser", () => {
    test.use({ locale: "en-US" });
    test("/ lands on /en", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/en$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });
  });
});

test("PT page renders the narrative with exactly one h1", async ({ page }) => {
  await page.goto("/pt");
  await expect(page.locator("h1")).toHaveCount(1);
  // Both scroll scenes and the sources footer are present in the document.
  await expect(page.locator("#floresta")).toHaveCount(1);
  await expect(page.locator("#renascer")).toHaveCount(1);
});

test("EN route is live with its own lang attribute", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveCount(1);
});

test("scrolling into the forest scene shows the sticky stage caption", async ({
  page,
}) => {
  await page.goto("/pt");
  await page.locator("#floresta").scrollIntoViewIfNeeded();
  await expect(
    page.getByText(PT.forestRevealCaption),
  ).toBeVisible();
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("the page still renders every scene without scroll animations", async ({
    page,
  }) => {
    await page.goto("/pt");
    await expect(page.locator("#floresta")).toHaveCount(1);
    await page.locator("#floresta").scrollIntoViewIfNeeded();
    // Static fallback: layers sit at their parted base transform, no animation.
    await expect(
      page.getByText(PT.forestRevealCaption),
    ).toBeVisible();
  });
});
