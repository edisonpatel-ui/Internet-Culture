/**
 * Creator content layer — public interface for all creator entries.
 *
 * lib/data/creators.ts is the current implementation source.
 * Pages and the service layer import from here, never from lib/data/ directly.
 *
 * When the per-file migration is complete, only this file needs to change.
 */

export {
  creators,
  getCreatorBySlug,
  getAllCreators,
  getAllCreatorSlugs,
  getRelatedCreators,
} from "@/lib/data/creators";
