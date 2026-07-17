import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr10",
  slug: "ninja",
  title: "Ninja",
  category: "creator",
  description:
    "Tyler Blevins — the streamer who made Fortnite a cultural phenomenon and became the most-recognized name in gaming content.",
  imageGradient: "from-blue-500 via-cyan-500 to-sky-400",
  scores: { relevance: 92, brainrot: 40, cringe: 25 },
  addedAt: "2026-07-16",
  views: 1050000,
  trendDirection: "stable",
  tags: ["twitch", "youtube", "fortnite", "gaming", "competitive", "streaming"],
  careerStart: "2011",
  platforms: [
    {
      platform: "twitch",
      handle: "Ninja",
      url: "https://www.twitch.tv/Ninja",
    },
    {
      platform: "youtube",
      handle: "Ninja",
      url: "https://www.youtube.com/@Ninja",
    },
  ],
  followers: {
    twitch: "~19M+",
  },
  notableMoments: [
    "Most-followed Twitch streamer by 2018 — driven by Fortnite's mainstream explosion",
    "Played Fortnite with Drake and Travis Scott in March 2018 — broke concurrent viewer streaming records at the time",
    "Signed an exclusive deal with Microsoft's Mixer streaming platform in 2019; Mixer shut down in July 2020",
    "Publicly announced a melanoma diagnosis in 2024 and spoke openly about treatment and early detection",
  ],
  relatedSlugs: ["mrbeast", "kai-cenat", "pewdiepie"],
  sources: [
    {
      title: "Ninja — Twitch Channel",
      url: "https://www.twitch.tv/Ninja",
      domain: "twitch.tv",
    },
    {
      title: "Tyler Blevins (Ninja) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Tyler_Blevins",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
