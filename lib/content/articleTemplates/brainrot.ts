import type { ArticleTemplate } from "./types";

/**
 * Brainrot (BrainrotEntry) — absurdist/chaotic short-form content
 * (loreUniverse-driven characters, Gen Alpha remix culture). Structurally
 * similar to Meme but with extra lore/audience fields.
 */
export const brainrotTemplate: ArticleTemplate = {
  category: "brainrot",
  publicName: "Brainrot",
  sections: [
    "identity",
    "quickOverview",
    "history",
    "culturalContext",
    "spreadEcosystem",
    "examples",
    "media",
    "references",
    "metadata",
    "seo",
  ],
  focus:
    "What it is, why it's absurd/chaotic, and how it spread across short-form platforms (TikTok, YouTube Shorts, Reels). Lean into the specific lore/character details — that specificity IS the appeal for this category.",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE punchy sentence, max ~25 words, dictionary-entry style.",
      goodExample:
        "Absurdist humanoid toilet monsters battling camera-headed soldiers in an ever-expanding animated saga.",
    },
    {
      key: "meaning",
      label: "Meaning",
      rule: "1-3 sentences: what it actually is, before any history or lore deep-dive.",
      goodExample:
        "A surreal animated series blending absurdist horror with slapstick, built around an escalating in-universe war.",
    },
    {
      key: "loreUniverse",
      label: "Lore universe",
      rule: "Name the specific fictional universe/continuity, if one exists — omit if none.",
      goodExample: "\"Skibidi Toilet Cinematic Universe\"",
    },
    {
      key: "targetAgeGroup",
      label: "Target age group",
      rule: "Only state this if sources actually discuss the audience — don't guess.",
      goodExample: "\"Primarily Gen Alpha (children/preteens)\"",
    },
    {
      key: "examples",
      label: "Usage examples",
      rule: "Natural sentences that USE the term in context, the way a real person would say it. NEVER describe a video ABOUT it.",
      goodExample: "\"This edit is pure Skibidi-tier brainrot.\"",
      badExample: "A description of a video explaining the lore. (not a usage example)",
    },
  ],
  pageStructure:
    "Not yet updated to the combined References convention — brainrot pages still use separate Media and References sections with 'Explore nearby' present, pending admin decision.",
};
