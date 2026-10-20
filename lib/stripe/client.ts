/**
 * lib/stripe/client.ts
 *
 * Shared Stripe SDK client for server-only routes (checkout, webhook,
 * billing portal). Lazily constructed and cached; fails loudly with a clear
 * error if the secret key is missing.
 *
 * LIVE MODE: nothing here is mode-specific — the mode is decided entirely by
 * the keys in the environment (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and
 * the STRIPE_PRICE_ID_* values must ALL come from the same mode). In
 * production we log one loud warning if the secret key looks like a test key
 * so a half-switched deployment is obvious in the logs.
 *
 * Uses whatever Stripe API version ships with the installed `stripe`
 * package (no pinned `apiVersion`) to stay in sync with the SDK's types.
 */

import Stripe from "stripe";
import type { PurchasableTier } from "@/lib/config/subscriptions";

let cachedClient: Stripe | null = null;

export type PricingTier = PurchasableTier;

export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("[lib/stripe/client] Missing STRIPE_SECRET_KEY. Set it in your environment (see .env.example).");
  }

  if (process.env.NODE_ENV === "production" && /^(sk|rk)_test_/.test(secretKey)) {
    console.error(
      "[lib/stripe/client] WARNING: NODE_ENV=production but STRIPE_SECRET_KEY is a TEST-mode key. " +
        "Real customers would not be charged. Use your live key (sk_live_...) for production.",
    );
  }

  cachedClient = new Stripe(secretKey);
  return cachedClient;
}

const PRICE_ENV_VARS: Record<PricingTier, string> = {
  starter: "STRIPE_PRICE_ID_STARTER",
  pro: "STRIPE_PRICE_ID_PRO",
};

/** Maps a pricing tier to its configured (live) Stripe Price ID. */
export function getPriceIdForTier(tier: PricingTier): string {
  const envVar = PRICE_ENV_VARS[tier];
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(`[lib/stripe/client] Missing ${envVar}. Set it in your environment.`);
  }
  return priceId;
}

/**
 * Reverse of getPriceIdForTier — resolves a Stripe Price ID (e.g. from a
 * subscription's items) back to our tier, or null if it is not one of ours.
 * Used by the subscription lifecycle webhooks to detect plan changes.
 */
export function getTierForPriceId(priceId: string | null | undefined): PricingTier | null {
  if (!priceId) return null;
  for (const tier of Object.keys(PRICE_ENV_VARS) as PricingTier[]) {
    if (process.env[PRICE_ENV_VARS[tier]] === priceId) return tier;
  }
  return null;
}
