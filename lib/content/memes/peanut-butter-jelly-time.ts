import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m70",
  slug: "peanut-butter-jelly-time",
  title: "Peanut Butter Jelly Time",
  category: "meme",
  description:
    "The Buckwheat Boyz song + dancing banana Flash — early-2000s earworm that refused to leave AIM away messages.",
  imageGradient: "from-yellow-300 via-amber-400 to-yellow-600",
  scores: { relevance: 40, influence: 75, cringe: 35, brainrot: 50 },
  addedAt: "2026-07-19",
  historicalDate: "2001-01-01",
  views: 3600000,
  trendDirection: "stable",
  tags: ["classic","flash","earworm","banana","early internet"],
  meaning:
    "A Flash of a dancing banana set to 'It's peanut butter jelly time!' Used as spam comedy, bait link, and shorthand for annoyingly catchy early-web animation.",
  origin:
    "The Buckwheat Boyz song paired with the dancing-banana Flash spread in the early 2000s across forums and Instant Messenger culture; later YouTube reuploads kept PBJT alive (Know Your Meme).",
  timeline: [
    {
        "date": "Early 2000s",
        "event": "Dancing Banana / PBJT Flash circulates on portals and AIM"
    },
    {
        "date": "Mid-2000s",
        "event": "Becomes a default bait-and-switch / earworm meme"
    },
    {
        "date": "2010s+",
        "event": "Nostalgia reuploads and references in later meme history"
    }
],
  examples: [
    "Linking the banana Flash as a rickroll-era cousin",
    "Singing 'peanut butter jelly time' unprompted in chat",
    "Banana GIFs captioned as PBJT"
],
  relatedSlugs: ["badger-badger-badger","hamster-dance","rickroll","nyan-cat"],
  relationships: {
    "sameEra": [
        "badger-badger-badger",
        "hamster-dance"
    ],
    "sameFormat": [
        "badger-badger-badger"
    ],
    "relatedTo": [
        "rickroll",
        "nyan-cat"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "gif",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/188/DancingBannana.gif",
        "title": "Peanut Butter Jelly Time — dancing banana",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/peanut-butter-jelly-time",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Canonical dancing banana Flash GIF.",
        "date": "2001",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/peanut-butter-jelly-time",
        "title": "Peanut Butter Jelly Time — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/peanut-butter-jelly-time",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2001",
        "verified": false
    }
],
  sources: [
    {
        "title": "Peanut Butter Jelly Time — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/peanut-butter-jelly-time",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
