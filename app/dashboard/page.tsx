import { redirect } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { requireCustomerSession } from "@/lib/customerAuth/session";
import { getCustomerRecord } from "@/lib/customer/store";
import { TIER_MONTHLY_QUOTAS } from "@/lib/api/keys";
import { peekMonthlyUsage } from "@/lib/api/monthlyQuota";
import { UsageBar } from "@/components/dashboard/UsageBar";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { DashboardInteractive } from "@/components/dashboard/DashboardInteractive";
import { BillingButton } from "@/components/dashboard/BillingButton";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { AccountControls } from "@/components/dashboard/AccountControls";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "Manage your Culture Graph API key, usage, and billing.",
  path: "/dashboard",
  robots: { index: false, follow: false },
});

export default async function DashboardPage() {
  const session = await requireCustomerSession();
  if (!session.ok) {
    redirect("/login");
  }

  const customer = await getCustomerRecord(session.email);
  if (!customer) {
    // Session is valid but there's no matching account record — shouldn't
    // normally happen (sessions are only issued to existing customers, see
    // app/api/auth/verify), but fail safely rather than crash the page.
    return (
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6">
          <p className="text-sm text-red-300">
            We couldn&apos;t find an account for {session.email}. If you believe this is an
            error, contact support.
          </p>
        </div>
      </main>
    );
  }

  const monthlyLimit = TIER_MONTHLY_QUOTAS[customer.tier];
  const usage = await peekMonthlyUsage(customer.hashedKey, monthlyLimit);

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
            {customer.tier === "pro" ? "Pro Plan" : "Starter Plan"}
          </p>
          <h1 className="font-page mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{customer.email}</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Usage</h2>
        <div className="mt-3">
          <UsageBar used={usage.used} limit={usage.limit} />
        </div>
        <div className="mt-6 border-t border-white/10 pt-6">
          <UsageChart />
        </div>
      </div>

      <div className="mt-8">
        <DashboardInteractive keyLastFour={customer.keyLastFour} />
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Billing</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Update your payment method, view invoices, or change your plan.
        </p>
        <div className="mt-4">
          <BillingButton />
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Account</h2>
        <div className="mt-4">
          <AccountControls email={customer.email} />
        </div>
      </div>
    </main>
  );
}
