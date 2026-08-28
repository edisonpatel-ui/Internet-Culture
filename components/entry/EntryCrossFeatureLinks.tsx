import Link from "next/link";
import { getAllEntriesSync } from "@/lib/services/entries";
import { buildCultureGraphEdges, getEdgesForSlug } from "@/lib/discovery/cultureGraph";
import type { BaseEntry } from "@/types";

interface EntryCrossFeatureLinksProps {
  entry: BaseEntry;
}

/**
 * Points into the dedicated Timeline/Culture Graph pages rather than
 * duplicating either interface inside the article — per the integration
 * requirement, this is a link out, not an embedded widget.
 *
 * Both conditions are derived live from the canonical entry/relationship
 * data on every render (no stored flag, no separate list): a Timeline
 * link only appears when `entry.timelineEntry?.featured` is true, and a
 * Culture Graph link only appears when this article actually has at
 * least one real relationship (so the link never focuses an empty/absent
 * node). Renders nothing for the large majority of articles that have
 * neither — never forces this UI onto every article.
 */
export function EntryCrossFeatureLinks({ entry }: EntryCrossFeatureLinksProps) {
  const isTimelineMilestone = entry.timelineEntry?.featured === true;

  const allEntries = getAllEntriesSync();
  const edges = buildCultureGraphEdges(allEntries);
  const hasGraphConnections = getEdgesForSlug(edges, entry.slug).length > 0;

  if (!isTimelineMilestone && !hasGraphConnections) return null;

  const linkClass =
    "glass-card inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {isTimelineMilestone && (
        <Link href="/timeline" className={linkClass}>
          Featured on the Timeline →
        </Link>
      )}
      {hasGraphConnections && (
        <Link href={`/culture-graph?focus=${encodeURIComponent(entry.slug)}`} className={linkClass}>
          Explore in Culture Graph →
        </Link>
      )}
    </div>
  );
}
