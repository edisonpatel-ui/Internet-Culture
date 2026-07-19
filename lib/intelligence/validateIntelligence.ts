/**
 * Soft validation for optional CulturalIntelligence fields.
 * Never fails the catalog — unknown values warn so vocab can evolve.
 */

import type { BaseEntry, TrendIntelligence } from "@/types";
import type { ValidationIssue } from "@/lib/content/validation/types";
import { LIFECYCLE_STAGES } from "./lifecycle";
import { INTELLIGENCE_REGISTRY } from "./registry";
import { TREND_INTELLIGENCE_REGISTRY } from "./trendRegistry";
import { TREND_SIGNAL_BY_ID, type TrendSignalId } from "./trendSignals";

const ERAS = new Set([
  "pre-internet",
  "early-web",
  "web-2",
  "social",
  "short-form",
  "gen-alpha",
  "unknown",
]);

const PLATFORMS = new Set([
  "youtube",
  "youtube-shorts",
  "tiktok",
  "instagram",
  "twitter",
  "reddit",
  "4chan",
  "tumblr",
  "twitch",
  "discord",
  "myspace",
  "newgrounds",
  "snapchat",
  "other",
  "unknown",
]);

const FORMATS = new Set([
  "image-macro",
  "reaction",
  "animated-meme",
  "video-meme",
  "catchphrase",
  "slang-term",
  "aesthetic",
  "platform-culture",
  "creator-persona",
  "event",
  "sound-meme",
  "copypasta",
  "other",
]);

const AUDIENCES = new Set([
  "gen-alpha",
  "gen-z",
  "millennial",
  "gen-x",
  "gaming",
  "mainstream",
  "niche",
  "cross-generational",
  "other",
]);

const LIFECYCLES = new Set<string>(LIFECYCLE_STAGES);

function asList<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function warnUnknown(
  issues: ValidationIssue[],
  slug: string,
  field: string,
  value: string,
) {
  issues.push({
    severity: "warning",
    code: "INTELLIGENCE_UNKNOWN_VALUE",
    message: `intelligence.${field} has unrecognized value "${value}"`,
    slug,
  });
}

function validateMeta(
  issues: ValidationIssue[],
  slug: string,
  meta: NonNullable<BaseEntry["intelligence"]>,
) {
  for (const era of asList(meta.era)) {
    if (!ERAS.has(era)) warnUnknown(issues, slug, "era", era);
  }
  for (const p of asList(meta.originPlatform)) {
    if (!PLATFORMS.has(p)) warnUnknown(issues, slug, "originPlatform", p);
  }
  for (const f of asList(meta.formatType)) {
    if (!FORMATS.has(f)) warnUnknown(issues, slug, "formatType", f);
  }
  for (const a of asList(meta.audience)) {
    if (!AUDIENCES.has(a)) warnUnknown(issues, slug, "audience", a);
  }
  if (meta.lifecycleStage && !LIFECYCLES.has(meta.lifecycleStage)) {
    warnUnknown(issues, slug, "lifecycleStage", meta.lifecycleStage);
  }
  if (meta.culturalCategory) {
    for (const c of meta.culturalCategory) {
      if (!c.trim()) {
        issues.push({
          severity: "warning",
          code: "INTELLIGENCE_EMPTY_CATEGORY",
          message: "intelligence.culturalCategory contains an empty string",
          slug,
        });
      }
    }
  }
  if (meta.signals) {
    for (const s of meta.signals) {
      if (!s.trim()) {
        issues.push({
          severity: "warning",
          code: "INTELLIGENCE_EMPTY_SIGNAL",
          message: "intelligence.signals contains an empty string",
          slug,
        });
      }
    }
  }
  if (meta.importance) {
    for (const [key, value] of Object.entries(meta.importance)) {
      if (value == null) continue;
      if (typeof value !== "number" || value < 0 || value > 100) {
        issues.push({
          severity: "warning",
          code: "INTELLIGENCE_IMPORTANCE_RANGE",
          message: `intelligence.importance.${key} must be 0–100 (got ${String(value)})`,
          slug,
        });
      }
    }
  }
}

const MOMENTUM = new Set([
  "accelerating",
  "stable",
  "cooling",
  "unknown",
]);

function validateTrendMeta(
  issues: ValidationIssue[],
  slug: string,
  meta: TrendIntelligence,
) {
  if (meta.lifecycleStage && !LIFECYCLES.has(meta.lifecycleStage)) {
    warnUnknown(issues, slug, "trendIntelligence.lifecycleStage", meta.lifecycleStage);
  }
  if (meta.momentum && !MOMENTUM.has(meta.momentum)) {
    warnUnknown(issues, slug, "trendIntelligence.momentum", meta.momentum);
  }
  if (meta.confidence != null) {
    if (
      typeof meta.confidence !== "number" ||
      meta.confidence < 0 ||
      meta.confidence > 100
    ) {
      issues.push({
        severity: "warning",
        code: "INTELLIGENCE_TREND_CONFIDENCE_RANGE",
        message: `trendIntelligence.confidence must be 0–100 (got ${String(meta.confidence)})`,
        slug,
      });
    }
  }
  if (meta.signalIds) {
    for (const id of meta.signalIds) {
      if (!TREND_SIGNAL_BY_ID[id as TrendSignalId]) {
        issues.push({
          severity: "warning",
          code: "INTELLIGENCE_UNKNOWN_SIGNAL_ID",
          message: `trendIntelligence.signalIds has unrecognized id "${id}"`,
          slug,
        });
      }
    }
  }
}

/**
 * Soft-check entry.intelligence, trendIntelligence, and registry seeds.
 */
export function validateIntelligenceMetadata(
  entries: BaseEntry[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const slugs = new Set(entries.map((e) => e.slug));

  for (const entry of entries) {
    if (entry.intelligence) {
      validateMeta(issues, entry.slug, entry.intelligence);
    }
    if (entry.trendIntelligence) {
      validateTrendMeta(issues, entry.slug, entry.trendIntelligence);
    }
  }

  for (const [slug, meta] of Object.entries(INTELLIGENCE_REGISTRY)) {
    if (!slugs.has(slug)) {
      issues.push({
        severity: "warning",
        code: "INTELLIGENCE_REGISTRY_ORPHAN",
        message: `Intelligence registry references missing slug "${slug}"`,
        slug,
      });
      continue;
    }
    validateMeta(issues, slug, meta);
  }

  for (const [slug, meta] of Object.entries(TREND_INTELLIGENCE_REGISTRY)) {
    if (!slugs.has(slug)) {
      issues.push({
        severity: "warning",
        code: "INTELLIGENCE_TREND_REGISTRY_ORPHAN",
        message: `Trend intelligence registry references missing slug "${slug}"`,
        slug,
      });
      continue;
    }
    validateTrendMeta(issues, slug, meta);
  }

  return issues;
}
