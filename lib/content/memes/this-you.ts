import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m127",
  slug: "this-you",
  title: "This You?",
  category: "meme",
  description:
    "The quote-tweet comeback — 'this you?' — paired with someone's old hypocritical post, the standard accountability check on Twitter/X.",
  imageGradient: "from-sky-500 via-blue-400 to-indigo-500",
  scores: { relevance: 68, influence: 64, cringe: 32, brainrot: 40 },
  addedAt: "2026-07-23",
  historicalDate: "2019-01-01",
  views: 2100000,
  trendDirection: "stable",
  tags: ["twitter", "comeback", "quote-tweet", "accountability", "text-meme"],
  meaning:
    "A reply or quote-tweet that says 'this you?' while attaching an old screenshot of the same person saying the opposite. The format turns someone's past post into evidence against their current take — hypocrisy, flip-flopping, or deleted-tweet archaeology made public.",
  origin:
    "The phrase circulated on Black Twitter and fandom spaces before becoming a mainstream Twitter/X comeback in the late 2010s. Know Your Meme notes that pairing the words with a dug-up tweet turned an everyday question into a meme template — especially during political and celebrity pile-ons. It thrives on the platform's permanent archive of old posts.",
  timeline: [
    { date: "Late 2010s", event: "'This you?' used in fandom and call-out quote-tweets" },
    { date: "2019–2020", event: "Format standardizes as hypocrisy screenshot reply" },
    { date: "2021+", event: "Spreads to TikTok text overlays and Instagram story call-outs" },
    { date: "2020s", event: "Remains a default Twitter/X accountability phrase" },
  ],
  examples: [
    "Celebrity takes a stance; reply quotes their 2014 tweet: 'this you?'",
    "Politician's old statement resurfaced under a new press release",
    "TikTok text meme: 'this you?' over a friend's contradictory texts",
  ],
  relatedSlugs: ["change-my-mind", "woman-yelling-at-cat", "distracted-boyfriend", "surprised-pikachu"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/this-you",
      title: "This You? — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/this-you",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Quote-tweet comeback format and spread.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "This You? — Know Your Meme",
      url: "https://knowyourmeme.com/memes/this-you",
      domain: "knowyourmeme.com",
    },
    {
      title: "'This You?' – How Black Twitter Turned Accountability Into an Art Form — Vice",
      url: "https://www.vice.com/en/article/this-you-black-twitter-receipts/",
      domain: "vice.com",
    },
  ],
};

export default entry;
