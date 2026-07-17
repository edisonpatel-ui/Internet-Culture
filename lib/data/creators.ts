/**
 * @deprecated Content has migrated to lib/content/creators/
 *
 * Every creator now lives in its own file: lib/content/creators/[slug].ts
 * The lib/content/creators/index.ts aggregates and exports all entries.
 *
 * This file is kept as a thin re-export for any remaining imports that
 * point here rather than to lib/content/. Do not add new entries here.
 * Add them to lib/content/creators/ instead.
 */
export {
  creators,
  getCreatorBySlug,
  getAllCreators,
  getAllCreatorSlugs,
  getRelatedCreators,
} from "@/lib/content/creators";
