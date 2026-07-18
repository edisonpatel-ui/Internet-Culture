/**
 * Integration registry — all providers null until a real launch phase.
 *
 * Import from here when wiring future services. Do not scatter env checks
 * across components.
 */

import type { IntegrationRegistry } from "./types";

export type {
  AdSlotId,
  AdSlotProps,
  AffiliateLink,
  AffiliateProvider,
  AiAssistProvider,
  AuthProvider,
  AuthSession,
  DataStoreProvider,
  IntegrationRegistry,
  ShopProvider,
} from "./types";

/**
 * Single source of truth for “is this integration on?”
 * Flip flags only when a real provider is implemented and reviewed.
 */
export const integrations: IntegrationRegistry = {
  auth: null,
  dataStore: null,
  ai: null,
  affiliate: null,
  shop: null,
  flags: {
    adsEnabled: false,
    authEnabled: false,
    shopEnabled: false,
    aiAssistEnabled: false,
  },
};

export function isIntegrationEnabled(
  flag: keyof IntegrationRegistry["flags"],
): boolean {
  return integrations.flags[flag] === true;
}
