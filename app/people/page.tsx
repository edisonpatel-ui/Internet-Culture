import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllCreators } from "@/lib/content/creators";
import { CreatorsCatalog } from "@/components/catalog/CreatorsCatalog";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "Internet People Encyclopedia — streamers, YouTubers, TikTok personalities, and collectives connected to the memes and slang they shaped.";

export const metadata = createMetadata({
  title: "Internet People Encyclopedia — Streamers, YouTubers & TikTok",
  description: PAGE_DESCRIPTION,
  path: "/people",
  keywords: [
    "internet people encyclopedia",
    "internet creators",
    "who is streamer",
    "youtubers",
    "tiktok creators",
    "people behind memes",
    "AMP",
  ],
});

export default function PeoplePage() {
  const sorted = [...getAllCreators()].sort(
    (a, b) => b.scores.relevance - a.scores.relevance,
  );

  const rising = sorted.filter((c) => c.trendDirection === "rising");
  const streamers = sorted.filter(
    (c) =>
      c.platforms?.some((p) => /twitch/i.test(p.platform)) ||
      c.tags?.some((t) => /streamer|twitch|amp/i.test(t)),
  );
  const youtubers = sorted.filter(
    (c) =>
      c.platforms?.some((p) => /youtube/i.test(p.platform)) ||
      c.tags?.some((t) => /youtube|youtuber/i.test(t)),
  );
  const tiktokers = sorted.filter(
    (c) =>
      c.platforms?.some((p) => /tiktok/i.test(p.platform)) ||
      c.tags?.some((t) => /tiktok/i.test(t)),
  );
  const groups = sorted.filter(
    (c) =>
      c.slug === "amp" ||
      c.tags?.some((t) => /collective|group|crew/i.test(t)),
  );
  const collectionLd = createCollectionPageJsonLd({
    name: "Internet People Encyclopedia",
    description: PAGE_DESCRIPTION,
    path: "/people",
    entries: sorted,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300">
          People Encyclopedia
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet People Encyclopedia
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {sorted.length} people
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Streamers, YouTubers, TikTok personalities, and groups — connected to
          the slang, memes, and events they popularized.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "People documented", value: sorted.length },
          { label: "Currently rising", value: rising.length },
          { label: "Streamer profiles", value: streamers.length },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {streamers.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Streamers"
            description="Live personalities who push slang and formats into the mainstream."
            href="/brainrot"
            linkLabel="Brainrot hub"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streamers.slice(0, 6).map((c) => (
              <TrendCard key={c.id} entry={c} />
            ))}
          </div>
        </section>
      )}

      {youtubers.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="YouTubers"
            description="Long-form and short-form creators who shaped meme eras."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {youtubers.slice(0, 6).map((c) => (
              <TrendCard key={c.id} entry={c} />
            ))}
          </div>
        </section>
      )}

      {tiktokers.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="TikTok Personalities"
            description="Short-form personalities tied to viral formats and sounds."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiktokers.slice(0, 6).map((c) => (
              <TrendCard key={c.id} entry={c} />
            ))}
          </div>
        </section>
      )}

      {groups.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Groups & Collectives"
            description="Collectives and crews with shared cultural footprint."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((c) => (
              <TrendCard key={c.id} entry={c} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader
          title="Full Encyclopedia"
          description={`${sorted.length} people documented and growing.`}
        />
        <CreatorsCatalog items={sorted} />
      </section>
    </main>
  );
}
