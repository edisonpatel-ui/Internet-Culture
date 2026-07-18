/**
 * Manual calibration overlays for well-known entries.
 *
 * These adjust derived scores WITHOUT editing article content files.
 * Use when heuristics alone cannot separate landmark history from current hype.
 *
 * Values are encyclopedia estimates informed by lasting documentation
 * (Wikipedia / Know Your Meme presence, continued references) — not live API pulls.
 *
 * Only set fields that need correction; omitted fields still use heuristics.
 */

export interface ScoreCalibration {
  /** Current attention today (0–100). */
  relevanceScore?: number;
  /** Historical influence on internet culture (0–100). */
  culturalImpactScore?: number;
  longevityScore?: number;
  popularityScore?: number;
  note?: string;
}

/**
 * Slug → calibration.
 * Prefer documenting *why* in `note` when impact and current relevance diverge.
 */
export const SCORE_CALIBRATION: Record<string, ScoreCalibration> = {
  // Landmark 2013 flash format — huge then, low organic discussion now
  "harlem-shake": {
    relevanceScore: 36,
    culturalImpactScore: 88,
    longevityScore: 74,
    note: "High historical impact (2013 YouTube format wave); low current relevance.",
  },
  // Legendary — still referenced, crypto/culture afterlife
  doge: {
    relevanceScore: 70,
    culturalImpactScore: 94,
    longevityScore: 96,
    note: "Legendary meme with lasting recognition and cultural afterlife.",
  },
  rickroll: {
    relevanceScore: 58,
    culturalImpactScore: 93,
    longevityScore: 97,
    note: "Perennial prank format; moderate ongoing use, extreme longevity.",
  },
  "nyan-cat": {
    relevanceScore: 42,
    culturalImpactScore: 84,
    longevityScore: 88,
    note: "Early-2010s icon; nostalgia more than active meme production.",
  },
  "keyboard-cat": {
    relevanceScore: 34,
    culturalImpactScore: 78,
    longevityScore: 82,
  },
  "grumpy-cat": {
    relevanceScore: 40,
    culturalImpactScore: 86,
    longevityScore: 85,
  },
  "bad-luck-brian": {
    relevanceScore: 38,
    culturalImpactScore: 80,
    longevityScore: 84,
  },
  "success-kid": {
    relevanceScore: 36,
    culturalImpactScore: 76,
    longevityScore: 80,
  },
  "rage-comics": {
    relevanceScore: 32,
    culturalImpactScore: 87,
    longevityScore: 86,
  },
  trollface: {
    relevanceScore: 40,
    culturalImpactScore: 85,
    longevityScore: 88,
  },
  pepe: {
    relevanceScore: 62,
    culturalImpactScore: 92,
    longevityScore: 90,
    note: "Still actively remixed; high impact and longevity.",
  },
  wojak: {
    relevanceScore: 68,
    culturalImpactScore: 88,
    longevityScore: 86,
  },
  // Temporary / wave-based — high now, weaker longevity bet
  "skibidi-toilet": {
    relevanceScore: 90,
    culturalImpactScore: 76,
    longevityScore: 48,
    note: "High current Gen Alpha attention; longevity still unproven.",
  },
  "ohio-final-boss": {
    relevanceScore: 78,
    culturalImpactScore: 58,
    longevityScore: 40,
  },
  "chicken-jockey": {
    relevanceScore: 92,
    culturalImpactScore: 70,
    longevityScore: 52,
  },
  "hawk-tuah": {
    relevanceScore: 72,
    culturalImpactScore: 62,
    longevityScore: 35,
  },
  yeet: {
    relevanceScore: 44,
    culturalImpactScore: 72,
    longevityScore: 70,
    note: "Dictionary-level stay power but cooler day-to-day usage.",
  },
  "sigma-grindset": {
    relevanceScore: 48,
    culturalImpactScore: 64,
    longevityScore: 42,
  },
  sigma: {
    relevanceScore: 50,
    culturalImpactScore: 66,
    longevityScore: 45,
  },
  "ice-bucket-challenge": {
    relevanceScore: 30,
    culturalImpactScore: 90,
    longevityScore: 78,
    note: "Major 2014 participation event; low current relevance.",
  },
  "vine-shutdown": {
    relevanceScore: 35,
    culturalImpactScore: 82,
    longevityScore: 75,
  },
  "gangnam-style": {
    relevanceScore: 45,
    culturalImpactScore: 91,
    longevityScore: 88,
  },
  "leeroy-jenkins": {
    relevanceScore: 40,
    culturalImpactScore: 83,
    longevityScore: 90,
  },
};

export function getCalibration(slug: string): ScoreCalibration | undefined {
  return SCORE_CALIBRATION[slug];
}
