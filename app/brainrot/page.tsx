import Link from "next/link";
import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getBrainrotRankings, getHighBrainrotEntries } from "@/lib/data/brainrot";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  BRAINROT_CLUSTERS,
  BRAINROT_HUB_OVERVIEW,
} from "@/lib/content/clusters/brainrotHub";
import { RankingSection } from "@/components/sections/RankingSection";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry } from "@/types";

const PAGE_DESCRIPTION =
  "Gen Alpha internet culture hub — brainrot memes, slang, people, and the short-form era that made chaos mainstream.";

export const metadata = createMetadata({
  title: "Brainrot Hub — Gen Alpha Memes, Slang & Internet Chaos Explained",
  description: PAGE_DESCRIPTION,
  path: "/brainrot",
  keywords: [
    "brainrot",
    "gen alpha",
    "skibidi toilet",
    "ohio final boss",
    "internet slang",
    "gen alpha memes",
  ],
});

function resolveCluster(
  slugs: readonly string[],
  bySlug: Map<string, BaseEntry>,
): BaseEntry[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((e): e is BaseEntry => Boolean(e));
}

export default function BrainrotPage() {
  const catalog = getAllEntriesSync();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const rankings = getBrainrotRankings();
  const topEntries = getHighBrainrotEntries().slice(0, 6);
  const topThree = rankings.slice(0, 3);

  const hubEntries = BRAINROT_CLUSTERS.flatMap((c) =>
    resolveCluster(c.slugs, bySlug),
  );
  const uniqueHub = [
    ...new Map(hubEntries.map((e) => [e.slug, e])).values(),
  ];

  const collectionLd = createCollectionPageJsonLd({
    name: "Brainrot — Gen Alpha Internet Culture Hub",
    description: PAGE_DESCRIPTION,
    path: "/brainrot",
    entries: uniqueHub.length > 0 ? uniqueHub : topEntries,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300">
          Gen Alpha Culture Hub
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Brainrot Hub
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          {BRAINROT_HUB_OVERVIEW}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/slang"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20"
          >
            Slang dictionary
          </Link>
          <Link
            href="/memes"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20"
          >
            Meme archive
          </Link>
          <Link
            href="/people"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20"
          >
            People
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20"
          >
            Internet history
          </Link>
        </div>
      </div>

      <div className="mb-10 glass-card p-6">
        <h2 className="mb-2 text-lg font-semibold text-white">What is Brainrot?</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Brainrot describes absurdist, highly repetitive internet content — and the feeling of
          overconsuming it. On this hub we map the memes (Skibidi, Ohio), the slang (rizz, gyatt,
          sigma), and the people (Kai Cenat, AMP, DaFuq!?Boom!) that define Gen Alpha culture.
        </p>
      </div>

      {BRAINROT_CLUSTERS.map((cluster) => {
        const entries = resolveCluster(cluster.slugs, bySlug);
        if (entries.length === 0) return null;
        return (
          <section key={cluster.title} className="mb-12">
            <SectionHeader
              title={cluster.title}
              description={cluster.description}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={getDetailHref(entry.category, entry.slug)}
                  className="glass-card block p-4 transition hover:border-white/15"
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    {entry.category}
                  </p>
                  <h3 className="mt-1 font-semibold text-white">{entry.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {entry.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-12">
        <SectionHeader
          title="Brainrot Podium"
          description="Highest brainrot scores in the encyclopedia."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {topThree.map((item, i) => {
            const medalColors = [
              "from-amber-400 to-yellow-500",
              "from-zinc-300 to-zinc-400",
              "from-amber-600 to-amber-700",
            ];
            const medalText = ["text-black", "text-black", "text-white"];
            return (
              <div key={item.slug} className="glass-card p-5 text-center">
                <div
                  className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${medalColors[i]} ${medalText[i]} text-xl font-bold`}
                >
                  #{i + 1}
                </div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                  {item.category}
                </p>
                <div className="mt-3 text-2xl font-bold text-orange-400">
                  {item.brainrotScore}
                </div>
                <p className="text-xs text-zinc-500">Brainrot Score</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader
          title="High Brainrot Entries"
          description="Content scoring 70+ on the brainrot scale."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topEntries.map((entry) => (
            <TrendCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <RankingSection
        title="Complete Brainrot Rankings"
        description="Every entry ranked by brainrot score."
        rankings={rankings}
        href="/rankings"
        scoreLabel="Brainrot"
        scoreIcon="🧠"
        limit={15}
      />
    </main>
  );
}
