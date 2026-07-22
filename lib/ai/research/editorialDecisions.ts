/**
 * Structured editorial decisions for Research Review.
 *
 * Every decision answers: what AI recommends, why, confidence,
 * options, and what happens if the editor does nothing.
 * Free-text is not used for routine research choices.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type { ResearchPackage } from "@/lib/ai/packages";
import type { ConclusionConfidence } from "./completenessTypes";

/** Auto-accept AI recommendation at or above this score (0–1). */
export const EDITORIAL_AUTO_ACCEPT_THRESHOLD = 0.7;

export type EditorialDecisionKind =
  | "category"
  | "origin_window"
  | "slug"
  | "framing";

export interface EditorialDecisionOption {
  id: string;
  label: string;
  value: string;
}

/**
 * Actionable editorial decision produced by the research engine.
 */
export interface EditorialDecision {
  id: string;
  kind: EditorialDecisionKind;
  /** Human label for the decision screen, e.g. "Category". */
  label: string;
  recommendation: EditorialDecisionOption;
  /** 0–1 confidence in the recommendation. */
  confidence: number;
  reasoning: string;
  alternatives: EditorialDecisionOption[];
  /** True when confidence >= EDITORIAL_AUTO_ACCEPT_THRESHOLD. */
  autoAccepted: boolean;
  /** Explains default if the editor takes no action. */
  ifNoAction: string;
}

export type EditorialDecisionAction = "keep" | "alternative" | "other";

export interface EditorialDecisionOutcome {
  decisionId: string;
  action: EditorialDecisionAction;
  chosenValue: string;
  chosenLabel: string;
}

const CATEGORY_LABELS: Record<AIDraftCategory, string> = {
  meme: "Meme",
  slang: "Slang",
  trend: "Trend",
  brainrot: "Brainrot",
  event: "Event",
  creator: "Creator",
};

const CATEGORY_ALTERNATIVES: Record<AIDraftCategory, AIDraftCategory[]> = {
  meme: ["trend", "brainrot"],
  slang: ["meme", "trend"],
  trend: ["meme", "slang"],
  brainrot: ["meme", "trend"],
  event: ["meme", "trend"],
  creator: ["meme", "event"],
};

