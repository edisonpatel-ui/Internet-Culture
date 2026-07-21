/**
 * Research methodology — required sequence for every future article (RC3-C).
 *
 * Typed steps only. Does not fetch sources or call providers.
 */

/** Ordered research steps every editorial research pass must follow. */
export type ResearchMethodologyStepId =
  | "identify_subject"
  | "collect_sources"
  | "extract_facts"
  | "extract_chronology"
  | "identify_platforms"
  | "identify_aliases"
  | "identify_related_entities"
  | "determine_cultural_impact"
  | "find_contradictions"
  | "score_evidence"
  | "produce_research_package";

export interface ResearchMethodologyStep {
  id: ResearchMethodologyStepId;
  /** 1-based order in the required sequence. */
  order: number;
  label: string;
  description: string;
  /** What the step must produce before the next step. */
  requiredOutputs: string[];
}

/**
 * Canonical research sequence — single source of truth for future models/tools.
 */
export const RESEARCH_METHODOLOGY_STEPS: readonly ResearchMethodologyStep[] = [
  {
    id: "identify_subject",
    order: 1,
    label: "Identify subject",
    description:
      "Name the entity concretely; state what it is and what it is NOT.",
    requiredOutputs: ["working_title", "one_sentence_identity", "not_this"],
  },
  {
    id: "collect_sources",
    order: 2,
    label: "Collect sources",
    description:
      "Gather candidate sources across tiers; prefer primary and reputable journalism.",
    requiredOutputs: ["candidate_sources"],
  },
  {
    id: "extract_facts",
    order: 3,
    label: "Extract facts",
    description:
      "Pull discrete claims with source links; do not invent dates or creators.",
    requiredOutputs: ["fact_list"],
  },
  {
    id: "extract_chronology",
    order: 4,
    label: "Extract chronology",
    description: "Order events with date precision and uncertainty preserved.",
    requiredOutputs: ["chronology_items"],
  },
  {
    id: "identify_platforms",
    order: 5,
    label: "Identify platforms",
    description: "Where the culture lived, spread, or was remixed.",
    requiredOutputs: ["platforms"],
  },
  {
    id: "identify_aliases",
    order: 6,
    label: "Identify aliases",
    description: "Alternate names, spellings, and search variants.",
    requiredOutputs: ["aliases"],
  },
  {
    id: "identify_related_entities",
    order: 7,
    label: "Identify related entities",
    description: "People, memes, slang, events, communities, products.",
    requiredOutputs: ["entities"],
  },
  {
    id: "determine_cultural_impact",
    order: 8,
    label: "Determine cultural impact",
    description:
      "Describe lasting influence only when evidence supports it; recommendations only.",
    requiredOutputs: ["impact_notes"],
  },
  {
    id: "find_contradictions",
    order: 9,
    label: "Find contradictions",
    description: "Record disputes and gaps; never resolve by inventing answers.",
    requiredOutputs: ["contradictions", "missing_information"],
  },
  {
    id: "score_evidence",
    order: 10,
    label: "Score evidence",
    description: "Apply evidence tiers (High / Medium / Low / Unknown) per fact.",
    requiredOutputs: ["evidence_scores"],
  },
  {
    id: "produce_research_package",
    order: 11,
    label: "Produce structured research package",
    description:
      "Assemble ResearchPackage for the draft workflow — human review required.",
    requiredOutputs: ["research_package"],
  },
] as const;

export function getResearchMethodologyStep(
  id: ResearchMethodologyStepId,
): ResearchMethodologyStep | undefined {
  return RESEARCH_METHODOLOGY_STEPS.find((s) => s.id === id);
}

/** Next step after `id`, or null if complete. */
export function nextResearchMethodologyStep(
  id: ResearchMethodologyStepId,
): ResearchMethodologyStep | null {
  const current = getResearchMethodologyStep(id);
  if (!current) return null;
  return (
    RESEARCH_METHODOLOGY_STEPS.find((s) => s.order === current.order + 1) ?? null
  );
}
