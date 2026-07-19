/**
 * AI assistance utilities (Phase 7E — internal).
 *
 * Suggestion-only helpers. Prefer heuristics when the AI provider is null;
 * when a provider is connected, merge/prefer model output still marked for
 * human review. Never automatically modify catalog content.
 */

import type { BaseEntry } from "@/types";
import {
  buildAiCatalogContext,
  buildAiEntryContext,
  type BuildAiContextOptions,
} from "./context";
import { getAiAssistanceProvider } from "./provider";
import type {
  AiContentSuggestion,
  AiCulturalSummary,
  AiQualityFinding,
  AiQualityReview,
  AiRelationshipInsight,
  AiSuggestionResult,
  AiTrendAnalysis,
} from "./types";
import { aiHeuristicResult } from "./types";
import { rankSearchCoverageOpportunities } from "../searchIntelligence";
import type { AnalyticsIntelligenceReport } from "../analyticsSignals";

function preferAiOrHeuristic<T>(
  ai: AiSuggestionResult<T>,
  heuristic: AiSuggestionResult<T>,
): AiSuggestionResult<T> {
  if (ai.status === "ai" && ai.data != null) {
    return {
      ...ai,
      notes: [
        ...ai.notes,
        "Human review required — do not auto-apply to catalog",
      ],
      requiresHumanReview: true,
    };
  }
  return heuristic;
}

/**
 * Suggest article opportunities (coverage gaps + opportunities + optional AI).
 */
export async function suggestArticleOpportunities(
  catalog: BaseEntry[],
  options?: BuildAiContextOptions & { limit?: number },
): Promise<AiSuggestionResult<AiContentSuggestion[]>> {
  const limit = options?.limit ?? 12;
  const ctx = buildAiCatalogContext(catalog, options);
  const provider = getAiAssistanceProvider();
  const ai = await provider.suggestContent(ctx);

  const fromGaps: AiContentSuggestion[] = ctx.coverageGaps
    .filter((g) => g.missing)
    .map((g) => ({
      concept: g.target.concept,
      suggestedSlug: g.target.suggestedSlug,
      suggestedCategory: g.target.suggestedCategory,
      reason: g.target.reason,
      tier: "high" as const,
      priority: 80,
      signals: ["coverage gap"],
    }));

  const fromNext: AiContentSuggestion[] = ctx.nextArticleSuggestions.map(
    (s) => ({
      concept: s.concept,
      suggestedSlug: s.suggestedSlug,
      suggestedCategory: s.suggestedCategory,
      reason: s.reason,
      tier: s.priority === "high" ? "high" : s.priority === "medium" ? "medium" : "watch",
      priority: s.priority === "high" ? 75 : s.priority === "medium" ? 55 : 35,
      signals: ["next-article suggestion"],
    }),
  );

  const fromOpp: AiContentSuggestion[] = ctx.topOpportunities
    .filter((o) => o.tier === "high" || o.tier === "medium")
    .map((o) => ({
      concept: o.title,
      suggestedSlug: o.topic,
      suggestedCategory: "trend",
      reason: o.recommendation,
      tier: o.tier,
      priority: o.score,
      signals: o.signals.slice(0, 4),
    }));

  let fromSearch: AiContentSuggestion[] = [];
  if (options?.analyticsReport) {
    fromSearch = rankSearchCoverageOpportunities(
      catalog,
      options.analyticsReport,
      8,
    ).map((o) => ({
      concept: o.title,
      suggestedSlug: o.suggestedSlug,
      suggestedCategory: "meme",
      reason: o.recommendation,
      tier: o.tier,
      priority: o.priority,
      signals: [o.signal],
    }));
  }

  const merged = new Map<string, AiContentSuggestion>();
  for (const item of [...fromGaps, ...fromNext, ...fromSearch, ...fromOpp]) {
    const prev = merged.get(item.suggestedSlug);
    if (!prev || item.priority > prev.priority) {
      merged.set(item.suggestedSlug, item);
    }
  }

  const heuristic = aiHeuristicResult(
    "heuristic-assistance",
    [...merged.values()]
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit),
    [
      "Suggestions from coverage gaps, opportunities, and search intelligence",
      "Human research required before creating any article",
    ],
  );

  if (ai.status === "ai" && ai.data?.length) {
    const combined = new Map<string, AiContentSuggestion>();
    for (const item of [...(ai.data ?? []), ...heuristic.data!]) {
      const prev = combined.get(item.suggestedSlug);
      if (!prev || item.priority > prev.priority) {
        combined.set(item.suggestedSlug, item);
      }
    }
    return {
      status: "ai",
      provider: ai.provider,
      data: [...combined.values()]
        .sort((a, b) => b.priority - a.priority)
        .slice(0, limit),
      notes: [
        ...ai.notes,
        "Merged with heuristic opportunities — human review required",
      ],
      requiresHumanReview: true,
      generatedAt: new Date().toISOString(),
    };
  }

  return preferAiOrHeuristic(ai, heuristic);
}

