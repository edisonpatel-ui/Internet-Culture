/**
 * Mock AI article generator: ApprovedResearch → complete DraftPackage.
 * Grounded on completeness-first research — no blank homework sections.
 */

import type {
  ApprovedResearch,
  DraftArticleSection,
  DraftPackage,
} from "@/lib/ai/packages";

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

function domainFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function buildArticleSections(
  approved: ApprovedResearch,
): DraftArticleSection[] {
  const pkg = approved.researchPackage;
  const title = pkg.title;
  const category = approved.categoryDecision;
  const platforms =
    pkg.platforms.length > 0
      ? pkg.platforms.join(", ")
      : "major social platforms";
  const related =
    pkg.relatedEntries.length > 0
      ? pkg.relatedEntries.map((r) => r.title).join(", ")
      : "adjacent internet-culture topics";

  const timelineProse =
    pkg.timeline.length > 0
      ? pkg.timeline.map((t) => `${t.when}: ${t.what}`).join(" ")
      : `${title} emerged in the contemporary social-media era and spread through remix and creator amplification.`;

  const mediumNotes = (pkg.conclusionNotes ?? [])
    .filter((n) => n.confidence === "medium")
    .map((n) => n.reasoning)
    .slice(0, 2)
    .join(" ");

  const resolutions =
    approved.resolvedIssues.length > 0
      ? ` Editorial notes: ${approved.resolvedIssues
          .map((i) => i.resolutionNote)
          .join(" ")}`
      : "";

  const writing =
    approved.editorNotes.length > 0
      ? ` ${approved.editorNotes.join(" ")}`
      : "";

  const aliases =
    pkg.aliases.length > 0
      ? ` Also known as ${pkg.aliases.slice(0, 4).join(", ")}.`
      : "";

  return [
    {
      id: "what-it-is",
      heading: "What it is",
      body: `${title} is an internet culture ${category}.${aliases} ${pkg.summary}${writing}`,
    },
    {
      id: "origin",
      heading: "Origin",
      body: `${pkg.origin}${mediumNotes ? ` ${mediumNotes}` : ""}${resolutions}`,
    },
    {
      id: "history",
      heading: "History",
      body: `Key milestones for ${title}: ${timelineProse}`,
    },
    {
      id: "cultural-impact",
      heading: "Cultural impact",
      body: `${pkg.culturalImpact} It has circulated across ${platforms} and is often discussed alongside ${related}.`,
    },
    {
      id: "legacy",
      heading: "Legacy",
      body:
        pkg.notableMoments.length > 0
          ? `${title} remains a reference point in online culture. Notable moments include ${pkg.notableMoments
              .slice(0, 3)
              .join("; ")}.`
          : `${title} remains recognizable shorthand in online communities, reused in jokes, commentary, and creator content.`,
    },
  ];
}

/**
 * Generate a complete article DraftPackage from ApprovedResearch.
 */
export function generateDraftFromApprovedResearch(
  approved: ApprovedResearch,
): DraftPackage {
  const pkg = approved.researchPackage;
  const title = pkg.title;
  const category = approved.categoryDecision;
  const slugSuggestion = pkg.slugSuggestion?.trim() || slugify(title);
  const articleSections = buildArticleSections(approved);
  const lead =
    pkg.summary ||
    `${title} is an internet culture ${category} covered in this encyclopedia entry.`;

  const sourcePool =
    approved.verifiedSources.length > 0
      ? approved.verifiedSources.map((s) => ({
          title: s.title,
          url: s.url,
          domain: domainFromUrl(s.url),
        }))
      : pkg.sources.map((s) => ({
          title: s.title,
          url: s.url,
          domain: domainFromUrl(s.url),
        }));

  const history = pkg.timeline.map((t) => `${t.when}: ${t.what}`).join("\n");
  const examples =
    pkg.notableMoments.length > 0
      ? pkg.notableMoments.slice(0, 3)
      : [
          `People reference ${title} when describing a recognizable online pattern.`,
          `"That whole thing is so ${title}."`,
        ];

  const seo = pkg.seoHints;

  return {
    id: `dp_${approved.id}`,
    approvedResearchId: approved.id,
    title,
    slugSuggestion,
    category,
    summary: pkg.summary,
    lead,
    articleSections,
    origin: pkg.origin,
    history,
    timeline: pkg.timeline.map((t) => ({
      date: t.when,
      event: t.what,
    })),
    examples,
    culturalSignificance: pkg.culturalImpact,
    legacy:
      pkg.notableMoments[0] ??
      `${title} continues to circulate as recognizable internet-culture shorthand.`,
    relatedTopics: pkg.relatedEntries.map((r) => r.title),
    aliases: pkg.aliases,
    tags: [category, ...pkg.platforms.slice(0, 3)].filter(Boolean),
    categoryFields: {
      categoryReasoning: pkg.categoryReasoning,
      completenessScore: String(pkg.completeness?.score ?? ""),
    },
    suggestedCulturalScores: {
      relevance: 55,
      influence: 45,
      cringe: 25,
      brainrot: category === "brainrot" ? 70 : 30,
    },
    suggestedMedia: pkg.mediaSuggestions.map((m) => ({
      role: m.role,
      type: m.type ?? "image",
      url: m.url,
      title: m.title,
      searchHint: m.searchHint,
      verified: false as const,
    })),
    suggestedSources: sourcePool,
    seoMetadata: {
      metaTitle: seo?.metaTitle ?? `${title} | Internet Culture Hub`,
      metaDescription: seo?.metaDescription ?? lead.slice(0, 160),
      primaryKeyword: seo?.primaryKeyword ?? title.toLowerCase(),
    },
    groundedOnResearch: pkg,
    editorNotes: [...approved.editorNotes],
    feedbackHistory: [],
    revision: 0,
  };
}
