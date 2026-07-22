/**
 * Mock AI revision: DraftPackage + editor feedback → updated DraftPackage.
 * No providers — heuristic edits that feel like a revision loop.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type { DraftPackage } from "@/lib/ai/packages";

const CATEGORIES: AIDraftCategory[] = [
  "meme",
  "slang",
  "trend",
  "brainrot",
  "event",
  "creator",
];

function detectCategoryChange(feedback: string): AIDraftCategory | null {
  const lower = feedback.toLowerCase();
  for (const cat of CATEGORIES) {
    if (
      lower.includes(`to ${cat}`) ||
      lower.includes(`as ${cat}`) ||
      lower.includes(`category ${cat}`) ||
      lower.includes(`change category to ${cat}`)
    ) {
      return cat;
    }
  }
  return null;
}

/**
 * Apply natural-language editor feedback to a draft (mock AI).
 */
export function reviseDraftWithFeedback(
  draft: DraftPackage,
  feedback: string,
): DraftPackage {
  const trimmed = feedback.trim();
  if (!trimmed) {
    throw new Error("reviseDraftWithFeedback: feedback is required");
  }

  const changes: string[] = [];
  const next: DraftPackage = structuredClone(draft);

  const newCategory = detectCategoryChange(trimmed);
  if (newCategory && newCategory !== next.category) {
    next.category = newCategory;
    next.tags = [
      newCategory,
      ...next.tags.filter((t) => t !== draft.category),
    ];
    changes.push(`Updated category to ${newCategory}`);
    next.articleSections = next.articleSections.map((s) =>
      s.id === "what-it-is"
        ? {
            ...s,
            body: s.body.replace(
              /classified here as \w+/,
              `classified here as ${newCategory}`,
            ),
          }
        : s,
    );
  }

  if (/timeline/i.test(trimmed)) {
    next.timeline = [
      ...next.timeline,
      {
        date: "Editor revision",
        event: `Timeline expanded per feedback: ${trimmed.slice(0, 120)}`,
      },
    ];
    const historySection = next.articleSections.find((s) => s.id === "history");
    if (historySection) {
      historySection.body += ` Additional timeline detail requested by the editor has been noted for verification.`;
    }
    changes.push("Expanded timeline detail");
  }

  if (/tiktok/i.test(trimmed)) {
    const impact = next.articleSections.find((s) => s.id === "cultural-impact");
    if (impact && !/TikTok/i.test(impact.body)) {
      impact.body +=
        " TikTok accelerated mainstream visibility through short-form remix and sound-driven distribution.";
    }
    if (!next.tags.includes("tiktok")) next.tags = [...next.tags, "tiktok"];
    changes.push("Emphasized TikTok influence");
  }

  if (/remove|inaccurate|wrong|incorrect/i.test(trimmed)) {
    next.articleSections = next.articleSections.map((s) => ({
      ...s,
      body: `${s.body} (Editor flag: review contested claims — ${trimmed.slice(0, 80)})`,
    }));
    changes.push("Flagged inaccurate or contested claims for correction");
  }

  if (/add (a )?section|new section/i.test(trimmed)) {
    const topicMatch =
      trimmed.match(/about\s+(.+?)[.!]?$/i) ||
      trimmed.match(/explaining\s+(.+?)[.!]?$/i);
    const topic = topicMatch?.[1]?.trim() || "requested topic";
    next.articleSections = [
      ...next.articleSections,
      {
        id: `section_${Date.now().toString(36)}`,
        heading: topic.charAt(0).toUpperCase() + topic.slice(1),
        body: `This section was added from editor feedback. It should explain ${topic} in encyclopedia style, grounded in verified sources before publish.`,
      },
    ];
    changes.push(`Added section about ${topic}`);
  }

  if (changes.length === 0) {
    next.lead = `${next.lead} Revised with editor guidance: ${trimmed.slice(0, 160)}`;
    const overview = next.articleSections[0];
    if (overview) {
      overview.body += ` Editor feedback applied: ${trimmed}`;
    }
    changes.push("Incorporated general editorial feedback into the lead and overview");
  }

  if (next.seoMetadata) {
    next.seoMetadata = {
      ...next.seoMetadata,
      metaDescription: next.lead.slice(0, 160),
    };
  }

  const at = new Date().toISOString();
  next.revision = (next.revision ?? 0) + 1;
  next.feedbackHistory = [
    ...(next.feedbackHistory ?? []),
    {
      id: `fb_${Date.now().toString(36)}`,
      at,
      feedback: trimmed,
      changeSummary: changes.join("; "),
    },
  ];

  return next;
}
