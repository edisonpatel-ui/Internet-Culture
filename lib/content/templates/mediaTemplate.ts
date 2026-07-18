/**
 * lib/content/templates/mediaTemplate.ts
 *
 * Copy-paste templates for adding media to Internet Culture Hub articles.
 *
 * Three templates are provided:
 *   IMAGE_ARTICLE_MEDIA   — meme or creator with a strong representative image
 *   VIDEO_ARTICLE_MEDIA   — event or trend defined by a single key video
 *   MIXED_ARTICLE_MEDIA   — complete article with image + supporting images + video + reference
 *
 * Usage:
 *   1. Copy the template that best fits your article.
 *   2. Replace every "" value with real data.
 *   3. Set verified: false until you have confirmed every URL is correct.
 *   4. Set verified: true once you have opened and confirmed each URL.
 *   5. Run `npm run audit:media` to check for any remaining issues.
 *
 * RULES:
 *   - Never use placeholder or made-up URLs.
 *   - Always provide source + sourceUrl + platform + title.
 *   - Featured media drives the article card and hero image.
 *   - One featured image/gif per article is enough.
 *   - Supporting images provide additional context.
 *   - Videos appear in the gallery, not as separate sections.
 *   - Reference items appear as link cards (Know Your Meme, Wikipedia, etc.).
 */

import type { MediaItem } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1: Image-based article
// Best for: memes, creators, slang terms with a clear representative image.
// ─────────────────────────────────────────────────────────────────────────────

export const IMAGE_ARTICLE_MEDIA: MediaItem[] = [
  {
    // The single most representative image — drives card + hero.
    role: "featured",
    type: "image",
    url: "",                     // Direct image URL (must end at .jpg/.png/.gif/.webp)
    title: "",                   // Short descriptive title, e.g. "Original Doge meme — Kabosu (2010)"
    source: "",                  // Source name, e.g. "Wikimedia Commons"
    sourceUrl: "",               // Link to the source page, not the image URL itself
    platform: "wikimedia",       // One of: youtube tiktok twitter instagram reddit twitch wikimedia knowyourmeme original other
    attribution: "",             // Who to credit, e.g. "Photo by Atsuko Sato (2010)"
    license: "",                 // e.g. "CC BY-SA 4.0" or "Fair use"
    description: "",             // One sentence explaining why this image was chosen
    date: "",                    // Original date, e.g. "2010" or "2010-02-04"
    verified: false,             // Set true only after you have opened and confirmed the URL
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2: Video-based article
// Best for: events, challenges, viral moments defined by a specific video.
// ─────────────────────────────────────────────────────────────────────────────

export const VIDEO_ARTICLE_MEDIA: MediaItem[] = [
  {
    // A YouTube thumbnail makes a good featured image — use i.ytimg.com.
    // Format: https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg (not maxresdefault)
    role: "featured",
    type: "image",
    url: "",                     // YouTube thumbnail URL (hotlink-friendly, public CDN)
    title: "",                   // e.g. "Harlem Shake — original Filthy Frank video thumbnail"
    source: "",                  // e.g. "YouTube / i.ytimg.com"
    sourceUrl: "",               // YouTube video page URL
    platform: "youtube",
    attribution: "",
    description: "",
    date: "",
    verified: false,
  },
  {
    // The defining video itself.
    role: "video",
    type: "video",
    url: "",                     // Full YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    title: "",                   // e.g. "Harlem Shake (original) — Filthy Frank"
    source: "",                  // e.g. "YouTube / FilthyFrank"
    sourceUrl: "",               // Same as url
    platform: "youtube",
    attribution: "",
    description: "",             // One sentence on why this video matters
    date: "",
    verified: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3: Mixed article (full production-quality example)
// Best for: well-documented memes or events with images, videos, and references.
// ─────────────────────────────────────────────────────────────────────────────

export const MIXED_ARTICLE_MEDIA: MediaItem[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  // One item. Drives: article card thumbnail, hero image, page preview.
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

  // ── SUPPORTING ────────────────────────────────────────────────────────────
  // 1–3 additional images. Show variations, context, or cultural impact.
  {
    role: "supporting",
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

  // ── VIDEO ─────────────────────────────────────────────────────────────────
  // One embedded video. Appears in the gallery below supporting images.
  {
    role: "video",
    type: "video",
    url: "",                     // https://www.youtube.com/watch?v=VIDEO_ID
    title: "",
    source: "",
    sourceUrl: "",
    platform: "youtube",
    attribution: "",
    description: "",
    date: "",
    verified: false,
  },

  // ── REFERENCE ─────────────────────────────────────────────────────────────
  // One external reference. Appears as a link card.
  // Good sources: Know Your Meme, Wikipedia, official websites.
  {
    role: "reference",
    type: "embed",
    url: "",                     // e.g. "https://knowyourmeme.com/memes/example"
    title: "",                   // e.g. "Example — Know Your Meme"
    source: "",                  // e.g. "Know Your Meme"
    sourceUrl: "",
    platform: "knowyourmeme",
    attribution: "",
    description: "",
    date: "",
    verified: false,
  },
];
