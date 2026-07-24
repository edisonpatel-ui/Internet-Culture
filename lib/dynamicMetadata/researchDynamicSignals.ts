import type { BaseEntry } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { getDynamicSignalProviders } from "./providers/registry";
import { isLiveEvidenceProvider } from "./providers/liveIds";
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
