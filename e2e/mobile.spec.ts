/**
 * Mobile diagnostic for the pinned scroll scenes. The pins are a fixed 100dvh
 * sticky stage holding content that was sized against a 1280×800 desktop; at
 * phone width that content can be taller than the stage and get silently clipped
 * (invasão's stage is overflow:hidden; the staged scene centres and spills).
 *
 * Clipping is a LAYOUT property: the scene animations move things with
 * transform/opacity/blur only, none of which change an element's layout box, so
 * the inner content's natural height is stable at any scroll position. That is
 * what makes this measurable without chasing exact pin offsets — the trap that
 * produced false alarms before. We still disable smooth-scroll/snap so the
 * eyeball screenshots land at a deterministic spot.
 *
 * Runs on every project; it only fails where content actually overflows, which
 * in practice is the mobile widths (iPhone SE / Pixel 7).
 */
import { expect, test } from "@playwright/test";

const PINNED_SCENES = [
  { id: "invasao", stage: ".invasao-stage" },
  { id: "ciclo", stage: ".staged-stage" },
] as const;

test.beforeEach(async ({ page }) => {
  await page.goto("/pt");
  // Deterministic positions: kill smooth scroll and any scroll-snap.
  await page.addStyleTag({
    content:
      "html{scroll-behavior:auto !important} *{scroll-snap-type:none !important}",
  });
});

for (const scene of PINNED_SCENES) {
  test(`${scene.id}: pinned content fits the 100dvh stage`, async ({
    page,
  }, testInfo) => {
    const section = page.locator(`#${scene.id}`);
    await section.scrollIntoViewIfNeeded();

    // Stage box vs. its inner content box. The stage is a fixed 100dvh; the
    // `.section-index` block is the laid-out content, unaffected by the
    // transforms the animation applies to its children.
    const { stageH, contentH } = await page.evaluate((stageSel) => {
      const stage = document.querySelector(stageSel) as HTMLElement;
      const content = stage.querySelector(".section-index") as HTMLElement;
      return {
        stageH: stage.clientHeight,
        contentH: content.getBoundingClientRect().height,
      };
    }, scene.stage);

    // Park the pin at its midpoint and capture a frame for eyeball review —
    // done before the assert so the image exists even when the scene clips.
    const box = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { top: window.scrollY + rect.top, height: (el as HTMLElement).offsetHeight };
    });
    await page.evaluate(
      ({ top, height }) => window.scrollTo(0, top + (height - window.innerHeight) / 2),
      box,
    );
    await page.screenshot({ path: testInfo.outputPath(`${scene.id}-pinned.png`) });

    expect(
      contentH,
      `${scene.id}: content (${Math.round(contentH)}px) is taller than its ${Math.round(stageH)}px stage — it clips`,
    ).toBeLessThanOrEqual(stageH);
  });
}

// Forest scenes size in --fu so they scale rather than clip; a frame at the pin
// midpoint is enough to confirm the composition holds at phone width.
for (const id of ["floresta", "renascer"] as const) {
  test(`${id}: forest stage composes at phone width`, async ({ page }, testInfo) => {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    const box = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { top: window.scrollY + rect.top, height: (el as HTMLElement).offsetHeight };
    });
    await page.evaluate(
      ({ top, height }) => window.scrollTo(0, top + (height - window.innerHeight) / 2),
      box,
    );
    await expect(page.locator(`#${id} .forest-stage`)).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`${id}-pinned.png`) });
  });
}
