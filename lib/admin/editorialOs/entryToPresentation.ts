/**
 * Map a live BaseEntry into PresentationArticle for identical preview rendering.
 */

import type { BaseEntry } from "@/types";
import type { PresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import type { AIDraftCategory } from "@/lib/ai/types";

export function entryToPresentationArticle(entry: BaseEntry): PresentationArticle {
  const category = entry.category as AIDraftCategory;
  const lead = entry.description;
  const origin =
    "origin" in entry && typeof (entry as { origin?: string }).origin === "string"
      ? (entry as { origin: string }).origin
      : entry.description;

  const examples =
    "examples" in entry && Array.isArray((entry as { examples?: string[] }).examples)
      ? ((entry as { examples: string[] }).examples)
      : "usageExamples" in entry &&
          Array.isArray((entry as { usageExamples?: string[] }).usageExamples)
        ? (entry as { usageExamples: string[] }).usageExamples
        : [];

  const timelineRaw =
    "timeline" in entry && Array.isArray((entry as { timeline?: unknown[] }).timeline)
      ? (
          entry as {
            timeline: Array<{ date?: string; event?: string; when?: string; what?: string }>;
          }
        ).timeline
      : [];

  const timeline = timelineRaw
    .map((t) => ({
      date: t.date ?? t.when ?? "",
      event: t.event ?? t.what ?? "",
    }))
    .filter((t) => t.date && t.event);

  const sections: PresentationArticle["sections"] = [
    { id: "origin", heading: "Origin", body: origin },
  ];

  return {
    title: entry.title,
    slug: entry.slug,
    category,
    description: lead,
    lead,
    definition: category === "slang" ? lead : undefined,
    sections,
    timeline,
    examples,
    relatedTitles: entry.relatedSlugs ?? [],
    media: entry.media ?? [],
    sources: entry.sources ?? [],
    entry,
  };
}
