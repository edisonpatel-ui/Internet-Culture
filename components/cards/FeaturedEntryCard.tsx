import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { formatViews, getDetailHref } from "@/lib/utils";
import type { BaseEntry } from "@/types";

interface FeaturedEntryCardProps {
  entry: BaseEntry;
  badgeLabel?: string;
  badgeClassName?: string;
}

/**
 * Large homepage / featured preview — same media logic as TrendCard.
 */
export function FeaturedEntryCard({
  entry,
  badgeLabel = "Featured",
  badgeClassName = "rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30",
}: FeaturedEntryCardProps) {
  return (
    <Link
      href={getDetailHref(entry.category, entry.slug)}
      className="group block"
    >
      <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
        <EntryCardMedia
          entry={entry}
          aspect="wide"
          className="rounded-none"
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Badge category={entry.category} />
              <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-violet-200 sm:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                {entry.description}
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                👀 {formatViews(entry.views)} views
                &nbsp;·&nbsp;{entry.scores.relevance} relevance
              </p>
            </div>
            <span className={`shrink-0 ${badgeClassName}`}>{badgeLabel}</span>
          </div>
          <p className="mt-4 text-sm text-violet-400 transition-colors group-hover:text-violet-300">
            Read the full article →
          </p>
        </div>
      </div>
    </Link>
  );
}
