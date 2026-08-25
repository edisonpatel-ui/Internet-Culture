"use client";

import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import { formatTimelineDisplayLabel } from "@/lib/discovery/timeline";
import { getCategoryLabel } from "@/lib/utils";
import type { BaseEntry, TimelineField } from "@/types";

interface TimelineCardProps {
  entry: BaseEntry & { timelineEntry: TimelineField };
  selected: boolean;
  onSelect: (slug: string) => void;
}

/**
 * Compact visual card per the approved spec (§8): image, title, category,
 * date — nothing else. A real <button>, not a <div onClick> or an <a> —
 * clicking selects (opens/updates the persistent detail panel), it never
 * navigates. Selected state is shown via the accent border AND
 * `aria-current` together — never color alone.
 */
export function TimelineCard({ entry, selected, onSelect }: TimelineCardProps) {
  const dateLabel = formatTimelineDisplayLabel(entry.timelineEntry);
  return (
    <button
      type="button"
      onClick={() => onSelect(entry.slug)}
      aria-current={selected ? "true" : undefined}
      aria-label={`${entry.title}, ${getCategoryLabel(entry.category)}, ${dateLabel}`}
      className={`glass-card flex w-40 shrink-0 flex-col gap-2 p-2.5 text-left transition-colors sm:w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 ${
        selected
          ? "border-[var(--accent)]"
          : "hover:border-white/20"
      }`}
    >
      <EntryCardMedia entry={entry} aspect="square" className="rounded-lg" />
      <div className="flex flex-col gap-1">
        <Badge category={entry.category} />
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {entry.title}
        </p>
        <p className="text-xs text-zinc-500">{dateLabel}</p>
      </div>
    </button>
  );
}
