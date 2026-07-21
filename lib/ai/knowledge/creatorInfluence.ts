/**
 * Creator influence dimensions — models only, no automatic scoring (RC3-D).
 */

export type CreatorInfluenceDimensionId =
  | "originality"
  | "reach"
  | "consistency"
  | "cultural_impact"
  | "community_building"
  | "innovation"
  | "cross_platform_presence"
  | "historical_significance";

export interface CreatorInfluenceDimension {
  id: CreatorInfluenceDimensionId;
  label: string;
  definition: string;
  /** Questions editors ask — not numeric formulas. */
  evaluationQuestions: string[];
  evidenceHints: string[];
}

export const CREATOR_INFLUENCE_DIMENSIONS: readonly CreatorInfluenceDimension[] =
  [
    {
      id: "originality",
      label: "Originality",
      definition: "Degree to which formats, bits, or aesthetics were novel.",
      evaluationQuestions: [
        "What did they invent vs popularize?",
        "Were contemporaries doing the same thing?",
      ],
      evidenceHints: ["first-known format examples", "contemporary reactions"],
    },
    {
      id: "reach",
      label: "Reach",
      definition: "Scale of audience across time — qualitative, not vanity metrics alone.",
      evaluationQuestions: [
        "Who actually saw the work?",
        "Did reach translate into cultural reference?",
      ],
      evidenceHints: ["platform milestones", "crossover coverage"],
    },
    {
      id: "consistency",
      label: "Consistency",
      definition: "Sustained output and recognizable voice over time.",
      evaluationQuestions: ["How long did the voice stay culturally legible?"],
      evidenceHints: ["career span", "format continuity"],
    },
    {
      id: "cultural_impact",
      label: "Cultural impact",
      definition: "Effect on memes, slang, norms, or later creators.",
      evaluationQuestions: [
        "What language or formats changed because of them?",
      ],
      evidenceHints: ["derivative creators", "catchphrases entering slang"],
    },
    {
      id: "community_building",
      label: "Community building",
      definition: "Ability to form durable fandoms or participatory cultures.",
      evaluationQuestions: ["Did audiences become co-creators?"],
      evidenceHints: ["fan formats", "live community rituals"],
    },
    {
      id: "innovation",
      label: "Innovation",
      definition: "Technical or formal experiments that others adopted.",
      evaluationQuestions: ["What production trick became standard?"],
      evidenceHints: ["tooling firsts", "imitators"],
    },
    {
      id: "cross_platform_presence",
      label: "Cross-platform presence",
      definition: "Meaningful presence across ecosystems, not just one app.",
      evaluationQuestions: ["Did the persona travel platforms intact?"],
      evidenceHints: ["multi-platform catalogs", "platform-native adaptations"],
    },
    {
      id: "historical_significance",
      label: "Historical significance",
      definition: "Importance for telling internet-culture history later.",
      evaluationQuestions: [
        "Would an encyclopedia omit them and leave a hole?",
      ],
      evidenceHints: ["era-defining moments", "retrospective consensus"],
    },
  ] as const;

export function getCreatorInfluenceDimension(
  id: CreatorInfluenceDimensionId,
): CreatorInfluenceDimension | undefined {
  return CREATOR_INFLUENCE_DIMENSIONS.find((d) => d.id === id);
}
