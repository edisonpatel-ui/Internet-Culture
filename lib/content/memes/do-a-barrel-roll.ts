import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m80",
  slug: "do-a-barrel-roll",
  title: "Do a Barrel Roll",
  category: "meme",
  description:
    "Peppy Hare's Star Fox 64 advice — and the Google Easter egg that made everyone spin the page.",
  imageGradient: "from-blue-500 via-sky-400 to-orange-400",
  scores: { relevance: 52, influence: 82, cringe: 20, brainrot: 32 },
  addedAt: "2026-07-19",
  historicalDate: "1997-04-27",
  views: 3800000,
  trendDirection: "stable",
  tags: ["gaming","star fox","nintendo","catchphrase","easter egg"],
  meaning:
    "A call to perform a 360° barrel roll, from Star Fox 64's Peppy Hare. Online it captions spinning subjects and powered a famous Google search Easter egg.",
  origin:
    "Star Fox 64 (1997) popularized Peppy's 'Do a barrel roll!' The phrase became image-macro and chat slang; Google later added a barrel-roll Easter egg for the search query (Know Your Meme).",
  timeline: [
    {
        "date": "1997",
        "event": "Star Fox 64 ships with Peppy's barrel-roll line"
    },
    {
        "date": "2000s",
        "event": "Phrase spreads as gaming catchphrase and macros"
    },
    {
        "date": "2011+",
        "event": "Google 'do a barrel roll' Easter egg amplifies mainstream reach"
    }
],
  examples: [
    "Telling someone to do a barrel roll mid-argument jokingly",
    "Searching Google for the page-spin Easter egg",
    "Captioning a spinning animal GIF with the quote"
],
  relatedSlugs: ["the-cake-is-a-lie","all-your-base-are-belong-to-us","arrow-to-the-knee","can-it-run-crysis"],
  relationships: {
    "relatedTo": [
        "the-cake-is-a-lie",
        "all-your-base-are-belong-to-us",
        "arrow-to-the-knee",
        "can-it-run-crysis"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/054/Do_A_Barrel.jpg",
        "title": "Do a Barrel Roll — Star Fox still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/do-a-barrel-roll",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Do a Barrel Roll meme imagery.",
        "date": "1997",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/do-a-barrel-roll",
        "title": "Do a Barrel Roll — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/do-a-barrel-roll",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "1997",
        "verified": false
    }
],
  sources: [
    {
        "title": "Do a Barrel Roll — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/do-a-barrel-roll",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
