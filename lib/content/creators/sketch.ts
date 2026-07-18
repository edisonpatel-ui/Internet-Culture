import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr13",
  slug: "sketch",
  title: "Sketch",
  category: "creator",
  description:
    "A gaming and lifestyle content creator known for Roblox content on YouTube and Twitch.",
  imageGradient: "from-blue-400 via-sky-400 to-cyan-400",
  scores: { relevance: 72, brainrot: 45, cringe: 28 },
  addedAt: "2026-07-16",
  views: 380000,
  trendDirection: "stable",
  tags: ["youtube", "roblox", "gaming", "streaming"],
  careerStart: "2020",
  platforms: [
    {
      platform: "youtube",
      handle: "SketchYT",
    },
  ],
  notableMoments: [
    "Known for Roblox gaming content and interactive entertainment on YouTube",
  ],
  relatedSlugs: ["duke-dennis"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Sketch_2025_Streamer_Games.png",
      title: "Sketch at the 2025 Streamer Games",
      source: "Wikimedia Commons / MISTERARTHERVODS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sketch_2025_Streamer_Games.png",
      platform: "wikimedia",
      attribution: "MISTERARTHERVODS (CC BY 4.0)",
      license: "CC BY 4.0",
      description: "Sketch (streamer) at the 2025 Streamer Games event, August 2025.",
      date: "2025-08-16",
      verified: true,
    },
  ],
  sources: [],
};

export default entry;
