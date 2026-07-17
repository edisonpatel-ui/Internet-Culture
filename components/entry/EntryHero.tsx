import { Badge } from "@/components/ui/Badge";
import { ArticleHeroMedia } from "@/components/media/ArticleHeroMedia";
import {
  formatViews,
  formatDate,
  getTrendDirectionColor,
  getTrendDirectionIcon,
  getTrendDirectionLabel,
} from "@/lib/utils";
import type { BaseEntry } from "@/types";

interface EntryHeroProps {
  entry: BaseEntry;
  /**
   * Render the gradient image placeholder beside the text.
   * Pass false for text-heavy entries like Slang that have no hero image.
   */
  withImage?: boolean;
  /**
   * Optional extra <span> nodes appended after the standard views + date meta row.
   * Use for category-specific stats like overall score or platform.
   */
  extraMeta?: React.ReactNode;
}

export function EntryHero({ entry, withImage = true, extraMeta }: EntryHeroProps) {
  const infoBlock = (
    <div className={withImage ? "flex flex-col justify-center gap-4" : undefined}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge category={entry.category} />
        <span
          className={`text-sm font-medium ${getTrendDirectionColor(entry.trendDirection)}`}
        >
          {getTrendDirectionIcon(entry.trendDirection)}{" "}
          {getTrendDirectionLabel(entry.trendDirection)}
        </span>
      </div>

      <h1
        className={
          withImage
            ? "text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            : "text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        }
      >
        {entry.title}
      </h1>

      <p
        className={`leading-relaxed text-zinc-400 ${
          withImage ? "text-base" : "mt-4 text-lg"
        }`}
      >
        {entry.description}
      </p>

      <div
        className={`flex flex-wrap gap-4 text-sm text-zinc-500 ${
          withImage ? "" : "mt-4"
        }`}
      >
        <span>👀 {formatViews(entry.views)} views</span>
        <span>📅 Added {formatDate(entry.addedAt)}</span>
        {entry.creator && <span>✍️ {entry.creator}</span>}
        {extraMeta}
      </div>
    </div>
  );

  if (!withImage) {
    return <div className="mb-10">{infoBlock}</div>;
  }

  return (
    <div className="mb-10 grid gap-8 lg:grid-cols-2">
      <ArticleHeroMedia entry={entry} />
      {infoBlock}
    </div>
  );
}
