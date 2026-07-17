/**
 * lib/content — Content Architecture
 *
 * This directory is the public interface for all encyclopedia content.
 * Pages and the service layer import from here, never from lib/data/ directly.
 *
 * Category indexes (the production API):
 *   lib/content/memes/index.ts    — all meme entries
 *   lib/content/slang/index.ts    — all slang entries
 *   lib/content/creators/index.ts — all creator entries
 *   lib/content/events/index.ts   — all event entries
 *   lib/content/trends/index.ts   — all trend entries
 *
 * Individual entry files (proof-of-concept for future per-file migration):
 *   lib/content/memes/doge.ts
 *   lib/content/memes/say-wallahi-bro.ts
 *   lib/content/creators/ishowspeed.ts
 *
 * Future architecture:
 *   When there are thousands of entries, the category indexes will import
 *   from individual entry files instead of lib/data/. Pages never change.
 *   A database integration would only update the category index files.
 *
 * Data flow:
 *   lib/data/[category].ts (implementation)
 *     → lib/content/[category]/index.ts (public interface)
 *       → lib/services/entries.ts (cross-collection service)
 *         → pages (consumers)
 */

import sayWallahibro from "./memes/say-wallahi-bro";
import doge from "./memes/doge";
import ishowspeed from "./creators/ishowspeed";

/**
 * contentRegistry — individual per-file entries for proof-of-concept.
 * Not used in production pages. For production access, import from the
 * category indexes (lib/content/memes, etc.) or lib/services/entries.
 */
export const contentRegistry = [sayWallahibro, doge, ishowspeed] as const;

export function getContentBySlug(slug: string) {
  return contentRegistry.find((e) => e.slug === slug);
}
