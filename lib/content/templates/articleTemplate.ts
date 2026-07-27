/**
 * lib/content/templates/articleTemplate.ts
 *
 * Complete article templates for every content category in Internet Culture Hub.
 *
 * Canonical structure (validators enforce): lib/content/standards/articleSpec.ts
 * Sections: Identity → Quick Overview → History → Cultural Context →
 * Spread & Ecosystem → Examples → Media → References → Metadata → SEO
 * Run `npm run validate` for quality scores + soft warnings before publish.
 *
 * Five templates are exported:
 *   MEME_TEMPLATE     — for meme articles
 *   CREATOR_TEMPLATE  — for creator articles
 *   EVENT_TEMPLATE    — for event articles
 *   TREND_TEMPLATE    — for trend articles
 *   SLANG_TEMPLATE    — for slang/term articles
 *
 * HOW TO USE
 * ──────────
 * 1. Copy the template that matches your article category.
 * 2. Rename the exported constant to a descriptive name, e.g. `dogeEntry`.
 * 3. Fill in every field marked with a comment explaining the expected value.
 * 4. For media items:
 *    - Never invent URLs. Every URL must be opened and confirmed.
 *    - Set verified: false while researching.
 *    - Set verified: true only after you have confirmed the URL loads the correct image.
 *    - Run `npm run audit:media` after filling in media fields.
 * 5. Add the new entry to the appropriate index file:
 *    - lib/content/memes/index.ts
 *    - lib/content/creators/index.ts
 *    - lib/content/events/index.ts
 *    - lib/content/trends/index.ts
 *    - lib/content/slang/index.ts
 *
 * MEDIA RULES BY CATEGORY
 * ───────────────────────
 *  Memes:    Featured image required if the meme is visually defined (Doge, Pepe).
 *            Gradient fallback acceptable for abstract or text memes.
 *  Creators: Featured image strongly recommended — use Wikimedia Commons CC photo.
 *            Reference to their main channel is helpful.
 *  Events:   Featured image of the event moment. Video if one defined the event.
 *  Trends:   Image only when the aesthetic is the point (brat summer, old money).
 *            Most trends are fine with gradient fallback.
 *  Slang:    Image almost never needed. Only add media if a specific image or clip
 *            directly explains the term's origin.
 *
 * SOURCE PRIORITY
 * ───────────────
 * 1. Wikimedia Commons with CC license (preferred — stable, licensed, hotlink-safe)
 * 2. YouTube thumbnail CDN: https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg
 *    (use hqdefault — maxresdefault is often 404; verify via oembed for videos)
 * 3. Official uploads that grant permission
 * 4. Nothing — gradient fallback is fine; never use unlicensed or uncertain sources.
 *
 * NEVER USE
 * ─────────
 * - Google Images or search result URLs
 * - Instagram, TikTok, or Twitter media URLs (hotlink-blocked, unstable)
 * - Article pages or HTML pages (must serve a direct image file)
 * - Unofficial reposts or watermarked screenshots
 * - Wikimedia /thumb/ CDN paths — use direct full-file URLs instead
 *
 * FEATURED MEDIA PIPELINE
 * ───────────────────────
 * role:"featured" image/gif → cards, detail hero, search, related, Open Graph.
 * Supporting/gallery images never substitute for the hero.
 *
 * CATEGORY QUALITY (see docs/CATEGORY_STANDARDS.md)
 * ─────────────────────────────────────────────────
 *  Memes:    definition, origin, format/template, spread, cultural impact
 *  Slang:    primary meaning first, origin, usage examples, communities
 *  Creators: rise, platforms, major cultural moments, influence
 *  Events:   timeline, why it mattered, cultural impact
 *  Trends:   what changed culturally, why it spread, related movements
 * Do not invent fields that are not historically relevant.
 *
 * ENCYCLOPEDIA PROSE (see docs/EDITORIAL_STYLE_GUIDE.md)
 * ──────────────────────────────────────────────────────
 * Teach over list. Body fields should jointly answer:
 *   what it is → why people cared → why it spread → why remembered → influence
 * Add internet-environment context and concrete examples; explain history
 * instead of assuming it. Fields should read as one story, not disconnected boxes.
 *
 * RELATIONSHIPS
 * ─────────────
 * Prefer typed `relationships` (origin / creator / format / community)
 * over filler relatedSlugs. Avoid same-category padding.
 * Quality review: npm run audit:quality
 */

