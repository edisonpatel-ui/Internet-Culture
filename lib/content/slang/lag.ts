import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s53",
  slug: "lag",
  title: "Lag",
  category: "slang",
  description:
    "Gaming/network slang for delayed input or stuttering connection — the eternal excuse and genuine curse of online play.",
  imageGradient: "from-zinc-500 via-slate-600 to-cyan-700",
  scores: { relevance: 75, influence: 85, cringe: 30, brainrot: 20 },
  addedAt: "2026-07-19",
  historicalDate: "1995-01-01",
  views: 6800000,
  trendDirection: "stable",
  tags: ["gaming","network","classic","slang","multiplayer"],
  definition:
    "Lag is noticeable delay between action and response — usually from high ping or packet loss. Players say 'lag' to describe stuttering gameplay or as a (sometimes dubious) excuse for dying.",
  origin:
    "From general English 'lag' (fall behind), adopted by early online multiplayer and netcode culture in the 1990s as the default word for latency problems (Know Your Meme).",
  usageExamples: [
    "Sorry that death was lag",
    "Server feels laggy tonight",
    "Lag switch accusations in competitive lobbies"
],
  relatedSlugs: ["gg","ez","noob","git-gud","press-f-to-pay-respects"],
  relationships: {
    "relatedSlang": [
        "gg",
        "ez",
        "noob",
        "git-gud"
    ],
    "relatedTo": [
        "press-f-to-pay-respects"
    ],
    "community": [
        "gg",
        "noob"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/002/262/lag.jpeg",
        "title": "Lag — meme documentation image",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/lag",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "KYM imagery documenting lag as gaming slang/culture.",
        "date": "1995",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/lag",
        "title": "Lag — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/lag",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "1995",
        "verified": false
    }
],
  sources: [
    {
        "title": "Lag — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/lag",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
