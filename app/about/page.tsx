import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, CATEGORIES } from "@/lib/constants";
import { getAllTrends } from "@/lib/content/trends";
import { getAllMemes } from "@/lib/content/memes";
import { getAllSlang } from "@/lib/content/slang";
import { getAllEvents } from "@/lib/content/events";
import { getAllEntriesSync } from "@/lib/services/entries";
import { selectRisingFast } from "@/lib/discovery/momentum";

export const metadata = createMetadata({
  title: "About",
  description:
    "About Internet Culture Hub — a curated encyclopedia of memes, slang, trends, and viral culture.",
  path: "/about",
});

export default function AboutPage() {
  const allTrends = getAllTrends();
  const allMemes = getAllMemes();
  const allSlang = getAllSlang();
  const allEvents = getAllEvents();
  const rising = selectRisingFast(getAllEntriesSync());

  // Deduplicated total: memes/slang/events take precedence, trend-only entries fill the rest
  const memeSlugs = new Set(allMemes.map((m) => m.slug));
  const slangSlugs = new Set(allSlang.map((s) => s.slug));
  const eventSlugs = new Set(allEvents.map((e) => e.slug));
  const trendOnlyCount = allTrends.filter(
    (t) => !memeSlugs.has(t.slug) && !slangSlugs.has(t.slug) && !eventSlugs.has(t.slug)
  ).length;
  const totalEntries = allMemes.length + allSlang.length + allEvents.length + trendOnlyCount;
  const currentlyTrending = rising.length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-6 text-xl text-zinc-400">{SITE_TAGLINE}</p>
      </div>

      {/* Mission */}
      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">What this is</h2>
        <p className="text-base leading-relaxed text-zinc-300">
          Internet Culture Hub is a curated encyclopedia of memes, slang, creators,
          events, and trends — written so you can understand a reference the first
          time you see it.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          We care about accurate origins, usable definitions, and honest scores.
          Hype pages and rumor dumps are not the goal.
        </p>
      </section>

      {/* Who We Serve */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-white">Who it&apos;s for</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: "🧑‍💻", title: "Curious readers", desc: "Catch up on slang and memes without scrolling for twenty minutes." },
            { icon: "🎨", title: "Creators", desc: "Quick cultural context when a reference hits your comments." },
            { icon: "🎓", title: "Students & researchers", desc: "Dated origins and sources you can actually cite." },
            { icon: "📰", title: "Journalists", desc: "A fast, sourced explainer before you publish." },
          ].map((item) => (
            <div key={item.title} className="glass-card p-5">
              <p className="mb-2 text-2xl">{item.icon}</p>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12 glass-card p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Catalog size</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: totalEntries, label: "Entries" },
            { value: currentlyTrending, label: "Rising now" },
            { value: allMemes.length, label: "Memes" },
            { value: allSlang.length, label: "Slang terms" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-entries" className="mb-12 scroll-mt-24">
        <h2 className="mb-6 text-2xl font-bold text-white">How entries get made</h2>
        <div className="space-y-4">
          {[
            { step: "01", title: "Research", desc: "Confirm what the thing is, what it is not, and where it came from." },
            { step: "02", title: "Write", desc: "Definition, origin, examples, and sources — in plain language." },
            { step: "03", title: "Score", desc: "Relevance, influence, cringe, and brainrot — four editorial estimates." },
            { step: "04", title: "Link", desc: "Connect related entries so readers can move through the culture graph." },
          ].map((item) => (
            <div key={item.step} className="flex gap-5 glass-card p-5">
              <span className="shrink-0 text-3xl font-bold text-white/10">{item.step}</span>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
          Browse categories
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group glass-card flex items-center gap-4 p-5 transition-colors duration-200 hover:-translate-y-0.5 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-xl`}>
                {cat.icon}
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-violet-200">{cat.label}</p>
                <p className="text-xs text-zinc-500">{cat.description}</p>
              </div>
              <span className="ml-auto text-zinc-600 group-hover:text-zinc-400">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-card p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">Editorial notes</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Writing standards live in the repo docs: editorial style guide and content
          language policy. Entries prioritize sources over speculation.
        </p>
      </section>

    </main>
  );
}
