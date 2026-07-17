/**
 * lib/content — Content Architecture
 *
 * This directory is the canonical source of truth for all encyclopedia content.
 * Pages and the service layer import from category indexes here.
 * lib/data/ files are thin re-exports pointing back to lib/content/.
 *
 * Category indexes (the production API):
 *   lib/content/memes/index.ts    — 21 meme entries
 *   lib/content/slang/index.ts    — 20 slang entries
 *   lib/content/creators/index.ts — 13 creator entries
 *   lib/content/events/index.ts   — 11 event entries
 *   lib/content/trends/index.ts   — 14 trend entries
 *
 * Individual entry files (source of truth for each article):
 *   lib/content/memes/[slug].ts
 *   lib/content/slang/[slug].ts
 *   lib/content/creators/[slug].ts
 *   lib/content/events/[slug].ts
 *   lib/content/trends/[slug].ts
 *
 * To add a new article:
 *   1. Create lib/content/[category]/[slug].ts
 *   2. Import and add it to lib/content/[category]/index.ts
 *   3. Run `npm run build` to verify
 *
 * Data flow:
 *   lib/content/[category]/[slug].ts (individual entry)
 *     → lib/content/[category]/index.ts (aggregated category array)
 *       → lib/services/entries.ts (cross-collection service)
 *         → pages (consumers)
 *
 * See docs/content-guide.md for full authoring documentation.
 */

export type { ContentEntry } from "./types";
