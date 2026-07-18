import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m41",
  slug: "surprised-pikachu",
  title: "Surprised Pikachu",
  category: "meme",
  description:
    "The wide-eyed Pikachu reaction face used when an obvious consequence somehow still shocks someone.",
  imageGradient: "from-yellow-300 via-amber-300 to-red-400",
  scores: { relevance: 76, influence: 76, cringe: 32, brainrot: 42 },
  addedAt: "2026-07-17",
  historicalDate: "2018-09-01",
  views: 4500000,
  trendDirection: "stable",
  tags: ["reaction", "pokemon", "2018", "tumblr", "twitter", "classic"],
  meaning:
    "A reaction image of Pikachu looking shocked with an open mouth. Captioned for moments of fake surprise — when someone does something predictably dumb and then acts stunned by the result. The joke is that the outcome was obvious.",
  origin:
    "The still comes from the Pokémon anime. Know Your Meme and Wikipedia credit Tumblr user popokko with popularizing the shocked-face crop as a reaction format in September 2018; it then flooded Twitter and Reddit as a caption meme.",
  timeline: [
    { date: "1997–98", event: "Source animation appears in the original Pokémon anime" },
    { date: "Sep 2018", event: "Tumblr user popokko popularizes the shocked Pikachu still as a reaction" },
    { date: "Late 2018", event: "Format explodes on Twitter/Reddit with 'surprised by obvious consequences' captions" },
    { date: "2019+", event: "Becomes a durable reaction staple across platforms" },
  ],
  examples: [
    "Me when I skip studying and somehow fail the test [Surprised Pikachu]",
    "Company ignores users for years → users leave → Surprised Pikachu",
    "Any 'I did the thing that causes X and got X' joke",
  ],
  relatedSlugs: ["woman-yelling-at-cat", "distracted-boyfriend", "hide-the-pain-harold"],
  media: [
    // AI suggested — KYM entry image is the defining surprised Pikachu still
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png",
      title: "Surprised Pikachu — reaction still",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/surprised-pikachu",
      platform: "knowyourmeme",
      attribution: "Pokémon / The Pokémon Company (fair use for identification via KYM)",
      license: "Copyrighted — used for identification",
      description:
        "The open-mouthed shocked Pikachu face that defines the Surprised Pikachu reaction meme.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/surprised-pikachu",
      title: "Surprised Pikachu — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/surprised-pikachu",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the still and timeline of the 2018 reaction wave.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Surprised_Pikachu",
      title: "Surprised Pikachu — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Surprised_Pikachu",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic overview of the meme and its Pokémon source.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Surprised Pikachu — Know Your Meme",
      url: "https://knowyourmeme.com/memes/surprised-pikachu",
      domain: "knowyourmeme.com",
    },
    {
      title: "Surprised Pikachu — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Surprised_Pikachu",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
