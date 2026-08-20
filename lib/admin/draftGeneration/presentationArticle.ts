/**
 * PresentationArticle — visitor-facing article model for preview.
 * Strips all editorial / research / AI metadata before render.
 */

import type { DraftPackage } from "@/lib/ai/packages";
import type { BaseEntry, EntrySource, MediaItem, MediaPlatform } from "@/types";
import {
  isPreferredPublicSourceUrl,
  publicSourceLabel,
  sanitizePublicProse,
  writeCardCaption,
  writeEncyclopediaLead,
  writeOriginProse,
  writePublicExamples,
  writePublicTimeline,
} from "./encyclopediaProse";
import { normalizeDraftPackage } from "./normalizeDraft";

export interface PresentationSection {
  id: string;
  heading: string;
  body: string;
}

export interface PresentationArticle {
  title: string;
  slug: string;
  category: DraftPackage["category"];
  /** Hero description */
  description: string;
  /** Lead under hero (meme meaning / intro) */
  lead: string;
  /** Slang-style definition card when category is slang */
  definition?: string;
  sections: PresentationSection[];
  timeline: Array<{ date: string; event: string }>;
  examples: string[];
  relatedTitles: string[];
  media: MediaItem[];
  sources: EntrySource[];
  entry: BaseEntry;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    path: string;
  };
}

/**
 * Build a presentation article directly from the LIVE published entry,
 * only overlaying the specific fields a scoped update actually changes.
 * Unlike draftPackageToPresentationArticle, this never fabricates scores,
 * tags, media, or a definition/meaning/impact — everything not explicitly
 * overridden is exactly what's already live, so this preview shows exactly
 * what Approve will actually produce.
 */
export function liveEntryToPresentationArticle(
  live: BaseEntry,
  overrides: {
    description?: string;
    origin?: string;
    timeline?: Array<{ date: string; event: string }>;
  } = {},
): PresentationArticle {
  const e = live as BaseEntry & {
    meaning?: string;
    definition?: string;
    impact?: string;
    legacy?: string;
    timeline?: Array<{ date: string; event: string }>;
    examples?: string[];
    usageExamples?: string[];
    highlights?: string[];
  };

  const description = overrides.description ?? live.description ?? "";
  const origin = overrides.origin ?? live.origin ?? "";
  const timeline = overrides.timeline ?? e.timeline ?? [];
  // The definition-equivalent field is never touched by a scoped update —
  // always the live value, exactly as stored.
  const definition = e.definition ?? e.meaning ?? e.impact;

  const sections: PresentationSection[] = [];
  if (origin) sections.push({ id: "origin", heading: "Origin", body: origin });
  if (e.legacy) sections.push({ id: "legacy", heading: "Legacy", body: e.legacy });

  const path = `/${categoryListPath(live.category)}/${live.slug}`;

  return {
    title: live.title,
    slug: live.slug,
    category: live.category,
    description,
    lead: description,
    definition,
    sections,
    timeline: timeline.map((t) => ({ date: t.date, event: t.event })),
    examples: e.examples ?? e.usageExamples ?? e.highlights ?? [],
    relatedTitles: [],
    media: live.media ?? [],
    sources: live.sources ?? [],
    entry: { ...live, description, origin },
    seo: {
      metaTitle: `${live.title} | Internet Culture Hub`,
      metaDescription: description.slice(0, 160),
      path,
    },
  };
}

function categoryListPath(category: DraftPackage["category"]): string {
  if (category === "creator") return "people";
  if (category === "event") return "events";
  if (category === "trend") return "trending";
  return `${category}s`;
}

function toMediaItem(
  item: NonNullable<DraftPackage["suggestedMedia"]>[number],
  fallbackTitle: string,
): MediaItem | null {
  if (!item.url?.trim()) return null;
  const platform: MediaPlatform =
    item.url.includes("youtube.com") || item.url.includes("youtu.be")
      ? "youtube"
      : item.url.includes("wikimedia.org")
        ? "wikimedia"
        : item.url.includes("knowyourmeme.com")
          ? "knowyourmeme"
          : "other";

  const title = sanitizePublicProse(item.title) || fallbackTitle;
  const sourceName =
    sanitizePublicProse(item.source ?? "") ||
    publicSourceLabel(title, item.url);

  return {
    role: item.role,
    type: item.type,
    url: item.url,
    title,
    source: sourceName,
    sourceUrl: item.url,
    platform,
    // Omit duplicate attribution — AttributionBar already shows source.
    verified: false,
  };
}

