import { Badge } from "@/components/ui/Badge";
import { ArticleHeroMedia } from "@/components/media/ArticleHeroMedia";
import {
  formatViews,
  formatDate,
  getTrendDirectionColor,
  getTrendDirectionIcon,
} from "@/lib/utils";
import { getFreshnessLabel } from "@/lib/content/freshness";
import { hasEntryPreviewImage } from "@/lib/media/mediaUtils";
import type { BaseEntry } from "@/types";

interface EntryHeroProps {
  entry: BaseEntry;
  /**
   * Media column behavior:
   * - true  — always show (featured image, or gradient fallback)
   * - false — never show media column
   * - "auto" (default) — show only when a canonical featured image/gif exists
   *
   * Cards, heroes, and OG images all resolve media via getEntryPreviewImageUrl.
   */
  withImage?: boolean | "auto";
  /**
   * Optional extra <span> nodes appended after the standard views + date meta row.
   * Use for category-specific stats like overall score or platform.
   */
  extraMeta?: React.ReactNode;
}

export function EntryHero({
  entry,
  withImage = "auto",
  extraMeta,
}: EntryHeroProps) {
  const showImage =
    withImage === true ||
    (withImage === "auto" && hasEntryPreviewImage(entry));

  const infoBlock = (
    <div className={showImage ? "flex flex-col justify-center gap-4" : undefined}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge category={entry.category} />
        <span
          className={`text-sm font-medium ${getTrendDirectionColor(entry.trendDirection)}`}
        >
          <span aria-hidden>{getTrendDirectionIcon(entry.trendDirection)} </span>
          {getFreshnessLabel(entry)}
        </span>
      </div>

      <h1
        className={
          showImage
            ? "text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            : "text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        }
      >
        {entry.title}
      </h1>

      <p
        className={`leading-relaxed text-zinc-400 ${
          showImage ? "text-base" : "mt-4 text-lg"
        }`}
      >
        {entry.description}
      </p>

      <div
        className={`flex flex-wrap gap-4 text-sm text-zinc-500 ${
          showImage ? "" : "mt-4"
        }`}
      >
        <span>
          <span aria-hidden>👀 </span>
          {formatViews(entry.views)} views
        </span>
        <span>
          <span aria-hidden>📅 </span>
          Added {formatDate(entry.addedAt)}
        </span>
        {entry.creator && (
          <span>
            <span aria-hidden>✍️ </span>
            {entry.creator}
          </span>
        )}
        {extraMeta}
      </div>
    </div>
  );

  if (!showImage) {
    return <div className="mb-10">{infoBlock}</div>;
  }

  return (
    <div className="mb-10 grid gap-8 lg:grid-cols-2">
      <ArticleHeroMedia entry={entry} />
      {infoBlock}
    </div>
  );
}
