import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * Static pages that make up Valentine's portfolio.
 */
const STATIC_PATHS = ["", "/work", "/experience", "/stories"];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));
}
