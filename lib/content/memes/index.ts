/**
 * Meme content layer — public interface for all meme entries.
 *
 * lib/data/memes.ts is the current implementation source.
 * Individual per-file entries (doge.ts, say-wallahi-bro.ts) are proof-of-concept
 * for a future per-file migration. Pages and the service layer import from here,
 * never from lib/data/ directly.
 *
 * When the per-file migration is complete, only this file needs to change.
 */

export {
  memes,
  getMemeBySlug,
  getAllMemes,
  getAllMemeSlugs,
  getRelatedMemes,
} from "@/lib/data/memes";
