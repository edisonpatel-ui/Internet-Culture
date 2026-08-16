import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m5",
  slug: "npc-streaming",
  title: "NPC Streaming",
  category: "meme",
  description:
    "A TikTok LIVE gift-economy format where streamers loop robotic catchphrases and movements like video-game NPCs — popularized in 2023 by creators such as PinkyDoll.",
  imageGradient: "from-zinc-500 via-slate-400 to-gray-300",
  scores: { relevance: 37, influence: 74, cringe: 21, brainrot: 95 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 37,
    currentStatus: "classic",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 34,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “NPC Streaming”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=7,032 for “NPC (meme)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1626 prev7=1845 (-12%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “NPC”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-04-21",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “NPC Streaming”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “NPC Streaming”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/title absurdity cue (brainrot character only)",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (36) with AI double-check (38): Moderate wiki pageviews and documentation indicate niche awareness, but low news coverage and Google Trends suggest limited mainstream popularity.",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “NPC Streaming”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-04",
  lastUpdated: "2026-08-16",
  views: 440000,
  trendDirection: "stable",
  tags: ["tiktok", "streaming", "brainrot", "gen alpha", "live", "npc"],
  meaning:
    "Performers act like video game NPCs — looping catchphrases ('gang gang', 'ice cream so good') when viewers send gifts. Distinct from the slang insult 'NPC,' though both share the idea of scripted, non-autonomous behavior.",
  origin:
    "Emerged from TikTok LIVE's gift economy, where viewers send virtual gifts that trigger performer reactions. Streamers began looping exaggerated, robotic catchphrases and movements when gifts arrived — mimicking video game non-player characters (NPCs). Canadian creator PinkyDoll became the most widely covered NPC streamer in 2023, known for phrases like 'ice cream so good' and 'gang gang.'",
  timeline: [
    { date: "2023", event: "NPC-style streams emerge on TikTok LIVE" },
    { date: "Mid-2023", event: "PinkyDoll and other NPC streamers go viral — mainstream news coverage follows" },
    { date: "2024–2025", event: "Format spreads to parodies, gaming references, and meme culture broadly" },
  ],
  examples: [
    "Ice cream so good — I can't stop watching NPC streams",
    "Bro turned into an NPC after 3 Red Bulls",
    "Gang gang [activated by TikTok gift]",
  ],
  relatedSlugs: ["npc", "brainrot", "skibidi-toilet", "tiktok-rise", "wojak"],
  relationships: {
    relatedSlang: ["npc", "brainrot"],
    relatedEvent: ["tiktok-rise"],
    relatedTo: ["skibidi-toilet", "wojak"],
  },
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: PinkyDoll / TikTok LIVE NPC streamer still ("ice cream so good"
  // robotic performance). Demoted NPC Wojak from featured — it named the vibe
  // (2016 board meme) but is NOT the 2023 streaming format users expect.
  // Sources checked: Wikimedia/Wikipedia (no PinkyDoll), Know Your Meme (docs),
  // YouTube oembed (no stable official PinkyDoll upload found), TikTok CDN
  // forbidden. Substitutes (NPC Wojak, generic Twitch overlay) misrepresent the
  // topic as Wojak memes or generic streaming.
  media: [
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/1/1b/NPC_wojak_meme.png",
      title: "NPC Wojak — etymology of the 'NPC' label (not the stream format)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:NPC_wojak_meme.png",
      platform: "wikimedia",
      attribution: "Unknown (fair use for identification)",
      license: "Fair use",
      description:
        "Blank-stare NPC Wojak that named the format — supporting context only, not the TikTok LIVE defining visual.",
      date: "2016",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/npc-streaming",
      title: "NPC Streaming — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/npc-streaming",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of TikTok LIVE NPC streamers and the PinkyDoll era.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Pinkydoll — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Pinkydoll",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
