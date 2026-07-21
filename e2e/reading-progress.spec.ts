/**
 * The mobile reading-progress bar (components/ReadingProgress.tsx). It only
 * exists below lg — phones have no dot rail — and its width tracks scroll via a
 * scaleX transform, so it has zero area at the top of the page.
 */
import { expect, test } from "@playwright/test";

test("progress bar shows on mobile and tracks scroll, hidden on desktop", async ({
  page,
}, testInfo) => {
  await page.goto("/pt");

  const bar = page.locator("[data-reading-progress]");
  const scaleX = () =>
    bar.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a);

  if (!testInfo.project.name.startsWith("mobile")) {
    // Desktop keeps the dot rail (lg:flex); the bar is lg:hidden → display:none.
    await expect(bar).toBeHidden();
    return;
  }

  // On mobile it's rendered (not lg:hidden); at the top it has scaleX(0) so it
  // has no area yet — assert it's laid out rather than "visible".
  await expect(bar).toBeAttached();
  expect(await bar.evaluate((el) => getComputedStyle(el).display)).not.toBe("none");
  const atTop = await scaleX();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(scaleX).toBeGreaterThan(atTop);
});
