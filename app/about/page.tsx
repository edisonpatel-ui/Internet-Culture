import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, CATEGORIES } from "@/lib/constants";
import { getAllTrends, getNewTrends, getRisingFastest } from "@/lib/content/trends";
import { getAllMemes } from "@/lib/content/memes";
import { getAllSlang } from "@/lib/content/slang";
import { getAllEvents } from "@/lib/content/events";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about Internet Culture Hub — the world's organized database for memes, slang, trends, and viral events.",
  path: "/about",
});

export default function AboutPage() {
  const allTrends = getAllTrends();
  const allMemes = getAllMemes();
  const allSlang = getAllSlang();
  const allEvents = getAllEvents();
  const rising = getRisingFastest();
  const newTrends = getNewTrends();

  // Deduplicated total: memes/slang/events take precedence, trend-only entries fill the rest
  const memeSlugs = new Set(allMemes.map((m) => m.slug));
  const slangSlugs = new Set(allSlang.map((s) => s.slug));
  const eventSlugs = new Set(allEvents.map((e) => e.slug));
  const trendOnlyCount = allTrends.filter(
    (t) => !memeSlugs.has(t.slug) && !slangSlugs.has(t.slug) && !eventSlugs.has(t.slug)
  ).length;
  const totalEntries = allMemes.length + allSlang.length + allEvents.length + trendOnlyCount;
  const currentlyTrending = rising.length + newTrends.length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
          📚 The Encyclopedia
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          About{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {SITE_NAME}
          </span>
        </h1>
        <p className="mt-6 text-xl text-zinc-400">{SITE_TAGLINE}</p>
      </div>

      {/* Mission */}
      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
        <p className="text-base leading-relaxed text-zinc-300">
          Internet Culture Hub is NOT simply another meme website. We are building the world&apos;s most organized, structured, and searchable database of internet culture.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Unlike other platforms that catalog memes passively, we focus on <strong className="text-white">what is happening NOW</strong> while organizing internet culture into a structured system that helps people understand, discover, and navigate the digital world.
        </p>
      </section>

      {/* Who We Serve */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-white">Who We Serve</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: "🧑‍💻", title: "Curious People", desc: "Understand what's trending, learn new slang, and discover what everyone is talking about." },
            { icon: "🎨", title: "Creators", desc: "Stay ahead of trends, find inspiration, and understand your audience's cultural context." },
            { icon: "🎓", title: "Students & Researchers", desc: "Document internet history, study digital culture, and analyze social trends." },
            { icon: "📰", title: "Journalists", desc: "Quickly understand viral moments, verify context, and find accurate explanations." },
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
        <h2 className="mb-6 text-2xl font-bold text-white">By the Numbers</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: totalEntries, label: "Entries Documented" },
            { value: currentlyTrending, label: "Currently Trending" },
            { value: allMemes.length, label: "Memes Catalogued" },
            { value: allSlang.length, label: "Slang Terms Defined" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-white">How It Works</h2>
        <div className="space-y-4">
          {[
            { step: "01", title: "We Monitor", desc: "Our team tracks trends across TikTok, X, Reddit, YouTube, and other platforms in real time." },
            { step: "02", title: "We Document", desc: "Every trend gets a full entry: origin, explanation, timeline, examples, and scoring across multiple dimensions." },
            { step: "03", title: "We Score", desc: "Each entry receives relevance, brainrot, cringe, and other scores so you can instantly understand its cultural weight." },
            { step: "04", title: "We Connect", desc: "Related trends, creators, events, and communities are linked so you can explore the full cultural context." },
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

      {/* Roadmap */}
      <section className="mb-12 glass-card border-dashed border-violet-500/20 p-8">
        <h2 className="mb-2 text-2xl font-bold text-white">What&apos;s Coming</h2>
        <p className="mb-6 text-sm text-zinc-400">We&apos;re building toward a much bigger vision.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: "⚡", label: "Real-Time Updates", desc: "Live trend tracking with sub-hour freshness" },
            { icon: "👥", label: "Community", desc: "User submissions, voting, and trend requests" },
            { icon: "📱", label: "Mobile App", desc: "Native iOS and Android apps for on-the-go discovery" },
            { icon: "🛍️", label: "Trend Shop", desc: "Curated products tied to trending moments" },
            { icon: "🌍", label: "Expanded Coverage", desc: "More creators, more memes, more languages — scaled globally" },
            { icon: "🔖", label: "Personal Collections", desc: "Save, organize, and share your favourite entries" },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-white">Explore the Encyclopedia</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-white/15`}
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

      {/* Contact / Coming Soon */}
      <section className="glass-card p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">Get Involved</h2>
        <p className="mb-4 text-sm text-zinc-400">
          Want to suggest a trend, report an error, or get in touch? Community features and contact forms are coming soon.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-400">
          📬 Contact & community features — coming soon
        </div>
      </section>

    </main>
  );
}
