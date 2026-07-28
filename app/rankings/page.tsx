import {
  createMetadata,
  createCollectionPageJsonLd,
} from "@/lib/seo";
import {
  getBrainrotRankings,
  getCringeRankings,
  getInfluenceRankings,
  getPopularRankings,
  getViralRankings,
  getNewestRankings,
} from "@/lib/data/brainrot";
import { sortByCurrentPopularity } from "@/lib/discovery/scoring";
import { getAllEntriesSync } from "@/lib/services/entries";
import { RankingSection } from "@/components/sections/RankingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RANKING_SYSTEMS } from "@/lib/constants";

const PAGE_DESCRIPTION =
  "Internet culture ranked by Current Popularity, influence, rising momentum, brainrot, cringe, and newest additions. Scores are editorial estimates, not traffic.";

export const metadata = createMetadata({
  title: "Internet Culture Rankings — Current Popularity, Brainrot & Cringe",
  description: PAGE_DESCRIPTION,
  path: "/rankings",
  keywords: ["internet rankings", "brainrot ranking", "internet culture"],
});

const rankingCards = RANKING_SYSTEMS.map((r) => ({
  ...r,
  href: `#${r.id}`,
}));

export default function RankingsPage() {
  const brainrotRankings = getBrainrotRankings();
  const cringeRankings = getCringeRankings();
  const influenceRankings = getInfluenceRankings();
  const popularRankings = getPopularRankings();
  const viralRankings = getViralRankings();
  const newestRankings = getNewestRankings();
  const topForSchema = sortByCurrentPopularity(getAllEntriesSync()).slice(0, 24);
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-zinc-300">
          Editorial scores
        </div>
        <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Rankings
        </h1>
        <p className="font-page mt-4 max-w-2xl text-lg text-zinc-400">
          Encyclopedia entries ordered by editorial scores — Current Popularity,
          influence, rising momentum, brainrot, cringe, and newest additions.
          Scores are editorial estimates, not traffic analytics.
        </p>
      </div>

      {/* Ranking Navigation */}
      <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {rankingCards.map((r) => (
          <a
            key={r.id}
            href={r.href}
            className="glass-card flex flex-col items-center gap-2 p-4 text-center transition-all hover:border-white/14 hover:bg-[var(--surface-elevated)]"
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
            title="Highest Current Popularity"
            description="Ranked by how actively people are posting about these topics now."
            rankings={popularRankings}
            scoreLabel="Current Popularity"
            limit={10}
          />
        </div>

        <div id="influence">
          <RankingSection
            title="Most Influential"
            description="Long-term cultural impact — influence is not reduced by age on refresh."
            rankings={influenceRankings}
            scoreLabel="Influence"
            limit={10}
          />
        </div>

        <div id="viral">
          <RankingSection
            title="Rising Now"
            description="Entries marked rising or new, ordered by Current Popularity."
            rankings={viralRankings}
            scoreLabel="Current Popularity"
            limit={10}
          />
        </div>

        <div id="brainrot">
          <RankingSection
            title="Most Brainrot"
            description="Ranked by editorial brainrot score."
            rankings={brainrotRankings}
            scoreLabel="Brainrot"
            limit={10}
          />
        </div>

        <div id="cringe">
          <RankingSection
            title="Most Cringe"
            description="Ranked by editorial cringe score."
            rankings={cringeRankings}
            scoreLabel="Cringe"
            limit={10}
          />
        </div>

        <div id="newest">
          <RankingSection
            title="Newest Additions"
            description="Newest pages in the catalog — lower days ago means fresher."
            rankings={newestRankings}
            scoreLabel="Days ago"
            limit={10}
          />
        </div>

      </div>

    </main>
  );
}
