/**
 * Editorial AI Instruction Layer.
 *
 * Editor prompts are AI instructions — never encyclopedia content.
 * Parse them into research directives before the Knowledge Engine runs.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import { extractUrlsFromText } from "./trustedSourceDiscovery";

export type PreferredSourceFamily =
  | "merriam_webster"
  | "dictionary_com"
  | "wiktionary"
  | "oxford"
  | "cambridge"
  | "know_your_meme"
  | "wikipedia"
  | "official"
  | "reddit_archive"
  | "youtube"
  | "riot"
  | "archive"
  | "other";

export type ResearchFocus =
  | "definition"
  | "history"
  | "origin"
  | "media"
  | "creator"
  | "sources"
  | "tone"
  | "general";

export type RevisionIntentKind =
  | "expand_history"
  | "expand_origin"
  | "rewrite_intro"
  | "neutral_tone"
  | "add_source"
  | "better_media"
  | "reduce_repetition"
  | "expand_section"
  | "generic";

export interface RevisionIntent {
  kind: RevisionIntentKind;
  detail?: string;
}

/**
 * Structured research / revision directives derived from editor instructions.
 * Never render `rawInstruction` into visitor-facing prose.
 */
export interface ResearchDirectives {
  rawInstruction: string;
  topicHint?: string;
  categoryHint?: AIDraftCategory;
  preferredSources: PreferredSourceFamily[];
  seedUrls: string[];
  researchFocus: ResearchFocus[];
  /**
   * Only when the editor explicitly states a fact (e.g. "Dad Bod is slang for…").
   * Never set from "Use X to define Y" style instructions.
   */
  definitionalClaim?: string;
  revisionIntents: RevisionIntent[];
  /** Internal KE notes only — never used as article summary seed. */
  researchNotes: string[];
}

const CATEGORIES: AIDraftCategory[] = [
  "meme",
  "slang",
  "trend",
  "brainrot",
  "event",
  "creator",
];

/** Imperative / workflow phrasing — treat as instruction, not content. */
const INSTRUCTION_VERB =
  /^(use|prefer|focus|check|look|search|see|read|pull|find|add|expand|rewrite|make|reduce|prioritize|cite|consult|reference|include|remove|update|generate|write|create|draft|define|get)\b/i;

const SOURCE_PATTERNS: Array<{
  re: RegExp;
  family: PreferredSourceFamily;
  note: string;
}> = [
  {
    re: /\bmerriam[-\s]?webster\b|\bmw\b/i,
    family: "merriam_webster",
    note: "Prefer Merriam-Webster definition page",
  },
  {
    re: /\bdictionary\.com\b/i,
    family: "dictionary_com",
    note: "Prefer Dictionary.com definition page",
  },
  {
    re: /\bwiktionary\b/i,
    family: "wiktionary",
    note: "Prefer Wiktionary entry",
  },
  {
    re: /\boxford\b/i,
    family: "oxford",
    note: "Prefer Oxford dictionary entry",
  },
  {
    re: /\bcambridge\b/i,
    family: "cambridge",
    note: "Prefer Cambridge Dictionary entry",
  },
  {
    re: /\bknow\s*your\s*meme\b|\bkym\b/i,
    family: "know_your_meme",
    note: "Prefer Know Your Meme article page",
  },
  {
    re: /\bwikipedia\b|\bwiki\b/i,
    family: "wikipedia",
    note: "Prefer Wikipedia article page",
  },
  {
    re: /\briot\s*games\b|\briot\b/i,
    family: "riot",
    note: "Prefer official Riot Games sources",
  },
  {
    re: /\barchived?\s+reddit\b|\breddit\b.*\barchive\b|\bwayback\b.*\breddit\b/i,
    family: "reddit_archive",
    note: "Prefer archived Reddit posts",
  },
  {
    re: /\bofficial\b|\bprimary\s+source\b/i,
    family: "official",
    note: "Prefer official / primary sources",
  },
  {
    re: /\byoutube\b/i,
    family: "youtube",
    note: "Prefer YouTube / creator channel sources",
  },
  {
    re: /\barchive\.org\b|\binternet\s+archive\b/i,
    family: "archive",
    note: "Prefer Internet Archive copies",
  },
];

