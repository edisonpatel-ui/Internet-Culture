import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr18",
  slug: "bella-poarch",
  title: "Bella Poarch",
  category: "creator",
  description:
    "Filipino-American TikToker who created TikTok's all-time most-liked video with a simple head-bobbing lip-sync, then pivoted to a music career with millions of YouTube streams.",
  imageGradient: "from-blue-400 via-purple-400 to-pink-400",
  scores: { relevance: 78, influence: 78, cringe: 28, brainrot: 42 },
  addedAt: "2026-07-17",
  views: 1900000,
  trendDirection: "stable",
  tags: ["tiktok", "music", "viral", "filipino", "us-navy", "2020"],
  careerStart: "2020",
  platforms: [
    { platform: "tiktok", handle: "@bellapoarch", url: "https://www.tiktok.com/@bellapoarch" },
    { platform: "youtube", handle: "Bella Poarch", url: "https://www.youtube.com/@BellaPoarch" },
  ],
  followers: {
    tiktok: "~94M+",
    youtube: "~7M+",
  },
  notableMoments: [
    "M to the B lip-sync (August 2020) — became TikTok's most liked video with 60M+ likes, a record it held for years",
    "Former US Navy servicewoman who enlisted before starting her TikTok career",
    "Music debut: 'Build a B*tch' (2021) — reached #1 on multiple charts and 500M+ YouTube views",
    "Collaborated with Sub Urban, Grimes, and other artists on her debut album 'Dolls'",
    "Named one of Time's 100 Most Influential People of 2021",
  ],
  relatedSlugs: ["charli-damelio", "khaby-lame"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/59/Bella_Poarch_-_Pink_Aura_Tour.jpg",
      title: "Bella Poarch — Pink Aura Tour",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bella_Poarch_-_Pink_Aura_Tour.jpg",
      platform: "wikimedia",
      attribution: "Wikimedia Commons contributors",
      license: "CC BY-SA 4.0",
      description: "Bella Poarch photographed during the Pink Aura Tour.",
      date: "2023",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Bella_Poarch",
      title: "Bella Poarch — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Bella_Poarch",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Bella Poarch's TikTok viral rise and music career.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Bella Poarch — TikTok",
      url: "https://www.tiktok.com/@bellapoarch",
      domain: "tiktok.com",
    },
    {
      title: "Bella Poarch — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Bella_Poarch",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
