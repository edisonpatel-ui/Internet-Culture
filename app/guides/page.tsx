import Link from "next/link";
import { createMetadata, BASE_URL } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { ApiPlayground } from "@/components/ApiPlayground";

export const metadata = createMetadata({
  title: "Developer Guides",
  description: `Developer guides for the Culture Graph API — authentication, quotas, batch lookups, error handling, and a live sandbox, from ${SITE_NAME}.`,
  path: "/guides",
});

const curlExample = `curl "${BASE_URL}/api/v1/terms/brainrot" \\
  -H "Authorization: Bearer cg_live_your_api_key"`;

const jsExample = `const response = await fetch("${BASE_URL}/api/v1/terms/brainrot", {
  headers: { Authorization: "Bearer cg_live_your_api_key" },
});

if (!response.ok) {
  const { error } = await response.json();
  throw new Error(\`\${error.code}: \${error.message}\`);
}

const { data } = await response.json();
console.log(data.velocityIndex, data.decayTracker, data.originMapping);`;

const pythonExample = `import requests

response = requests.get(
    "${BASE_URL}/api/v1/terms/brainrot",
    headers={"Authorization": "Bearer cg_live_your_api_key"},
    timeout=10,
)
response.raise_for_status()
data = response.json()["data"]
print(data["velocityIndex"], data["decayTracker"])`;

const batchRequest = `curl -X POST "${BASE_URL}/api/v1/terms/batch" \\
  -H "Authorization: Bearer cg_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{ "slugs": ["rizz", "aura", "not-a-real-term"] }'`;

const batchResponse = `{
  "success": true,
  "data": [
    { "slug": "rizz", "found": true, "term": { "term": "Rizz", "velocityIndex": "4.2%" } },
    { "slug": "aura", "found": true, "term": { "term": "Aura", "velocityIndex": "-1.3%" } },
    { "slug": "not-a-real-term", "found": false }
  ],
  "meta": { "requested": 3, "found": 2 }
}`;

const responseSchema = `{
  "success": true,
  "data": {
    "term": "Brainrot",
    "definition": "...",
    "category": "slang",
    "velocityIndex": "12.5%",
    "decayTracker": {
      "cringeStatus": "Rising",
      "decayIndex": 0.42
    },
    "originMapping": [
      { "platform": "tiktok", "stage": "Origin", "date": "2023-06-01" },
      { "platform": "tiktok", "stage": "Current", "date": "2026-08-01" }
    ],
    "templateData": {
      "name": "slang term",
      "status": "Established",
      "viralPreferenceScore": 74
    },
    "relatedSlugs": ["skibidi-toilet", "gyatt"]
  }
}`;

const errorSchema = `{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Please slow down and try again shortly.",
    "status": 429
  }
}`;

const retryExample = `async function getTerm(slug, attempt = 0) {
  const res = await fetch(\`${BASE_URL}/api/v1/terms/\${slug}\`, {
    headers: { Authorization: "Bearer cg_live_your_api_key" },
  });

  // Back off on burst limiting; fail fast on everything else.
  if (res.status === 429 && attempt < 3) {
    await new Promise((r) => setTimeout(r, 2 ** attempt * 1000));
    return getTerm(slug, attempt + 1);
  }
  if (!res.ok) throw new Error((await res.json()).error.code);
  return (await res.json()).data;
}`;

const TOC = [
  { id: "quickstart", label: "Quickstart" },
  { id: "authentication", label: "Authentication" },
  { id: "term-lookup", label: "Term lookup" },
  { id: "batch", label: "Batch lookup" },
  { id: "response", label: "Response schema" },
  { id: "limits", label: "Rate limits & quotas" },
  { id: "errors", label: "Errors" },
  { id: "playground", label: "Live demo" },
] as const;

const inlineCode = "rounded bg-white/10 px-1.5 py-0.5 text-xs";

