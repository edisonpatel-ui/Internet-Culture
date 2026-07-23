import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e37",
  slug: "llama-chase",
  title: "Arizona Llama Chase",
  category: "event",
  description:
    "The February 2015 Sun City, Arizona televised pursuit of two escaped llamas — a breaking-news absurdity that briefly owned Twitter and cable split-screens.",
  imageGradient: "from-amber-400 via-orange-300 to-sky-400",
  scores: { relevance: 35, influence: 72, cringe: 30, brainrot: 40 },
  addedAt: "2026-07-23",
  historicalDate: "2015-02-26",
  views: 2200000,
  trendDirection: "declining",
  tags: ["2015", "viral", "twitter", "animals", "news"],
  platform: "Twitter, cable news, YouTube",
  impact:
    "While news choppers tracked two llamas dodging capture through retirement-community streets, Twitter treated it like sport commentary. GIFs, pun threads, and split-screen jokes spread alongside serious headlines elsewhere. The chase ended when residents helped corral the animals. It became a pre-TikTok example of live absurdity converted instantly into participatory meme culture.",
  highlights: [
    "February 26, 2015: two llamas escaped a retirement-community visit in Sun City, Arizona",
    "Local TV helicopters broadcast the chase; Twitter exploded with live commentary",
    "Both llamas were captured after an hour-long pursuit",
    "Remembered as a classic \"slow news day\" internet moment alongside The Dress era",
  ],
  relatedSlugs: ["yanny-vs-laurel", "harambe", "area-51-raid", "reddit-culture"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Llama_chase_in_Arizona",
      title: "Llama chase in Arizona — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Llama_chase_in_Arizona",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Llama chase in Arizona — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Llama_chase_in_Arizona",
      domain: "en.wikipedia.org",
    },
    {
      title: "Arizona llama chase — BBC News",
      url: "https://www.bbc.com/news/world-us-canada-31642657",
      domain: "bbc.com",
    },
  ],
};

export default entry;
