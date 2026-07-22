/**
 * Encyclopedia prose helpers for draft generation / presentation.
 * Converts research into visitor-facing writing. Never emits workflow/AI/package text.
 */

const INTERNAL_LEAK =
  /\b(TODO|FIXME|editor guidance|editor notes?|editorial notes?|editor flag|editor feedback|editor revision|editor override|editor request|editor instruction|continue anyway|best-fit category|category (hint|reasoning|from research)|research (package|stages?|failed|review|notes?)|knowledge engine|required (field|missing)|missing required|need(s)? (summary|category|source|information)|scaffolding|placeholder|unverified|AI-suggested|verified:\s*false|encyclopedia draft pending|noted for verification|grounded in verified sources before publish|exhausting research|completeness|implementation|workflow|package structure|session notes|trusted[- ]source candidate|URL-backed evidence|mock engine|definitional guidance|live adapters?|seed (URL|source)|evidence items seen|refusing fabricated|cannot determine a grounded|pending fuller research|working notes|open questions|update pending verification|scoped update|scoped research|preferred sources? from editor|research directives?)\b/i;

/** Imperative instruction phrasing that must never appear in encyclopedia prose. */
const INSTRUCTION_LEAK =
  /^(use|prefer|focus|check|look|search|see|read|pull|find|add|expand|rewrite|make|reduce|prioritize|cite|consult|reference|include|remove|update|generate|write|create|draft)\b/i;

const UNKNOWN_RE = /^unknown\.?$/i;

export function isUnknownValue(text: string | undefined | null): boolean {
  const t = (text ?? "").trim();
  return !t || UNKNOWN_RE.test(t);
}

export function looksInternalProse(text: string): boolean {
  const t = text.trim();
  if (INTERNAL_LEAK.test(t)) return true;
  // Whole-string instruction (e.g. "Use Merriam-Webster to define Dad Bod.")
  if (INSTRUCTION_LEAK.test(t) && t.length < 220) return true;
  if (
    /\bUse\s+[\w.\- ]+\s+to\s+(define|research|explain|cover)\b/i.test(t)
  ) {
    return true;
  }
  if (/\bUpdate pending verification:/i.test(t)) return true;
  return false;
}

/** Strip or reject internal artifacts. Returns empty if unusable. */
export function sanitizePublicProse(text: string): string {
  let t = text.replace(/\s+/g, " ").trim();
  if (!t || isUnknownValue(t)) return "";
  // Drop parenthetical editor flags sometimes appended mid-sentence
  t = t.replace(/\s*\(Editor flag:[^)]*\)/gi, "");
  t = t.replace(/\s*Editor feedback applied:[^.]*\.?/gi, "");
  t = t.replace(/\s*Revised with editor guidance:[^.]*\.?/gi, "");
  t = t.replace(/\s*Editorial notes:[^.]*\.?/gi, "");
  t = t.replace(/\s*Editor guidance:[^.]*\.?/gi, "");
  t = t.replace(/\s*Editor request:[^.]*\.?/gi, "");
  t = t.replace(/\s*\[Update pending verification:[^\]]*\]/gi, "");
  t = t.replace(
    /\bUse\s+[\w.\- ]+\s+to\s+(define|research|explain|cover)\s+[^.?!]*[.?!]?/gi,
    "",
  );
  t = t.replace(/\s+/g, " ").trim();
  if (!t || looksInternalProse(t)) return "";
  return t;
}

function categoryPhrase(
  category: string,
): string {
  switch (category) {
    case "slang":
      return "internet slang term";
    case "meme":
      return "internet meme";
    case "trend":
      return "internet culture trend";
    case "brainrot":
      return "absurdist internet phenomenon";
    case "event":
      return "internet culture event";
    case "creator":
      return "internet creator";
    default:
      return "internet culture topic";
  }
}

/**
 * Natural lead / hero description. Never prints Unknown or research TODOs.
 */
export function writeEncyclopediaLead(input: {
  title: string;
  category: string;
  summary?: string;
  aliases?: string[];
}): string {
  const clean = sanitizePublicProse(input.summary ?? "");
  if (clean) return clean;

  const extras = (input.aliases ?? [])
    .map((a) => a.trim())
    .filter(
      (a) =>
        a &&
        a.toLowerCase() !== input.title.toLowerCase() &&
        !looksInternalProse(a),
    )
    .slice(0, 3);
  const also =
    extras.length > 0 ? ` It is also known as ${extras.join(", ")}.` : "";

  return `${input.title} is a ${categoryPhrase(input.category)}.${also}`;
}

