import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";

/**
 * Catalog-only character cues — NEVER used for Current Relevance / Trending.
 * Brainrot / Cringe cultural identity only.
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
    // Defining modern brainrot icons — identity, not popularity.
    if (/skibidi/.test(blob)) {
      absurdity = 99;
    } else if (
      /italian.?brainrot|tung.?tung|tralalero|bombardiro/.test(blob)
    ) {
      absurdity = 97;
    } else if (/ai.?slop|\bbrainrot\b/.test(blob) || cat === "brainrot") {
      absurdity = 95;
    } else if (/ohio|gen.?alpha|du.?bist|gut.?genug/.test(blob)) {
      absurdity = 84;
    } else if (
      /sigma.?edit|mewing|looksmaxx|rizz|gyatt|fanum|grimace.?shake|chicken.?jockey|hawk.?tuah/.test(
        blob,
      )
    ) {
      absurdity = 72;
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
      /skibidi|italian.?brainrot|gen.?alpha|\bbrainrot\b|ai.?slop|du.?bist|gut.?genug/.test(
        blob,
      )
    ) {
      cohort = 94;
    } else if (
      /rizz|gyatt|mewing|sigma|ohio|looksmaxx|tiktok|short.?form|reel/.test(
        blob,
      ) ||
      cat === "slang"
    ) {
      cohort = 78;
    } else if (/gen.?z/.test(blob)) {
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

    let remix: number | null = null;
    if (/skibidi|italian.?brainrot|ai.?slop/.test(blob)) {
      remix = 92;
    } else if (
      /remix|template|format|macro|copypasta|edit|sound|du.?bist|gut.?genug/.test(
        blob,
      ) ||
      cat === "meme"
    ) {
      remix = /brainrot|sigma|ohio/.test(blob) ? 78 : 58;
    }
    if (remix != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "remix-activity",
        value: remix,
        note: "Format/remix / short-form reuse cue (brainrot character only)",
        observedAt: now,
      });
    }

    return out;
  },
};
