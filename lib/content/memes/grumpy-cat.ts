import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m34",
  slug: "grumpy-cat",
  title: "Grumpy Cat",
  category: "meme",
  description:
    "Tardar Sauce — the frowning cat whose permanent scowl became one of the defining animal memes and merchandising empires of the 2010s.",
  imageGradient: "from-stone-500 via-neutral-500 to-zinc-600",
  scores: { relevance: 72, influence: 86, cringe: 15, brainrot: 30 },
  addedAt: "2026-07-17",
  historicalDate: "2012-09-01",
  views: 6200000,
  trendDirection: "declining",
  tags: ["cat", "animal", "classic", "2012", "merchandise", "viral"],
  meaning:
    "Photos and captions of Grumpy Cat (Tardar Sauce) used to deliver deadpan negativity, rejection, or 'no' energy — 'I had fun once… it was awful' style humor built around her downturned mouth and scowling eyes.",
  origin:
    "Tardar Sauce was born in 2012 with a feline dwarfism-related appearance that gave her a perpetual frown. Owner Tabatha Bundesen's brother posted photos to Reddit in September 2012; the cat went viral overnight as 'Grumpy Cat,' spawning image macros, a book, a movie, and a large merchandising brand.",
  timeline: [
    { date: "Sep 2012", event: "Photos of Tardar Sauce posted to Reddit — Grumpy Cat goes viral" },
    { date: "2013–2016", event: "Merch empire, Friskies ads, books, and a Lifetime movie expand the brand" },
    { date: "May 2019", event: "Tardar Sauce dies; tributes recirculate classic Grumpy Cat images" },
  ],
  examples: [
    "Monday morning mood [Grumpy Cat]",
    "I had fun once. It was awful.",
    "No. Just no. [Grumpy Cat stare]",
  ],
  relatedSlugs: ["doge", "keyboard-cat", "nyan-cat"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Grumpy_Cat_by_Gage_Skidmore.jpg",
      title: "Grumpy Cat (Tardar Sauce) — Gage Skidmore photo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Grumpy_Cat_by_Gage_Skidmore.jpg",
      platform: "wikimedia",
      attribution: "Gage Skidmore (CC BY-SA 3.0)",
      license: "CC BY-SA 3.0",
      description:
        "Recognizable photo of Grumpy Cat — the frowning face that defined the meme and brand.",
      date: "2014",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/grumpy-cat",
      title: "Grumpy Cat — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/grumpy-cat",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of Tardar Sauce photos and the Grumpy Cat caption phenomenon.",
      date: "2012",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Grumpy Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/grumpy-cat",
      domain: "knowyourmeme.com",
    },
    {
      title: "Grumpy Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Grumpy_Cat",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
