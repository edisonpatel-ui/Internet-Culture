/**
 * Encyclopedia writer: ApprovedResearch → finished DraftPackage prose.
 * Research Package is input only — never copied as visitor-facing text.
 */

import type {
  ApprovedResearch,
  DraftArticleSection,
  DraftPackage,
} from "@/lib/ai/packages";
import {
  isPreferredPublicSourceUrl,
  isUnknownValue,
  publicSourceLabel,
  sanitizePublicProse,
  writeEncyclopediaLead,
  writeImpactProse,
  writeLegacyProse,
  writeOriginProse,
  writePublicExamples,
  writePublicTimeline,
} from "./encyclopediaProse";

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

function hasUrl(url?: string): boolean {
  return Boolean(url?.trim() && /^https?:\/\//i.test(url.trim()));
}

/**
 * Build polished encyclopedia sections. Omits empty / unknown / internal text.
 */
function writeArticleSections(input: {
  title: string;
  category: string;
  lead: string;
  origin: string;
  impact: string | null;
  legacy: string | null;
}): DraftArticleSection[] {
  const sections: DraftArticleSection[] = [];

  // Live pages put the lead under the hero — Origin is the first ContentBlock.
  sections.push({
    id: "origin",
    heading: "Origin",
    body: input.origin,
  });

  if (input.impact) {
    sections.push({
      id: "cultural-impact",
      heading: "Cultural impact",
      body: input.impact,
    });
  }

  if (input.legacy) {
    sections.push({
      id: "legacy",
      heading: "Legacy",
      body: input.legacy,
    });
  }

  void input.lead;
  void input.category;
  void input.title;
  return sections;
}

/**
 * Generate a visitor-quality DraftPackage from ApprovedResearch.
 */
export function generateDraftFromApprovedResearch(
  approved: ApprovedResearch,
): DraftPackage {
  const pkg = approved.researchPackage;
  const completeness = pkg.completeness;

  const hasOverride = pkg.editorialOverride?.action === "continue_anyway";

  if (completeness?.researchFailed || completeness?.readyForEditor === false) {
    if (!hasOverride) {
      throw new Error(
        "Cannot generate article: research is incomplete. Re-run the Knowledge Engine or Continue Anyway from Research Review.",
      );
    }
  }

  const urlSources = [...approved.verifiedSources, ...pkg.sources].filter(
    (s) => hasUrl(s.url),
  );

  if (urlSources.length === 0 && !hasOverride) {
    throw new Error(
      "Cannot generate article: no URL-backed sources available.",
    );
  }
  if (
    (isUnknownValue(pkg.summary) || !sanitizePublicProse(pkg.summary)) &&
    !hasOverride
  ) {
    throw new Error(
      "Cannot generate article: a basic explanation is required.",
    );
  }

  const title = pkg.title.trim() || pkg.topic.trim() || "Untitled";
  const category = approved.categoryDecision;
  const slugSuggestion = pkg.slugSuggestion?.trim() || slugify(title);

  // Editor override comments / instructions are NEVER used as prose seeds.
  // Summary comes only from researched package fields (sanitized).
  const summarySeed = sanitizePublicProse(pkg.summary);

  const lead = writeEncyclopediaLead({
    title,
    category,
    summary: summarySeed,
    aliases: pkg.aliases,
  });

  const origin = writeOriginProse(title, pkg.origin);
  const impact = writeImpactProse(title, pkg.culturalImpact, pkg.platforms);
  const legacy = writeLegacyProse(title, pkg.notableMoments);
  const timeline = writePublicTimeline(pkg.timeline);
  const examples = writePublicExamples(pkg.notableMoments);
  const articleSections = writeArticleSections({
    title,
    category,
    lead,
    origin,
    impact,
    legacy,
  });

  const sourcePool = (
    approved.verifiedSources.filter((s) => hasUrl(s.url)).length > 0
      ? approved.verifiedSources
      : pkg.sources
  )
    .filter((s) => hasUrl(s.url) && isPreferredPublicSourceUrl(s.url!))
    .map((s) => ({
      title: publicSourceLabel(s.title, s.url),
      url: s.url,
      domain: domainFromUrl(s.url),
    }))
    .filter(
      (s, i, arr) =>
        arr.findIndex((x) => (x.url ?? x.title) === (s.url ?? s.title)) === i,
    )
    .slice(0, 8);

  const history = timeline.map((t) => `${t.date}: ${t.event}`).join("\n");
  const seo = pkg.seoHints;
  const now = new Date().toISOString();

  return {
    id: `dp_${approved.id}`,
    approvedResearchId: approved.id,
    title,
    slugSuggestion,
    category,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    summary: lead,
    lead,
    articleSections,
    origin,
    history,
    timeline,
    examples,
    culturalSignificance: impact ?? "",
    legacy: legacy ?? "",
    relatedTopics: pkg.relatedEntries
      .map((r) => sanitizePublicProse(r.title))
      .filter(Boolean)
      .slice(0, 8),
    aliases: pkg.aliases
      .map((a) => sanitizePublicProse(a))
      .filter(Boolean)
      .slice(0, 8),
    tags: [category, ...pkg.platforms.slice(0, 3)]
      .map((t) => sanitizePublicProse(t))
      .filter(Boolean),
    categoryFields: {},
    suggestedCulturalScores: {
      relevance: 55,
      influence: 45,
      cringe: 25,
      brainrot: category === "brainrot" ? 70 : 30,
    },
    suggestedMedia: pkg.mediaSuggestions
      .filter((m) => hasUrl(m.url))
      .map((m) => ({
        role: m.role,
        type: m.type ?? ("image" as const),
        url: m.url,
        title: sanitizePublicProse(m.title) || title,
        source: m.source,
        searchHint: undefined,
        verified: false as const,
      })),
    suggestedSources: sourcePool,
    seoMetadata: {
      metaTitle: seo?.metaTitle ?? `${title} | Internet Culture Hub`,
      metaDescription:
        sanitizePublicProse(seo?.metaDescription ?? "") || lead.slice(0, 160),
      primaryKeyword: seo?.primaryKeyword ?? title.toLowerCase(),
    },
    groundedOnResearch: pkg,
    // Kept for admin systems only — never rendered in article preview body.
    editorNotes: [...approved.editorNotes],
    feedbackHistory: [],
    revision: 0,
  };
}
