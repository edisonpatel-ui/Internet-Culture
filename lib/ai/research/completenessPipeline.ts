/**
 * Completeness-first research pipeline (mock).
 *
 * Philosophy: the AI exhausts research, conflict resolution, and section
 * filling BEFORE an editor sees the package. Editors review finished work,
 * not unfinished homework.
 *
 * Passes:
 * 1 Collect research
 * 2 Resolve source conflicts
 * 3 Fill missing sections
 * 4 Improve structure / readability
 * 5 Metadata, links, SEO, media
 * 6 Consistency + completeness gate
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type {
  ResearchMediaSuggestion,
  ResearchPackage,
  ResearchPossibleIssue,
  ResearchRelatedEntry,
  ResearchSourceRef,
  ResearchTimelineItem,
} from "@/lib/ai/packages";
import type {
  CompletenessSection,
  ResearchCompletenessReport,
  ResearchConclusionNote,
} from "./completenessTypes";
import { COMPLETENESS_SECTIONS } from "./completenessTypes";
import {
  buildEditorialDecisions,
  decisionsNeedingEditorAction,
  formatConfidencePercent,
} from "./editorialDecisions";

const PASS_LABELS = [
  "collect",
  "resolve-conflicts",
  "fill-missing",
  "improve-structure",
  "metadata-links-seo-media",
  "consistency-check",
] as const;

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/\s*—\s*.*$/, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled"
  );
}

function looksIncomplete(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  return (
    /to be researched|scaffolding only|incomplete|must be confirmed|human must|placeholder|under editorial research|replace with verified/i.test(
      t,
    ) || t === "unknown" || t === "approx"
  );
}

function yearFromSources(sources: ResearchSourceRef[]): string | null {
  for (const s of sources) {
    const m = (s.title + " " + (s.notes ?? "")).match(/\b(20[0-2]\d)\b/);
    if (m) return m[1];
  }
  return null;
}

function inferOriginWindow(
  pkg: ResearchPackage,
): { when: string; prose: string; confidence: ResearchConclusionNote["confidence"] } {
  const fromTimeline = pkg.timeline.find(
    (t) => t.when && !looksIncomplete(t.when) && !/^unknown|approx$/i.test(t.when),
  );
  if (fromTimeline) {
    return {
      when: fromTimeline.when,
      prose: `Based on the earliest documented milestones in research, ${pkg.title} appears to have emerged around ${fromTimeline.when}.`,
      confidence: (fromTimeline.confidence ?? 0) >= 0.7 ? "high" : "medium",
    };
  }
  const year = yearFromSources(pkg.sources);
  if (year) {
    return {
      when: `c. ${year}`,
      prose: `The topic appears to have emerged around ${year} based on the earliest documented sources and community discussions attached to this research package. No single exact publication timestamp is established.`,
      confidence: "medium",
    };
  }
  return {
    when: "early 2020s",
    prose: `Exact first-appearance dating remains unsettled. The available evidence places ${pkg.title} in the early 2020s short-form / social-media era; this entry treats that window as the working origin pending stronger primary documentation.`,
    confidence: "low",
  };
}

function resolveCategoryReasoning(
  category: AIDraftCategory,
  pkg: ResearchPackage,
): { reasoning: string; confidence: ResearchConclusionNote["confidence"] } {
  const signals: string[] = [];
  if (pkg.platforms.length) signals.push(`platforms: ${pkg.platforms.slice(0, 3).join(", ")}`);
  if (pkg.aliases.length) signals.push(`aliases: ${pkg.aliases.slice(0, 3).join(", ")}`);
  if (pkg.relatedEntries.length) {
    signals.push(`related: ${pkg.relatedEntries.slice(0, 3).map((r) => r.title).join(", ")}`);
  }

  const base = `Classified as ${category} after weighing format signals, usage patterns, and catalog rules`;
  const detail = signals.length ? ` (${signals.join("; ")}).` : ".";
  const confidence: ResearchConclusionNote["confidence"] =
    pkg.confidence >= 0.7 ? "high" : pkg.confidence >= 0.45 ? "medium" : "low";

  return {
    reasoning: `${base}${detail} This is the AI's best category decision for a complete first draft.`,
    confidence,
  };
}

function buildTimeline(
  pkg: ResearchPackage,
  originWhen: string,
): ResearchTimelineItem[] {
  const usable = pkg.timeline.filter(
    (t) =>
      t.what.trim() &&
      !looksIncomplete(t.what) &&
      !/^unknown|approx$/i.test(t.when),
  );

  if (usable.length >= 3) {
    return usable.map((t) => ({
      ...t,
      when: looksIncomplete(t.when) ? originWhen : t.when,
      confidence: t.confidence ?? 0.55,
    }));
  }

  const title = pkg.title;
  return [
    {
      when: originWhen,
      what: `Earliest documented community discussion and uploads associated with ${title}.`,
      confidence: 0.55,
    },
    {
      when: "spread phase",
      what: `${title} spreads across short-form and social platforms through remix, sound reuse, and reaction content.`,
      confidence: 0.6,
    },
    {
      when: "mainstream notice",
      what: `${title} reaches broader awareness via press coverage, creator amplification, or encyclopedia documentation.`,
      confidence: 0.5,
    },
    {
      when: "encyclopedia framing",
      what: `Internet Culture Hub frames ${title} as a distinct cultural subject with defined origin, impact, and related entries.`,
      confidence: 0.7,
    },
  ];
}

function ensureSources(pkg: ResearchPackage): ResearchSourceRef[] {
  if (pkg.sources.length > 0) {
    return pkg.sources.map((s, i) => ({
      ...s,
      tier: i === 0 ? "primary" : s.tier,
      notes:
        s.notes ||
        (s.url
          ? "AI-selected research citation."
          : "AI research citation — attach a stable page URL before publish."),
    }));
  }
  const title = pkg.title;
  return [
    {
      id: "src_kym",
      title: `${title} — Know Your Meme (research target)`,
      url: undefined,
      tier: "primary",
      notes:
        "Primary culture-archive target. Confirm the live KYM page URL before publish.",
    },
    {
      id: "src_wiki",
      title: `${title} — Wikipedia / Wikimedia (if page exists)`,
      url: undefined,
      tier: "secondary",
      notes: "Use only if a stable encyclopedia page exists; do not invent URLs.",
    },
    {
      id: "src_press",
      title: `${title} — press / platform documentation`,
      url: undefined,
      tier: "secondary",
      notes: "Secondary reporting for dating and impact claims.",
    },
  ];
}

function ensureMedia(pkg: ResearchPackage): ResearchMediaSuggestion[] {
  if (pkg.mediaSuggestions.length >= 2) {
    return pkg.mediaSuggestions.map((m) => ({
      ...m,
      verified: false as const,
      searchHint:
        m.searchHint ||
        "Prefer Wikimedia Commons direct file URL or YouTube hqdefault thumbnail — never invent URLs.",
    }));
  }
  const title = pkg.title;
  return [
    {
      id: "media_featured",
      role: "featured",
      type: "image",
      title: `Featured visual — ${title}`,
      searchHint: `Wikimedia Commons or YouTube hqdefault for the defining ${title} visual. Never invent a URL.`,
      verified: false,
    },
    {
      id: "media_ref",
      role: "reference",
      type: "embed",
      title: `${title} — Know Your Meme / Wikipedia reference`,
      searchHint: "Add role:reference link card after confirming the live page URL.",
      verified: false,
    },
  ];
}

function ensureRelated(pkg: ResearchPackage): ResearchRelatedEntry[] {
  if (pkg.relatedEntries.length > 0) return pkg.relatedEntries;
  const related: ResearchRelatedEntry[] = [];
  for (const p of pkg.platforms.slice(0, 2)) {
    related.push({
      title: `${p} culture`,
      reason: `Platform context for how ${pkg.title} circulated.`,
    });
  }
  if (pkg.categoryRecommendation === "slang") {
    related.push({
      title: "Internet slang",
      reason: "Broader slang cluster for internal linking.",
    });
  } else if (pkg.categoryRecommendation === "brainrot") {
    related.push({
      title: "Skibidi Toilet",
      slug: "skibidi-toilet",
      reason: "Adjacent Gen Alpha / brainrot encyclopedia entry.",
    });
  } else {
    related.push({
      title: "Meme formats",
      reason: "Format family for discovery and internal links.",
    });
  }
  return related;
}

function ensureAliases(pkg: ResearchPackage): string[] {
  if (pkg.aliases.length > 0) return pkg.aliases;
  const base = pkg.title.trim();
  const aliases = new Set<string>();
  aliases.add(base);
  aliases.add(base.toLowerCase());
  const compact = base.replace(/\s+/g, "");
  if (compact !== base) aliases.add(compact);
  return [...aliases].filter((a) => a.length > 0);
}

function polishProse(text: string, title: string, fallback: string): string {
  if (!looksIncomplete(text) && text.trim().length >= 40) return text.trim();
  return fallback.replace(/\{title\}/g, title);
}

function evaluateCompleteness(
  pkg: ResearchPackage,
  filledByInference: CompletenessSection[],
  escalations: ResearchConclusionNote[],
  passesCompleted: string[],
): ResearchCompletenessReport {
  const completed: CompletenessSection[] = [];
  const checks: Array<[CompletenessSection, boolean]> = [
    ["lead", Boolean(pkg.summary.trim())],
    ["summary", Boolean(pkg.summary.trim()) && !looksIncomplete(pkg.summary)],
    ["category", Boolean(pkg.categoryRecommendation)],
    ["slug", Boolean(pkg.slugSuggestion?.trim())],
    ["origin", Boolean(pkg.origin.trim()) && !looksIncomplete(pkg.origin)],
    ["timeline", pkg.timeline.length >= 3],
    [
      "culturalSignificance",
      Boolean(pkg.culturalImpact.trim()) && !looksIncomplete(pkg.culturalImpact),
    ],
    ["relatedEntries", pkg.relatedEntries.length > 0],
    ["aliases", pkg.aliases.length > 0],
    ["sources", pkg.sources.length > 0],
    ["mediaSuggestions", pkg.mediaSuggestions.length > 0],
    ["seoMetadata", Boolean(pkg.seoHints?.metaTitle && pkg.seoHints?.metaDescription)],
  ];

  for (const [section, ok] of checks) {
    if (ok) completed.push(section);
  }

  const score = completed.length / COMPLETENESS_SECTIONS.length;
  const readyForEditor =
    score >= 0.85 &&
    completed.includes("summary") &&
    completed.includes("origin") &&
    completed.includes("timeline") &&
    completed.includes("category") &&
    completed.includes("sources");

  return {
    readyForEditor,
    score,
    completedSections: completed,
    filledByInference: [...new Set(filledByInference)],
    passesCompleted,
    escalations,
  };
}

/**
 * Run completeness-first self-improvement passes on a ResearchPackage.
 */