function categoryFromText(text: string): AIDraftCategory | undefined {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    if (
      lower.includes(`(${cat})`) ||
      lower.includes(`as ${cat}`) ||
      lower.includes(`to ${cat}`) ||
      lower.includes(`category ${cat}`) ||
      lower.includes(`${cat} term`)
    ) {
      return cat;
    }
  }
  if (/\bslang\b|colloquial|neologism|dictionary term/.test(lower)) return "slang";
  if (/\bbrainrot\b|absurdist|gen alpha/.test(lower)) return "brainrot";
  if (/\bmeme\b|image macro|format\b/.test(lower)) return "meme";
  if (/\bcreator\b|youtuber|streamer|influencer/.test(lower)) return "creator";
  if (/\bevent\b|incident|controversy|moment in/.test(lower)) return "event";
  if (/\baesthetic\b|\btrend\b|tiktok trend|lifestyle/.test(lower)) return "trend";
  return undefined;
}

/**
 * Extract topic from common instruction shapes without treating the whole
 * instruction as the encyclopedia subject.
 */
export function topicHintFromInstruction(text: string): string | undefined {
  let t = text.trim();
  if (!t) return undefined;

  const patterns = [
    /^(?:use|prefer|consult|cite|check|search|read)\s+.+\s+to\s+(?:define|research|cover|document|explain)\s+(.+)$/i,
    /^(?:define|research|write|generate|create|draft|make)\s+(?:an?\s+)?(?:encyclopedia\s+)?(?:article|entry|page|definition)?\s*(?:about|on|for)?\s*(.+)$/i,
    /^(?:about|on|for)\s+(.+)$/i,
    /^expand\s+(?:the\s+)?(?:history|origin|intro(?:duction)?|definition)\s+(?:section\s+)?(?:(?:of|for|about)\s+)?(.+)$/i,
  ];

  for (const re of patterns) {
    const m = t.match(re);
    if (m?.[1]) {
      t = m[1].trim();
      break;
    }
  }

  t = t
    .replace(/\s*\((slang|meme|trend|brainrot|event|creator)\)\s*$/i, "")
    .replace(/[.!?]+$/, "")
    .replace(/^(the|a|an)\s+/i, "")
    .trim();

  // Reject if still looks like a pure instruction with no topic noun
  if (!t || t.length < 2) return undefined;
  if (INSTRUCTION_VERB.test(t) && t.split(/\s+/).length <= 4) return undefined;
  if (t.length > 120) t = `${t.slice(0, 117)}…`;
  return t;
}

/**
 * True when text is an AI instruction rather than encyclopedia knowledge.
 */
export function isEditorInstruction(text: string): boolean {
  const g = text.trim();
  if (!g) return false;

  if (INSTRUCTION_VERB.test(g)) return true;
  if (
    /\b(use|prefer|focus on|search|look up|cite|consult|expand|rewrite|make the tone|reduce repetition|add another source|find a better|prioritize)\b/i.test(
      g,
    )
  ) {
    return true;
  }
  if (
    /\b(to define|for history|for definition|for origin|into the article|in the (intro|introduction|history|origin))\b/i.test(
      g,
    )
  ) {
    return true;
  }
  return false;
}

/**
 * Only accept explicit definitional *facts* from the editor — never instructions.
 */
export function extractDefinitionalClaim(text: string): string | undefined {
  const g = text.trim();
  if (!g || isEditorInstruction(g)) return undefined;

  // Reject "Use X to define Y"
  if (/\bto\s+define\b/i.test(g) && INSTRUCTION_VERB.test(g)) return undefined;

  const factLike =
    /\b(this is|it is|treat (it|this) as|means|refers to|is (an?|the)\s+(internet|slang|meme|trend|aesthetic|creator|event|brainrot)|is slang|is a meme)\b/i.test(
      g,
    );

  if (!factLike) return undefined;

  const body = g
    .replace(/^editor guidance[:\s]*/i, "")
    .replace(/^editor (request|instruction|comment)[:\s]*/i, "")
    .trim();

  if (body.length < 16 || isEditorInstruction(body)) return undefined;
  return body.slice(0, 480);
}