/**
 * Convert a DraftPackage into a presentation-only article.
 * Safe to render with public encyclopedia components.
 */
export function draftPackageToPresentationArticle(
  raw: DraftPackage,
): PresentationArticle {
  const draft = normalizeDraftPackage(raw);
  const title = sanitizePublicProse(draft.title) || "Untitled";
  const lead = writeEncyclopediaLead({
    title,
    category: draft.category,
    summary: draft.lead || draft.summary,
    aliases: draft.aliases,
  });
  // Card caption is deliberately derived separately from the lead — it must
  // always be one short sentence and must never just echo the lead paragraph.
  const caption = writeCardCaption({
    title,
    category: draft.category,
    summary: draft.summary,
    lead,
    aliases: draft.aliases,
  });
  const timeline = writePublicTimeline(draft.timeline ?? []);
  const examples = writePublicExamples(draft.examples ?? []);

  const sections: PresentationSection[] = [];

  // Origin only shows when there's real content — like every other
  // section (Legacy, Cultural Impact, etc.), so it can genuinely be
  // removed/shortened via AI Edit instead of always reappearing with
  // filler placeholder text.
  const originContent = sanitizePublicProse(draft.origin ?? "");
  const origin = originContent || writeOriginProse(title, draft.origin);
  if (originContent) {
    sections.push({ id: "origin", heading: "Origin", body: originContent });
  }

  for (const s of draft.articleSections ?? []) {
    if (s.id === "origin") continue; // already added from field
    const heading = sanitizePublicProse(s.heading);
    const body = sanitizePublicProse(s.body);
    if (!heading || !body) continue;
    if (body === origin) continue;
    sections.push({ id: s.id, heading, body });
  }

  // Ensure cultural impact / legacy from fields if sections omitted them
  const impact = sanitizePublicProse(draft.culturalSignificance);
  if (impact && !sections.some((s) => s.id === "cultural-impact")) {
    sections.push({
      id: "cultural-impact",
      heading: "Cultural impact",
      body: impact,
    });
  }
  const legacy = sanitizePublicProse(draft.legacy);
  if (legacy && !sections.some((s) => s.id === "legacy")) {
    sections.push({ id: "legacy", heading: "Legacy", body: legacy });
  }

  const suggestedMedia = draft.suggestedMedia ?? [];
  const suggestedSources = draft.suggestedSources ?? [];
  const tags = draft.tags ?? [];
  const relatedTopics = draft.relatedTopics ?? [];

  const media = suggestedMedia
    .map((m) => toMediaItem(m, title))
    .filter((m): m is MediaItem => m !== null);

  const sources: EntrySource[] = suggestedSources
    .filter((s) => s.url && isPreferredPublicSourceUrl(s.url))
    .map((s) => ({
      title: publicSourceLabel(s.title, s.url),
      url: s.url,
      domain: s.domain,
    }));

  const path = `/${categoryListPath(draft.category)}/${draft.slugSuggestion}`;
  const scores = draft.suggestedCulturalScores ?? {};

  const entry: BaseEntry = {
    id: draft.id,
    slug: draft.slugSuggestion,
    title,
    category: draft.category,
    description: caption,
    imageGradient: "from-zinc-800 via-zinc-900 to-black",
    scores: {
      relevance: scores.relevance ?? 50,
      influence: scores.influence ?? 45,
      brainrot: scores.brainrot ?? 30,
      cringe: scores.cringe ?? 25,
    },
    addedAt: new Date().toISOString().slice(0, 10),
    views: 0,
    trendDirection: "new",
    tags: tags.map((t) => sanitizePublicProse(t)).filter(Boolean),
    media,
    sources,
  };

  return {
    title,
    slug: draft.slugSuggestion,
    category: draft.category,
    description: caption,
    lead,
    definition: draft.category === "slang" ? lead : undefined,
    sections,
    timeline,
    examples,
    relatedTitles: relatedTopics
      .map((t) => sanitizePublicProse(t))
      .filter(Boolean),
    media,
    sources,
    entry,
    seo: {
      metaTitle:
        sanitizePublicProse(draft.seoMetadata?.metaTitle ?? "") ||
        `${title} | Internet Culture Hub`,
      metaDescription:
        sanitizePublicProse(draft.seoMetadata?.metaDescription ?? "") ||
        lead.slice(0, 160),
      path,
    },
  };
}
