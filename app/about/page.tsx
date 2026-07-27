import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import { getAllTrends } from "@/lib/content/trends";
import { getAllMemes } from "@/lib/content/memes";
import { getAllSlang } from "@/lib/content/slang";
import { getAllEvents } from "@/lib/content/events";
import { getAllCreators } from "@/lib/content/people";

export const metadata = createMetadata({
  title: "About",
  description:
    "Why Internet Culture Hub exists — an encyclopedia for understanding internet culture through context, history, and connections.",
  path: "/about",
});

export default function AboutPage() {
  const allTrends = getAllTrends();
  const allMemes = getAllMemes();
  const allSlang = getAllSlang();
  const allEvents = getAllEvents();
  const allCreators = getAllCreators();

  const memeSlugs = new Set(allMemes.map((m) => m.slug));
  const slangSlugs = new Set(allSlang.map((s) => s.slug));
  const eventSlugs = new Set(allEvents.map((e) => e.slug));
  const creatorSlugs = new Set(allCreators.map((c) => c.slug));
  const trendOnlyCount = allTrends.filter(
    (t) =>
      !memeSlugs.has(t.slug) &&
      !slangSlugs.has(t.slug) &&
      !eventSlugs.has(t.slug) &&
      !creatorSlugs.has(t.slug),
  ).length;
  const totalEntries =
    allMemes.length +
    allSlang.length +
    allEvents.length +
    allCreators.length +
    trendOnlyCount;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          About {SITE_NAME}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An encyclopedia for understanding internet culture — not just looking
          up a definition.
        </p>
      </div>

      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Why this exists
        </h2>
        <p className="text-base leading-relaxed text-zinc-300">
          Internet culture moves fast, but references stick around. A meme, a
          slang term, a creator, or a viral moment often shows up years later —
          with little context for anyone who missed the original wave.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          {SITE_NAME} exists to document that culture clearly: what something
          is, where it came from, how it spread, what it connects to, and why it
          mattered. The goal is understanding — history, relationships, and
          cultural impact — not a dump of jokes or a feed of whatever is loud
          today.
        </p>
      </section>

      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Why use this instead of other sites?
        </h2>
        <p className="mb-6 text-base leading-relaxed text-zinc-400">
          Other places are useful. They answer different questions. This one is
          built for a specific job: helping you understand a piece of internet
          culture in one place.
        </p>
        <ul className="space-y-5 text-sm leading-relaxed text-zinc-300">
          <li>
            <span className="font-semibold text-white">Wikipedia</span>
            <span className="text-zinc-500"> — </span>
            Broad encyclopedic coverage. Strong on notable people and events;
            thinner on short-lived meme formats, slang nuance, and how online
            references connect to each other.
          </li>
          <li>
            <span className="font-semibold text-white">Know Your Meme</span>
            <span className="text-zinc-500"> — </span>
            Deep meme documentation and examples. We organize across memes,
            slang, people, events, and trends, with timelines, related entries,
            and cultural scores meant for quick orientation.
          </li>
          <li>
            <span className="font-semibold text-white">Urban Dictionary</span>
            <span className="text-zinc-500"> — </span>
            Crowd-sourced slang definitions, often witty or contradictory. We
            aim for a single clear definition plus origin, usage, and context.
          </li>
          <li>
            <span className="font-semibold text-white">Reddit</span>
            <span className="text-zinc-500"> — </span>
            Discussion and discovery in the moment. Threads fade. Entries here
            are meant to stay readable after the thread is gone.
          </li>
          <li>
            <span className="font-semibold text-white">TikTok</span>
            <span className="text-zinc-500"> — </span>
            Where many trends live and mutate. Great for seeing the culture;
            less reliable as a lasting reference once the For You page moves on.
          </li>
          <li>
            <span className="font-semibold text-white">Google</span>
            <span className="text-zinc-500"> — </span>
            Finds everything at once — news, blogs, videos, forums. Useful for
            hunting; less useful when you want one structured page with context,
            history, and related topics.
          </li>
        </ul>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          In short: use this when you want to understand something from internet
          culture — its meaning, history, evolution, and place in the wider map
          — without sorting through a feed to get there.
        </p>
      </section>

      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">
          What we focus on
        </h2>
        <ul className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
          {[
            "Clear definitions and context",
            "Origins and history",
            "Timelines when they matter",
            "Related topics and relationships",
            "How things evolve over time",
            "Cultural impact, not just virality",
            "Sources and references",
            "Straightforward navigation by category",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-zinc-600" aria-hidden>
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 glass-card p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Long-term aim</h2>
        <p className="text-base leading-relaxed text-zinc-300">
          Over time, this should become a reliable place to check when you want
          to understand internet culture: where a meme came from, what a phrase
          means, who a creator is, how a trend evolved, and what else connects
          to it.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          That means preserving internet history as it ages, keeping entries
          honest about how current something still is, and linking topics so
          readers can follow the culture rather than chase isolated search
          results.
        </p>
      </section>

      <section className="mb-12 glass-card p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Catalog size</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: totalEntries, label: "Entries" },
            { value: allMemes.length, label: "Memes" },
            { value: allSlang.length, label: "Slang" },
            { value: allCreators.length, label: "People" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-entries" className="mb-12 scroll-mt-24">
        <h2 className="mb-6 text-2xl font-bold text-white">How entries are written</h2>
        <div className="space-y-4">
          {[
            {
              step: "01",
              title: "Identify",
              desc: "Confirm what the topic is, what it is not, and which category it belongs in.",
            },
            {
              step: "02",
              title: "Source",
              desc: "Trace origin claims to real references before writing them as fact.",
            },
            {
              step: "03",
              title: "Explain",
              desc: "Definition, history, examples, impact, and related entries — in plain language.",
            },
            {
              step: "04",
              title: "Score carefully",
              desc: "Current Popularity reflects how actively people are posting about something today. Influence reflects lasting footprint. Neither is a traffic counter.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-5 glass-card p-5">
              <span className="shrink-0 text-3xl font-bold text-white/10">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-xl`}
              >
                {cat.icon}
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-violet-200">
                  {cat.label}
                </p>
                <p className="text-xs text-zinc-500">{cat.description}</p>
              </div>
              <span className="ml-auto text-zinc-600 group-hover:text-zinc-400">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-card p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">Editorial notes</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Entries prioritize sources over speculation. If something cannot be
          verified, it should not be presented as fact.
        </p>
      </section>
    </main>
  );
}
