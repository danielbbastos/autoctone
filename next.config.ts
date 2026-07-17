import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Old scroll handler focuses the first element after client navigation,
    // which flashes the skip link in Safari (WebKit applies :focus-visible to
    // any programmatic focus). The new handler no longer focuses it.
    appNewScrollHandler: true,
  },
};

export default nextConfig;
