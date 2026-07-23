/**
 * Soft checks for placeholder / unfinished / AI-instruction text in public prose.
 * Warnings only — never mutates content.
 */

import type { BaseEntry } from "@/types";
import type { ValidationIssue } from "./types";

const PLACEHOLDER_PATTERNS: Array<{ id: string; re: RegExp; tip: string }> = [
  {
    id: "lorem",
    re: /\blorem ipsum\b/i,
    tip: "Remove Lorem Ipsum — replace with real encyclopedia prose",
  },
  {
    id: "todo",
    re: /\bTODO\b|\bFIXME\b|\bNEEDS RESEARCH\b/i,
    tip: "Remove TODO/FIXME markers from published prose",
  },
  {
    id: "coming-soon",
    re: /\bcoming soon\b|\bnot active yet\b|\bplaceholder\b/i,
    tip: "Remove placeholder / coming-soon language from public copy",
  },
  {
    id: "ai-instruction",
    re: /\b(use merriam[- ]webster|editor (guidance|instruction|request|override)|research (package|stages?)|knowledge engine|write an article about|as an ai)\b/i,
    tip: "Looks like an editor/AI instruction — replace with encyclopedia prose",
  },
  {
    id: "scaffold",
    re: /\b(to be researched|scaffolding only|pending verification|under editorial research)\b/i,
    tip: "Scaffold / pending language should not ship in published entries",
  },
];

function collectPublicProse(entry: BaseEntry): string {
  const any = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    origin?: string;
    impact?: string;
    examples?: string[];
    usageExamples?: string[];
    notableMoments?: string[];
    highlights?: string[];
  };
  return [
    entry.description,
    entry.summary,
    any.meaning,
    any.definition,
    any.origin,
    any.impact,
    ...(any.examples ?? []),
    ...(any.usageExamples ?? []),
    ...(any.notableMoments ?? []),
    ...(any.highlights ?? []),
  ]
    .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
    .join("\n");
}

export function validatePlaceholderText(
  entries: BaseEntry[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const entry of entries) {
    const prose = collectPublicProse(entry);
    if (!prose.trim()) continue;

    let hits = 0;
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (hits >= 2) break;
      const m = pattern.re.exec(prose);
      if (!m) continue;
      hits += 1;
      issues.push({
        severity: "warning",
        code: "PLACEHOLDER_TEXT",
        slug: entry.slug,
        id: entry.id,
        message: `Placeholder / unfinished text (“${m[0]}”): ${pattern.tip}`,
      });
    }
  }

  return issues;
}
