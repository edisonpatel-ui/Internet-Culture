import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s52",
  slug: "noob",
  title: "Noob",
  category: "slang",
  description:
    "Pejorative for a new or unskilled player — from 'newbie,' written n00b in classic leetspeak.",
  imageGradient: "from-green-500 via-lime-600 to-zinc-800",
  scores: { relevance: 68, influence: 88, cringe: 43, brainrot: 25 },
  addedAt: "2026-07-19",
  historicalDate: "1990-01-01",
  views: 7200000,
  trendDirection: "stable",
  tags: ["gaming","classic","leet","slang","newcomer"],
  definition:
    "Noob (also newbie, n00b) labels someone as inexperienced — especially in games or tech. Can describe a true newcomer or insult someone playing poorly regardless of tenure.",
  origin:
    "From 'newbie' in early online communities and MUDs; 'noob'/'n00b' leetspeak variants became standard gaming insults through the 1990s–2000s (Know Your Meme).",
  usageExamples: [
    "Stop noob-tubing with the grenade launcher",
    "I'm still a noob at this MOBA — go easy",
    "Calling out 'noob mistake' after a basic misplay"
],
  relatedSlugs: ["git-gud","gg","ez","lag","leeroy-jenkins"],
  relationships: {
    "relatedSlang": [
        "git-gud",
        "gg",
        "ez",
        "lag"
    ],
    "relatedTo": [
        "leeroy-jenkins"
    ],
    "community": [
        "git-gud",
        "gg"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/001/304/n00b.png",
        "title": "Noob — classic n00b graphic",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/noob",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Classic leetspeak n00b imagery associated with the term.",
        "date": "1990",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/noob",
        "title": "Noob — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/noob",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "1990",
        "verified": false
    }
],
  sources: [
    {
        "title": "Noob — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/noob",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
