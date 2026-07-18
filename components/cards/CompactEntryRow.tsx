import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry } from "@/types";

interface CompactEntryRowProps {
  entry: BaseEntry;
  leadingEmoji?: string;
}

/** Compact list row (e.g. On This Day) — shares EntryCardMedia. */
export function CompactEntryRow({
  entry,
  leadingEmoji,
}: CompactEntryRowProps) {
  return (
    <Link
      href={getDetailHref(entry.category, entry.slug)}
      className="group glass-card flex items-center gap-4 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
        <EntryCardMedia
          entry={entry}
          aspect="none"
          className="h-full w-full rounded-none"
        />
        {leadingEmoji && (
          <span className="absolute bottom-1 right-1 text-lg drop-shadow">
            {leadingEmoji}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 py-4 pr-4">
        <Badge category={entry.category} />
        <h3 className="mt-1 font-semibold text-white transition-colors group-hover:text-violet-200">
          {entry.title}
        </h3>
        <p className="mt-0.5 truncate text-sm text-zinc-400">
          {entry.description}
        </p>
      </div>
    </Link>
  );
}