function revisionIntentsFromText(text: string): RevisionIntent[] {
  const lower = text.toLowerCase();
  const intents: RevisionIntent[] = [];
  const add = (kind: RevisionIntentKind, detail?: string) => {
    if (!intents.some((i) => i.kind === kind)) {
      intents.push({ kind, detail });
    }
  };

  if (/expand.*history|history.*(expand|longer|more)|more (on |about )?history/i.test(lower)) {
    add("expand_history");
  }
  if (/expand.*origin|origin.*(expand|longer|more)|more (on |about )?origin/i.test(lower)) {
    add("expand_origin");
  }
  if (
    /rewrite (the )?(intro|introduction|lead|summary)|better intro|improve (the )?(intro|introduction)/i.test(
      lower,
    )
  ) {
    add("rewrite_intro");
  }
  if (/neutral|less (hype|slangy|casual)|more encyclopedic|tone/i.test(lower)) {
    add("neutral_tone");
  }
  if (/add (another |a |more )?source|more sources|cite|citation/i.test(lower)) {
    add("add_source");
  }
  if (/hero image|featured image|better (image|photo|media)|find .*image/i.test(lower)) {
    add("better_media");
  }
  if (/reduc(e|ing) repetition|less repetitive|dedupe|too repetitive/i.test(lower)) {
    add("reduce_repetition");
  }
  if (/expand (the )?(section|definition)|more detail|longer section/i.test(lower)) {
    add("expand_section");
  }

  if (intents.length === 0 && isEditorInstruction(text)) {
    add("generic");
  }

  return intents;
}

function researchFocusFromText(
  text: string,
  preferred: PreferredSourceFamily[],
): ResearchFocus[] {
  const lower = text.toLowerCase();
  const focus = new Set<ResearchFocus>();

  if (/\bdefin(e|ition)|dictionary|means\b|refers to\b/i.test(lower)) {
    focus.add("definition");
  }
  if (/\bhistory|timeline|evolution|spread\b/i.test(lower)) {
    focus.add("history");
  }
  if (/\borigin|coined|first appear|etymolog/i.test(lower)) {
    focus.add("origin");
  }
  if (/\bimage|video|hero|thumbnail|media\b/i.test(lower)) {
    focus.add("media");
  }
  if (/\bcreator|youtuber|streamer|channel\b/i.test(lower)) {
    focus.add("creator");
  }
  if (/\bsource|cite|citation|reference\b/i.test(lower)) {
    focus.add("sources");
  }
  if (/\btone|neutral|rewrite\b/i.test(lower)) {
    focus.add("tone");
  }

  if (
    preferred.some((p) =>
      ["merriam_webster", "dictionary_com", "wiktionary", "oxford", "cambridge"].includes(
        p,
      ),
    )
  ) {
    focus.add("definition");
  }
  if (preferred.includes("know_your_meme") || preferred.includes("wikipedia")) {
    focus.add("history");
  }

  if (focus.size === 0) focus.add("general");
  return [...focus];
}

/**
 * Parse free-form editor text into structured research / revision directives.
 */
export function parseEditorInstructions(input: {
  text: string;
  topicFallback?: string;
}): ResearchDirectives {
  const raw = input.text.trim();
  const preferredSources: PreferredSourceFamily[] = [];
  const researchNotes: string[] = [];

  for (const { re, family, note } of SOURCE_PATTERNS) {
    if (re.test(raw)) {
      if (!preferredSources.includes(family)) preferredSources.push(family);
      researchNotes.push(note);
    }
  }

  const seedUrls = extractUrlsFromText(raw);
  if (seedUrls.length > 0) {
    researchNotes.push(`Editor-supplied seed URLs: ${seedUrls.length}`);
  }

  const topicHint =
    topicHintFromInstruction(raw) || input.topicFallback?.trim() || undefined;

  let categoryHint = categoryFromText(raw);
  // Dictionary-definition instructions usually imply slang / terminology
  if (
    !categoryHint &&
    preferredSources.some((p) =>
      ["merriam_webster", "dictionary_com", "wiktionary", "oxford", "cambridge"].includes(
        p,
      ),
    ) &&
    /\bdefin(e|ition)\b/i.test(raw)
  ) {
    categoryHint = "slang";
  }
  if (categoryHint) {
    researchNotes.push(`Category hint from instruction: ${categoryHint}`);
  }

  const definitionalClaim = extractDefinitionalClaim(raw);
  if (definitionalClaim) {
    researchNotes.push(
      "Editor supplied an explicit definitional claim (verify against sources).",
    );
  } else if (raw) {
    researchNotes.push(
      "Editor text treated as research instruction only — not article content.",
    );
  }

  const revisionIntents = revisionIntentsFromText(raw);
  for (const intent of revisionIntents) {
    if (intent.kind !== "generic") {
      researchNotes.push(`Revision intent: ${intent.kind}`);
    }
  }

  const researchFocus = researchFocusFromText(raw, preferredSources);

  return {
    rawInstruction: raw,
    topicHint,
    categoryHint,
    preferredSources,
    seedUrls,
    researchFocus,
    definitionalClaim,
    revisionIntents,
    researchNotes,
  };
}

