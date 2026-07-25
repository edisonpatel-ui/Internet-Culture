import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m4",
  slug: "distorted-meme-face",
  title: "Distorted Meme Face",
  category: "meme",
  description:
    "Deep-fried, stretched reaction faces used to convey unhinged emotional responses.",
  imageGradient: "from-purple-600 via-violet-500 to-fuchsia-400",
  scores: { relevance: 34, influence: 70, cringe: 21, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 34,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 39,
    trendingScore: 27,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 34 (today's recognition, not influence) · Trending 27 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=16,889 for “List of Internet phenomena”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3790 prev7=3720 (2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Distorted”",
      "[news/recent-articles] Google News: 1 items in last 30d (40 returned) for “Distorted Meme Face”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Distorted Meme Face”",
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
  addedAt: "2026-06-22",
  lastUpdated: "2026-07-25",
  views: 180000,
  trendDirection: "declining",
  meaning:
    "An exaggerated, warped facial expression edited onto reaction memes to signal chaos or disbelief.",
  origin:
    "Evolved from deep-fried meme culture on Reddit and Instagram meme pages in the late 2010s.",
  timeline: [
    { date: "2018", event: "Deep-fried meme era on r/deepfriedmemes" },
    { date: "2022", event: "TikTok distortion filters revive format" },
    { date: "2026", event: "Still used in ironic reaction edits" },
  ],
  examples: [
    "Me when the professor says 'pop quiz' [distorted face]",
    "That face when you Fanum tax the wrong person",
  ],
  relatedSlugs: ["wojak", "rage-comics"],
  media: [
    // AI suggested — KYM deep-fried memes banner; human must verify and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/022/254/deep_fried_memes_banner.jpg",
      title: "Deep-fried / distorted meme face aesthetic",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/deep-fried-memes",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Representative deep-fried meme collage showing the blown-out, distorted reaction-face look.",
      date: "2017",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/deep-fried-memes",
      title: "Deep Fried Memes — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/deep-fried-memes",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Documentation of deep-fried / distorted reaction-face meme aesthetics.",
      date: "2017",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Deep Fried Memes — Know Your Meme",
      url: "https://knowyourmeme.com/memes/deep-fried-memes",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
