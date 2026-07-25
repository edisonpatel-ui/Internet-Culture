import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m7",
  slug: "doge",
  title: "Doge",
  category: "meme",
  description:
    "The iconic Shiba Inu meme that defined an era — 'such wow, very internet' — and eventually inspired a cryptocurrency.",
  imageGradient: "from-yellow-400 via-amber-500 to-orange-400",
  scores: { relevance: 50, influence: 94, cringe: 21, brainrot: 51 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 50,
    currentStatus: "current",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 45,
    trendingScore: 58,
    recentRevival: false,
    popularityNotes: "Status: current · Relevance 50 (today's recognition, not influence) · Trending 58 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=16,733 for “Doge (meme)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3789 prev7=3667 (3%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Doge”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-02",
      "[news/recent-articles] Google News: 40 items in last 30d (40 returned) for “Doge”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Doge”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/remix-activity] Format/remix cue (brainrot/cringe only)",
    ],
    providersUsed: [
      "wikipedia",
      "know-your-meme",
      "dictionary",
      "news",
      "creator-pages",
      "authority-sources",
      "google-trends",
      "reddit",
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-07-25",
  views: 3800000,
  trendDirection: "stable",
  meaning:
    "A photo of Kabosu, a Shiba Inu dog, captioned with broken-English internal monologue in Comic Sans — 'such wow,' 'very internet,' 'much meme.' One of the most replicated meme formats in history.",
  origin:
    "Kabosu was photographed by owner Atsuko Sato in 2010. The image surfaced on Tumblr in 2012, then exploded on Reddit and 4chan in late 2013, spawning thousands of variations.",
  timeline: [
    { date: "2010", event: "Kabosu photographed by owner Atsuko Sato in Japan" },
    { date: "2012", event: "Image spreads on Tumblr under the 'Doge' label" },
    { date: "Oct 2013", event: "'Such wow' format peaks on Reddit — mainstream awareness" },
    { date: "Dec 2013", event: "Dogecoin cryptocurrency launched, inspired by the meme" },
    { date: "May 2024", event: "Kabosu passes away — internet mourns the original Doge" },
  ],
  examples: [
    "Such code. Very deploy. Wow.",
    "Much presentation. So slides. Very professional.",
    "Many coins. Such investment. Very to the moon.",
  ],
  relatedSlugs: [
    "rickroll",
    "nyan-cat",
    "pepe",
    "wojak",
    "loss",
    "rage-comics",
    "cheems",
    "tumblr",
  ],
  relationships: {
    sameEra: ["nyan-cat", "rage-comics"],
    sameFormat: ["pepe", "wojak", "cheems"],
    spawnedVariants: ["cheems"],
    relatedEvent: ["tumblr"],
  },
  media: [
    // ── FEATURED ─────────────────────────────────────────────────────────────
    // Drives: article card thumbnail, hero image, page preview.
    // Human-verified stable Wikimedia URL.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
      title: "Original Doge meme — Kabosu (2010)",
      source: "Wikimedia / Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Original_Doge_meme.jpg",
      platform: "wikimedia",
      attribution: "Photo by Atsuko Sato (2010)",
      license: "Fair use",
      description:
        "The original Kabosu photo by Atsuko Sato — the sideways-glancing Shiba Inu shot in 2010 that became one of the most replicated meme formats in internet history.",
      date: "2010",
      verified: true,
    },

    // ── SUPPORTING ────────────────────────────────────────────────────────────
    // Appears in the gallery beneath the hero. Shows additional context
    // about Kabosu's life and cultural legacy.

    // Kabosu held by owner Atsuko Sato at her 18th birthday celebration —
    // Doge Day event at Furusato Square Park, Sakura, Japan. November 2, 2023.
    // Direct full-file URL (hash c/cb, 2,281 × 2,281 px, 746 KB, image/jpeg).
    // Full-file URL avoids the Commons thumbnail CDN which blocks external Referers.
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Kabosu_and_Atsuko_Sato_2023-11-02_(1).jpg",
      title: "Kabosu with owner Atsuko Sato — 18th birthday celebration (November 2023)",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kabosu_and_Atsuko_Sato_2023-11-02_(1).jpg",
      platform: "wikimedia",
      attribution: "Asanagi (CC BY-SA 4.0)",
      license: "CC BY-SA 4.0",
      description:
        "Kabosu held by her owner Atsuko Sato at the Doge Day event celebrating her 18th birthday in Furusato Square Park, Sakura, Japan — six months before her passing in May 2024.",
      date: "2023-11-02",
      verified: true,
    },

    // Kabosu and Atsuko Sato at the Kabosu monument unveiling, Furusato Square Park.
    // November 2, 2023.
    // Direct full-file URL (hash 7/75, 2,494 × 2,494 px, 710 KB, image/jpeg).
    // No parentheses in filename — no URL-encoding ambiguity.
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/75/Kabosu_and_Atsuko_Sato_sitting_on_the_monument_of_Kabosu_2023-11-02.jpg",
      title: "Kabosu monument unveiling — Atsuko Sato, Sakura, Chiba (November 2023)",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kabosu_and_Atsuko_Sato_sitting_on_the_monument_of_Kabosu_2023-11-02.jpg",
      platform: "wikimedia",
      attribution: "Asanagi (CC BY-SA 4.0)",
      license: "CC BY-SA 4.0",
      description:
        "Kabosu and owner Atsuko Sato at the unveiling of the bronze Kabosu monument in Furusato Square Park, Sakura, Chiba, Japan — November 2, 2023.",
      date: "2023-11-02",
      verified: true,
    },

    // ── VIDEO ─────────────────────────────────────────────────────────────────
    // Appears in the gallery video section as an embedded YouTube iframe.
    // Video ID Yj7ja6BANLM confirmed: "What is Doge?" by Behind The Meme,
    // 2.9M views, published August 28, 2016 — dedicated Doge meme history video.
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=Yj7ja6BANLM",
      title: "What is Doge? The history and origin of the dog meme explained — Behind The Meme",
      source: "YouTube / Behind The Meme",
      sourceUrl: "https://www.youtube.com/watch?v=Yj7ja6BANLM",
      platform: "youtube",
      attribution: "Behind The Meme",
      description:
        "A 4-minute explainer on the full history of the Doge meme: Atsuko Sato's 2010 blog post, the 2013 Reddit explosion, Dogecoin's launch, and the meme's lasting cultural footprint. 2.9M views.",
      date: "2016-08-28",
      verified: true,
    },

    // ── REFERENCE ─────────────────────────────────────────────────────────────
    // Appears as a link card. Primary editorial source for Doge documentation.
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/doge",
      title: "Doge — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/doge",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Comprehensive Doge documentation including format history, sub-variations, spread analysis, and cultural impact across social platforms.",
      date: "2010",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Doge — Know Your Meme",
      url: "https://knowyourmeme.com/memes/doge",
      domain: "knowyourmeme.com",
    },
    {
      title: "Doge — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Doge_(meme)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
