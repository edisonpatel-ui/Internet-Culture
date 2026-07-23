import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m105",
  slug: "big-if-true",
  title: "Big If True",
  category: "meme",
  description:
    "The sarcastic reply 'Big if true' — pretending a dubious or obvious claim would be world-changing if it were real.",
  imageGradient: "from-indigo-500 via-violet-500 to-purple-400",
  scores: { relevance: 70, influence: 65, cringe: 32, brainrot: 28 },
  addedAt: "2026-07-23",
  historicalDate: "2014-01-01",
  views: 1800000,
  trendDirection: "stable",
  tags: ["phrase", "sarcasm", "twitter", "reply", "irony", "classic"],
  meaning:
    "A deadpan response to claims that are either unverified, obviously fake, or too good to be true. By saying 'Big if true,' the replier mocks the original poster's hype while pretending to take it seriously. It signals skepticism without outright calling someone a liar — classic internet faux-earnest tone.",
  origin:
    "Know Your Meme traces 'big if true' to Twitter and Reddit sarcasm culture in the mid-2010s, often paired with copypasta or shitpost headlines. The phrase mimics news-wire hedging ('Huge if true') used sincerely by journalists and influencers, then flipped into irony. It spread through reply-guy culture and sports Twitter before becoming a general-purpose dismissive acknowledgment.",
  timeline: [
    { date: "Mid-2010s", event: "'Huge if true' used sincerely on Twitter for unconfirmed news" },
    { date: "2014–2016", event: "Ironic 'big if true' replies spread on Reddit and Twitter" },
    { date: "2017–2019", event: "Becomes a default shitpost reply to absurd claims" },
    { date: "2020s", event: "Used across politics, sports, and meme threads as faux-serious skepticism" },
  ],
  examples: [
    "'Scientists discover pizza is healthy' — Big if true",
    "Replying to an obviously fake leak screenshot with 'Big if true'",
    "Headline too good to believe → comment section full of 'Big if true'",
  ],
  relatedSlugs: ["change-my-mind", "this-is-fine", "press-x-to-doubt"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/big-if-true",
      title: "Big If True — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/big-if-true",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the sarcastic reply phrase and spread.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Big If True — Know Your Meme",
      url: "https://knowyourmeme.com/memes/big-if-true",
      domain: "knowyourmeme.com",
    },
    {
      title: "Huge if true — Know Your Meme",
      url: "https://knowyourmeme.com/memes/huge-if-true",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
