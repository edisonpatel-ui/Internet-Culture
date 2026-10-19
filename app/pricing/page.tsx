import type { ReactNode } from "react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { CheckoutButton } from "@/components/pricing/CheckoutButton";
import { SUBSCRIPTION_TIERS, formatBurst, formatNumber, formatQuota } from "@/lib/config/subscriptions";

export const metadata = createMetadata({
  title: "API Pricing",
  description: `Culture Graph API pricing — real-time cultural intelligence for memes, slang, and internet trends, from ${SITE_NAME}.`,
  path: "/pricing",
});

const FREE = SUBSCRIPTION_TIERS.free;
const PRO = SUBSCRIPTION_TIERS.pro;

// Every number below comes from lib/config/subscriptions.ts — edit limits there.
const FREE_FEATURES = [
  "Full Culture Graph API access",
  "Velocity scoring, decay index, origin timeline, and template data",
  `${formatNumber(FREE.monthlyQuota)} requests included monthly`,
  "Community support",
];

const PRO_FEATURES = [
  "Everything in Free",
  `${formatNumber(PRO.monthlyQuota)} requests included monthly`,
  `${formatNumber(PRO.requestsPerMinute)} requests per minute burst limit`,
  "Priority email support",
];

function PlanCard({
  name,
  price,
  quota,
  burst,
  features,
  action,
}: {
  name: string;
  price: string;
  quota: string;
  burst: string;
  features: string[];
  action: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-sm text-zinc-500">/mo</span>
      </p>
      <p className="mt-1 text-sm text-zinc-400">{quota}</p>
      <p className="text-xs text-zinc-500">{burst} burst limit</p>

      <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span aria-hidden className="mt-0.5 text-[var(--accent)]">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">{action}</div>
    </div>
  );
}

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
          Predictive trend metrics and real-time velocity scoring for memes, slang,
          and internet culture.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <PlanCard
          name={FREE.label}
          price="$0"
          quota={formatQuota("free")}
          burst={formatBurst("free")}
          features={FREE_FEATURES}
          action={
            <Link
              href="/contact"
              className="block w-full rounded-lg border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Request a free key
            </Link>
          }
        />
        <PlanCard
          name={PRO.label}
          price={PRO.priceLabel ?? ""}
          quota={formatQuota("pro")}
          burst={formatBurst("pro")}
          features={PRO_FEATURES}
          action={<CheckoutButton tier="pro" label={`Get ${PRO.label}`} />}
        />
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
          href="/guides"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          Developer Guides
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
