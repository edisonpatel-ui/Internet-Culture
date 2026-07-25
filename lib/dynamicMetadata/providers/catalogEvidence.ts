import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";

/**
 * Catalog-only character cues — NEVER used for Current Relevance / Trending.
 * Used for Brainrot / Cringe character when those kinds need soft signals.
 * Not popularity. Not age penalties.
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
    const title = ctx.title.toLowerCase();
    const blob = `${title} ${tagBlob} ${ctx.slug}`;

    let absurdity: number | null = null;
    if (
      cat === "brainrot" ||
      /skibidi|italian.?brainrot|tung.?tung|tralalero|bombardiro|ai.?slop|\bbrainrot\b/.test(
        blob,
      )
    ) {
      // Defining brainrot culture — identity, not Current Relevance.
      absurdity = 96;
    } else if (/ohio|gen.?alpha/.test(blob)) {
      absurdity = 82;
    } else if (
      /sigma.?edit|mewing|looksmaxx|rizz|gyatt|fanum|grimace.?shake|chicken.?jockey|hawk.?tuah/.test(
        blob,
      )
    ) {
      absurdity = 70;
    } else if (/meme|shitpost|deep.?fried|surreal|copypasta/.test(blob)) {
      absurdity = 55;
    } else if (cat === "slang") {
      absurdity = 28;
    } else if (cat === "event") {
      absurdity = 22;
    }
    if (absurdity != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "absurdity",
        value: absurdity,
        note: "Tag/title absurdity cue (brainrot character only)",
        observedAt: now,
      });
    }

    let cohort: number | null = null;
    if (
      /gen.?alpha|brainrot|skibidi|italian.?brainrot|rizz|gyatt|mewing|sigma|ohio/.test(
        blob,
      )
    ) {
      cohort = 88;
    } else if (/gen.?z|tiktok|short.?form|reel/.test(blob) || cat === "slang") {
      cohort = 62;
    }
    if (cohort != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "gen-cohort-adoption",
        value: cohort,
        note: "Cohort cue from tags/title (brainrot character only)",
        observedAt: now,
      });
    }

    if (/cringe|fail|try.?hard|awkward|embarrass/.test(blob)) {
      out.push({
        providerId: "catalog-evidence",
        kind: "mockery-signal",
        value: 68,
        note: "Tag mockery cue (cringe only)",
        observedAt: now,
      });
    }

    if (
      /remix|template|format|macro|copypasta|edit|sound/.test(blob) ||
      cat === "meme"
    ) {
      out.push({
        providerId: "catalog-evidence",
        kind: "remix-activity",
        value: cat === "meme" || /brainrot|skibidi|sigma/.test(blob) ? 72 : 42,
        note: "Format/remix cue (brainrot/cringe character only)",
        observedAt: now,
      });
    }

    return out;
  },
};
