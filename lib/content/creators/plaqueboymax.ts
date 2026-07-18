import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr21",
  slug: "plaqueboymax",
  title: "PlaqueBoyMax",
  category: "creator",
  description:
    "Live streamer and content creator known for his chaotic, unfiltered personality and association with the Kick streaming platform — rising through viral clips and collaborations with creators like Adin Ross.",
  imageGradient: "from-red-500 via-orange-500 to-yellow-500",
  scores: { relevance: 72, influence: 72, cringe: 45, brainrot: 65 },
  addedAt: "2026-07-17",
  views: 950000,
  trendDirection: "rising",
  tags: ["streaming", "kick", "twitch", "viral", "gaming", "live"],
  careerStart: "2021",
  platforms: [
    { platform: "twitch", handle: "PlaqueBoyMax", url: "https://www.twitch.tv/plaqueboymax" },
    { platform: "youtube", handle: "PlaqueBoyMax", url: "https://www.youtube.com/@PlaqueBoyMax" },
  ],
  followers: {
    twitch: "~1M+",
    youtube: "~800K+",
  },
  notableMoments: [
    "Known for viral reaction and gaming clips that spread across TikTok and Twitter",
    "Multiple high-profile collaborations with Adin Ross and other top streamers",
    "Signed to Kick streaming platform as part of the broader creator migration from Twitch",
    "Participation in viral internet culture moments and debates within streaming communities",
  ],
  relatedSlugs: ["xqc", "caseoh", "ishowspeed"],
  media: [
    // CC BY 4.0 event portrait — verified HTTP 200.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b6/PlaqueBoyMax_JD_Sports_event_18_(cropped)_04.jpg",
      title: "PlaqueBoyMax — JD Sports event portrait (2025)",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:PlaqueBoyMax_JD_Sports_event_18_(cropped)_04.jpg",
      platform: "wikimedia",
      attribution: "Wikimedia Commons contributors (CC BY 4.0)",
      license: "CC BY 4.0",
      description:
        "Cropped portrait of PlaqueBoyMax at a 2025 JD Sports event — a recognizable public photo of the streamer.",
      date: "2025",
      verified: true,
    },
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/41/PlaqueBoyMax_2025.jpg",
      title: "PlaqueBoyMax at Fanatics Fest (2025)",
      source: "Wikimedia Commons / MILLION DOLLAZ WORTH OF GAME",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PlaqueBoyMax_2025.jpg",
      platform: "wikimedia",
      attribution: "MILLION DOLLAZ WORTH OF GAME (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "PlaqueBoyMax photographed at Fanatics Fest NYC, June 2025.",
      date: "2025-06-25",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@PlaqueBoyMax",
      title: "PlaqueBoyMax — YouTube",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@PlaqueBoyMax",
      platform: "youtube",
      attribution: "PlaqueBoyMax",
      description: "Official PlaqueBoyMax YouTube channel.",
      verified: true,
    },
  ],
  sources: [
    {
      title: "PlaqueBoyMax — Twitch",
      url: "https://www.twitch.tv/plaqueboymax",
      domain: "twitch.tv",
    },
    {
      title: "PlaqueBoyMax — YouTube",
      url: "https://www.youtube.com/@PlaqueBoyMax",
      domain: "youtube.com",
    },
  ],
};

export default entry;
