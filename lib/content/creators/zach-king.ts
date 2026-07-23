import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr22",
  slug: "zach-king",
  title: "Zach King",
  category: "creator",
  personType: "Creator",
  description:
    "Digital illusionist and filmmaker Zach King pioneered 'magic video' content — short clips with seamless, impossible edits that made ordinary objects transform in ways that defied reality.",
  imageGradient: "from-purple-500 via-violet-500 to-indigo-500",
  scores: { relevance: 78, influence: 78, cringe: 10, brainrot: 35 },
  addedAt: "2026-07-17",
  views: 1700000,
  trendDirection: "stable",
  tags: ["magic", "illusion", "vine", "tiktok", "youtube", "filmmaking"],
  careerStart: "2008",
  platforms: [
    { platform: "tiktok", handle: "@zachking", url: "https://www.tiktok.com/@zachking" },
    { platform: "youtube", handle: "Zach King", url: "https://www.youtube.com/@ZachKing" },
  ],
  followers: {
    tiktok: "~82M+",
    youtube: "~4M+",
  },
  notableMoments: [
    "Started creating film editing tricks on YouTube in 2008 under the channel 'FinalCutKing'",
    "Vine made him famous — 'magic vines' compiled millions of followers before Vine's shutdown",
    "Flying Broomstick TikTok (2020) — became TikTok's most viewed video with 2.2B views",
    "Appeared on The Amazing Race Season 27 (2015) with Kelsey Gerber",
    "Winner of Shorty Award for Best Viner (2015)",
    "Content consistently family-friendly and technically impressive — broad demographic appeal",
  ],
  relatedSlugs: ["khaby-lame", "bella-poarch", "charli-damelio", "mrbeast"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Zach_King_Photo.jpg",
      title: "Zach King — official photo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Zach_King_Photo.jpg",
      platform: "wikimedia",
      attribution: "Wikimedia Commons contributors",
      license: "CC BY-SA 4.0",
      description: "Zach King, digital illusionist and short-form video pioneer.",
      date: "2022",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Zach_King",
      title: "Zach King — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Zach_King",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Zach King's magic-video content and career.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Zach King — YouTube",
      url: "https://www.youtube.com/@ZachKing",
      domain: "youtube.com",
    },
    {
      title: "Zach King — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Zach_King",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
