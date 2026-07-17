/**
 * Slang content layer — public interface for all slang entries.
 *
 * lib/data/slang.ts is the current implementation source.
 * Pages and the service layer import from here, never from lib/data/ directly.
 *
 * When the per-file migration is complete, only this file needs to change.
 */

export {
  slangTerms,
  getSlangBySlug,
  getAllSlang,
  getAllSlangSlugs,
  getRelatedSlang,
} from "@/lib/data/slang";
