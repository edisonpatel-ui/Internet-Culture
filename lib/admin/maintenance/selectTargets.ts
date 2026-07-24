/**
 * Resolve which catalog entries a Maintenance Center refresh should touch.
 */

import type { BaseEntry, ContentCategory } from "@/types";
import type {
  MaintenanceCategoryFilter,
  MaintenanceRefreshRequest,
} from "./types";

const CATEGORY_ALIASES: Record<string, MaintenanceCategoryFilter> = {
  meme: "meme",
  memes: "meme",
  slang: "slang",
  event: "event",
  events: "event",
  creator: "creator",
  creators: "creator",
  people: "creator",
  person: "creator",
  trend: "trend",
  trends: "trend",
  brainrot: "brainrot",
};

export interface ResolvedTargets {
  entries: BaseEntry[];
  scopeLabel: string;
  promptInterpretation?: string;
}

function daysSince(isoDate: string | undefined, now: Date): number | null {
  if (!isoDate) return null;
  const t = Date.parse(isoDate);
  if (!Number.isFinite(t)) return null;
  return Math.floor((now.getTime() - t) / (1000 * 60 * 60 * 24));
}

function matchesTopicKeywords(entry: BaseEntry, keywords: string[]): boolean {
  const blob = [
    entry.title,
    entry.slug,
    entry.description,
    ...(entry.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return keywords.every((k) => blob.includes(k));
}

/**
 * Parse free-text maintenance prompts into a catalog slice.
 */
export function resolveMaintenanceTargets(
  catalog: BaseEntry[],
  request: MaintenanceRefreshRequest,
): ResolvedTargets {
  if (request.kind === "entire") {
    return {
      entries: [...catalog],
      scopeLabel: "Entire encyclopedia",
    };
  }

  if (request.kind === "category" && request.category) {
    const cat = request.category;
    const entries = catalog.filter((e) => e.category === cat);
    const label =
      cat === "creator"
        ? "People (creators)"
        : cat.charAt(0).toUpperCase() + cat.slice(1) + "s";
    return {
      entries,
      scopeLabel: `Category: ${label}`,
    };
  }

  if (request.kind === "selected") {
    const set = new Set((request.slugs ?? []).map((s) => s.trim()).filter(Boolean));
    const entries = catalog.filter((e) => set.has(e.slug));
    return {
      entries,
      scopeLabel: `Selected articles (${entries.length})`,
    };
  }

  // Prompt mode
  const prompt = (request.prompt ?? "").trim();
  return resolveFromPrompt(catalog, prompt);
}

function resolveFromPrompt(catalog: BaseEntry[], prompt: string): ResolvedTargets {
  const lower = prompt.toLowerCase();
  const now = new Date();

  if (!prompt) {
    return {
      entries: [],
      scopeLabel: "Prompt (empty)",
      promptInterpretation: "No prompt provided — zero targets.",
    };
  }

  // Stale lastReviewed
  const staleMatch = lower.match(
    /(?:over|more than|>\s*)(\d+)\s*days?\s*ago|reviewed\s+(?:over|more than)\s+(\d+)/,
  );
  if (
    /reviewed|stale|outdated metadata|last reviewed/.test(lower) &&
    (staleMatch || /90\s*days|never reviewed|missing last.?reviewed/.test(lower))
  ) {
    const days = Number(staleMatch?.[1] ?? staleMatch?.[2] ?? 90);
    const entries = catalog.filter((e) => {
      const reviewed =
        e.dynamicMetadata?.lastReviewed ?? e.lastUpdated ?? undefined;
      const age = daysSince(reviewed, now);
      if (age == null) return true; // never reviewed → include
      return age >= days;
    });
    return {
      entries,
      scopeLabel: `Stale dynamic metadata (≥${days} days or never reviewed)`,
      promptInterpretation: `Matched ${entries.length} entries with lastReviewed/lastUpdated older than ${days} days (or missing).`,
    };
  }

  // Category from prompt
  for (const [alias, cat] of Object.entries(CATEGORY_ALIASES)) {
    const re = new RegExp(
      `\\b(every|all|each)\\s+${alias}\\b|\\b${alias}\\b.*\\b(refresh|update)\\b|\\b(refresh|update)\\b.*\\b${alias}\\b`,
      "i",
    );
    if (re.test(prompt)) {
      const entries = catalog.filter((e) => e.category === cat);
      return {
        entries,
        scopeLabel: `Prompt → category ${cat}`,
        promptInterpretation: `Interpreted as refresh category "${cat}" (${entries.length} entries).`,
      };
    }
  }

  // Topic keywords (AI-related, etc.)
  if (/\bai[- ]?related\b|\babout\s+ai\b|\bartificial intelligence\b/.test(lower)) {
    const keywords = ["ai"];
    const entries = catalog.filter((e) =>
      matchesTopicKeywords(e, keywords) ||
      (e.tags ?? []).some((t) => /ai|artificial|llm|chatgpt|midjourney/i.test(t)),
    );
    return {
      entries,
      scopeLabel: "Prompt → AI-related articles",
      promptInterpretation: `Matched title/tags containing AI cues (${entries.length} entries).`,
    };
  }

  // Relevance-only wording still targets all (scores are dynamic fields)
  if (/relevance|trending score|dynamic metadata|all scores/.test(lower)) {
    if (/all|every|entire|everything/.test(lower)) {
      return {
        entries: [...catalog],
        scopeLabel: "Prompt → entire encyclopedia (dynamic scores)",
        promptInterpretation:
          "Interpreted as refresh dynamic scores for the full catalog.",
      };
    }
  }

  if (/entire|everything|whole encyclopedia|all articles/.test(lower)) {
    return {
      entries: [...catalog],
      scopeLabel: "Prompt → entire encyclopedia",
      promptInterpretation: "Interpreted as full-catalog dynamic refresh.",
    };
  }

  // Fallback: treat remaining words as tag/title search tokens
  const tokens = lower
    .replace(/refresh|update|articles?|scores?|the|and|for|all|every/g, " ")
    .split(/[^a-z0-9]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
  if (tokens.length > 0) {
    const entries = catalog.filter((e) => matchesTopicKeywords(e, tokens));
    return {
      entries,
      scopeLabel: `Prompt → keyword match (${tokens.join(", ")})`,
      promptInterpretation: `Matched entries containing: ${tokens.join(", ")} (${entries.length}).`,
    };
  }

  return {
    entries: [],
    scopeLabel: "Prompt (unparsed)",
    promptInterpretation:
      "Could not interpret prompt — zero targets. Try a category, keywords, or “entire encyclopedia”.",
  };
}

export function categoryFilterToContentCategory(
  cat: MaintenanceCategoryFilter,
): ContentCategory {
  return cat;
}
