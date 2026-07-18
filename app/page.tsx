import Link from "next/link";
import {
  getTrendingToday,
  getRecentlyAdded,
  getMostViewed,
} from "@/lib/content/trends";
import { getBrainrotRankings } from "@/lib/data/brainrot";
import { getTodaysTrend, getFeaturedArticle, getOnThisDay } from "@/lib/data/featured";
import { Hero } from "@/components/sections/Hero";
import { TrendGridSection } from "@/components/sections/TrendGridSection";
import { RankingSection } from "@/components/sections/RankingSection";
import { FeaturedEntryCard } from "@/components/cards/FeaturedEntryCard";
import { CompactEntryRow } from "@/components/cards/CompactEntryRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CATEGORIES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({});

export default function Home() {
  const trending = getTrendingToday().slice(0, 6);
  const recentlyAdded = getRecentlyAdded().slice(0, 4);
  const mostViewed = getMostViewed().slice(0, 4);
  const brainrotRankings = getBrainrotRankings().slice(0, 5);

  const todaysTrend = getTodaysTrend();
  const featuredArticle = getFeaturedArticle();
  const onThisDay = getOnThisDay();

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">

        {/* Today's Trend */}
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

        {/* Trending Now */}
        <TrendGridSection
          title="Trending Now"
          description="The biggest internet moments right now."
          entries={trending}
          href="/trending"
          linkLabel="See all trending"
        />

        {/* Categories */}
        <section className="py-10 sm:py-14">
          <SectionHeader
            title="Browse by Category"
            description="Explore the full encyclopedia."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group glass-card flex flex-col items-center gap-2 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-2xl`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-white group-hover:text-violet-200">
                  {cat.label}
                </span>
                <span className="hidden text-xs text-zinc-500 sm:block line-clamp-2">
                  {cat.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

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

        {/* Rankings */}
        <RankingSection
          title="Brainrot Rankings"
          description="Ranked by peak absurdity and internet rot."
          rankings={brainrotRankings}
          href="/rankings"
          scoreLabel="Brainrot"
          scoreIcon="🧠"
        />

        {/* Recently Added */}
        <TrendGridSection
          title="Recently Added"
          description="Fresh entries in the encyclopedia."
          entries={recentlyAdded}
          href="/trending"
          linkLabel="Browse all"
        />

        {/* On This Day
            TODO (architecture): Current implementation matches entries by addedAt date (database
            addition date). Future implementation should use a dedicated historical events table
            with real dates — e.g. the day a meme first appeared, the date an event occurred.
            Replace getOnThisDay() in lib/data/featured.ts with a query against that table. */}
        {onThisDay && (
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="On This Day"
              description="A piece of internet history from today's date."
            />
            <CompactEntryRow entry={onThisDay} leadingEmoji="📅" />
          </section>
        )}

        {/* Most Viewed */}
        <TrendGridSection
          title="Most Viewed"
          description="The all-time most visited entries."
          entries={mostViewed}
          href="/rankings"
          linkLabel="Full rankings"
        />

      </div>
    </main>
  );
}
