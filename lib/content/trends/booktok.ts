import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t34",
  slug: "booktok",
  title: "BookTok",
  category: "trend",
  description:
    "TikTok's reader community — crying reviews, aesthetic shelves, and bestseller lists driven by short video.",
  imageGradient: "from-amber-700 via-orange-600 to-rose-500",
  scores: { relevance: 85, influence: 80, cringe: 30, brainrot: 20 },
  addedAt: "2026-07-23",
  historicalDate: "2020-01-01",
  views: 1900000,
  trendDirection: "stable",
  tags: ["tiktok", "books", "publishing", "fandom", "2020s"],
  origin:
    "BookTok emerged around 2020 when pandemic readers filmed emotional reactions, bookshelf tours, and trope rankings on TikTok. Publishers and bookstores labeled displays 'BookTok picks'; titles like Colleen Hoover's backlist surged from recommendation cascades rather than traditional review channels.",
  summary:
    "BookTok turned reading into vertical video: tropes (enemies-to-lovers), sobbing reaction clips, and 'if you liked X read Y.' It reshaped publishing marketing — cover design, trope tags, and indie authors breaking out from hashtag momentum.",
  relatedSlugs: ["tiktok-rise", "influencer-culture", "creator-economy", "stan"],
  sources: [
    {
      title: "BookTok — Wikipedia",
      url: "https://en.wikipedia.org/wiki/BookTok",
      domain: "en.wikipedia.org",
    },
    {
      title: "How BookTok rewrote publishing — NPR",
      url: "https://www.npr.org/2022/08/12/1116804750/booktok-publishing",
      domain: "npr.org",
    },
  ],
};

export default entry;
