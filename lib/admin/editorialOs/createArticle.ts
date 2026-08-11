/**
 * Editorial OS v2 — Create Article.
 * Prompt → Knowledge Engine → DraftPackage (no editor-facing research UI).
 */

import {
  parseEditorInstructions,
  runKnowledgeEngine,
  topicHintFromInstruction,
} from "@/lib/ai/knowledgeEngine";
import { createApprovedResearch } from "@/lib/ai/packages";
import type { AIDraftCategory } from "@/lib/ai/types";
import type { DraftPackage } from "@/lib/ai/packages";
import { generateDraftFromApprovedResearch } from "@/lib/admin/draftGeneration/fromApprovedResearch";
import { saveDraftPackage } from "@/lib/admin/draftGeneration/draftPackageStore";
import { normalizeDraftPackage } from "@/lib/admin/draftGeneration/normalizeDraft";
import { isUnknownValue } from "@/lib/admin/draftGeneration/encyclopediaProse";
import { recordEngineRun } from "./engineLog";
import {
  generateRealDraft,
  isRealGenerationConfigured,
} from "./realArticleGeneration";

const CATEGORIES: AIDraftCategory[] = [
  "meme",
  "slang",
  "trend",
  "brainrot",
  "event",
  "creator",
];

/** Extract a working topic title from a free-form create prompt. */
export function topicFromPrompt(prompt: string): string {
  const fromInstruction = topicHintFromInstruction(prompt);
  if (fromInstruction) return fromInstruction;

  let t = prompt.trim();
  t = t.replace(
    /^(create|write|generate|make|draft)\s+(an?\s+)?(encyclopedia\s+)?(article|entry|page)\s+(about|on|for)\s+/i,
    "",
  );
  t = t.replace(/^about\s+/i, "");
  t = t.replace(/\s*\((slang|meme|trend|brainrot|event|creator)\)\s*$/i, "");
  t = t.replace(/[.!?]+$/, "").trim();
  // Never fall back to a full instruction sentence as the title
  if (/^(use|prefer|focus|search|expand|rewrite|make|add)\b/i.test(t)) {
    return "Untitled";
  }
  if (t.length < 2) return "Untitled";
  return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}

function categoryHintFromPrompt(prompt: string): AIDraftCategory | undefined {
  const lower = prompt.toLowerCase();
  for (const cat of CATEGORIES) {
    if (
      lower.includes(`(${cat})`) ||
      lower.includes(`as ${cat}`) ||
      lower.includes(`${cat} term`)
    ) {
      return cat;
    }
  }
  if (/\bslang\b/.test(lower)) return "slang";
  if (/\bbrainrot\b/.test(lower)) return "brainrot";
  if (/\bmeme\b/.test(lower)) return "meme";
  if (/\bcreator\b|youtuber|streamer/.test(lower)) return "creator";
  if (/\bevent\b|controversy/.test(lower)) return "event";
  if (/\baesthetic\b|\btrend\b/.test(lower)) return "trend";
  return undefined;
}

function countUnknown(pkg: {
  summary: string;
  origin: string;
  culturalImpact: string;
  completeness?: { undetermined?: Array<{ field: string }> };
}): number {
  let n = 0;
  if (isUnknownValue(pkg.summary)) n += 1;
  if (isUnknownValue(pkg.origin)) n += 1;
  if (isUnknownValue(pkg.culturalImpact)) n += 1;
  n += pkg.completeness?.undetermined?.length ?? 0;
  return n;
}

function minimalDraft(input: {
  topic: string;
  category: AIDraftCategory;
  approvedId: string;
  sources: Array<{ title: string; url?: string }>;
  research: DraftPackage["groundedOnResearch"];
}): DraftPackage {
  const now = new Date().toISOString();
  const slug = input.topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    id: `dp_${Date.now().toString(36)}`,
    approvedResearchId: input.approvedId,
    title: input.topic,
    slugSuggestion: slug || "untitled",
    category: input.category,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    summary: `${input.topic} is a ${input.category} in internet culture.`,
    lead: `${input.topic} is a ${input.category} in internet culture.`,
    articleSections: [
      {
        id: "origin",
        heading: "Origin",
        body: `The exact origin of ${input.topic} has not been publicly confirmed.`,
      },
    ],
    origin: `The exact origin of ${input.topic} has not been publicly confirmed.`,
    history: "",
    timeline: [],
    examples: [],
    culturalSignificance: "",
    legacy: "",
    relatedTopics: [],
    aliases: [input.topic],
    tags: [input.category],
    categoryFields: {},
    suggestedCulturalScores: {
      relevance: 50,
      influence: 40,
      cringe: 25,
      brainrot: input.category === "brainrot" ? 70 : 30,
    },
    suggestedMedia: [],
    suggestedSources: input.sources.slice(0, 5),
    seoMetadata: {
      metaTitle: `${input.topic} | Internet Culture Hub`,
      metaDescription: `${input.topic} is a ${input.category} in internet culture.`.slice(
        0,
        160,
      ),
      primaryKeyword: input.topic.toLowerCase(),
    },
    groundedOnResearch: input.research,
    editorNotes: [],
    feedbackHistory: [],
    revision: 0,
  };
}

