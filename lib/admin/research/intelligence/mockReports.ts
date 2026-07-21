/**
 * Curated mock ResearchReport fixtures for architecture demos (RC4-C).
 * Illustrative only — not verified encyclopedia facts. Humans must research.
 */

import type { ResearchReport } from "./types";

const stamp = "2026-07-17T12:00:00.000Z";

function baseMeta(
  id: string,
  topic: string,
  overrides: Partial<ResearchReport>,
): ResearchReport {
  return {
    id,
    topic,
    generatedAt: stamp,
    requiresHumanReview: true,
    executiveSummary: "",
    topicOverview: "",
    historicalContext: "",
    timeline: [],
    importantEvents: [],
    people: [],
    organizations: [],
    platforms: [],
    communities: [],
    memes: [],
    slang: [],
    relationships: [],
    relatedEntries: [],
    potentialMissingEntries: [],
    evidenceMatrix: [],
    conflictingClaims: [],
    confidenceLevels: [],
    coverageAssessment: {
      coverageLevel: "none",
      strengths: [],
      weaknesses: [],
      gaps: [],
      relatedCatalogSlugs: [],
    },
    researchNotes: [
      "MOCK REPORT — illustrative architecture fixture, not verified research.",
    ],
    editorialRecommendations: [],
    seoRecommendations: [],
    futureMediaSuggestions: [],
    ...overrides,
  };
}

/** Italian Brainrot — absurdist AI animal characters / Gen Alpha meme cluster. */
export const MOCK_REPORT_ITALIAN_BRAINROT: ResearchReport = baseMeta(
  "mock-report-italian-brainrot",
  "Italian Brainrot",
  {
    executiveSummary:
      "Italian Brainrot refers to a cluster of absurdist AI-generated animal characters with pseudo-Italian names (e.g. Tralalero Tralala) that spread as short-form meme content. Treat classification carefully: related to brainrot aesthetics, not a single classic image macro.",
    topicOverview:
      "A meme/brainrot phenomenon built around surreal hybrid creatures, nonsense Italianate naming, and rapid TikTok/YouTube Shorts remix culture.",
    historicalContext:
      "Emerged in the mid-2020s amid AI image meme cycles and Gen Alpha 'brainrot' vocabulary. Exact first upload remains contested across platforms — preserve conflicting origin claims.",
    timeline: [
      {
        id: "ib-tl-1",
        date: "2024",
        precision: "approx",
        description: "Early AI animal character memes circulate on short-form platforms.",
        confidence: 0.35,
        importance: "major",
      },
      {
        id: "ib-tl-2",
        date: "2025",
        precision: "approx",
        description: "Named characters (Tralalero Tralala and peers) become recognizable templates.",
        confidence: 0.4,
        importance: "critical",
      },
    ],
    importantEvents: [
      {
        id: "ib-tl-2",
        date: "2025",
        precision: "approx",
        description: "Named characters (Tralalero Tralala and peers) become recognizable templates.",
        confidence: 0.4,
        importance: "critical",
      },
    ],
    platforms: [
      {
        id: "ib-tiktok",
        name: "TikTok",
        kind: "platform",
        aliases: [],
      },
      {
        id: "ib-yt",
        name: "YouTube Shorts",
        kind: "platform",
        aliases: [],
      },
    ],
    communities: [
      {
        id: "ib-comm",
        name: "Gen Alpha meme / brainrot audiences",
        kind: "community",
        aliases: [],
      },
    ],
    memes: [
      {
        id: "ib-meme",
        name: "Italian Brainrot",
        kind: "meme",
        aliases: ["Italian brainrot animals"],
      },
    ],
    slang: [
      {
        id: "ib-slang-brainrot",
        name: "brainrot",
        kind: "slang",
        aliases: [],
        catalogSlug: undefined,
        notes: "Broader slang; may already exist in catalog.",
      },
    ],
    relationships: [
      {
        id: "ib-rel-1",
        kind: "related_to",
        fromName: "Italian Brainrot",
        toName: "brainrot",
        reason: "Aesthetic / vocabulary overlap with brainrot category.",
        confidence: 0.6,
      },
    ],
    relatedEntries: [
      { title: "Brainrot (category / related entries)", reason: "Parent aesthetic cluster." },
    ],
    potentialMissingEntries: [
      {
        id: "ib-gap-1",
        title: "Tralalero Tralala (character entry)",
        reason: "Signature character may warrant its own page if catalog depth requires it.",
        suggestedCategory: "brainrot",
        priority: "medium",
      },
    ],
    evidenceMatrix: [
      {
        id: "ib-grp-origin",
        label: "Origin documentation",
        theme: "origin",
        evidence: [
          {
            id: "ib-ev-1",
            claim: "Characters are primarily AI-generated image/video memes with Italianate nonsense names.",
            sourceTitle: "Know Your Meme (candidate)",
            sourceCategory: "know_your_meme",
            tier: "Medium",
          },
        ],
      },
    ],
    conflictingClaims: [
      {
        id: "ib-c1",
        summary: "Which platform hosted the first viral upload.",
        claims: ["TikTok-first claim", "YouTube Shorts-first claim"],
        editorGuidance: "Require primary timestamps; do not invent a winner.",
      },
    ],
    confidenceLevels: [
      {
        claim: "Italian Brainrot is a mid-2020s AI meme cluster.",
        label: "Medium",
        score: 0.55,
        reasons: ["Secondary documentation likely; primary first-post still thin."],
      },
    ],
    coverageAssessment: {
      coverageLevel: "thin",
      strengths: ["Clear visual/character identity for media research."],
      weaknesses: ["Origin chronology fragile; name collisions with 'brainrot' slang."],
      gaps: [
        {
          id: "ib-cov-1",
          title: "Verified first upload",
          reason: "No mock URL attached.",
          priority: "high",
        },
      ],
      relatedCatalogSlugs: [],
    },
    researchNotes: [
      "MOCK — confirm whether site already has a brainrot entry covering this cluster.",
      "Prefer brainrot category if absurdist Gen Alpha framing fits catalog rules.",
    ],
    editorialRecommendations: [
      {
        id: "ib-ed-1",
        area: "editorial",
        severity: "critical",
        recommendation: "Decide: single cluster article vs per-character pages.",
      },
    ],
    seoRecommendations: [
      {
        id: "ib-seo-1",
        area: "seo",
        severity: "improve",
        recommendation: "Include character aliases readers search for in related/FAQ later.",
      },
    ],
    futureMediaSuggestions: [
      {
        id: "ib-m1",
        role: "featured",
        title: "Representative character still (CC or fair-use pathway TBD)",
        searchHint: "Do not hotlink ephemeral social CDN. Prefer verified Commons or YT hqdefault.",
        verified: false,
      },
    ],
  },
);

