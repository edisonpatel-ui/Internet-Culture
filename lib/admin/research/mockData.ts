/**
 * Mock research sessions — in-memory demo data for RC4-B.
 * Not persisted. Not connected to lib/content.
 */

import type { ResearchSession } from "@/types/admin";

export const MOCK_RESEARCH_SESSIONS: ResearchSession[] = [
  {
    id: "rs_cottagecore_refresh",
    topic: "Cottagecore",
    status: "active",
    createdAt: "2026-07-10T14:00:00.000Z",
    updatedAt: "2026-07-18T09:30:00.000Z",
    notes:
      "Refresh research for existing trend entry. Confirm Tumblr→TikTok path and pandemic surge. Do not invent founder.",
    tags: ["trend", "aesthetic", "tiktok", "evergreen"],
    priority: "medium",
    assignedTo: undefined,
    workflowStage: "ResearchRequested",
    sources: [
      {
        id: "src_1",
        title: "Cottagecore — Know Your Meme",
        url: "https://knowyourmeme.com/memes/subcultures/cottagecore",
        category: "know_your_meme",
        notes: "Strong chronology; verify cited primaries",
      },
      {
        id: "src_2",
        title: "Wikipedia — Cottagecore",
        url: "https://en.wikipedia.org/wiki/Cottagecore",
        category: "wikipedia",
        notes: "Overview only",
      },
    ],
    timeline: [
      {
        id: "tl_1",
        date: "2018",
        precision: "year",
        description: "Aesthetic moodboards rise on Tumblr",
        confidence: 0.7,
      },
      {
        id: "tl_2",
        date: "2020",
        precision: "year",
        description: "Pandemic-era TikTok surge",
        confidence: 0.75,
      },
    ],
    entities: [
      {
        id: "ent_1",
        name: "Tumblr",
        kind: "platform",
        aliases: [],
      },
      {
        id: "ent_2",
        name: "Dark Academia",
        kind: "meme",
        aliases: ["dark academia"],
      },
    ],
    relationships: [
      {
        id: "rel_1",
        kind: "same_era",
        targetTitle: "Dark Academia",
        targetSlug: "dark-academia",
        reason: "Adjacent late-2010s aesthetics",
      },
    ],
    internalLinks: [
      {
        id: "il_1",
        kind: "related_article",
        label: "Dark Academia",
        target: "dark-academia",
        reason: "Aesthetic tribe neighbor",
      },
      {
        id: "il_2",
        kind: "hub_page",
        label: "Trends",
        target: "/trending#trends",
        reason: "Category hub",
      },
    ],
    confidence: [
      {
        id: "cf_1",
        claim: "Cottagecore romanticizes rural/pastoral lifestyle aesthetics",
        label: "High",
        notes: "Consistent across KYM + Wikipedia",
      },
      {
        id: "cf_2",
        claim: "Exact coinage date of the word cottagecore",
        label: "Medium",
        notes: "Year-level evidence stronger than day-level",
      },
    ],
    coverageNotes: [
      "Existing /trending/cottagecore entry has origin + summary",
      "Check media verification status on featured image",
    ],
    aiSuggestions: [
      {
        id: "ai_1",
        assistant: "Research Assistant",
        summary: "Stub — would produce ResearchPackage when RC3 is wired",
        requiresHumanReview: true,
        integrationPoint: "research",
      },
    ],
    activityLog: [
      {
        id: "act_1",
        at: "2026-07-10T14:00:00.000Z",
        actor: "system",
        message: "Session created (mock)",
      },
      {
        id: "act_2",
        at: "2026-07-18T09:30:00.000Z",
        actor: "editor",
        message: "Added KYM + Wikipedia sources",
      },
    ],
  },
  {
    id: "rs_new_slang_glazing",
    topic: "Glazing (slang)",
    status: "active",
    createdAt: "2026-07-15T11:00:00.000Z",
    updatedAt: "2026-07-19T16:00:00.000Z",
    notes:
      "Gap candidate. Confirm Gen Z/TikTok sense vs older slang. Need earliest credible uses.",
    tags: ["slang", "gen-z", "gap"],
    priority: "high",
    workflowStage: "ResearchRequested",
    sources: [
      {
        id: "src_g1",
        title: "Press explainer placeholder",
        category: "journalism",
        notes: "URL TBD — do not invent",
      },
    ],
    timeline: [],
    entities: [
      {
        id: "ent_g1",
        name: "TikTok",
        kind: "platform",
        aliases: [],
      },
    ],
    relationships: [],
    internalLinks: [
      {
        id: "il_g1",
        kind: "missing_article",
        label: "Glazing (encyclopedia entry)",
        reason: "Not in catalog yet",
      },
    ],
    confidence: [
      {
        id: "cf_g1",
        claim: "Current TikTok sense means excessive praise / brown-nosing",
        label: "Medium",
      },
    ],
    coverageNotes: ["Not in slang catalog — gap detector candidate"],
    aiSuggestions: [
      {
        id: "ai_g1",
        assistant: "Gap Detector",
        summary: "Stub — would score coverage opportunity",
        requiresHumanReview: true,
        integrationPoint: "gap_detection",
      },
      {
        id: "ai_g2",
        assistant: "Entity Extractor",
        summary: "Stub — would extract people/platforms from notes",
        requiresHumanReview: true,
        integrationPoint: "entity_extraction",
      },
    ],
    activityLog: [
      {
        id: "act_g1",
        at: "2026-07-15T11:00:00.000Z",
        actor: "system",
        message: "Session created from gap list (mock)",
      },
    ],
  },
  {
    id: "rs_skibidi_update",
    topic: "Skibidi Toilet — update check",
    status: "ready_for_draft",
    createdAt: "2026-06-01T10:00:00.000Z",
    updatedAt: "2026-07-12T12:00:00.000Z",
    notes:
      "Update package path. Compare live meme entry vs new episodes / mainstream coverage.",
    tags: ["meme", "brainrot", "update"],
    priority: "medium",
    workflowStage: "ResearchComplete",
    sources: [
      {
        id: "src_s1",
        title: "Know Your Meme — Skibidi Toilet",
        url: "https://knowyourmeme.com/memes/skibidi-toilet",
        category: "know_your_meme",
      },
      {
        id: "src_s2",
        title: "YouTube — DaFuq!?Boom!",
        category: "primary_witness",
        notes: "Channel as primary creator evidence",
      },
      {
        id: "src_s3",
        title: "Duplicate title test",
        url: "https://knowyourmeme.com/memes/skibidi-toilet",
        category: "know_your_meme",
        notes: "Intentional duplicate URL for validation demo",
      },
    ],
    timeline: [
      {
        id: "tl_s1",
        date: "2023-02",
        precision: "month",
        description: "Early Skibidi shorts appear",
        confidence: 0.8,
      },
    ],
    entities: [
      {
        id: "ent_s1",
        name: "DaFuq!?Boom!",
        kind: "person",
        aliases: ["Alexey Gerasimov"],
      },
    ],
    relationships: [
      {
        id: "rel_s1",
        kind: "same_community",
        targetTitle: "Brainrot Hub",
        reason: "Gen Alpha absurdist cluster",
      },
    ],
    internalLinks: [
      {
        id: "il_s1",
        kind: "hub_page",
        label: "Brainrot Hub",
        target: "/brainrot",
        reason: "Cluster hub",
      },
    ],
    confidence: [
      {
        id: "cf_s1",
        claim: "Series originates from DaFuq!?Boom! on YouTube",
        label: "High",
      },
      {
        id: "cf_s2",
        claim: "Exact first upload timestamp",
        label: "Medium",
      },
    ],
    coverageNotes: ["Live entry exists under memes — this session is update-oriented"],
    aiSuggestions: [
      {
        id: "ai_s1",
        assistant: "Timeline Builder",
        summary: "Stub — would refine chronology precision",
        requiresHumanReview: true,
        integrationPoint: "timeline_building",
      },
      {
        id: "ai_s2",
        assistant: "Relationship Finder",
        summary: "Stub — would suggest brainrot cluster edges",
        requiresHumanReview: true,
        integrationPoint: "relationship_discovery",
      },
    ],
    activityLog: [
      {
        id: "act_s1",
        at: "2026-06-01T10:00:00.000Z",
        actor: "system",
        message: "Session created (mock)",
      },
      {
        id: "act_s2",
        at: "2026-07-12T12:00:00.000Z",
        actor: "editor",
        message: "Marked ResearchComplete / ready_for_draft (mock)",
      },
    ],
  },
  {
    id: "rs_archived_example",
    topic: "Example archived session",
    status: "archived",
    createdAt: "2026-05-01T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    notes: "Deferred — duplicate of existing coverage.",
    tags: ["archived"],
    priority: "low",
    workflowStage: "Archived",
    sources: [],
    timeline: [],
    entities: [],
    relationships: [],
    internalLinks: [],
    confidence: [
      {
        id: "cf_a1",
        claim: "Placeholder",
        label: "Unknown",
      },
    ],
    coverageNotes: [],
    aiSuggestions: [],
    activityLog: [
      {
        id: "act_a1",
        at: "2026-05-20T08:00:00.000Z",
        actor: "editor",
        message: "Archived as duplicate (mock)",
      },
    ],
  },
];
