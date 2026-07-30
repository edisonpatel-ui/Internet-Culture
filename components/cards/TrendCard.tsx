import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ScoreGroup } from "@/components/ui/ScoreBar";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry } from "@/types";

interface TrendCardProps {
  entry: BaseEntry;
  className?: string;
}

export function TrendCard({ entry, className }: TrendCardProps) {
  const href = getDetailHref(entry.category, entry.slug);

  return (
    <Link
      href={href}
      className={`group surface flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-150 hover:border-white/14 hover:bg-[var(--surface-elevated)] ${className ?? ""}`}
    >
      <div className="p-4 sm:p-5">
        <EntryCardMedia entry={entry} aspect="video" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white transition-colors group-hover:text-zinc-100 line-clamp-2">
            {entry.title}
          </h3>
          <Badge category={entry.category} />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {entry.description}
        </p>
        <ScoreGroup
          relevance={entry.scores.relevance}
          influence={entry.scores.influence}
          cringe={entry.scores.cringe}
          brainrot={entry.scores.brainrot}
          compact
        />
      </div>
    </Link>
  );
}
