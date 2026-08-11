import type { ArticleTemplate } from "./types";

/**
 * Slang (SlangEntry) — reference article: My Shayla.
 */
export const slangTemplate: ArticleTemplate = {
  category: "slang",
  publicName: "Slang",
  sections: [
    "identity",
    "quickOverview",
    "history",
    "culturalContext",
    "spreadEcosystem",
    "examples",
    "references",
    "metadata",
    "seo",
  ],
  focus:
    "The meaning comes FIRST, before any history. A reader should be able to use the word correctly after reading the first sentence.",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE punchy sentence, max ~25 words, dictionary-entry style.",
      goodExample:
        "TikTok slang for someone or something you love with overwhelming affection — from Tyrese Gibson's tearful 'Oh my god, my Shayla.'",
      badExample: "Any summary running more than one sentence.",
    },
    {
      key: "definition",
      label: "Definition",
      rule: "Precise, plain-language definition — what it means and how it's used, including the sincere/playful range if the term has one.",
      goodExample:
        "My Shayla is affectionate slang for a person, pet, or thing you love intensely — often after a moment of annoyance melts into soft recognition. Online it can be sincere or playfully dramatic: \"that's my Shayla\" means that's my beloved.",
    },
    {
      key: "origin",
      label: "Origin",
      rule: "Dense narrative prose with specific names, dates, platforms. If the origin is unrelated in tone to the current usage (e.g. a sincere moment turned into playful slang), say so plainly.",
      goodExample:
        "From a November 2017 Instagram video by actor Tyrese Gibson during a custody dispute over his daughter Shayla, where he tearfully says \"Oh my god, my Shayla.\" The specific line exploded as a TikTok sound in late 2024, reframed as cute/affectionate meme slang. The original context was painful — modern usage is usually detached from that custody moment.",
    },
    {
      key: "usageExamples",
      label: "Usage examples",
      rule: "Natural sentences that USE the word in context, the way a real person would say it in conversation or a caption. NEVER describe a video/article ABOUT the term.",
      goodExample: "Looking at your dog after they destroy a shoe: \"my Shayla…\"",
      badExample:
        "A summary of an interview discussing the term's popularity. (this describes a source, not usage)",
    },
    {
      key: "relatedSlugs",
      label: "Related articles",
      rule: "At least 2 genuinely related slang/culture entries.",
      goodExample: "[\"pookie\", \"delulu\", \"its-giving\"]",
    },
  ],
  pageStructure:
    "Media and References are combined into one 'References' section (media shown without per-item source captions, citation list below it). No 'Explore nearby' footer section.",
};
