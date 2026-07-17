import { createMetadata } from "@/lib/seo";
import { getAllCreators } from "@/lib/content/creators";
import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatViews } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Creators",
  description:
    "The people who drive internet culture — streamers, animators, TikTok creators, and viral personalities documented and archived.",
  path: "/creators",
});

export default function CreatorsPage() {
  const sorted = [...getAllCreators()].sort(
    (a, b) => b.scores.relevance - a.scores.relevance,
  );

  const totalViews = sorted.reduce((acc, c) => acc + c.views, 0);
  const rising = sorted.filter((c) => c.trendDirection === "rising");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300">
          🎥 Creator Encyclopedia
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Creator Database
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          The people behind the memes, the slang, and the cultural moments.
          Documented, archived, and connected to the trends they shaped.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Creators Documented", value: sorted.length, icon: "🎥" },
          { label: "Total Views", value: formatViews(totalViews), icon: "👀" },
          { label: "Currently Rising", value: rising.length, icon: "📈" },
          { label: "Platforms Covered", value: "5", icon: "📱" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-xl">{stat.icon}</p>
            <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* All Creators */}
      <section>
        <SectionHeader
          title="All Creators"
          description={`${sorted.length} creators documented and growing.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((creator) => (
            <TrendCard key={creator.id} entry={creator} />
          ))}
        </div>
      </section>

    </main>
  );
}
