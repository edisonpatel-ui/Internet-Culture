/**
 * app/api/dashboard/usage/route.ts
 *
 * GET — for the currently logged-in customer: returns the last 30 days of
 * API usage (one point per day, zero-filled gaps included), plus summary
 * stats for components/dashboard/UsageChart.tsx:
 *
 *   {
 *     daily: [{ date: "2026-09-01", count: 42 }, ...],   // 30 points, oldest first
 *     averageDailyVelocity: number,                       // mean of the 30 points
 *     peakUsageDay: { date: string, count: number } | null,
 *     errorPercentage: number,                             // this month, status >= 400
 *     monthlyLimit: number | null,                          // null = unlimited tier
 *     dailyQuotaCeiling: number | null,                     // monthlyLimit / 30, for the chart's reference line
 *   }
 *
 * Session-gated like every other /api/dashboard/* route (ci_session
 * cookie via lib/customerAuth/session.ts) — NOT part of the Bearer-key
 * /api/v1 surface, so it does not go through lib/api/middleware.ts.
 * Backed by lib/api/metrics.ts, which is populated by every authenticated
 * /api/v1 request (see that module and lib/api/middleware.ts) — a brand
 * new customer who hasn't made any API calls yet simply gets an all-zero
 * series, not an error.
 */

import { NextResponse } from "next/server";
import { requireCustomerSession } from "@/lib/customerAuth/session";
import { getCustomerRecord } from "@/lib/customer/store";
import { TIER_MONTHLY_QUOTAS } from "@/lib/api/keys";
import { getDailyUsageSeries, getMonthlyStatusBreakdown, type DailyUsagePoint } from "@/lib/api/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_DAYS = 30;

function findPeakDay(series: DailyUsagePoint[]): DailyUsagePoint | null {
  if (series.length === 0) return null;
  return series.reduce((peak, point) => (point.count > peak.count ? point : peak), series[0]);
}

export async function GET() {
  const session = await requireCustomerSession();
  if (!session.ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const customer = await getCustomerRecord(session.email);
    if (!customer) {
      return NextResponse.json({ error: "No account found for this login." }, { status: 404 });
    }

    const [daily, statusBreakdown] = await Promise.all([
      getDailyUsageSeries(customer.hashedKey, WINDOW_DAYS),
      getMonthlyStatusBreakdown(customer.hashedKey),
    ]);

    const totalRequests = daily.reduce((sum, point) => sum + point.count, 0);
    const averageDailyVelocity = Math.round((totalRequests / WINDOW_DAYS) * 10) / 10;
    const peakUsageDay = findPeakDay(daily);

    const monthlyLimit = TIER_MONTHLY_QUOTAS[customer.tier];
    const dailyQuotaCeiling = monthlyLimit != null ? Math.round(monthlyLimit / WINDOW_DAYS) : null;

    return NextResponse.json(
      {
        daily,
        averageDailyVelocity,
        peakUsageDay,
        errorPercentage: statusBreakdown.errorPercentage,
        monthlyLimit,
        dailyQuotaCeiling,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(`[api/dashboard/usage] failed for ${session.email}:`, err);
    return NextResponse.json({ error: "Failed to load usage data. Please try again." }, { status: 500 });
  }
}
