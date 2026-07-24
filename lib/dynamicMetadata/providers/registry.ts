import type { DynamicSignalProvider } from "./types";
import { catalogEvidenceProvider } from "./catalogEvidence";
import { authoritySourcesProvider } from "./authoritySources";
import { wikipediaLiveProvider } from "./wikipediaLive";
import { knowYourMemeLiveProvider } from "./knowYourMemeLive";
import { dictionaryLiveProvider } from "./dictionaryLive";
import { newsLiveProvider } from "./newsLive";
import { creatorPagesLiveProvider } from "./creatorPagesLive";
import { googleTrendsLiveProvider } from "./googleTrendsLive";
import { redditLiveProvider } from "./redditLive";
import { youtubeLiveProvider } from "./youtubeLive";

/**
 * Default provider stack — live evidence first, catalog last as soft fallback
 * for character scores (brainrot/cringe) only.
 *
 * Public pages never call this stack. Maintenance Center refresh only.
 */
const DEFAULT_PROVIDERS: DynamicSignalProvider[] = [
  wikipediaLiveProvider,
  knowYourMemeLiveProvider,
  dictionaryLiveProvider,
  newsLiveProvider,
  creatorPagesLiveProvider,
  googleTrendsLiveProvider,
  redditLiveProvider,
  youtubeLiveProvider,
  authoritySourcesProvider,
  catalogEvidenceProvider,
].sort((a, b) => a.priority - b.priority);

let providers: DynamicSignalProvider[] = [...DEFAULT_PROVIDERS];

export function getDynamicSignalProviders(): readonly DynamicSignalProvider[] {
  return providers;
}

/** Swap the stack for tests or when wiring alternate APIs. */
export function setDynamicSignalProviders(
  next: DynamicSignalProvider[],
): void {
  providers = [...next].sort((a, b) => a.priority - b.priority);
}

export function resetDynamicSignalProviders(): void {
  providers = [...DEFAULT_PROVIDERS];
}
