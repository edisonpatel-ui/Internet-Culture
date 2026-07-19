import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m78",
  slug: "the-cake-is-a-lie",
  title: "The Cake Is a Lie",
  category: "meme",
  description:
    "Portal's graffiti promise of cake — the gaming catchphrase for bait rewards and false incentives.",
  imageGradient: "from-orange-300 via-rose-400 to-stone-700",
  scores: { relevance: 58, influence: 88, cringe: 18, brainrot: 28 },
  addedAt: "2026-07-19",
  historicalDate: "2007-10-10",
  views: 5400000,
  trendDirection: "stable",
  tags: ["gaming","portal","2007","catchphrase","valve"],
  meaning:
    "Graffiti in Portal warns that 'the cake is a lie' — the promised reward is fake. Online it means any dangling incentive, corporate promise, or bait-and-switch.",
  origin:
    "Valve's Portal (2007) hides the phrase in Rat Man dens; it escaped the game almost immediately onto forums, shirts, and image macros (Know Your Meme).",
  timeline: [
    {
        "date": "Oct 2007",
        "event": "Portal releases; cake graffiti becomes an instant meme"
    },
    {
        "date": "2008–10s",
        "event": "Phrase enters general internet slang beyond gamers"
    },
    {
        "date": "Later",
        "event": "Still used for any promised reward that will not arrive"
    }
],
  examples: [
    "Calling a scam giveaway 'the cake is a lie'",
    "Office jokes about performance-bonus cake",
    "Graffiti-style image macros quoting the line"
],
  relatedSlugs: ["arrow-to-the-knee","can-it-run-crysis","all-your-base-are-belong-to-us","do-a-barrel-roll"],
  relationships: {
    "sameEra": [
        "can-it-run-crysis",
        "arrow-to-the-knee"
    ],
    "relatedTo": [
        "all-your-base-are-belong-to-us",
        "do-a-barrel-roll"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/001/707/thecakeisalie.jpg",
        "title": "The Cake Is a Lie — Portal graffiti",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Portal cake graffiti meme image.",
        "date": "2007",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "title": "The Cake Is a Lie — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2007",
        "verified": false
    }
],
  sources: [
    {
        "title": "The Cake Is a Lie — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
