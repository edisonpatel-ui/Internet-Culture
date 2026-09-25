import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { CheckoutButton } from "@/components/pricing/CheckoutButton";

export const metadata = createMetadata({
  title: "API Pricing",
  description: `Culture Graph API pricing — real-time cultural intelligence for memes, slang, and internet trends, from ${SITE_NAME}.`,
  path: "/pricing",
});

const TIERS = [
  {
    tier: "starter" as const,
    name: "Starter",
    price: "$19",
    quota: "25,000 requests / month",
    burst: "100 requests / minute",
    features: [
      "Full Culture Graph API access",
      "velocityIndex, decayTracker, originMapping, templateData",
      "25,000 requests included monthly",
      "Email support",
    ],
  },
  {
    tier: "pro" as const,
    name: "Pro",
    price: "$49",
    quota: "250,000 requests / month",
    burst: "1,000 requests / minute",
    features: [
      "Everything in Starter",
      "250,000 requests included monthly",
      "Higher burst rate limit",
      "Priority email support",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
          Culture Graph API
        </p>
        <h1 className="font-page mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Cultural intelligence, priced simply
        </h1>
        <p className="font-page mt-4 text-base leading-relaxed text-zinc-400">
          Real-time velocity, decay tracking, origin mapping, and template data for
          memes, slang, and internet trends. Test-mode Stripe Sandbox checkout — no
          real charges.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TIERS.map((t) => (
          <div
            key={t.tier}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          >
            <h2 className="text-lg font-semibold text-white">{t.name}</h2>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{t.price}</span>
              <span className="text-sm text-zinc-500">/mo</span>
            </p>
            <p className="mt-1 text-sm text-zinc-400">{t.quota}</p>
            <p className="text-xs text-zinc-500">{t.burst} burst limit</p>

            <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
              {t.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden className="mt-0.5 text-[var(--accent)]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CheckoutButton tier={t.tier} label={`Get ${t.name}`} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-zinc-500">
        Want to try before you buy?{" "}
        <Link
          href="/demo"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          Explore the live demo
        </Link>{" "}
        or read the{" "}
        <Link
          href="/docs/api"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          API documentation
        </Link>
        . Cancel anytime — see our{" "}
        <Link
          href="/refunds"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          refund policy
        </Link>
        .
      </p>
    </main>
  );
}
