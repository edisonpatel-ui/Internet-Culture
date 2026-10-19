/**
 * lib/config/subscriptions.ts
 *
 * SINGLE SOURCE OF TRUTH for subscription tiers: monthly request quota,
 * per-minute burst limit, display labels and (for paid tiers) list price.
 *
 * Everything that shows or enforces these numbers derives from here:
 *   - enforcement:   lib/api/validateRequest.ts (via lib/api/keys.ts re-exports)
 *   - pricing page:  app/pricing/page.tsx
 *   - guides page:   app/guides/page.tsx
 *   - dashboard:     app/dashboard/page.tsx, components/dashboard/ApiUsageGuide.tsx
 *   - emails:        lib/email/welcomeEmail.ts
 * To change a quota or rate limit, edit ONLY this file.
 *
 * Tiers:
 *  - "free"    1,000 requests/month, 10 requests/min. Keys are issued by an
 *              admin (app/api/admin/keys) — there is no self-serve signup yet.
 *  - "pro"     25,000 requests/month, 60 requests/min. Stripe Checkout.
 *  - "starter" LEGACY. No longer sold (hidden from the pricing page), but
 *              kept so existing Starter subscribers and stored customer
 *              records keep working. Deliberately given Pro's limits so
 *              nobody is downgraded by the tier restructure.
 */

export type SubscriptionTier = "free" | "starter" | "pro";

export interface TierConfig {
  /** Display name, e.g. "Pro". */
  label: string;
  /** Requests allowed per calendar month (UTC). */
  monthlyQuota: number;
  /** Requests allowed per rolling 60-second window. */
  requestsPerMinute: number;
  /** Display price per month, or null for non-purchasable tiers. */
  priceLabel: string | null;
  /** Whether the tier is offered on the pricing page. */
  public: boolean;
}

export const SUBSCRIPTION_TIERS: Record<SubscriptionTier, TierConfig> = {
  free: {
    label: "Free",
    monthlyQuota: 1_000,
    requestsPerMinute: 10,
    priceLabel: null,
    public: true,
  },
  pro: {
    label: "Pro",
    monthlyQuota: 25_000,
    requestsPerMinute: 60,
    priceLabel: "$49.99",
    public: true,
  },
  starter: {
    label: "Pro (legacy Starter)",
    monthlyQuota: 25_000,
    requestsPerMinute: 60,
    priceLabel: null,
    public: false,
  },
};

/** Tiers a customer can buy through Stripe Checkout today. */
export const PURCHASABLE_TIERS = ["pro"] as const;

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatQuota(tier: SubscriptionTier): string {
  return `${formatNumber(SUBSCRIPTION_TIERS[tier].monthlyQuota)} requests / month`;
}

export function formatBurst(tier: SubscriptionTier): string {
  return `${formatNumber(SUBSCRIPTION_TIERS[tier].requestsPerMinute)} requests / minute`;
}
