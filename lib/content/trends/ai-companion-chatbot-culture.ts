import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t31",
  slug: "ai-companion-chatbot-culture",
  title: "AI Companion & Chatbot Culture",
  category: "trend",
  description:
    "Friendship, romance, and parasocial bonds with AI chatbots — Replika, Character.AI, and the post-ChatGPT companion boom.",
  imageGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
  scores: { relevance: 90, influence: 78, cringe: 45, brainrot: 55 },
  addedAt: "2026-07-23",
  historicalDate: "2023-01-01",
  views: 1800000,
  trendDirection: "rising",
  tags: ["ai", "chatgpt", "replika", "parasocial", "2020s"],
  origin:
    "Early chatbots like ELIZA hinted at attachment, but consumer companion apps (Replika, 2017 onward) made emotional AI relationships mainstream. Character.AI (2022) and ChatGPT's voice mode (2023–2024) scaled roleplay, grief processing, and parasocial intimacy to millions — sparking debates about loneliness, data privacy, and corporate toggling of romantic features.",
  summary:
    "AI companion culture is people treating chatbots as friends, therapists, partners, or fictional characters — not just search tools. It overlaps the AI chatbot wars (OpenAI vs. Google vs. Anthropic) but focuses on emotional use: daily check-ins, custom personas, and communities sharing 'my AI said this.' Regulators and platforms keep adjusting what intimacy features are allowed.",
  relatedSlugs: ["ai-chatbot-wars", "ai-generated-content-boom", "deepfake-concerns", "creator-economy"],
  relationships: {
    relatedEvent: ["ai-chatbot-wars"],
    relatedTo: ["ai-generated-content-boom"],
  },
  sources: [
    {
      title: "Replika — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Replika",
      domain: "en.wikipedia.org",
    },
    {
      title: "Character.ai — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Character.ai",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
