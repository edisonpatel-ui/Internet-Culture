import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m102",
  slug: "baby-yoda",
  title: "Baby Yoda",
  category: "meme",
  description:
    "Grogu from The Mandalorian — the big-eared Force-sensitive toddler whose cuteness broke the internet in late 2019.",
  imageGradient: "from-green-600 via-emerald-500 to-teal-400",
  scores: { relevance: 76, influence: 82, cringe: 40, brainrot: 45 },
  addedAt: "2026-07-23",
  historicalDate: "2019-11-12",
  views: 6800000,
  trendDirection: "stable",
  tags: ["star-wars", "mandalorian", "grogu", "2019", "disney-plus", "cute"],
  meaning:
    "Internet nickname for Grogu, the child character from Disney+'s The Mandalorian. Before official merchandise and the name 'Grogu' were widely known, fans called him Baby Yoda. Reaction images, thirst for merch, and wholesome memes turned a streaming launch character into one of 2019's biggest memes — proof that surprise cute reveals still move culture at scale.",
  origin:
    "The Mandalorian premiered on Disney+ on November 12, 2019. The reveal of a Yoda-like child at the end of Episode 1 (released with the launch) immediately went viral on Twitter and Reddit. Lucasfilm later confirmed the character's name as Grogu, but 'Baby Yoda' stuck as the meme label. Know Your Meme and mainstream outlets documented the meme surge within days of the premiere.",
  timeline: [
    { date: "Nov 12, 2019", event: "The Mandalorian launches on Disney+; Baby Yoda appears in Episode 1" },
    { date: "Nov 2019", event: "Twitter and Reddit explode with Baby Yoda reaction memes within 48 hours" },
    { date: "Dec 2019", event: "Merch demand outpaces official products; meme templates peak for holidays" },
    { date: "2020", event: "Season 1 storyline deepens; Grogu name revealed but 'Baby Yoda' persists" },
    { date: "2021+", event: "Settles as enduring Star Wars fandom shorthand and reaction image" },
  ],
  examples: [
    "Posting Baby Yoda sipping soup as a wholesome mood",
    "Waiting for Baby Yoda merch that doesn't exist yet (Nov 2019)",
    "Using Baby Yoda as the 'protect at all costs' reaction image",
  ],
  relatedSlugs: ["this-is-fine", "side-eyeing-chloe", "chill-guy"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/baby-yoda",
      title: "Baby Yoda — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/baby-yoda",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Baby Yoda meme surge after The Mandalorian premiere.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Grogu",
      title: "Grogu — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Grogu",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic background on the character and cultural reception.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Baby Yoda — Know Your Meme",
      url: "https://knowyourmeme.com/memes/baby-yoda",
      domain: "knowyourmeme.com",
    },
    {
      title: "Grogu — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Grogu",
      domain: "en.wikipedia.org",
    },
    {
      title: "The Mandalorian — Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Mandalorian",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
