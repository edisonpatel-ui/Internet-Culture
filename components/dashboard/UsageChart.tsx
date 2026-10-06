"use client";

/**
 * components/dashboard/UsageChart.tsx
 *
 * Fetches the logged-in customer's 30-day usage series from
 * GET /api/dashboard/usage and renders it as an interactive SVG bar chart.
 *
 * Client component: the dashboard page itself (app/dashboard/page.tsx) is
 * a server component that already does its own session-gated data
 * fetching for the quota bar / key management; this chart fetches
 * separately client-side so a slow Redis KEYS scan
 * (getMonthlyStatusBreakdown) never blocks the rest of the page from
 * painting.
 */

import { useEffect, useState } from "react";

interface DailyUsagePoint {
  date: string;
  count: number;
}

interface UsageResponse {
  daily: DailyUsagePoint[];
  averageDailyVelocity: number;
  peakUsageDay: DailyUsagePoint | null;
  errorPercentage: number;
  monthlyLimit: number | null;
  dailyQuotaCeiling: number | null;
}

const CHART_WIDTH = 600;
const CHART_HEIGHT = 160;
const CHART_PADDING_TOP = 8;

function formatShortDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = Number(month) - 1;
  return `${monthNames[monthIndex] ?? month} ${Number(day)}`;
}

export function UsageChart() {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/dashboard/usage");
        if (!res.ok) {
          throw new Error("Failed to load usage data.");
        }
        const json = (await res.json()) as UsageResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError("Couldn't load usage data. Please refresh to try again.");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="text-sm text-zinc-500">{error}</p>;
  }

  if (!data) {
    return (
      <div className="h-[160px] w-full animate-pulse rounded-lg bg-white/[0.03]" aria-label="Loading usage chart" />
    );
  }

  const { daily, averageDailyVelocity, peakUsageDay, errorPercentage } = data;
  const maxCount = Math.max(...daily.map((d) => d.count), 1);
  const barAreaHeight = CHART_HEIGHT - CHART_PADDING_TOP;
  const barWidth = CHART_WIDTH / daily.length;

  return (
    <div>
      <div>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-40 w-full"
          role="img"
          aria-label="API requests per day over the last 30 days"
          preserveAspectRatio="none"
        >
          {daily.map((point, i) => {
            const barHeight = (point.count / maxCount) * barAreaHeight;
            const x = i * barWidth;
            const y = CHART_PADDING_TOP + (barAreaHeight - barHeight);
            const isHovered = hoveredIndex === i;
            return (
              <rect
                key={point.date}
                x={x + barWidth * 0.15}
                y={y}
                width={barWidth * 0.7}
                height={Math.max(barHeight, point.count > 0 ? 2 : 0)}
                rx={1.5}
                className={isHovered ? "fill-[var(--accent)]" : "fill-[var(--accent)]/60"}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex((current) => (current === i ? null : current))}
              >
                <title>
                  {formatShortDate(point.date)}: {point.count.toLocaleString()} requests
                </title>
              </rect>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
        <span>{formatShortDate(daily[0]?.date ?? "")}</span>
        <span>{formatShortDate(daily[daily.length - 1]?.date ?? "")}</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-600">Avg. daily</p>
          <p className="mt-1 text-sm font-semibold text-white">{averageDailyVelocity.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-600">Peak day</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {peakUsageDay && peakUsageDay.count > 0
              ? `${peakUsageDay.count.toLocaleString()} (${formatShortDate(peakUsageDay.date)})`
              : "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-600">Error rate</p>
          <p className={`mt-1 text-sm font-semibold ${errorPercentage > 5 ? "text-amber-400" : "text-white"}`}>
            {errorPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}
