/**
 * Real Draft generation — replaces the simulated Knowledge Engine research
 * pass with actual network calls, for editors who have configured free
 * API keys (GROQ_API_KEY, TAVILY_API_KEY).
 *
 * Pipeline:
 *   1. Tavily  — real web search for overview / origin / recent-activity sources
 *   2. Groq    — drafts every DraftPackage field, grounded ONLY in the
 *                fetched source excerpts (never the model's own memory)
 *   3. Wikimedia Commons — real, license-clean featured image
 *   4. scoreFromEvidence (existing, already-real Maintenance methodology)
 *                — Cultural Scores from actual live evidence, not a
 *                  hardcoded baseline
 *
 * Falls back to the caller when GROQ_API_KEY / TAVILY_API_KEY are unset,
 * or when any stage throws — the simulated pipeline in createArticle.ts
 * remains the safety net so Draft Studio never hard-fails.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type {
  DraftPackage,
  DraftArticleSection,
  SuggestedSourceItem,
  SuggestedMediaItem,
} from "@/lib/ai/packages";
import type { BaseEntry, Scores } from "@/types";
import { callGroqJSON, isGroqConfigured } from "@/lib/ai/providers/groqReal";
import {
  isTavilyConfigured,
  tavilySearchMany,
  type TavilyResult,
} from "@/lib/ai/research/tavilySearch";
import { findWikimediaMediaSet } from "@/lib/ai/research/wikimediaMedia";
import { findYouTubeThumbnail } from "@/lib/ai/research/youtubeThumbnail";
import { coolGradientForCategory } from "@/lib/media/coolGradient";
import {
  getArticleTemplate,
  renderTemplateForPrompt,
} from "@/lib/content/articleTemplates";
import { researchDynamicSignals } from "@/lib/dynamicMetadata/researchDynamicSignals";
import {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
} from "@/lib/dynamicMetadata/scoreFromEvidence";

export function isRealGenerationConfigured(): boolean {
  return isGroqConfigured() && isTavilyConfigured();
}

// ─── Grounded prompt ────────────────────────────────────────────────────────

const SCORE_RUBRIC = `
Cultural Scores — score 0-100, reasoning BEFORE the number, grounded only in
the source excerpts provided. These are starting suggestions; the site's own
live-evidence engine (Wikipedia pageviews, etc.) will refine them afterward,
so accuracy here matters more than optimism.

Current Popularity — how much people are posting/discussing this RIGHT NOW
(last 30-60 days), NOT historical fame. A dead meme with huge historical
reach scores LOW here if nobody's making new content about it today.
  Anchors: 90+ = flood of new posts/uploads right now. 50 = occasional
  mentions. 15 = essentially dormant.

Influence — how permanently this shaped internet culture. Stable, not tied
to current activity. Anchors: 90+ = reshaped how people communicate online
(e.g. a format everyone still riffs on). 40 = a footnote most people forgot.

Cringe — how socially embarrassing / awkward this is perceived today, not
your personal opinion. Anchors: 80+ = widely mocked or seen as try-hard.
20 = neutral/unremarkable, not associated with embarrassment.

Brainrot — absurdity, chaotic short-form remix energy, Gen Alpha /
ironic-internet-humor character. NOT the same as popularity. Anchors:
Skibidi Toilet-tier absurdist/surreal short-form content = 90-100. A
straightforward news event or normal slang term = 10-25.
`.trim();

function buildSystemPrompt(): string {
  return [
    "You are the drafting engine for Internet Culture Hub, an encyclopedia of internet culture.",
    "You write ONLY from the source excerpts given to you. Never invent facts, dates, quotes, or numbers.",
    "If the sources don't establish something (e.g. exact origin date), say so plainly instead of guessing.",
    "Write for a curious teenager: the first two sentences of every section should be immediately clear.",
    "Prose should teach — explain what it is, why people cared, why it spread, why it's remembered.",
    "Never mention Know Your Meme by name as a public source even if you used it for research context.",
    "You MUST follow the article template given in the user message exactly — its field rules, focus, and",
    "  good/bad examples are this site's house style, applied consistently across every article of this category.",
    "  Treat each field's rule as a hard constraint, not a suggestion: word/sentence limits are limits, not targets",
    "  to aim near. Match every 'Good' example's style and length; never produce something closer to a 'Bad' example.",
    "  Only deviate from it if the editor's own prompt explicitly asks for something different.",
    "The card description/summary field is always ONE short sentence and must never duplicate, trim, or lightly",
    "  reword the lead paragraph — they are two different pieces of writing serving two different places on the page.",
    "Output ONLY a single JSON object matching the exact schema in the user message. No prose outside JSON.",
  ].join(" ");
}

function buildUserPrompt(input: {
  topic: string;
  category: AIDraftCategory;
  sources: TavilyResult[];
}): string {
  const sourceBlock = input.sources
    .slice(0, 10)
    .map(
      (s, i) =>
        `[${i + 1}] ${s.title} — ${s.url}\n${s.content.slice(0, 600)}`,
    )
    .join("\n\n");

  const template = getArticleTemplate(input.category);

  return `
Topic: ${input.topic}

ARTICLE TEMPLATE (this site's standardized template for this category — follow it exactly):
${renderTemplateForPrompt(template)}

SOURCE EXCERPTS (this is your only allowed factual basis):
${sourceBlock || "(no sources found — say so in every field rather than inventing content)"}

${SCORE_RUBRIC}

Return a single JSON object with EXACTLY this shape:
{
  "title": string,
  "slugSuggestion": string (kebab-case),
  "summary": string (EXACTLY one short sentence, max ~25 words, ending in a period — the card caption. It must summarize the article in fresh wording of its own; it must NOT be the same sentence as "lead" or a trimmed copy of it),
  "lead": string (opening paragraph, visitor-facing — this is the fuller intro; write it as a separate piece of prose from "summary", not summary's source sentence repeated),
  "articleSections": [
    { "id": "origin", "heading": "Origin", "body": string },
    { "id": "history", "heading": "History", "body": string },
    { "id": "cultural-impact", "heading": "Cultural Impact", "body": string },
    { "id": "examples", "heading": "Examples", "body": string }
  ],
  "origin": string,
  "history": string,
  "culturalSignificance": string,
  "legacy": string,
  "examples": string[] (2-5 concrete, specific examples — not vague),
  "timeline": [{ "date": string, "event": string }] (only events sources actually support, [] if none),
  "aliases": string[],
  "tags": string[] (3-8 lowercase tags),
  "seoMetadata": { "metaTitle": string, "metaDescription": string (<=160 chars), "primaryKeyword": string },
  "culturalScores": { "relevance": number, "influence": number, "cringe": number, "brainrot": number },
  "scoreReasoning": { "relevance": string, "influence": string, "cringe": string, "brainrot": string }
}
`.trim();
}

interface GroqDraftShape {
  title: string;
  slugSuggestion: string;
  summary: string;
  lead: string;
  articleSections: DraftArticleSection[];
  origin: string;
  history: string;
  culturalSignificance: string;
  legacy: string;
  examples: string[];
  timeline: Array<{ date: string; event: string }>;
  aliases: string[];
  tags: string[];
  seoMetadata: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
  };
  culturalScores: Scores;
  scoreReasoning: Record<keyof Scores, string>;
}

// ─── Real evidence-based scoring (reuses the Maintenance methodology) ──────

// Exported so Maintenance Update/Edit can share the exact same live-evidence
// scoring methodology as Draft Studio and Maintenance Refresh, instead of a
// separate offline/legacy path — see lib/admin/articleUpdate/createUpdate.ts.
export async function scoreFromRealEvidence(input: {
  topic: string;
  category: AIDraftCategory;
  tags: string[];
  sourceUrls: string[];
  groqSuggestion: Scores;
}): Promise<{ scores: Scores; evidenceNotes: string[] }> {
  // Build a synthetic BaseEntry so we can run the SAME live-evidence
  // providers (Wikipedia pageviews, etc.) that Maintenance uses on
  // published articles — a brand-new draft deserves the same rigor.
  const slug = input.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const now = new Date().toISOString();
  const syntheticEntry: BaseEntry = {
    id: `draft_${slug}`,
    slug,
    title: input.topic,
    category: input.category,
    description: input.topic,
    trendDirection: "new",
    addedAt: now,
    scores: input.groqSuggestion,
    tags: input.tags,
    sources: input.sourceUrls.map((url, i) => ({
      id: `src_${i}`,
      title: url,
      url,
    })),
    views: 0,
    imageGradient: coolGradientForCategory(input.category),
  };

  try {
    const bundle = await researchDynamicSignals(syntheticEntry);
    const suggestion = scoreDynamicMetadata(bundle, {
      tags: input.tags,
      previousScores: input.groqSuggestion,
    });
    // Influence and Cringe/Brainrot fall back to Groq's grounded read when
    // live evidence has nothing to say (a brand-new topic often won't have
    // Wikipedia pageview history yet) — only Relevance clears to 0 on
    // "unknown" by the existing methodology, which is correct: don't claim
    // current popularity you have no live evidence for.
    const merged = suggestScoresFromSignals(input.groqSuggestion, suggestion);
    return { scores: merged, evidenceNotes: suggestion.evidenceNotes };
  } catch (err) {
    // Live evidence is a bonus, not a requirement — keep Groq's grounded
    // estimate rather than failing the whole draft.
    return {
      scores: input.groqSuggestion,
      evidenceNotes: [
        `Live evidence scoring unavailable (${err instanceof Error ? err.message : "unknown error"}) — using source-grounded estimate only.`,
      ],
    };
  }
}

// ─── Main entry point ───────────────────────────────────────────────────────

export interface RealGenerationInput {
  topic: string;
  category: AIDraftCategory;
  /** Original free-form prompt, for search-query context. */
  rawPrompt: string;
}

