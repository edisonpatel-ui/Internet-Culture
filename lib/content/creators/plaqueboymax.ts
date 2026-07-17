import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr21",
  slug: "plaqueboymax",
  title: "PlaqueBoyMax",
  category: "creator",
  description:
    "Live streamer and content creator known for his chaotic, unfiltered personality and association with the Kick streaming platform — rising through viral clips and collaborations with creators like Adin Ross.",
  imageGradient: "from-red-500 via-orange-500 to-yellow-500",
  scores: { relevance: 72, brainrot: 65, cringe: 45 },
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
