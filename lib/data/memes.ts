/**
 * @deprecated Content has migrated to lib/content/memes/
 *
 * Every meme now lives in its own file: lib/content/memes/[slug].ts
 * The lib/content/memes/index.ts aggregates and exports all entries.
 *
 * This file is kept as a thin re-export for any remaining imports that
 * point here rather than to lib/content/. Do not add new entries here.
 * Add them to lib/content/memes/ instead.
 */
export {
  memes,
  getMemeBySlug,
  getAllMemes,
  getAllMemeSlugs,
  getRelatedMemes,
} from "@/lib/content/memes";
