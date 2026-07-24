import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";

/**
 * Catalog-only character cues — NEVER used for Current Relevance / Trending.
 * Kept for brainrot / cringe soft signals when live evidence is silent on those kinds.
 */
export const catalogEvidenceProvider: DynamicSignalProvider = {
  id: "catalog-evidence",
  label: "Catalog evidence (character only)",
  priority: 5,
  collect(ctx: DynamicSignalProviderContext): DynamicSignalObservation[] {
    const out: DynamicSignalObservation[] = [];
    const now = new Date().toISOString();
    const tagBlob = ctx.tags.join(" ").toLowerCase();
    const cat = ctx.category.toLowerCase();

    let absurdity: number | null = null;
    if (cat === "brainrot" || /brainrot|skibidi|ohio|gen.?alpha/.test(tagBlob)) {
      absurdity = 82;
    } else if (/meme|shitpost|deep.?fried|surreal/.test(tagBlob)) {
      absurdity = 55;
    } else if (cat === "slang" || cat === "event") {
      absurdity = 25;
    }
    if (absurdity != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "absurdity",
        value: absurdity,
        note: "Tag/category absurdity cue (not used for relevance/trending)",
        observedAt: now,
      });
    }

    let cohort: number | null = null;
    if (/gen.?alpha|brainrot|skibidi|rizz|gyatt|mewing/.test(tagBlob)) {
      cohort = 85;
    } else if (/gen.?z|tiktok|short.?form/.test(tagBlob) || cat === "slang") {
      cohort = 60;
    }
    if (cohort != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "gen-cohort-adoption",
        value: cohort,
        note: "Cohort cue from tags (not used for relevance/trending)",
        observedAt: now,
      });
    }

    if (/cringe|fail|try.?hard|dated|old/.test(tagBlob)) {
      out.push({
        providerId: "catalog-evidence",
        kind: "mockery-signal",
        value: 65,
        note: "Tag mockery cue (cringe only)",
        observedAt: now,
      });
    }
    if (/remix|template|format|macro|copypasta/.test(tagBlob) || cat === "meme") {
      out.push({
        providerId: "catalog-evidence",
        kind: "remix-activity",
        value: cat === "meme" ? 60 : 40,
        note: "Format/remix cue (brainrot/cringe only)",
        observedAt: now,
      });
    }

    return out;
  },
};
