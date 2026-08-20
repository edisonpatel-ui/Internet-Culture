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
import { callGroqJSON } from "@/lib/ai/providers/groqReal";
import { isRealGenerationConfigured } from "./realArticleGeneration";
import { tavilySearchMany } from "@/lib/ai/research/tavilySearch";
import { findWikimediaMediaSet } from "@/lib/ai/research/wikimediaMedia";
import { findYouTubeThumbnail } from "@/lib/ai/research/youtubeThumbnail";
import {
  getArticleTemplate,
  renderTemplateForPrompt,
} from "@/lib/content/articleTemplates";

const QUALITY_RULES = `
Formatting rules (must follow exactly, matching this site's house style):
- summary: ONE punchy sentence, max ~25 words, dictionary-entry style. Never a paragraph. It must summarize
  the article in its own fresh wording and must never be the same sentence as lead, or a trimmed/lightly
  reworded copy of it — they are two different pieces of writing for two different places on the page.
- examples: natural sentences that USE the term/meme in context, the way a real person would say it.
  Never describe a video/article ABOUT the topic (that is not a usage example).
- origin/history/articleSections bodies: dense narrative prose with specific names/dates/platforms,
  several full sentences — never a thin one-line summary.
- Only change the field(s) the instruction targets. Leave every OTHER field exactly as given.

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

interface GroqRevisionShape {
  title: string;
  summary: string;
  lead: string;
  articleSections: DraftPackage["articleSections"];
  origin: string;
  history: string;
  culturalSignificance: string;
  legacy: string;
  examples: string[];
  timeline: DraftPackage["timeline"];
  tags: string[];
  changeSummary: string;
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

  let freshSourceBlock = "";
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
    freshSourceBlock = results
      .slice(0, 8)
      .map((r, i) => `[${i + 1}] ${r.title} — ${r.url}\n${r.content.slice(0, 500)}`)
      .join("\n\n");
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
    "You edit ONLY what the instruction asks for — every other field must be returned unchanged.",
    "Never invent facts not supported by the current draft content or the fresh sources given (if any).",
    "The article must keep matching this site's standardized template for its category — its field rules are",
    "  the house style. Only deviate where the editor's instruction explicitly asks for something different.",
    QUALITY_RULES,
    "Output ONLY a single JSON object matching the exact schema in the user message. No prose outside JSON.",
  ].join(" ");

  const user = `
ARTICLE TEMPLATE for this category:
${renderTemplateForPrompt(template)}

CURRENT DRAFT:
${JSON.stringify(
  {
    title: draft.title,
    summary: draft.summary,
    lead: draft.lead,
    articleSections: draft.articleSections,
    origin: draft.origin,
    history: draft.history,
    culturalSignificance: draft.culturalSignificance,
    legacy: draft.legacy,
    examples: draft.examples,
    timeline: draft.timeline,
    tags: draft.tags,
  },
  null,
  2,
)}

EDITOR INSTRUCTION: "${feedback}"

${freshSourceBlock ? `FRESH SOURCE EXCERPTS (use these to ground the requested change):\n${freshSourceBlock}` : ""}

Return a single JSON object with EXACTLY this shape:
{
  "title": string,
  "summary": string,
  "lead": string,
  "articleSections": [{ "id": string, "heading": string, "body": string }],
  "origin": string,
  "history": string,
  "culturalSignificance": string,
  "legacy": string,
  "examples": string[],
  "timeline": [{ "date": string, "event": string }],
  "tags": string[],
  "changeSummary": string (one short sentence describing what you changed)
}
`.trim();

  const result = await callGroqJSON<GroqRevisionShape>(system, user, {
    temperature: 0.3,
    maxTokens: 7000,
  });

  const now = new Date().toISOString();
  const next: DraftPackage = {
    ...draft,
    title: result.title || draft.title,
    summary: result.summary || draft.summary,
    lead: result.lead || draft.lead,
    articleSections: result.articleSections?.length
      ? result.articleSections
      : draft.articleSections,
    origin: result.origin ?? draft.origin,
    history: result.history ?? draft.history,
    culturalSignificance: result.culturalSignificance ?? draft.culturalSignificance,
    legacy: result.legacy ?? draft.legacy,
    examples: result.examples?.length ? result.examples : draft.examples,
    timeline: result.timeline?.length ? result.timeline : draft.timeline,
    tags: result.tags?.length ? result.tags : draft.tags,
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
