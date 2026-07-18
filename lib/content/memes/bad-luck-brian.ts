import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m30",
  slug: "bad-luck-brian",
  title: "Bad Luck Brian",
  category: "meme",
  description:
    "The awkward yearbook-photo advice animal that became the internet's go-to face for misfortune, failure, and comically bad timing.",
  imageGradient: "from-sky-600 via-blue-500 to-indigo-500",
  scores: { relevance: 68, influence: 80, cringe: 42, brainrot: 35 },
  addedAt: "2026-07-17",
  historicalDate: "2012-01-01",
  views: 4200000,
  trendDirection: "declining",
  tags: ["advice-animal", "classic", "reddit", "2012", "yearbook", "misfortune"],
  meaning:
    "An advice-animal image macro of a smiling teen in a polo shirt and braces, captioned with absurdly unlucky scenarios. Used to punchline personal failures, awkward social moments, and cartoonishly bad luck.",
  origin:
    "The photo is of Kyle Craven, taken for a high-school yearbook around 2009. It was turned into a Reddit advice-animal meme around 2012, with Impact-font captions describing escalating misfortunes. Craven later embraced the fame and discussed licensing and interviews about the meme.",
  timeline: [
    { date: "~2009", event: "Kyle Craven's yearbook photo taken" },
    { date: "2012", event: "Bad Luck Brian advice-animal format spreads on Reddit" },
    { date: "2010s", event: "Becomes a mainstream shorthand for comedic misfortune across platforms" },
    { date: "2020s", event: "Usage declines but remains a recognizable classic meme face" },
  ],
  examples: [
    "Takes day off for mental health — gets called into work anyway [Bad Luck Brian]",
    "Buys new phone — drops it the same day",
    "Finally asks someone out — wrong person",
  ],
  relatedSlugs: ["success-kid", "philosoraptor", "rage-comics"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/2/2b/Bad_Luck_Brian.jpg",
      title: "Bad Luck Brian — original Kyle Craven yearbook photo",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Bad_Luck_Brian.jpg",
      platform: "wikimedia",
      attribution: "Kyle Craven yearbook photo (fair use for identification)",
      license: "Fair use",
      description:
        "The original Bad Luck Brian yearbook portrait — the braces-and-polo smile that defines the misfortune advice-animal format.",
      date: "2009",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/bad-luck-brian",
      title: "Bad Luck Brian — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/bad-luck-brian",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin, spread, and examples of the Bad Luck Brian advice animal.",
      date: "2012",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Bad Luck Brian — Know Your Meme",
      url: "https://knowyourmeme.com/memes/bad-luck-brian",
      domain: "knowyourmeme.com",
    },
    {
      title: "Bad Luck Brian — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Bad_Luck_Brian",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
