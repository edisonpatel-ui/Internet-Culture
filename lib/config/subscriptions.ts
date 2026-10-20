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
 * Tiers (LIVE Stripe pricing):
 *  - "starter" $19.99/mo — 25,000 requests/month, 60 requests/min.
 *              Stripe Price ID: STRIPE_PRICE_ID_STARTER.
 *  - "pro"     $50/mo — 100,000 requests/month, 120 requests/min. Shown on the
 *              pricing page as "Scale". The internal id stays "pro" so existing
 *              customer/key records and STRIPE_PRICE_ID_PRO keep working.
 *              >>> The 100,000 / 120 numbers are a product decision — change here. <<<
 *  - "free"    1,000 requests/month, 10 requests/min. NOT sold: no free plan on
 *              the pricing page. Kept only for admin-issued partner/test keys
 *              (app/api/admin/keys).
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
    label: "Free (admin-issued)",
    monthlyQuota: 1_000,
    requestsPerMinute: 10,
    priceLabel: null,
    public: false,
  },
  starter: {
    label: "Starter",
    monthlyQuota: 25_000,
    requestsPerMinute: 60,
    priceLabel: "$19.99",
    public: true,
  },
  pro: {
    label: "Scale",
    monthlyQuota: 100_000,
    requestsPerMinute: 120,
    priceLabel: "$50",
    public: true,
  },
};

/** Tiers a customer can buy through Stripe Checkout (order = pricing-page order). */
export const PURCHASABLE_TIERS = ["starter", "pro"] as const;
export type PurchasableTier = (typeof PURCHASABLE_TIERS)[number];

export function isPurchasableTier(value: unknown): value is PurchasableTier {
  return value === "starter" || value === "pro";
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatQuota(tier: SubscriptionTier): string {
  return `${formatNumber(SUBSCRIPTION_TIERS[tier].monthlyQuota)} requests / month`;
}

export function formatBurst(tier: SubscriptionTier): string {
  return `${formatNumber(SUBSCRIPTION_TIERS[tier].requestsPerMinute)} requests / minute`;
}
