import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m60",
  slug: "all-your-base-are-belong-to-us",
  title: "All Your Base Are Belong to Us",
  category: "meme",
  description:
    "The Zero Wing Engrish catchphrase that became one of the internet's first mainstream memes — 'All your base are belong to us.'",
  imageGradient: "from-black via-red-700 to-yellow-500",
  scores: { relevance: 30, influence: 92, cringe: 22, brainrot: 40 },
  addedAt: "2026-07-18",
  historicalDate: "2001-02-16",
  views: 4800000,
  trendDirection: "declining",
  tags: ["classic", "gaming", "early internet", "engrish", "2001", "flash"],
  meaning:
    "A broken-English declaration of dominance from Zero Wing's opening cutscene. Online it became a snowclone ('All your X are belong to us') for takeovers, raids, and early-web absurdist humor — often paired with CATS's face and Photoshopped real-world signs.",
  origin:
    "The line comes from the poorly translated European Mega Drive port of Zero Wing (1991). Forum GIFs spread in the late 1990s; a February 2001 Newgrounds Flash music video by Bad_CRC (set to The Laziest Men on Mars) pushed it into mainstream press (Wired, USA Today) (Wikipedia, Know Your Meme).",
  timeline: [
    { date: "1991", event: "Zero Wing Mega Drive English script ships with the infamous line" },
    { date: "1999–2000", event: "GIFs and quotes circulate on gaming forums" },
    { date: "Feb 16, 2001", event: "Bad_CRC Flash music video posted to Newgrounds — meme goes mainstream" },
    { date: "2001–2000s", event: "Image macros, real-world signs, TV ticker pranks, YouTube placeholder joke" },
    { date: "2010s–20s", event: "Enduring early-internet reference and anniversary coverage" },
  ],
  examples: [
    "Photoshopping 'ALL YOUR BASE ARE BELONG TO US' onto highway signs",
    "Snowclone: 'All your memes are belong to us'",
    "Calling any takeover moment 'for great justice'",
  ],
  relatedSlugs: [
    "leeroy-jenkins",
    "rickroll",
    "trollface",
    "nyan-cat",
    "end-of-ze-world",
    "do-a-barrel-roll",
    "the-cake-is-a-lie",
  ],
  relationships: {
    sameEra: ["trollface", "nyan-cat", "end-of-ze-world"],
    relatedTo: [
      "leeroy-jenkins",
      "rickroll",
      "do-a-barrel-roll",
      "the-cake-is-a-lie",
    ],
    community: ["leeroy-jenkins"],
  },
  media: [
    // AI suggested — KYM icon / Zero Wing still documentation
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/000/013/maxresdefault-2.jpg",
      title: "All Your Base Are Belong to Us — Zero Wing still",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/all-your-base-are-belong-to-us",
      platform: "knowyourmeme",
      attribution: "Zero Wing / Toaplan (via Know Your Meme documentation)",
      description: "Defining Zero Wing cutscene imagery associated with the All Your Base meme.",
      date: "1991",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us",
      title: "All your base are belong to us — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic history of the Zero Wing translation meme.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/all-your-base-are-belong-to-us",
      title: "All Your Base Are Belong to Us — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/all-your-base-are-belong-to-us",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Meme timeline, Flash video, and derivatives.",
      date: "2001",
      verified: false,
    },
  ],
  sources: [
    {
      title: "All your base are belong to us — Wikipedia",
      url: "https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us",
      domain: "en.wikipedia.org",
    },
    {
      title: "All Your Base Are Belong to Us — Know Your Meme",
      url: "https://knowyourmeme.com/memes/all-your-base-are-belong-to-us",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
