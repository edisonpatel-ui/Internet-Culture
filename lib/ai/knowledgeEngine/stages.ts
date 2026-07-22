/**
 * Knowledge Engine — authoritative stage order.
 *
 * Guiding principle: the editor should almost never perform research.
 * Before anything reaches the editor, the engine exhausts every reasonable
 * method of finding evidence. A field may become "Unknown" only after every
 * stage has been attempted.
 *
 * Research Review is verification, not research.
 */

export const KNOWLEDGE_ENGINE_STAGES = [
  {
    id: "resolve_entity",
    order: 1,
    label: "Resolve entity",
    description:
      "Determine exactly what the topic is, aliases, duplicates, and what it is NOT.",
  },
  {
    id: "search_trusted_sources",
    order: 2,
    label: "Search trusted sources",
    description:
      "Official sites, Know Your Meme, Wikipedia, Wikimedia, academic, major news — in priority order.",
  },
  {
    id: "search_additional_sources",
    order: 3,
    label: "Search additional reliable sources",
    description:
      "Secondary journalism, reputable explainers, and documented community references.",
  },
  {
    id: "search_archives",
    order: 4,
    label: "Search archives",
    description:
      "Wayback / archive copies when live pages are thin, moved, or contested.",
  },
  {
    id: "search_creator_pages",
    order: 5,
    label: "Search official creator pages",
    description:
      "Creator channels, profiles, and official statements tied to the entity.",
  },
  {
    id: "search_media_sources",
    order: 6,
    label: "Search image and video sources",
    description:
      "Find the best representative media — Wikimedia, official, creator, trusted screenshots. verified:false is OK.",
  },
  {
    id: "search_encyclopedia",
    order: 7,
    label: "Search ICH encyclopedia",
    description:
      "Related live entries, aliases, and catalog relationships already published.",
  },
  {
    id: "compare_evidence",
    order: 8,
    label: "Compare all evidence",
    description:
      "Cross-check claims across sources; score reliability; never stop early because one source is missing.",
  },
  {
    id: "resolve_conflicts",
    order: 9,
    label: "Resolve conflicts",
    description:
      "Document disagreements, strongest evidence, approximate dates, and uncertainty. Never hide conflicts.",
  },
  {
    id: "build_research_package",
    order: 10,
    label: "Build Research Package",
    description:
      "Seal the most complete grounded package possible. Unknown only for fields still undetermined after all stages.",
  },
] as const;

export type KnowledgeEngineStageId =
  (typeof KNOWLEDGE_ENGINE_STAGES)[number]["id"];

export interface KnowledgeEngineStageAttempt {
  stageId: KnowledgeEngineStageId;
  attempted: true;
  /** What the engine tried (methods / adapters). */
  methods: string[];
  /** Short outcome — found / empty / partial / skipped_no_adapter. */
  outcome: "found" | "partial" | "empty" | "skipped_no_adapter";
  notes: string[];
}

export interface KnowledgeEngineRunMeta {
  guidingPrinciple: "The editor should almost never perform research.";
  /** Every stage must appear here before Unknown is allowed. */
  stagesAttempted: KnowledgeEngineStageAttempt[];
  allStagesAttempted: boolean;
  /** Scoped update research focuses on this request when set. */
  updateRequest?: string;
  targetSlug?: string;
}

export function emptyStageAttempts(): KnowledgeEngineStageAttempt[] {
  return KNOWLEDGE_ENGINE_STAGES.map((s) => ({
    stageId: s.id,
    attempted: true as const,
    methods: [],
    outcome: "empty" as const,
    notes: [],
  }));
}

export function markStage(
  attempts: KnowledgeEngineStageAttempt[],
  stageId: KnowledgeEngineStageId,
  patch: Partial<Omit<KnowledgeEngineStageAttempt, "stageId" | "attempted">>,
): KnowledgeEngineStageAttempt[] {
  return attempts.map((a) =>
    a.stageId === stageId
      ? {
          ...a,
          attempted: true as const,
          methods: patch.methods ?? a.methods,
          outcome: patch.outcome ?? a.outcome,
          notes: patch.notes ?? a.notes,
        }
      : a,
  );
}

export function allStagesAttempted(
  attempts: KnowledgeEngineStageAttempt[],
): boolean {
  const ids = new Set(KNOWLEDGE_ENGINE_STAGES.map((s) => s.id));
  for (const a of attempts) {
    if (!a.attempted || !ids.has(a.stageId)) return false;
    ids.delete(a.stageId);
  }
  return ids.size === 0;
}
