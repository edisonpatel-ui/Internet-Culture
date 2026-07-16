import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { events } from "@/lib/data/events";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatViews, getTrendDirectionColor, getTrendDirectionIcon } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Events",
  description: "Cultural events that defined the internet era — music moments, viral premieres, consumer shifts, and technology milestones.",
  path: "/events",
});

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => b.scores.relevance - a.scores.relevance);
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
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          The moments that moved culture. Real-world events that became internet phenomena, documented and analyzed for context and impact.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{events.length}</p>
          <p className="text-xs text-zinc-400">Events Documented</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-white">{formatViews(events.reduce((a, e) => a + e.views, 0))}</p>
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
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group glass-card flex gap-5 overflow-hidden transition-all duration-300 hover:border-white/15"
              >
                <ImagePlaceholder
                  title={event.title}
                  gradient={event.imageGradient}
                  aspect="square"
                  className="w-24 shrink-0 rounded-none rounded-l-2xl sm:w-32"
                />
                <div className="flex flex-1 flex-col justify-center gap-2 py-4 pr-4">
                  <div className="flex items-center gap-2">
                    <Badge category="event" />
                    <span className={`text-xs font-medium ${getTrendDirectionColor(event.trendDirection)}`}>
                      {getTrendDirectionIcon(event.trendDirection)} {event.trendDirection}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-violet-200">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span>👀 {formatViews(event.views)}</span>
                    {event.platform && <span>· {event.platform}</span>}
                  </div>
                </div>
              </Link>
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group glass-card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <ImagePlaceholder
                title={event.title}
                gradient={event.imageGradient}
                className="rounded-none rounded-t-2xl"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white transition-colors group-hover:text-violet-200 line-clamp-2">
                    {event.title}
                  </h3>
                  <Badge category="event" />
                </div>
                <p className="flex-1 text-sm text-zinc-400 line-clamp-2">{event.description}</p>
                <p className="text-sm font-medium text-zinc-300 line-clamp-2 border-l-2 border-emerald-500/40 pl-3 italic">
                  {event.impact}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>👀 {formatViews(event.views)}</span>
                  <span className={getTrendDirectionColor(event.trendDirection)}>
                    {getTrendDirectionIcon(event.trendDirection)} {event.trendDirection}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