/** NPC Streaming — streamers performing scripted 'NPC' loops for gifts. */
export const MOCK_REPORT_NPC_STREAMING: ResearchReport = baseMeta(
  "mock-report-npc-streaming",
  "NPC Streaming",
  {
    executiveSummary:
      "NPC Streaming describes livestreamers who perform repetitive scripted catchphrases and motions (NPC-like loops), often monetized via platform gifts. Distinct from the broader 'NPC' meme as a performance format.",
    topicOverview:
      "A creator/performance trend on TikTok Live and similar platforms where the streamer acts as a non-player character triggered by donations.",
    historicalContext:
      "Grew from earlier NPC meme discourse into a live monetization format in the early–mid 2020s. Press coverage often focuses on specific viral streamers.",
    timeline: [
      {
        id: "npc-tl-1",
        date: "2023",
        precision: "approx",
        description: "NPC Live performance format gains mainstream press attention.",
        confidence: 0.45,
        importance: "critical",
      },
    ],
    platforms: [
      { id: "npc-tt", name: "TikTok Live", kind: "platform", aliases: ["TikTok"] },
    ],
    people: [
      {
        id: "npc-person-placeholder",
        name: "Notable NPC streamers (research)",
        kind: "person",
        aliases: [],
        notes: "Do not invent names — attach verified creators only.",
      },
    ],
    communities: [
      {
        id: "npc-comm",
        name: "TikTok Live gift audiences",
        kind: "community",
        aliases: [],
      },
    ],
    memes: [
      {
        id: "npc-meme",
        name: "NPC meme",
        kind: "meme",
        aliases: ["NPC Wojak adjacent discourse"],
        notes: "Related but not identical to the streaming format.",
      },
    ],
    relationships: [
      {
        id: "npc-rel-1",
        kind: "derived_from",
        fromName: "NPC Streaming",
        toName: "NPC meme",
        reason: "Performance format borrows NPC cultural metaphor.",
        confidence: 0.65,
      },
    ],
    relatedEntries: [
      { title: "NPC (meme / slang)", reason: "Conceptual parent." },
    ],
    potentialMissingEntries: [
      {
        id: "npc-gap-1",
        title: "Creator pages for verified NPC streamers",
        reason: "Only after identity and notability confirmed.",
        suggestedCategory: "creator",
        priority: "low",
      },
    ],
    evidenceMatrix: [
      {
        id: "npc-grp",
        label: "Press definitions",
        theme: "identity",
        evidence: [
          {
            id: "npc-ev-1",
            claim: "NPC livestreams use scripted loops triggered by gifts.",
            sourceTitle: "Journalism (candidate)",
            sourceCategory: "journalism",
            tier: "Medium",
          },
        ],
      },
    ],
    conflictingClaims: [],
    confidenceLevels: [
      {
        claim: "NPC Streaming is a live performance monetization format.",
        label: "Medium",
        reasons: ["Press stubs; need primary stream examples with dates."],
      },
    ],
    coverageAssessment: {
      coverageLevel: "none",
      strengths: ["Clear behavioral definition."],
      weaknesses: ["Easy to conflate with NPC meme article."],
      gaps: [
        {
          id: "npc-cov-1",
          title: "Category decision (trend vs event vs creator cluster)",
          reason: "Classification required before drafting.",
          priority: "high",
        },
      ],
      relatedCatalogSlugs: [],
    },
    researchNotes: ["MOCK — classify as trend unless a specific viral moment is the focus."],
    editorialRecommendations: [
      {
        id: "npc-ed-1",
        area: "editorial",
        severity: "critical",
        recommendation: "Separate NPC Streaming (format) from NPC meme (image/discourse).",
      },
    ],
    seoRecommendations: [
      {
        id: "npc-seo-1",
        area: "seo",
        severity: "info",
        recommendation: "Title should include 'streaming' or 'TikTok Live' to disambiguate.",
      },
    ],
    futureMediaSuggestions: [
      {
        id: "npc-m1",
        role: "video",
        title: "Embeddable example stream clip (YouTube only if available)",
        searchHint: "Verify oembed before any YouTube ID.",
        verified: false,
      },
    ],
  },
);

