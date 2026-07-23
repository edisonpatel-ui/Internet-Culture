import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t38",
  slug: "deinfluencing",
  title: "Deinfluencing",
  category: "trend",
  description:
    "TikTok pushback against haul culture — telling you what not to buy and why that serum is a dupe trap.",
  imageGradient: "from-teal-600 via-emerald-600 to-green-700",
  scores: { relevance: 88, influence: 72, cringe: 25, brainrot: 15 },
  addedAt: "2026-07-23",
  historicalDate: "2023-01-01",
  views: 1700000,
  trendDirection: "stable",
  tags: ["tiktok", "consumer", "beauty", "backlash", "2020s"],
  origin:
    "Deinfluencing trended on TikTok in early 2023 as creators countered endless #TikTokMadeMeBuyIt hauls with honest reviews, 'products you do not need,' and skepticism toward affiliate links. It rode inflation fatigue and beauty overconsumption backlash while still living inside influencer economy rules.",
  summary:
    "Deinfluencing is anti-haul influencing — same platform, inverted pitch. It pairs with dupe culture (save money) and fast-fashion criticism (buy less). Creators gain trust by saying no, but sponsorships still loom.",
  relatedSlugs: ["dupe-economy", "influencer-culture", "fast-fashion-boom", "unboxing-culture"],
  relationships: {
    relatedEvent: ["dupe-economy"],
    relatedTo: ["influencer-culture", "fast-fashion-boom"],
  },
  sources: [
    {
      title: "Deinfluencing — Know Your Meme",
      url: "https://knowyourmeme.com/memes/deinfluencing",
      domain: "knowyourmeme.com",
    },
    {
      title: "What is de-influencing? — BBC",
      url: "https://www.bbc.com/news/articles/c72x1kdk0vwo",
      domain: "bbc.com",
    },
  ],
};

export default entry;
