import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m8",
  slug: "harlem-shake",
  title: "Harlem Shake",
  category: "meme",
  description:
    "The 30-second video format that broke YouTube in early 2013 — one person dances alone, then chaos erupts.",
  imageGradient: "from-pink-600 via-rose-500 to-red-500",
  scores: { relevance: 65, brainrot: 60, cringe: 50 },
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
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/8f7wj_RcqYk/hqdefault.jpg",
      title: "Harlem Shake — Filthy Frank's original video thumbnail (Feb 2013)",
      source: "YouTube / Filthy Frank",
      sourceUrl: "https://www.youtube.com/watch?v=8f7wj_RcqYk",
      platform: "youtube",
      attribution: "Filthy Frank (George Miller)",
      description: "Thumbnail from the video that launched the format — Filthy Frank and friends uploaded the original Harlem Shake in February 2013.",
      date: "2013-02",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=8f7wj_RcqYk",
      title: "DO THE HARLEM SHAKE — Filthy Frank (original video)",
      source: "YouTube / Filthy Frank",
      sourceUrl: "https://www.youtube.com/watch?v=8f7wj_RcqYk",
      platform: "youtube",
      attribution: "Filthy Frank (George Miller)",
      description: "The original Harlem Shake video by Filthy Frank that triggered the viral format in February 2013.",
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
