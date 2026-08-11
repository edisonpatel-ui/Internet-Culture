import type { ArticleTemplate } from "./types";

/**
 * Person (internal category "creator", CreatorEntry) — reference: Jynxzi.
 * Public-facing label is "Person" per PersonType (Creator, Musician, Actor,
 * Athlete, Developer, CEO, Artist, Internet Personality, Journalist,
 * Politician, Other) — do not rename the internal category.
 */
export const creatorTemplate: ArticleTemplate = {
  category: "creator",
  publicName: "Person",
  sections: [
    "identity",
    "quickOverview",
    "history",
    "culturalContext",
    "spreadEcosystem",
    "references",
    "metadata",
    "seo",
  ],
  focus:
    "Who they are, how they rose, and their specific cultural footprint — avoid generic bio filler ('is a content creator known for videos').",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE punchy sentence, max ~25 words: who they are + their specific hook, not a generic title.",
      goodExample:
        "Nicholas Stewart — the Rainbow Six Siege streamer who built a massive Twitch audience through high-level gameplay and an entertaining personality.",
      badExample: "\"Is a content creator known for making videos online.\"",
    },
    {
      key: "personType",
      label: "Person Type",
      rule: "Pick the single most accurate type (Creator, Musician, Actor, Athlete, Developer, CEO, Artist, Internet Personality, Journalist, Politician, Other).",
      goodExample: "\"Creator\"",
    },
    {
      key: "notableMoments",
      label: "Notable moments",
      rule: "Specific, dated, factual bullet points about their rise — not vague praise.",
      goodExample:
        "\"Rapid growth made him one of the fastest-rising gaming streamers in 2022-2023\"",
      badExample: "\"Became very popular and well known.\"",
    },
    {
      key: "platforms / followers",
      label: "Platforms & followers",
      rule: "Only real, source-supported handles and approximate counts — never invented numbers.",
      goodExample: "{ platform: \"twitch\", handle: \"Jynxzi\", url: \"https://www.twitch.tv/jynxzi\" }, followers: { twitch: \"~7M+\" }",
    },
    {
      key: "careerStart",
      label: "Career start",
      rule: "Year they actually began, if sources establish it.",
      goodExample: "\"2021\"",
    },
  ],
  pageStructure:
    "Media and References are combined into one 'References' section (media shown without per-item source captions, citation list below it). No 'Explore nearby' footer section.",
};