export function categoryLabel(category: AIDraftCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function allCategoryOptions(
  recommended: AIDraftCategory,
): EditorialDecisionOption[] {
  const cats: AIDraftCategory[] = [
    "meme",
    "slang",
    "trend",
    "brainrot",
    "event",
    "creator",
  ];
  return cats
    .filter((c) => c !== recommended)
    .map((c) => ({
      id: `cat_${c}`,
      label: categoryLabel(c),
      value: c,
    }));
}

export function confidenceBandToScore(band: ConclusionConfidence): number {
  switch (band) {
    case "high":
      return 0.82;
    case "medium":
      return 0.63;
    case "low":
      return 0.42;
  }
}

export function formatConfidencePercent(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}

export function isAutoAccepted(confidence: number): boolean {
  return confidence >= EDITORIAL_AUTO_ACCEPT_THRESHOLD;
}

function categoryDecision(pkg: ResearchPackage): EditorialDecision {
  const note = pkg.conclusionNotes?.find((n) => n.field === "category");
  const confidence = note
    ? confidenceBandToScore(note.confidence)
    : Math.max(pkg.confidence, 0.55);
  const recommended = pkg.categoryRecommendation;
  const autoAccepted = isAutoAccepted(confidence);
  const alternatives = CATEGORY_ALTERNATIVES[recommended].map((c) => ({
    id: `cat_${c}`,
    label: categoryLabel(c),
    value: c,
  }));

  return {
    id: "decision_category",
    kind: "category",
    label: "Category",
    recommendation: {
      id: `cat_${recommended}`,
      label: categoryLabel(recommended),
      value: recommended,
    },
    confidence,
    reasoning:
      note?.reasoning ||
      pkg.categoryReasoning ||
      `Best-fit category based on format, usage, and catalog rules.`,
    alternatives,
    autoAccepted,
    ifNoAction: autoAccepted
      ? `AI recommendation (${categoryLabel(recommended)}) is kept automatically.`
      : `If you do nothing and approve, the AI recommendation (${categoryLabel(recommended)}) is used.`,
  };
}

function originDecision(pkg: ResearchPackage): EditorialDecision | null {
  const note = pkg.conclusionNotes?.find((n) => n.field === "origin");
  if (!note) return null;

  const confidence = confidenceBandToScore(note.confidence);
  // Only surface origin when below auto-accept — high/medium-high are silent.
  if (isAutoAccepted(confidence) && !note.escalateToEditor) {
    return {
      id: "decision_origin",
      kind: "origin_window",
      label: "Origin window",
      recommendation: {
        id: "origin_keep",
        label: "Keep AI origin framing",
        value: "keep",
      },
      confidence,
      reasoning: note.reasoning,
      alternatives: [
        {
          id: "origin_softer",
          label: "Use softer dating language",
          value: "softer",
        },
      ],
      autoAccepted: true,
      ifNoAction: "AI origin framing is kept automatically.",
    };
  }

  if (!note.escalateToEditor && isAutoAccepted(confidence)) return null;

  return {
    id: "decision_origin",
    kind: "origin_window",
    label: "Origin window",
    recommendation: {
      id: "origin_keep",
      label: "Keep AI origin framing",
      value: "keep",
    },
    confidence,
    reasoning: note.reasoning,
    alternatives: [
      {
        id: "origin_softer",
        label: "Use softer dating language",
        value: "softer",
      },
      {
        id: "origin_emphasize_approx",
        label: "Emphasize approximate dating in the lead",
        value: "emphasize_approx",
      },
    ],
    autoAccepted: isAutoAccepted(confidence),
    ifNoAction: isAutoAccepted(confidence)
      ? "AI origin framing is kept automatically."
      : "If you do nothing and approve, the AI origin framing is used as written.",
  };
}

function slugDecision(pkg: ResearchPackage): EditorialDecision {
  const slug = pkg.slugSuggestion || "untitled";
  const confidence = 0.88;
  return {
    id: "decision_slug",
    kind: "slug",
    label: "URL slug",
    recommendation: {
      id: "slug_keep",
      label: `/${slug}`,
      value: slug,
    },
    confidence,
    reasoning: `Derived from the title using encyclopedia slug rules (lowercase, hyphens).`,
    alternatives: [],
    autoAccepted: true,
    ifNoAction: `Slug /${slug} is kept automatically.`,
  };
}

/**
 * Build structured editorial decisions from a completed ResearchPackage.
 */
export function buildEditorialDecisions(
  pkg: ResearchPackage,
): EditorialDecision[] {
  if (pkg.editorialDecisions?.length) {
    return pkg.editorialDecisions.map((d) => ({
      ...d,
      autoAccepted: isAutoAccepted(d.confidence),
    }));
  }

  const decisions: EditorialDecision[] = [categoryDecision(pkg)];
  const origin = originDecision(pkg);
  if (origin) decisions.push(origin);
  decisions.push(slugDecision(pkg));
  return decisions;
}

export function decisionsNeedingEditorAction(
  decisions: EditorialDecision[],
): EditorialDecision[] {
  return decisions.filter((d) => !d.autoAccepted);
}

export function autoAcceptedDecisions(
  decisions: EditorialDecision[],
): EditorialDecision[] {
  return decisions.filter((d) => d.autoAccepted);
}

/** Apply origin framing choice onto package origin prose. */
export function applyOriginChoice(
  origin: string,
  choice: string,
): string {
  if (choice === "softer") {
    return `${origin} Dating remains approximate and should be read as a working window, not a hard first-appearance timestamp.`;
  }
  if (choice === "emphasize_approx") {
    return `Approximate origin: ${origin}`;
  }
  return origin;
}
