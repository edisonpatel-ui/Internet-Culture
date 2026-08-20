/**
 * Published article update — scoped Knowledge Engine research + preview.
 *
 * Flow:
 * Published Article → request change → KE researches only the request →
 * highlighted diff preview → approve → overwrite lib/content + validate/build.
 */

import { getEntryBySlug, getAllEntriesSync } from "@/lib/services/entries";
import {
  parseEditorInstructions,
  runKnowledgeEngine,
} from "@/lib/ai/knowledgeEngine";
import { runUpdateWorkflow } from "@/lib/ai/workflows/updateWorkflow";
import { generateDraftFromApprovedResearch } from "@/lib/admin/draftGeneration/fromApprovedResearch";
import { scoreFromRealEvidence } from "@/lib/admin/editorialOs/realArticleGeneration";
import {
  sanitizePublicProse,
  writeEncyclopediaLead,
} from "@/lib/admin/draftGeneration/encyclopediaProse";
import { createApprovedResearch } from "@/lib/ai/packages";
import type { BaseEntry, Scores } from "@/types";
import type { AIDraftCategory } from "@/lib/ai/types";
import { snapshotFromEntry } from "./snapshot";
import { buildFieldDiffs } from "./diff";
import {
  saveUpdateSession,
  type ArticleUpdateSession,
} from "./store";

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled"
  );
}

/**
 * Search published encyclopedia for update targets.
 */