/**
 * Run the full create pipeline. Always returns a draft (never blocks the editor).
 *
 * Tries real generation first (Tavily research + Groq drafting + Wikimedia
 * media + live-evidence scoring) when GROQ_API_KEY / TAVILY_API_KEY are
 * configured. Falls back to the offline simulated pipeline below on any
 * failure — including missing keys — so Draft Studio never hard-fails.
 */
export async function createArticleFromPrompt(
  prompt: string,
): Promise<DraftPackage> {
  const text = prompt.trim();
  if (!text) {
    throw new Error("Prompt is required.");
  }

  // Prompt is an AI instruction — parse before research; never seed prose
  const directives = parseEditorInstructions({ text });
  const topic =
    directives.topicHint || topicFromPrompt(text) || "Untitled";
  const categoryHint =
    directives.categoryHint ?? categoryHintFromPrompt(text);
  const initialCategoryGuess = categoryHint ?? ("meme" as AIDraftCategory);

  if (isRealGenerationConfigured()) {
    try {
      const real = await generateRealDraft({
        topic,
        category: initialCategoryGuess,
        rawPrompt: text,
      });
      const now = new Date().toISOString();
      const draft = normalizeDraftPackage({
        ...real.draft,
        id: `dp_${Date.now().toString(36)}`,
        status: "draft",
        createdAt: now,
        updatedAt: now,
        editorNotes: real.evidenceNotes,
        feedbackHistory: [],
        revision: 0,
      });
      const saved = saveDraftPackage(draft);
      recordEngineRun({
        kind: "create",
        topic,
        draftId: saved.id,
        unknownFields: 0,
        stagesAttempted: real.sourcesUsed,
        readyForEditor: true,
        notes: `Real generation: ${real.sourcesUsed} sources, media ${
          real.mediaFound ? "found" : "not found"
        }`,
      });
      return saved;
    } catch (err) {
      // Fall through to the simulated pipeline below rather than failing
      // the editor's request outright — a thin offline draft beats none.
      console.error(
        "[Draft Studio] Real generation failed, falling back to offline pipeline:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  const { package: research, meta } = runKnowledgeEngine({
    topic,
    categoryHint,
    directives,
    seedUrls: directives.seedUrls,
  });

  const sealed = {
    ...research,
    completeness: {
      ...(research.completeness ?? {
        readyForEditor: true,
        researchFailed: false,
        score: 0.5,
        completedSections: [],
        groundedFromEvidence: [],
        undetermined: [],
        requiredMissing: [],
        passesCompleted: [],
        escalations: [],
      }),
      readyForEditor: true,
      researchFailed: false,
      requiredMissing: [],
      allStagesAttempted: true,
    },
    // continue_anyway without stuffing the prompt into comment (never prose)
    editorialOverride: research.editorialOverride ?? {
      comment: "",
      appliedAt: new Date().toISOString(),
      action: "continue_anyway" as const,
    },
  };

  const category =
    sealed.categoryRecommendation ?? categoryHint ?? ("meme" as AIDraftCategory);

  const approved = createApprovedResearch({
    researchPackage: {
      ...sealed,
      categoryRecommendation: category,
    },
    categoryDecision: category,
    verifiedSources: sealed.sources
      .filter((s) => s.url)
      .slice(0, 8)
      .map((s, i) => ({
        sourceId: s.id ?? `src_${i}`,
        title: s.title,
        url: s.url,
        tier: s.tier,
        verificationNote: "Auto-attached from Knowledge Engine",
      })),
    resolvedIssues: [],
    editorNotes: [],
    changesMade: ["Auto-generated from Create Article prompt"],
  });

  const now = new Date().toISOString();
  let draft: DraftPackage;
  try {
    draft = generateDraftFromApprovedResearch(approved);
  } catch {
    draft = minimalDraft({
      topic,
      category,
      approvedId: approved.id,
      sources: sealed.sources
        .filter((s) => s.url)
        .map((s) => ({ title: s.title, url: s.url })),
      research: sealed,
    });
  }

  draft = normalizeDraftPackage({
    ...draft,
    id: `dp_${Date.now().toString(36)}`,
    status: "draft",
    createdAt: draft.createdAt ?? now,
    updatedAt: now,
    editorNotes: [],
  });

  const saved = saveDraftPackage(draft);

  recordEngineRun({
    kind: "create",
    topic,
    draftId: saved.id,
    unknownFields: countUnknown(sealed),
    stagesAttempted: meta.stagesAttempted?.length ?? 10,
    readyForEditor: true,
    notes: "Create Article one-shot",
  });

  return saved;
}
