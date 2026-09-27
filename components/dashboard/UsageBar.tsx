export function UsageBar({
  used,
  limit,
}: {
  used: number;
  limit: number | null;
}) {
  if (limit === null) {
    return (
      <div>
        <p className="text-sm text-zinc-400">
          <span className="font-semibold text-white">{used.toLocaleString()}</span> requests this month
        </p>
        <p className="mt-1 text-xs text-zinc-600">Unmetered plan — no monthly cap.</p>
      </div>
    );
  }

  const percent = Math.min(100, Math.round((used / limit) * 100));
  const isNearLimit = percent >= 90;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-zinc-300">
          <span className="font-semibold text-white">{used.toLocaleString()}</span> /{" "}
          {limit.toLocaleString()} requests used this month
        </p>
        <span className={`text-xs font-medium ${isNearLimit ? "text-amber-400" : "text-zinc-500"}`}>
          {percent}%
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${isNearLimit ? "bg-amber-500" : "bg-[var(--accent)]"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {isNearLimit && (
        <p className="mt-2 text-xs text-amber-400">
          Approaching your monthly limit. Consider upgrading on the{" "}
          <a href="/pricing" className="underline decoration-white/20 underline-offset-2 hover:text-amber-300">
            pricing page
          </a>
          .
        </p>
      )}
    </div>
  );
}
