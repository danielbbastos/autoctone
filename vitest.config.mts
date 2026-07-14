/**
 * Vitest = unit/component tests (jsdom). Playwright owns e2e/, so it is
 * excluded here. `vite-tsconfig-paths` teaches Vite the `@/` alias from
 * tsconfig; the React plugin compiles JSX in test files.
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    // Globals let Testing Library register its automatic DOM cleanup between
    // tests (it hooks the global `afterEach`); tests still import explicitly.
    globals: true,
    exclude: ["e2e/**", "node_modules/**"],
  },
});
