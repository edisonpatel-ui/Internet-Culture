import { createMetadata } from "@/lib/seo";
import {
  trends,
  getTrendingToday,
  getRisingFastest,
  getNewTrends,
  getDecliningTrends,
  getMostViewed,
} from "@/lib/data/trends";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTrendDirectionColor, getTrendDirectionIcon } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Trending",
  description: "The biggest internet moments right now — memes, slang, viral trends, and cultural events updated in real time.",
  path: "/trending",
});

export default function TrendingPage() {
  const topTrending = getTrendingToday();
  const rising = getRisingFastest();
  const newTrends = getNewTrends();
  const mostViewed = getMostViewed().slice(0, 4);
  const declining = getDecliningTrends();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live Updates
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Trending Now
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          The internet moves fast. Here&apos;s everything worth knowing right now — memes, slang, viral moments, and cultural shifts.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Entries", value: trends.length, icon: "📚" },
          { label: "Rising Now", value: rising.length, icon: "📈" },
          { label: "New This Week", value: newTrends.length, icon: "✨" },
          { label: "Declining", value: declining.length, icon: "📉" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-2xl">{stat.icon}</p>
            <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Rising Fast */}
      {rising.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Rising Fast"
            description="Trends accelerating across the internet right now."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rising.slice(0, 6).map((entry) => (
              <div key={entry.id} className="relative">
                <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                  ↑ Rising
                </span>
                <TrendCard entry={entry} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* New Trends */}
      {newTrends.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Brand New"
            description="Just added to the encyclopedia."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newTrends.map((entry) => (
              <div key={entry.id} className="relative">
                <span className="absolute right-3 top-3 z-10 rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-400 backdrop-blur-sm">
                  ★ New
                </span>
                <TrendCard entry={entry} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Most Viewed */}
      <section className="mb-12">
        <SectionHeader
          title="Most Viewed"
          description="The entries everyone is reading."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mostViewed.map((entry) => (
            <TrendCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* All Entries */}
      <section>
        <SectionHeader
          title="All Trends"
          description={`${trends.length} entries sorted by relevance.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topTrending.map((entry) => (
            <div key={entry.id} className="relative">
              <span className={`absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2 py-0.5 text-xs font-semibold ${getTrendDirectionColor(entry.trendDirection)} backdrop-blur-sm`}>
                {getTrendDirectionIcon(entry.trendDirection)} {entry.trendDirection}
              </span>
              <TrendCard entry={entry} />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
