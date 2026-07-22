/**
 * Compatibility adapter: ResearchReport → ResearchPackage.
 *
 * ResearchReport remains the internal engine/report object.
 * ResearchPackage is the canonical stage artifact after completeness passes.
 */

import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import type { AIDraftCategory } from "../types";
import type {
  ResearchPackage,
  ResearchSourceRef,
} from "./researchPackage";
import { runCompletenessPipeline } from "../research/completenessPipeline";

const CATEGORIES: AIDraftCategory[] = [
  "meme",
  "slang",
  "trend",
  "brainrot",
  "event",
  "creator",
];

export interface ResearchReportToPackageOptions {
  /** Optional session for tags, sources, and topic override. */
  session?: Pick<
    ResearchSession,
    "id" | "topic" | "tags" | "sources" | "notes"
  >;
  /** Override generated package id. */
  packageId?: string;
  /** Skip completeness pipeline (tests only). */
  skipCompleteness?: boolean;
}

function slugifyTitle(topic: string): string {
  return (
    topic
      .toLowerCase()
      .replace(/\s*—\s*.*$/, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled"
  );
}

/** Infer category from session tags / report entity buckets. */
export function suggestCategoryFromReport(
  report: ResearchReport,
  session?: ResearchReportToPackageOptions["session"],
): AIDraftCategory {
  if (session) {
    for (const tag of session.tags) {
      const t = tag.toLowerCase();
      if (CATEGORIES.includes(t as AIDraftCategory)) {
        return t as AIDraftCategory;
      }
    }
    if (session.tags.some((t) => /event|202[0-9]/i.test(t))) return "event";
    if (session.tags.some((t) => /brainrot/i.test(t))) return "brainrot";
    if (session.tags.some((t) => /trend|aesthetic/i.test(t))) return "trend";
    if (session.tags.some((t) => /creator|streamer|youtuber/i.test(t))) {
      return "creator";
    }
  }
  if (report.slang.length > 0 && report.memes.length === 0) return "slang";
  if (report.memes.length > 0) return "meme";
  if (report.people.length > 0 && report.memes.length === 0) return "creator";
  return "meme";
}

function buildCategoryReasoning(
  category: AIDraftCategory,
  report: ResearchReport,
  session?: ResearchReportToPackageOptions["session"],
): string {
  const tagHit = session?.tags.find((t) =>
    CATEGORIES.includes(t.toLowerCase() as AIDraftCategory),
  );
  if (tagHit) {
    return `Best-fit category "${category}" from session tag "${tagHit}" and supporting research signals.`;
  }
  if (category === "slang" && report.slang.length > 0) {
    return "Best-fit category \"slang\": entity graph is slang-heavy with little reusable visual-format signal.";
  }
  if (category === "meme" && report.memes.length > 0) {
    return "Best-fit category \"meme\": report includes meme-format entities and remix signals.";
  }
  if (category === "creator") {
    return "Best-fit category \"creator\": named people dominate the entity graph over format templates.";
  }
  return `Best-fit category "${category}" from available research signals for a complete first draft.`;
}

function extractAliases(report: ResearchReport, title: string): string[] {
  const aliases = new Set<string>([title, title.toLowerCase()]);
  for (const m of report.memes) {
    if (m.name) aliases.add(m.name);
  }
  for (const s of report.slang) {
    if (s.name) aliases.add(s.name);
  }
  return [...aliases];
}

/**
 * Adapt an engine ResearchReport into a completeness-ready ResearchPackage.
 */
export function researchReportToPackage(
  report: ResearchReport,
  options: ResearchReportToPackageOptions = {},
): ResearchPackage {
  const session = options.session;
  const topic = session?.topic ?? report.topic;
  const title =
    topic.replace(/\s*—\s*.*$/, "").trim() || topic || report.topic;
  const categoryRecommendation = suggestCategoryFromReport(report, session);
  const categoryReasoning = buildCategoryReasoning(
    categoryRecommendation,
    report,
    session,
  );

  const primaryFromEvidence: ResearchSourceRef[] = report.evidenceMatrix
    .flatMap((g) => g.evidence)
    .filter((e) => e.tier === "High" || e.sourceCategory === "know_your_meme")
    .slice(0, 8)
    .map((e, i) => ({
      id: e.id ?? `ev_${i}`,
      title: e.sourceTitle,
      url: e.sourceUrl,
      tier: "primary" as const,
      notes: e.notes,
    }));

  const sessionSecondary: ResearchSourceRef[] = (session?.sources ?? [])
    .filter((s) => !primaryFromEvidence.some((p) => p.title === s.title))
    .map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url,
      tier: "secondary" as const,
      notes: s.notes,
    }));

  const primarySources: ResearchSourceRef[] =
    primaryFromEvidence.length > 0
      ? primaryFromEvidence
      : (session?.sources ?? []).slice(0, 3).map((s) => ({
          id: s.id,
          title: s.title,
          url: s.url,
          tier: "primary" as const,
          notes: s.notes,
        }));

  const secondarySources = sessionSecondary.filter(
    (s) => !primarySources.some((p) => p.title === s.title),
  );
  const sources = [...primarySources, ...secondarySources];

  const timeline = report.timeline.map((t) => ({
    when: t.date,
    what: t.description,
    confidence: t.confidence,
  }));

  const relatedEntries = [
    ...report.relatedEntries.map((r) => ({
      title: r.title,
      slug: r.slug,
      reason: r.reason,
    })),
    ...report.relationships.map((r) => ({
      title: r.toName,
      slug: r.toSlug,
      reason: r.reason,
    })),
  ].filter(
    (entry, index, arr) =>
      arr.findIndex((e) => e.title === entry.title) === index,
  );

  const mediaSuggestions = report.futureMediaSuggestions.map((m) => ({
    id: m.id,
    role: m.role,
    title: m.title,
    searchHint: m.searchHint,
    verified: false as const,
  }));

  const confScores = report.confidenceLevels
    .map((c) => c.score)
    .filter((n): n is number => typeof n === "number");
  const confidence =
    confScores.length > 0
      ? confScores.reduce((a, b) => a + b, 0) / confScores.length
      : 0.55;

  const packageId =
    options.packageId ??
    `rp_${slugifyTitle(title)}_${(session?.id ?? report.id).replace(/\W+/g, "_")}`;

  const draftPackage: ResearchPackage = {
    id: packageId,
    title,
    topic,
    categoryRecommendation,
    categoryReasoning,
    slugSuggestion: slugifyTitle(title),
    summary: report.executiveSummary || report.topicOverview,
    origin: report.historicalContext.slice(0, 800),
    timeline,
    culturalImpact: report.topicOverview,
    relatedEntries,
    sources,
    mediaSuggestions,
    possibleIssues: [],
    platforms: report.platforms.map((p) => p.name),
    notableMoments: report.importantEvents.map((e) => e.description),
    aliases: extractAliases(report, title),
    confidence,
    conflictingInformation: report.conflictingClaims.map((c) => c.summary),
    missingInformation: [],
    researchNotes: [
      ...report.researchNotes,
      ...(session?.notes?.trim()
        ? [`Session notes: ${session.notes.trim()}`]
        : []),
    ],
    notThis: [
      `Not an unfinished research stub — ${title} is prepared as a complete encyclopedia subject.`,
    ],
  };

  if (options.skipCompleteness) {
    return draftPackage;
  }

  return runCompletenessPipeline(draftPackage);
}