/** Looksmaxxing — appearance improvement discourse / incel-adjacent slang cluster. */
export const MOCK_REPORT_LOOKSMAXXING: ResearchReport = baseMeta(
  "mock-report-looksmaxxing",
  "Looksmaxxing",
  {
    executiveSummary:
      "Looksmaxxing is slang/community discourse about maximizing physical attractiveness through routines, products, or extreme interventions. Often tied to lookism forums; handle with careful editorial framing.",
    topicOverview:
      "A slang term and practice cluster from online appearance communities, spanning mild self-improvement talk to extreme 'mogging' / incel-adjacent rhetoric.",
    historicalContext:
      "Rooted in lookism / incel forum vocabulary; later mainstreamed via TikTok and YouTube self-improvement content. Etymology: looks + -maxxing.",
    platforms: [
      { id: "lm-yt", name: "YouTube", kind: "platform", aliases: [] },
      { id: "lm-tt", name: "TikTok", kind: "platform", aliases: [] },
      { id: "lm-forums", name: "Lookism / incel forums", kind: "community", aliases: [] },
    ],
    slang: [
      {
        id: "lm-slang",
        name: "looksmaxxing",
        kind: "slang",
        aliases: ["looksmaxx", "looksmax"],
      },
    ],
    communities: [
      {
        id: "lm-comm",
        name: "Looksmaxxing communities",
        kind: "community",
        aliases: ["lookism discourse"],
      },
    ],
    relationships: [
      {
        id: "lm-rel-1",
        kind: "related_to",
        fromName: "looksmaxxing",
        toName: "incel discourse",
        reason: "Overlapping forums and vocabulary — note carefully, do not over-conflate.",
        confidence: 0.5,
      },
    ],
    potentialMissingEntries: [
      {
        id: "lm-gap-1",
        title: "Related slang (mog, mewing) if not already catalogued",
        reason: "Internal linking cluster.",
        suggestedCategory: "slang",
        priority: "medium",
      },
    ],
    evidenceMatrix: [
      {
        id: "lm-grp",
        label: "Definitions",
        theme: "identity",
        evidence: [
          {
            id: "lm-ev-1",
            claim: "Looksmaxxing means attempting to maximize physical attractiveness.",
            sourceTitle: "Know Your Meme / slang dictionaries (candidate)",
            sourceCategory: "know_your_meme",
            tier: "Medium",
          },
        ],
      },
    ],
    conflictingClaims: [
      {
        id: "lm-c1",
        summary: "Whether looksmaxxing is 'just self-improvement' or inherently incel-coded.",
        claims: [
          "Mainstream wellness framing",
          "Forum extremist framing",
        ],
        editorGuidance: "Describe both registers; avoid sanitizing or sensationalizing.",
      },
    ],
    confidenceLevels: [
      {
        claim: "Term originates in online lookism communities.",
        label: "Medium",
        reasons: ["Strong community attestation; need citable archive links."],
      },
    ],
    coverageAssessment: {
      coverageLevel: "none",
      strengths: ["Clear slang definition path."],
      weaknesses: ["Sensitive adjacent communities; high misinformation risk on 'techniques'."],
      gaps: [
        {
          id: "lm-cov-1",
          title: "Archive citations for earliest uses",
          reason: "Etymology needs primary forum evidence.",
          priority: "high",
        },
      ],
      relatedCatalogSlugs: [],
    },
    researchNotes: ["MOCK — category almost certainly slang, not meme."],
    editorialRecommendations: [
      {
        id: "lm-ed-1",
        area: "editorial",
        severity: "critical",
        recommendation: "Do not give medical advice; describe culture, not prescriptions.",
      },
    ],
    seoRecommendations: [
      {
        id: "lm-seo-1",
        area: "seo",
        severity: "info",
        recommendation: "Primary keyword: looksmaxxing; aliases looksmaxx / looksmax.",
      },
    ],
    futureMediaSuggestions: [
      {
        id: "lm-m1",
        role: "reference",
        title: "KYM / Wikipedia reference if pages exist",
        searchHint: "Slang entries often need no featured image.",
        verified: false,
      },
    ],
  },
);

