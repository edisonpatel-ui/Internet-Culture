import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e12",
  slug: "barbenheimer",
  title: "Barbenheimer",
  category: "event",
  description:
    "The cultural phenomenon of the simultaneous July 21, 2023 release of Barbie and Oppenheimer — which audiences watched in back-to-back sessions, creating one of the biggest cinema events of the modern era.",
  imageGradient: "from-pink-500 via-fuchsia-400 to-gray-700",
  scores: { relevance: 85, brainrot: 45, cringe: 15 },
  addedAt: "2026-07-17",
  historicalDate: "2023-07-21",
  views: 4200000,
  trendDirection: "declining",
  tags: ["film", "cinema", "2023", "cultural-event", "meme", "twitter"],
  platform: "Twitter, TikTok, Cinema",
  impact:
    "Barbenheimer demonstrated that internet meme culture could drive record-breaking cinema attendance. The double feature — bright pink Barbie followed by a three-hour WWII atomic bomb drama — created an absurd tonal contrast that the internet turned into a meme and audiences turned into a pilgrimage. Combined box office: $2.4B+. Both films were cultural touchstones that dominated conversation for months.",
  highlights: [
    "Barbie (Greta Gerwig) earned $1.4B worldwide, the highest-grossing film ever by a female director",
    "Oppenheimer (Christopher Nolan) earned $952M worldwide, Nolan's highest-grossing film",
    "Both films released on exactly the same date — July 21, 2023 — in direct competition",
    "Double feature became a social movement: audiences dressed in pink for Barbie, then gravely for Oppenheimer",
    "Meme format: bright pink Barbie aesthetics vs. atomic bomb imagery became universal shorthand for contradictory pairings",
    "AMC Theatres saw record daily ticket sales, servers crashed under demand",
  ],
  relatedSlugs: [],
  sources: [
    {
      title: "Barbenheimer — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barbenheimer",
      domain: "en.wikipedia.org",
    },
    {
      title: "Barbenheimer — Know Your Meme",
      url: "https://knowyourmeme.com/memes/barbenheimer",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
