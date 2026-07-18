import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr11",
  slug: "duke-dennis",
  title: "Duke Dennis",
  category: "creator",
  description:
    "NBA 2K YouTuber and core AMP collective member who built a massive following through gaming content and group entertainment.",
  imageGradient: "from-red-600 via-rose-600 to-pink-600",
  scores: { relevance: 80, brainrot: 60, cringe: 30 },
  addedAt: "2026-07-16",
  views: 580000,
  trendDirection: "stable",
  tags: ["youtube", "gaming", "nba 2k", "amp", "basketball", "vlog"],
  careerStart: "2019",
  platforms: [
    {
      platform: "youtube",
      handle: "Duke Dennis Gaming",
      url: "https://www.youtube.com/@DukeDennis",
    },
    {
      platform: "twitch",
      handle: "DukeDennis",
      url: "https://www.twitch.tv/dukedennis",
    },
  ],
  followers: {
    youtube: "~7M+",
  },
  notableMoments: [
    "Core member of AMP (Any Means Possible) — the content collective including Kai Cenat, Fanum, Agent00, Chrisnxtdoor, and ImDavisss",
    "Built one of the largest NBA 2K audiences on YouTube through entertaining and skilled gameplay",
    "AMP group content became some of the most-watched collaborative gaming and vlog content of the era",
  ],
  relatedSlugs: ["kai-cenat"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Duke_Dennis_July_2025.jpg",
      title: "Duke Dennis — 2025",
      source: "Wikimedia Commons / ImDavisss Live",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Duke_Dennis_July_2025.jpg",
      platform: "wikimedia",
      attribution: "ImDavisss Live (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Duke Dennis on a stream with ImDavisss, July 2025.",
      date: "2025-07-16",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@DukeDennis",
      title: "Duke Dennis — YouTube channel",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@DukeDennis",
      platform: "youtube",
      attribution: "Duke Dennis",
      description: "Official Duke Dennis YouTube channel — NBA 2K content and AMP collective videos.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Duke Dennis — YouTube Channel",
      url: "https://www.youtube.com/@DukeDennis",
      domain: "youtube.com",
    },
  ],
};

export default entry;
