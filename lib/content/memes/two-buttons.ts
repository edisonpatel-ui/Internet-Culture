import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m47",
  slug: "two-buttons",
  title: "Two Buttons",
  category: "meme",
  description:
    "The sweaty 'Daily Struggle' comic — a character stuck choosing between two contradictory red buttons.",
  imageGradient: "from-red-500 via-rose-500 to-pink-400",
  scores: { relevance: 84, brainrot: 32, cringe: 20 },
  addedAt: "2026-07-18",
  historicalDate: "2014-10-25",
  views: 5000000,
  trendDirection: "stable",
  tags: ["template", "comic", "choice", "2014", "classic", "jake-clark"],
  meaning:
    "An exploitable comic of a sweating character torn between two labeled buttons with conflicting options. Captures impossible or hypocritical choices. Later variants show pressing both buttons at once.",
  origin:
    "Animator Jake Clark posted the original 'Daily Struggle' comic to Tumblr on October 25, 2014 (buttons labeled 'BE A DICK' / 'DON'T BE A DICK'). It spread via Imgur and Reddit, becoming a durable dilemma template.",
  timeline: [
    { date: "Oct 2014", event: "Jake Clark posts original Tumblr comic" },
    { date: "2015", event: "Imgur/Reddit popularization as 'Daily Struggle'" },
    { date: "2020+", event: "'Press both buttons' remixes revive the format" },
  ],
  examples: [
    "Buttons: 'sleep' vs 'finish the assignment'",
    "Buttons: contradictory political takes — character sweating",
  ],
  relatedSlugs: [
    "drake-hotline-bling",
    "expanding-brain",
    "change-my-mind",
    "distracted-boyfriend",
  ],
  relationships: {
    sameFormat: ["drake-hotline-bling", "expanding-brain", "change-my-mind"],
  },
  media: [
    // AI suggested — KYM Daily Struggle / Two Buttons icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/019/571/dailystruggg.jpg",
      title: "Two Buttons / Daily Struggle — comic template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/daily-struggle-two-buttons",
      platform: "knowyourmeme",
      attribution: "Jake Clark / via Know Your Meme documentation",
      description: "The sweating two-buttons dilemma comic that defines the format.",
      date: "2014",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/daily-struggle-two-buttons",
      title: "Daily Struggle / Two Buttons — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/daily-struggle-two-buttons",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the two-buttons / daily struggle meme.",
      date: "2014",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Daily Struggle / Two Buttons — Know Your Meme",
      url: "https://knowyourmeme.com/memes/daily-struggle-two-buttons",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
