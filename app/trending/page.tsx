import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  selectRisingFast,
  selectTrendCategoryEntries,
} from "@/lib/discovery/momentum";
import { TrendCard } from "@/components/cards/TrendCard";
import { TrendsCatalog } from "@/components/catalog/TrendsCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "What's rising across internet culture right now — plus Trend-category movements and aesthetics.";

export const metadata = createMetadata({
  title: "Trending Now — Viral Internet Culture Moments",
  description: PAGE_DESCRIPTION,
  path: "/trending",
  keywords: ["trending", "viral trends", "internet trends", "what's trending"],
});

export default function TrendingPage() {
  const catalog = getAllEntriesSync();
  const rising = selectRisingFast(catalog);
  const trendCategory = selectTrendCategoryEntries(catalog);
  const highRelevance = [...catalog]
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .slice(0, 4);

  const collectionLd = createCollectionPageJsonLd({
    name: "Trending Internet Culture",
    description: PAGE_DESCRIPTION,
    path: "/trending",
    entries: rising.length > 0 ? rising : trendCategory,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
          Discovery
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What&rsquo;s Rising
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {catalog.length} encyclopedia entries · {rising.length} rising
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Momentum across memes, slang, creators, events, and trends — separate
          from the Trend category showcase below.
        </p>
      </div>

      {/* Catalog counts only — no fabricated engagement metrics */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Catalog entries", value: catalog.length },
          { label: "Rising now", value: rising.length },
          { label: "Trend articles", value: trendCategory.length },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Rising Fast — catalog-wide momentum */}
      {rising.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Rising Fast"
            description="Memes, slang, creators, events, and trends currently gaining momentum — not limited to the Trend category."
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

      {/* Highest editorial relevance — not traffic analytics */}
      <section className="mb-12">
        <SectionHeader
          title="High relevance"
          description="Entries with the highest editorial relevance scores in the catalog."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highRelevance.map((entry) => (
            <TrendCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* Trend category showcase */}
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