/** Skibidi Toilet — YouTube series / brainrot meme phenomenon. */
export const MOCK_REPORT_SKIBIDI_TOILET: ResearchReport = baseMeta(
  "mock-report-skibidi-toilet",
  "Skibidi Toilet",
  {
    executiveSummary:
      "Skibidi Toilet is a YouTube Shorts series by animator DaFuq!?Boom! featuring toilet-headed characters fighting camera-headed humanoids; it became a defining Gen Alpha meme / brainrot touchstone.",
    topicOverview:
      "A viral animated web series and meme franchise that spilled into slang, toys, and schoolyard culture.",
    historicalContext:
      "Series launched on YouTube Shorts in the early 2020s and scaled into a multi-episode lore universe. Press often cites it as emblematic of Gen Alpha internet culture.",
    timeline: [
      {
        id: "st-tl-1",
        date: "2023",
        precision: "year",
        description: "Skibidi Toilet Shorts surge in views and meme remixes.",
        confidence: 0.55,
        importance: "critical",
      },
    ],
    people: [
      {
        id: "st-creator",
        name: "DaFuq!?Boom!",
        kind: "person",
        aliases: ["Alexey Gerasimov (verify before stating)"],
        notes: "Confirm legal name / attribution from reliable sources only.",
      },
    ],
    platforms: [
      { id: "st-yt", name: "YouTube", kind: "platform", aliases: ["YouTube Shorts"] },
      { id: "st-tt", name: "TikTok", kind: "platform", aliases: [] },
    ],
    memes: [
      {
        id: "st-meme",
        name: "Skibidi Toilet",
        kind: "meme",
        aliases: ["skibidi"],
      },
    ],
    slang: [
      {
        id: "st-slang",
        name: "skibidi",
        kind: "slang",
        aliases: [],
        notes: "May need separate slang entry if used beyond the series.",
      },
    ],
    relationships: [
      {
        id: "st-rel-1",
        kind: "created_by",
        fromName: "Skibidi Toilet",
        toName: "DaFuq!?Boom!",
        reason: "Series authorship.",
        confidence: 0.7,
      },
    ],
    relatedEntries: [
      { title: "Brainrot", reason: "Frequently grouped in Gen Alpha brainrot discourse." },
    ],
    potentialMissingEntries: [
      {
        id: "st-gap-1",
        title: "DaFuq!?Boom! creator entry",
        reason: "If notability threshold met.",
        suggestedCategory: "creator",
        suggestedSlug: "dafuq-boom",
        priority: "medium",
      },
    ],
    evidenceMatrix: [
      {
        id: "st-grp",
        label: "Primary series",
        theme: "origin",
        evidence: [
          {
            id: "st-ev-1",
            claim: "Skibidi Toilet originated as a YouTube Shorts series by DaFuq!?Boom!.",
            sourceTitle: "YouTube channel (primary)",
            sourceCategory: "primary_witness",
            tier: "High",
            notes: "Attach official channel URL after verification.",
          },
          {
            id: "st-ev-2",
            claim: "Series became a major Gen Alpha meme reference.",
            sourceTitle: "Journalism / KYM (candidate)",
            sourceCategory: "journalism",
            tier: "Medium",
          },
        ],
      },
    ],
    conflictingClaims: [],
    confidenceLevels: [
      {
        claim: "YouTube Shorts origin under DaFuq!?Boom!",
        label: "High",
        score: 0.8,
        reasons: ["Primary channel attestation expected; still attach URL."],
      },
    ],
    coverageAssessment: {
      existingEntrySlug: undefined,
      coverageLevel: "thin",
      strengths: ["Strong primary creator/platform identity."],
      weaknesses: ["Lore sprawl; keep encyclopedia article scoped."],
      gaps: [
        {
          id: "st-cov-1",
          title: "First episode publish date",
          reason: "Need exact date from YouTube.",
          priority: "high",
        },
      ],
      relatedCatalogSlugs: [],
    },
    researchNotes: ["MOCK — excellent candidate for featured YouTube hqdefault media."],
    editorialRecommendations: [
      {
        id: "st-ed-1",
        area: "editorial",
        severity: "improve",
        recommendation: "Scope article to series + cultural impact; avoid episode list dumps.",
      },
    ],
    seoRecommendations: [
      {
        id: "st-seo-1",
        area: "seo",
        severity: "info",
        recommendation: "Primary title Skibidi Toilet; alias skibidi for slang cross-link.",
      },
    ],
    futureMediaSuggestions: [
      {
        id: "st-m1",
        role: "featured",
        title: "YouTube hqdefault from an official episode",
        searchHint: "Use hqdefault.jpg; verify oembed for video role.",
        verified: false,
      },
      {
        id: "st-m2",
        role: "video",
        title: "Official episode embed",
        searchHint: "Confirm embeddable via oembed.",
        verified: false,
      },
    ],
  },
);

