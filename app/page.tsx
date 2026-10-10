import {
  ExploreCategories,
  FeaturedArticle,
  TrendingNowSection,
} from "@/components/homepage";
import { FeaturedEntryCard } from "@/components/cards/FeaturedEntryCard";
import { Hero } from "@/components/sections/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getTodaysTrend,
  getFeaturedArticle,
} from "@/lib/data/featured";
import { selectTrendingNow } from "@/lib/discovery/scoring";
import { getDailyFeaturedArticle } from "@/lib/content/getDailyFeaturedArticle";
import { getAllEntries } from "@/lib/services/entries";
import { createMetadata, createWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: undefined,
  description:
    "Internet Culture Hub — meanings, origins, and context for memes, slang, trends, events, and people.",
  path: "/",
  keywords: [
    "internet culture",
    "meme encyclopedia",
    "internet slang",
    "viral trends",
    "people",
    "creators",
  ],
});

/**
 * Re-render at most hourly so the daily featured article rolls over shortly
 * after midnight UTC. The pick itself is locked per UTC date inside
 * getDailyFeaturedArticle, so this does not re-run the selection each hour.
 */
export const revalidate = 3600;

export default async function Home() {
  const allEntries = await getAllEntries();
  const trending = selectTrendingNow(allEntries, 6);

  // Automatic daily pick; if it is ever unavailable, fall back to the
  // previous curated rotation / today's trend so the section never vanishes.
  const dailyFeatured = await getDailyFeaturedArticle();
  const fallbackFeatured = dailyFeatured
    ? null
    : (getFeaturedArticle() ?? getTodaysTrend());

  return (
    <main>
      <JsonLd data={createWebSiteJsonLd()} />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreCategories />

        <TrendingNowSection entries={trending} />

        {dailyFeatured ? (
          <FeaturedArticle featured={dailyFeatured} />
        ) : (
          fallbackFeatured && (
            <section className="py-10 sm:py-14">
              <SectionHeader
                title="Featured"
                description="An article to read today."
              />
              <FeaturedEntryCard entry={fallbackFeatured} />
            </section>
          )
        )}
      </div>
    </main>
  );
}
