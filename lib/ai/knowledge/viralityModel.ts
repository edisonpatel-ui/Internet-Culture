/**
 * Virality model — why content spreads (RC3-D).
 * Structured reasoning only — no numerical auto-scores.
 */

export type ViralityDriverId =
  | "novelty"
  | "humor"
  | "shock"
  | "relatability"
  | "identity"
  | "community"
  | "timing"
  | "algorithm"
  | "celebrity"
  | "media_attention";

export interface ViralityDriver {
  id: ViralityDriverId;
  label: string;
  definition: string;
  /** How editors should reason about this driver. */
  reasoningPrompts: string[];
  commonMisreads: string[];
}

export const VIRALITY_DRIVERS: readonly ViralityDriver[] = [
  {
    id: "novelty",
    label: "Novelty",
    definition: "Feels new relative to recent feeds.",
    reasoningPrompts: [
      "What prior formats does this break or remix?",
      "Is novelty of form, topic, or tone?",
    ],
    commonMisreads: ["confusing novelty with quality or longevity"],
  },
  {
    id: "humor",
    label: "Humor",
    definition: "Triggers laughter, cringe-laugh, or absurdist delight.",
    reasoningPrompts: ["Who is the joke for?", "Does it survive without audio?"],
    commonMisreads: ["assuming one community's funny is universal"],
  },
  {
    id: "shock",
    label: "Shock",
    definition: "Violates expectation or taboo enough to compel sharing.",
    reasoningPrompts: ["Is shock the payload or the packaging?"],
    commonMisreads: ["overstating reach from outrage screenshots alone"],
  },
  {
    id: "relatability",
    label: "Relatability",
    definition: "Viewers see themselves or their group in the content.",
    reasoningPrompts: ["Which identity does it flatter or roast?"],
    commonMisreads: ["treating relatability as proof of origin"],
  },
  {
    id: "identity",
    label: "Identity",
    definition: "Signals belonging, status, or aesthetic tribe.",
    reasoningPrompts: ["What in-group does sharing perform?"],
    commonMisreads: ["ignoring gatekeeping that limits spread"],
  },
  {
    id: "community",
    label: "Community",
    definition: "Amplification by organized or dense social graphs.",
    reasoningPrompts: ["Was there a raid, fandom push, or subreddit boost?"],
    commonMisreads: ["calling organic what was coordinated"],
  },
  {
    id: "timing",
    label: "Timing",
    definition: "Hits a news, seasonal, or platform moment.",
    reasoningPrompts: ["What else was happening the week it broke?"],
    commonMisreads: ["post-hoc timing myths without dates"],
  },
  {
    id: "algorithm",
    label: "Algorithm",
    definition: "Feed ranking or recommendation loops accelerate distribution.",
    reasoningPrompts: [
      "Does the format fit the platform's ranking incentives?",
    ],
    commonMisreads: ["algorithm as sole cause without cultural fit"],
  },
  {
    id: "celebrity",
    label: "Celebrity",
    definition: "Famous people or accounts boost visibility.",
    reasoningPrompts: ["Did fame create it or only amplify it?"],
    commonMisreads: ["crediting celebrity as origin incorrectly"],
  },
  {
    id: "media_attention",
    label: "Media attention",
    definition: "Press/TV explainers expand the audience beyond natives.",
    reasoningPrompts: ["Did coverage explain or sanitize the meme?"],
    commonMisreads: ["assuming press discovery equals first appearance"],
  },
] as const;

export function getViralityDriver(
  id: ViralityDriverId,
): ViralityDriver | undefined {
  return VIRALITY_DRIVERS.find((d) => d.id === id);
}
