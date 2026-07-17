import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScoreGroup } from "@/components/ui/ScoreBar";
import { getFeaturedMediaItem } from "@/lib/media/mediaUtils";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry } from "@/types";

interface TrendCardProps {
  entry: BaseEntry;
  className?: string;
}

/**
 * Card thumbnail resolver.
 *
 * Priority:
 *   1. First MediaItem where role === "featured" and type is "image" or "gif"
 *   2. entry.imageUrl (legacy field)
 *   3. null → gradient ImagePlaceholder
 */
function resolveCardImage(entry: BaseEntry): string | null {
  const best = getFeaturedMediaItem(entry.media ?? []);
  if (best && (best.type === "image" || best.type === "gif")) return best.url;
  return entry.imageUrl ?? null;
}

export function TrendCard({ entry, className }: TrendCardProps) {
  const href = getDetailHref(entry.category, entry.slug);
  const cardImageUrl = resolveCardImage(entry);

  return (
    <Link
      href={href}
      className={`group glass-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-violet-500/5 ${className ?? ""}`}
    >
      {cardImageUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardImageUrl}
            alt={entry.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder
          title={entry.title}
          gradient={entry.imageGradient}
          className="rounded-none rounded-t-2xl"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white transition-colors group-hover:text-violet-200 line-clamp-2">
            {entry.title}
          </h3>
          <Badge category={entry.category} />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {entry.description}
        </p>
        <ScoreGroup
          relevance={entry.scores.relevance}
          brainrot={entry.scores.brainrot}
          cringe={entry.scores.cringe}
          compact
        />
      </div>
    </Link>
  );
}