/**
 * Identify weak coverage areas (thin graphs, missing targets, failed searches).
 */
export async function identifyWeakCoverage(
  catalog: BaseEntry[],
  options?: BuildAiContextOptions & { limit?: number },
): Promise<AiSuggestionResult<AiContentSuggestion[]>> {
  const limit = options?.limit ?? 15;
  const ctx = buildAiCatalogContext(catalog, options);

  const weak: AiContentSuggestion[] = [];

  for (const gap of ctx.coverageGaps.filter((g) => g.missing)) {
    weak.push({
      concept: gap.target.concept,
      suggestedSlug: gap.target.suggestedSlug,
      suggestedCategory: gap.target.suggestedCategory,
      reason: `Missing coverage: ${gap.target.reason}`,
      tier: "high",
      priority: 85,
      signals: ["weak coverage", "missing target"],
    });
  }

  for (const s of ctx.nextArticleSuggestions.filter(
    (n) => n.priority === "medium",
  )) {
    weak.push({
      concept: s.concept,
      suggestedSlug: s.suggestedSlug,
      suggestedCategory: s.suggestedCategory,
      reason: s.reason,
      tier: "medium",
      priority: 60,
      signals: ["thin graph"],
    });
  }

  for (const miss of ctx.analytics.topFailedSearches) {
    weak.push({
      concept: miss.query,
      suggestedSlug: miss.query
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 64),
      suggestedCategory: "meme",
      reason: `Failed search demand (${miss.count}) — no article match`,
      tier: miss.count >= 3 ? "high" : "watch",
      priority: Math.min(90, 50 + miss.count * 8),
      signals: ["failed search", "weak coverage"],
    });
  }

  const bySlug = new Map<string, AiContentSuggestion>();
  for (const item of weak) {
    const prev = bySlug.get(item.suggestedSlug);
    if (!prev || item.priority > prev.priority) {
      bySlug.set(item.suggestedSlug, item);
    }
  }

  return aiHeuristicResult(
    "heuristic-assistance",
    [...bySlug.values()]
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit),
    [
      "Weak coverage identified from gaps, thin graphs, and failed searches",
      "Do not auto-create articles — research first",
    ],
  );
}

/**
 * Summarize an intelligence snapshot (heuristic; AI when provider connected).
 */
