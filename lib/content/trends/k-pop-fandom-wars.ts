import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t43",
  slug: "k-pop-fandom-wars",
  title: "K-Pop Fandom Wars",
  category: "trend",
  description:
    "Stan armies, streaming battles, and online conflict between K-pop fandoms — organized devotion at industrial scale.",
  imageGradient: "from-fuchsia-600 via-purple-600 to-blue-600",
  scores: { relevance: 85, influence: 82, cringe: 50, brainrot: 35 },
  addedAt: "2026-07-23",
  historicalDate: "2012-01-01",
  views: 2400000,
  trendDirection: "stable",
  tags: ["k-pop", "stan", "twitter", "fandom", "2010s"],
  origin:
    "K-pop labels industrialized fandom: light sticks, comeback schedules, and fan-coordinated streaming to chart on Billboard. Twitter stan accounts imported Western stan culture and scaled it — fancams in unrelated threads, hashtag battles, and intra-fandom 'wars' between groups (BTS ARMY vs. BLINKs vs. ONCEs, etc.).",
  summary:
    "K-pop fandom wars are the extreme edge of stan culture: coordinated metrics, mass reporting, and drama that spills into politics and racism debates. They share infrastructure with stan Twitter but add language barriers, time zones, and label strategy.",
  relatedSlugs: ["stan", "stan-twitter-culture", "ship", "receipts"],
  relationships: {
    relatedSlang: ["stan"],
    relatedTo: ["stan-twitter-culture"],
  },
  sources: [
    {
      title: "K-pop fandom — Wikipedia",
      url: "https://en.wikipedia.org/wiki/K-pop_fandom",
      domain: "en.wikipedia.org",
    },
    {
      title: "Stan culture — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Stan_(slang)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
