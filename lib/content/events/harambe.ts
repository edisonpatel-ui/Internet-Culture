import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e20",
  slug: "harambe",
  title: "Harambe",
  category: "event",
  description:
    "A May 2016 Cincinnati Zoo tragedy that the internet turned into a lasting meme cycle — tributes, jokes, remixes, and years of references after Harambe, a western lowland gorilla, was shot when a child entered his enclosure.",
  imageGradient: "from-emerald-800 via-green-700 to-stone-600",
  scores: { relevance: 50, influence: 85, cringe: 35, brainrot: 55 },
  addedAt: "2026-07-18",
  historicalDate: "2016-05-28",
  views: 5200000,
  trendDirection: "declining",
  tags: ["2016", "viral", "meme-event", "memorial", "social media"],
  platform: "Twitter, Facebook, Reddit, YouTube",
  impact:
    "The news was serious. The online afterlife was something else. Within days, Twitter, Facebook, Reddit, and YouTube filled with memorial posts, ironic tributes, and remixes. Phrases like “dicks out for Harambe” became part of mid-2010s meme slang. People kept citing Harambe years later as shorthand for how the internet turns sudden real-world news into humor and ritual. The animal’s death is not the joke — the meme response is what put the name into internet history.",
  highlights: [
    "May 28, 2016: Harambe, a western lowland gorilla at the Cincinnati Zoo, was fatally shot after a child entered the enclosure",
    "Within days, Twitter, Facebook, Reddit, and YouTube filled with tributes, jokes, and remixes that outlived the news cycle",
    "Became a durable 2016 reference point, including “dicks out for Harambe”-style memorial absurdism",
    "Still cited years later when people talk about how the internet turns sudden news into memes",
  ],
  relatedSlugs: ["coffin-dance", "area-51-raid", "100-men-vs-1-gorilla", "arthurs-fist"],
  relationships: {
    sameEra: ["area-51-raid"],
    relatedTo: ["coffin-dance", "100-men-vs-1-gorilla"],
  },
  media: [
    // AI suggested — KYM documentation image; human should confirm appropriateness
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/020/605/Harambe.jpg",
      title: "Harambe — cultural documentation image",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/harambe-the-gorilla",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Image associated with Harambe as an internet culture reference point — used for identification, not mockery of the animal's death.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/harambe-the-gorilla",
      title: "Harambe the Gorilla — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/harambe-the-gorilla",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the meme response and cultural afterlife.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Harambe",
      title: "Harambe — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Harambe",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Factual background on the Cincinnati Zoo incident and aftermath.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Harambe — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Harambe",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
