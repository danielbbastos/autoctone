/**
 * Accessibility flow the desktop-only screenshots never covered: heading
 * outline, skip-link reachability, keyboard order through the closing CTA, and
 * that focus can't land on an invisible control inside the staged scene.
 */
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pt");
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
});

test("heading outline has one h1 and never skips a level", async ({ page }) => {
  const levels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));

  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  expect(levels[0]).toBe(1);
  // Each heading is at most one level deeper than the previous (no h2→h4 jumps).
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
  }
});

test("the skip link is the first focusable and targets the main content", async ({
  page,
}) => {
  // Tab order follows DOM order (no positive tabindex on the page), so the first
  // focusable element being the skip link is the engine-independent assertion —
  // WebKit won't Tab to links unless macOS Full Keyboard Access is on.
  const first = page.locator("a[href], button, input, [tabindex]:not([tabindex='-1'])").first();
  await expect(first).toHaveAttribute("href", "#conteudo");
  await first.focus();
  await expect(first).toBeFocused();
  await expect(page.locator("#conteudo")).toHaveCount(1);
});

test("every control in the closing CTA is keyboard-reachable, share after actions", async ({
  page,
}) => {
  const controls = page.locator("#acao a, #acao button");
  const count = await controls.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const c = controls.nth(i);
    await expect(c).toBeVisible();
    await expect(c).toBeEnabled();
    // No positive/removed tabindex reshuffling DOM order out from under us.
    expect(await c.getAttribute("tabindex")).toBeNull();
  }

  // The share targets live after the action links in DOM (= tab) order.
  const texts = await controls.allInnerTexts();
  const firstShareTarget = texts.findIndex((t) => /WhatsApp|Bluesky|LinkedIn/.test(t));
  expect(firstShareTarget).toBeGreaterThan(0);
  expect(texts.slice(firstShareTarget).join(" ")).toMatch(/WhatsApp/);
});

test("focusing the staged cross-link makes it visible (no focus on hidden)", async ({
  page,
}) => {
  const link = page.locator('#ciclo a[href="#fogo-eucalipto"]');
  await page.locator("#ciclo").scrollIntoViewIfNeeded();
  await link.focus();
  // On desktop the block starts blurred/transparent and resolves on scroll;
  // :focus-within must snap it to opacity 1 so the focus ring isn't invisible.
  await expect
    .poll(() => link.evaluate((el) => getComputedStyle(el).opacity))
    .toBe("1");
});
