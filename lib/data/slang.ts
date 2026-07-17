/**
 * @deprecated Content has migrated to lib/content/slang/
 *
 * Every slang term now lives in its own file: lib/content/slang/[slug].ts
 * The lib/content/slang/index.ts aggregates and exports all entries.
 *
 * This file is kept as a thin re-export for any remaining imports that
 * point here rather than to lib/content/. Do not add new entries here.
 * Add them to lib/content/slang/ instead.
 */
export {
  slangTerms,
  getSlangBySlug,
  getAllSlang,
  getAllSlangSlugs,
  getRelatedSlang,
} from "@/lib/content/slang";
