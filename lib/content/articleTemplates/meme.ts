import type { ArticleTemplate } from "./types";

/**
 * Meme (MemeEntry) — reference article: Dictator Mbappé.
 */
export const memeTemplate: ArticleTemplate = {
  category: "meme",
  publicName: "Meme",
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
    "What the format/joke IS, where it came from, and how it spread. Readers should understand it well enough to recognize it in the wild.",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE short sentence, max ~25 words, ending in a period, no more than one clause joined by a semicolon or em dash. It must summarize the article's own meaning/summary in fresh wording — never repeat or lightly rephrase the lead paragraph's sentence structure. Dictionary-entry style, not an intro paragraph.",
      goodExample:
        "A viral meme format comparing Kylian Mbappé's expressions and appearance to historical authoritarian figures.",
      badExample:
        "A multi-sentence paragraph that reads like the opening of a news article rather than a single clear line.",
    },
    {
      key: "meaning",
      label: "Meaning",
      rule: "1-3 sentences: what it actually is/means, in plain language, before any history.",
      goodExample:
        "A meme format based on image comparisons between French soccer player Kylian Mbappé and historical dictators or authoritarian figures, drawing on perceived resemblances in facial expressions, posture, or framing.",
    },
    {
      key: "origin",
      label: "Origin",
      rule: "Dense narrative prose with specific names, dates, and platforms — several full sentences. State plainly what is unconfirmed rather than guessing.",
      goodExample:
        "Emerged on X (Twitter) and football meme communities in 2024, coinciding with Mbappé's high-profile transfer to Real Madrid and increased global media attention on the player. Fans circulated side-by-side comparisons and edited images placing Mbappé alongside historical figures.",
    },
    {
      key: "timeline",
      label: "Timeline",
      rule: "Only dated events actually supported by sources — no invented dates.",
      goodExample: "{ date: \"2024-07\", event: \"Format spreads on X alongside Mbappé's Real Madrid transfer news\" }",
    },
    {
      key: "examples",
      label: "Usage examples",
      rule: "Natural sentences that USE the meme in context, the way a real person would say it. NEVER describe a video/article ABOUT the meme — that is not a usage example.",
      goodExample: "Bro showed up to training looking like a dictator in the 40s [image]",
      badExample:
        "An interview where the creator discusses the meme's origin. (this describes a source, not usage)",
    },
    {
      key: "relatedSlugs",
      label: "Related articles",
      rule: "At least 2 genuinely related entries, cross-category when it makes sense.",
      goodExample: "[\"football-twitter\", \"comparison-meme-format\"]",
    },
    {
      key: "legacy",
      label: "Legacy",
      rule: "Short, optional section on lasting cultural footprint after peak virality faded. Omit the field entirely if there's genuinely nothing to say yet (very recent memes).",
      goodExample:
        "Though the format's peak spread passed within weeks of the initial transfer news cycle, comparison-style football edits using this template continued to resurface during major Mbappé matches.",
    },
  ],
  pageStructure:
    "Media and References are combined into one 'References' section (media shown without per-item source captions, citation list below it). No 'Explore nearby' footer section. Legacy is a short, optional standalone section shown after Examples when present.",
};
