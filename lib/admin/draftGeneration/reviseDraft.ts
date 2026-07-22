/**
 * Mock AI revision: rewrite encyclopedia prose from editor feedback.
 * Feedback is an instruction — never copied into visitor-facing fields.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type { DraftPackage } from "@/lib/ai/packages";
import {
  parseEditorInstructions,
  stripInstructionFromProse,
} from "@/lib/ai/knowledgeEngine/parseEditorInstructions";
import {
  sanitizePublicProse,
  writeEncyclopediaLead,
  writeImpactProse,
  writeOriginProse,
} from "./encyclopediaProse";

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

function scrubDraftProse(
  draft: DraftPackage,
  instruction?: string,
): DraftPackage {
  const next = structuredClone(draft);
  const clean = (value: string) =>
    sanitizePublicProse(stripInstructionFromProse(value, instruction)) ||
    sanitizePublicProse(value) ||
    "";

  next.lead = clean(next.lead) || next.lead;
  next.summary = clean(next.summary) || next.summary;
  next.origin = clean(next.origin) || next.origin;
  next.culturalSignificance = clean(next.culturalSignificance);
  next.legacy = clean(next.legacy);
  next.articleSections = next.articleSections
    .map((s) => ({
      ...s,
      heading: sanitizePublicProse(s.heading) || s.heading,
      body: clean(s.body),
    }))
    .filter((s) => s.body.length > 0);
  next.timeline = next.timeline
    .map((t) => ({
      date: sanitizePublicProse(t.date),
      event: clean(t.event),
    }))
    .filter((t) => t.date && t.event);
  next.examples = next.examples.map((e) => clean(e)).filter(Boolean);
  return next;
}

function expandSectionBody(
  title: string,
  heading: string,
  current: string,
): string {
  const base = sanitizePublicProse(current) || current.trim();
  const extra = `${heading} continues to shape how ${title} is discussed online, with later references building on the earliest documented uses.`;
  if (base.includes(extra.slice(0, 40))) return base;
  return `${base} ${extra}`.trim();
}

/**
 * Apply natural-language editor feedback to a draft (mock AI writer).
 * Parses feedback into revision intents — never appends the instruction text.
 */
