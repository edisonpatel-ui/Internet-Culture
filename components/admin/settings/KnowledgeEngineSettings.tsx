import Link from "next/link";
import { getDynamicSignalProviders } from "@/lib/dynamicMetadata";
import { isLiveEvidenceProvider } from "@/lib/dynamicMetadata/providers/liveIds";

function envFlag(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  if (v == null || v === "") return false;
  return v !== "0" && v !== "false" && v !== "off";
}

/**
 * Knowledge Engine settings — backend diagnostics only.
 * No editorial queues or research tasks.
 */
export function KnowledgeEngineSettings() {
  const providers = getDynamicSignalProviders();
  const youtubeConfigured = Boolean(process.env.YOUTUBE_DATA_API_KEY?.trim());
  const googleTrendsEnabled =
    process.env.GOOGLE_TRENDS_ENABLED?.trim().toLowerCase() !== "false";
  const authConfigured = Boolean(process.env.AUTH_SECRET?.trim());

  const confidenceFloor =
    Number(process.env.KE_CONFIDENCE_FLOOR ?? "0.55") || 0.55;
  const experimentalLiveFetch = envFlag("KE_EXPERIMENTAL_LIVE_FETCH");
  const experimentalDraftAssist = envFlag("KE_EXPERIMENTAL_DRAFT_ASSIST");

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Internal
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Knowledge Engine Settings
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Infrastructure only. Draft Studio and Maintenance use this
          automatically.
        </p>
      </header>

      <section className="rounded-lg border border-zinc-800 p-4">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          API status
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          <StatusRow
            label="Admin session (AUTH_SECRET)"
            ok={authConfigured}
            detail={authConfigured ? "Configured" : "Missing"}
          />
          <StatusRow
            label="YouTube Data API"
            ok={youtubeConfigured}
            detail={youtubeConfigured ? "Key present" : "Optional — unset"}
          />
          <StatusRow
            label="Google Trends RSS"
            ok={googleTrendsEnabled}
            detail={googleTrendsEnabled ? "Enabled" : "Disabled via env"}
          />
        </ul>
      </section>

      <section className="rounded-lg border border-zinc-800 p-4">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Enabled providers
        </h2>
        <ul className="mt-3 divide-y divide-zinc-900 text-sm">
          {providers.map((p) => {
            const live = isLiveEvidenceProvider(p.id);
            let health = "Ready";
            if (p.id === "youtube" && !youtubeConfigured) {
              health = "Skipped (no API key)";
            }
            if (p.id === "google-trends" && !googleTrendsEnabled) {
              health = "Disabled";
            }
            return (
              <li
                key={p.id}
                className="flex flex-wrap items-baseline justify-between gap-2 py-2"
              >
                <div>
                  <p className="text-zinc-200">{p.label}</p>
                  <p className="text-xs text-zinc-600">
                    {p.id} · {live ? "live evidence" : "fallback / character"}
                  </p>
                </div>
                <span
                  className={
                    health.startsWith("Ready")
                      ? "text-xs text-emerald-400/90"
                      : "text-xs text-zinc-500"
                  }
                >
                  {health}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-lg border border-zinc-800 p-4">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Confidence thresholds
        </h2>
        <p className="mt-3 text-sm text-zinc-300">
          Floor:{" "}
          <span className="font-mono text-zinc-100">
            {confidenceFloor.toFixed(2)}
          </span>
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Set{" "}
          <code className="text-zinc-400">KE_CONFIDENCE_FLOOR</code> (0–1).
          Below this, Maintenance marks scores Unknown instead of guessing.
        </p>
      </section>

      <section className="rounded-lg border border-zinc-800 p-4">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Experimental feature toggles
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li>
            Live HTTP fetch assist:{" "}
            <span className="font-mono text-zinc-100">
              {experimentalLiveFetch ? "on" : "off"}
            </span>
            <span className="block text-xs text-zinc-600">
              KE_EXPERIMENTAL_LIVE_FETCH
            </span>
          </li>
          <li>
            Draft assist:{" "}
            <span className="font-mono text-zinc-100">
              {experimentalDraftAssist ? "on" : "off"}
            </span>
            <span className="block text-xs text-zinc-600">
              KE_EXPERIMENTAL_DRAFT_ASSIST
            </span>
          </li>
        </ul>
      </section>

      <p className="text-xs text-zinc-600">
        <Link href="/admin" className="text-zinc-400 hover:text-zinc-200">
          ← Admin
        </Link>
      </p>
    </div>
  );
}

function StatusRow({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-2">
      <span className="text-zinc-300">{label}</span>
      <span className={ok ? "text-xs text-emerald-400/90" : "text-xs text-zinc-500"}>
        {detail}
      </span>
    </li>
  );
}
