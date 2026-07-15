import type { MetadataRoute } from "next";

/**
 * Web app manifest (PWA metadata: home-screen name, icons, colours).
 *
 * Concept demonstrated: Next's metadata file conventions — `manifest.ts` in the
 * app root is a special route handler that serves `/manifest.webmanifest` and
 * links it from <head>, same family as the favicon/icon/apple-icon files that
 * sit next to it and the per-locale `opengraph-image.tsx`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Autóctone — a floresta que resiste ao fogo",
    short_name: "Autóctone",
    start_url: "/",
    display: "standalone",
    background_color: "#022c22", // emerald-950, matches themeColor in layout.tsx
    theme_color: "#022c22",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
