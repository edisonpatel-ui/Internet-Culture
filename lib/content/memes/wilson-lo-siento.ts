import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m59",
  slug: "wilson-lo-siento",
  title: "Wilson Lo Siento",
  category: "meme",
  description:
    "A floating chicken on flood debris dubbed with Spanish Cast Away audio — '¡Wilson! ¡Lo siento!' — peak absurdist TikTok tragedy comedy.",
  imageGradient: "from-sky-500 via-cyan-600 to-blue-800",
  scores: { relevance: 62, influence: 48, cringe: 35, brainrot: 78 },
  addedAt: "2026-07-18",
  historicalDate: "2023-08-30",
  views: 1200000,
  trendDirection: "stable",
  tags: ["tiktok", "absurdist", "2023", "cast away", "viral video"],
  meaning:
    "A tragicomic edit pairing footage of a chicken drifting on debris in floodwater with the Spanish dub of Cast Away's Wilson scene ('¡Wilson! ¡Lo siento!' — 'Wilson! I'm sorry!'). Used as absurdist melodrama, nostalgia bait, and parody soundtrack.",
  origin:
    "On August 30, 2023, TikToker @recidivo posted the chicken-in-flood clip with Spanish Cast Away audio; it exploded to tens of millions of views. Parodies (AI movie posters, trailers, brand uses) followed in late 2023 (Know Your Meme).",
  timeline: [
    { date: "2022", event: "Source flood footage circulates from Central American storm coverage" },
    { date: "Aug 30, 2023", event: "TikTok edit with Spanish Cast Away audio goes viral" },
    { date: "Oct–Nov 2023", event: "Parody trailers, AI posters, and platform remixes spread" },
    { date: "2026", event: "Resurfaces as nostalgia / Great Meme Reset throwback" },
  ],
  examples: [
    "Stitching any 'goodbye' moment with '¡Wilson! ¡Lo siento!'",
    "Fake movie trailers about the floating chicken",
    "Captioning a lost object drifting away as Wilson",
  ],
  relatedSlugs: ["dat-boi", "great-meme-reset", "coffin-dance"],
  relationships: {
    sameFormat: ["dat-boi"],
    relatedEvent: ["great-meme-reset"],
    relatedTo: ["coffin-dance"],
  },
  media: [
    // AI suggested — KYM cover; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/047/286/hq720_(1).jpg",
      title: "Wilson Lo Siento — meme cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/wilson-lo-siento",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover still representing the floating-chicken Wilson Lo Siento meme.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/wilson-lo-siento",
      title: "Wilson! Lo Siento! — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/wilson-lo-siento",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and spread of the Wilson Lo Siento TikTok meme.",
      date: "2023",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Wilson! Lo Siento! — Know Your Meme",
      url: "https://knowyourmeme.com/memes/wilson-lo-siento",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
