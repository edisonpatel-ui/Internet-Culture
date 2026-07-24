import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr33",
  slug: "fanum",
  title: "Fanum",
  category: "creator",
  personType: "Creator",
  description:
    "Fanum (Roberto) — AMP member and Twitch streamer whose food-stealing bits with Kai Cenat popularized \"fanum tax\" as mainstream Gen Z slang.",
  imageGradient: "from-green-500 via-emerald-400 to-lime-500",
  scores: { relevance: 75, influence: 68, cringe: 35, brainrot: 72 },
  addedAt: "2026-07-23",
  views: 620000,
  trendDirection: "stable",
  tags: ["twitch", "amp", "streaming", "fanum tax", "comedy"],
  careerStart: "2021",
  platforms: [
    { platform: "twitch", handle: "Fanum", url: "https://www.twitch.tv/fanum" },
    { platform: "youtube", handle: "Fanum", url: "https://www.youtube.com/@Fanum" },
  ],
  followers: {
    twitch: "~2M+",
    youtube: "~1M+",
  },
  notableMoments: [
    "Joined AMP (Any Means Possible) collective alongside Kai Cenat and Duke Dennis",
    "Running gag of taxing friends' food became the \"fanum tax\" meme",
    "Collaboration streams helped AMP dominate Twitch trending during subathon era",
    "Distinct creator entity from the slang term — the person behind the bit",
  ],
  relatedSlugs: ["fanum-tax", "kai-cenat", "amp", "duke-dennis", "rizz"],
  relationships: {
    memberOf: ["amp"],
    relatedSlang: ["fanum-tax"],
    community: ["kai-cenat", "duke-dennis"],
  },
  media: [
    // AI suggested — still from Agent 00 video (CC BY 3.0). Human must verify.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Fanum_2021.jpg",
      title: "Fanum (2021)",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fanum_2021.jpg",
      platform: "wikimedia",
      attribution: "Agent 00 Gaming (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Fanum in a video with Agent 00, 2021.",
      date: "2021",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Fanum_(streamer)",
      title: "Fanum (streamer) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Fanum_(streamer)",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Fanum (streamer) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Fanum_(streamer)",
      domain: "en.wikipedia.org",
    },
    {
      title: "Fanum — Twitch",
      url: "https://www.twitch.tv/fanum",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
