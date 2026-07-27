import type { MetadataRoute } from "next";
import { memes } from "@/lib/content/memes";
import { slangTerms } from "@/lib/content/slang";
import { events } from "@/lib/content/events";
import { trends } from "@/lib/content/trends";
import { creators } from "@/lib/content/people";
import { BASE_URL } from "@/lib/seo";

function lastMod(entry: { addedAt: string; lastUpdated?: string }): Date {
  return new Date(entry.lastUpdated ?? entry.addedAt);
}

function staticRoute(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
): MetadataRoute.Sitemap[0] {
  return {
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  staticRoute("/", 1.0, "daily"),
  staticRoute("/trending", 0.9, "daily"),
  staticRoute("/memes", 0.9, "daily"),
  staticRoute("/slang", 0.9, "daily"),
  staticRoute("/brainrot", 0.85, "daily"),
  staticRoute("/events", 0.8, "daily"),
  staticRoute("/people", 0.8, "weekly"),
  staticRoute("/rankings", 0.75, "daily"),
  // /search is noindex — omit from sitemap
  staticRoute("/about", 0.5, "monthly"),
  staticRoute("/feedback", 0.5, "monthly"),
  staticRoute("/privacy", 0.3, "yearly"),
  staticRoute("/terms", 0.3, "yearly"),
  staticRoute("/contact", 0.3, "yearly"),
  staticRoute("/dmca", 0.3, "yearly"),
  staticRoute("/attribution", 0.3, "yearly"),
];

/**
 * Sitemap coverage:
 * - All category listing pages
 * - All meme / slang / event / creator detail pages
 * - Trend-only detail pages (excludes slugs that already have a category page
 *   to avoid advertising duplicate URLs)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const memeSlugs = new Set(memes.map((m) => m.slug));
  const slangSlugs = new Set(slangTerms.map((s) => s.slug));
  const eventSlugs = new Set(events.map((e) => e.slug));
  const creatorSlugs = new Set(creators.map((c) => c.slug));

  const memeRoutes: MetadataRoute.Sitemap = memes.map((m) => ({
    url: `${BASE_URL}/memes/${m.slug}`,
    lastModified: lastMod(m),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const slangRoutes: MetadataRoute.Sitemap = slangTerms.map((s) => ({
    url: `${BASE_URL}/slang/${s.slug}`,
    lastModified: lastMod(s),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE_URL}/events/${e.slug}`,
    lastModified: lastMod(e),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const creatorRoutes: MetadataRoute.Sitemap = creators.map((c) => ({
    url: `${BASE_URL}/people/${c.slug}`,
    lastModified: lastMod(c),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Only index /trending/[slug] when there is no stronger canonical category URL
  const trendOnlyRoutes: MetadataRoute.Sitemap = trends
    .filter(
      (t) =>
        !memeSlugs.has(t.slug) &&
        !slangSlugs.has(t.slug) &&
        !eventSlugs.has(t.slug) &&
        !creatorSlugs.has(t.slug),
    )
    .map((t) => ({
      url: `${BASE_URL}/trending/${t.slug}`,
      lastModified: lastMod(t),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));

  return [
    ...STATIC_ROUTES,
    ...memeRoutes,
    ...slangRoutes,
    ...eventRoutes,
    ...creatorRoutes,
    ...trendOnlyRoutes,
  ];
}
