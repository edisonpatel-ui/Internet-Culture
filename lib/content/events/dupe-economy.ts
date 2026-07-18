import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e3",
  slug: "dupe-economy",
  title: "The Dupe Economy",
  category: "event",
  description:
    "The cultural moment when buying dupes — knockoff luxury goods — became not just accepted but celebrated.",
  imageGradient: "from-amber-400 via-yellow-400 to-orange-400",
  scores: { relevance: 88, brainrot: 32, cringe: 22 },
  addedAt: "2026-06-10",
  views: 540000,
  trendDirection: "rising",
  platform: "TikTok, YouTube, Reddit",
  impact:
    "Shifted consumer culture. The stigma around knockoffs flipped — finding a great dupe became a flex. Brands were forced to respond as their cachet eroded.",
  highlights: [
    "Stanley tumbler dupes from Amazon outsold the originals in some categories",
    "'Dupe culture' declared by major fashion outlets as the dominant consumer trend",
    "Luxury brands started releasing budget lines in response to dupe demand",
    "Influencer 'dupe hauls' became a dominant TikTok content format",
  ],
  relatedSlugs: ["girl-dinner", "sigma-grindset"],
  tags: ["consumer culture", "fashion", "luxury", "budget", "2024"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    // Defining product of the dupe-economy moment: Stanley Quencher shelves (the item everyone duped).
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Stanley_Quencher_in_a_shop.jpg",
      title: "Stanley Quencher tumblers on retail shelves",
      source: "Wikimedia Commons / ishmael daro",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Stanley_Quencher_in_a_shop.jpg",
      platform: "wikimedia",
      attribution: "ishmael daro (CC BY 2.0)",
      license: "CC BY 2.0",
      description:
        "Stanley Quencher tumblers in a shop — the viral product whose Amazon/TikTok dupes defined dupe-economy discourse.",
      date: "2024",
      verified: false,
    },
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Stanley_Quencher_H2.0_Tumbler_%E2%80%94Limit_2_per_customer.png",
      title: "Stanley Quencher H2.0 — limit 2 per customer retail sign",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Stanley_Quencher_H2.0_Tumbler_%E2%80%94Limit_2_per_customer.png",
      platform: "wikimedia",
      attribution: "See Commons file page",
      license: "See Commons file page",
      description:
        "Retail scarcity signage for Stanley Quencher H2.0 — scarcity that fueled both original demand and dupe hunting.",
      date: "2024",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Stanley_Cup_(drinkware)",
      title: "Stanley Cup (drinkware) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Stanley_Cup_(drinkware)",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Background on the Stanley Quencher tumbler phenomenon.",
      date: "2024",
      verified: false,
    },
  ],
};

export default entry;
