import {
  ExploreCategories,
  MostPopularSection,
  RecentlyAddedSection,
  TrendingNowSection,
} from "@/components/homepage";
import { FeaturedEntryCard } from "@/components/cards/FeaturedEntryCard";
import { CompactEntryRow } from "@/components/cards/CompactEntryRow";
import { Hero } from "@/components/sections/Hero";
import { RankingSection } from "@/components/sections/RankingSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBrainrotRankings } from "@/lib/data/brainrot";
import {
  getTodaysTrend,
  getFeaturedArticle,
  getOnThisDay,
} from "@/lib/data/featured";
import {
  selectMostPopular,
  selectRecentlyAdded,
  selectTrendingNow,
} from "@/lib/discovery/scoring";
import { getAllEntries } from "@/lib/services/entries";
import { createMetadata, createWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: undefined,
  description:
    "Internet Culture Hub — the encyclopedia of everything viral. Explore memes, slang, trends, events, and creators.",
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
  const recentlyAdded = selectRecentlyAdded(allEntries, 6);
  const mostPopular = selectMostPopular(allEntries, 6);
  const brainrotRankings = getBrainrotRankings().slice(0, 5);

  const todaysTrend = getTodaysTrend();
  const featuredArticle = getFeaturedArticle();
  const onThisDay = getOnThisDay();

  return (
    <main>
      <JsonLd data={createWebSiteJsonLd()} />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <TrendingNowSection entries={trending} />

        <ExploreCategories />

        {/* Today's Trend — editorial highlight */}
        {todaysTrend && (
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Today&rsquo;s Trend"
              description="The most relevant internet culture moment right now."
            />
            <FeaturedEntryCard
              entry={todaysTrend}
              badgeLabel="Trending Now"
              badgeClassName="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 ring-1 ring-violet-500/30"
            />
          </section>
        )}

        <RecentlyAddedSection entries={recentlyAdded} />

        <MostPopularSection entries={mostPopular} />

        {/* Featured Article
            TODO (editorial): Replace day-of-year rotation with a manually curated
            Editor's Pick list managed via a CMS or config file. See lib/data/featured.ts. */}
        {featuredArticle && (
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Featured Article"
              description="A notable entry from the internet culture encyclopedia."
            />
            <FeaturedEntryCard entry={featuredArticle} />
          </section>
        )}

        <RankingSection
          title="Brainrot Rankings"
          description="Ranked by peak absurdity and internet rot."
          rankings={brainrotRankings}
          href="/rankings"
          scoreLabel="Brainrot"
          scoreIcon="🧠"
        />

        {/* On This Day
            TODO (architecture): Prefer historicalDate; addedAt is a temporary fallback.
            See lib/data/featured.ts. */}
        {onThisDay && (
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="On This Day"
              description="A piece of internet history from today's date."
            />
            <CompactEntryRow entry={onThisDay} leadingEmoji="📅" />
          </section>
        )}
      </div>
    </main>
  );
}
