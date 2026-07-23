import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr16",
  slug: "jake-paul",
  title: "Jake Paul",
  category: "creator",
  description:
    "YouTuber turned professional boxer and promoter — Jake Paul transformed from Disney Channel actor to one of the most polarizing figures in combat sports, fighting legends including Mike Tyson and Anderson Silva.",
  imageGradient: "from-blue-500 via-indigo-500 to-violet-500",
  scores: { relevance: 83, influence: 83, cringe: 55, brainrot: 60 },
  addedAt: "2026-07-17",
  views: 2900000,
  trendDirection: "stable",
  tags: ["youtube", "boxing", "disney", "wwe", "mvp", "controversy"],
  careerStart: "2014",
  platforms: [
    { platform: "youtube", handle: "Jake Paul", url: "https://www.youtube.com/@JakePaul" },
  ],
  followers: {
    youtube: "~20M+",
  },
  notableMoments: [
    "Started on Vine and YouTube, later on Disney Channel (Bizaardvark, 2016–2017)",
    "Team 10 YouTube house became a viral media empire and controversy machine",
    "Boxing career: beat AnEsonGib, Nate Robinson, Ben Askren, Tyron Woodley (x2), Anderson Silva, Nate Diaz",
    "Fought Mike Tyson in a Netflix-streamed event (November 2024)",
    "Founded Most Valuable Promotions (MVP) — promoted major boxing events",
    "Vocal about fighter pay reform in boxing and MMA",
  ],
  relatedSlugs: ["logan-paul", "ksi", "mrbeast", "ishowspeed"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Jake_Paul_2019.jpg",
      title: "Jake Paul — June 2019",
      source: "Wikimedia Commons / Erik Drost",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jake_Paul_2019.jpg",
      platform: "wikimedia",
      attribution: "Erik Drost (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Jake Paul photographed in June 2019.",
      date: "2019-06-15",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jake_Paul",
      title: "Jake Paul — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jake_Paul",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Jake Paul's YouTube, boxing, and influencer career.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Jake Paul — YouTube",
      url: "https://www.youtube.com/@JakePaul",
      domain: "youtube.com",
    },
    {
      title: "Jake Paul — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jake_Paul",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