export interface RealGenerationResult {
  draft: Omit<
    DraftPackage,
    "id" | "createdAt" | "updatedAt" | "status" | "revision" | "feedbackHistory" | "editorNotes"
  >;
  evidenceNotes: string[];
  sourcesUsed: number;
  mediaFound: boolean;
}

/**
 * Run the full real pipeline. Throws on hard failure (missing keys, Groq
 * error, unparseable output) — callers should catch and fall back to the
 * simulated pipeline rather than surface a raw error to the editor.
 */
export async function generateRealDraft(
  input: RealGenerationInput,
): Promise<RealGenerationResult> {
  if (!isRealGenerationConfigured()) {
    throw new Error(
      "Real generation not configured (missing GROQ_API_KEY or TAVILY_API_KEY).",
    );
  }

  // 1. Real research — three angles, since one query rarely covers
  //    definition + origin + current activity well.
  const sources = await tavilySearchMany([
    `${input.topic} meaning origin`,
    `${input.topic} internet culture history`,
    `${input.topic} 2026`,
  ]);

  // 2. Real drafting, grounded in what was actually found.
  const groqOutput = await callGroqJSON<GroqDraftShape>(
    buildSystemPrompt(),
    buildUserPrompt({ topic: input.topic, category: input.category, sources }),
    { temperature: 0.35 },
  );

  // 3. Real media (Wikimedia first, targeted YouTube search fallback —
  //    matches the site's own documented source priority). Wikimedia is an
  //    encyclopedia media repo, not a meme archive — it legitimately has
  //    nothing for most modern memes/slang/brainrot topics, so the YouTube
  //    fallback actively searches (not just scans the 3 general-purpose
  //    research queries, which rarely happen to surface a YouTube link).
  const wikimediaMedia = await findWikimediaMediaSet(
    input.topic,
    input.category,
  ).catch(() => []);
  let mediaSuggestions = wikimediaMedia;
  if (mediaSuggestions.length === 0) {
    const ytSources = await tavilySearchMany(
      [`${input.topic} youtube`, `${input.topic} video`],
      { includeDomains: ["youtube.com", "youtu.be"], maxResults: 5 },
    ).catch(() => []);
    const candidateUrls = [
      ...ytSources.map((s) => s.url),
      ...sources.map((s) => s.url),
    ];
    const ytThumb = await findYouTubeThumbnail(candidateUrls).catch(() => null);
    if (ytThumb) mediaSuggestions = [ytThumb];
  }
  const media: SuggestedMediaItem[] = mediaSuggestions.map((m) => ({
    role: m.role,
    type: m.type ?? "image",
    url: m.url,
    title: m.title,
    source: m.source,
    searchHint: m.searchHint,
    verified: false,
  }));

  // 4. Real evidence-based scores (Maintenance methodology, not a guess).
  const { scores, evidenceNotes } = await scoreFromRealEvidence({
    topic: input.topic,
    category: input.category,
    tags: groqOutput.tags ?? [],
    sourceUrls: sources.map((s) => s.url),
    groqSuggestion: groqOutput.culturalScores,
  });

  const suggestedSources: SuggestedSourceItem[] = sources.slice(0, 8).map((s) => ({
    title: s.title,
    url: s.url,
    domain: (() => {
      try {
        return new URL(s.url).hostname.replace(/^www\./, "");
      } catch {
        return undefined;
      }
    })(),
  }));

  const draft: RealGenerationResult["draft"] = {
    title: groqOutput.title || input.topic,
    slugSuggestion:
      groqOutput.slugSuggestion ||
      input.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: input.category,
    summary: groqOutput.summary,
    lead: groqOutput.lead,
    articleSections: groqOutput.articleSections ?? [],
    origin: groqOutput.origin ?? "",
    history: groqOutput.history ?? "",
    timeline: groqOutput.timeline ?? [],
    examples: groqOutput.examples ?? [],
    culturalSignificance: groqOutput.culturalSignificance ?? "",
    legacy: groqOutput.legacy ?? "",
    relatedTopics: [],
    aliases: groqOutput.aliases?.length ? groqOutput.aliases : [input.topic],
    tags: groqOutput.tags?.length ? groqOutput.tags : [input.category],
    categoryFields: {},
    suggestedCulturalScores: scores,
    suggestedMedia: media,
    suggestedSources,
    seoMetadata: groqOutput.seoMetadata,
  };

  return {
    draft,
    evidenceNotes,
    sourcesUsed: sources.length,
    mediaFound: media.length > 0,
  };
}
