import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import type { BaseEntry } from "@/types";

interface ArticleHeroMediaProps {
  entry: Pick<
    BaseEntry,
    "title" | "imageGradient" | "imageUrl" | "media" | "category"
  >;
}

/**
 * Article page hero — same media resolution as every preview card.
 * Always uses object-contain so faces, logos, and meme frames are not cropped.
 */
export function ArticleHeroMedia({ entry }: ArticleHeroMediaProps) {
  return <EntryCardMedia entry={entry} fit="contain" aspect="video" />;
}
