import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e22",
  slug: "youtube-rewind",
  title: "YouTube Rewind",
  category: "event",
  description:
    "YouTube's annual year-in-review spectacle — from celebration of platform culture to the internet's favorite thing to hate-watch.",
  imageGradient: "from-red-600 via-rose-600 to-zinc-900",
  scores: { relevance: 55, influence: 80, cringe: 70, brainrot: 40 },
  addedAt: "2026-07-19",
  historicalDate: "2012-12-01",
  views: 5200000,
  trendDirection: "stable",
  tags: ["youtube","rewind","creators","2012","annual"],
  platform: "YouTube",
  impact:
    "Turned YouTube's year into a monoculture event: who got featured, which memes were blessed, and eventually how out-of-touch the montage felt. Rewind 2018 became a landmark 'most disliked' culture story and shifted how the platform talks about its own creators.",
  highlights: [
  "YouTube Rewind launched as an annual montage of viral moments and creators",
  "Mid-2010s Rewinds featured massive creator cameos and dance numbers",
  "Rewind 2018 drew historic dislike ratios and backlash for tone-deaf meme handling",
  "Later years scaled back or paused as YouTube rethought the format"
],
  relatedSlugs: ["mrbeast","pewdiepie","charlie-bit-my-finger","annoying-orange","gangnam-style"],
  relationships: {
  "popularizedBy": [
    "mrbeast",
    "pewdiepie"
  ],
  "relatedTo": [
    "charlie-bit-my-finger",
    "annoying-orange",
    "gangnam-style"
  ],
  "community": [
    "mrbeast",
    "pewdiepie"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/024/927/ytrewind.jpg",
    "title": "YouTube Rewind — series still",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/youtube-rewind",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Recognizable YouTube Rewind promotional imagery.",
    "date": "2012",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/youtube-rewind",
    "title": "YouTube Rewind — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/youtube-rewind",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2012",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "title": "YouTube Rewind — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "YouTube Rewind — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "YouTube Rewind — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/youtube-rewind",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
