import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e42",
  slug: "will-smith-oscars-slap",
  title: "Will Smith Oscar Slap",
  category: "event",
  description:
    "Will Smith striking Chris Rock on live TV at the 2022 Academy Awards after a joke about Jada Pinkett Smith — an instantly memed Oscars moment.",
  imageGradient: "from-yellow-500 via-amber-400 to-neutral-900",
  scores: { relevance: 35, influence: 87, cringe: 35, brainrot: 20 },
  addedAt: "2026-07-23",
  historicalDate: "2022-03-27",
  views: 7200000,
  trendDirection: "stable",
  tags: ["2022", "oscars", "viral", "awards", "meme-event"],
  platform: "ABC, Twitter, TikTok, YouTube",
  impact:
    "During the 94th Oscars broadcast, Chris Rock joked about Jada Pinkett Smith's hair; Will Smith walked on stage and slapped Rock, then won Best Actor minutes later. Clips circulated before the show ended — reaction GIFs, audio-only memes, and debate about violence vs. comedy on live TV. The Academy banned Smith from attending Oscars events for 10 years in April 2022. The moment joined Kanye–Taylor and envelope chaos as Oscars infrastructure breaking into pure internet event.",
  highlights: [
    "March 27, 2022: Will Smith slapped Chris Rock on stage at the 94th Academy Awards",
    "Smith later won Best Actor for King Richard during the same broadcast",
    "The Academy banned Smith from attending Oscars events for 10 years in April 2022",
    "Clips and memes spread globally within minutes of the live broadcast",
  ],
  relatedSlugs: ["tiktok-rise", "twitter-x-transition", "influencer-culture", "cringe"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Chris_Rock%E2%80%93Will_Smith_slapping_incident",
      title: "Chris Rock–Will Smith slapping incident — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Chris_Rock%E2%80%93Will_Smith_slapping_incident",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Chris Rock–Will Smith slapping incident — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Chris_Rock%E2%80%93Will_Smith_slapping_incident",
      domain: "en.wikipedia.org",
    },
    {
      title: "Oscars slap — BBC News",
      url: "https://www.bbc.com/news/entertainment-arts-60887337",
      domain: "bbc.com",
    },
  ],
};

export default entry;
