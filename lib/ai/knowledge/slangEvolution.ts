/**
 * Slang evolution stages — structural knowledge only (RC3-D).
 */

export type SlangEvolutionStageId =
  | "origin"
  | "small_community"
  | "online_spread"
  | "cross_platform_adoption"
  | "mainstream_use"
  | "dictionary_recognition"
  | "decline"
  | "permanent_language";

export interface SlangEvolutionStage {
  id: SlangEvolutionStageId;
  label: string;
  order: number;
  characteristics: string[];
  researchFocus: string[];
  commonPitfalls: string[];
}

export const SLANG_EVOLUTION_STAGES: readonly SlangEvolutionStage[] = [
  {
    id: "origin",
    label: "Origin",
    order: 1,
    characteristics: [
      "Coinage or semantic shift in a specific context",
      "Often oral/chat before public posts",
    ],
    researchFocus: ["earliest dated use", "community of coinage"],
    commonPitfalls: ["mistaking viral popularizer for coiner"],
  },
  {
    id: "small_community",
    label: "Small community",
    order: 2,
    characteristics: ["In-group use", "High context dependence"],
    researchFocus: ["local glossaries", "primary chat/forum logs if ethical"],
    commonPitfalls: ["overgeneralizing niche meaning"],
  },
  {
    id: "online_spread",
    label: "Online spread",
    order: 3,
    characteristics: ["Appears across threads/videos", "Meaning still fluid"],
    researchFocus: ["platform path", "variant spellings"],
    commonPitfalls: ["single-screenshot etymologies"],
  },
  {
    id: "cross_platform_adoption",
    label: "Cross-platform adoption",
    order: 4,
    characteristics: ["Same term on multiple apps", "Slight meaning drift"],
    researchFocus: ["TikTok vs Twitter vs Discord senses"],
    commonPitfalls: ["assuming one universal definition"],
  },
  {
    id: "mainstream_use",
    label: "Mainstream use",
    order: 5,
    characteristics: ["Non-native speakers use it", "Brand / influencer adoption"],
    researchFocus: ["press explainers", "misuse examples"],
    commonPitfalls: ["treating brand use as origin"],
  },
  {
    id: "dictionary_recognition",
    label: "Dictionary recognition",
    order: 6,
    characteristics: ["Lexicographer entries", "Formal definitions"],
    researchFocus: ["Oxford / Merriam / regional dictionaries"],
    commonPitfalls: ["dictionary date ≠ coinage date"],
  },
  {
    id: "decline",
    label: "Decline",
    order: 7,
    characteristics: ["Sounds dated", "Ironic-only use"],
    researchFocus: ["replacement slang", "generational markers"],
    commonPitfalls: ["declaring a term dead too early"],
  },
  {
    id: "permanent_language",
    label: "Permanent language",
    order: 8,
    characteristics: [
      "Stable idiom across decades",
      "Understood outside origin community",
    ],
    researchFocus: ["longitudinal usage", "offline spillover"],
    commonPitfalls: ["ignoring ongoing niche senses"],
  },
] as const;

export function getSlangEvolutionStage(
  id: SlangEvolutionStageId,
): SlangEvolutionStage | undefined {
  return SLANG_EVOLUTION_STAGES.find((s) => s.id === id);
}
