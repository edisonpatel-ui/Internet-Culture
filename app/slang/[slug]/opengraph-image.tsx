import {
  OG_IMAGE_ALT,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderEntryOgImage,
} from "@/lib/seo/entryOgImage";
import { getSlangBySlug, getAllSlangSlugs } from "@/lib/content/slang";

/**
 * Per-article Open Graph card. Rendering lives in lib/seo/entryOgImage.tsx
 * (shared by every category); this file only resolves the entry.
 */
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

/** Mirrors the page: unknown slugs are not generated. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlangSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return renderEntryOgImage(getSlangBySlug(slug) ?? null);
}
