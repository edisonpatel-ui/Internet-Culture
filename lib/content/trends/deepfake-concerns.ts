import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t37",
  slug: "deepfake-concerns",
  title: "Deepfake Concerns",
  category: "trend",
  description:
    "Synthetic video and audio good enough to fool — from meme filters to non-consensual abuse and election fear.",
  imageGradient: "from-slate-900 via-purple-900 to-red-900",
  scores: { relevance: 92, influence: 85, cringe: 50, brainrot: 40 },
  addedAt: "2026-07-23",
  historicalDate: "2017-01-01",
  views: 2200000,
  trendDirection: "rising",
  tags: ["ai", "misinformation", "privacy", "video", "2010s"],
  origin:
    "Reddit users coined 'deepfake' in 2017 for face-swapped pornography using GANs. The tech quickly spread to celebrity impersonations, scam calls, and political hoax fears. Each leap in generative AI (2022–2025) lowered the skill floor, pushing platforms and lawmakers to debate labeling and takedowns.",
  summary:
    "Deepfake concern is the gap between 'funny face swap' and harm: NCII (non-consensual intimate imagery), fraud, and eroded trust in video evidence. It is the dark counterpart to the AI content boom — same tools, different stakes.",
  relatedSlugs: ["ai-generated-content-boom", "ai-chatbot-wars", "cancel-callout-culture", "rage-bait"],
  sources: [
    {
      title: "Deepfake — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Deepfake",
      domain: "en.wikipedia.org",
    },
    {
      title: "Deepfake — Know Your Meme",
      url: "https://knowyourmeme.com/memes/deepfakes",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
