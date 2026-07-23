import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m75",
  slug: "double-rainbow",
  title: "Double Rainbow",
  category: "meme",
  description:
    "Hungrybear9562's Yosemite freakout — 'What does it mean?' — the 2010 viral awe clip that launched a thousand Autotune remixes.",
  imageGradient: "from-violet-400 via-fuchsia-400 to-amber-300",
  scores: { relevance: 44, influence: 78, cringe: 35, brainrot: 38 },
  addedAt: "2026-07-19",
  historicalDate: "2010-01-08",
  views: 3900000,
  trendDirection: "stable",
  tags: ["classic","youtube","2010","viral video","remix"],
  meaning:
    "Paul 'Hungrybear9562' Vasquez filming a double rainbow in Yosemite while sobbing in wonder. The earnest awe (and 'What does it mean?') became remix bait and a reaction for overwhelming beauty or absurd revelation.",
  origin:
    "Uploaded to YouTube in January 2010; by that summer the clip had millions of views, Autotune remixes, and late-night TV coverage (Know Your Meme, Wikipedia).",
  timeline: [
    {
        "date": "Jan 2010",
        "event": "Double Rainbow video uploaded to YouTube"
    },
    {
        "date": "Jul 2010",
        "event": "Viral explosion and Autotune remix wave"
    },
    {
        "date": "2010s+",
        "event": "Enduring reaction for awe / 'what does it mean?' moments"
    }
],
  examples: [
    "Commenting 'double rainbow what does it mean' under beautiful photos",
    "Using the crying-audio as a remix sample",
    "Reacting to good news with Double Rainbow energy"
],
  relatedSlugs: ["dramatic-chipmunk","numa-numa","rickroll","star-wars-kid"],
  relationships: {
    "sameEra": [
        "dramatic-chipmunk"
    ],
    "relatedTo": [
        "numa-numa",
        "rickroll",
        "star-wars-kid"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/003/128/rainbow.jpg",
        "title": "Double Rainbow — Yosemite still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/double-rainbow",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Canonical Double Rainbow viral-video imagery.",
        "date": "2010",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/double-rainbow",
        "title": "Double Rainbow — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/double-rainbow",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2010",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://en.wikipedia.org/wiki/Double_Rainbow_(viral_video)",
        "title": "Double Rainbow — Wikipedia",
        "source": "Wikipedia",
        "sourceUrl": "https://en.wikipedia.org/wiki/Double_Rainbow_(viral_video)",
        "platform": "other",
        "attribution": "Wikipedia contributors",
        "license": "CC BY-SA 4.0",
        "description": "Encyclopedic background.",
        "verified": false
    }
],
  sources: [
    {
        "title": "Double Rainbow — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/double-rainbow",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "Double Rainbow — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Double_Rainbow_(viral_video)",
        "domain": "en.wikipedia.org"
    }
],
};

export default entry;
