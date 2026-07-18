"use client";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getEntryPreviewImageTitle,
  getEntryPreviewImageUrl,
  getMediaObjectFit,
  type EntryPreviewFields,
  type MediaObjectFit,
} from "@/lib/media/mediaUtils";
import { cn } from "@/lib/utils";

interface EntryCardMediaProps {
  entry: EntryPreviewFields;
  /**
   * contain — article heroes (never crop faces/logos)
   * cover / category default — listing cards
   * Omit to use getMediaObjectFit(category).
   */
  fit?: MediaObjectFit;
  aspect?: "video" | "square" | "wide" | "none";
  className?: string;
  imgClassName?: string;
  /** Eager-load above-the-fold heroes only. */
  priority?: boolean;
}

/**
 * Shared preview thumbnail for every article card / list row / search hit.
 *
 * Featured image/gif → MediaImage
 * Otherwise → gradient ImagePlaceholder
 *
 * Do not reimplement this branching in page-level JSX.
 */
export function EntryCardMedia({
  entry,
  fit,
  aspect = "video",
  className,
  imgClassName,
  priority = false,
}: EntryCardMediaProps) {
  const url = getEntryPreviewImageUrl(entry);
  const resolvedFit = fit ?? getMediaObjectFit(entry.category);

  if (!url) {
    return (
      <ImagePlaceholder
        title={entry.title}
        gradient={entry.imageGradient}
        aspect={aspect}
        className={className}
      />
    );
  }

  return (
    <MediaImage
      src={url}
      alt={getEntryPreviewImageTitle(entry)}
      fallbackTitle={entry.title}
      fallbackGradient={entry.imageGradient}
      fit={resolvedFit}
      aspect={aspect}
      className={cn(className)}
      imgClassName={imgClassName}
      priority={priority}
    />
  );
}
