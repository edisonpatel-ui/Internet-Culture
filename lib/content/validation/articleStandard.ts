/**
 * Soft validation against the canonical article specification.
 * Does not invent content — only flags missing/weak required structure.
 */

import type { BaseEntry } from "@/types";
import type { ValidationIssue } from "./types";
import {
  DESCRIPTION_MIN_CHARS,
  FEATURED_MEDIA_EXPECTED,
  ORIGIN_MIN_CHARS,
  OVERVIEW_MIN_CHARS,
  RELATED_SLUGS_MIN,
} from "@/lib/content/standards/articleSpec";

function asAny(entry: BaseEntry): BaseEntry & Record<string, unknown> {
  return entry as BaseEntry & Record<string, unknown>;
}

function strField(entry: BaseEntry, keys: string[]): string {
  const e = asAny(entry);
  for (const key of keys) {
    const v = e[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function arrayLen(entry: BaseEntry, keys: string[]): number {
  const e = asAny(entry);
  for (const key of keys) {
    const v = e[key];
    if (Array.isArray(v)) return v.length;
  }
  return 0;
}

function overviewText(entry: BaseEntry): string {
  return strField(entry, [
    "meaning",
    "definition",
    "impact",
    "summary",
    "description",
  ]);
}

function historyText(entry: BaseEntry): string {
  const origin = strField(entry, ["origin"]);
  if (origin) return origin;
  const moments = asAny(entry).notableMoments;
  if (Array.isArray(moments) && moments.length > 0) {
    return moments.filter((m) => typeof m === "string").join(" ");
  }
  return "";
}

/**
 * Check structural completeness against ARTICLE_SECTIONS (soft warnings).
 */
export function validateArticleStandard(
  entries: BaseEntry[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  let reported = 0;
  const maxReport = 100;

  function push(entry: BaseEntry, code: string, message: string) {
    if (reported >= maxReport) return;
    reported += 1;
    issues.push({
      severity: "warning",
      code,
      slug: entry.slug,
      id: entry.id,
      message,
    });
  }

  for (const entry of entries) {
    // Identity / SEO base
    const desc = (entry.description || "").trim();
    if (!desc) {
      push(entry, "ARTICLE_STANDARD", "Missing description (Identity / SEO)");
    } else if (desc.length < DESCRIPTION_MIN_CHARS) {
      push(
        entry,
        "ARTICLE_STANDARD",
        `Weak description (${desc.length} chars — recommend ≥ ${DESCRIPTION_MIN_CHARS})`,
      );
    }

    // Quick Overview
    const overview = overviewText(entry);
    if (!overview) {
      push(entry, "ARTICLE_STANDARD", "Missing Quick Overview prose");
    } else if (overview.length < OVERVIEW_MIN_CHARS) {
      push(
        entry,
        "ARTICLE_STANDARD",
        `Weak Quick Overview (${overview.length} chars — recommend ≥ ${OVERVIEW_MIN_CHARS})`,
      );
    }

    // History (recommended for most categories)
    if (entry.category !== "creator") {
      const history = historyText(entry);
      if (!history) {
        push(entry, "ARTICLE_STANDARD", "Missing History / origin prose");
      } else if (history.length < ORIGIN_MIN_CHARS) {
        push(
          entry,
          "ARTICLE_STANDARD",
          `Thin History / origin (${history.length} chars — recommend ≥ ${ORIGIN_MIN_CHARS})`,
        );
      }
    } else if (
      arrayLen(entry, ["notableMoments"]) === 0 &&
      !strField(entry, ["origin"])
    ) {
      push(
        entry,
        "ARTICLE_STANDARD",
        "Creator missing History (notableMoments or origin)",
      );
    }

    // Examples — recommended for meme/slang
    if (entry.category === "meme" || entry.category === "slang") {
      const examples = arrayLen(entry, ["examples", "usageExamples"]);
      if (examples === 0) {
        push(entry, "ARTICLE_STANDARD", "Missing Examples section");
      }
    }

    // Spread
    const related = entry.relatedSlugs?.length ?? 0;
    if (related < RELATED_SLUGS_MIN) {
      push(
        entry,
        "ARTICLE_STANDARD",
        `Spread & Ecosystem thin — ${related} relatedSlug(s) (recommend ≥ ${RELATED_SLUGS_MIN})`,
      );
    }

    // Media hero expectation
    if (FEATURED_MEDIA_EXPECTED.has(entry.category)) {
      const media = entry.media ?? [];
      const featured = media.some(
        (m) =>
          m.role === "featured" && (m.type === "image" || m.type === "gif"),
      );
      if (!featured) {
        push(
          entry,
          "ARTICLE_STANDARD",
          "Missing featured hero media (image/gif) — use a reliable source or leave intentionally empty with editorial note",
        );
      }
    }

    // Metadata
    if (!entry.scores) {
      push(entry, "ARTICLE_STANDARD", "Missing scores metadata");
    }
    if (!entry.addedAt?.trim()) {
      push(entry, "ARTICLE_STANDARD", "Missing addedAt metadata");
    }
    if (!entry.trendDirection) {
      push(entry, "ARTICLE_STANDARD", "Missing trendDirection metadata");
    }

    // Duplicate prose between description and overview
    if (desc && overview && desc === overview && entry.category !== "creator") {
      push(
        entry,
        "ARTICLE_STANDARD",
        "Description and Quick Overview are identical — differentiate card blurb from definition",
      );
    }
  }

  if (reported >= maxReport) {
    issues.push({
      severity: "warning",
      code: "ARTICLE_STANDARD",
      message: `Additional article-standard warnings omitted (cap ${maxReport})`,
    });
  }

  return issues;
}
