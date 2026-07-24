import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";

/**
 * Catalog-only evidence — always available offline.
 * Uses entry age, tags, category, and trendDirection. Not a live API.
 */
export const catalogEvidenceProvider: DynamicSignalProvider = {
  id: "catalog-evidence",
  label: "Catalog evidence",
  priority: 5,
  collect(ctx: DynamicSignalProviderContext): DynamicSignalObservation[] {
    const out: DynamicSignalObservation[] = [];
    const now = new Date().toISOString();

    if (ctx.ageYears != null) {
      // Older topics tend toward lower current relevance unless other signals revive them.
      const outdatedness = Math.max(
        0,
        Math.min(100, Math.round((ctx.ageYears / 25) * 100)),
      );
      out.push({
        providerId: "catalog-evidence",
        kind: "outdatedness",
        value: outdatedness,
        note: `Approximate age ${ctx.ageYears} years from historical/added dates`,
        observedAt: now,
      });
      out.push({
        providerId: "catalog-evidence",
        kind: "age-years",
        value: Math.min(100, ctx.ageYears * 4),
        note: `Age years=${ctx.ageYears}`,
        observedAt: now,
      });
    }

    const trendMap: Record<string, number> = {
      rising: 85,
      new: 80,
      stable: 55,
      declining: 30,
    };
    out.push({
      providerId: "catalog-evidence",
      kind: "editorial-trend",
      value: trendMap[ctx.trendDirection] ?? 50,
      note: `Catalog trendDirection=${ctx.trendDirection}`,
      observedAt: now,
    });

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
        note: "Tag/category absurdity heuristic",
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
        note: "Cohort cues from tags/category",
        observedAt: now,
      });
    }

    // Remix / mockery soft cues from tags
    if (/cringe|fail|try.?hard|dated|old/.test(tagBlob)) {
      out.push({
        providerId: "catalog-evidence",
        kind: "mockery-signal",
        value: 65,
        note: "Tag cues suggest mockery / dated framing",
        observedAt: now,
      });
    }
    if (/remix|template|format|macro|copypasta/.test(tagBlob) || cat === "meme") {
      out.push({
        providerId: "catalog-evidence",
        kind: "remix-activity",
        value: cat === "meme" ? 60 : 40,
        note: "Format/remix cues from tags or meme category",
        observedAt: now,
      });
    }

    return out;
  },
};
