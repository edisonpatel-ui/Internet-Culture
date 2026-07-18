/**
 * Catalog quality audit — buckets entries for human editorial review.
 * Never deletes or mutates content files.
 */

import { flagEditorialCandidates } from "./flagCandidates";
import { getEditorialOverride } from "./registry";
import { measureRelationshipDepth } from "./relationshipDepth";
import type {
  EditorialStatus,
  QualityBucket,
  QualityEntryAssessment,
  SignificanceLevel,
} from "./types";
import type { BaseEntry } from "@/types";

export interface QualityAuditReport {
  generatedAt: string;
  entryCount: number;
  strong: QualityEntryAssessment[];
  improve: QualityEntryAssessment[];
  merge: QualityEntryAssessment[];
  questionable: QualityEntryAssessment[];
  summary: Record<QualityBucket, number>;
}

function computeSignificance(entry: BaseEntry): SignificanceLevel {
  const { influence, relevance } = entry.scores;
  if (influence >= 85) return "landmark";
  if (influence >= 60) return "notable";
  if (influence >= 40 || relevance >= 55) return "niche";
  return "questionable";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasAdequateBody(entry: BaseEntry): boolean {
  const any = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    origin?: string;
    impact?: string;
    notableMoments?: string[];
    highlights?: string[];
    usageExamples?: string[];
    examples?: string[];
  };
  const prose =
    any.meaning ?? any.definition ?? any.origin ?? any.impact ?? "";
  if (prose && wordCount(prose) >= 25) return true;
  if ((any.notableMoments?.length ?? 0) >= 2) return true;
  if ((any.highlights?.length ?? 0) >= 2) return true;
  if ((any.usageExamples?.length ?? 0) >= 2) return true;
  if ((any.examples?.length ?? 0) >= 2) return true;
  return false;
}

function assessEntry(
  entry: BaseEntry,
  flagCodes: Set<string>,
): QualityEntryAssessment {
  const override = getEditorialOverride(entry.slug);
  const depth = measureRelationshipDepth(entry);
  const reasons: string[] = [];

  let significance =
    override?.significanceLevel ?? computeSignificance(entry);

  const isDuplicate = flagCodes.has("DUPLICATE_CONCEPT");
  const isWeak = flagCodes.has("WEAK_ARTICLE");
  const isLowSig = flagCodes.has("LOW_CULTURAL_SIGNIFICANCE");
  const isOutdated = flagCodes.has("OUTDATED_ENTRY");
  const isMergeStack = flagCodes.has("MERGE_OR_REMOVE_CANDIDATE");

  if (isDuplicate) reasons.push("duplicate / overlapping concept");
  if (isWeak) reasons.push("weak sourcing or thin copy");
  if (isLowSig) reasons.push("low cultural significance scores");
  if (isOutdated) reasons.push("outdated relevance signals");
  if (depth.isShallow) reasons.push("no relationships or relatedSlugs");
  else if (depth.slugOnly)
    reasons.push("relatedSlugs only — no typed relationship edges");
  if (!entry.sources?.length) reasons.push("missing sources");
  if (wordCount(entry.description) < 10) reasons.push("thin description");
  if (!hasAdequateBody(entry)) reasons.push("thin category body fields");

  // Computed status (registry can override)
  let status: EditorialStatus = "strong";
  let bucket: QualityBucket = "strong";

  if (
    override?.editorialStatus === "merge-candidate" ||
    isMergeStack ||
    (isDuplicate && (isWeak || isLowSig))
  ) {
    status = "merge-candidate";
    bucket = "merge";
    if (!reasons.includes("duplicate / overlapping concept") && isDuplicate) {
      reasons.push("duplicate / overlapping concept");
    }
  } else if (
    significance === "questionable" ||
    isLowSig ||
    (isWeak && depth.isShallow)
  ) {
    status = "needs-review";
    bucket = "questionable";
    if (significance === "questionable") {
      reasons.push("significanceLevel=questionable");
    }
  } else if (
    isWeak ||
    isOutdated ||
    depth.isShallow ||
    depth.slugOnly ||
    override?.editorialStatus === "improve" ||
    override?.editorialStatus === "needs-review"
  ) {
    status = override?.editorialStatus === "needs-review"
      ? "needs-review"
      : "improve";
    bucket = "improve";
  } else {
    status = "strong";
    bucket = "strong";
    if (depth.priorityEdgeCount > 0) {
      reasons.push("typed cultural edges present");
    }
    if ((entry.sources?.length ?? 0) > 0) {
      reasons.push("has sources");
    }
  }

  // Apply full registry override for status/bucket when explicit
  let registryOverride = false;
  if (override?.editorialStatus) {
    registryOverride = true;
    status = override.editorialStatus;
    if (status === "merge-candidate") bucket = "merge";
    else if (status === "strong") bucket = "strong";
    else if (status === "needs-review" && bucket === "strong")
      bucket = "questionable";
    else if (status === "improve") bucket = "improve";
    if (override.notes) reasons.push(`registry: ${override.notes}`);
  }
  if (override?.significanceLevel) {
    registryOverride = true;
    significance = override.significanceLevel;
  }
  if (override?.mergeIntoSlug) {
    reasons.push(`suggested merge into ${override.mergeIntoSlug}`);
  }

  return {
    slug: entry.slug,
    id: entry.id,
    title: entry.title,
    category: entry.category,
    bucket,
    editorialStatus: status,
    significanceLevel: significance,
    reasons: reasons.length > 0 ? reasons : ["meets baseline quality signals"],
    registryOverride,
  };
}

/**
 * Full catalog quality pass — primary API for `npm run audit:quality`.
 */
export function runQualityAudit(entries: BaseEntry[]): QualityAuditReport {
  const flagReport = flagEditorialCandidates(entries);
  const flagsBySlug = new Map<string, Set<string>>();
  for (const flag of flagReport.flags) {
    const set = flagsBySlug.get(flag.slug) ?? new Set();
    set.add(flag.code);
    flagsBySlug.set(flag.slug, set);
  }

  const strong: QualityEntryAssessment[] = [];
  const improve: QualityEntryAssessment[] = [];
  const merge: QualityEntryAssessment[] = [];
  const questionable: QualityEntryAssessment[] = [];

  for (const entry of entries) {
    const assessment = assessEntry(
      entry,
      flagsBySlug.get(entry.slug) ?? new Set(),
    );
    switch (assessment.bucket) {
      case "strong":
        strong.push(assessment);
        break;
      case "improve":
        improve.push(assessment);
        break;
      case "merge":
        merge.push(assessment);
        break;
      case "questionable":
        questionable.push(assessment);
        break;
    }
  }

  const byTitle = (a: QualityEntryAssessment, b: QualityEntryAssessment) =>
    a.title.localeCompare(b.title);
  strong.sort(byTitle);
  improve.sort(byTitle);
  merge.sort(byTitle);
  questionable.sort(byTitle);

  return {
    generatedAt: new Date().toISOString(),
    entryCount: entries.length,
    strong,
    improve,
    merge,
    questionable,
    summary: {
      strong: strong.length,
      improve: improve.length,
      merge: merge.length,
      questionable: questionable.length,
    },
  };
}
