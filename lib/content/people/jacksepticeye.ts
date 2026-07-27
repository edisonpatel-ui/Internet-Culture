import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr36",
  slug: "jacksepticeye",
  title: "Jacksepticeye",
  category: "creator",
  personType: "Creator",
  description:
    "Seán McLoughlin (Jacksepticeye) — Irish YouTuber whose green-haired energy, charity livestreams, and decade-long gaming catalog made him one of YouTube's most recognizable faces.",
  imageGradient: "from-green-500 via-lime-400 to-emerald-600",
  scores: { relevance: 77, influence: 90, cringe: 25, brainrot: 35 },
  addedAt: "2026-07-23",
  views: 1450000,
  trendDirection: "stable",
  tags: ["youtube", "gaming", "irish", "charity", "commentary"],
  careerStart: "2012",
  platforms: [
    { platform: "youtube", handle: "jacksepticeye", url: "https://www.youtube.com/@jacksepticeye" },
    { platform: "twitch", handle: "jacksepticeye", url: "https://www.twitch.tv/jacksepticeye" },
  ],
  followers: {
    youtube: "~30M+",
  },
  notableMoments: [
    "Gaming Let's Plays with signature intro and high-energy commentary",
    "Hosted massive charity livestreams including SpecialEffect collaborations",
    "Appeared at TommyInnit live shows — linking classic YouTube to MCYT era",
    "One of the longest-running top-tier gaming creators on the platform",
  ],
  relatedSlugs: ["pewdiepie", "markiplier", "dream", "youtube-creator-era"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Jacksepticeye_%28cropped%29.png",
      title: "Jacksepticeye at PAX 2016",
      source: "Wikimedia Commons / MissScarletTanager",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jacksepticeye_(cropped).png",
      platform: "wikimedia",
      attribution: "MissScarletTanager (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Jacksepticeye at PAX 2016.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jacksepticeye",
      title: "Jacksepticeye — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jacksepticeye",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Jacksepticeye — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jacksepticeye",
      domain: "en.wikipedia.org",
    },
    {
      title: "Jacksepticeye — YouTube",
      url: "https://www.youtube.com/@jacksepticeye",
      domain: "youtube.com",
    },
  ],
};

export default entry;
