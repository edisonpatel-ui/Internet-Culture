import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s32",
  slug: "touch-grass",
  title: "Touch Grass",
  category: "slang",
  description:
    "'Touch grass' is a dismissal telling someone to go outside and experience the real world — used when someone is clearly spending too much time online or getting too worked up about internet events.",
  imageGradient: "from-green-500 via-lime-400 to-emerald-400",
  scores: { relevance: 82, brainrot: 52, cringe: 25 },
  addedAt: "2026-07-17",
  views: 1500000,
  trendDirection: "stable",
  tags: ["dismissal", "internet", "outside", "reddit", "twitter", "2020"],
  definition:
    "A blunt directive — 'touch grass' — telling someone to get offline, go outside, and reconnect with the physical world. It implies the target is so deep in internet culture or so agitated about something purely online that they have lost touch with reality. The 'grass' being literal — dewy, actual outdoor grass — underlines the irony: this is the most basic real-world experience. Often deployed as a final, conversation-ending response when someone is too invested in an online debate.",
  usageExamples: [
    "Someone tweets 47 consecutive times about a fandom drama: 'You need to touch grass right now'",
    "Having a meltdown over a fictional character: 'Touch grass' (as a full reply)",
    "'I haven't been outside in five days' → 'Brother go touch some grass'",
    "As self-deprecating humor: 'I spent six hours in a Discord argument about fonts, I need to touch grass'",
  ],
  origin:
    "The phrase rose to prominence on Reddit and Twitter around 2020–2021, coinciding with COVID lockdowns that literally kept people inside and online for extended periods. The concept — 'go interact with the real world' — predates internet slang, but the specific 'touch grass' phrasing became a consistent meme format in this period. It captures the post-pandemic awareness of how extreme internet consumption had become, and the self-aware humor of online communities telling each other to log off.",
  relatedSlugs: ["ratio", "cringe", "unc"],
  sources: [
    {
      title: "Touch Grass — Know Your Meme",
      url: "https://knowyourmeme.com/memes/touch-grass",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
