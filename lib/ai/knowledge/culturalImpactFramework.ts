/**
 * Cultural impact framework — evaluation dimensions (RC3-D).
 * Future scoring may map here; this file never auto-generates scores.
 */

export type CulturalImpactFrameworkDimensionId =
  | "language"
  | "technology"
  | "media"
  | "politics"
  | "business"
  | "education"
  | "entertainment"
  | "identity"
  | "global_influence"
  | "historical_importance";

export interface CulturalImpactFrameworkDimension {
  id: CulturalImpactFrameworkDimensionId;
  label: string;
  definition: string;
  encyclopediaUse: string;
  evidenceExamples: string[];
}

export const CULTURAL_IMPACT_FRAMEWORK: readonly CulturalImpactFrameworkDimension[] =
  [
    {
      id: "language",
      label: "Language",
      definition: "Changed how people speak, write, or joke online/offline.",
      encyclopediaUse: "Support slang permanence and idiom claims.",
      evidenceExamples: ["dictionary entries", "cross-community usage"],
    },
    {
      id: "technology",
      label: "Technology",
      definition: "Shaped tools, formats, or platform features.",
      encyclopediaUse: "Link culture to product/history of tech.",
      evidenceExamples: ["feature launches", "creator tooling shifts"],
    },
    {
      id: "media",
      label: "Media",
      definition: "Altered coverage norms or entertainment formats.",
      encyclopediaUse: "Explain press amplification and genre spillover.",
      evidenceExamples: ["TV segments", "news desk explainers"],
    },
    {
      id: "politics",
      label: "Politics",
      definition: "Influenced political communication or mobilization.",
      encyclopediaUse: "Handle carefully; require strong sourcing.",
      evidenceExamples: ["campaign memes", "protest coordination lore"],
    },
    {
      id: "business",
      label: "Business",
      definition: "Affected brands, markets, or creator economies.",
      encyclopediaUse: "Commercialization and monetization chapters.",
      evidenceExamples: ["brand campaigns", "merch/IP disputes"],
    },
    {
      id: "education",
      label: "Education",
      definition: "Entered classrooms, textbooks, or media literacy.",
      encyclopediaUse: "Legacy and teachability.",
      evidenceExamples: ["curriculum mentions", "literacy explainers"],
    },
    {
      id: "entertainment",
      label: "Entertainment",
      definition: "Changed games, film, music, or streaming culture.",
      encyclopediaUse: "Crossover into entertainment industries.",
      evidenceExamples: ["soundtrack challenges", "show references"],
    },
    {
      id: "identity",
      label: "Identity",
      definition: "Became a marker of group or aesthetic identity.",
      encyclopediaUse: "Subculture and community articles.",
      evidenceExamples: ["in-group signals", "aesthetic naming"],
    },
    {
      id: "global_influence",
      label: "Global influence",
      definition: "Crossed languages, regions, or national internets.",
      encyclopediaUse: "Avoid US-only assumptions when evidence is wider.",
      evidenceExamples: ["localized variants", "translation paths"],
    },
    {
      id: "historical_importance",
      label: "Historical importance",
      definition: "Necessary to tell a coherent internet-culture history.",
      encyclopediaUse: "Prioritize coverage and update vigilance.",
      evidenceExamples: ["retrospective consensus", "era-defining status"],
    },
  ] as const;

export function getCulturalImpactFrameworkDimension(
  id: CulturalImpactFrameworkDimensionId,
): CulturalImpactFrameworkDimension | undefined {
  return CULTURAL_IMPACT_FRAMEWORK.find((d) => d.id === id);
}