export default function DeveloperGuidesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-secondary)]">
          Developer Guides
        </p>
        <h1 className="font-page mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Build with the Culture Graph API
        </h1>
        <p className="font-page mt-4 text-base leading-relaxed text-zinc-400">
          Predictive trend metrics and real-time velocity scoring for memes, slang, and internet
          culture — delivered as a single, consistent JSON API. These guides take you from your
          first request to production-ready error handling.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-white/10 text-sm">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="-ml-px block border-l border-transparent py-1 pl-4 text-zinc-400 hover:border-[var(--accent-secondary)] hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Link href="/docs" className="pl-4 text-xs text-zinc-500 hover:text-white">
                Full API Reference →
              </Link>
            </li>
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl space-y-14">
          <section id="quickstart" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Quickstart</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>
                Choose a plan on the{" "}
                <Link href="/pricing" className="text-[var(--accent-secondary)] underline underline-offset-2">
                  pricing page
                </Link>{" "}
                — your API key is issued immediately after checkout and is always available in your{" "}
                <Link href="/dashboard" className="text-[var(--accent-secondary)] underline underline-offset-2">
                  dashboard
                </Link>
                .
              </li>
              <li>Send the key as a bearer token on every request.</li>
              <li>Call a term endpoint and read the metrics from the response.</li>
            </ol>
            <div className="mt-4 space-y-4">
              <CodeBlock language="curl" code={curlExample} />
              <CodeBlock language="javascript" code={jsExample} />
              <CodeBlock language="python" code={pythonExample} />
            </div>
          </section>

          <section id="authentication" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Authentication</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Authenticate every request with your API key in the{" "}
              <code className={inlineCode}>Authorization</code> header. Keys are stored only as
              one-way hashes — the full key is shown once at creation. If a key is exposed, rotate it
              from your dashboard; the previous key is revoked immediately.
            </p>
            <div className="mt-3">
              <CodeBlock language="http" code={"Authorization: Bearer cg_live_your_api_key"} />
            </div>
          </section>

          <section id="term-lookup" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Term lookup</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <code className={inlineCode}>GET /api/v1/terms/:slug</code> returns the complete
              intelligence profile for one term: velocity scoring, lifecycle decay, cross-platform
              origin timeline, and structured template data. Use{" "}
              <code className={inlineCode}>GET /api/v1/terms</code> to search and browse slugs.
            </p>
          </section>

          <section id="batch" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Batch lookup</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <code className={inlineCode}>POST /api/v1/terms/batch</code> resolves up to 20 slugs
              in a single round trip, which counts as one request against your burst limit. Unknown
              slugs never fail the request — they are returned as{" "}
              <code className={inlineCode}>{`{ "found": false }`}</code> next to the successful
              results, so one typo cannot discard a whole batch.
            </p>
            <div className="mt-3 space-y-4">
              <CodeBlock language="curl" code={batchRequest} />
              <CodeBlock language="json" code={batchResponse} />
            </div>
          </section>

          <section id="response" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Response schema</h2>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-400">
              <li>
                <code className={inlineCode}>velocityIndex</code> — real-time velocity score: the
                recent change in interest, as a signed percentage.
              </li>
              <li>
                <code className={inlineCode}>decayTracker</code> — lifecycle decay index and
                saturation status, for forecasting how long a trend stays relevant.
              </li>
              <li>
                <code className={inlineCode}>originMapping</code> — chronological, cross-platform
                origin timeline from first appearance to current stage.
              </li>
              <li>
                <code className={inlineCode}>templateData</code> — structured classification and
                virality preference score for programmatic use.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Metrics are computed from {SITE_NAME}&rsquo;s editorial scoring model and tracked
              platform data. They are an analytical layer, not third-party telemetry.
            </p>
            <div className="mt-3">
              <CodeBlock language="json" code={responseSchema} />
            </div>
          </section>

          <section id="limits" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Rate limits &amp; quotas</h2>
            <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Plan</th>
                    <th className="px-4 py-2 font-medium">Monthly quota</th>
                    <th className="px-4 py-2 font-medium">Burst limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-zinc-300">
                  <tr>
                    <td className="px-4 py-2">Starter — $19.99/mo</td>
                    <td className="px-4 py-2">25,000 requests</td>
                    <td className="px-4 py-2">100 req/min</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Pro — $49.99/mo</td>
                    <td className="px-4 py-2">250,000 requests</td>
                    <td className="px-4 py-2">1,000 req/min</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Every response reports your remaining capacity in{" "}
              <code className={inlineCode}>X-RateLimit-Limit</code>,{" "}
              <code className={inlineCode}>X-RateLimit-Remaining</code>,{" "}
              <code className={inlineCode}>X-Quota-Limit</code>, and{" "}
              <code className={inlineCode}>X-Quota-Remaining</code>. Exceeding either limit returns{" "}
              <code className={inlineCode}>429</code>.
            </p>
          </section>

          <section id="errors" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Errors</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Every endpoint under <code className={inlineCode}>/api/v1</code> returns errors in one
              shape, so a single handler covers your whole integration:
            </p>
            <div className="mt-3">
              <CodeBlock language="json" code={errorSchema} />
            </div>
            <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium">Code</th>
                    <th className="px-4 py-2 font-medium">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-zinc-300">
                  <tr>
                    <td className="px-4 py-2">400</td>
                    <td className="px-4 py-2"><code className="text-xs">INVALID_INPUT</code></td>
                    <td className="px-4 py-2">A parameter failed validation. The response includes an <code className="text-xs">issues</code> array with per-field detail.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">401</td>
                    <td className="px-4 py-2"><code className="text-xs">UNAUTHORIZED</code></td>
                    <td className="px-4 py-2">API key missing, malformed, or revoked.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">404</td>
                    <td className="px-4 py-2"><code className="text-xs">NOT_FOUND</code></td>
                    <td className="px-4 py-2">No term exists for that slug.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">429</td>
                    <td className="px-4 py-2"><code className="text-xs">RATE_LIMITED</code></td>
                    <td className="px-4 py-2">Burst limit or monthly quota exceeded.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">500</td>
                    <td className="px-4 py-2"><code className="text-xs">INTERNAL_ERROR</code></td>
                    <td className="px-4 py-2">Unexpected server error. Safe to retry with backoff.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="mt-6 text-sm font-semibold text-white">Recommended retry pattern</h3>
            <div className="mt-2">
              <CodeBlock language="javascript" code={retryExample} />
            </div>
          </section>

          <section id="playground" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">Live demo</h2>
            <p className="mb-5 mt-2 text-sm leading-relaxed text-zinc-400">
              Query the Culture Graph API from your browser — no key required for these sample
              terms. See exactly what your application will receive.
            </p>
            <ApiPlayground />
          </section>

          <p className="text-sm text-zinc-500">
            Need every parameter and schema?{" "}
            <Link href="/docs" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
              Open the API Reference
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
