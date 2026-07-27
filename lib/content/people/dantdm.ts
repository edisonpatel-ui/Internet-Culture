import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr30",
  slug: "dantdm",
  title: "DanTDM",
  category: "creator",
  personType: "Creator",
  description:
    "Daniel Middleton (DanTDM) — British YouTuber whose Minecraft Let's Plays made him one of the highest-earning UK creators of the mid-2010s gaming boom.",
  imageGradient: "from-blue-500 via-cyan-400 to-indigo-500",
  scores: { relevance: 62, influence: 85, cringe: 28, brainrot: 27 },
  addedAt: "2026-07-23",
  views: 1200000,
  trendDirection: "stable",
  tags: ["youtube", "minecraft", "gaming", "uk", "child audience"],
  careerStart: "2012",
  platforms: [
    { platform: "youtube", handle: "DanTDM", url: "https://www.youtube.com/@DanTDM" },
    { platform: "twitch", handle: "dantdm", url: "https://www.twitch.tv/dantdm" },
  ],
  followers: {
    youtube: "~28M+",
  },
  notableMoments: [
    "Minecraft mod showcases and survival series dominated mid-2010s kids' YouTube",
    "Guinness World Record for \"Most views for a dedicated Minecraft video channel\"",
    "Arena tour DanTDM On Tour brought YouTube gaming to live UK stages",
    "Appeared at TommyInnit live shows — bridging old-guard and MCYT generations",
  ],
  relatedSlugs: ["dream", "minecraft-movie-premiere", "pewdiepie", "youtube-creator-era"],
  media: [
    // AI suggested — Web Summit photo (CC BY 2.0). Human must verify.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/DanTDM_%40_Sportsfile_%28Web_Summit%29_%28cropped%29.jpg",
      title: "DanTDM at Web Summit",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:DanTDM_@_Sportsfile_(Web_Summit)_(cropped).jpg",
      platform: "wikimedia",
      attribution: "Web Summit / Nick Bradshaw / Sportsfile (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "DanTDM at Web Summit.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/DanTDM",
      title: "DanTDM — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/DanTDM",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "DanTDM — Wikipedia",
      url: "https://en.wikipedia.org/wiki/DanTDM",
      domain: "en.wikipedia.org",
    },
    {
      title: "DanTDM — YouTube",
      url: "https://www.youtube.com/@DanTDM",
      domain: "youtube.com",
    },
  ],
};

export default entry;
