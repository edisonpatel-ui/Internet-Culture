import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e30",
  slug: "blockout-2024",
  title: "Blockout 2024",
  category: "event",
  description:
    "A May 2024 social-media campaign urging users to block celebrities and brands seen as ignoring the Gaza crisis — framed online as a \"digital guillotine\" pressure tactic.",
  imageGradient: "from-zinc-800 via-neutral-700 to-stone-500",
  scores: { relevance: 72, influence: 68, cringe: 35, brainrot: 25 },
  addedAt: "2026-07-23",
  historicalDate: "2024-05-01",
  views: 1200000,
  trendDirection: "declining",
  tags: ["2024", "activism", "tiktok", "celebrity", "blockout"],
  platform: "TikTok, Instagram, X",
  impact:
    "After the 2024 Met Gala drew criticism for perceived tone-deaf luxury display during ongoing conflict coverage, TikTok and Instagram users promoted mass-blocking of celebrity accounts to hit engagement metrics. Lists circulated naming actors, influencers, and brands; some creators reported follower drops. Supporters called it collective economic pressure; critics questioned effectiveness and accuracy of target lists. Blockout 2024 became a case study in how activist framing spreads through influencer-platform mechanics.",
  highlights: [
    "May 2024: #Blockout2024 and \"digital guillotine\" hashtags spread on TikTok and Instagram",
    "Users shared block lists targeting celebrities and brands accused of silence on Gaza",
    "Debate split between supporters of economic pressure and skeptics of list accuracy and impact",
    "Highlighted how platform follow counts became a visible proxy for political accountability online",
  ],
  relatedSlugs: ["tiktok-rise", "influencer-culture", "creator-economy", "instagram-culture"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/2024_Met_Gala",
      title: "2024 Met Gala — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/2024_Met_Gala",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Context for the celebrity event that preceded Blockout momentum.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "What is the digital guillotine? — BBC News",
      url: "https://www.bbc.com/news/articles/cw4gve0lggvo",
      domain: "bbc.com",
    },
    {
      title: "Celebrity blockout campaign — NPR",
      url: "https://www.npr.org/2024/05/15/nx-s1-4976544/celebrity-blockout-campaign-gaza",
      domain: "npr.org",
    },
  ],
};

export default entry;
