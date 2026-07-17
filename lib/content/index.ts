// Content registry — future per-file content system
// These entries are ALSO present in lib/data/ — no deduplication yet
// Do not use this index in production pages until migration is complete

import sayWallahibro from "./memes/say-wallahi-bro";
import doge from "./memes/doge";
import ishowspeed from "./creators/ishowspeed";

export const contentRegistry = [sayWallahibro, doge, ishowspeed] as const;

export function getContentBySlug(slug: string) {
  return contentRegistry.find((e) => e.slug === slug);
}
