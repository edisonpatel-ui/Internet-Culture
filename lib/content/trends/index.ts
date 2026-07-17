/**
 * Trend content layer — public interface for all trend entries.
 *
 * lib/data/trends.ts is the current implementation source.
 * Pages and the service layer import from here, never from lib/data/ directly.
 *
 * When the per-file migration is complete, only this file needs to change.
 */

export {
  trends,
  getTrendBySlug,
  getTrendingToday,
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
} from "@/lib/data/trends";