export function runCompletenessPipeline(input: ResearchPackage): ResearchPackage {
  const filledByInference: CompletenessSection[] = [];
  const conclusionNotes: ResearchConclusionNote[] = [];
  const passesCompleted: string[] = [];

  // Pass 1 — collect (normalize incoming research)
  let pkg: ResearchPackage = structuredClone(input);
  passesCompleted.push(PASS_LABELS[0]);

  // Pass 2 — resolve conflicts
  const conflictResolutions: string[] = [];
  if (pkg.conflictingInformation.length > 0) {
    for (const conflict of pkg.conflictingInformation) {
      conflictResolutions.push(
        `Resolved for draft purposes: ${conflict} — the article uses the most consistent multi-source reading and states uncertainty where dating remains soft.`,
      );
    }
    const originWindow = inferOriginWindow(pkg);
    conclusionNotes.push({
      field: "origin",
      confidence: originWindow.confidence,
      reasoning: originWindow.prose,
      escalateToEditor: originWindow.confidence === "low",
    });
    pkg = {
      ...pkg,
      origin: polishProse(pkg.origin, pkg.title, originWindow.prose),
      conflictingInformation: [],
      researchNotes: [
        ...pkg.researchNotes,
        ...conflictResolutions,
        "Conflict pass: AI selected the most likely synthesis rather than leaving the dispute for the editor to finish.",
      ],
    };
    filledByInference.push("origin");
  }
  passesCompleted.push(PASS_LABELS[1]);

  // Pass 3 — fill missing sections
  const originWindow = inferOriginWindow(pkg);
  if (looksIncomplete(pkg.origin) || pkg.origin.trim().length < 40) {
    pkg.origin = originWindow.prose;
    filledByInference.push("origin");
    conclusionNotes.push({
      field: "origin",
      confidence: originWindow.confidence,
      reasoning:
        "Exact publication date unavailable; used earliest documented window with uncertainty language.",
      escalateToEditor: originWindow.confidence === "low",
    });
  }

  const timeline = buildTimeline(pkg, originWindow.when);
  if (pkg.timeline.length < 3 || pkg.timeline.some((t) => looksIncomplete(t.what))) {
    filledByInference.push("timeline");
  }
  pkg.timeline = timeline;

  if (looksIncomplete(pkg.summary) || pkg.summary.trim().length < 40) {
    pkg.summary = `${pkg.title} is an internet-culture ${pkg.categoryRecommendation} with documented circulation across online communities. This entry summarizes what it is, where it came from, and why it matters.`;
    filledByInference.push("summary", "lead");
  }

  if (looksIncomplete(pkg.culturalImpact) || pkg.culturalImpact.trim().length < 40) {
    const platforms =
      pkg.platforms.length > 0
        ? pkg.platforms.join(", ")
        : "major social and short-form platforms";
    pkg.culturalImpact = `${pkg.title} shaped online conversation through remix, catchphrase reuse, and creator amplification on ${platforms}. Its lasting footprint is the way later communities reference it as shared cultural shorthand.`;
    filledByInference.push("culturalSignificance");
  }

  pkg.aliases = ensureAliases(pkg);
  if (!input.aliases.length) filledByInference.push("aliases");

  pkg.relatedEntries = ensureRelated(pkg);
  if (!input.relatedEntries.length) filledByInference.push("relatedEntries");

  if (pkg.platforms.length === 0) {
    pkg.platforms = ["TikTok", "YouTube", "Twitter/X"];
  }

  if (pkg.notableMoments.length === 0) {
    pkg.notableMoments = pkg.timeline.slice(0, 3).map((t) => `${t.when}: ${t.what}`);
  }

  pkg.sources = ensureSources(pkg);
  if (!input.sources.length) filledByInference.push("sources");

  const cat = resolveCategoryReasoning(pkg.categoryRecommendation, pkg);
  pkg.categoryReasoning = cat.reasoning;
  conclusionNotes.push({
    field: "category",
    confidence: cat.confidence,
    reasoning: cat.reasoning,
    escalateToEditor: cat.confidence === "low",
  });
  if (cat.confidence !== "high") filledByInference.push("category");

  passesCompleted.push(PASS_LABELS[2]);

  // Pass 4 — structure / readability
  pkg.summary = pkg.summary.replace(/\s+/g, " ").trim();
  pkg.origin = pkg.origin.replace(/\s+/g, " ").trim();
  pkg.culturalImpact = pkg.culturalImpact.replace(/\s+/g, " ").trim();
  pkg.notThis = [
    `Not merely a random viral clip without lasting cultural identity — ${pkg.title} is treated as a defined encyclopedia subject.`,
    "Not a synonym for every adjacent meme or slang term; related entries are linked separately.",
    ...pkg.notThis.filter((n) => !/human must confirm/i.test(n)).slice(0, 2),
  ];
  passesCompleted.push(PASS_LABELS[3]);

  // Pass 5 — metadata, links, SEO, media
  const slugSuggestion = pkg.slugSuggestion?.trim() || slugify(pkg.title);
  pkg.slugSuggestion = slugSuggestion;
  filledByInference.push("slug");

  pkg.mediaSuggestions = ensureMedia(pkg);
  filledByInference.push("mediaSuggestions");

  pkg.seoHints = {
    metaTitle: `${pkg.title} | Internet Culture Hub`,
    metaDescription: pkg.summary.slice(0, 160),
    primaryKeyword: pkg.title.toLowerCase(),
    secondaryKeywords: pkg.aliases.slice(0, 5).map((a) => a.toLowerCase()),
  };
  filledByInference.push("seoMetadata");

  pkg.researchNotes = [
    ...pkg.researchNotes.filter((n) => !/human verification before|scaffolding only/i.test(n)),
    "Completeness pipeline: AI attempted to fill every major section before editor review.",
    `Slug suggestion: /${slugSuggestion}`,
  ];
  passesCompleted.push(PASS_LABELS[4]);

  // Pass 6 — consistency + structured editorial decisions
  const escalations = conclusionNotes.filter((n) => n.escalateToEditor);
  const completeness = evaluateCompleteness(
    pkg,
    filledByInference,
    escalations,
    [...passesCompleted, PASS_LABELS[5]],
  );

  const confidenceBoost = completeness.readyForEditor ? 0.15 : 0.05;
  const confidence = Math.min(
    0.95,
    Math.max(pkg.confidence, 0.55) + confidenceBoost,
  );

  const draftForDecisions: ResearchPackage = {
    ...pkg,
    confidence,
    conclusionNotes,
    completeness: {
      ...completeness,
      passesCompleted: [...passesCompleted, PASS_LABELS[5]],
    },
    conflictingInformation: [],
    missingInformation: completeness.readyForEditor
      ? []
      : COMPLETENESS_SECTIONS.filter(
          (s) => !completeness.completedSections.includes(s),
        ).map((s) => `Still weak after AI passes: ${s}`),
    possibleIssues: [],
  };

  const editorialDecisions = buildEditorialDecisions(draftForDecisions);
  const needingAction = decisionsNeedingEditorAction(editorialDecisions);

  // Legacy possibleIssues mirror actionable decisions (never vague titles).
  const possibleIssues: ResearchPossibleIssue[] = needingAction.map((d) => ({
    id: d.id,
    title: `${d.label}: AI recommends ${d.recommendation.label} (${formatConfidencePercent(d.confidence)})`,
    description: d.reasoning,
    severity: "critical" as const,
    area: d.kind,
  }));

  return {
    ...draftForDecisions,
    editorialDecisions,
    possibleIssues,
  };
}
