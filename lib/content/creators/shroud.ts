import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr42",
  slug: "shroud",
  title: "Shroud",
  category: "creator",
  description:
    "Michael \"Shroud\" Grzesiek — former CS:GO pro turned Twitch FPS god whose aim-clinic streams and low-drama brand made him a top-tier variety shooter streamer.",
  imageGradient: "from-slate-700 via-gray-600 to-zinc-500",
  scores: { relevance: 75, influence: 85, cringe: 18, brainrot: 25 },
  addedAt: "2026-07-23",
  views: 1100000,
  trendDirection: "stable",
  tags: ["twitch", "fps", "csgo", "streaming", "esports"],
  careerStart: "2014",
  platforms: [
    { platform: "twitch", handle: "shroud", url: "https://www.twitch.tv/shroud" },
    { platform: "youtube", handle: "Shroud", url: "https://www.youtube.com/@Shroud" },
  ],
  followers: {
    twitch: "~10M+",
    youtube: "~6M+",
  },
  notableMoments: [
    "Competed professionally in CS:GO with Cloud9 before full-time streaming",
    "Known for exceptional aim across PUBG, Apex Legends, and Valorant",
    "Exclusive Mixer deal (2019) ended when Microsoft shut the platform down",
    "Returned to Twitch as one of the platform's most-watched FPS personalities",
  ],
  relatedSlugs: ["ninja", "pokimane", "xqc", "creator-economy"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Shroud_at_PUBG_PGI_2018_%28further_cropped%29.jpg",
      title: "Shroud at PUBG Global Invitational 2018",
      source: "Wikimedia Commons / Nate Herrera n8bit",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Shroud_at_PUBG_PGI_2018_(further_cropped).jpg",
      platform: "wikimedia",
      attribution: "Nate Herrera n8bit (CC BY-SA 4.0)",
      license: "CC BY-SA 4.0",
      description: "Michael \"Shroud\" Grzesiek at PUBG PGI 2018.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Shroud_(streamer)",
      title: "Shroud (streamer) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Shroud_(streamer)",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Shroud (streamer) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Shroud_(streamer)",
      domain: "en.wikipedia.org",
    },
    {
      title: "Shroud — Twitch",
      url: "https://www.twitch.tv/shroud",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
