import type { MetadataRoute } from "next";
import { memes } from "@/lib/content/memes";
import { slangTerms } from "@/lib/content/slang";
import { events } from "@/lib/content/events";
import { trends } from "@/lib/content/trends";
import { creators } from "@/lib/content/creators";
import { BASE_URL } from "@/lib/seo";

function lastMod(entry: { addedAt: string; lastUpdated?: string }): Date {
  return new Date(entry.lastUpdated ?? entry.addedAt);
}

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
  { url: `${BASE_URL}/trending`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/memes`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/slang`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/brainrot`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/events`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/rankings`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/creators`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/search`, changeFrequency: "weekly", priority: 0.6 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
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
    url: `${BASE_URL}/creators/${c.slug}`,
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