import type {
  BaseEntry,
  MemeEntry,
  CreatorEntry,
  EventEntry,
  SlangEntry,
} from "@/types";
// Note: Trend articles use BaseEntry directly — no dedicated TrendEntry type exists.
// All trend files in lib/content/trends/ use `BaseEntry` and `category: "trend"`.

// ─────────────────────────────────────────────────────────────────────────────
// MEME TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const MEME_TEMPLATE: MemeEntry = {
  // ── Required base fields ───────────────────────────────────────────────────
  id: "m??",                          // Unique sequential meme ID, e.g. "m20"
  slug: "example-meme",               // URL-safe slug — must be unique across all entries
  title: "Example Meme",             // Display name
  category: "meme",
  description: "",                    // Card hook (~15–20 words): what it is + recognition, not a dictionary line
  imageGradient: "from-purple-500 via-pink-500 to-fuchsia-400",
                                      // Tailwind gradient — shown when no featured image
  scores: {
    relevance: 80,                    // 0–100: how culturally current
    influence: 70,                    // 0–100: lasting cultural footprint
    cringe: 30,                       // 0–100: perceived online cringe
    brainrot: 50,                     // 0–100: absurdity / chaos level
  },
  addedAt: "2026-07-17",             // ISO date this entry was added
  historicalDate: "YYYY-MM-DD",       // When the meme actually emerged (approximate is fine)
  views: 1000000,                     // Approximate total views/searches (rough estimate)
  trendDirection: "stable",           // "rising" | "stable" | "declining"
  tags: [],                           // Relevant tags for search and filtering

  // ── Meme-specific fields ───────────────────────────────────────────────────
  meaning: "",                        // What it is + why people use/care (teach first, then nuance)
  origin: "",                         // Where/when it started + internet environment + why it spread then
  timeline: [
    // { date: "Jan 2020", event: "First posted on Reddit /r/..." },
    // { date: "Mar 2020", event: "Went mainstream via Twitter..." },
  ],
  examples: [
    // Real-world usage examples showing how the meme appears in the wild
    // "Example of how someone would actually use this meme",
  ],
  relatedSlugs: [],                   // Editorial shortcuts — prefer relationships when known
  // relationships: {
  //   originatedFrom: [],            // where this came from
  //   popularizedBy: [],             // creators / platforms that spread it
  //   sameFormat: [],                // same template / format family
  //   spawnedVariants: [],           // later variants
  //   relatedSlang: [],
  //   relatedEvent: [],
  // },

  // ── Cultural intelligence (optional — Phase 7, internal only) ─────────────
  // Prefer lib/intelligence/registry.ts seeds unless you are already editing this file.
  // See docs/INTELLIGENCE_DATA_MODEL.md — do not invent platforms/eras.
  // intelligence: {
  //   era: ["short-form"],
  //   originPlatform: "tiktok",
  //   culturalCategory: ["meme"],
  //   audience: ["gen-z"],
  //   formatType: "video-meme",
  //   signals: ["Short-form video"],
  // },

  // ── Media ─────────────────────────────────────────────────────────────────
  // For visual memes: include at least a featured image.
  // For abstract or text memes: omit the media array entirely (gradient fallback).
  media: [
    {
      role: "featured",               // Controls placement: featured | supporting | video | reference
      type: "image",                  // Type: image | gif | video | embed
      url: "",                        // Direct image URL — must serve image/jpeg, png, gif, or webp
      title: "",                      // Short descriptive title
      source: "",                     // Where it came from, e.g. "Wikimedia Commons"
      sourceUrl: "",                  // Link to the source PAGE (not the image URL)
      platform: "wikimedia",          // youtube | wikimedia | knowyourmeme | original | other
      attribution: "",                // Who to credit
      license: "",                    // e.g. "CC BY-SA 4.0" or "YouTube Standard License"
      description: "",                // One sentence on why this image was chosen
      date: "",                       // Original date of the image
      verified: false,                // true only after confirming URL serves the correct image
    },
  ],

  // ── Sources (public-facing) ────────────────────────────────────────────────
  // Prefer Wikipedia, news, official sites, Wiktionary, YouTube.
  // Know Your Meme may be used for INTERNAL research only — do NOT list KYM
  // in this sources array (competitor; never show in public Sources UI).
  sources: [
    // { title: "Example Meme — Wikipedia", url: "https://en.wikipedia.org/wiki/...", domain: "en.wikipedia.org" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CREATOR TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const CREATOR_TEMPLATE: CreatorEntry = {
  // ── Required base fields ───────────────────────────────────────────────────
  id: "cr??",                         // Unique sequential creator ID, e.g. "cr14"
  slug: "creator-slug",
  title: "Creator Name",
  category: "creator",
  personType: "Creator",
  description: "",                    // 1–2 sentences — what makes this person significant
  imageGradient: "from-blue-500 via-cyan-400 to-sky-400",
  scores: {
    relevance: 85,
    influence: 80,
    cringe: 25,
    brainrot: 40,
  },
  addedAt: "2026-07-17",
  views: 500000,
  trendDirection: "stable",
  tags: [],

  // ── Creator-specific fields ────────────────────────────────────────────────
  careerStart: "YYYY",               // Year they began creating content
  platforms: [
    // { platform: "youtube", handle: "CreatorName", url: "https://www.youtube.com/@CreatorName" },
    // { platform: "twitch", handle: "CreatorName", url: "https://www.twitch.tv/creatorname" },
  ],
  followers: {
    // youtube: "~10M+",
    // twitch: "~5M+",
  },
  notableMoments: [
    // "Brief description of a defining moment in their career",
    // "Another notable moment or achievement",
  ],
  relatedSlugs: [],

  // ── Media ─────────────────────────────────────────────────────────────────
  // Creator articles strongly benefit from a featured photo.
  // Priority: Wikimedia Commons CC-licensed photo > YouTube thumbnail > nothing.
  // Do NOT use Instagram/Twitter/TikTok — hotlink-blocked and unstable.
  media: [
    {
      role: "featured",
      type: "image",
      url: "",                        // Wikimedia Commons direct URL or YouTube thumbnail CDN
      title: "",
      source: "",                     // e.g. "Wikimedia Commons / VidCon 2022"
      sourceUrl: "",                  // Wikimedia Commons file page URL
      platform: "wikimedia",
      attribution: "",                // Photographer and license, e.g. "Jane Doe (CC BY 2.0)"
      license: "",                    // e.g. "CC BY 2.0"
      description: "",
      date: "",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "",                        // Their main channel URL
      title: "",                      // e.g. "CreatorName — YouTube Channel"
      source: "",
      sourceUrl: "",
      platform: "youtube",
      attribution: "",
      description: "",
      verified: false,
    },
  ],

  // ── Sources ────────────────────────────────────────────────────────────────
  sources: [
    // { title: "CreatorName — YouTube", url: "https://www.youtube.com/@CreatorName", domain: "youtube.com" },
    // { title: "CreatorName — Wikipedia", url: "https://en.wikipedia.org/wiki/...", domain: "en.wikipedia.org" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EVENT TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const EVENT_TEMPLATE: EventEntry = {
  // ── Required base fields ───────────────────────────────────────────────────
  id: "e??",                          // Unique sequential event ID, e.g. "e10"
  slug: "event-slug",
  title: "Event Name",
  category: "event",
  description: "",                    // What happened + why people cared (plain language)
  imageGradient: "from-sky-400 via-blue-500 to-indigo-600",
  scores: {
    relevance: 75,
    influence: 70,
    cringe: 20,
    brainrot: 30,
  },
  addedAt: "2026-07-17",
  historicalDate: "YYYY-MM-DD",
  views: 2000000,
  trendDirection: "declining",
  tags: [],

  // ── Event-specific fields ──────────────────────────────────────────────────
  platform: "YouTube, Twitter",       // Where the event primarily happened
  impact: "",                         // Why remembered + influence + current relevance (concrete, no hype)
  highlights: [
    // "Key moment or stat that defines the event",
    // "Another important highlight",
  ],
  relatedSlugs: [],

  // ── Media ─────────────────────────────────────────────────────────────────
  // Events benefit from a featured image of the defining moment.
  // For video-defined events: use a YouTube thumbnail as the featured image,
  // then include the video itself as a video role item.
  media: [
    {
      role: "featured",
      type: "image",
      url: "",
      title: "",
      source: "",
      sourceUrl: "",
      platform: "wikimedia",
      attribution: "",
      license: "",
      description: "",
      date: "",
      verified: false,
    },
    {
      role: "video",
      type: "video",
      url: "",                        // https://www.youtube.com/watch?v=VIDEO_ID
      title: "",
      source: "",
      sourceUrl: "",
      platform: "youtube",
      attribution: "",
      description: "",
      date: "",
      verified: false,
    },
  ],

  // ── Sources (never list Know Your Meme publicly) ───────────────────────────
  sources: [
    // { title: "Event Name — Wikipedia", url: "https://en.wikipedia.org/wiki/...", domain: "en.wikipedia.org" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TREND TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

// Trend articles use BaseEntry — no dedicated TrendEntry exists.
// The trend category is a loose aggregation of cultural moments; most trend
// articles only need the core BaseEntry fields (no category-specific extensions).
export const TREND_TEMPLATE: BaseEntry = {
  // ── Required base fields ───────────────────────────────────────────────────
  id: "t??",                          // Unique sequential trend ID, e.g. "t10"
  slug: "trend-slug",
  title: "Trend Name",
  category: "trend",
  description: "",
  imageGradient: "from-green-400 via-emerald-500 to-teal-500",
  scores: {
    relevance: 70,
    influence: 55,
    cringe: 35,
    brainrot: 45,
  },
  addedAt: "2026-07-17",
  views: 800000,
  trendDirection: "rising",
  tags: [],

  // ── Optional trend context (stored in BaseEntry.origin / BaseEntry.summary) ──
  origin: "",                         // Platform, community, or moment where this trend started
  // Note: BaseEntry does NOT have howToParticipate or platforms fields.
  // Describe participation instructions in `description` or `summary`.
  // List main platforms (TikTok, Instagram, Twitter) in `description` or `tags`.

  relatedSlugs: [],

  // ── Media ─────────────────────────────────────────────────────────────────
  // Most trends do NOT need media — gradient fallback is fine for abstract concepts.
  // Only add media if the trend has a strong visual identity (brat green, old money).
  // If adding media, follow the same rules as meme articles.

  // ── Sources ────────────────────────────────────────────────────────────────
  sources: [
    // { title: "Trend Name — Wikipedia", url: "...", domain: "en.wikipedia.org" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SLANG TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const SLANG_TEMPLATE: SlangEntry = {
  // ── Required base fields ───────────────────────────────────────────────────
  id: "s??",                          // Unique sequential slang ID, e.g. "s25"
  slug: "term",
  title: "Term",
  category: "slang",
  description: "",                    // 1 sentence — what the term means in internet culture
  imageGradient: "from-slate-600 via-gray-500 to-zinc-600",
  scores: {
    relevance: 75,
    influence: 60,
    cringe: 25,
    brainrot: 60,
  },
  addedAt: "2026-07-17",
  views: 300000,
  trendDirection: "stable",
  tags: [],

  // ── Slang-specific fields ──────────────────────────────────────────────────
  // Note: SlangEntry does NOT have a partOfSpeech field. Describe the part of
  // speech (noun, verb, etc.) inside the `definition` field if needed.
  // Lead with the PRIMARY internet meaning, then nuance / irony.
  definition: "",                    // What it is + why people use it (teach first), then nuance
  usageExamples: [
    // Show REAL usage — how it appears in the wild, not a textbook example
    // 'Context: a friend just told an amazing story → "That story is mid tbh"',
  ],
  origin: "",                        // Who/where/when + community context + why it spread then
  relatedSlugs: [],
  // relationships: { community: [], relatedSlang: [], popularizedBy: [] },

  // ── Media ─────────────────────────────────────────────────────────────────
  // Slang articles almost NEVER need media.
  // Only add media if a specific visual directly explains the term's origin
  // (e.g., haram-ball is a visual character — the image IS the content).
  // For most slang: no media array at all, gradient fallback is correct.

  // ── Sources (never list Know Your Meme publicly) ───────────────────────────
  sources: [
    // { title: "Term — Wiktionary", url: "https://en.wiktionary.org/wiki/...", domain: "en.wiktionary.org" },
    // { title: "Term — Urban Dictionary", url: "https://www.urbandictionary.com/...", domain: "urbandictionary.com" },
  ],
};
