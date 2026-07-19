import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m68",
  slug: "charlie-the-unicorn",
  title: "Charlie the Unicorn",
  category: "meme",
  description:
    "Jason Steele / FilmCow's deadpan unicorn short — candy mountain absurdist Flash that defined mid-2000s web animation comedy.",
  imageGradient: "from-pink-400 via-fuchsia-500 to-purple-700",
  scores: { relevance: 40, influence: 72, cringe: 28, brainrot: 60 },
  addedAt: "2026-07-19",
  historicalDate: "2005-01-01",
  views: 2800000,
  trendDirection: "stable",
  tags: ["classic","flash","filmcow","absurdist","2005","youtube"],
  meaning:
    "A surreal short about Charlie the Unicorn dragged to Candy Mountain by two chaotic unicorns. Catchphrases and the abrupt twist ending made it a staple of Newgrounds/YouTube absurdist humor.",
  origin:
    "Created by Jason Steele (FilmCow); the first Charlie the Unicorn animation spread on Newgrounds and YouTube in the mid-2000s and spawned sequels and quotes (Know Your Meme).",
  timeline: [
    {
        "date": "2005",
        "event": "Charlie the Unicorn debuts and spreads on Flash/YouTube portals"
    },
    {
        "date": "2008+",
        "event": "Sequels and quote memes expand the FilmCow universe"
    },
    {
        "date": "2010s",
        "event": "Remains a nostalgia touchstone for absurdist web cartoons"
    }
],
  examples: [
    "Quoting 'Candy Mountain' about any suspicious adventure",
    "Calling a friend Charlie when they get peer-pressured into nonsense",
    "Nostalgia rewatches of mid-2000s FilmCow shorts"
],
  relatedSlugs: ["end-of-ze-world","badger-badger-badger","peanut-butter-jelly-time","nyan-cat"],
  relationships: {
    "sameEra": [
        "end-of-ze-world",
        "badger-badger-badger",
        "peanut-butter-jelly-time"
    ],
    "relatedTo": [
        "nyan-cat"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/034/charlie.jpg",
        "title": "Charlie the Unicorn — series still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/charlie-the-unicorn",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Charlie the Unicorn character imagery.",
        "date": "2005",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/charlie-the-unicorn",
        "title": "Charlie the Unicorn — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/charlie-the-unicorn",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2005",
        "verified": false
    }
],
  sources: [
    {
        "title": "Charlie the Unicorn — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/charlie-the-unicorn",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
