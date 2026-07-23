import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t36",
  slug: "coquette-aesthetic",
  title: "Coquette Aesthetic",
  category: "trend",
  description:
    "Hyper-feminine bows, lace, and Lolita-adjacent softness — TikTok's romantic girlhood moodboard.",
  imageGradient: "from-rose-200 via-pink-300 to-red-200",
  scores: { relevance: 80, influence: 68, cringe: 35, brainrot: 20 },
  addedAt: "2026-07-23",
  historicalDate: "2022-01-01",
  views: 1600000,
  trendDirection: "stable",
  tags: ["aesthetic", "tiktok", "fashion", "femininity", "2020s"],
  origin:
    "Coquette (French for flirt) resurfaced in Tumblr-era tags, then TikTok re-packaged it around 2022–2023: bows, pearls, ballet flats, Mitski and Lana Del Rey soundtracks, and 'soft girl' nostalgia. It overlaps cottagecore sweetness but is more urban-bedroom and vintage lingerie-adjacent than pastoral.",
  summary:
    "Coquette is performative softness — ribbons, heart journals, pink filters — often ironic about femininity while embracing it. Pairs with Barbiecore's pink moment but trades plastic glam for lace and melancholy romance.",
  relatedSlugs: ["barbiecore", "cottagecore", "clean-girl-aesthetic", "y2k-revival"],
  relationships: {
    relatedTo: ["barbiecore", "cottagecore"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/coquette",
      title: "Coquette — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/coquette",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cultural documentation of the aesthetic.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Coquette aesthetic — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Coquette_aesthetic",
      domain: "en.wikipedia.org",
    },
    {
      title: "Coquette — Know Your Meme",
      url: "https://knowyourmeme.com/memes/coquette",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
