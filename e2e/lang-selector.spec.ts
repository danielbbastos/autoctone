/**
 * The globe language selector: name shown on desktop, globe-only on mobile, and
 * the dropdown switches locale.
 */
import { expect, test, type Page } from "@playwright/test";

const trigger = (page: Page) => page.locator('button[aria-controls="lang-menu"]');

test.beforeEach(async ({ page }) => {
  await page.goto("/pt");
});

test("trigger shows the current language name on desktop, globe-only on mobile", async ({
  page,
}, testInfo) => {
  const nameVisible = await trigger(page).getByText("Português").isVisible();
  expect(nameVisible).toBe(!testInfo.project.name.startsWith("mobile"));
});

test("opening the menu lists locales and switching navigates", async ({ page }) => {
  const button = trigger(page);
  await expect(button).toHaveAttribute("aria-expanded", "false");

  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");

  const menu = page.locator("#lang-menu");
  await expect(menu.getByRole("link", { name: "Português" })).toHaveAttribute(
    "aria-current",
    "true",
  );
  await menu.getByRole("link", { name: "English" }).click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the menu closes on Escape", async ({ page }) => {
  const button = trigger(page);
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
