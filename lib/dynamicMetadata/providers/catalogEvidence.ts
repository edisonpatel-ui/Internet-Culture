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
      // Generic "this is a meme" isn't itself absurd — a moderate floor, not
      // the 55 it used to be, which put nearly every meme entry too high.
      absurdity = 40;
    }
    // Deliberately no blanket floor for cat === "slang" / "event" anymore —
    // being categorized as slang or an event says nothing about absurdity;
    // only actual absurdity-cue keywords above should set this signal.
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
      /rizz|gyatt|mewing|sigma|ohio|looksmaxx/.test(blob)
    ) {
      cohort = 78;
    } else if (/tiktok|short.?form|reel/.test(blob)) {
      // Mentioning the platform isn't the same as defining a cohort's
      // identity — this used to share the 78 tier above, which was too
      // generous for anything that merely referenced TikTok/Reels.
      cohort = 45;
    } else if (/gen.?z/.test(blob)) {
      cohort = 62;
    }
    // No blanket floor for cat === "slang" here either — same reasoning.
    if (cohort != null) {
      out.push({
        providerId: "catalog-evidence",
        kind: "gen-cohort-adoption",
        value: cohort,
        note: "Cohort cue from tags/title (brainrot character only)",
        observedAt: now,
      });
    }

    const mockeryTerms = [/\bcringe\b/, /\bfail(ed|ure)?\b/, /try.?hard/, /awkward/, /embarrass/];
    const mockeryHits = mockeryTerms.filter((re) => re.test(blob)).length;
    if (mockeryHits > 0) {
      // Scale with how many distinct mockery cues match instead of jumping
      // straight to a flat 68 for any single hit — one vague match shouldn't
      // score the same as several clear ones.
      const mockeryValue = Math.min(80, 42 + mockeryHits * 13);
      out.push({
        providerId: "catalog-evidence",
        kind: "mockery-signal",
        value: mockeryValue,
        note: `Tag mockery cue (cringe only, ${mockeryHits} match${mockeryHits > 1 ? "es" : ""})`,
        observedAt: now,
      });
    }

    let remix: number | null = null;
    if (/skibidi|italian.?brainrot|ai.?slop/.test(blob)) {
      remix = 92;
    } else if (
      /remix|template|format|macro|copypasta|edit|sound|du.?bist|gut.?genug/.test(
        blob,
      )
    ) {
      // No more blanket "or cat === meme" fallback — a meme with no actual
      // remix/template/format cue in its own tags or title shouldn't
      // automatically get a 58 remix-activity floor just for being a meme.
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
