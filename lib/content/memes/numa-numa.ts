import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m66",
  slug: "numa-numa",
  title: "Numa Numa",
  category: "meme",
  description:
    "Gary Brolsma's 2004 Newgrounds lip-dub of O-Zone's Dragostea din tei — an early viral video that defined webcam meme culture.",
  imageGradient: "from-sky-400 via-blue-500 to-yellow-400",
  scores: { relevance: 28, influence: 90, cringe: 30, brainrot: 35 },
  addedAt: "2026-07-19",
  historicalDate: "2004-12-14",
  views: 5200000,
  trendDirection: "declining",
  tags: ["classic","early internet","viral video","newgrounds","2004","webcam"],
  meaning:
    "A joyful webcam lip-dub of O-Zone's Dragostea din tei (the Numa Numa song). Online it became shorthand for earnest early-web webcam virality and endless parody dances.",
  origin:
    "On December 14, 2004, New Jersey creator Gary Brolsma posted Numa Numa Dance to Newgrounds. It exploded across eBaum's World, YouTube mirrors, and mainstream press as one of the defining pre-/early-YouTube viral videos (Know Your Meme, Wikipedia).",
  timeline: [
    {
        "date": "2003–04",
        "event": "O-Zone's Dragostea din tei becomes a European pop hit"
    },
    {
        "date": "Dec 14, 2004",
        "event": "Brolsma uploads Numa Numa Dance to Newgrounds"
    },
    {
        "date": "2005–06",
        "event": "Mainstream coverage and parody wave cement classic status"
    }
],
  examples: [
    "Calling any earnest webcam dance a Numa Numa moment",
    "Parody lip-dubs set to Dragostea din tei",
    "Nostalgia posts about early Newgrounds virality"
],
  relatedSlugs: ["hamster-dance","badger-badger-badger","rickroll","keyboard-cat","star-wars-kid"],
  relationships: {
    "sameEra": [
        "hamster-dance",
        "badger-badger-badger",
        "star-wars-kid",
        "afro-ninja"
    ],
    "relatedTo": [
        "rickroll",
        "keyboard-cat"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/070/Picture_61.png",
        "title": "Numa Numa — Gary Brolsma still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/numa-numa",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Numa Numa Dance webcam still.",
        "date": "2004",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/numa-numa",
        "title": "Numa Numa — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/numa-numa",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2004",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://en.wikipedia.org/wiki/Numa_Numa",
        "title": "Numa Numa — Wikipedia",
        "source": "Wikipedia",
        "sourceUrl": "https://en.wikipedia.org/wiki/Numa_Numa",
        "platform": "other",
        "attribution": "Wikipedia contributors",
        "license": "CC BY-SA 4.0",
        "description": "Encyclopedic background.",
        "verified": false
    }
],
  sources: [
    {
        "title": "Numa Numa — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/numa-numa",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "Numa Numa — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Numa_Numa",
        "domain": "en.wikipedia.org"
    }
],
};

export default entry;
