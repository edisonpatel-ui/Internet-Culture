import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m50",
  slug: "lord-farquaad-e",
  title: "Lord Farquaad E",
  category: "meme",
  description:
    "The deep-fried Markiplier-as-Lord-Farquaad image stamped with a giant Impact 'E' — a 2018 peak of absurdist dank meme humor.",
  imageGradient: "from-yellow-400 via-lime-500 to-green-700",
  scores: { relevance: 58, influence: 62, cringe: 48, brainrot: 78 },
  addedAt: "2026-07-18",
  historicalDate: "2018-02-15",
  views: 1900000,
  trendDirection: "declining",
  tags: ["deep-fried", "markiplier", "shrek", "2018", "dank", "ironic"],
  meaning:
    "A deliberately incomprehensible deep-fried mashup: Markiplier's face on Lord Farquaad (later Zuckerberg edits), captioned only with the letter E. Used as a symbol of how weird millennial/dank humor looked from the outside — and as a punchline inside that humor.",
  origin:
    "A Markiplier-on-Farquaad edit circulated from 2015 (Cyndago). The deep-fried 'E' version appeared on Tumblr's photo-frier blog in February 2018 and exploded on Reddit (/r/dankmemes, /r/deepfriedmemes, /r/me_irl) in April 2018 as 'Lord Marquaad E' (Know Your Meme).",
  timeline: [
    { date: "May 2015", event: "Early Markiplier/Farquaad face swap posted on Twitter" },
    { date: "Feb 2018", event: "Deep-fried 'E' version posted on Tumblr photo-frier" },
    { date: "Apr 2018", event: "Reddit spread; Zuckerberg-body variants on deepfriedmemes" },
    { date: "May 2018", event: "Covered by The Daily Dot; referenced by PewDiePie" },
    { date: "2018+", event: "Letter-meme spin-offs (M, C) and 'weird humor' templates" },
  ],
  examples: [
    "Memes Then / Memes Now panels ending on Farquaad E",
    "'Why is millennial humor so weird?' templates featuring the E face",
    "Any deep-fried reaction that answers a question with just 'E'",
  ],
  relatedSlugs: ["distorted-meme-face", "markiplier", "expanding-brain"],
  relationships: {
    sameFormat: ["distorted-meme-face"],
    popularizedBy: ["markiplier"],
    sameEra: ["expanding-brain"],
  },
  media: [
    // AI suggested — KYM entry icon is the defining deep-fried E image
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/026/008/Screen_Shot_2018-04-25_at_12.24.22_PM.png",
      title: "Lord Farquaad E / Lord Marquaad E — defining image",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/lord-marquaad-e",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "The deep-fried Markiplier–Farquaad composite with Impact letter E.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/lord-marquaad-e",
      title: "Lord Marquaad E — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/lord-marquaad-e",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and Reddit spread of the Lord Farquaad E meme.",
      date: "2018",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Lord Marquaad E — Know Your Meme",
      url: "https://knowyourmeme.com/memes/lord-marquaad-e",
      domain: "knowyourmeme.com",
    },
    {
      title: "The 'E' meme shows just how weird memes can get — The Daily Dot",
      url: "https://www.dailydot.com/unclick/e-meme-lord-farquaad-markiplier/",
      domain: "dailydot.com",
    },
  ],
};

export default entry;
