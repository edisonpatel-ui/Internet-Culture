import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e23",
  slug: "myspace",
  title: "Myspace",
  category: "event",
  description:
    "The mid-2000s social network of Top 8s, profile songs, and HTML chaos — internet identity before Facebook flattened the feed.",
  imageGradient: "from-blue-700 via-sky-500 to-zinc-900",
  scores: { relevance: 40, influence: 90, cringe: 45, brainrot: 25 },
  addedAt: "2026-07-19",
  historicalDate: "2003-08-01",
  views: 4100000,
  trendDirection: "stable",
  tags: ["myspace","social media","2000s","platform","history"],
  platform: "Myspace",
  impact:
    "Taught a generation to build public identity online: custom CSS, profile music, friend rankings, and scene/emo aesthetics. Its peak and decline became the template for social-platform succession stories.",
  highlights: [
  "Myspace (MySpace) dominated global social networking around 2005–2008",
  "Top Friends / Top 8 drama and profile songs defined teen internet culture",
  "Custom HTML/CSS profiles made personal pages a creative medium",
  "Facebook's rise and ownership changes ended its cultural monopoly"
],
  relatedSlugs: ["tumblr","newgrounds","cringe","y2k-revival","twitter-x-transition"],
  relationships: {
  "sameEra": [
    "newgrounds",
    "tumblr"
  ],
  "relatedTo": [
    "cringe",
    "y2k-revival"
  ],
  "relatedEvent": [
    "twitter-x-transition"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/MySpace_logo.svg",
    "title": "Myspace logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:MySpace_logo.svg",
    "platform": "wikimedia",
    "attribution": "Myspace / see Commons file page",
    "license": "See Commons file page",
    "description": "Official Myspace wordmark from Wikimedia Commons.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/myspace",
    "title": "Myspace — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/myspace",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Myspace",
    "title": "Myspace — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Myspace",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Myspace — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Myspace",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Myspace — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/myspace",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
