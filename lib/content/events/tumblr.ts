import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e27",
  slug: "tumblr",
  title: "Tumblr",
  category: "event",
  description:
    "The reblog machine of fandom, aesthetics, social justice discourse, and GIF culture — internet taste-making from 2007 onward.",
  imageGradient: "from-indigo-700 via-blue-600 to-slate-900",
  scores: { relevance: 55, influence: 90, cringe: 40, brainrot: 35 },
  addedAt: "2026-07-19",
  historicalDate: "2007-02-01",
  views: 5000000,
  trendDirection: "stable",
  tags: ["tumblr","fandom","aesthetics","platform","gifs"],
  platform: "Tumblr",
  impact:
    "Turned reblogs into a cultural accelerator for fandom, activism, aesthetics (pastel blogs, vaporwave-adjacent taste), and reaction GIFs. Many formats later associated with Twitter/TikTok incubated in Tumblr dashboards.",
  highlights: [
  "Founded 2007; peak cultural power in early–mid 2010s",
  "Reblog mechanics spread memes, fanworks, and discourse at dashboard speed",
  "Home to major aesthetic and fandom subcultures",
  "Ownership changes and NSFW bans altered the platform but not its historical footprint"
],
  relatedSlugs: ["doge","dat-boi","surprised-pikachu","two-buttons","myspace","is-this-a-pigeon"],
  relationships: {
  "relatedTo": [
    "doge",
    "dat-boi",
    "surprised-pikachu",
    "two-buttons",
    "is-this-a-pigeon"
  ],
  "sameEra": [
    "myspace"
  ],
  "community": [
    "doge"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/93/Tumblr_Wordmark.svg",
    "title": "Tumblr wordmark",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tumblr_Wordmark.svg",
    "platform": "wikimedia",
    "attribution": "Tumblr / see Commons file page",
    "license": "See Commons file page",
    "description": "Tumblr wordmark from Wikimedia Commons.",
    "date": "2007",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/tumblr",
    "title": "Tumblr — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/tumblr",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2007",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Tumblr",
    "title": "Tumblr — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Tumblr",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Tumblr — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Tumblr",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Tumblr — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/tumblr",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
