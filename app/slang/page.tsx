import Link from "next/link";
import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllSlang } from "@/lib/content/slang";
import { SlangCard } from "@/components/cards/SlangCard";
import { SlangCatalog } from "@/components/catalog/SlangCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "Internet Slang Dictionary — Gen Alpha, streamer, and classic web slang with clear definitions, origins, and real usage examples.";

export const metadata = createMetadata({
  title: "Internet Slang Dictionary — What Gen Z & Gen Alpha Words Mean",
  description: PAGE_DESCRIPTION,
  path: "/slang",
  keywords: [
    "internet slang dictionary",
    "what does slang mean",
    "gen z slang",
    "gen alpha slang",
    "streamer slang",
  ],
});

const GEN_ALPHA_SLUGS = new Set([
  "brainrot",
  "rizz",
  "gyatt",
  "sigma",
  "aura",
  "fanum-tax",
  "glazing",
  "npc",
  "mogging",
  "mewing",
  "looksmaxxing",
]);

const STREAMER_SLUGS = new Set([
  "rizz",
  "gyatt",
  "fanum-tax",
  "glazing",
  "crash-out",
  "locked-in",
  "no-cap",
  "deadass",
  "bet",
]);

export default function SlangPage() {
  const sorted = [...getAllSlang()].sort((a, b) => b.scores.relevance - a.scores.relevance);
  const rising = sorted.filter(s => s.trendDirection === "rising" || s.trendDirection === "new");
  const stable = sorted.filter(s => s.trendDirection === "stable");
  const declining = sorted.filter(s => s.trendDirection === "declining");
  const genAlpha = sorted.filter(
    (s) =>
      GEN_ALPHA_SLUGS.has(s.slug) ||
      s.tags?.some((t) => /gen alpha|brainrot/i.test(t)),
  );
  const streamer = sorted.filter(
    (s) =>
      STREAMER_SLUGS.has(s.slug) ||
      s.tags?.some((t) => /streamer|twitch|amp/i.test(t)),
  );
  const classic = sorted.filter(
    (s) =>
      s.tags?.some((t) => /classic|legacy|old internet/i.test(t)) ||
      (s.trendDirection === "declining" && !GEN_ALPHA_SLUGS.has(s.slug)),
  );
  const collectionLd = createCollectionPageJsonLd({
    name: "Internet Slang Dictionary",
    description: PAGE_DESCRIPTION,
    path: "/slang",
    entries: sorted,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300">
          Internet Slang Dictionary
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet Slang Dictionary
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {sorted.length} terms documented
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          What does it mean? Clear definitions for Gen Alpha slang, streamer vocabulary,
          and older internet speech — with origins and real usage.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <Link href="/brainrot" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20">
            Gen Alpha / Brainrot
          </Link>
          <Link href="/creators" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20">
            Streamer culture
          </Link>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Terms documented", value: sorted.length },
          { label: "Currently rising", value: rising.length },
          { label: "Stable / mainstream", value: stable.length },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {genAlpha.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Gen Alpha Slang"
            description="Brainrot-era vocabulary — also mapped on the Brainrot hub."
            href="/brainrot"
            linkLabel="Brainrot hub"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {genAlpha.slice(0, 9).map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {streamer.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Streamer Slang"
            description="Words that jumped from Twitch chat and Discord into wider speech."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {streamer.slice(0, 9).map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {rising.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Popular & Rising"
            description="Terms gaining momentum right now."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rising.map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {classic.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Older Internet Slang"
            description="Pre–Gen Alpha terms that still shape how people talk online."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classic.slice(0, 9).map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {stable.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Mainstream Terms"
            description="Slang that has crossed into everyday use."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stable.slice(0, 12).map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {declining.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Fading Out"
            description="Terms losing mainstream traction."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {declining.slice(0, 9).map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {/* All Slang A-Z */}
      <section>
        <SectionHeader
          title="Full Dictionary"
          description={`All ${sorted.length} documented slang terms.`}
        />
        <SlangCatalog items={sorted} />
      </section>

    </main>
  );
}