/** Barbenheimer — Barbie + Oppenheimer same-day release meme event. */
export const MOCK_REPORT_BARBENHEIMER: ResearchReport = baseMeta(
  "mock-report-barbenheimer",
  "Barbenheimer",
  {
    executiveSummary:
      "Barbenheimer was the internet and box-office phenomenon around the same-day theatrical release of Barbie (Greta Gerwig) and Oppenheimer (Christopher Nolan) in July 2023, spawning memes, double-feature culture, and record combined grosses.",
    topicOverview:
      "A crossover event-meme blending two contrasting blockbusters into a single cultural moment.",
    historicalContext:
      "Studios scheduled both films for 21 July 2023 in the US. Social media turned the contrast into a participatory meme; theaters and audiences leaned into double features.",
    timeline: [
      {
        id: "bh-tl-1",
        date: "2023-07-21",
        precision: "day",
        description: "US theatrical release date shared by Barbie and Oppenheimer.",
        confidence: 0.9,
        importance: "critical",
        sources: ["studio release calendars / press"],
      },
      {
        id: "bh-tl-2",
        date: "2023-07",
        precision: "month",
        description: "Peak meme and double-feature discourse.",
        confidence: 0.75,
        importance: "major",
      },
    ],
    importantEvents: [
      {
        id: "bh-tl-1",
        date: "2023-07-21",
        precision: "day",
        description: "US theatrical release date shared by Barbie and Oppenheimer.",
        confidence: 0.9,
        importance: "critical",
      },
    ],
    people: [
      { id: "bh-gg", name: "Greta Gerwig", kind: "person", aliases: [] },
      { id: "bh-cn", name: "Christopher Nolan", kind: "person", aliases: [] },
    ],
    organizations: [
      { id: "bh-wb", name: "Warner Bros. (Barbie)", kind: "organization", aliases: [] },
      { id: "bh-uni", name: "Universal (Oppenheimer)", kind: "organization", aliases: [] },
    ],
    platforms: [
      { id: "bh-x", name: "Twitter/X", kind: "platform", aliases: [] },
      { id: "bh-tt", name: "TikTok", kind: "platform", aliases: [] },
    ],
    memes: [
      {
        id: "bh-meme",
        name: "Barbenheimer",
        kind: "meme",
        aliases: ["Barbieheimer"],
      },
    ],
    relationships: [
      {
        id: "bh-rel-1",
        kind: "same_day_release",
        fromName: "Barbie (2023)",
        toName: "Oppenheimer (2023)",
        reason: "Shared release date enabled the mashup meme.",
        confidence: 0.95,
      },
    ],
    relatedEntries: [
      { title: "Barbie (2023 film cultural impact)", reason: "Half of the mashup." },
      { title: "Oppenheimer (2023 film cultural impact)", reason: "Half of the mashup." },
    ],
    potentialMissingEntries: [
      {
        id: "bh-gap-1",
        title: "Separate film event pages only if catalog strategy requires",
        reason: "Barbenheimer may be sufficient as the internet-culture event entry.",
        suggestedCategory: "event",
        priority: "low",
      },
    ],
    evidenceMatrix: [
      {
        id: "bh-grp",
        label: "Release & cultural moment",
        theme: "origin",
        evidence: [
          {
            id: "bh-ev-1",
            claim: "Barbie and Oppenheimer shared a US release date of 21 July 2023.",
            sourceTitle: "Film press / studio (candidate)",
            sourceCategory: "journalism",
            tier: "High",
          },
          {
            id: "bh-ev-2",
            claim: "Barbenheimer became a widespread meme and double-feature trend.",
            sourceTitle: "Know Your Meme / press (candidate)",
            sourceCategory: "know_your_meme",
            tier: "Medium",
          },
        ],
      },
    ],
    conflictingClaims: [],
    confidenceLevels: [
      {
        claim: "Shared US release date 21 July 2023",
        label: "Very High",
        score: 0.92,
        reasons: ["Widely corroborated calendar fact."],
      },
    ],
    coverageAssessment: {
      coverageLevel: "adequate",
      strengths: ["Clear date-bound event; strong press record."],
      weaknesses: ["Avoid box-office number invention without citations."],
      gaps: [
        {
          id: "bh-cov-1",
          title: "Cite specific gross figures only with sources",
          reason: "Stats must be sourced.",
          priority: "medium",
        },
      ],
      relatedCatalogSlugs: [],
    },
    researchNotes: ["MOCK — category: event (specific real-world cultural moment)."],
    editorialRecommendations: [
      {
        id: "bh-ed-1",
        area: "editorial",
        severity: "info",
        recommendation: "Frame as internet + theatrical crossover event, not a film review.",
      },
    ],
    seoRecommendations: [
      {
        id: "bh-seo-1",
        area: "seo",
        severity: "info",
        recommendation: "Include Barbieheimer alias; year 2023 in description.",
      },
    ],
    futureMediaSuggestions: [
      {
        id: "bh-m1",
        role: "featured",
        title: "CC-licensed promotional or event photo if available",
        searchHint: "Wikimedia Commons film premiere photos — verify license.",
        verified: false,
      },
    ],
  },
);

export const MOCK_RESEARCH_REPORTS: ResearchReport[] = [
  MOCK_REPORT_ITALIAN_BRAINROT,
  MOCK_REPORT_NPC_STREAMING,
  MOCK_REPORT_LOOKSMAXXING,
  MOCK_REPORT_SKIBIDI_TOILET,
  MOCK_REPORT_BARBENHEIMER,
];

export function getMockReportByTopic(topic: string): ResearchReport | undefined {
  const key = topic.trim().toLowerCase();
  return MOCK_RESEARCH_REPORTS.find((r) => r.topic.toLowerCase() === key);
}
