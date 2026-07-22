/**
 * Trusted-source discovery for the Knowledge Engine.
 * Builds exhaustive candidate URL lists before any field may become Unknown.
 * Does not invent encyclopedia facts — only proposes places to look / cite.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import {
  isEditorInstruction,
  preferredSourceUrls,
  type PreferredSourceFamily,
  type ResearchDirectives,
} from "./parseEditorInstructions";

export interface TrustedSourceCandidate {
  title: string;
  url: string;
  /** Discovery class for stage notes / completeness. */
  class:
    | "dictionary"
    | "internet_culture"
    | "encyclopedia"
    | "creator"
    | "game"
    | "company"
    | "film"
    | "music"
    | "archive"
    | "official"
    | "journalism";
  priority: number;
}

function wikiTitle(topic: string): string {
  return topic
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-._()%]/g, "");
}

function q(topic: string): string {
  return encodeURIComponent(topic.trim());
}

/** Pull http(s) URLs the editor already named in guidance/notes. */
export function extractUrlsFromText(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s)\]"'<>]+/gi) ?? [];
  return [...new Set(matches.map((u) => u.replace(/[.,;:]+$/, "")))];
}

/**
 * Infer category from editor guidance when present.
 */
export function categoryHintFromGuidance(
  guidance: string,
): AIDraftCategory | undefined {
  const g = guidance.toLowerCase();
  if (/\bslang\b|colloquial|neologism|dictionary term/.test(g)) return "slang";
  if (/\baesthetic\b|\btrend\b|tiktok trend|lifestyle/.test(g)) return "trend";
  if (/\bbrainrot\b|absurdist|gen alpha/.test(g)) return "brainrot";
  if (/\bmeme\b|image macro|format\b/.test(g)) return "meme";
  if (/\bcreator\b|youtuber|streamer|influencer/.test(g)) return "creator";
  if (/\bevent\b|incident|controversy|moment in/.test(g)) return "event";
  return undefined;
}

/**
 * Provisional summary ONLY from an explicit definitional claim.
 * Never from research instructions ("Use Merriam-Webster to define…").
 * Length alone is never enough — instructions must not become article text.
 */
export function summaryFromEditorGuidance(
  title: string,
  guidance: string,
): string | null {
  const g = guidance.trim();
  if (g.length < 16) return null;
  if (isEditorInstruction(g)) return null;

  // Reject imperative source-routing even when longer than 48 chars
  if (
    /\b(use|prefer|consult|cite|search|look up|focus on)\b.+\b(to define|for (history|definition|origin)|dictionary|wikipedia|know your meme)\b/i.test(
      g,
    )
  ) {
    return null;
  }

  const factLike =
    /\b(this is|it is|treat (it|this) as|means|refers to|is (an?|the)\s+(internet|slang|meme|trend|aesthetic|creator|event|brainrot)|is slang|is a meme)\b/i.test(
      g,
    );
  if (!factLike) return null;

  const body = g
    .replace(/^editor guidance[:\s]*/i, "")
    .replace(/^editor (request|instruction|comment)[:\s]*/i, "")
    .trim();
  if (!body || isEditorInstruction(body)) return null;
  return `${title} — ${body}`.slice(0, 480);
}

function classForFamily(
  family: PreferredSourceFamily,
): TrustedSourceCandidate["class"] {
  switch (family) {
    case "merriam_webster":
    case "dictionary_com":
    case "wiktionary":
    case "oxford":
    case "cambridge":
      return "dictionary";
    case "know_your_meme":
      return "internet_culture";
    case "wikipedia":
      return "encyclopedia";
    case "youtube":
      return "creator";
    case "archive":
    case "reddit_archive":
      return "archive";
    case "riot":
    case "official":
      return "official";
    default:
      return "official";
  }
}

/**
 * Exhaustive trusted-source candidates for a topic.
 * Priority order: preferred directive URLs → editor seed URLs → defaults.
 */
