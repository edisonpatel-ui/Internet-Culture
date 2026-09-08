/**
 * Real draft revision for the Edit step (AI Edit box → "Continue to Edit").
 *
 * Same principle as realArticleGeneration.ts: Groq applies the editor's
 * free-text instruction to the actual current draft content, grounded in
 * fresh Tavily results when the instruction implies new research is needed
 * (sources, media, recent activity). Falls back to the offline regex-based
 * reviseDraftWithFeedback when keys are missing or the call fails.
 */

import type { DraftPackage, SuggestedMediaItem } from "@/lib/ai/packages";
import type { ResearchMediaSuggestion } from "@/lib/ai/packages";
import { callGroqJSONWithRetry } from "@/lib/ai/providers/groqReal";
import { isRealGenerationConfigured } from "./realArticleGeneration";
import { tavilySearchMany } from "@/lib/ai/research/tavilySearch";
import { findWikimediaMediaSet } from "@/lib/ai/research/wikimediaMedia";
import { findYouTubeThumbnail } from "@/lib/ai/research/youtubeThumbnail";
import {
  getArticleTemplate,
  renderTemplateForPrompt,
} from "@/lib/content/articleTemplates";
import { estimateTokenCount, MAX_PROMPT_TOKENS } from "@/lib/ai/tokenBudget";

/** Top-N fresh sources to ground a revision in, and the per-snippet char cap.
 *  Same rationale as realArticleGeneration.ts — this is the main lever on
 *  prompt size, and Groq's free-tier TPM limit (8,000) covers the whole
 *  request (prompt + completion). */
const MAX_SOURCES_IN_PROMPT = 5;
const MAX_SOURCE_SNIPPET_CHARS = 500;
const MAX_SOURCES_IN_PROMPT_RETRY = 3;
const MAX_SOURCE_SNIPPET_CHARS_RETRY = 300;

/** Long free-text draft fields are truncated to this length when embedded in
 *  the CURRENT DRAFT context block — the model only needs enough of each
 *  field to judge whether the editor's instruction targets it, not the
 *  full text, since untouched fields are never asked to be retyped (see
 *  the UNCHANGED sentinel scheme below). */
const MAX_DRAFT_FIELD_CHARS = 400;
const MAX_DRAFT_FIELD_CHARS_RETRY = 200;

/** Sentinel the model returns for any string field the instruction doesn't
 *  target, instead of retyping the full (possibly truncated-in-the-prompt)
 *  original — this is what keeps both the prompt AND the completion small:
 *  previously every revision re-emitted the ENTIRE draft back verbatim
 *  even when only one field changed. */
const UNCHANGED = "UNCHANGED";

const QUALITY_RULES = `
Formatting rules (must follow exactly, matching this site's house style):
- summary: ONE punchy sentence, max ~25 words, dictionary-entry style. Never a paragraph. It must summarize
  the article in its own fresh wording and must never be the same sentence as lead, or a trimmed/lightly
  reworded copy of it — they are two different pieces of writing for two different places on the page.
- examples: natural sentences that USE the term/meme in context, the way a real person would say it.
  Never describe a video/article ABOUT the topic (that is not a usage example).
- origin/history/articleSections bodies: dense narrative prose with specific names/dates/platforms,
  several full sentences — never a thin one-line summary.
- Only change the field(s) the instruction targets.

CRITICAL — do not retype fields you didn't change:
- For every STRING field (title, summary, lead, origin, history, culturalSignificance, legacy) that the
  instruction does NOT target, return the exact literal string "${UNCHANGED}" instead of retyping the
  field's content. Some field values shown to you below are truncated for length — retyping a truncated
  value would corrupt it, which is exactly why unchanged fields must use "${UNCHANGED}" instead.
- For every ARRAY field (articleSections, examples, timeline, tags) that the instruction does NOT target,
  return null instead of retyping the array. If the instruction DOES target an array field, return the
  complete updated array (which may legitimately be shorter, or empty, if the instruction asked to remove
  items — an empty array is a valid, intentional result, not a mistake).

Vocabulary the editor may use (map these to the real field):
- "caption" / "description under the title" / "subtitle" = the summary field.
- "section" = one entry in articleSections (each has its own heading + body).
- "shorten" / "make it shorter" / "trim" = actually reduce the length — return fewer words,
  not the same text reformatted. A "shortened" summary that is still a paragraph is a FAILURE.
- "remove" / "delete" / "get rid of" a section = OMIT that entry from the articleSections array
  entirely in your response. Do not just leave it unchanged or empty it out — actually remove it.
  Shrinking or deleting the targeted field IS the requested change — it is not something to
  avoid in the name of "leaving other fields unchanged". That rule protects fields the editor
  did NOT mention, not the one they did.
`.trim();

