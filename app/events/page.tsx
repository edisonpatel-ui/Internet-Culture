import { createMetadata } from "@/lib/seo";
import { getAllEvents } from "@/lib/content/events";
import { EventsCatalog } from "@/components/catalog/EventsCatalog";
import { MajorEventRow } from "@/components/cards/MajorEventRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatViews } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Events",
  description: "Cultural events that defined the internet era — music moments, viral premieres, consumer shifts, and technology milestones.",
  path: "/events",
});

export default function EventsPage() {
  const allEvents = getAllEvents();
  const sorted = [...allEvents].sort((a, b) => b.scores.relevance - a.scores.relevance);
  const major = sorted.filter(e => e.views >= 1_000_000);
  const all = sorted;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
          ⚡ Cultural Events
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Internet Events
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-400">
          {allEvents.length} Events
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          The moments that moved culture. Real-world events that became internet phenomena, documented and analyzed for context and impact.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{allEvents.length}</p>
          <p className="text-xs text-zinc-400">Events Documented</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{formatViews(allEvents.reduce((a, e) => a + e.views, 0))}</p>
          <p className="text-xs text-zinc-400">Total Views</p>
        </div>
        <div className="glass-card p-4 text-center sm:block hidden">
          <p className="text-xl font-bold text-white">{major.length}</p>
          <p className="text-xs text-zinc-400">Major Events (1M+ views)</p>
        </div>
      </div>

      {/* Major Events */}
      {major.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="Major Events"
            description="Events that reached over 1 million views."
          />
          <div className="space-y-4">
            {major.map((event) => (
              <MajorEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* All Events Grid */}
      <section>
        <SectionHeader
          title="All Events"
          description={`${all.length} cultural events documented.`}
        />
        <EventsCatalog items={all} />
      </section>

    </main>
  );
}
