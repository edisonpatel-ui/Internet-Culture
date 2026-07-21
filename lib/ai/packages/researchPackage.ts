/**
 * Research package — structured research output before drafting (RC3-B).
 *
 * Produced by the research workflow (future). Consumed by draft workflow.
 * Never written directly to `lib/content/`.
 */

import type { AIDraftCategory } from "../types";

export interface ResearchSourceRef {
  title: string;
  url?: string;
  /** primary = preferred citation; secondary = supporting / background */
  tier: "primary" | "secondary";
  notes?: string;
}

export interface ResearchChronologyItem {
  /** Free-form date label (year, month, or approximate). */
  when: string;
  what: string;
  /** Confidence that this event is accurately dated. */
  confidence?: number;
}

/**
 * Full research package — everything an editor needs before drafting.
 */
export interface ResearchPackage {
  topic: string;
  categoryHint?: AIDraftCategory;
  /** One-paragraph overview. */
  summary: string;
  /** Ordered cultural chronology (not a publishable timeline yet). */
  chronology: ResearchChronologyItem[];
  /** Origin platform / community / era — only when supportable. */
  origin: string;
  /** Platforms where the topic lived or spread. */
  platforms: string[];
  notableMoments: string[];
  culturalImpact: string;
  relatedTopics: string[];
  aliases: string[];
  primarySources: ResearchSourceRef[];
  secondarySources: ResearchSourceRef[];
  /** 0–1 editorial confidence in the package as a whole. */
  confidence: number;
  conflictingInformation: string[];
  missingInformation: string[];
  researchNotes: string[];
  /** What this topic is NOT (misclassification traps). */
  notThis: string[];
}
