import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e28",
  slug: "balloon-boy",
  title: "Balloon Boy Hoax",
  category: "event",
  description:
    "The October 2009 Colorado incident when Richard Heene claimed his six-year-old son Falcon was trapped aboard a runaway helium balloon — a story that collapsed live on TV and became an early viral-news meme.",
  imageGradient: "from-sky-500 via-blue-400 to-slate-300",
  scores: { relevance: 42, influence: 78, cringe: 72, brainrot: 35 },
  addedAt: "2026-07-23",
  historicalDate: "2009-10-15",
  views: 1800000,
  trendDirection: "declining",
  tags: ["2009", "hoax", "viral news", "cable tv", "meme-event"],
  platform: "Cable TV, Twitter, YouTube",
  impact:
    "Before TikTok, this was what a full internet cycle looked like: cable news treated a family stunt as breaking news, millions watched the balloon drift, and the boy's on-air admission — \"We did this for the show\" — turned the story inside out in real time. The Heenes later pleaded guilty to charges related to the hoax. Balloon Boy became shorthand for manufactured virality, credulous live coverage, and the hunger for a spectacle that could dominate a whole afternoon online.",
  highlights: [
    "October 15, 2009: a silver helium balloon flew over Colorado while the Heene family claimed six-year-old Falcon was aboard",
    "Hours of live cable coverage ended when Falcon was found safe at home and later said on CNN they did it \"for the show\"",
    "Richard and Mayumi Heene pleaded guilty to charges related to the hoax in 2009",
    "Became an early template for how a local stunt could hijack national attention and spawn years of jokes",
  ],
  relatedSlugs: ["4chan", "reddit-culture", "harambe", "area-51-raid"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Balloon_boy_hoax",
      title: "Balloon boy hoax — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Balloon_boy_hoax",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Timeline of the 2009 Colorado balloon incident and criminal pleas.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Balloon boy hoax — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Balloon_boy_hoax",
      domain: "en.wikipedia.org",
    },
    {
      title: "Balloon Boy — Know Your Meme",
      url: "https://knowyourmeme.com/memes/balloon-boy",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
