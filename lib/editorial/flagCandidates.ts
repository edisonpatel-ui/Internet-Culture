/**
 * Editorial review flags — candidates for human review only.
 * Never deletes, merges, or mutates content.
 */

import { checkTitleSimilarity } from "@/lib/content/validation/titleSimilarity";
import type { BaseEntry } from "@/types";

export type EditorialFlagCode =
  | "DUPLICATE_CONCEPT"
  | "WEAK_ARTICLE"
  | "LOW_CULTURAL_SIGNIFICANCE"
  | "OUTDATED_ENTRY"
  | "MERGE_OR_REMOVE_CANDIDATE";

export interface EditorialFlag {
  code: EditorialFlagCode;
  slug: string;
  id: string;
  title: string;
  category: string;
  message: string;
  relatedSlug?: string;
}

export interface EditorialAuditReport {
  generatedAt: string;
  entryCount: number;
  flags: EditorialFlag[];
  summary: Record<EditorialFlagCode, number>;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function entryYear(entry: BaseEntry): number | null {
  for (const value of [entry.historicalDate, entry.dateStarted, entry.addedAt]) {
    if (!value) continue;
    const m = /^(\d{4})/.exec(value);
    if (m) return Number(m[1]);
  }
  return null;
}

function isWeakArticle(entry: BaseEntry): string | null {
  const reasons: string[] = [];
  if (!entry.description?.trim() || wordCount(entry.description) < 8) {
    reasons.push("very short description");
  }
  if (!entry.sources || entry.sources.length === 0) {
    reasons.push("no sources");
  }
  const any = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    origin?: string;
    impact?: string;
  };
  const body = any.meaning ?? any.definition ?? any.origin ?? any.impact ?? "";
  if (body && wordCount(body) < 20) {
    reasons.push("thin primary body field");
  }
  // Missing tags alone is common and not enough to flag; stack with another issue
  if ((!entry.tags || entry.tags.length === 0) && reasons.length > 0) {
    reasons.push("no tags");
  }
  if (reasons.length === 0) return null;
  return reasons.join("; ");
}

function isLowSignificance(entry: BaseEntry): boolean {
  const { relevance, influence } = entry.scores;
  return influence < 40 && relevance < 45;
}

function isOutdated(entry: BaseEntry): boolean {
  const { relevance, influence } = entry.scores;
  const year = entryYear(entry);
  const old = year !== null && year <= 2018;
  return (
    entry.trendDirection === "declining" &&
    relevance < 50 &&
    (influence >= 55 || old)
  );
}

function isMergeOrRemoveCandidate(
  weak: boolean,
  lowSig: boolean,
  duplicate: boolean,
  entry: BaseEntry,
): boolean {
  let stack = 0;
  if (weak) stack += 1;
  if (lowSig) stack += 1;
  if (duplicate) stack += 1;
  if (!entry.sources?.length) stack += 1;
  if (entry.trendDirection === "declining" && entry.scores.relevance < 35) {
    stack += 1;
  }
  return stack >= 3;
}

/**
 * Analyze the catalog and return review flags only.
 */
export function flagEditorialCandidates(
  entries: BaseEntry[],
): EditorialAuditReport {
  const flags: EditorialFlag[] = [];
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const duplicateSlugs = new Set<string>();

  for (const issue of checkTitleSimilarity(entries)) {
    if (!issue.slug) continue;
    const entry = bySlug.get(issue.slug);
    if (!entry) continue;
    duplicateSlugs.add(entry.slug);
    // Pull partner slug from message when present: (other-slug)
    const partner = /\(([a-z0-9-]+)\)/.exec(issue.message);
    flags.push({
      code: "DUPLICATE_CONCEPT",
      slug: entry.slug,
      id: entry.id,
      title: entry.title,
      category: entry.category,
      relatedSlug: partner?.[1],
      message: issue.message,
    });
  }

  for (const entry of entries) {
    const weakReason = isWeakArticle(entry);
    const weak = weakReason !== null;
    const lowSig = isLowSignificance(entry);
    const outdated = isOutdated(entry);
    const dup = duplicateSlugs.has(entry.slug);

    if (weak && weakReason) {
      flags.push({
        code: "WEAK_ARTICLE",
        slug: entry.slug,
        id: entry.id,
        title: entry.title,
        category: entry.category,
        message: `Weak article signals: ${weakReason}`,
      });
    }

    if (lowSig) {
      flags.push({
        code: "LOW_CULTURAL_SIGNIFICANCE",
        slug: entry.slug,
        id: entry.id,
        title: entry.title,
        category: entry.category,
        message: `Low influence (${entry.scores.influence}) and relevance (${entry.scores.relevance}) — review whether it belongs in the catalog`,
      });
    }

    if (outdated) {
      flags.push({
        code: "OUTDATED_ENTRY",
        slug: entry.slug,
        id: entry.id,
        title: entry.title,
        category: entry.category,
        message: `Declining + low current relevance (${entry.scores.relevance}); consider archive tone or refresh`,
      });
    }

    if (isMergeOrRemoveCandidate(weak, lowSig, dup, entry)) {
      flags.push({
        code: "MERGE_OR_REMOVE_CANDIDATE",
        slug: entry.slug,
        id: entry.id,
        title: entry.title,
        category: entry.category,
        message:
          "Multiple quality concerns stacked — human should consider merge, rewrite, or removal",
      });
    }
  }

  const summary: Record<EditorialFlagCode, number> = {
    DUPLICATE_CONCEPT: 0,
    WEAK_ARTICLE: 0,
    LOW_CULTURAL_SIGNIFICANCE: 0,
    OUTDATED_ENTRY: 0,
    MERGE_OR_REMOVE_CANDIDATE: 0,
  };
  for (const f of flags) summary[f.code] += 1;

  return {
    generatedAt: new Date().toISOString(),
    entryCount: entries.length,
    flags,
    summary,
  };
}
