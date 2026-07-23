import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m114",
  slug: "florida-man",
  title: "Florida Man",
  category: "meme",
  description:
    "The running joke that Florida news headlines read like absurdist fiction — 'Florida Man [does unhinged thing].'",
  imageGradient: "from-lime-500 via-green-400 to-emerald-300",
  scores: { relevance: 72, influence: 78, cringe: 40, brainrot: 45 },
  addedAt: "2026-07-23",
  historicalDate: "2013-01-01",
  views: 3500000,
  trendDirection: "stable",
  tags: ["florida", "news", "headline", "2013", "twitter", "classic"],
  meaning:
    "A meme format treating bizarre crime and oddity headlines from Florida as a single recurring character — 'Florida Man.' The humor combines real Sunshine State news weirdness (public records laws, regional reporting habits) with anthropomorphization: Florida Man fights gator, Florida Man wears nacho hat to DUI stop. It is part headline parody, part regional stereotype.",
  origin:
    "Know Your Meme and mainstream outlets trace '@_FloridaMan' Twitter account to January 2013, aggregating strange Florida headlines. The 'Florida Man' phrasing aligned with how news sites title stories ('Florida man arrested for…'). Twitter hashtag #FloridaMan and Reddit r/FloridaMan cemented the meme; Miami New Times and others documented the phenomenon as both joke and journalism pattern.",
  timeline: [
    { date: "Jan 2013", event: "@_FloridaMan Twitter account begins aggregating bizarre headlines" },
    { date: "2013–2014", event: "#FloridaMan hashtag and Reddit community grow" },
    { date: "2015", event: "Mainstream media explain the meme; Florida Man enters general vocabulary" },
    { date: "2019", event: "Florida Man game and merchandise peak novelty cycle" },
    { date: "2020s", event: "Still used whenever a headline sounds too unhinged to be real" },
  ],
  examples: [
    "Florida Man breaks into house to pet cat, leaves note",
    "Headline format: 'Florida Man [verb] [absurd object] while [second absurd act]'",
    "National story breaks — everyone checks if it's Florida Man again",
  ],
  relatedSlugs: ["bad-luck-brian", "this-is-fine", "ohio-final-boss"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/florida-man",
      title: "Florida Man — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/florida-man",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Florida Man headline meme.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Florida_Man",
      title: "Florida Man — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Florida_Man",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Florida Man — Know Your Meme",
      url: "https://knowyourmeme.com/memes/florida-man",
      domain: "knowyourmeme.com",
    },
    {
      title: "Florida Man — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Florida_Man",
      domain: "en.wikipedia.org",
    },
    {
      title: "Florida Man: America's meme — BBC",
      url: "https://www.bbc.com/news/world-us-canada-25890158",
      domain: "bbc.com",
    },
  ],
};

export default entry;
