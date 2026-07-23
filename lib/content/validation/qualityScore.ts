/**
 * Per-article and catalog quality scores for the content system report.
 * Soft metrics only — never fails the validation gate.
 */

import type { BaseEntry } from "@/types";
import { scoreReferences } from "./referenceQuality";
import { scoreRelated } from "./relatedQuality";
import { scoreSeo } from "./seoQuality";
import { validateEntryMedia } from "@/lib/content/validateMedia";
import { findProseQualityHits } from "@/lib/editorial/proseQuality";
import {
  DESCRIPTION_MIN_CHARS,
  FEATURED_MEDIA_EXPECTED,
  MEDIA_OPTIONAL,
  ORIGIN_MIN_CHARS,
  OVERVIEW_MIN_CHARS,
} from "@/lib/content/standards/articleSpec";

export interface DimensionScores {
  article: number;
  media: number;
  references: number;
  seo: number;
  metadata: number;
  internalLinking: number;
  overall: number;
}

export interface EntryQualityReport {
  slug: string;
  category: string;
  scores: DimensionScores;
}

export interface CatalogQualityReport {
  generatedAt: string;
  entryCount: number;
  averages: DimensionScores;
  lowest: EntryQualityReport[];
  distribution: {
    excellent: number; // ≥90
    good: number; // 75–89
    fair: number; // 60–74
    weak: number; // <60
  };
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function overviewLen(entry: BaseEntry): number {
  const any = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    impact?: string;
  };
  const text =
    any.meaning || any.definition || any.impact || entry.summary || "";
  return text.trim().length;
}

function originLen(entry: BaseEntry): number {
  return (entry.origin || "").trim().length;
}

function scoreArticleBody(entry: BaseEntry): number {
  let score = 100;
  const desc = (entry.description || "").trim();
  if (desc.length < DESCRIPTION_MIN_CHARS) score -= 20;
  if (overviewLen(entry) < OVERVIEW_MIN_CHARS) score -= 20;
  if (entry.category !== "creator" && originLen(entry) < ORIGIN_MIN_CHARS) {
    score -= 15;
  }
  const proseHits = findProseQualityHits(entry).length;
  score -= Math.min(25, proseHits * 8);

  const any = entry as BaseEntry & {
    examples?: string[];
    usageExamples?: string[];
  };
  if (
    (entry.category === "meme" || entry.category === "slang") &&
    !(any.examples?.length || any.usageExamples?.length)
  ) {
    score -= 15;
  }

  return clamp(score);
}

function scoreMedia(entry: BaseEntry): number {
  if (MEDIA_OPTIONAL.has(entry.category) && !(entry.media?.length)) {
    return 100; // gradient OK
  }
  const warnings = validateEntryMedia(entry);
  let score = 100;
  score -= Math.min(70, warnings.length * 8);

  if (FEATURED_MEDIA_EXPECTED.has(entry.category)) {
    const featured = (entry.media ?? []).some(
      (m) =>
        m.role === "featured" && (m.type === "image" || m.type === "gif"),
    );
    if (!featured) score -= 25;
  }

  return clamp(score);
}

function scoreMetadata(entry: BaseEntry): number {
  let score = 100;
  if (!entry.scores) score -= 40;
  if (!entry.addedAt) score -= 20;
  if (!entry.trendDirection) score -= 20;
  if (!entry.tags?.length) score -= 10;
  if (!entry.lastUpdated) score -= 5;
  return clamp(score);
}

export function scoreEntry(
  entry: BaseEntry,
  bySlug: Map<string, BaseEntry>,
): EntryQualityReport {
  const article = scoreArticleBody(entry);
  const media = scoreMedia(entry);
  const references = scoreReferences(entry).score;
  const seo = scoreSeo(entry).score;
  const metadata = scoreMetadata(entry);
  const internalLinking = scoreRelated(entry, bySlug).score;

  const overall = clamp(
    article * 0.25 +
      media * 0.15 +
      references * 0.2 +
      seo * 0.15 +
      metadata * 0.1 +
      internalLinking * 0.15,
  );

  return {
    slug: entry.slug,
    category: entry.category,
    scores: {
      article,
      media,
      references,
      seo,
      metadata,
      internalLinking,
      overall,
    },
  };
}

export function buildCatalogQualityReport(
  entries: BaseEntry[],
): CatalogQualityReport {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const reports = entries.map((e) => scoreEntry(e, bySlug));

  const sum: DimensionScores = {
    article: 0,
    media: 0,
    references: 0,
    seo: 0,
    metadata: 0,
    internalLinking: 0,
    overall: 0,
  };

  const distribution = { excellent: 0, good: 0, fair: 0, weak: 0 };

  for (const r of reports) {
    sum.article += r.scores.article;
    sum.media += r.scores.media;
    sum.references += r.scores.references;
    sum.seo += r.scores.seo;
    sum.metadata += r.scores.metadata;
    sum.internalLinking += r.scores.internalLinking;
    sum.overall += r.scores.overall;

    if (r.scores.overall >= 90) distribution.excellent += 1;
    else if (r.scores.overall >= 75) distribution.good += 1;
    else if (r.scores.overall >= 60) distribution.fair += 1;
    else distribution.weak += 1;
  }

  const n = Math.max(1, reports.length);
  const averages: DimensionScores = {
    article: clamp(sum.article / n),
    media: clamp(sum.media / n),
    references: clamp(sum.references / n),
    seo: clamp(sum.seo / n),
    metadata: clamp(sum.metadata / n),
    internalLinking: clamp(sum.internalLinking / n),
    overall: clamp(sum.overall / n),
  };

  const lowest = [...reports]
    .sort((a, b) => a.scores.overall - b.scores.overall)
    .slice(0, 10);

  return {
    generatedAt: new Date().toISOString(),
    entryCount: entries.length,
    averages,
    lowest,
    distribution,
  };
}

export function formatQualityReport(report: CatalogQualityReport): string {
  const a = report.averages;
  const lines = [
    "Catalog Quality Score (averages)",
    "--------------------------------",
    `Article Quality     ${a.article}/100`,
    `Media               ${a.media}/100`,
    `References          ${a.references}/100`,
    `SEO                 ${a.seo}/100`,
    `Metadata            ${a.metadata}/100`,
    `Internal Linking    ${a.internalLinking}/100`,
    `Overall             ${a.overall}/100`,
    "",
    `Entries: ${report.entryCount}  |  excellent≥90: ${report.distribution.excellent}  good: ${report.distribution.good}  fair: ${report.distribution.fair}  weak: ${report.distribution.weak}`,
  ];

  if (report.lowest.length > 0) {
    lines.push("", "Lowest overall (review before expansion):");
    for (const e of report.lowest.slice(0, 8)) {
      lines.push(
        `  ${e.scores.overall}/100  ${e.slug} (${e.category}) — art:${e.scores.article} media:${e.scores.media} refs:${e.scores.references} link:${e.scores.internalLinking}`,
      );
    }
  }

  return lines.join("\n");
}
