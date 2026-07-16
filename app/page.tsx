import Link from "next/link";
import {
  getTrendingToday,
  getPopularMemes,
  getInternetSlang,
  getRecentlyAdded,
  getMostViewed,
} from "@/lib/data/trends";
import { getBrainrotRankings } from "@/lib/data/brainrot";
import { getRecentEvents } from "@/lib/data/events";
import { Hero } from "@/components/sections/Hero";
import { TrendGridSection } from "@/components/sections/TrendGridSection";
import { RankingSection } from "@/components/sections/RankingSection";
import { SearchInterface } from "@/components/sections/SearchInterface";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import { formatViews } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({});

export default function Home() {
  const trending = getTrendingToday().slice(0, 6);
  const recentlyAdded = getRecentlyAdded().slice(0, 4);
  const mostViewed = getMostViewed().slice(0, 4);
  const popularMemes = getPopularMemes().slice(0, 4);
  const popularSlang = getInternetSlang().slice(0, 4);
  const brainrotRankings = getBrainrotRankings().slice(0, 5);
  const events = getRecentEvents().slice(0, 3);

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">

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

        {/* Popular Memes */}
        <TrendGridSection
          title="Popular Memes"
          description="Memes everyone is talking about."
          entries={popularMemes}
          href="/memes"
          linkLabel="All memes"
        />

        {/* Popular Slang */}
        <TrendGridSection
          title="Internet Slang"
          description="Words and phrases shaping online conversation."
          entries={popularSlang}
          href="/slang"
          linkLabel="All slang"
        />

        {/* Brainrot Rankings */}
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

        {/* Events Section */}
        <section className="py-10 sm:py-14">
          <SectionHeader
            title="Current Events"
            description="Cultural moments shaping the internet right now."
            href="/events"
            linkLabel="All events"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group glass-card flex flex-col gap-4 overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
              >
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${event.imageGradient}`} />
                <div>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white transition-colors group-hover:text-violet-200">
                      {event.title}
                    </h3>
                    <Badge category="event" />
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2">{event.description}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>👀 {formatViews(event.views)}</span>
                  {event.platform && <span>· {event.platform}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Most Viewed */}
        <TrendGridSection
          title="Most Viewed"
          description="The all-time most visited entries."
          entries={mostViewed}
          href="/rankings"
          linkLabel="Full rankings"
        />

        {/* Search */}
        <section className="py-10 sm:py-14">
          <SectionHeader
            title="Search the Encyclopedia"
            description="Find any meme, slang term, or trend."
            href="/search"
            linkLabel="Advanced search"
          />
          <SearchInterface compact />
        </section>

      </div>
    </main>
  );
}
