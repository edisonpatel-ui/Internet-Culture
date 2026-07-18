import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr15",
  slug: "logan-paul",
  title: "Logan Paul",
  category: "creator",
  description:
    "Ohio-born YouTuber, professional boxer, WWE superstar, and co-founder of Prime Hydration — one of the most influential and controversial internet celebrities of the past decade.",
  imageGradient: "from-yellow-500 via-amber-400 to-orange-500",
  scores: { relevance: 84, influence: 84, cringe: 50, brainrot: 55 },
  addedAt: "2026-07-17",
  views: 3200000,
  trendDirection: "stable",
  tags: ["youtube", "boxing", "wwe", "prime", "controversy", "influencer"],
  careerStart: "2014",
  platforms: [
    { platform: "youtube", handle: "Logan Paul", url: "https://www.youtube.com/@LoganPaul" },
    { platform: "youtube", handle: "Impaulsive", url: "https://www.youtube.com/@Impaulsive" },
  ],
  followers: {
    youtube: "~23M+",
  },
  notableMoments: [
    "2018 Japan forest controversy: posted a video showing a suicide victim, leading to YouTube demonetization and global backlash",
    "Two viral boxing matches vs. KSI (2018, 2019) — the first major influencer boxing events",
    "Exhibition boxing match vs. Floyd Mayweather Jr. (2021)",
    "WWE career — joined WWE and became a legitimate main-event presence by 2022",
    "Co-founded Prime Hydration with KSI in 2022 — became a billion-dollar brand",
    "Impaulsive podcast has ranked among the top podcasts globally",
  ],
  relatedSlugs: ["jake-paul", "ksi"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Logan_Paul_%2848086619418%29.jpg",
      title: "Logan Paul — June 2019",
      source: "Wikimedia Commons / Erik Drost",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Logan_Paul_(48086619418).jpg",
      platform: "wikimedia",
      attribution: "Erik Drost (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Logan Paul photographed in June 2019 by sports photographer Erik Drost.",
      date: "2019-06-15",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Logan_Paul",
      title: "Logan Paul — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Logan_Paul",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Logan Paul's YouTube, boxing, WWE, and Prime Hydration career.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Logan Paul — YouTube",
      url: "https://www.youtube.com/@LoganPaul",
      domain: "youtube.com",
    },
    {
      title: "Logan Paul — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Logan_Paul",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
