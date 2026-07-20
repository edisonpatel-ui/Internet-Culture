import {
  createMetadata,
  createCollectionPageJsonLd,
} from "@/lib/seo";
import {
  getBrainrotRankings,
  getCringeRankings,
  getPopularRankings,
  getViralRankings,
  getNewestRankings,
} from "@/lib/data/brainrot";
import { getAllEntriesSync } from "@/lib/services/entries";
import { RankingSection } from "@/components/sections/RankingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RANKING_SYSTEMS } from "@/lib/constants";

const PAGE_DESCRIPTION =
  "Internet culture ranked five ways — most popular, rising now, brainrot, cringe, and newest additions.";

export const metadata = createMetadata({
  title: "Internet Culture Rankings — Brainrot, Viral & Popular Scores",
  description: PAGE_DESCRIPTION,
  path: "/rankings",
  keywords: ["internet rankings", "brainrot ranking", "viral memes", "internet culture"],
});

const rankingCards = RANKING_SYSTEMS.map((r) => ({
  ...r,
  href: `#${r.id}`,
}));

export default function RankingsPage() {
  const brainrotRankings = getBrainrotRankings();
  const cringeRankings = getCringeRankings();
  const popularRankings = getPopularRankings();
  const viralRankings = getViralRankings();
  const newestRankings = getNewestRankings();
  const topForSchema = getAllEntriesSync()
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 24);
  const collectionLd = createCollectionPageJsonLd({
    name: "Internet Culture Rankings",
    description: PAGE_DESCRIPTION,
    path: "/rankings",
    entries: topForSchema,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
          Ranking Systems
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Rankings
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Every trend, meme, and slang term ranked across five scoring systems
          — popular, rising, brainrot, cringe, and newest.
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
            title="Rising Now"
            description="Entries marked rising or new, ranked by catalog views."
            rankings={viralRankings}
            scoreLabel="Views"
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
            description="Newest pages in the catalog — lower days ago means fresher."
            rankings={newestRankings}
            scoreLabel="Days ago"
            scoreIcon="✨"
            limit={10}
          />
        </div>

      </div>

    </main>
  );
}
