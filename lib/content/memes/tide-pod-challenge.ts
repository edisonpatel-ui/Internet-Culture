import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m128",
  slug: "tide-pod-challenge",
  title: "Tide Pod Challenge",
  category: "meme",
  description:
    "The 2018 panic-and-meme cycle around eating laundry detergent pods — a cautionary tale of irony becoming headline news.",
  imageGradient: "from-orange-400 via-blue-500 to-white",
  scores: { relevance: 55, influence: 68, cringe: 78, brainrot: 60 },
  addedAt: "2026-07-23",
  historicalDate: "2018-01-01",
  views: 2900000,
  trendDirection: "declining",
  tags: ["2018", "challenge", "safety", "irony", "news", "viral-panic"],
  meaning:
    "Jokes and forbidden-fruit memes about biting into brightly colored Tide Pods — framed as a 'challenge' despite little evidence of widespread participation. Used online to mock reckless trends, Gen Z recklessness stereotypes, or anything that looks edible but should not be eaten. The meme layer often outran the actual behavior.",
  origin:
    "Tide Pods' candy-like appearance inspired Photoshop jokes for years before 2018. Know Your Meme and major outlets documented how Onion-style satire and shitposting collided with real poison-control warnings when the phrase 'Tide Pod challenge' hit cable news. Procter & Gamble and YouTube responded with safety messaging; the meme became a case study in moral panic amplification.",
  timeline: [
    { date: "2013–2017", event: "Pod-as-food jokes circulate in forums and image macros" },
    { date: "Jan 2018", event: "'Tide Pod challenge' headlines; poison-control calls discussed in media" },
    { date: "Jan 2018", event: "YouTube restricts challenge content; Tide runs safety ads" },
    { date: "2018+", event: "Meme persists as shorthand for stupid internet challenges" },
  ],
  examples: [
    "Photoshopping a Tide Pod as pizza topping in a shitpost",
    "News segment screenshot captioned 'the internet has gone too far'",
    "Ironically calling a bad decision 'eating the Tide Pod'",
  ],
  relatedSlugs: ["nyan-cat", "this-is-fine", "surprised-pikachu", "corn-kid"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/tide-pods",
      title: "Tide Pods — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/tide-pods",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Pod-eating meme history and 2018 challenge panic.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.theguardian.com/us-news/2018/jan/18/tide-pod-challenge-viral-social-media",
      title: "Tide pod challenge — The Guardian",
      source: "The Guardian",
      sourceUrl: "https://www.theguardian.com/us-news/2018/jan/18/tide-pod-challenge-viral-social-media",
      platform: "other",
      attribution: "The Guardian",
      description: "News coverage of the 2018 viral cycle and safety response.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Tide Pods — Know Your Meme",
      url: "https://knowyourmeme.com/memes/tide-pods",
      domain: "knowyourmeme.com",
    },
    {
      title: "Tide pod challenge: viral social media — The Guardian",
      url: "https://www.theguardian.com/us-news/2018/jan/18/tide-pod-challenge-viral-social-media",
      domain: "theguardian.com",
    },
  ],
};

export default entry;
