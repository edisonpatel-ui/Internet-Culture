import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllEvents } from "@/lib/content/events";
import { sortByCurrentPopularity } from "@/lib/discovery/scoring";
import { EventsCatalog } from "@/components/catalog/EventsCatalog";
import { MajorEventRow } from "@/components/cards/MajorEventRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "Internet History Timeline — viral moments, platform shifts, and cultural events that reshaped online life.";

export const metadata = createMetadata({
  title: "Internet History Timeline — Viral Events & Platform Moments",
  description: PAGE_DESCRIPTION,
  path: "/events",
  keywords: [
    "internet history",
    "viral events",
    "platform changes",
    "internet culture timeline",
  ],
});

export default function EventsPage() {
  const allEvents = getAllEvents();
  const sorted = sortByCurrentPopularity(allEvents);
  const major = [...allEvents]
    .sort((a, b) => b.scores.influence - a.scores.influence)
    .slice(0, 7);
  const all = sorted;
  const viralMoments = sorted.filter(
    (e) =>
      e.tags?.some((t) => /viral|challenge|premiere|raid/i.test(t)) ||
      /challenge|raid|premiere|shake|bucket/i.test(e.slug),
  );
  const collectionLd = createCollectionPageJsonLd({
    name: "Internet History Timeline",
    description: PAGE_DESCRIPTION,
    path: "/events",
    entries: all,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
          Internet History Timeline
        </div>
        <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet History Timeline
        </h1>
        <p className="font-page mt-2 text-base font-medium text-zinc-400">
          {allEvents.length} events
        </p>
        <p className="font-page mt-4 max-w-2xl text-lg text-zinc-400">
          Viral moments, platform changes, and cultural flashpoints — what happened,
          why it mattered, and what it connected to.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{allEvents.length}</p>
          <p className="text-xs text-zinc-400">Events documented</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{major.length}</p>
          <p className="text-xs text-zinc-400">Major moments</p>
        </div>
        <div className="glass-card p-4 text-center sm:block hidden">
          <p className="text-xl font-bold text-white">{viralMoments.length}</p>
          <p className="text-xs text-zinc-400">Viral events</p>
        </div>
      </div>

      {major.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Major Cultural Moments"
            description="Events with the most influence."
          />
          <div className="space-y-4">
            {major.map((event) => (
              <MajorEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {viralMoments.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Viral Events"
            description="Participation waves and flash phenomena."
          />
          <div className="space-y-4">
            {viralMoments.slice(0, 8).map((event) => (
              <MajorEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader
          title="Full Timeline"
          description={`${all.length} cultural events documented.`}
        />
        <EventsCatalog items={all} />
      </section>
    </main>
  );
}
