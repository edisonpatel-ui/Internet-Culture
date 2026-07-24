import type { DynamicSignalProvider } from "./types";
import { catalogEvidenceProvider } from "./catalogEvidence";
import { authoritySourcesProvider } from "./authoritySources";
import {
  creatorPagesProvider,
  dictionaryProvider,
  googleTrendsProvider,
  knowYourMemeProvider,
  newsProvider,
  redditProvider,
  wikipediaProvider,
  youtubeProvider,
} from "./unwired";

/**
 * Default provider stack — exhaust trustworthy sources before Unknown.
 * Live providers are stubs today; catalog + cited sources always run.
 */
const DEFAULT_PROVIDERS: DynamicSignalProvider[] = [
  wikipediaProvider,
  knowYourMemeProvider,
  dictionaryProvider,
  newsProvider,
  creatorPagesProvider,
  googleTrendsProvider,
  redditProvider,
  youtubeProvider,
  authoritySourcesProvider,
  catalogEvidenceProvider,
].sort((a, b) => a.priority - b.priority);

let providers: DynamicSignalProvider[] = [...DEFAULT_PROVIDERS];

export function getDynamicSignalProviders(): readonly DynamicSignalProvider[] {
  return providers;
}

/** Swap the stack for tests or when wiring live APIs. */
export function setDynamicSignalProviders(
  next: DynamicSignalProvider[],
): void {
  providers = [...next].sort((a, b) => a.priority - b.priority);
}

export function resetDynamicSignalProviders(): void {
  providers = [...DEFAULT_PROVIDERS];
}
