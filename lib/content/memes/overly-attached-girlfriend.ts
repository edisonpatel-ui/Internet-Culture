import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m56",
  slug: "overly-attached-girlfriend",
  title: "Overly Attached Girlfriend",
  category: "meme",
  description:
    "Laina Morris's wide-eyed webcam smile turned 2012 advice-animal — the face of clingy girlfriend jokes.",
  imageGradient: "from-rose-400 via-pink-500 to-fuchsia-600",
  scores: { relevance: 55, influence: 75, cringe: 50, brainrot: 28 },
  addedAt: "2026-07-18",
  historicalDate: "2012-06-06",
  views: 4500000,
  trendDirection: "declining",
  tags: ["advice animal", "2012", "classic", "youtube", "image macro"],
  meaning:
    "An advice-animal / image-macro face: the still of Laina Morris smiling intently at the webcam, captioned as an obsessively clingy girlfriend — Facebook stalking, jealousy, overcommitment as punchlines.",
  origin:
    "On June 6, 2012, YouTuber wzr0713 (Laina Morris) uploaded a Justin Bieber 'Boyfriend' parody for a contest. A still from the video became the Overly Attached Girlfriend macro on Reddit and meme sites within days (Know Your Meme, Wikipedia).",
  timeline: [
    { date: "Jun 6, 2012", event: "Original 'JB Fanvideo' Bieber parody uploaded to YouTube" },
    { date: "Jun 2012", event: "Webcam still becomes an advice-animal image macro" },
    { date: "2012–13", event: "Mainstream coverage; Laina continues OAG-branded content" },
    { date: "2010s", event: "Template becomes a classic early-2010s meme staple" },
  ],
  examples: [
    "Top text: calls you · Bottom text: from outside your window",
    "I checked your browser history… cute dog meme tabs",
    "Any joke about unhealthy attachment using the OAG face",
  ],
  relatedSlugs: ["bad-luck-brian", "philosoraptor", "success-kid"],
  relationships: {
    sameFormat: ["bad-luck-brian", "philosoraptor", "success-kid"],
    sameEra: ["bad-luck-brian"],
  },
  media: [
    // AI suggested — KYM icon is the defining OAG still
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/010/496/Overly_attached_GF.jpg",
      title: "Overly Attached Girlfriend — defining still",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/overly-attached-girlfriend",
      platform: "knowyourmeme",
      attribution: "Laina Morris / original YouTube still (via Know Your Meme)",
      description: "The webcam still used as the Overly Attached Girlfriend image macro.",
      date: "2012",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/overly-attached-girlfriend",
      title: "Overly Attached Girlfriend — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/overly-attached-girlfriend",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin video and advice-animal spread.",
      date: "2012",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Overly_Attached_Girlfriend",
      title: "Overly Attached Girlfriend — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Overly_Attached_Girlfriend",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic summary of Laina Morris and the OAG meme.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Overly Attached Girlfriend — Know Your Meme",
      url: "https://knowyourmeme.com/memes/overly-attached-girlfriend",
      domain: "knowyourmeme.com",
    },
    {
      title: "Overly Attached Girlfriend — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Overly_Attached_Girlfriend",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
