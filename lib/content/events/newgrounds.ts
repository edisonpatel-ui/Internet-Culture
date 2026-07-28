import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e24",
  slug: "newgrounds",
  title: "Newgrounds",
  category: "event",
  description:
    "The Flash portal that incubated early web animation, games, and viral weirdness — from Tankmen to Numa Numa mirrors.",
  imageGradient: "from-yellow-400 via-orange-500 to-red-700",
  scores: { relevance: 45, influence: 84, cringe: 25, brainrot: 30 },
  addedAt: "2026-07-19",
  historicalDate: "1995-07-06",
  views: 3600000,
  trendDirection: "stable",
  tags: ["newgrounds","flash","animation","games","platform"],
  platform: "Newgrounds",
  impact:
    "Gave amateur animators and game makers a fame ladder before YouTube. Flash culture, submissions, and reviews shaped early internet comedy and indie game careers.",
  highlights: [
  "Newgrounds became the defining late-90s/2000s Flash entertainment portal",
  "Community submissions + review system minted viral animations and games",
  "Hosted or amplified early viral moments tied to Flash and web comedy",
  "Survived the Flash death era by pivoting while keeping portal identity"
],
  relatedSlugs: ["numa-numa","charlie-the-unicorn","badger-badger-badger","end-of-ze-world","all-your-base-are-belong-to-us"],
  relationships: {
  "relatedTo": [
    "numa-numa",
    "charlie-the-unicorn",
    "badger-badger-badger",
    "end-of-ze-world",
    "all-your-base-are-belong-to-us"
  ],
  "sameEra": [
    "myspace"
  ],
  "community": [
    "numa-numa",
    "charlie-the-unicorn"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Newgrounds-logo.png",
    "title": "Newgrounds logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Newgrounds-logo.png",
    "platform": "wikimedia",
    "attribution": "Newgrounds / see Commons file page",
    "license": "See Commons file page",
    "description": "Newgrounds portal logo from Wikimedia Commons.",
    "date": "1995",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/newgrounds",
    "title": "Newgrounds — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/newgrounds",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "1995",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Newgrounds",
    "title": "Newgrounds — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Newgrounds",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Newgrounds — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Newgrounds",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Newgrounds — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/newgrounds",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
