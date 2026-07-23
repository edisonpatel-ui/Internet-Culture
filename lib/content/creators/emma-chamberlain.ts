import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr32",
  slug: "emma-chamberlain",
  title: "Emma Chamberlain",
  category: "creator",
  description:
    "YouTuber who rewired vlogging with messy, ironic editing — from coffee obsession to Met Gala co-host and a generation-defining \"relatable influencer\" archetype.",
  imageGradient: "from-amber-200 via-stone-300 to-rose-200",
  scores: { relevance: 80, influence: 82, cringe: 30, brainrot: 35 },
  addedAt: "2026-07-23",
  views: 1900000,
  trendDirection: "stable",
  tags: ["youtube", "vlogging", "coffee", "fashion", "gen-z"],
  careerStart: "2017",
  platforms: [
    { platform: "youtube", handle: "emma chamberlain", url: "https://www.youtube.com/@emmachamberlain" },
    { platform: "instagram", handle: "emmachamberlain", url: "https://www.instagram.com/emmachamberlain/" },
  ],
  followers: {
    youtube: "~12M+",
    instagram: "~15M+",
  },
  notableMoments: [
    "Vlogs with jump-cut editing and deadpan humor defined late-2010s YouTube tone",
    "Launched Chamberlain Coffee brand from her coffee meme persona",
    "Co-hosted Met Gala livestream — rare creator role on fashion's biggest night",
    "Pivot from daily vlogs to podcast and fashion cemented longevity beyond one format",
  ],
  relatedSlugs: ["youtube-creator-era", "influencer-culture", "tiktok-rise", "creator-economy"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Emma_Chamberlain_2019_vidcon.jpg",
      title: "Emma Chamberlain at VidCon (2019)",
      source: "Wikimedia Commons / Lissa Ray",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Emma_Chamberlain_2019_vidcon.jpg",
      platform: "wikimedia",
      attribution: "Lissa Ray (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Emma Chamberlain at VidCon 2019.",
      date: "2019-07-15",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Emma_Chamberlain",
      title: "Emma Chamberlain — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Emma_Chamberlain",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Emma Chamberlain — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Emma_Chamberlain",
      domain: "en.wikipedia.org",
    },
    {
      title: "Emma Chamberlain — YouTube",
      url: "https://www.youtube.com/@emmachamberlain",
      domain: "youtube.com",
    },
  ],
};

export default entry;
