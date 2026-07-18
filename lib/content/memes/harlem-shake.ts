import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m8",
  slug: "harlem-shake",
  title: "Harlem Shake",
  category: "meme",
  description:
    "The 30-second video format that broke YouTube in early 2013 — one person dances alone, then chaos erupts.",
  imageGradient: "from-pink-600 via-rose-500 to-red-500",
  scores: { relevance: 65, influence: 88, cringe: 50, brainrot: 60 },
  addedAt: "2026-07-16",
  views: 2100000,
  trendDirection: "declining",
  meaning:
    "A 30-second clip where one person dances alone while others ignore them, then after the beat drops, everyone erupts into chaotic dancing in costumes. The format generated millions of uploads in under two weeks.",
  origin:
    "Based on Baauer's 2013 trap track 'Harlem Shake.' YouTuber Filthy Frank and friends filmed the first viral version in February 2013. Within days the format spread to offices, gyms, universities, and military bases worldwide.",
  timeline: [
    { date: "Feb 2013", event: "Filthy Frank and friends upload the video that starts the format" },
    { date: "Feb 2013", event: "Thousands of copycat videos flood YouTube within days" },
    { date: "Feb 2013", event: "YouTube reports hundreds of millions of combined views" },
    { date: "Mid-2013", event: "Format fades as quickly as it appeared" },
  ],
  examples: [
    "Every office in the world did a Harlem Shake in 2013",
    "The Norwegian army Harlem Shake is still legendary",
    "My school's Harlem Shake was banned before it was finished",
  ],
  relatedSlugs: ["rickroll", "ice-bucket-challenge"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Video ID 8vJiSSAMNWw is the DizastaMusic channel upload — 70M+ views,
    // confirmed available. The original FilthyFrank channel video (8f7wj_RcqYk)
    // was removed when George Miller transitioned to the Joji persona.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/8vJiSSAMNWw/hqdefault.jpg",
      title: "DO THE HARLEM SHAKE (ORIGINAL) — DizastaMusic thumbnail (Feb 2013)",
      source: "YouTube / DizastaMusic (George Miller / Filthy Frank)",
      sourceUrl: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
      platform: "youtube",
      attribution: "George Miller (Filthy Frank / Joji) · Song: Baauer",
      license: "YouTube Standard License",
      description: "Thumbnail from the original Harlem Shake video that launched the viral format in February 2013, uploaded to the DizastaMusic channel.",
      date: "2013-02-02",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
      title: "DO THE HARLEM SHAKE (ORIGINAL) — DizastaMusic",
      source: "YouTube / DizastaMusic",
      sourceUrl: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
      platform: "youtube",
      attribution: "George Miller (Filthy Frank / Joji) · Song: Baauer",
      license: "YouTube Standard License",
      description: "The original Harlem Shake video by George Miller (Filthy Frank) on the DizastaMusic channel — the upload that triggered the global viral format.",
      date: "2013-02-02",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/harlem-shake",
      title: "Harlem Shake — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/harlem-shake",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Comprehensive documentation of the Harlem Shake meme including video examples and spread analysis.",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Harlem Shake — Know Your Meme",
      url: "https://knowyourmeme.com/memes/harlem-shake",
      domain: "knowyourmeme.com",
    },
    {
      title: "Harlem Shake — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Harlem_Shake_(meme)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
