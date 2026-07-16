import { createMetadata } from "@/lib/seo";
import { slangTerms } from "@/lib/data/slang";
import { SlangCard } from "@/components/cards/SlangCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatViews } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Internet Slang",
  description: "The definitive dictionary of internet slang — Gen Z and Gen Alpha vocabulary explained with origin stories and usage examples.",
  path: "/slang",
});

export default function SlangPage() {
  const sorted = [...slangTerms].sort((a, b) => b.scores.relevance - a.scores.relevance);
  const rising = sorted.filter(s => s.trendDirection === "rising" || s.trendDirection === "new");
  const stable = sorted.filter(s => s.trendDirection === "stable");
  const declining = sorted.filter(s => s.trendDirection === "declining");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300">
          💬 Slang Dictionary
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet Slang
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Every word, phrase, and abbreviation the internet speaks fluently — origins, definitions, and real usage examples.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Terms Documented", value: slangTerms.length, icon: "📖" },
          { label: "Total Views", value: formatViews(slangTerms.reduce((acc, s) => acc + s.views, 0)), icon: "👀" },
          { label: "Currently Rising", value: rising.length, icon: "📈" },
          { label: "Mainstream", value: stable.length, icon: "💎" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-xl">{stat.icon}</p>
            <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Rising Slang */}
      {rising.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Rising Slang"
            description="Terms gaining momentum right now."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rising.map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {/* Mainstream Slang */}
      {stable.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Mainstream Terms"
            description="Slang that has crossed into everyday use."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stable.map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {/* Fading Terms */}
      {declining.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Fading Out"
            description="Terms losing mainstream traction."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {declining.map((term) => (
              <SlangCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {/* All Slang A-Z */}
      <section>
        <SectionHeader
          title="Full Dictionary"
          description={`All ${slangTerms.length} documented slang terms.`}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((term) => (
            <SlangCard key={term.id} term={term} />
          ))}
        </div>
      </section>

    </main>
  );
}