function needsFreshResearch(instruction: string): boolean {
  return /\b(source|sources|citation|media|image|photo|picture|thumbnail|recent|update|news|current|latest)\b/i.test(
    instruction,
  );
}

function needsMedia(instruction: string): boolean {
  return /\b(media|image|photo|picture|thumbnail|hero image|featured image)\b/i.test(
    instruction,
  );
}

/** Truncates a draft field for CONTEXT purposes only in the prompt — never
 *  fed back into the merged result, since untouched fields come back as the
 *  "${UNCHANGED}" sentinel and keep their full original value from `draft`. */
function forContext(value: string, maxChars: number): string {
  if (!value || value.length <= maxChars) return value;
  return `${value.slice(0, maxChars)}… [truncated for prompt size — full text preserved unless this field is the one you're asked to change]`;
}

interface GroqRevisionShape {
  title: string;
  summary: string;
  lead: string;
  /** null = unchanged, keep draft's own value. */
  articleSections: DraftPackage["articleSections"] | null;
  origin: string;
  history: string;
  culturalSignificance: string;
  legacy: string;
  /** null = unchanged, keep draft's own value. */
  examples: string[] | null;
  /** null = unchanged, keep draft's own value. */
  timeline: DraftPackage["timeline"] | null;
  /** null = unchanged, keep draft's own value. */
  tags: string[] | null;
  changeSummary: string;
}

/** Resolves a string field the model may have returned as "${UNCHANGED}". */
function resolveStringField(result: string | undefined, original: string): string {
  if (!result || result === UNCHANGED) return original;
  return result;
}

/**
 * Apply an editor instruction to a draft using real Groq generation,
 * grounded in fresh Tavily sources when the instruction calls for it.
 * Throws on failure — callers should catch and fall back to the offline
 * reviser rather than surface a raw error.
 */
