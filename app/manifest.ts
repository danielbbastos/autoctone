import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_NAME, SITE_COPY, THEME_COLOR } from "@/lib/site";

/** Served at /manifest.webmanifest and linked from <head> automatically —
 * Next's metadata file convention, same family as favicon/icon/apple-icon.
 * One manifest for the whole site, so it carries the default locale's copy. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_COPY[DEFAULT_LOCALE].title,
    short_name: SITE_NAME,
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
