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
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import { formatViews, getDetailHref } from "@/lib/utils";
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
            <Link
              href={getDetailHref(todaysTrend.category, todaysTrend.slug)}
              className="group block"
            >
              <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className={`h-1.5 w-full bg-gradient-to-r ${todaysTrend.imageGradient}`} />
                <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-8">
                  <div className="min-w-0 flex-1">
                    <Badge category={todaysTrend.category} />
                    <h3 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-violet-200 sm:text-3xl">
                      {todaysTrend.title}
                    </h3>
                    <p className="mt-2 text-zinc-400">{todaysTrend.description}</p>
                    <p className="mt-3 text-xs text-zinc-500">
                      👀 {formatViews(todaysTrend.views)} views
                      &nbsp;·&nbsp;{todaysTrend.scores.relevance} relevance
                    </p>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 ring-1 ring-violet-500/30">
                    Trending Now
                  </span>
                </div>
              </div>
            </Link>
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
            <Link
              href={getDetailHref(featuredArticle.category, featuredArticle.slug)}
              className="group block"
            >
              <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className={`h-20 bg-gradient-to-r ${featuredArticle.imageGradient} opacity-80`} />
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Badge category={featuredArticle.category} />
                      <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-violet-200 sm:text-2xl">
                        {featuredArticle.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30">
                      ★ Featured
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                    {featuredArticle.description}
                  </p>
                  <p className="mt-4 text-sm text-violet-400 transition-colors group-hover:text-violet-300">
                    Read the full article →
                  </p>
                </div>
              </div>
            </Link>
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
            <Link
              href={getDetailHref(onThisDay.category, onThisDay.slug)}
              className="group block"
            >
              <div className="glass-card flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${onThisDay.imageGradient} text-2xl`}
                >
                  📅
                </div>
                <div className="min-w-0">
                  <Badge category={onThisDay.category} />
                  <h3 className="mt-1 font-semibold text-white transition-colors group-hover:text-violet-200">
                    {onThisDay.title}
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-zinc-400">
                    {onThisDay.description}
                  </p>
                </div>
              </div>
            </Link>
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
