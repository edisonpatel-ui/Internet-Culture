import {
  ExploreCategories,
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
import { getAllEntries } from "@/lib/services/entries";
import { createMetadata, createWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: undefined,
  description:
    "Internet Culture Hub — clear entries on memes, slang, trends, events, and creators.",
  path: "/",
  keywords: [
    "internet culture",
    "meme encyclopedia",
    "internet slang",
    "viral trends",
    "creators",
  ],
});

export default async function Home() {
  const allEntries = await getAllEntries();
  const trending = selectTrendingNow(allEntries, 6);

  // Prefer a curated featured article; fall back to today's trend pick.
  const featured = getFeaturedArticle() ?? getTodaysTrend();

  return (
    <main>
      <JsonLd data={createWebSiteJsonLd()} />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreCategories />

        <TrendingNowSection entries={trending} />

        {featured && (
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Featured"
              description="A high-value entry worth reading next."
            />
            <FeaturedEntryCard entry={featured} />
          </section>
        )}
      </div>
    </main>
  );
}