export async function summarizeIntelligenceSnapshot(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): Promise<AiSuggestionResult<AiCulturalSummary>> {
  const ctx = buildAiEntryContext(entry, catalog, options);
  const provider = getAiAssistanceProvider();
  const ai = await provider.summarizeCulture(ctx);

  const eras = ctx.cultural.era.filter((e) => e !== "unknown");
  const platforms = ctx.cultural.originPlatform.filter((p) => p !== "unknown");
  const audiences = ctx.cultural.audience;
  const clusterLabels = ctx.clusters.map((c) => c.label);
  const keySignals = [
    ...ctx.cultural.signals.slice(0, 6),
    ...ctx.trend.detectedSignals.slice(0, 4),
  ];

  const headline = `${ctx.title} — ${ctx.trend.lifecycleStage} / ${ctx.trend.momentum}`;
  const summary = [
    `${ctx.title} (${ctx.category}) is in lifecycle stage “${ctx.trend.lifecycleStage}” with momentum “${ctx.trend.momentum}”.`,
    eras.length ? `Eras: ${eras.join(", ")}.` : null,
    platforms.length ? `Platforms: ${platforms.join(", ")}.` : null,
    clusterLabels.length ? `Clusters: ${clusterLabels.join(", ")}.` : null,
    ctx.importance.composite != null
      ? `Internal importance composite: ${ctx.importance.composite}.`
      : null,
    ctx.connected.length
      ? `Connected entries: ${ctx.connected
          .slice(0, 5)
          .map((c) => c.title)
          .join(", ")}.`
      : "Few connected entries in the intelligence graph.",
    ctx.opportunity
      ? `Opportunity tier: ${ctx.opportunity.tier} (${ctx.opportunity.score}).`
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const heuristic = aiHeuristicResult<AiCulturalSummary>(
    "heuristic-assistance",
    {
      slug: ctx.slug,
      headline,
      summary,
      eras,
      platforms,
      audiences,
      clusters: clusterLabels,
      keySignals: [...new Set(keySignals)],
    },
    [
      "Summary derived from CulturalIntelligence, TrendIntelligence, importance, clusters, and connections",
      "Not published automatically — curator may adapt for editorial use",
    ],
  );

  return preferAiOrHeuristic(ai, heuristic);
}

/**
 * Analyze relationships for an entry (connected graph + optional AI).
 */
export async function analyzeRelationships(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): Promise<AiSuggestionResult<AiRelationshipInsight[]>> {
  const ctx = buildAiEntryContext(entry, catalog, options);
  const provider = getAiAssistanceProvider();
  const ai = await provider.analyzeRelationships(ctx);

  const insights: AiRelationshipInsight[] = ctx.connected.map((c) => ({
    fromSlug: ctx.slug,
    toSlug: c.slug,
    strength: c.score,
    reasons: c.reasons,
    suggestion:
      c.score >= 50
        ? `Strong link — consider typed relationships if not already editorial`
        : `Moderate link — verify before adding relatedSlugs`,
  }));

  if (ctx.connected.length === 0) {
    insights.push({
      fromSlug: ctx.slug,
      toSlug: "",
      strength: 0,
      reasons: ["No connected entries in intelligence graph"],
      suggestion:
        "Thin graph — add curated relationships after research (do not auto-link)",
    });
  }

  const heuristic = aiHeuristicResult(
    "heuristic-assistance",
    insights,
    [
      "Relationship insights from getConnectedEntries / intelligence overlap",
      "Never auto-write relationships onto entries",
    ],
  );

  return preferAiOrHeuristic(ai, heuristic);
}

/**
 * Heuristic article quality review from public + intelligence fields.
 * AI provider may replace/augment when connected.
 */
export async function reviewArticleQuality(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): Promise<AiSuggestionResult<AiQualityReview>> {
  const ctx = buildAiEntryContext(entry, catalog, options);
  const provider = getAiAssistanceProvider();
  const ai = await provider.reviewQuality(ctx);

  const findings: AiQualityFinding[] = [];

  const sourceCount = entry.sources?.length ?? 0;
  if (sourceCount === 0) {
    findings.push({
      dimension: "sources",
      severity: "critical",
      message: "No sources — do not treat as publish-ready without citations",
    });
  } else if (sourceCount < 2) {
    findings.push({
      dimension: "sources",
      severity: "improve",
      message: "Only one source — consider adding a second authoritative citation",
    });
  } else {
    findings.push({
      dimension: "sources",
      severity: "info",
      message: `${sourceCount} sources present`,
    });
  }

  const mediaCount = entry.media?.length ?? 0;
  if (mediaCount === 0) {
    findings.push({
      dimension: "media",
      severity: "improve",
      message: "No media items — gradient fallback only (OK for slang/trends)",
    });
  }

  const outs =
    (entry.relatedSlugs?.length ?? 0) +
    Object.values(entry.relationships ?? {}).reduce(
      (n, arr) => n + (arr?.length ?? 0),
      0,
    );
  if (outs < 2) {
    findings.push({
      dimension: "relationships",
      severity: "improve",
      message: "Thin relationship graph — consider curated cultural links",
    });
  }

  if (!entry.description || entry.description.length < 40) {
    findings.push({
      dimension: "prose",
      severity: "improve",
      message: "Short description — expand with verified facts only",
    });
  }

  if (ctx.cultural.lifecycleSource === "inferred" && !entry.intelligence) {
    findings.push({
      dimension: "intelligence-metadata",
      severity: "info",
      message: "No explicit intelligence seed — registry/defaults in use",
    });
  }

  if (entry.trendDirection === "declining" && ctx.trend.lifecycleStage === "legacy") {
    findings.push({
      dimension: "freshness",
      severity: "info",
      message: "Legacy arc — maintain accuracy; avoid false “current” framing",
    });
  }

  const critical = findings.some((f) => f.severity === "critical");
  const improve = findings.some((f) => f.severity === "improve");
  const overall = critical ? "weak" : improve ? "improve" : "strong";

  const heuristic = aiHeuristicResult<AiQualityReview>(
    "heuristic-assistance",
    {
      slug: ctx.slug,
      overall,
      findings,
      summary: `Quality review for “${ctx.title}”: ${overall}. ${findings.length} finding(s). Suggestions only — humans decide edits.`,
    },
    ["Deterministic quality checks — not an LLM editorial judgment"],
  );

  return preferAiOrHeuristic(ai, heuristic);
}

/**
 * Trend analysis suggestion (heuristic from TrendIntelligence + optional AI).
 */
export async function analyzeTrendAssistance(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): Promise<AiSuggestionResult<AiTrendAnalysis>> {
  const ctx = buildAiEntryContext(entry, catalog, options);
  const provider = getAiAssistanceProvider();
  const ai = await provider.analyzeTrend(ctx);

  const heuristic = aiHeuristicResult<AiTrendAnalysis>(
    "heuristic-assistance",
    {
      slug: ctx.slug,
      suggestedLifecycle: ctx.trend.lifecycleStage,
      suggestedMomentum: ctx.trend.momentum,
      summary: `${ctx.title} appears ${ctx.trend.lifecycleStage} with ${ctx.trend.momentum} momentum (confidence ${ctx.trend.confidence}).`,
      signals: ctx.trend.detectedSignals,
      confidence: ctx.trend.confidence,
    },
    [
      "Derived from existing TrendIntelligence — does not modify trendDirection",
      "Human review required before any editorial status change",
    ],
  );

  return preferAiOrHeuristic(ai, heuristic);
}

/** Convenience: run weak-coverage + opportunities with an analytics report. */
export async function runAssistancePass(
  catalog: BaseEntry[],
  analyticsReport?: AnalyticsIntelligenceReport,
): Promise<{
  opportunities: AiSuggestionResult<AiContentSuggestion[]>;
  weakCoverage: AiSuggestionResult<AiContentSuggestion[]>;
}> {
  const options = { analyticsReport };
  const [opportunities, weakCoverage] = await Promise.all([
    suggestArticleOpportunities(catalog, options),
    identifyWeakCoverage(catalog, options),
  ]);
  return { opportunities, weakCoverage };
}
