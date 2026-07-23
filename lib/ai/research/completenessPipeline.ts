/**
 * Research integrity pipeline.
 *
 * REQUIRED fields may block article generation.
 * OPTIONAL fields become "Unknown" after exhaust-all stages — never Research Failed.
 */

import type {
  ResearchPackage,
  ResearchPossibleIssue,
  ResearchSourceRef,
  ResearchTimelineItem,
} from "@/lib/ai/packages";
import type {
  CompletenessSection,
  ResearchCompletenessReport,
  ResearchConclusionNote,
  UndeterminedField,
} from "./completenessTypes";
import {
  COMPLETENESS_SECTIONS,
  OPTIONAL_SECTIONS,
  REQUIRED_SECTIONS,
  SECTION_LABELS,
  UNKNOWN_SENTINEL,
  isUnknownSentinel,
} from "./completenessTypes";
import {
  buildEditorialDecisions,
  decisionsNeedingEditorAction,
  formatConfidencePercent,
} from "./editorialDecisions";
import { discoverMediaSuggestions } from "@/lib/admin/research/intelligence/mediaDiscovery";

const PASS_LABELS = [
  "collect",
  "resolve-conflicts",
  "ground-required-unknown-optional",
  "improve-structure",
  "metadata-links-seo-media",
  "integrity-check",
] as const;

const DEFAULT_SOURCES_SEARCHED = [
  "dictionaries (Merriam-Webster / Oxford / Cambridge / Dictionary.com / Wiktionary)",
  "internet culture (Know Your Meme / Wikipedia)",
  "official / platform / creator pages",
  "archives (Internet Archive)",
  "journalism leads",
  "ICH encyclopedia",
];

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

/** Detect fabricated / scaffolding prose (not the Unknown sentinel). */
export function looksFabricated(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  if (isUnknownSentinel(t)) return false;
  return (
    /to be researched|scaffolding only|incomplete|must be confirmed|human must|placeholder|under editorial research|replace with verified|internet-culture subject with documented circulation|functions as shared cultural shorthand|contemporary social \/ short-form era|early 2020s short-form|spread phase|mainstream notice|encyclopedia framing|shaped online conversation through remix|pending stronger primary|working origin pending|major social and short-form platforms|mock —/i.test(
      t,
    ) ||
    t === "approx" ||
    /^c\. early 2020s$/i.test(t)
  );
}

