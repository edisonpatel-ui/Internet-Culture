import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m120",
  slug: "ok-hand-sign",
  title: "OK Hand Sign",
  category: "meme",
  description:
    "The circle-and-fingers OK gesture repurposed as a reaction image, ironic symbol, and endlessly debated hand sign across forums and politics.",
  imageGradient: "from-yellow-400 via-amber-300 to-orange-400",
  scores: { relevance: 72, influence: 68, cringe: 38, brainrot: 42 },
  addedAt: "2026-07-23",
  historicalDate: "2010-01-01",
  views: 2800000,
  trendDirection: "stable",
  tags: ["reaction", "gesture", "4chan", "politics", "symbol", "classic"],
  meaning:
    "A photo or drawing of someone making the OK hand sign — thumb and index finger forming a circle — used online as a casual approval gesture, a sarcastic 'perfect' reaction, or (in some communities) an ironic or coded symbol. Context decides whether it reads as harmless, trolling, or something darker.",
  origin:
    "The OK hand gesture predates the internet by centuries, but its meme life accelerated on 4chan and Reddit in the early 2010s as a reaction image and Photoshop bait. Know Your Meme documents a 2017 hoax claiming the sign was a hate symbol; the ADL later noted it could be used that way in specific contexts while remaining ordinary in most settings. The meme layer is less about inventing the gesture than about how imageboards turned an everyday signal into editable culture.",
  timeline: [
    { date: "Pre-internet", event: "OK gesture used globally as an approval or 'all good' signal" },
    { date: "Early 2010s", event: "Reaction photos and edits spread on Reddit and 4chan" },
    { date: "2017", event: "4chan hoax reframes the gesture; mainstream news covers the controversy" },
    { date: "2019", event: "ADL adds the OK sign to its hate-symbol database with contextual notes" },
    { date: "2020s", event: "Remains a stock reaction image while carrying platform-specific baggage" },
  ],
  examples: [
    "Posting an OK-hand photo under a flawless screenshot: 'Chef's kiss'",
    "Ironically flashing the sign in a group photo after a bad idea wins",
    "Political memes debating whether a public figure's gesture was innocent or coded",
  ],
  relatedSlugs: ["trollface", "pepe", "gigachad", "change-my-mind"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/ok-sign",
      title: "OK Sign — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/ok-sign",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the gesture's meme history and 2017 hoax cycle.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/OK_gesture",
      title: "OK gesture — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/OK_gesture",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic background on the gesture and its contested modern readings.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "OK Sign — Know Your Meme",
      url: "https://knowyourmeme.com/memes/ok-sign",
      domain: "knowyourmeme.com",
    },
    {
      title: "OK gesture — Wikipedia",
      url: "https://en.wikipedia.org/wiki/OK_gesture",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
