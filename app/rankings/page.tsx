import { createMetadata } from "@/lib/seo";
import {
  getBrainrotRankings,
  getCringeRankings,
  getPopularRankings,
  getViralRankings,
  getNewestRankings,
} from "@/lib/data/brainrot";
import { RankingSection } from "@/components/sections/RankingSection";
import { RANKING_SYSTEMS } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Rankings",
  description: "Every internet trend ranked across multiple systems — most popular, most viral, brainrot, cringe, fastest growing, and more.",
  path: "/rankings",
});

const rankingCards = RANKING_SYSTEMS.map(r => ({
  ...r,
  href: `#${r.id}`,
}));

export default function RankingsPage() {
  const brainrotRankings = getBrainrotRankings();
  const cringeRankings = getCringeRankings();
  const popularRankings = getPopularRankings();
  const viralRankings = getViralRankings();
  const newestRankings = getNewestRankings();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
          🏆 Ranking Systems
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Rankings
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Every trend, meme, and slang term ranked across ten different scoring systems. Find what&apos;s popular, viral, cringe-worthy, and more.
        </p>
      </div>

      {/* Ranking Navigation */}
      <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {rankingCards.map((r) => (
          <a
            key={r.id}
            href={r.href}
            className="glass-card flex flex-col items-center gap-2 p-4 text-center transition-all hover:border-white/15"
          >
            <span className="text-2xl">{r.icon}</span>
            <span className="text-xs font-semibold text-white">{r.label}</span>
          </a>
        ))}
      </div>

      {/* Rankings */}
      <div className="space-y-12">

        <div id="popular">
          <RankingSection
            title="Most Popular"
            description="Ranked by total views — the content everyone is reading."
            rankings={popularRankings}
            scoreLabel="Views"
            scoreIcon="👀"
            limit={10}
          />
        </div>

        <div id="viral">
          <RankingSection
            title="Most Viral"
            description="Fastest-spreading content — currently rising or newly emerged."
            rankings={viralRankings}
            scoreLabel="Viral Score"
            scoreIcon="📈"
            limit={10}
          />
        </div>

        <div id="brainrot">
          <RankingSection
            title="Most Brainrot"
            description="Ranked by pure brainrot score — the internet at its most unhinged."
            rankings={brainrotRankings}
            scoreLabel="Brainrot"
            scoreIcon="🧠"
            limit={10}
          />
        </div>

        <div id="cringe">
          <RankingSection
            title="Most Cringe"
            description="Content that makes you wince — ranked by cringe score."
            rankings={cringeRankings}
            scoreLabel="Cringe"
            scoreIcon="😬"
            limit={10}
          />
        </div>

        <div id="newest">
          <RankingSection
            title="Newest Additions"
            description="The most recently added entries to the encyclopedia."
            rankings={newestRankings}
            scoreLabel="Relevance"
            scoreIcon="✨"
            limit={10}
          />
        </div>

      </div>

      {/* Coming Soon Ranking Systems */}
      <div className="mt-14 glass-card border-dashed border-white/10 p-8">
        <h2 className="mb-2 text-xl font-bold text-white">More Rankings Coming Soon</h2>
        <p className="mb-6 text-sm text-zinc-400">
          These ranking systems require more data and real-time tracking — coming as the encyclopedia grows.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "⚡", label: "Most Influential", desc: "Content that shaped culture and language" },
            { icon: "💎", label: "Most Underrated", desc: "Hidden gems with high relevance but low views" },
            { icon: "💬", label: "Most Discussed", desc: "Community engagement and conversation metrics" },
            { icon: "🚀", label: "Fastest Growing", desc: "Trends accelerating the most right now" },
            { icon: "📉", label: "Fading Out", desc: "Trends losing momentum the fastest" },
            { icon: "🌍", label: "Global Reach", desc: "Trends with the widest cross-platform spread" },
          ].map((item) => (
            <div key={item.label} className="glass p-4 rounded-xl">
              <p className="mb-1 text-lg">{item.icon}</p>
              <p className="font-semibold text-white">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