/**
 * Origin prose. Unknown → natural encyclopedia wording (not a placeholder label).
 */
export function writeOriginProse(title: string, origin?: string): string {
  const clean = sanitizePublicProse(origin ?? "");
  if (clean) return clean;
  return `The exact origin of ${title} has not been publicly confirmed.`;
}

/**
 * Cultural impact prose. Returns null to omit the section when unknown.
 */
export function writeImpactProse(
  title: string,
  impact?: string,
  platforms?: string[],
): string | null {
  const clean = sanitizePublicProse(impact ?? "");
  if (clean) {
    const plats = (platforms ?? [])
      .map((p) => p.trim())
      .filter((p) => p && !looksInternalProse(p))
      .slice(0, 4);
    if (plats.length > 0 && !new RegExp(plats[0]!, "i").test(clean)) {
      return `${clean} It has circulated across ${plats.join(", ")}.`;
    }
    return clean;
  }
  return null;
}

export function writeLegacyProse(
  title: string,
  moments?: string[],
): string | null {
  const clean = (moments ?? [])
    .map((m) => sanitizePublicProse(m))
    .filter(Boolean)
    .slice(0, 3);
  if (clean.length === 0) return null;
  if (clean.length === 1) return clean[0]!;
  return `${title} remains a reference point in online culture. Notable moments include ${clean.join("; ")}.`;
}

export interface PublicTimelineEvent {
  date: string;
  event: string;
}

/** Drop Unknown dates and internal chronology scaffolding. */
export function writePublicTimeline(
  items: Array<{ date?: string; when?: string; event?: string; what?: string }>,
): PublicTimelineEvent[] {
  const out: PublicTimelineEvent[] = [];
  for (const item of items) {
    const date = sanitizePublicProse(item.date ?? item.when ?? "");
    const event = sanitizePublicProse(item.event ?? item.what ?? "");
    if (!date || !event) continue;
    if (isUnknownValue(date) || isUnknownValue(event)) continue;
    if (/chronology could not be determined/i.test(event)) continue;
    if (/^editor revision$/i.test(date)) continue;
    out.push({ date, event });
  }
  return out;
}

export function writePublicExamples(examples: string[]): string[] {
  return examples
    .map((e) => sanitizePublicProse(e))
    .filter(Boolean)
    .slice(0, 6);
}

/** Human source label for visitor-facing citations. */
export function publicSourceLabel(title: string, url?: string): string {
  let t = title.replace(/^Editor\s*\/\s*seed:\s*/i, "").trim();
  t = t.replace(/^Seed source:\s*/i, "").trim();
  t = t.replace(/^Trusted-source candidate for[^:]*:\s*/i, "").trim();
  t = t.replace(/\s*—\s*.*$/, "").trim() || t;
  if (/^https?:\/\//i.test(t)) t = "";
  if (/wikipedia\.org/i.test(url ?? "")) return t || "Wikipedia";
  if (/knowyourmeme\.com/i.test(url ?? "")) return t || "Know Your Meme";
  if (/wiktionary\.org/i.test(url ?? "")) return t || "Wiktionary";
  if (/merriam-webster/i.test(url ?? "")) return t || "Merriam-Webster";
  if (/dictionary\.com/i.test(url ?? "")) return t || "Dictionary.com";
  if (/cambridge\.org/i.test(url ?? "")) return t || "Cambridge Dictionary";
  if (/oxford/i.test(url ?? "")) return t || "Oxford Dictionary";
  if (/imdb\.com/i.test(url ?? "")) return t || "IMDb";
  if (/steampowered/i.test(url ?? "")) return t || "Steam";
  if (/genius\.com/i.test(url ?? "")) return t || "Genius";
  if (/youtube\.com/i.test(url ?? "")) return t || "YouTube";
  if (/archive\.org/i.test(url ?? "")) return t || "Internet Archive";
  if (/riotgames\.com/i.test(url ?? "")) return t || "Riot Games";
  try {
    if (url) return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    /* ignore */
  }
  return t || "Source";
}

/** Prefer citable article pages over open search pages in visitor sources. */
export function isPreferredPublicSourceUrl(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) return false;
  if (/news\.google\.com\/search/i.test(url)) return false;
  if (/youtube\.com\/results/i.test(url)) return false;
  if (/knowyourmeme\.com\/search/i.test(url)) return false;
  if (/web\.archive\.org\/web\/\*/i.test(url)) return false;
  if (/Special:Search/i.test(url)) return false;
  if (/\/hc\/en-us\/search/i.test(url)) return false;
  return true;
}
