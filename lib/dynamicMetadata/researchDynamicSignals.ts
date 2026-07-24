import type { BaseEntry } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { getDynamicSignalProviders } from "./providers/registry";
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
 * Run every registered provider (trustworthy stack first).
 * Does not invent observations — unwired providers return null values.
 */
export async function researchDynamicSignals(
  entry: BaseEntry,
): Promise<DynamicSignalBundle> {
  const ctx = buildContext(entry);
  const providers = getDynamicSignalProviders();
  const observations: DynamicSignalObservation[] = [];
  const providersAttempted: DynamicProviderId[] = [];

  for (const provider of providers) {
    providersAttempted.push(provider.id);
    try {
      const batch = await provider.collect(ctx);
      observations.push(...batch);
    } catch (err) {
      observations.push({
        providerId: provider.id,
        kind: "search-interest",
        value: null,
        note: `Provider error (treated as no data): ${err instanceof Error ? err.message : "unknown"}`,
      });
    }
  }

  const hasMeasuredData = observations.some((o) => o.value != null);

  return {
    slug: entry.slug,
    title: entry.title,
    observations,
    providersAttempted,
    hasMeasuredData,
  };
}
