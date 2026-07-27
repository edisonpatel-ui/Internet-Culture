import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr37",
  slug: "james-charles",
  title: "James Charles",
  category: "creator",
  personType: "Creator",
  description:
    "Beauty YouTuber who became CoverBoy's first male ambassador at 17 — mega fame, tutorial empire, and repeated influencer feuds that defined YouTube beauty drama cycles.",
  imageGradient: "from-purple-400 via-pink-300 to-rose-400",
  scores: { relevance: 65, influence: 78, cringe: 70, brainrot: 40 },
  addedAt: "2026-07-23",
  views: 1800000,
  trendDirection: "declining",
  tags: ["youtube", "beauty", "makeup", "drama", "influencer"],
  careerStart: "2015",
  platforms: [
    { platform: "youtube", handle: "James Charles", url: "https://www.youtube.com/@JamesCharles" },
    { platform: "instagram", handle: "jamescharles", url: "https://www.instagram.com/jamescharles/" },
  ],
  followers: {
    youtube: "~23M+",
    instagram: "~20M+",
  },
  notableMoments: [
    "Became CoverGirl's first male brand ambassador in 2016 at age 17",
    "Feud with Tati Westbrook in 2019 became a defining YouTube beauty-drama event",
    "Hosted the Instant Influencer reality competition on YouTube",
    "Represented peak beauty-influencer crossover before TikTok reshaped the category",
  ],
  relatedSlugs: ["jeffree-star", "shane-dawson", "influencer-culture", "youtube-creator-era"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/James_Charles_%282019%29_%28cropped%29.png",
      title: "James Charles (2019)",
      source: "Wikimedia Commons / Lone Fox",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:James_Charles_(2019)_(cropped).png",
      platform: "wikimedia",
      attribution: "Lone Fox (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "James Charles appearing in a 2019 YouTube collaboration.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/James_Charles",
      title: "James Charles — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/James_Charles",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "James Charles — Wikipedia",
      url: "https://en.wikipedia.org/wiki/James_Charles",
      domain: "en.wikipedia.org",
    },
    {
      title: "James Charles — YouTube",
      url: "https://www.youtube.com/@JamesCharles",
      domain: "youtube.com",
    },
  ],
};

export default entry;
