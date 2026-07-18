import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import type { BaseEntry } from "@/types";

interface ArticleHeroMediaProps {
  entry: Pick<
    BaseEntry,
    "title" | "imageGradient" | "imageUrl" | "media" | "category"
  >;
}

/**
 * Article page hero — identical media resolution to every card/search thumbnail.
 *
 * Source of truth: getEntryPreviewImageUrl → role:"featured" image/gif only.
 * Always uses object-contain so faces, logos, and meme frames are not cropped.
 */
export function ArticleHeroMedia({ entry }: ArticleHeroMediaProps) {
  return (
    <EntryCardMedia
      entry={entry}
      fit="contain"
      aspect="video"
      priority
    />
  );
}
