import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t48",
  slug: "fast-fashion-boom",
  title: "Fast Fashion Boom",
  category: "trend",
  description:
    "Ultra-cheap, ultra-fast clothing cycles — Shein, Temu, Fashion Nova, AliExpress, and Amazon haul culture at scale.",
  imageGradient: "from-red-500 via-orange-500 to-yellow-500",
  scores: { relevance: 92, influence: 88, cringe: 50, brainrot: 30 },
  addedAt: "2026-07-23",
  historicalDate: "2010-01-01",
  views: 2800000,
  trendDirection: "rising",
  tags: ["fashion", "shein", "temu", "consumer", "2020s"],
  origin:
    "Fast fashion accelerated from Zara and H&M models into app-native giants: Shein (Chinese ultra-fast supply chain), Fashion Nova (Instagram celebrity drops), AliExpress (direct-from-factory orders), and Amazon's marketplace flood. Temu's gamified discounts (2022–2024) pushed micro-haul culture further — $3 dresses filmed for TikTok #TemuHaul and #SheinHaul tags.",
  summary:
    "The fast fashion boom is speed and price over durability: thousands of new SKUs weekly, influencer try-ons, and environmental/labor criticism chasing the same clips. Deinfluencing and thrift flip emerged partly as reactions. Shein, Temu, Fashion Nova, Amazon, and AliExpress symbolize the model even when shoppers mix platforms.",
  relatedSlugs: ["deinfluencing", "dupe-economy", "influencer-culture", "thrift-flip", "unboxing-culture"],
  relationships: {
    relatedEvent: ["dupe-economy"],
    relatedTo: ["deinfluencing", "influencer-culture", "thrift-flip"],
  },
  sources: [
    {
      title: "Fast fashion — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Fast_fashion",
      domain: "en.wikipedia.org",
    },
    {
      title: "Shein — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Shein",
      domain: "en.wikipedia.org",
    },
    {
      title: "Temu — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Temu",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