export function discoverTrustedSources(input: {
  topic: string;
  categoryHint?: AIDraftCategory | string;
  notes?: string;
  existingUrls?: string[];
  /** Structured directives from parseEditorInstructions — preferred over raw notes. */
  directives?: ResearchDirectives;
}): TrustedSourceCandidate[] {
  const topic = input.topic.trim();
  if (!topic) return [];

  const directives = input.directives;
  const preferred = directives?.preferredSources ?? [];
  const focus = directives?.researchFocus ?? [];
  const wantsDefinition =
    focus.includes("definition") ||
    preferred.some((p) =>
      ["merriam_webster", "dictionary_com", "wiktionary", "oxford", "cambridge"].includes(
        p,
      ),
    );

  const existing = new Set(
    (input.existingUrls ?? [])
      .map((u) => u.trim())
      .filter((u) => /^https?:\/\//i.test(u)),
  );
  for (const u of directives?.seedUrls ?? []) existing.add(u);
  // URLs only from notes — never treat instruction sentences as content seeds
  const fromNotes = extractUrlsFromText(input.notes ?? "");
  for (const u of fromNotes) existing.add(u);

  const cat = (input.categoryHint ?? "").toLowerCase();
  const out: TrustedSourceCandidate[] = [];

  const add = (
    title: string,
    url: string,
    sourceClass: TrustedSourceCandidate["class"],
    priority: number,
  ) => {
    if (!/^https?:\/\//i.test(url)) return;
    if (out.some((c) => c.url === url)) return;
    out.push({ title, url, class: sourceClass, priority });
  };

  // Preferred deep links first (exact definition / article pages)
  for (const pref of preferredSourceUrls(topic, preferred)) {
    add(pref.title, pref.url, classForFamily(pref.family), 1);
  }

  for (const url of existing) {
    add(`Seed source: ${url}`, url, "official", 2);
  }

  const wt = wikiTitle(topic);
  add(
    `Wikipedia — ${topic}`,
    `https://en.wikipedia.org/wiki/${encodeURIComponent(wt)}`,
    "encyclopedia",
    preferred.includes("wikipedia") ? 3 : 10,
  );
  add(
    `Know Your Meme — ${topic}`,
    `https://knowyourmeme.com/memes/${topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    "internet_culture",
    preferred.includes("know_your_meme") ? 3 : 18,
  );
  add(
    `Know Your Meme search — ${topic}`,
    `https://knowyourmeme.com/search?q=${q(topic)}`,
    "internet_culture",
    preferred.includes("know_your_meme") ? 4 : 20,
  );
  add(
    `Wiktionary — ${topic}`,
    `https://en.wiktionary.org/wiki/${encodeURIComponent(wt)}`,
    "dictionary",
    preferred.includes("wiktionary") || wantsDefinition ? 5 : 30,
  );

  if (
    cat === "slang" ||
    wantsDefinition ||
    /\bslang\b|dictionary|colloquial|neologism/i.test(input.notes ?? "")
  ) {
    add(
      `Merriam-Webster — ${topic}`,
      `https://www.merriam-webster.com/dictionary/${q(topic)}`,
      "dictionary",
      preferred.includes("merriam_webster") ? 1 : 15,
    );
    add(
      `Dictionary.com — ${topic}`,
      `https://www.dictionary.com/browse/${q(topic)}`,
      "dictionary",
      preferred.includes("dictionary_com") ? 2 : 16,
    );
    add(
      `Cambridge Dictionary — ${topic}`,
      `https://dictionary.cambridge.org/dictionary/english/${q(topic)}`,
      "dictionary",
      preferred.includes("cambridge") ? 2 : 17,
    );
    add(
      `Oxford Learner’s — ${topic}`,
      `https://www.oxfordlearnersdictionaries.com/definition/english/${q(topic)}`,
      "dictionary",
      preferred.includes("oxford") ? 2 : 18,
    );
  }

  if (
    cat === "creator" ||
    focus.includes("creator") ||
    /\bcreator|youtuber|streamer/i.test(input.notes ?? "")
  ) {
    add(
      `YouTube search — ${topic}`,
      `https://www.youtube.com/results?search_query=${q(topic)}`,
      "creator",
      25,
    );
  }

  if (/\bgame|steam|xbox|playstation|nintendo/i.test(`${cat} ${topic} ${input.notes ?? ""}`)) {
    add(
      `Steam search — ${topic}`,
      `https://store.steampowered.com/search/?term=${q(topic)}`,
      "game",
      22,
    );
  }

  if (/\bfilm|movie|cinema/i.test(`${cat} ${topic} ${input.notes ?? ""}`)) {
    add(
      `IMDb find — ${topic}`,
      `https://www.imdb.com/find/?q=${q(topic)}`,
      "film",
      22,
    );
  }

  if (/\bmusic|song|album|artist|rapper/i.test(`${cat} ${topic} ${input.notes ?? ""}`)) {
    add(
      `Genius search — ${topic}`,
      `https://genius.com/search?q=${q(topic)}`,
      "music",
      22,
    );
  }

  if (/\bcompany|corp|inc\b|startup|brand/i.test(`${cat} ${topic} ${input.notes ?? ""}`)) {
    add(
      `Wikipedia company context — ${topic}`,
      `https://en.wikipedia.org/wiki/Special:Search?search=${q(topic)}`,
      "company",
      21,
    );
  }

  add(
    `Internet Archive search — ${topic}`,
    `https://web.archive.org/web/*/${q(topic)}`,
    "archive",
    preferred.includes("archive") || preferred.includes("reddit_archive") ? 8 : 40,
  );
  add(
    `Google News (journalism leads) — ${topic}`,
    `https://news.google.com/search?q=${q(topic)}`,
    "journalism",
    45,
  );

  return out.sort((a, b) => a.priority - b.priority);
}
