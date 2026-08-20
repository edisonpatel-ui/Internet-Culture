import type { BaseEntry } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { getDynamicSignalProviders } from "./providers/registry";
import { isLiveEvidenceProvider } from "./providers/liveIds";
import {
  judgeCulturalIdentity,
  judgeInfluenceEvidence,
} from "./llmCulturalJudgment";
import type {
  DynamicProviderId,
  DynamicSignalBundle,
  DynamicSignalObservation,
  DynamicSignalProviderContext,
} from "./providers/types";

function buildContext(entry: BaseEntry): DynamicSignalProviderContext {
  const year = getEntryYear(entry);
  const ageYears =
    year != null ? Math.max(0, new Date().getFullYear() - year) : null;

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    tags: entry.tags ?? [],
    sourceUrls: (entry.sources ?? [])
      .map((s) => s.url)
      .filter((u): u is string => Boolean(u?.trim())),
    ageYears,
    trendDirection: entry.trendDirection,
    scores: { ...entry.scores },
  };
}

/**
 * Run every registered provider (live evidence in parallel).
 * Maintenance / refresh only — not used on public page loads.
 */
export async function researchDynamicSignals(
  entry: BaseEntry,
): Promise<DynamicSignalBundle> {
  const ctx = buildContext(entry);
  const providers = getDynamicSignalProviders();
  const providersAttempted: DynamicProviderId[] = providers.map((p) => p.id);

  const batches = await Promise.all(
    providers.map(async (provider) => {
      try {
        return await provider.collect(ctx);
      } catch (err) {
        const observation: DynamicSignalObservation = {
          providerId: provider.id,
          kind: "search-interest",
          value: null,
          note: `Provider error (treated as no data): ${err instanceof Error ? err.message : "unknown"}`,
        };
        return [observation];
      }
    }),
  );

  const observations = batches.flat();

  // LLM judgment pass over the REAL evidence text just gathered above
  // (Reddit/Bluesky post text, News headlines) — this is what now drives
  // Cringe/Brainrot/Influence, instead of pattern-matching the article's
  // own tags against itself. Runs after providers so it can see everything
  // they collected; skipped entirely (returns null → no-op) when there's no
  // live evidence text or Groq isn't configured, so it never blocks a
  // refresh and never invents signal from nothing.
  const interimBundle: DynamicSignalBundle = {
    slug: entry.slug,
    title: entry.title,
    observations,
    providersAttempted,
    hasMeasuredData: observations.some((o) => o.value != null),
    hasLiveEvidence: observations.some(
      (o) => o.value != null && isLiveEvidenceProvider(o.providerId),
    ),
  };

  const now = new Date().toISOString();
  const [culturalJudgment, influenceJudgment] = await Promise.all([
    judgeCulturalIdentity(
      { title: entry.title, category: entry.category },
      interimBundle,
    ).catch(() => null),
    judgeInfluenceEvidence(
      { title: entry.title, category: entry.category },
      interimBundle,
      entry.scores?.influence ?? 0,
    ).catch(() => null),
  ]);

  if (culturalJudgment) {
    const cj = culturalJudgment;
    const push = (
      kind: DynamicSignalObservation["kind"],
      value: number | null,
    ) => {
      if (value == null) return;
      observations.push({
        providerId: "llm-cultural-judgment",
        kind,
        value,
        note: `LLM judgment from real evidence (confidence ${cj.confidence}): ${cj.reasoning}`,
        observedAt: now,
      });
    };
    push("absurdity", cj.absurdity);
    push("gen-cohort-adoption", cj.cohortAdoption);
    push("remix-activity", cj.remixActivity);
    push("mockery-signal", cj.mockerySignal);
    push("outdatedness", cj.outdatedness);
  }

  if (influenceJudgment && influenceJudgment.derivativeAdoption != null) {
    observations.push({
      providerId: "llm-influence-judgment",
      kind: "derivative-adoption",
      value: influenceJudgment.derivativeAdoption,
      note: `LLM judgment from real evidence (confidence ${influenceJudgment.confidence}): ${influenceJudgment.reasoning}`,
      observedAt: now,
    });
  }

  const hasMeasuredData = observations.some((o) => o.value != null);
  const hasLiveEvidence = observations.some(
    (o) => o.value != null && isLiveEvidenceProvider(o.providerId),
  );

  return {
    slug: entry.slug,
    title: entry.title,
    observations,
    providersAttempted,
    hasMeasuredData,
    hasLiveEvidence,
  };
}
