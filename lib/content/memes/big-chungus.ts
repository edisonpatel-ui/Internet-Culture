import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m104",
  slug: "big-chungus",
  title: "Big Chungus",
  category: "meme",
  description:
    "An absurdly fat Bugs Bunny from a 1941 cartoon, repackaged as a fake PS4 game — one of 2018's most nonsensical viral jokes.",
  imageGradient: "from-gray-600 via-slate-500 to-zinc-400",
  scores: { relevance: 68, influence: 72, cringe: 58, brainrot: 70 },
  addedAt: "2026-07-23",
  historicalDate: "2018-12-01",
  views: 3600000,
  trendDirection: "stable",
  tags: ["bugs-bunny", "absurdist", "2018", "reddit", "looney-tunes", "classic"],
  meaning:
    "A deliberately stupid meme: a frame of obese Bugs Bunny from the 1941 short Wabbit Twouble, labeled 'Big Chungus' on a mock PlayStation 4 game cover. The humor is pure anti-comedy — treating a nonsense title like a real AAA release. It spread when a GameStop employee story about a customer asking for the fake game went viral.",
  origin:
    "Reddit user GaryTheTaco (Braden) created the PS4 cover meme privately on March 20, 2018, and posted it publicly to r/comedyheaven on December 1, 2018. The image uses a frame from Wabbit Twouble (1941) where Bugs inflates to mock Elmer Fudd. Know Your Meme documents the GameStop anecdote and Warner Bros.' later official acknowledgment as drivers of late-2018 virality.",
  timeline: [
    { date: "1941", event: "Wabbit Twouble releases — source cartoon for the fat Bugs frame" },
    { date: "Mar 2018", event: "GaryTheTaco creates the Big Chungus PS4 cover meme privately" },
    { date: "Dec 1, 2018", event: "First public Reddit post to r/comedyheaven" },
    { date: "Dec 2018", event: "GameStop customer story goes viral; meme explodes across Reddit" },
    { date: "2019+", event: "Warner Bros. references; remains an absurdist classic" },
  ],
  examples: [
    "Customer asks GameStop for Big Chungus — employee confusion story",
    "Fake sequel covers: Big Chungus 2, Xbox edition, Nintendo Switch",
    "Using 'chungus' as slang for anything comically oversized",
  ],
  relatedSlugs: ["doge", "dat-boi", "pepe"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/big-chungus",
      title: "Big Chungus — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/big-chungus",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin interview with creator GaryTheTaco and viral timeline.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Big_Chungus",
      title: "Big Chungus — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Big_Chungus",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Big Chungus — Know Your Meme",
      url: "https://knowyourmeme.com/memes/big-chungus",
      domain: "knowyourmeme.com",
    },
    {
      title: "Big Chungus — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Big_Chungus",
      domain: "en.wikipedia.org",
    },
    {
      title: "Big Chungus' Original Creator Shares The Tale — Know Your Meme",
      url: "https://knowyourmeme.com/editorials/interviews/big-chungus-original-creator-shares-the-tale-of-his-inception-and-how-a-nonsensical-joke-became-an-online-phenomenon",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
