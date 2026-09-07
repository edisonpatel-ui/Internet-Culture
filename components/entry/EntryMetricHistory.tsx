import { getMetricHistory, type MetricSnapshot } from "@/lib/services/metricsHistory";

interface EntryMetricHistoryProps {
  slug: string;
  /** Current canonical relevance score (0-100) — used as the sole data
   * point when Redis has no history yet for this slug (e.g. a newly
   * published article that hasn't been through a cron/manual refresh
   * cycle), so the chart never renders empty or throws. */
  currentRelevance: number;
}

const CHART_WIDTH = 240;
const CHART_HEIGHT = 48;

/**
 * Renders a small inline sparkline of an entry's Redis-backed relevance
 * history (see lib/services/metricsHistory.ts — the same store the Vercel
 * Cron job and sync-upstash.js write to). This is a Server Component on a
 * statically-generated page: the Redis read happens once at build/
 * revalidation time, not per visitor request, so it never adds a dynamic
 * per-page-view dependency on Upstash to the public site.
 *
 * Deliberately defensive on every path that touches Redis or the fetched
 * data, because none of the following are things this component controls:
 *   - Redis env vars may not be configured at all in a given environment.
 *   - Upstash may be unreachable/rate-limited at build time.
 *   - A brand-new slug will have zero stored snapshots.
 * In every one of those cases this renders a single flat point from the
 * entry's own current canonical score rather than an empty chart, an
 * error boundary, or a build failure — a metrics outage must never take
 * down an article page.
 */
export async function EntryMetricHistory({
  slug,
  currentRelevance,
}: EntryMetricHistoryProps) {
  let history: MetricSnapshot[] = [];

  try {
    history = await getMetricHistory(slug);
  } catch {
    // Redis unreachable/misconfigured — fall through to the single-point
    // fallback below rather than failing the page.
    history = [];
  }

  const points: MetricSnapshot[] =
    history.length > 0
      ? history
      : [
          {
            date: new Date().toISOString().slice(0, 10),
            relevance: currentRelevance,
            velocity: 0,
          },
        ];

  const latest = points[points.length - 1];
  const isFallback = history.length === 0;

  const values = points.map((p) => p.relevance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  // Avoid a divide-by-zero when every point has the same value (including
  // the single-point fallback case) — draw a flat line instead of NaN.
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x =
      points.length === 1
        ? CHART_WIDTH / 2
        : (i / (points.length - 1)) * CHART_WIDTH;
    const y = CHART_HEIGHT - ((p.relevance - min) / range) * CHART_HEIGHT;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <div className="glass-card flex items-center gap-4 p-4">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-10 w-40 shrink-0"
        role="img"
        aria-label={`Relevance trend for the last ${points.length} recorded point${points.length === 1 ? "" : "s"}`}
      >
        {points.length > 1 ? (
          <polyline
            points={coords.join(" ")}
            fill="none"
            className="stroke-[var(--accent)]"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ) : (
          <circle
            cx={CHART_WIDTH / 2}
            cy={CHART_HEIGHT / 2}
            r={3}
            className="fill-[var(--accent)]"
          />
        )}
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">
          Relevance {latest.relevance}
          {latest.velocity !== 0 && (
            <span
              className={
                latest.velocity > 0 ? "ml-1 text-emerald-400" : "ml-1 text-red-400"
              }
            >
              {latest.velocity > 0 ? "+" : ""}
              {latest.velocity}
            </span>
          )}
        </p>
        <p className="text-xs text-zinc-500">
          {isFallback
            ? "No trend history yet — first snapshot pending."
            : `${points.length} recorded point${points.length === 1 ? "" : "s"} · latest ${latest.date}`}
        </p>
      </div>
    </div>
  );
}
