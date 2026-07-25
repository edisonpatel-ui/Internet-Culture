import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m43",
  slug: "change-my-mind",
  title: "Change My Mind",
  category: "meme",
  description:
    "The folding-table sign meme — a man with coffee inviting debate under the caption 'Change My Mind.'",
  imageGradient: "from-sky-600 via-blue-500 to-cyan-400",
  scores: { relevance: 47, influence: 85, cringe: 21, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 47,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 42,
    trendingScore: 53,
    recentRevival: true,
    popularityNotes: "Status: occasionally-referenced · Relevance 47 (today's recognition, not influence) · Trending 53 (recent attention) · Recent revival signal",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=137 for “Change My Mind”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=40 prev7=25 (60%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Change”",
      "[news/recent-articles] Google News: 25 items in last 30d (40 returned) for “Change My Mind”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Change My Mind”",
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
  addedAt: "2026-07-18",
  lastUpdated: "2026-07-25",
  historicalDate: "2018-02-16",
  views: 5500000,
  trendDirection: "declining",
  tags: ["template", "debate", "2018", "crowder", "exploitable"],
  meaning:
    "An exploitable photo of a man at a campus table with a sign ending in 'Change My Mind.' Users rewrite the top line to state a hot take, joke opinion, or absurd claim — inviting mock debate.",
  origin:
    "In February 2018, Steven Crowder posted a photo from a Texas Christian University campus segment with a sign reading 'Male Privilege is a myth / Change My Mind.' The image was immediately photoshopped across Twitter and Reddit into a durable opinion template.",
  timeline: [
    { date: "Feb 2018", event: "Original Crowder campus photo posted" },
    { date: "2018", event: "Explodes as an editable sign template on Twitter/Reddit" },
    { date: "2019+", event: "Becomes a standard 'hot take' macro format" },
  ],
  examples: [
    "Sign text swapped to any niche opinion + 'Change My Mind'",
    "Used ironically for silly takes, not just political ones",
  ],
  relatedSlugs: [
    "drake-hotline-bling",
    "expanding-brain",
    "two-buttons",
    "philosoraptor",
  ],
  relationships: {
    sameFormat: ["drake-hotline-bling", "two-buttons", "expanding-brain"],
  },
  media: [
    // AI suggested — KYM Change My Mind entry icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/025/500/crowder.jpg",
      title: "Change My Mind — campus table template",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      platform: "knowyourmeme",
      attribution: "Steven Crowder photo via Know Your Meme documentation",
      description: "The defining folding-table / 'Change My Mind' sign photograph.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      title: "Steven Crowder's Change My Mind Campus Sign — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and spread of the Change My Mind template.",
      date: "2018",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Steven Crowder's Change My Mind Campus Sign — Know Your Meme",
      url: "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
