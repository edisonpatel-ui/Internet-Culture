import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m65",
  slug: "funky-ehh",
  title: "Funky Ehh",
  category: "meme",
  description:
    "The Fortnite kid who misattributes a Janet Jackson remix as Oliver Tree — 'we'll drive a funky ehh' — and then plays the moan-car edit.",
  imageGradient: "from-fuchsia-500 via-purple-600 to-orange-400",
  scores: { relevance: 74, influence: 40, cringe: 55, brainrot: 82 },
  addedAt: "2026-07-18",
  historicalDate: "2026-06-01",
  views: 1500000,
  trendDirection: "rising",
  tags: ["fortnite", "tiktok", "2026", "audio", "misattribution", "brainrot"],
  meaning:
    "A viral clip format around a kid in Fortnite claiming a remix of Janet Jackson's 'Someone to Call My Lover' is by Oliver Tree, singing 'Maybe we'll meet at a bar, we'll drive a fancy/funky ehh,' then playing the edit where 'car' is replaced with a moaning sound. Used as absurdist audio meme and misattribution comedy.",
  origin:
    "Documented on Know Your Meme as 'We'll Drive A Funky Ehh' / 'He'll Drive A Funky Ehh': a Fortnite gameplay clip of a kid confidently wrong about the song's artist, then blasting the remix. Spread as short-form sound and quote meme in mid-2026.",
  timeline: [
    { date: "Jun 2026", event: "Fortnite kid clip with Janet Jackson remix misattribution spreads" },
    { date: "Jun 2026+", event: "Quote, stitch, and sound remixes amplify 'funky ehh'" },
  ],
  examples: [
    "Typing 'we'll drive a funky ehh' under any wrong-artist music take",
    "Using the moan-car remix as ironic lobby music audio",
    "Stitching the Fortnite kid clip with other misheard lyrics",
  ],
  relatedSlugs: ["chicken-jockey", "npc-streaming", "short-form-takeover"],
  relationships: {
    relatedEvent: ["short-form-takeover"],
    relatedTo: ["chicken-jockey", "npc-streaming"],
    community: ["npc-streaming"],
  },
  media: [
    // AI suggested — KYM cover; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/057/087/funkyehh.jpg",
      title: "Funky Ehh — meme cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/well-drive-a-funky-ehh",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover image for the We'll Drive A Funky Ehh Fortnite clip meme.",
      date: "2026",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/well-drive-a-funky-ehh",
      title: "We'll Drive A Funky Ehh — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/well-drive-a-funky-ehh",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Clip origin and remix misattribution details.",
      date: "2026",
      verified: false,
    },
  ],
  sources: [
    {
      title: "We'll Drive A Funky Ehh — Know Your Meme",
      url: "https://knowyourmeme.com/memes/well-drive-a-funky-ehh",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
