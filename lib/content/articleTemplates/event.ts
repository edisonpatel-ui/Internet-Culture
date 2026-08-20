import type { ArticleTemplate } from "./types";

/**
 * Event (EventEntry) — reference article: Ice Bucket Challenge.
 */
export const eventTemplate: ArticleTemplate = {
  category: "event",
  publicName: "Event",
  sections: [
    "identity",
    "quickOverview",
    "history",
    "culturalContext",
    "spreadEcosystem",
    "media",
    "references",
    "metadata",
    "seo",
  ],
  focus:
    "WHAT happened, WHEN, and WHY it mattered culturally — treat it like a real historical event, not a meme explainer.",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE short sentence, max ~25 words, ending in a period, naming what happened and its cultural hook. It must summarize the article's own impact/summary in fresh wording — never repeat or lightly rephrase the lead paragraph's sentence structure.",
      goodExample:
        "The viral charity campaign that swept the internet in summer 2014 — dump ice water, challenge three friends, raise awareness and money for ALS.",
    },
    {
      key: "impact",
      label: "Impact",
      rule: "2-4 sentences on why this mattered culturally — not just a recap of what happened. Cite real, specific outcomes (funds raised, research funded) when sources support them.",
      goodExample:
        "One of the first viral internet campaigns to prove that social media virality and charitable giving could combine at global scale. The challenge raised over $115 million for ALS research in a matter of weeks and directly funded the discovery of a gene variant linked to the disease.",
    },
    {
      key: "highlights",
      label: "Highlights",
      rule: "Specific, dated, factual bullet points — never vague generalities. Name real people/organizations where sources support it.",
      goodExample:
        "\"Started in summer 2014 through ALS patient communities, with Pat Quinn and Pete Frates — both living with ALS — playing key roles in spreading the challenge\"",
    },
    {
      key: "startDate / historicalDate",
      label: "Date(s)",
      rule: "Real, source-confirmed date(s) only — omit rather than guess.",
      goodExample: "historicalDate: \"2014-08-01\"",
    },
    {
      key: "platform",
      label: "Platform(s)",
      rule: "Where it actually happened/spread — comma-separated if several.",
      goodExample: "\"Facebook, YouTube, Twitter\"",
    },
  ],
  pageStructure:
    "DIFFERENT from Meme/Slang/Person/Trend: Media stays its own separate section (the optional supporting photo, like the 2014 dunk still) — it is NOT merged into References. Only reference-role media (citation/embed cards, e.g. the Know Your Meme and Wikipedia entries) moves into the References section alongside the source list. No 'Explore nearby' footer section.",
};
