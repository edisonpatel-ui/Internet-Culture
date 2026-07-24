import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m71",
  slug: "hamster-dance",
  title: "Hamster Dance",
  category: "meme",
  description:
    "Deidre LaCarte's late-90s GeoCities page of dancing hamster GIFs — one of the first true internet memes (also spelled Hampster Dance).",
  imageGradient: "from-rose-300 via-pink-400 to-orange-300",
  scores: { relevance: 24, influence: 95, cringe: 22, brainrot: 45 },
  addedAt: "2026-07-19",
  historicalDate: "1998-08-01",
  views: 4100000,
  trendDirection: "declining",
  tags: ["classic","geocities","1990s","earworm","proto-meme"],
  meaning:
    "Rows of animated dancing hamsters looped to a sped-up Whistle Stop sample. Symbol of late-90s web fads, email forwards, and office homepage pranks — often spelled 'Hampster' after the original branding.",
  origin:
    "Canadian art student Deidre LaCarte created the Hampster Dance GeoCities page in 1998. Traffic exploded in 1999 via email and news coverage; CNET later ranked it among top web fads (Know Your Meme, Wikipedia).",
  timeline: [
    {
        "date": "Aug 1998",
        "event": "LaCarte launches the Hampster Dance GeoCities page"
    },
    {
        "date": "1999",
        "event": "Email forwards and press coverage push it into mainstream awareness"
    },
    {
        "date": "2000",
        "event": "The Hampsterdance Song chart hit extends the brand offline"
    },
    {
        "date": "2005",
        "event": "CNET names Hampster Dance a top web fad"
    }
],
  examples: [
    "Setting a coworker's homepage to the dancing hamsters",
    "Calling any looping GIF earworm a Hamster Dance moment",
    "Nostalgia posts about GeoCities single-serving sites"
],
  relatedSlugs: ["numa-numa","badger-badger-badger","peanut-butter-jelly-time","nyan-cat","keyboard-cat"],
  relationships: {
    "sameEra": [
        "numa-numa",
        "badger-badger-badger",
        "peanut-butter-jelly-time"
    ],
    "relatedTo": [
        "nyan-cat",
        "keyboard-cat"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/097/Picture_5.png",
        "title": "Hamster Dance — classic page still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/hampster-dance",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Iconic Hampster Dance dancing-hamster imagery.",
        "date": "1998",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/hampster-dance",
        "title": "Hamster Dance — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/hampster-dance",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "1998",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://en.wikipedia.org/wiki/The_Hampster_Dance",
        "title": "Hamster Dance — Wikipedia",
        "source": "Wikipedia",
        "sourceUrl": "https://en.wikipedia.org/wiki/The_Hampster_Dance",
        "platform": "other",
        "attribution": "Wikipedia contributors",
        "license": "CC BY-SA 4.0",
        "description": "Encyclopedic background.",
        "verified": false
    }
],
  sources: [
    {
        "title": "Hamster Dance — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/hampster-dance",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "Hamster Dance — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/The_Hampster_Dance",
        "domain": "en.wikipedia.org"
    }
],
};

export default entry;
