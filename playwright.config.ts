/**
 * Playwright = end-to-end tests (e2e/). Runs against a PRODUCTION build —
 * `webServer` builds and starts the app on its OWN port (3100) so it never
 * collides with (or accidentally tests) the dev server on :3000. Two engines:
 * Chromium, plus WebKit because the forest scenes are Safari-sensitive.
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // Mobile: the pinned scenes hold desktop-measured content in a 100dvh stage,
    // so they need real phone widths. iPhone SE is the smallest common (375×667)
    // and rides the Safari engine, where the seams/filters are most sensitive.
    { name: "mobile-safari", use: { ...devices["iPhone SE"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
