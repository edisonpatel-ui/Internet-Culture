import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m37",
  slug: "one-does-not-simply",
  title: "One Does Not Simply",
  category: "meme",
  description:
    "Boromir's 'One does not simply walk into Mordor' line — the image macro that turns any difficult task into a Lord of the Rings punchline.",
  imageGradient: "from-amber-800 via-stone-700 to-neutral-800",
  scores: { relevance: 39, influence: 70, cringe: 21, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 39,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 38,
    trendingScore: 41,
    recentRevival: false,
    popularityNotes: "Status: classic · Relevance 39 (today's recognition, not influence) · Trending 41 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=16,733 for “Doge (meme)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3789 prev7=3667 (3%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “One”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-09-03",
      "[news/recent-articles] Google News: 8 items in last 30d (40 returned) for “One Does Not Simply”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “One Does Not Simply”",
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
  addedAt: "2026-07-17",
  lastUpdated: "2026-07-25",
  historicalDate: "2011-01-01",
  views: 4800000,
  trendDirection: "declining",
  tags: ["lotr", "boromir", "advice-animal", "classic", "movie", "2011"],
  meaning:
    "An image macro of Boromir (Sean Bean) from The Lord of the Rings, captioned 'One does not simply…' followed by any hard, foolish, or oversimplified task — from dating to installing software.",
  origin:
    "The line comes from Peter Jackson's The Fellowship of the Ring (2001), spoken by Sean Bean as Boromir in the Council of Elrond. Around 2011 it became a massively popular image-macro template on Reddit and meme generators, with the still of Boromir gesturing at the map paired with endless 'One does not simply X' captions.",
  timeline: [
    { date: "2001", event: "Boromir delivers the line in The Fellowship of the Ring" },
    { date: "2011", event: "Image-macro format explodes on Reddit and meme generators" },
    { date: "2010s", event: "Becomes one of the most reused movie-dialogue meme templates" },
    { date: "2016+", event: "Parodied by brands and public agencies (e.g. safety campaigns)" },
  ],
  examples: [
    "One does not simply leave the group chat",
    "One does not simply explain blockchain at Thanksgiving",
    "One does not simply update Java without breaking everything",
  ],
  relatedSlugs: ["philosoraptor", "bad-luck-brian", "rickroll"],
  media: [
    // AI suggested — Boromir movie-macro still (not Oregon DOT PSA); human must verify and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/000/143/493654d6ef.jpg",
      title: "One Does Not Simply — Boromir image macro",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
      platform: "knowyourmeme",
      attribution: "New Line Cinema still via Know Your Meme documentation",
      description:
        "Sean Bean as Boromir in the Council of Elrond still used for the 'One does not simply…' macro.",
      date: "2011",
      verified: false,
    },
    // AI suggested — human must verify URL and set verified: true
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/LOTR_Memes_Boromir_%2832350663164%29.jpg",
      title: "Oregon DOT 'One does not simply' public-service meme graphic",
      source: "Wikimedia Commons / Oregon Department of Transportation",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:LOTR_Memes_Boromir_(32350663164).jpg",
      platform: "wikimedia",
      attribution: "Oregon DOT (CC BY 2.0)",
      license: "CC BY 2.0",
      description:
        "Government PSA riffing on the Boromir macro — shows cultural reach, not the original template.",
      date: "2013",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
      title: "One Does Not Simply Walk into Mordor — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the Boromir quote macro and its caption variants.",
      date: "2011",
      verified: true,
    },
  ],
  sources: [
    {
      title: "One Does Not Simply Walk into Mordor — Know Your Meme",
      url: "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