function hasUrl(url?: string): boolean {
  return Boolean(url?.trim() && /^https?:\/\//i.test(url.trim()));
}

function groundedSources(sources: ResearchSourceRef[]): ResearchSourceRef[] {
  return sources.filter((s) => hasUrl(s.url));
}

function groundedTimeline(
  timeline: ResearchTimelineItem[],
): ResearchTimelineItem[] {
  return timeline.filter(
    (t) =>
      t.what.trim() &&
      !isUnknownSentinel(t.when) &&
      !looksFabricated(t.what) &&
      t.when.trim() &&
      !looksFabricated(t.when) &&
      !/^approx|spread phase|mainstream notice|encyclopedia framing$/i.test(
        t.when.trim(),
      ),
  );
}

function stripFabricatedProse(text: string): string {
  if (isUnknownSentinel(text)) return UNKNOWN_SENTINEL;
  if (!text.trim() || looksFabricated(text)) return "";
  return text.replace(/\s+/g, " ").trim();
}

function markUnknown(
  field: CompletenessSection,
  reason: string,
  sourcesSearched: string[] = DEFAULT_SOURCES_SEARCHED,
): UndeterminedField {
  return {
    field,
    label: SECTION_LABELS[field],
    required: REQUIRED_SECTIONS.includes(field),
    reason,
    sourcesSearched,
  };
}

function evaluateCompleteness(
  pkg: ResearchPackage,
  groundedFromEvidence: CompletenessSection[],
  undetermined: UndeterminedField[],
  escalations: ResearchConclusionNote[],
  passesCompleted: string[],
): ResearchCompletenessReport {
  const completed: CompletenessSection[] = [];
  const urlSources = groundedSources(pkg.sources);
  const timeline = groundedTimeline(pkg.timeline);
  const mediaWithUrl = pkg.mediaSuggestions.filter((m) => hasUrl(m.url));
  const hasEntity = Boolean(pkg.topic?.trim() || pkg.title?.trim());
  const hasTitle = Boolean(pkg.title?.trim());
  const hasSummary =
    Boolean(pkg.summary.trim()) &&
    !looksFabricated(pkg.summary) &&
    !isUnknownSentinel(pkg.summary);
  const hasOrigin =
    Boolean(pkg.origin.trim()) &&
    !looksFabricated(pkg.origin) &&
    !isUnknownSentinel(pkg.origin);
  const hasImpact =
    Boolean(pkg.culturalImpact.trim()) &&
    !looksFabricated(pkg.culturalImpact) &&
    !isUnknownSentinel(pkg.culturalImpact);

  const checks: Array<[CompletenessSection, boolean]> = [
    ["entity", hasEntity],
    ["title", hasTitle],
    ["lead", hasSummary],
    ["summary", hasSummary],
    ["category", Boolean(pkg.categoryRecommendation)],
    ["slug", Boolean(pkg.slugSuggestion?.trim())],
    ["origin", hasOrigin],
    ["timeline", timeline.length >= 1],
    ["culturalSignificance", hasImpact],
    ["relatedEntries", pkg.relatedEntries.length > 0],
    [
      "aliases",
      pkg.aliases.filter((a) => a.toLowerCase() !== pkg.title.toLowerCase())
        .length > 0,
    ],
    ["sources", urlSources.length >= 1],
    ["mediaSuggestions", mediaWithUrl.length >= 1],
    [
      "seoMetadata",
      Boolean(
        pkg.seoHints?.metaTitle &&
          pkg.seoHints?.metaDescription &&
          hasSummary,
      ),
    ],
  ];

  for (const [section, ok] of checks) {
    if (ok) completed.push(section);
  }

  const requiredMissing = REQUIRED_SECTIONS.filter(
    (s) => !completed.includes(s),
  );
  // Research Failed ONLY when minimum required package cannot be produced
  const researchFailed = requiredMissing.length > 0;
  const score = completed.length / COMPLETENESS_SECTIONS.length;
  const readyForEditor = !researchFailed;

  return {
    readyForEditor,
    researchFailed,
    score,
    completedSections: completed,
    groundedFromEvidence: [...new Set(groundedFromEvidence)],
    undetermined,
    requiredMissing,
    passesCompleted,
    escalations,
  };
}

/**
 * Integrity pass: ground required fields; set optional gaps to Unknown.
 */
export function runCompletenessPipeline(input: ResearchPackage): ResearchPackage {
  const groundedFromEvidence: CompletenessSection[] = [];
  const undetermined: UndeterminedField[] = [];
  const conclusionNotes: ResearchConclusionNote[] = [];
  const passesCompleted: string[] = [];

  const pkg: ResearchPackage = structuredClone(input);
  passesCompleted.push(PASS_LABELS[0]);

  if (pkg.conflictingInformation.length > 0) {
    pkg.researchNotes = [
      ...pkg.researchNotes,
      ...pkg.conflictingInformation.map(
        (c) =>
          `Unresolved conflict (not auto-settled with fabricated certainty): ${c}`,
      ),
    ];
    conclusionNotes.push({
      field: "origin",
      confidence: "low",
      reasoning:
        "Conflicting origin claims exist. Exact origin left Unknown rather than inventing a winner.",
      escalateToEditor: false,
    });
  }
  passesCompleted.push(PASS_LABELS[1]);

  // Entity / title (required)
  if (pkg.title?.trim() || pkg.topic?.trim()) {
    if (!pkg.title?.trim()) pkg.title = pkg.topic.trim();
    if (!pkg.topic?.trim()) pkg.topic = pkg.title.trim();
    groundedFromEvidence.push("entity", "title");
  } else {
    undetermined.push(
      markUnknown(
        "entity",
        "Knowledge Engine could not confidently identify the canonical topic.",
      ),
    );
    undetermined.push(
      markUnknown("title", "No title could be resolved for this topic."),
    );
  }

  // Summary / basic explanation (required)
  pkg.summary = stripFabricatedProse(pkg.summary);
  if (pkg.summary && !isUnknownSentinel(pkg.summary)) {
    groundedFromEvidence.push("summary", "lead");
  } else {
    // After exhaust-all: Unknown — not empty, not fabricated.
    pkg.summary = UNKNOWN_SENTINEL;
    undetermined.push(
      markUnknown(
        "summary",
        "No verified basic explanation available after exhausting research stages.",
      ),
    );
  }

  // Origin — OPTIONAL exact date/window
  pkg.origin = stripFabricatedProse(pkg.origin);
  if (pkg.origin && !isUnknownSentinel(pkg.origin)) {
    groundedFromEvidence.push("origin");
  } else {
    pkg.origin = UNKNOWN_SENTINEL;
    undetermined.push(
      markUnknown(
        "origin",
        "Exact origin date / creator window could not be determined. Set to Unknown.",
      ),
    );
  }

  // Cultural impact — OPTIONAL
  pkg.culturalImpact = stripFabricatedProse(pkg.culturalImpact);
  if (pkg.culturalImpact && !isUnknownSentinel(pkg.culturalImpact)) {
    groundedFromEvidence.push("culturalSignificance");
  } else {
    pkg.culturalImpact = UNKNOWN_SENTINEL;
    undetermined.push(
      markUnknown(
        "culturalSignificance",
        "Complete cultural impact could not be grounded. Set to Unknown.",
      ),
    );
  }

  // Timeline — OPTIONAL full chronology
  pkg.timeline = groundedTimeline(pkg.timeline);
  if (pkg.timeline.length >= 1) {
    groundedFromEvidence.push("timeline");
  } else {
    pkg.timeline = [
      {
        when: UNKNOWN_SENTINEL,
        what: "Exact chronology could not be determined after exhausting research stages.",
      },
    ];
    undetermined.push(
      markUnknown(
        "timeline",
        "Full timeline could not be built from dated evidence. Set to Unknown.",
      ),
    );
  }

  // Sources — REQUIRED (minimum trustworthy)
  pkg.sources = groundedSources(pkg.sources);
  if (pkg.sources.length >= 1) {
    groundedFromEvidence.push("sources");
  } else {
    undetermined.push(
      markUnknown(
        "sources",
        "No sources with stable http(s) URLs. Minimum trustworthy citations are required.",
      ),
    );
  }

  // Related — OPTIONAL
  pkg.relatedEntries = pkg.relatedEntries.filter(
    (r) =>
      r.title.trim() &&
      !looksFabricated(r.title) &&
      !/^meme formats$/i.test(r.title) &&
      !isUnknownSentinel(r.title),
  );
  if (pkg.relatedEntries.length > 0) {
    groundedFromEvidence.push("relatedEntries");
  } else {
    undetermined.push(
      markUnknown(
        "relatedEntries",
        "Related encyclopedia targets could not be verified. Left empty (Unknown enrichment).",
      ),
    );
  }

  pkg.platforms = pkg.platforms.filter(
    (p) => p.trim() && !looksFabricated(p) && !isUnknownSentinel(p),
  );

  // Aliases — title itself is fine; extra aliases optional
  if (pkg.aliases.length === 0 && pkg.title.trim()) {
    pkg.aliases = [pkg.title];
  }
  const extraAliases = pkg.aliases.filter(
    (a) => a.toLowerCase() !== pkg.title.toLowerCase(),
  );
  if (extraAliases.length > 0) {
    groundedFromEvidence.push("aliases");
  } else {
    undetermined.push(
      markUnknown(
        "aliases",
        "No additional verified aliases beyond the title. Set enrichment to Unknown.",
      ),
    );
  }

  pkg.notableMoments = pkg.notableMoments.filter(
    (m) => m.trim() && !looksFabricated(m) && !isUnknownSentinel(m),
  );
  if (pkg.notableMoments.length === 0 && groundedTimeline(pkg.timeline).length > 0) {
    pkg.notableMoments = pkg.timeline
      .filter((t) => !isUnknownSentinel(t.when))
      .slice(0, 3)
      .map((t) => `${t.when}: ${t.what}`);
  }

  // Category — REQUIRED
  if (pkg.categoryRecommendation) {
    const catConfidence: ResearchConclusionNote["confidence"] =
      pkg.confidence >= 0.7 ? "high" : pkg.confidence >= 0.45 ? "medium" : "low";
    if (!pkg.categoryReasoning.trim() || looksFabricated(pkg.categoryReasoning)) {
      pkg.categoryReasoning = `Category "${pkg.categoryRecommendation}" from research signals.`;
    }
    conclusionNotes.push({
      field: "category",
      confidence: catConfidence,
      reasoning: pkg.categoryReasoning,
      escalateToEditor: catConfidence === "low",
    });
    groundedFromEvidence.push("category");
  } else {
    undetermined.push(
      markUnknown(
        "category",
        "Category could not be determined with confidence.",
      ),
    );
  }

  passesCompleted.push(PASS_LABELS[2]);
  passesCompleted.push(PASS_LABELS[3]);

  // Slug — REQUIRED (deterministic from title)
  if (pkg.title.trim()) {
    const slugSuggestion = pkg.slugSuggestion?.trim() || slugify(pkg.title);
    pkg.slugSuggestion = slugSuggestion;
    groundedFromEvidence.push("slug");
  } else {
    undetermined.push(
      markUnknown("slug", "Slug cannot be generated without a title."),
    );
  }

  // Media — OPTIONAL
  const discovered = discoverMediaSuggestions({
    title: pkg.title,
    slug: pkg.slugSuggestion,
    existing: pkg.mediaSuggestions,
    sourceUrls: pkg.sources
      .map((s) => s.url)
      .filter((u): u is string => Boolean(u)),
  });
  pkg.mediaSuggestions = discovered.filter((m) => hasUrl(m.url));
  if (pkg.mediaSuggestions.length >= 1) {
    groundedFromEvidence.push("mediaSuggestions");
  } else {
    undetermined.push(
      markUnknown(
        "mediaSuggestions",
        "No representative media URL found. Gradient fallback OK — verified:false preferred when a candidate exists.",
        [
          "Wikimedia / curated assets",
          "YouTube thumbnails",
          "ICH encyclopedia media",
          "Trusted reference pages",
        ],
      ),
    );
  }

  // SEO — OPTIONAL enrichment
  if (
    pkg.summary &&
    !looksFabricated(pkg.summary) &&
    !isUnknownSentinel(pkg.summary)
  ) {
    pkg.seoHints = {
      metaTitle: `${pkg.title} | Internet Culture Hub`,
      metaDescription: pkg.summary.slice(0, 160),
      primaryKeyword: pkg.title.toLowerCase(),
      secondaryKeywords: pkg.aliases.slice(0, 5).map((a) => a.toLowerCase()),
    };
    groundedFromEvidence.push("seoMetadata");
  } else {
    pkg.seoHints = undefined;
    undetermined.push(
      markUnknown(
        "seoMetadata",
        "Additional SEO enrichment withheld without a grounded summary.",
      ),
    );
  }

  const optionalUnknowns = undetermined.filter((u) => !u.required);
  pkg.researchNotes = [
    ...pkg.researchNotes.filter((n) => !looksFabricated(n)),
    "Integrity pipeline: required fields gate readiness; optional gaps are Unknown.",
    ...(optionalUnknowns.length
      ? optionalUnknowns.map(
          (u) => `Unknown [${u.label ?? u.field}]: ${u.reason}`,
        )
      : ["No optional Unknown fields."]),
  ];
  pkg.missingInformation = undetermined.map(
    (u) => `${u.required ? "REQUIRED" : "OPTIONAL"} ${u.field}: ${u.reason}`,
  );
  passesCompleted.push(PASS_LABELS[4]);

  const escalations = conclusionNotes.filter((n) => n.escalateToEditor);
  const completeness = evaluateCompleteness(
    pkg,
    groundedFromEvidence,
    undetermined,
    escalations,
    [...passesCompleted, PASS_LABELS[5]],
  );

  const confidence = completeness.readyForEditor
    ? Math.min(0.92, Math.max(pkg.confidence, 0.55))
    : Math.min(pkg.confidence, 0.35);

  const draftForDecisions: ResearchPackage = {
    ...pkg,
    confidence,
    conclusionNotes,
    completeness: {
      ...completeness,
      passesCompleted: [...passesCompleted, PASS_LABELS[5]],
    },
    conflictingInformation: pkg.conflictingInformation,
    possibleIssues: [],
  };

  let editorialDecisions = buildEditorialDecisions(draftForDecisions);
  let possibleIssues: ResearchPossibleIssue[] = [];

  if (completeness.researchFailed) {
    possibleIssues = undetermined
      .filter((u) => u.required)
      .map((u, i) => ({
        id: `required_missing_${u.field}_${i}`,
        title: `Required missing: ${u.label ?? u.field}`,
        description: u.reason,
        severity: "critical" as const,
        area: u.field,
      }));
    editorialDecisions = editorialDecisions.map((d) => ({
      ...d,
      autoAccepted: false,
      ifNoAction:
        "Minimum required research package is incomplete — cannot generate article until required fields are grounded.",
    }));
  } else {
    const needingAction = decisionsNeedingEditorAction(editorialDecisions);
    possibleIssues = needingAction.map((d) => ({
      id: d.id,
      title: `${d.label}: AI recommends ${d.recommendation.label} (${formatConfidencePercent(d.confidence)})`,
      description: d.reasoning,
      severity: "critical" as const,
      area: d.kind,
    }));
  }

  void OPTIONAL_SECTIONS;

  return {
    ...draftForDecisions,
    editorialDecisions,
    possibleIssues,
  };
}
