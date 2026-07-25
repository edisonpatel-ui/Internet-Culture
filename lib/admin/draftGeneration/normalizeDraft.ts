/**
 * Normalize + sanitize DraftPackage for visitor-facing fields.
 * Never backfills with pending/TODO placeholder copy.
 */

import type { DraftPackage } from "@/lib/ai/packages";
import {
  sanitizePublicProse,
  writeEncyclopediaLead,
  writeOriginProse,
  writePublicExamples,
  writePublicTimeline,
} from "./encyclopediaProse";

export function normalizeDraftPackage(draft: DraftPackage): DraftPackage {
  const title = sanitizePublicProse(draft.title) || draft.title || "Untitled";
  const lead =
    sanitizePublicProse(draft.lead) ||
    sanitizePublicProse(draft.summary) ||
    writeEncyclopediaLead({
      title,
      category: draft.category,
      aliases: draft.aliases,
    });

  const origin = writeOriginProse(title, draft.origin);
  const timeline = writePublicTimeline(draft.timeline);
  const examples = writePublicExamples(draft.examples ?? []);

  let articleSections = (draft.articleSections ?? [])
    .map((s) => ({
      id: s.id,
      heading: sanitizePublicProse(s.heading) || s.heading,
      body: sanitizePublicProse(s.body),
    }))
    .filter((s) => s.body.length > 0);

  if (articleSections.length === 0) {
    articleSections = [
      { id: "origin", heading: "Origin", body: origin },
      {
        id: "cultural-impact",
        heading: "Cultural impact",
        body: sanitizePublicProse(draft.culturalSignificance),
      },
      {
        id: "legacy",
        heading: "Legacy",
        body: sanitizePublicProse(draft.legacy),
      },
    ].filter((s) => s.body.length > 0);
  }

  // Ensure Origin exists
  if (!articleSections.some((s) => s.id === "origin")) {
    articleSections = [
      { id: "origin", heading: "Origin", body: origin },
      ...articleSections,
    ];
  }

  return {
    ...draft,
    title,
    lead,
    summary: lead,
    origin,
    history: timeline.map((t) => `${t.date}: ${t.event}`).join("\n"),
    timeline,
    examples,
    articleSections,
    culturalSignificance: sanitizePublicProse(draft.culturalSignificance),
    legacy: sanitizePublicProse(draft.legacy),
    relatedTopics: (draft.relatedTopics ?? [])
      .map((t) => sanitizePublicProse(t))
      .filter(Boolean),
    aliases: (draft.aliases ?? [])
      .map((a) => sanitizePublicProse(a))
      .filter(Boolean),
    tags: (draft.tags ?? [])
      .map((t) => sanitizePublicProse(t))
      .filter(Boolean),
    suggestedMedia: draft.suggestedMedia ?? [],
    suggestedSources: draft.suggestedSources ?? [],
    feedbackHistory: draft.feedbackHistory ?? [],
    revision: draft.revision ?? 0,
    categoryFields: {},
  };
}
