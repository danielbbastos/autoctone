import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/* Last-updated date, resolved from the last commit at build time. A
 * hand-maintained constant goes stale silently; this can't. Falls back to the
 * build date where git history isn't available (some CI checkouts). */
function lastCommitDate(): string {
  try {
    return execSync("git log -1 --format=%cs", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastCommitDate(),
  },
  experimental: {
    // Old scroll handler focuses the first element after client navigation,
    // which flashes the skip link in Safari (WebKit applies :focus-visible to
    // any programmatic focus). The new handler no longer focuses it.
    appNewScrollHandler: true,
  },
};

export default nextConfig;