export function reviseDraftWithFeedback(
  draft: DraftPackage,
  feedback: string,
): DraftPackage {
  const trimmed = feedback.trim();
  if (!trimmed) {
    throw new Error("reviseDraftWithFeedback: feedback is required");
  }

  const directives = parseEditorInstructions({
    text: trimmed,
    topicFallback: draft.title,
  });

  const changes: string[] = [];
  let next = scrubDraftProse(draft, trimmed);

  const newCategory =
    detectCategoryChange(trimmed) ?? directives.categoryHint ?? null;
  if (newCategory && newCategory !== next.category) {
    next.category = newCategory;
    next.tags = [
      newCategory,
      ...next.tags.filter((t) => t !== draft.category),
    ];
    next.lead = writeEncyclopediaLead({
      title: next.title,
      category: newCategory,
      summary: next.lead,
      aliases: next.aliases,
    });
    next.summary = next.lead;
    changes.push(`Updated category to ${newCategory}`);
  }

  const intents = directives.revisionIntents;
  const wants = (kind: string) => intents.some((i) => i.kind === kind);

  if (wants("expand_history") || /timeline/i.test(trimmed)) {
    const yearHint = trimmed.match(/\b(19|20)\d{2}\b/)?.[0];
    if (yearHint) {
      next.timeline = [
        ...next.timeline,
        {
          date: yearHint,
          event: `${next.title} gained wider attention around this period.`,
        },
      ];
      changes.push("Expanded timeline");
    }
    const history = next.articleSections.find(
      (s) => s.id === "cultural-impact" || /history/i.test(s.heading),
    );
    const seed =
      writeImpactProse(next.title, next.culturalSignificance, next.tags) ||
      `${next.title} spread through online communities as people reused and remixed the idea.`;
    if (history) {
      history.body = expandSectionBody(next.title, "Its history", history.body || seed);
      next.culturalSignificance = history.body;
    } else {
      const body = expandSectionBody(next.title, "Its history", seed);
      next.articleSections.push({
        id: "cultural-impact",
        heading: "Cultural impact",
        body,
      });
      next.culturalSignificance = body;
    }
    changes.push("Expanded history section");
  }

  if (wants("expand_origin") || (/origin/i.test(trimmed) && !wants("expand_history"))) {
    next.origin = expandSectionBody(
      next.title,
      "Its origin",
      writeOriginProse(next.title, next.origin),
    );
    const originSection = next.articleSections.find((s) => s.id === "origin");
    if (originSection) originSection.body = next.origin;
    changes.push("Expanded origin section");
  }

  if (
    /origin/i.test(trimmed) &&
    /unknown|unclear|unconfirmed/i.test(trimmed)
  ) {
    next.origin = writeOriginProse(next.title, "");
    const originSection = next.articleSections.find((s) => s.id === "origin");
    if (originSection) originSection.body = next.origin;
    changes.push("Clarified origin wording");
  }

  if (wants("rewrite_intro") || wants("neutral_tone")) {
    next.lead = writeEncyclopediaLead({
      title: next.title,
      category: next.category,
      summary: "",
      aliases: next.aliases,
    });
    next.summary = next.lead;
    changes.push(
      wants("neutral_tone")
        ? "Neutralized introduction tone"
        : "Rewrote introduction",
    );
  }

  if (wants("reduce_repetition")) {
    const seen = new Set<string>();
    next.articleSections = next.articleSections.filter((s) => {
      const key = s.body.slice(0, 80).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    changes.push("Reduced repetitive sections");
  }

  if (/tiktok/i.test(trimmed)) {
    const impact = next.articleSections.find((s) => s.id === "cultural-impact");
    const sentence =
      "Short-form platforms such as TikTok helped carry the subject into wider circulation through remix and rapid sharing.";
    if (impact && !/TikTok/i.test(impact.body)) {
      impact.body = `${impact.body} ${sentence}`.trim();
    } else if (!impact) {
      next.articleSections.push({
        id: "cultural-impact",
        heading: "Cultural impact",
        body: sentence,
      });
      next.culturalSignificance = sentence;
    }
    if (!next.tags.includes("tiktok")) next.tags = [...next.tags, "tiktok"];
    changes.push("Emphasized TikTok influence");
  }

  if (wants("add_source") || /add (another |a |more )?source/i.test(trimmed)) {
    changes.push("Source expansion noted for research re-run");
  }

  if (wants("better_media") || /hero image|featured image|better (image|media)/i.test(trimmed)) {
    changes.push("Media refresh noted for research re-run");
  }

  if (/add (a )?section|new section/i.test(trimmed)) {
    const topicMatch =
      trimmed.match(/about\s+(.+?)[.!]?$/i) ||
      trimmed.match(/explaining\s+(.+?)[.!]?$/i);
    const topicRaw = topicMatch?.[1] ?? "";
    const topic =
      sanitizePublicProse(stripInstructionFromProse(topicRaw, trimmed)) ||
      "related context";
    const heading = topic.charAt(0).toUpperCase() + topic.slice(1);
    next.articleSections = [
      ...next.articleSections,
      {
        id: `section_${Date.now().toString(36)}`,
        heading,
        body: `${heading} is part of how ${next.title} is understood in internet culture.`,
      },
    ];
    changes.push(`Added section: ${heading}`);
  }

  if (wants("expand_section") && changes.length === 0) {
    const first = next.articleSections[0];
    if (first) {
      first.body = expandSectionBody(next.title, first.heading, first.body);
      changes.push(`Expanded ${first.heading}`);
    }
  }

  // Never append instruction text into lead/summary as a fallback
  if (changes.length === 0) {
    changes.push("Applied revision intents without altering core prose");
  }

  next = scrubDraftProse(next, trimmed);

  // Final gate: instruction must not appear in any public field
  const leaked = [
    next.lead,
    next.summary,
    next.origin,
    ...next.articleSections.map((s) => s.body),
  ].some(
    (field) =>
      field &&
      trimmed.length >= 8 &&
      field.toLowerCase().includes(trimmed.toLowerCase().slice(0, 40)),
  );
  if (leaked) {
    next.lead = writeEncyclopediaLead({
      title: next.title,
      category: next.category,
      summary: "",
      aliases: next.aliases,
    });
    next.summary = next.lead;
    next.articleSections = next.articleSections.map((s) => ({
      ...s,
      body: stripInstructionFromProse(s.body, trimmed) || s.body,
    }));
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
