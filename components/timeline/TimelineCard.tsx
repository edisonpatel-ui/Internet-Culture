import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import { formatTimelineDisplayLabel } from "@/lib/discovery/timeline";
import type { BaseEntry, TimelineField } from "@/types";

interface TimelineCardProps {
  entry: BaseEntry & { timelineEntry: TimelineField };
}

/**
 * Compact visual card per the approved spec (§8): image, title, category,
 * date — nothing else. Deliberately non-interactive in Stage 2 — clicking
 * to select and open the detail panel is Stage 4 scope. Not a link either:
 * once selection exists, this becomes a button (select, don't navigate),
 * so it isn't wired as an anchor now just to make it "do something" early.
 */
export function TimelineCard({ entry }: TimelineCardProps) {
  return (
    <div className="glass-card flex w-40 shrink-0 flex-col gap-2 p-2.5 sm:w-44">
      <EntryCardMedia entry={entry} aspect="square" className="rounded-lg" />
      <div className="flex flex-col gap-1">
        <Badge category={entry.category} />
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {entry.title}
        </p>
        <p className="text-xs text-zinc-500">
          {formatTimelineDisplayLabel(entry.timelineEntry)}
        </p>
      </div>
    </div>
  );
}
