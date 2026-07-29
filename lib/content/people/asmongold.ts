import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr28",
  slug: "asmongold",
  title: "Asmongold",
  category: "creator",
  personType: "Creator",
  description:
    "Zack (Asmongold) — Twitch's dominant MMORPG streamer whose WoW marathons, reaction takes, and OTK co-founding made him a pillar of live-stream commentary culture.",
  imageGradient: "from-red-700 via-orange-600 to-amber-500",
  scores: { relevance: 80, influence: 72, cringe: 35, brainrot: 39 },
  addedAt: "2026-07-23",
  views: 1650000,
  trendDirection: "stable",
  tags: ["twitch", "wow", "streaming", "reaction", "otk"],
  careerStart: "2014",
  platforms: [
    { platform: "twitch", handle: "asmongold", url: "https://www.twitch.tv/asmongold" },
    { platform: "youtube", handle: "Asmongold", url: "https://www.youtube.com/@Asmongold" },
  ],
  followers: {
    twitch: "~3M+",
    youtube: "~2.5M+",
  },
  notableMoments: [
    "Built audience through World of Warcraft progression and loot-drama commentary",
    "Co-founded One True King (OTK) creator collective",
    "Reaction streams and industry commentary expanded reach beyond MMO niche",
    "One of Twitch's most-watched personalities during WoW expansion cycles",
  ],
  relatedSlugs: ["xqc", "pokimane", "discord-culture", "creator-economy"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/75/Asmongold_in_2022.jpg",
      title: "Asmongold at OTK Games Expo (2022)",
      source: "Wikimedia Commons / Esfand",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Asmongold_in_2022.jpg",
      platform: "wikimedia",
      attribution: "Esfand (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Asmongold presenting at the OTK Games Expo in June 2022.",
      date: "2022-06-09",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Asmongold",
      title: "Asmongold — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Asmongold",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Asmongold — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Asmongold",
      domain: "en.wikipedia.org",
    },
    {
      title: "Asmongold — Twitch",
      url: "https://www.twitch.tv/asmongold",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
