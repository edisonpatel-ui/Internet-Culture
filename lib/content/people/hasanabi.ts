import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr35",
  slug: "hasanabi",
  title: "Hasan Piker (HasanAbi)",
  category: "creator",
  personType: "Creator",
  description:
    "Hasan Piker — Twitch political commentator and former Young Turks host whose live news reactions, \"Tankie\" memes, and Bernie-era audience made him left-Twitch's biggest streamer.",
  imageGradient: "from-red-600 via-rose-500 to-amber-400",
  scores: { relevance: 78, influence: 74, cringe: 37, brainrot: 30 },
  addedAt: "2026-07-23",
  views: 1750000,
  trendDirection: "stable",
  tags: ["twitch", "politics", "commentary", "news", "streaming"],
  careerStart: "2018",
  platforms: [
    { platform: "twitch", handle: "HasanAbi", url: "https://www.twitch.tv/hasanabi" },
    { platform: "youtube", handle: "HasanAbi", url: "https://www.youtube.com/@HasanAbi" },
  ],
  followers: {
    twitch: "~2.5M+",
    youtube: "~1.5M+",
  },
  notableMoments: [
    "Built Twitch audience reacting to U.S. elections and breaking news live",
    "Coverage of Bernie Sanders 2020 campaign helped define his core viewer base",
    "Among the most-watched political streamers during 2020–2024 news cycles",
    "Controversies and debates around takes became their own clip ecosystem",
  ],
  relatedSlugs: ["reddit-culture", "twitter-x-transition", "creator-economy", "based"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hasan_Piker_2018.jpg",
      title: "Hasan Piker at Politicon (2018)",
      source: "Wikimedia Commons / mo1567",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hasan_Piker_2018.jpg",
      platform: "wikimedia",
      attribution: "mo1567 (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Hasan Piker at Politicon 2018.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Hasan_Piker",
      title: "Hasan Piker — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Hasan_Piker",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Hasan Piker — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Hasan_Piker",
      domain: "en.wikipedia.org",
    },
    {
      title: "HasanAbi — Twitch",
      url: "https://www.twitch.tv/hasanabi",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
