import Link from "next/link";
import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllMemes } from "@/lib/content/memes";
import { TrendCard } from "@/components/cards/TrendCard";
import { MemesCatalog } from "@/components/catalog/MemesCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "Internet Meme Archive — classic macros, reaction images, viral videos, and modern brainrot documented with origins and timelines.";

export const metadata = createMetadata({
  title: "Internet Meme Archive — Meanings, Origins & Cultural Impact",
  description: PAGE_DESCRIPTION,
  path: "/memes",
  keywords: [
    "meme archive",
    "meme meanings",
    "what is this meme",
    "classic memes",
    "internet memes",
  ],
});

const BRAINROT_MEME_SLUGS = new Set([
  "skibidi-toilet",
  "ohio-final-boss",
  "chicken-jockey",
  "npc-streaming",
  "tung-tung-tung-sahur",
]);

export default function MemesPage() {
  const sorted = [...getAllMemes()].sort((a, b) => b.scores.relevance - a.scores.relevance);
  const topMemes = sorted.slice(0, 3);
  const allMemes = sorted;
  const classic = sorted.filter(
    (m) =>
      !BRAINROT_MEME_SLUGS.has(m.slug) &&
      (m.tags?.some((t) => /classic|advice animal|rage|legacy/i.test(t)) ||
        m.trendDirection === "declining"),
  );
  const reactions = sorted.filter((m) =>
    m.tags?.some((t) => /reaction|image macro|macro/i.test(t)),
  );
  const collectionLd = createCollectionPageJsonLd({
    name: "Internet Meme Archive",
    description: PAGE_DESCRIPTION,
    path: "/memes",
    entries: allMemes,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
          Internet Meme Archive
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet Meme Archive
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {allMemes.length} memes documented
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Classic macros, reaction images, viral videos, and modern brainrot —
          origins, timelines, and why each format spread.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <Link href="/brainrot" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20">
            Brainrot / Gen Alpha
          </Link>
          <Link href="/events" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20">
            Viral history
          </Link>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{allMemes.length}</p>
          <p className="text-xs text-zinc-400">Memes documented</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">
            {
              allMemes.filter(
                (m) =>
                  m.trendDirection === "rising" || m.trendDirection === "new",
              ).length
            }
          </p>
          <p className="text-xs text-zinc-400">Rising or new</p>
        </div>
        <div className="glass-card p-4 text-center sm:block hidden">
          <p className="text-xl font-bold text-white">{classic.length}</p>
          <p className="text-xs text-zinc-400">Classic-era entries</p>
        </div>
      </div>

      <section className="mb-12">
        <SectionHeader
          title="Top Memes Right Now"
          description="Highest Current Popularity scores across all meme entries."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {topMemes.map((meme, i) => (
            <div key={meme.id} className="relative">
              <span className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs font-bold text-white backdrop-blur-sm">
                #{i + 1}
              </span>
              <TrendCard entry={meme} />
            </div>
          ))}
        </div>
      </section>

      {classic.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Classic Memes"
            description="Foundational formats that still define meme literacy."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classic.slice(0, 6).map((meme) => (
              <TrendCard key={meme.id} entry={meme} />
            ))}
          </div>
        </section>
      )}

      {reactions.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Reaction Images & Macros"
            description="Templates made for replies, captions, and remix culture."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reactions.slice(0, 6).map((meme) => (
              <TrendCard key={meme.id} entry={meme} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader
          title="Full Archive"
          description={`${allMemes.length} memes documented and explained.`}
        />
        <MemesCatalog items={allMemes} />
      </section>

    </main>
  );
}
