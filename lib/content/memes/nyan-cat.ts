import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m13",
  slug: "nyan-cat",
  title: "Nyan Cat",
  category: "meme",
  description:
    "A pixelated cat with a Pop-Tart body flying through space leaving a rainbow trail — pure early-internet whimsy.",
  imageGradient: "from-purple-500 via-pink-500 to-fuchsia-400",
  scores: { relevance: 41, influence: 84, cringe: 21, brainrot: 58 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 41,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 32,
    trendingScore: 41,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Nyan Cat”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=13,375 for “Nyan Cat”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3217 prev7=3194 (1%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Nyan”",
      "[news/recent-articles] Google News: 3 items in last 60d (40 returned) for “Nyan Cat”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Nyan Cat”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (44) with AI double-check (38): Modest niche interest (13k Wikipedia views) but flat trends, few news mentions and low Google‑Trends activity indicate popularity below the heuristic’s 44",
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
    scoreReasons: {
      relevance: "Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Nyan Cat”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  historicalDate: "2011-04-02",
  views: 3100000,
  trendDirection: "stable",
  tags: ["classic", "youtube", "cat", "animation", "animals", "music"],
  meaning:
    "An animated GIF of a grey cat with a Pop-Tart body flying through space, trailing a rainbow, set to the Japanese song 'Nyanyanyanyanyanyanya!' by daniwell. Represents peak early-internet absurdist joy.",
  origin:
    "Created by artist Chris Torres (prguitarman) and posted on April 2, 2011. YouTube user saraj00n combined the animation with daniwellP's Japanese song 'Nyanyanyanyanyanyanya!' The resulting video went globally viral within days; Wikipedia notes tens of millions of views within weeks. In February 2021 Torres sold the original Nyan Cat GIF as an NFT for about 300 ETH (~$590,000 at the time), a landmark early-NFT art sale.",
  timeline: [
    { date: "Apr 2, 2011", event: "Chris Torres posts the original Nyan Cat GIF" },
    {
      date: "Apr 2011",
      event: "YouTube video combining the GIF with daniwell's song goes viral worldwide",
    },
    { date: "2011", event: "Tens of millions of YouTube views accumulated within weeks" },
    {
      date: "Feb 2021",
      event: "Torres sells the original Nyan Cat as an NFT for approximately 300 ETH",
    },
  ],
  examples: [
    "I left Nyan Cat looping in a browser tab for ten hours.",
    "Nyan nyan nyan — that earworm never leaves.",
    "Did you know the original Nyan Cat GIF sold as an NFT for hundreds of thousands of dollars?",
  ],
  relatedSlugs: ["keyboard-cat", "doge"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Original saraj00n upload (QH2-TGUlwu4) was made private in November 2023.
    // The official NyanCat channel (2yJgwwDcgV8) is the current canonical upload.
    // hqdefault confirmed 200; maxresdefault is 404 for this video (kids-flagged).
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/2yJgwwDcgV8/hqdefault.jpg",
      title: "Nyan Cat! [Official] — NyanCat channel thumbnail (2011)",
      source: "YouTube / NyanCat (official channel)",
      sourceUrl: "https://www.youtube.com/watch?v=2yJgwwDcgV8",
      platform: "youtube",
      attribution: "Animation: Chris Torres (prguitarman) · Music: daniwell",
      license: "YouTube Standard License",
      description: "Thumbnail from the official NyanCat YouTube channel upload — the Pop-Tart cat flying through space with a rainbow trail, set to daniwell's Nyanyanya.",
      date: "2011-04-12",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    // Original saraj00n video (QH2-TGUlwu4) moved to official NyanCat channel
    // in November 2023. Current canonical video: 2yJgwwDcgV8 (26M+ views).
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=2yJgwwDcgV8",
      title: "Nyan Cat! [Official] — NyanCat",
      source: "YouTube / NyanCat (official channel)",
      sourceUrl: "https://www.youtube.com/watch?v=2yJgwwDcgV8",
      platform: "youtube",
      attribution: "Animation: Chris Torres (prguitarman) · Music: daniwell",
      license: "YouTube Standard License",
      description: "The official Nyan Cat video on the NyanCat YouTube channel — the canonical home of the original Pop-Tart cat animation since the saraj00n channel video was moved in November 2023. 26M+ views.",
      date: "2011-04-12",
      tags: ["original", "official"],
      verified: true,
    },
  ],
  sources: [
    {
      title: "Nyan Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Nyan_Cat",
      domain: "en.wikipedia.org",
    },
    {
      title: "Nyan Cat — original site by Chris Torres",
      url: "https://www.nyan.cat",
      domain: "nyan.cat",
    },
  ],
};

export default entry;
