import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m131",
  slug: "weird-flex-but-ok",
  title: "Weird Flex But OK",
  category: "meme",
  description:
    "The 2018 phrase for boasting about something nobody asked for — a dry dismissal that became a quote-tweet and caption staple.",
  imageGradient: "from-teal-500 via-cyan-400 to-blue-400",
  scores: { relevance: 60, influence: 58, cringe: 30, brainrot: 35 },
  addedAt: "2026-07-23",
  historicalDate: "2018-01-01",
  views: 1800000,
  trendDirection: "declining",
  tags: ["phrase", "2018", "twitter", "flex", "irony", "text-meme"],
  meaning:
    "A reply to someone showing off in a strange or irrelevant way — 'weird flex, but OK.' The flex is the boast; 'weird' flags that it is an odd thing to be proud of. Used for humble-brags, unnecessary credentials, and out-of-context achievements.",
  origin:
    "Know Your Meme and dictionary coverage trace the phrase to Twitter in early 2018, popularized after a viral exchange about a user bragging about their Spotify listening stats. It spread as a copy-paste dismissal across quote-tweets and Reddit comments, then briefly entered offline speech before fading as new reply phrases replaced it.",
  timeline: [
    { date: "Jan 2018", event: "Phrase appears in viral Twitter flex thread" },
    { date: "2018", event: "Spreads across Twitter, Reddit, and Instagram captions" },
    { date: "Late 2018", event: "Dictionary sites and news outlets document the phrase" },
    { date: "2019+", event: "Usage declines but remains recognizable millennial/Gen Z reply language" },
  ],
  examples: [
    "Reply to someone bragging about waking up at 4 a.m.: 'weird flex but ok'",
    "Screenshot of an unnecessary résumé detail in a dating app bio",
    "Meme caption under a luxury car photo that is clearly rented",
  ],
  relatedSlugs: ["this-you", "change-my-mind", "surprised-pikachu", "gigachad"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/weird-flex-but-ok",
      title: "Weird Flex But OK — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/weird-flex-but-ok",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "2018 Twitter phrase origin and spread.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Weird Flex But OK — Know Your Meme",
      url: "https://knowyourmeme.com/memes/weird-flex-but-ok",
      domain: "knowyourmeme.com",
    },
    {
      title: "Weird flex but OK — Dictionary.com Words of the Year coverage",
      url: "https://www.dictionary.com/e/slang/weird-flex-but-ok/",
      domain: "dictionary.com",
    },
  ],
};

export default entry;