export async function reviseRealDraft(
  draft: DraftPackage,
  feedback: string,
): Promise<DraftPackage> {
  if (!isRealGenerationConfigured()) {
    throw new Error("Real generation not configured.");
  }

  let freshSourceBlockFull = "";
  let freshSourceBlockRetry = "";
  let addedSources: DraftPackage["suggestedSources"] = [];
  if (needsFreshResearch(feedback)) {
    const results = await tavilySearchMany([
      `${draft.title} ${feedback}`,
      `${draft.title} internet culture`,
    ]).catch(() => []);
    addedSources = results.slice(0, 6).map((r) => ({
      title: r.title,
      url: r.url,
      domain: (() => {
        try {
          return new URL(r.url).hostname.replace(/^www\./, "");
        } catch {
          return undefined;
        }
      })(),
    }));
    const buildSourceBlock = (maxSources: number, maxChars: number) =>
      results
        .slice(0, maxSources)
        .map((r, i) => `[${i + 1}] ${r.title} — ${r.url}\n${r.content.slice(0, maxChars)}`)
        .join("\n\n");
    freshSourceBlockFull = buildSourceBlock(MAX_SOURCES_IN_PROMPT, MAX_SOURCE_SNIPPET_CHARS);
    freshSourceBlockRetry = buildSourceBlock(
      MAX_SOURCES_IN_PROMPT_RETRY,
      MAX_SOURCE_SNIPPET_CHARS_RETRY,
    );
  }

  let media: SuggestedMediaItem[] = draft.suggestedMedia ?? [];
  if (needsMedia(feedback)) {
    const found = await findWikimediaMediaSet(draft.title, draft.category).catch(
      () => [],
    );
    let fallback: ResearchMediaSuggestion | null = null;
    if (found.length === 0) {
      // Wikimedia legitimately has nothing for most modern meme/slang/
      // brainrot topics — actively search YouTube instead of only scanning
      // whatever sources this revision pass happened to already fetch.
      const ytSources = await tavilySearchMany(
        [`${draft.title} youtube`, `${draft.title} video`],
        { includeDomains: ["youtube.com", "youtu.be"], maxResults: 5 },
      ).catch(() => []);
      const candidateUrls = [
        ...ytSources.map((s) => s.url),
        ...(addedSources ?? []).map((s) => s.url).filter((u): u is string => Boolean(u)),
      ];
      fallback = await findYouTubeThumbnail(candidateUrls).catch(() => null);
    }
    const combined = found.length > 0 ? found : fallback ? [fallback] : [];
    if (combined.length > 0) {
      media = combined.map((m) => ({
        role: m.role,
        type: m.type ?? "image",
        url: m.url,
        title: m.title,
        source: m.source,
        searchHint: m.searchHint,
        verified: false,
      }));
    }
  }

  const template = getArticleTemplate(draft.category);
  const system = [
    "You revise encyclopedia drafts for Internet Culture Hub based on an editor's instruction.",
    "You edit ONLY what the instruction asks for.",
    "Never invent facts not supported by the current draft content or the fresh sources given (if any).",
    "The article must keep matching this site's standardized template for its category — its field rules are",
    "  the house style. Only deviate where the editor's instruction explicitly asks for something different.",
    QUALITY_RULES,
    "Output ONLY a single JSON object matching the exact schema in the user message. No prose outside JSON.",
  ].join(" ");

  // Compact (no pretty-print) JSON, and long fields truncated for context —
  // this is the single biggest prompt-size win here: the old version
  // pretty-printed the entire current draft (every section, full length)
  // into every revision request, whether or not the instruction touched it.
  const buildDraftContext = (fieldCharCap: number) =>
    JSON.stringify({
      title: draft.title,
      summary: draft.summary,
      lead: forContext(draft.lead, fieldCharCap),
      articleSections: draft.articleSections.map((s) => ({
        ...s,
        body: forContext(s.body, fieldCharCap),
      })),
      origin: forContext(draft.origin, fieldCharCap),
      history: forContext(draft.history, fieldCharCap),
      culturalSignificance: forContext(draft.culturalSignificance, fieldCharCap),
      legacy: forContext(draft.legacy, fieldCharCap),
      examples: draft.examples,
      timeline: draft.timeline,
      tags: draft.tags,
    });

  const schemaTail = `
EDITOR INSTRUCTION: "${feedback}"

Return a single JSON object with EXACTLY this shape:
{
  "title": string (or "${UNCHANGED}"),
  "summary": string (or "${UNCHANGED}"),
  "lead": string (or "${UNCHANGED}"),
  "articleSections": [{ "id": string, "heading": string, "body": string }] | null,
  "origin": string (or "${UNCHANGED}"),
  "history": string (or "${UNCHANGED}"),
  "culturalSignificance": string (or "${UNCHANGED}"),
  "legacy": string (or "${UNCHANGED}"),
  "examples": string[] | null,
  "timeline": [{ "date": string, "event": string }] | null,
  "tags": string[] | null,
  "changeSummary": string (one short sentence describing what you changed)
}
`.trim();

  const buildUser = (attempt: 1 | 2): string => {
    const fieldCap = attempt === 1 ? MAX_DRAFT_FIELD_CHARS : MAX_DRAFT_FIELD_CHARS_RETRY;
    const freshSourceBlock = attempt === 1 ? freshSourceBlockFull : freshSourceBlockRetry;
    const user = `
ARTICLE TEMPLATE for this category:
${renderTemplateForPrompt(template)}

CURRENT DRAFT (some long fields truncated for prompt size — see rules above for how to handle unchanged fields):
${buildDraftContext(fieldCap)}

${freshSourceBlock ? `FRESH SOURCE EXCERPTS (use these to ground the requested change):\n${freshSourceBlock}\n` : ""}
${schemaTail}
`.trim();

    if (attempt === 1 && estimateTokenCount(user) > MAX_PROMPT_TOKENS) {
      console.warn(
        "[Draft Studio] Revision prompt still over budget after standard trimming — retry attempt will shrink further.",
      );
    }
    return user;
  };

  const result = await callGroqJSONWithRetry<GroqRevisionShape>(system, buildUser, {
    temperature: 0.3,
    // Output is now mostly short "${UNCHANGED}"/null sentinels plus only the
    // fields actually being changed, not a full re-typed draft every time —
    // 3000 completion tokens is comfortably enough even for a full-article
    // rewrite instruction, and keeps prompt+completion well under the
    // 8,000 TPM ceiling.
    maxTokens: 3000,
  });

  const now = new Date().toISOString();
  const next: DraftPackage = {
    ...draft,
    title: resolveStringField(result.title, draft.title),
    summary: resolveStringField(result.summary, draft.summary),
    lead: resolveStringField(result.lead, draft.lead),
    articleSections:
      result.articleSections === null ? draft.articleSections : result.articleSections,
    origin: resolveStringField(result.origin, draft.origin),
    history: resolveStringField(result.history, draft.history),
    culturalSignificance: resolveStringField(
      result.culturalSignificance,
      draft.culturalSignificance,
    ),
    legacy: resolveStringField(result.legacy, draft.legacy),
    examples: result.examples === null ? draft.examples : result.examples,
    timeline: result.timeline === null ? draft.timeline : result.timeline,
    tags: result.tags === null ? draft.tags : result.tags,
    suggestedMedia: media,
    suggestedSources: addedSources.length
      ? [...(draft.suggestedSources ?? []), ...addedSources]
      : draft.suggestedSources,
    updatedAt: now,
    revision: (draft.revision ?? 0) + 1,
    feedbackHistory: [
      ...(draft.feedbackHistory ?? []),
      {
        id: `fb_${Date.now().toString(36)}`,
        at: now,
        feedback,
        changeSummary: result.changeSummary || "Revised via real generation",
      },
    ],
  };

  return next;
}
