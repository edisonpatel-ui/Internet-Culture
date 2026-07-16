import type { MetadataRoute } from "next";
import { memes } from "@/lib/data/memes";
import { slangTerms } from "@/lib/data/slang";
import { events } from "@/lib/data/events";
import { trends } from "@/lib/data/trends";
import { creators } from "@/lib/data/creators";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://internetculturehub.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
  { url: `${BASE_URL}/trending`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/memes`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/slang`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/brainrot`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/events`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/rankings`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/creators`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/search`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const memeSlugs = new Set(memes.map((m) => m.slug));
  const slangSlugs = new Set(slangTerms.map((s) => s.slug));
  const eventSlugs = new Set(events.map((e) => e.slug));

  const memeRoutes: MetadataRoute.Sitemap = memes.map((m) => ({
    url: `${BASE_URL}/memes/${m.slug}`,
    lastModified: new Date(m.addedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const slangRoutes: MetadataRoute.Sitemap = slangTerms.map((s) => ({
    url: `${BASE_URL}/slang/${s.slug}`,
    lastModified: new Date(s.addedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE_URL}/events/${e.slug}`,
    lastModified: new Date(e.addedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Trends that don't already have a more specific detail page
  const trendOnlyRoutes: MetadataRoute.Sitemap = trends
    .filter(
      (t) =>
        !memeSlugs.has(t.slug) &&
        !slangSlugs.has(t.slug) &&
        !eventSlugs.has(t.slug)
    )
    .map((t) => ({
      url: `${BASE_URL}/trending/${t.slug}`,
      lastModified: new Date(t.addedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const creatorRoutes: MetadataRoute.Sitemap = creators.map((c) => ({
    url: `${BASE_URL}/creators/${c.slug}`,
    lastModified: new Date(c.addedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
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
