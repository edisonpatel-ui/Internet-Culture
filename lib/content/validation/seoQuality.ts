/**
 * Soft SEO readiness checks.
 *
 * Canonicals, Open Graph, Twitter Cards, JSON-LD, and breadcrumbs are
 * generated at render time from entry fields via lib/seo helpers.
 * This module verifies that entry data is sufficient for those helpers
 * to produce complete metadata — it does not crawl live HTML.
 */

import type { BaseEntry } from "@/types";
import {
  buildEntrySeoDescription,
  buildEntrySeoTitle,
  createEntryMetadata,
} from "@/lib/seo";
import { getDetailHref } from "@/lib/utils";
import { getEntryPreviewImageUrl } from "@/lib/media/mediaUtils";
import type { ValidationIssue } from "./types";
import { FEATURED_MEDIA_EXPECTED } from "@/lib/content/standards/articleSpec";

export interface SeoScore {
  score: number;
  issues: string[];
}

export function scoreSeo(entry: BaseEntry): SeoScore {
  const issues: string[] = [];
  let score = 100;

  const seoTitle = buildEntrySeoTitle(entry).trim();
  const seoDesc = buildEntrySeoDescription(entry).trim();
  const path = getDetailHref(entry.category, entry.slug);
  const meta = createEntryMetadata(entry);
  const ogImage = getEntryPreviewImageUrl(entry);

  if (!seoTitle) {
    issues.push("Missing SEO title");
    score -= 25;
  } else if (seoTitle.length > 70) {
    issues.push(`SEO title long (${seoTitle.length} chars) — may truncate in SERPs`);
    score -= 5;
  }

  if (!seoDesc) {
    issues.push("Missing meta description");
    score -= 25;
  } else if (seoDesc.length < 70) {
    issues.push(`Meta description short (${seoDesc.length} chars)`);
    score -= 10;
  } else if (seoDesc.length > 165) {
    issues.push(`Meta description long (${seoDesc.length} chars) — may truncate`);
    score -= 5;
  }

  if (!path || !path.startsWith("/")) {
    issues.push("Missing canonical path");
    score -= 20;
  }

  if (!meta.openGraph) {
    issues.push("Open Graph metadata incomplete");
    score -= 15;
  }
  if (!meta.twitter) {
    issues.push("Twitter Card metadata incomplete");
    score -= 10;
  }
  if (!meta.alternates?.canonical) {
    issues.push("Canonical URL missing from metadata helper");
    score -= 15;
  }

  // Image metadata for OG — warn when category expects a visual
  if (FEATURED_MEDIA_EXPECTED.has(entry.category) && !ogImage) {
    issues.push(
      "No preview image for Open Graph — cards will use site default OG art",
    );
    score -= 10;
  }

  // Tags help keyword generation
  if (!entry.tags?.length) {
    issues.push("No tags — SEO keywords will be thin");
    score -= 5;
  }

  score = Math.max(0, Math.min(100, score));
  return { score, issues };
}

export function validateSeoQuality(entries: BaseEntry[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  let reported = 0;
  const maxReport = 50;

  for (const entry of entries) {
    const result = scoreSeo(entry);
    for (const msg of result.issues) {
      if (reported >= maxReport) break;
      // Skip ultra-common "No tags" / default OG to reduce noise — still score them
      if (msg.startsWith("No tags")) continue;
      if (msg.includes("site default OG")) {
        if (reported > 15) continue;
      }
      reported += 1;
      issues.push({
        severity: "warning",
        code: "SEO_QUALITY",
        slug: entry.slug,
        id: entry.id,
        message: msg,
      });
    }
  }

  return issues;
}
