/**
 * Soft prose-quality signals for encyclopedia writing.
 * Warnings only — never blocks publish, never mutates content.
 *
 * Standards: docs/EDITORIAL_STYLE_GUIDE.md
 */

import type { BaseEntry } from "@/types";
import type { ValidationIssue } from "@/lib/content/validation/types";

interface ProsePattern {
  id: string;
  re: RegExp;
  tip: string;
}

/**
 * Phrases that usually sound academic, corporate, or unearned-hype.
 * Matched against public prose fields only.
 */
export const WEAK_PROSE_PATTERNS: readonly ProsePattern[] = [
  {
    id: "shaped-discourse",
    re: /\bshaped the discourse\b/i,
    tip: "Say what people argued about, concretely",
  },
  {
    id: "defining-era",
    re: /\bdefining (cultural|economic|internet|digital)\b/i,
    tip: "Explain importance with evidence — avoid unearned “defining” claims",
  },
  {
    id: "absolute-superlative",
    re: /\bthe (biggest|most important|most significant|most iconic)\b/i,
    tip: "Avoid absolute superlatives unless a strong source supports them",
  },
  {
    id: "digital-age-filler",
    re: /\bin today'?s digital age\b|\bin the digital age\b|\bin today'?s internet\b/i,
    tip: "Cut filler — name the platform, year, or community instead",
  },
  {
    id: "important-to-note",
    re: /\bit is important to note\b|\bit'?s important to note\b|\bworth noting that\b/i,
    tip: "State the fact directly",
  },
  {
    id: "marketing-verbs",
    re: /\b(dive deep|unlock|discover more|explore the world of)\b/i,
    tip: "Avoid marketing verbs — write like an encyclopedia, not a landing page",
  },
  {
    id: "paradigm-shift",
    re: /\bparadigm shift\b|\bcultural zeitgeist\b|\bsocio-?cultural landscape\b/i,
    tip: "Prefer plain language: what changed for people online?",
  },
  {
    id: "went-viral-vague",
    re: /\bwent (massively )?viral\b(?![^.]*\b(youtube|tiktok|twitter|reddit|4chan|instagram)\b)/i,
    tip: "If you say it went viral, name the platform or moment when you can",
  },
  {
    id: "passive-padding",
    re: /\bcan be seen as\b|\bis considered to be\b|\bhas been regarded as\b/i,
    tip: "Use active voice: who did what?",
  },
  {
    id: "generic-phenomenon",
    re: /\ba popular internet phenomenon\b|\ban internet sensation\b|\ba viral sensation\b/i,
    tip: "Describe what it actually is — phenomenon language is interchangeable",
  },
  {
    id: "assumed-knowledge",
    re: /\bas we all know\b|\beveryone knows\b|\bneedless to say\b|\bit goes without saying\b/i,
    tip: "Explain the context — do not assume the reader already knows",
  },
  {
    id: "abstract-resonance",
    re: /\bresonated (with|across)\b|\bcultural conversation\b|\broader societal\b|\bunique blend of\b/i,
    tip: "Replace abstractions with a concrete example of what people did or said",
  },
  {
    id: "ai-throat-clearing",
    re: /\b(furthermore|moreover|in conclusion|delve into|tapestry of|plays a crucial role|serves as a testament)\b/i,
    tip: "Cut academic / generic AI filler — continue the story in plain language",
  },
] as const;

function collectProse(entry: BaseEntry): string {
  const any = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    origin?: string;
    impact?: string;
    summary?: string;
  };
  return [
    entry.description,
    entry.summary,
    any.meaning,
    any.definition,
    any.origin,
    any.impact,
  ]
    .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
    .join("\n");
}

export interface ProseQualityHit {
  patternId: string;
  tip: string;
  match: string;
}

/** Find weak-prose pattern hits in an entry’s public copy. */
export function findProseQualityHits(entry: BaseEntry): ProseQualityHit[] {
  const prose = collectProse(entry);
  if (!prose.trim()) return [];

  const hits: ProseQualityHit[] = [];
  for (const pattern of WEAK_PROSE_PATTERNS) {
    const m = pattern.re.exec(prose);
    if (!m) continue;
    hits.push({
      patternId: pattern.id,
      tip: pattern.tip,
      match: m[0],
    });
  }
  return hits;
}

/**
 * Soft validation warnings (max a few per entry so noise stays usable).
 */
export function validateProseQuality(entries: BaseEntry[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const maxPerEntry = 2;

  for (const entry of entries) {
    const hits = findProseQualityHits(entry).slice(0, maxPerEntry);
    for (const hit of hits) {
      issues.push({
        severity: "warning",
        code: "PROSE_STYLE",
        slug: entry.slug,
        id: entry.id,
        message: `Prose style (“${hit.match}”): ${hit.tip}`,
      });
    }
  }

  return issues;
}

/** True when enough weak-prose signals warrant an editorial flag. */
export function hasNotableProseIssues(entry: BaseEntry): {
  notable: boolean;
  summary: string | null;
} {
  const hits = findProseQualityHits(entry);
  if (hits.length === 0) return { notable: false, summary: null };
  // One absolute-superlative / defining-era / abstraction hit is enough; otherwise need 2+
  const strong = hits.some((h) =>
    [
      "absolute-superlative",
      "defining-era",
      "shaped-discourse",
      "abstract-resonance",
      "ai-throat-clearing",
    ].includes(h.patternId),
  );
  if (!strong && hits.length < 2) {
    return { notable: false, summary: null };
  }
  return {
    notable: true,
    summary: hits.map((h) => `"${h.match}" → ${h.tip}`).join("; "),
  };
}
