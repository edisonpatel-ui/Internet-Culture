/**
 * lib/stripe/client.ts
 *
 * Shared Stripe SDK client for server-only routes (app/api/checkout,
 * app/api/webhooks/stripe). Lazily constructed and cached, matching the
 * lazy-Redis-client convention already used across lib/api/* and
 * lib/services/metricsHistory.ts — fails loudly with a clear error if the
 * secret key is missing, rather than an opaque error deep inside the SDK.
 *
 * Uses whatever Stripe API version ships with the installed `stripe`
 * package (no pinned `apiVersion` override) to avoid drifting out of sync
 * with the SDK's own TypeScript types.
 */

import Stripe from "stripe";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "[lib/stripe/client] Missing STRIPE_SECRET_KEY. Set it to your Stripe Sandbox " +
        "(test mode) secret key — see .env.example.",
    );
  }

  cachedClient = new Stripe(secretKey);
  return cachedClient;
}

export type PricingTier = "starter" | "pro";

/** Maps a pricing tier to its configured Stripe Price ID. */
export function getPriceIdForTier(tier: PricingTier): string {
  const envVar = tier === "starter" ? "STRIPE_PRICE_ID_STARTER" : "STRIPE_PRICE_ID_PRO";
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(`[lib/stripe/client] Missing ${envVar}. Set it in your environment.`);
  }
  return priceId;
}
