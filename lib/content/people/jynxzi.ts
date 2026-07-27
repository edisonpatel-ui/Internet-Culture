import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr12",
  slug: "jynxzi",
  title: "Jynxzi",
  category: "creator",
  personType: "Creator",
  description:
    "Nicholas Stewart — the Rainbow Six Siege streamer who built a massive Twitch audience through high-level gameplay and an entertaining personality.",
  imageGradient: "from-orange-500 via-amber-500 to-yellow-400",
  scores: { relevance: 89, influence: 86, cringe: 25, brainrot: 48 },
  addedAt: "2026-07-16",
  views: 640000,
  trendDirection: "stable",
  tags: ["twitch", "rainbow six siege", "gaming", "fps", "streaming"],
  careerStart: "2021",
  platforms: [
    {
      platform: "twitch",
      handle: "Jynxzi",
      url: "https://www.twitch.tv/jynxzi",
    },
    {
      platform: "youtube",
      handle: "Jynxzi",
      url: "https://www.youtube.com/@jynxzi",
    },
  ],
  followers: {
    twitch: "~7M+",
  },
  notableMoments: [
    "One of the most-watched Rainbow Six Siege streamers on Twitch",
    "Known for combining high-level competitive gameplay with a highly entertaining stream personality",
    "Rapid growth made him one of the fastest-rising gaming streamers in 2022–2023",
  ],
  relatedSlugs: ["kai-cenat", "ninja"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Jynxzi_ohnePixel_2025_02.png",
      title: "Jynxzi — May 2025",
      source: "Wikimedia Commons / ohnepixel",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jynxzi_ohnePixel_2025_02.png",
      platform: "wikimedia",
      attribution: "ohnepixel (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Jynxzi (Nicholas Stewart) photographed from an ohnepixel YouTube video, May 2025.",
      date: "2025-05-23",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@jynxzi",
      title: "Jynxzi — YouTube channel",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@jynxzi",
      platform: "youtube",
      attribution: "Jynxzi",
      description: "Official Jynxzi YouTube channel — Rainbow Six Siege gameplay and stream highlights.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Jynxzi — Twitch Channel",
      url: "https://www.twitch.tv/jynxzi",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