/**
 * Build deep-linked candidate URLs for preferred source families.
 * Prefer exact article/definition pages over site homepages.
 */
export function preferredSourceUrls(
  topic: string,
  families: PreferredSourceFamily[],
): Array<{ title: string; url: string; family: PreferredSourceFamily }> {
  const t = topic.trim();
  if (!t) return [];
  const q = encodeURIComponent(t);
  const wiki = t
    .replace(/\s+/g, "_")
    .replace(/[^\w\-._()%]/g, "");
  const slug = t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const out: Array<{ title: string; url: string; family: PreferredSourceFamily }> =
    [];

  const add = (
    family: PreferredSourceFamily,
    title: string,
    url: string,
  ) => {
    if (!families.includes(family)) return;
    out.push({ family, title, url });
  };

  add(
    "merriam_webster",
    `Merriam-Webster — ${t}`,
    `https://www.merriam-webster.com/dictionary/${q}`,
  );
  add(
    "dictionary_com",
    `Dictionary.com — ${t}`,
    `https://www.dictionary.com/browse/${q}`,
  );
  add(
    "wiktionary",
    `Wiktionary — ${t}`,
    `https://en.wiktionary.org/wiki/${encodeURIComponent(wiki)}`,
  );
  add(
    "oxford",
    `Oxford Learner’s — ${t}`,
    `https://www.oxfordlearnersdictionaries.com/definition/english/${q}`,
  );
  add(
    "cambridge",
    `Cambridge Dictionary — ${t}`,
    `https://dictionary.cambridge.org/dictionary/english/${q}`,
  );
  add(
    "know_your_meme",
    `Know Your Meme — ${t}`,
    `https://knowyourmeme.com/memes/${slug}`,
  );
  add(
    "know_your_meme",
    `Know Your Meme search — ${t}`,
    `https://knowyourmeme.com/search?q=${q}`,
  );
  add(
    "wikipedia",
    `Wikipedia — ${t}`,
    `https://en.wikipedia.org/wiki/${encodeURIComponent(wiki)}`,
  );
  add(
    "youtube",
    `YouTube search — ${t}`,
    `https://www.youtube.com/results?search_query=${q}`,
  );
  add(
    "archive",
    `Internet Archive search — ${t}`,
    `https://web.archive.org/web/*/${q}`,
  );
  add(
    "reddit_archive",
    `Internet Archive (Reddit) — ${t}`,
    `https://web.archive.org/web/*/https://www.reddit.com/search/?q=${q}`,
  );
  add(
    "riot",
    `Riot Games support search — ${t}`,
    `https://support-leagueoflegends.riotgames.com/hc/en-us/search?query=${q}`,
  );

  return out;
}

/**
 * Remove verbatim / near-verbatim instruction text from public prose.
 */
export function stripInstructionFromProse(
  prose: string,
  instruction?: string,
): string {
  let t = prose.replace(/\s+/g, " ").trim();
  if (!t) return "";

  if (instruction?.trim()) {
    const instr = instruction.trim();
    if (instr.length >= 8) {
      const escaped = instr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      t = t.replace(new RegExp(escaped, "gi"), " ").replace(/\s+/g, " ").trim();
    }
  }

  // Common instruction residue patterns
  t = t.replace(
    /\s*\[Update pending verification:[^\]]*\]/gi,
    "",
  );
  t = t.replace(/\bEditor request:\s*[^.?!]*[.?!]?/gi, "");
  t = t.replace(/\bScoped update for\s+[^.?!]*[.?!]?/gi, "");
  t = t.replace(
    /\bUse\s+[\w.\- ]+\s+to\s+(define|research|explain|cover)\s+[^.?!]*[.?!]?/gi,
    "",
  );
  t = t.replace(
    /\b(Expand|Rewrite|Make|Reduce|Add|Find|Prefer|Focus on)\s+[^.?!]{0,80}[.?!]?/gi,
    (match) => (isEditorInstruction(match) ? "" : match),
  );

  return t.replace(/\s+/g, " ").trim();
}
