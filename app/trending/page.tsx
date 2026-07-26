import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  selectRisingFast,
  selectTrendCategoryEntries,
} from "@/lib/discovery/momentum";
import { selectTrendingNow } from "@/lib/discovery/scoring";
import { TrendCard } from "@/components/cards/TrendCard";
import { TrendsCatalog } from "@/components/catalog/TrendsCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "What's trending across internet culture right now — Current Popularity rankings plus Trend-category movements.";

export const metadata = createMetadata({
  title: "Trending Now — Viral Internet Culture Moments",
  description: PAGE_DESCRIPTION,
  path: "/trending",
  keywords: ["trending", "viral trends", "internet trends", "what's trending"],
});

export default function TrendingPage() {
  const catalog = getAllEntriesSync();
  const trendingNow = selectTrendingNow(catalog, 12);
  const rising = selectRisingFast(catalog);
  const trendCategory = selectTrendCategoryEntries(catalog);
  const highPopularity = [...catalog]
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .slice(0, 4);

  const collectionLd = createCollectionPageJsonLd({
    name: "Trending Internet Culture",
    description: PAGE_DESCRIPTION,
    path: "/trending",
    entries: trendingNow.length > 0 ? trendingNow : trendCategory,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-zinc-300">
          Discovery
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Trending Now
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {catalog.length} encyclopedia entries · {trendingNow.length} live
          scores
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Sorted left-to-right by highest Current Popularity — the same signal
          as the homepage. Unknown values are excluded.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Catalog entries", value: catalog.length },
          { label: "Live trending", value: trendingNow.length },
          { label: "Trend articles", value: trendCategory.length },
        ].map((stat) => (
          <div key={stat.label} className="surface rounded-xl p-4 text-center">
            <p className="text-xl font-bold tabular-nums text-white">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <SectionHeader
          title="Highest Current Popularity"
          description="Confident live Current Popularity only — updated after Maintenance Apply."
        />
        {trendingNow.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingNow.map((entry) => (
              <TrendCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="surface rounded-xl px-5 py-8 text-center">
            <p className="text-sm text-zinc-400">
              No confident Current Popularity scores yet. Refresh a category in
              Admin → Maintenance, then Apply.
            </p>
          </div>
        )}
      </section>

      {rising.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Rising Fast"
            description="Entries marked rising by recent refresh momentum."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rising.slice(0, 6).map((entry) => (
              <div key={entry.id} className="relative">
                <span className="absolute right-3 top-3 z-10 rounded-md border border-[var(--accent-border)] bg-[var(--accent-muted)] px-2 py-0.5 text-xs font-semibold text-[var(--accent-secondary)]">
                  Rising
                </span>
                <TrendCard entry={entry} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <SectionHeader
          title="High Current Popularity"
          description="Entries with the highest Current Popularity scores in the catalog."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highPopularity.map((entry) => (
            <TrendCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <section id="trends">
        <SectionHeader
          title="Trends"
          description={`${trendCategory.length} Trend-category articles — aesthetics, movements, and cultural shifts (not a popularity feed).`}
        />
        <TrendsCatalog items={trendCategory} />
      </section>
    </main>
  );
}
