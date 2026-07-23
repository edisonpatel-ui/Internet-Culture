import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr34",
  slug: "h3h3-ethan-hila-klein",
  title: "h3h3 / Ethan & Hila Klein",
  category: "creator",
  description:
    "Ethan and Hila Klein — h3h3Productions duo whose reaction videos, Ethan Klein podcast empire, and copyright battles shaped YouTube commentary and fair-use discourse.",
  imageGradient: "from-lime-400 via-green-300 to-emerald-400",
  scores: { relevance: 70, influence: 88, cringe: 40, brainrot: 32 },
  addedAt: "2026-07-23",
  views: 1100000,
  trendDirection: "stable",
  tags: ["youtube", "reaction", "podcast", "commentary", "fair use"],
  careerStart: "2011",
  platforms: [
    { platform: "youtube", handle: "h3h3Productions", url: "https://www.youtube.com/@h3h3Productions" },
    { platform: "youtube", handle: "H3 Podcast", url: "https://www.youtube.com/@H3Podcast" },
  ],
  followers: {
    youtube: "~6M+ (h3h3Productions)",
  },
  notableMoments: [
    "Reaction and sketch channel h3h3Productions grew from Ethan and Hila's early vlogs",
    "h3h3 v. Matt Hoss copyright lawsuit became a landmark YouTube fair-use case (2017)",
    "H3 Podcast expanded into long-form interviews and live drama commentary",
    "Hila Klein co-founded Teddy Fresh streetwear brand",
  ],
  relatedSlugs: ["youtube-creator-era", "pewdiepie", "keemstar", "creator-economy"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/02/Ethan_Klein_%28cropped%29.jpg",
      title: "Ethan Klein of h3h3Productions",
      source: "Wikimedia Commons / Kim H",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ethan_Klein_(cropped).jpg",
      platform: "wikimedia",
      attribution: "Kim H (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Ethan Klein — h3h3Productions co-host (Hila Klein is the other half of the duo).",
      date: "2017",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Ethan_Klein",
      title: "Ethan Klein — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Ethan_Klein",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Ethan Klein — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ethan_Klein",
      domain: "en.wikipedia.org",
    },
    {
      title: "Hila Klein — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Hila_Klein",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
