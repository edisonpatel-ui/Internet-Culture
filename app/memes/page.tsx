import { createMetadata } from "@/lib/seo";
import { memes } from "@/lib/data/memes";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatViews } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Memes",
  description: "Browse every meme in the encyclopedia. Origins, meanings, timelines, and cultural impact of the internet's best memes.",
  path: "/memes",
});

export default function MemesPage() {
  const sorted = [...memes].sort((a, b) => b.scores.relevance - a.scores.relevance);
  const topMemes = sorted.slice(0, 3);
  const allMemes = sorted;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
          😂 Meme Encyclopedia
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Meme Database
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Every meme dissected, explained, and documented. Origins, timelines, usage patterns, and cultural significance.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{memes.length}</p>
          <p className="text-xs text-zinc-400">Memes Documented</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{formatViews(memes.reduce((acc, m) => acc + m.views, 0))}</p>
          <p className="text-xs text-zinc-400">Total Views</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{memes.filter(m => m.trendDirection === "rising" || m.trendDirection === "new").length}</p>
          <p className="text-xs text-zinc-400">Currently Trending</p>
        </div>
      </div>

      {/* Top Right Now */}
      <section className="mb-12">
        <SectionHeader
          title="Top Memes Right Now"
          description="Highest relevance scores across all meme entries."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {topMemes.map((meme, i) => (
            <div key={meme.id} className="relative">
              <span className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs font-bold text-white backdrop-blur-sm">
                #{i + 1}
              </span>
              <TrendCard entry={meme} />
            </div>
          ))}
        </div>
      </section>

      {/* All Memes */}
      <section>
        <SectionHeader
          title="All Memes"
          description={`${allMemes.length} memes documented and explained.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allMemes.map((meme) => (
            <TrendCard key={meme.id} entry={meme} />
          ))}
        </div>
      </section>

    </main>
  );
}
