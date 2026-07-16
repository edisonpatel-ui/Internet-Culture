import { createMetadata } from "@/lib/seo";
import { getBrainrotRankings, getHighBrainrotEntries } from "@/lib/data/brainrot";
import { RankingSection } from "@/components/sections/RankingSection";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = createMetadata({
  title: "Brainrot",
  description: "Delightfully unhinged internet content ranked by pure brainrot score. Skibidi Toilet, NPC Streaming, Ohio Final Boss and more.",
  path: "/brainrot",
});

export default function BrainrotPage() {
  const rankings = getBrainrotRankings();
  const topEntries = getHighBrainrotEntries().slice(0, 6);

  const topThree = rankings.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300">
          🧠 Certified Brainrot
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Brainrot Content
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          The most gloriously unhinged content on the internet, quantified, ranked, and celebrated. Incomprehensible to outsiders, iconic to the chronically online.
        </p>
      </div>

      {/* What Is Brainrot */}
      <div className="mb-10 glass-card p-6">
        <h2 className="mb-2 text-lg font-semibold text-white">What is Brainrot?</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          &ldquo;Brainrot&rdquo; describes content so surreal, repetitive, or absurdist that it seems to dissolve coherent thought. It&apos;s the internet being maximally itself — where logic is optional and Skibidi Toilet is high art. The brainrot score measures how effectively content achieves this state.
        </p>
      </div>

      {/* Top 3 Podium */}
      <section className="mb-12">
        <SectionHeader
          title="Brainrot Podium"
          description="The unholy trinity of internet derangement."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {topThree.map((item, i) => {
            const medalColors = ["from-amber-400 to-yellow-500", "from-zinc-300 to-zinc-400", "from-amber-600 to-amber-700"];
            const medalText = ["text-black", "text-black", "text-white"];
            return (
              <div key={item.slug} className="glass-card p-5 text-center">
                <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${medalColors[i]} ${medalText[i]} text-xl font-bold`}>
                  #{i + 1}
                </div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{item.category}</p>
                <div className="mt-3 text-2xl font-bold text-orange-400">{item.brainrotScore}</div>
                <p className="text-xs text-zinc-500">Brainrot Score</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* High Brainrot Grid */}
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

      {/* Full Rankings */}
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
