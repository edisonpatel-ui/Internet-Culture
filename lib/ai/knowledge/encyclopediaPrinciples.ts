/**
 * Encyclopedia principles — permanent editorial philosophy (RC3-D).
 */

export type EncyclopediaPrincipleId =
  | "teach_before_impressing"
  | "explain_before_assuming"
  | "preserve_uncertainty"
  | "prefer_primary_evidence"
  | "never_exaggerate"
  | "avoid_hype"
  | "avoid_ai_cliches"
  | "prefer_historical_context"
  | "prefer_examples"
  | "explain_cultural_significance"
  | "human_approval_required";

export interface EncyclopediaPrinciple {
  id: EncyclopediaPrincipleId;
  label: string;
  statement: string;
  /** How AI / editors should apply it. */
  application: string;
  antiPattern: string;
}

export const ENCYCLOPEDIA_PRINCIPLES: readonly EncyclopediaPrinciple[] = [
  {
    id: "teach_before_impressing",
    label: "Teach before impressing",
    statement: "A curious newcomer should understand the first two sentences.",
    application: "Lead with concrete identity, not vibes or flex vocabulary.",
    antiPattern: "Opening with insider slang and no gloss.",
  },
  {
    id: "explain_before_assuming",
    label: "Explain before assuming",
    statement: "Do not assume the reader already knows the joke or platform.",
    application: "Define terms and platforms on first use when needed.",
    antiPattern: "Name-dropping without context.",
  },
  {
    id: "preserve_uncertainty",
    label: "Preserve uncertainty",
    statement: "Unknown origins and disputed facts stay visible.",
    application: "Use contradiction records; avoid fake precision dates.",
    antiPattern: "Picking one unverified origin to sound definitive.",
  },
  {
    id: "prefer_primary_evidence",
    label: "Prefer primary evidence",
    statement: "Primary artifacts and reporting beat rumor aggregators.",
    application: "Cite uploads, statements, and reputable reporting first.",
    antiPattern: "Single blog or Reddit thread as sole source.",
  },
  {
    id: "never_exaggerate",
    label: "Never exaggerate",
    statement: "Do not invent reach, importance, or uniqueness.",
    application: "Qualify claims; prefer examples over superlatives.",
    antiPattern: "'Changed the internet forever' without evidence.",
  },
  {
    id: "avoid_hype",
    label: "Avoid hype",
    statement: "Encyclopedia voice is calm and useful, not promotional.",
    application: "Describe; don't sell.",
    antiPattern: "Marketing adjectives and FOMO framing.",
  },
  {
    id: "avoid_ai_cliches",
    label: "Avoid AI clichés",
    statement: "No empty filler, fake certainty, or generic listicles.",
    application: "Prefer specific cultural detail over boilerplate.",
    antiPattern: "'In today's digital age…' and synonym spam.",
  },
  {
    id: "prefer_historical_context",
    label: "Prefer historical context",
    statement: "Situate topics in eras, platforms, and precursors.",
    application: "Use internet history eras and lifecycle models.",
    antiPattern: "Treating every topic as born yesterday.",
  },
  {
    id: "prefer_examples",
    label: "Prefer examples",
    statement: "Concrete usage beats abstract description.",
    application: "Include examples fields and timelines when available.",
    antiPattern: "Only metaphorical explanation with no specimen.",
  },
  {
    id: "explain_cultural_significance",
    label: "Explain cultural significance",
    statement: "Say why it mattered — if supportable.",
    application: "Use impact framework dimensions as prompts, not auto-scores.",
    antiPattern: "Skipping 'why anyone cared'.",
  },
  {
    id: "human_approval_required",
    label: "Human approval required",
    statement: "AI suggestions never publish themselves.",
    application: "All packages stay recommendations until an editor commits.",
    antiPattern: "Auto-writing lib/content or setting verified:true.",
  },
] as const;

export function getEncyclopediaPrinciple(
  id: EncyclopediaPrincipleId,
): EncyclopediaPrinciple | undefined {
  return ENCYCLOPEDIA_PRINCIPLES.find((p) => p.id === id);
}