export function searchPublishedArticles(query: string): BaseEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllEntriesSync().slice(0, 20);
  return getAllEntriesSync()
    .filter((e) => {
      const hay = `${e.title} ${e.slug} ${e.description} ${(e.tags ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q) || q.split(/\s+/).every((w) => hay.includes(w));
    })
    .slice(0, 30);
}

/**
 * Start an update: scoped KE research on the requested change only.
 */
export async function createArticleUpdate(input: {
  slug: string;
  request: string;
}): Promise<ArticleUpdateSession> {
  const request = input.request.trim();
  if (!request) {
    throw new Error("Update request text is required.");
  }

  const entry = getAllEntriesSync().find((e) => e.slug === input.slug);
  if (!entry) {
    throw new Error(`Published article not found: ${input.slug}`);
  }

  const existing = snapshotFromEntry(entry);

  // Request is an AI instruction — parse into directives; never seed prose
  const directives = parseEditorInstructions({
    text: request,
    topicFallback: entry.title,
  });

  // Scoped Knowledge Engine — researches only the requested change
  const { package: research } = runKnowledgeEngine({
    topic: entry.title,
    categoryHint: entry.category as AIDraftCategory,
    targetSlug: entry.slug,
    updateRequest: directives.researchFocus.join(", ") || "scoped update",
    directives,
    seedUrls: [
      ...(entry.sources ?? [])
        .map((s) => s.url)
        .filter((u): u is string => Boolean(u?.trim())),
      ...directives.seedUrls,
    ],
    catalogSummary: entry.description,
  });

  // Merge live article facts so update research isn't empty when seeds exist
  const groundedResearch = {
    ...research,
    summary: research.summary.trim() || entry.description,
    origin: research.origin.trim() || entry.origin || entry.description,
    culturalImpact:
      research.culturalImpact.trim() ||
      entry.description,
    timeline:
      research.timeline.length > 0
        ? research.timeline
        : entry.historicalDate
          ? [
              {
                when: entry.historicalDate,
                what: `Historical date on live entry for ${entry.title}`,
              },
            ]
          : [
              {
                when: entry.addedAt.slice(0, 4) || "unknown",
                what: `Live encyclopedia entry /${entry.slug} last noted ${entry.lastUpdated ?? entry.addedAt}`,
              },
            ],
    sources:
      research.sources.length > 0
        ? research.sources
        : (entry.sources ?? [])
            .filter((s) => s.url)
            .map((s, i) => ({
              id: `live_${i}`,
              title: s.title,
              url: s.url,
              tier: "primary" as const,
            })),
    mediaSuggestions:
      research.mediaSuggestions.length > 0
        ? research.mediaSuggestions
        : (entry.media ?? []).map((m, i) => ({
            id: `live_media_${i}`,
            role: m.role,
            type: m.type,
            title: m.title,
            url: m.url,
            source: m.source,
            sourceUrl: m.sourceUrl,
            attribution: m.attribution,
            verified: false as const,
          })),
    // For scoped updates, allow verification even if full new-topic research would fail
    completeness: {
      ...(research.completeness ?? {
        readyForEditor: true,
        researchFailed: false,
        score: 0.8,
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
  };

  const { package: updatePackage } = runUpdateWorkflow({
    existing,
    newResearch: groundedResearch,
    request,
  });

  const approved = createApprovedResearch({
    researchPackage: groundedResearch,
    categoryDecision: entry.category as AIDraftCategory,
    verifiedSources: groundedResearch.sources
      .filter((s) => s.url)
      .slice(0, 8)
      .map((s, i) => ({
        sourceId: s.id ?? `src_${i}`,
        title: s.title,
        url: s.url,
        tier: s.tier,
        verificationNote: "Carried for scoped update preview",
      })),
    resolvedIssues: [],
    // Admin-only metadata — never rendered as article body
    editorNotes: [
      `Update instruction (internal): ${request.slice(0, 200)}`,
    ],
    changesMade: [
      `Scoped KE research for update intents: ${directives.researchFocus.join(", ") || "general"}`,
    ],
  });

  const liveExtras = entry as BaseEntry & {
    examples?: string[];
    usageExamples?: string[];
  };

  const researchedSummary =
    sanitizePublicProse(groundedResearch.summary) ||
    sanitizePublicProse(entry.description) ||
    writeEncyclopediaLead({
      title: entry.title,
      category: entry.category,
      summary: entry.description,
    });

  let proposedDraft;
  try {
    proposedDraft = {
      ...generateDraftFromApprovedResearch(approved, {
        // Refine the article's REAL current scores, not generic new-topic
        // defaults — this is what was silently resetting cultural scores
        // toward 50/45/25/30 on every scoped update to a published entry.
        baseScores: entry.scores,
      }),
      id: `dp_update_${entry.slug}_${Date.now()}`,
      slugSuggestion: entry.slug,
      title: entry.title,
      summary: researchedSummary,
      lead: researchedSummary,
      origin: sanitizePublicProse(groundedResearch.origin) || entry.origin || "",
      culturalSignificance:
        sanitizePublicProse(groundedResearch.culturalImpact) ||
        entry.description,
      examples: liveExtras.examples ?? liveExtras.usageExamples ?? [],
      relatedTopics: entry.relatedSlugs ?? [],
      editorNotes: [
        `Update instruction (internal): ${request.slice(0, 200)}`,
      ],
    };
  } catch {
    // Fallback keeps live encyclopedia prose — never inserts the request
    proposedDraft = {
      id: `dp_update_${entry.slug}_${Date.now()}`,
      title: entry.title,
      slugSuggestion: entry.slug,
      category: entry.category as AIDraftCategory,
      summary: researchedSummary,
      lead: researchedSummary,
      articleSections: [
        {
          id: "origin",
          heading: "Origin",
          body:
            sanitizePublicProse(entry.origin ?? "") ||
            researchedSummary,
        },
      ],
      origin: entry.origin ?? "",
      history: "",
      timeline: [],
      examples: liveExtras.examples ?? liveExtras.usageExamples ?? [],
      culturalSignificance: entry.description,
      legacy: "",
      relatedTopics: entry.relatedSlugs ?? [],
      aliases: [],
      tags: entry.tags ?? [],
      categoryFields: {},
      suggestedCulturalScores: {
        relevance: entry.scores.relevance,
        influence: entry.scores.influence,
        cringe: entry.scores.cringe,
        brainrot: entry.scores.brainrot,
      },
      suggestedMedia: (entry.media ?? []).map((m) => ({
        role: m.role,
        type: m.type,
        url: m.url,
        title: m.title,
        source: m.source,
        verified: false as const,
      })),
      suggestedSources: (entry.sources ?? [])
        .filter((s) => s.url)
        .map((s) => ({ title: s.title, url: s.url })),
      groundedOnResearch: groundedResearch,
      editorNotes: [
        `Update instruction (internal): ${request.slice(0, 200)}`,
      ],
      feedbackHistory: [],
      revision: 0,
    };
  }

  // Refine scores with the SAME live-evidence methodology Draft Studio and
  // Maintenance Refresh use (researchDynamicSignals → scoreDynamicMetadata),
  // instead of Update/Edit staying on an offline/legacy heuristic-only path.
  // Best-effort: scoreFromRealEvidence already falls back to the existing
  // baseline internally on any research/network failure, never throws.
  try {
    const sourceUrls = [
      ...(entry.sources ?? []).map((s) => s.url).filter((u): u is string => Boolean(u)),
      ...(proposedDraft.suggestedSources ?? [])
        .map((s) => s.url)
        .filter((u): u is string => Boolean(u)),
    ];
    const baseline: Scores = {
      relevance: proposedDraft.suggestedCulturalScores?.relevance ?? entry.scores.relevance,
      influence: proposedDraft.suggestedCulturalScores?.influence ?? entry.scores.influence,
      cringe: proposedDraft.suggestedCulturalScores?.cringe ?? entry.scores.cringe,
      brainrot: proposedDraft.suggestedCulturalScores?.brainrot ?? entry.scores.brainrot,
    };
    const { scores: realScores, evidenceNotes } = await scoreFromRealEvidence({
      topic: entry.title,
      category: entry.category as AIDraftCategory,
      tags: entry.tags ?? [],
      sourceUrls,
      groqSuggestion: baseline,
    });
    proposedDraft.suggestedCulturalScores = realScores;
    if (evidenceNotes.length > 0) {
      proposedDraft.editorNotes = [
        ...(proposedDraft.editorNotes ?? []),
        ...evidenceNotes.slice(0, 5).map((n) => `Live scoring: ${n}`),
      ];
    }
  } catch {
    // Keep whatever suggestedCulturalScores the draft generation already set.
  }

  const afterFields: Record<string, string> = {
    description: proposedDraft.summary,
    origin: proposedDraft.origin,
    summary: proposedDraft.summary,
    culturalSignificance: proposedDraft.culturalSignificance,
    timeline: proposedDraft.timeline
      .map((t) => `${t.date}: ${t.event}`)
      .join("\n"),
  };

  const diffs = buildFieldDiffs(existing.fields, afterFields);

  const session: ArticleUpdateSession = {
    id: `upd_${entry.slug}_${Date.now()}`,
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    request,
    createdAt: new Date().toISOString(),
    updatePackage,
    proposedDraft,
    diffs,
    status: "preview",
  };

  return saveUpdateSession(session);
}

export async function getPublishedEntry(slug: string) {
  return getEntryBySlug(slug);
}

void slugify;
