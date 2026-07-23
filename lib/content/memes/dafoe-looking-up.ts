import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m58",
  slug: "dafoe-looking-up",
  title: "Dafoe Looking Up",
  category: "meme",
  description:
    "Willem Dafoe as van Gogh staring skyward — the go-to still for anxiety, overwhelm, or literally looking at something above you.",
  imageGradient: "from-sky-700 via-indigo-800 to-slate-900",
  scores: { relevance: 74, influence: 60, cringe: 18, brainrot: 42 },
  addedAt: "2026-07-18",
  historicalDate: "2020-05-22",
  views: 2400000,
  trendDirection: "stable",
  tags: ["reaction", "willem dafoe", "2020", "caption", "anxiety"],
  meaning:
    "A reaction still (often also circulated as a GIF) of Willem Dafoe looking upward with an overwhelmed expression. Captions place a threat, mess, or awkward object 'above' the subject — or simply signal panic and intensity.",
  origin:
    "The shot comes from the 2018 film At Eternity's Gate (van Gogh biopic), visible in the trailer. It spread as a caption template on iFunny in May 2020 and peaked again on Twitter and Reddit around Spider-Man: No Way Home discourse when Dafoe trended (Know Your Meme, Daily Dot). This entry documents the still/frame — not GIF hosting infrastructure.",
  timeline: [
    { date: "Sep 2018", event: "At Eternity's Gate trailer features the looking-up shot" },
    { date: "May 2020", event: "iFunny caption templates popularize the still/GIF" },
    { date: "2020–21", event: "Wide use as anxiety / looking-up reaction format" },
    { date: "Dec 2021", event: "Resurgence as Willem Dafoe trends with No Way Home" },
  ],
  examples: [
    "Me looking at the group project deadline I forgot about",
    "When you hear a weird noise in the ceiling at 3 a.m.",
    "Any caption about staring at a problem hovering overhead",
  ],
  relatedSlugs: ["surprised-pikachu", "hide-the-pain-harold", "arthurs-fist"],
  relationships: {
    sameFormat: ["surprised-pikachu", "hide-the-pain-harold", "arthurs-fist"],
  },
  media: [
    // AI suggested — KYM cover still (primary frame, not a GIF asset)
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/040/775/cover3.jpg",
      title: "Dafoe Looking Up — primary still frame",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/willem-dafoe-looking-up",
      platform: "knowyourmeme",
      attribution: "At Eternity's Gate still (via Know Your Meme documentation)",
      description:
        "The defining looking-up still of Willem Dafoe used as the reaction meme frame.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/willem-dafoe-looking-up",
      title: "Willem Dafoe Looking Up — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/willem-dafoe-looking-up",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Film origin and iFunny/Twitter spread of the looking-up meme.",
      date: "2020",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Willem Dafoe Looking Up — Know Your Meme",
      url: "https://knowyourmeme.com/memes/willem-dafoe-looking-up",
      domain: "knowyourmeme.com",
    },
    {
      title: "A short history of the Willem Dafoe Looking Up meme — Daily Dot",
      url: "https://www.dailydot.com/memes/willem-dafoe-looking-up-meme/",
      domain: "dailydot.com",
    },
  ],
};

export default entry;
