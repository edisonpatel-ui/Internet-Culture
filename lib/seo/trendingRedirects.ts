/**
 * Permanent redirects for /trending/[slug] when a stronger category URL exists.
 * Uses relative imports so next.config.ts can load this module without @/ aliases.
 */

import { trends } from "../content/trends";
import { getDetailHref } from "../utils";

export interface TrendingDuplicateRedirect {
  source: string;
  destination: string;
  permanent: true;
}

/** Re-exported catalog entries that must not keep a thin /trending URL. */
export function getTrendingDuplicateRedirects(): TrendingDuplicateRedirect[] {
  return trends
    .filter((entry) => entry.category !== "trend")
    .map((entry) => ({
      source: `/trending/${entry.slug}`,
      destination: getDetailHref(entry.category, entry.slug),
      permanent: true as const,
    }));
}

/** True when /trending/[slug] should 308 to a category-native URL. */
export function isTrendingDuplicateSlug(slug: string): boolean {
  const entry = trends.find((t) => t.slug === slug);
  return Boolean(entry && entry.category !== "trend");
}
