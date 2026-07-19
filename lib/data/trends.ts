/**
 * @deprecated Content has migrated to lib/content/trends/
 *
 * Every trend now lives in its own file: lib/content/trends/[slug].ts
 * The lib/content/trends/index.ts aggregates and exports all entries
 * and all utility functions.
 *
 * This file is kept as a thin re-export for any remaining imports that
 * point here rather than to lib/content/. Do not add new entries here.
 * Add them to lib/content/trends/ instead.
 */
export {
  trends,
  getTrendBySlug,
  getTrendingToday,
  getTrendCategoryEntries,
  getRisingFastest,
  getDecliningTrends,
  getNewTrends,
  getMostViewed,
  getRecentlyAdded,
  getPopularMemes,
  getInternetSlang,
  getBrainrotRankingsFromTrends,
  getCringeRankings,
  getFastestGrowing,
  getMostInfluential,
  getMostUnderrated,
  getTrendsByCategory,
  getAllSearchable,
  getAllTrends,
  getAllTrendSlugs,
} from "@/lib/content/trends";
