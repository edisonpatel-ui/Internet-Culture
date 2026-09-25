import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { BASE_URL } from "@/lib/seo";

export const metadata = createMetadata({
  title: "API Documentation",
  description: `Culture Graph API documentation — authentication, rate limits, and integration examples for ${SITE_NAME}.`,
  path: "/docs/api",
});

const curlExample = `curl "${BASE_URL}/api/v1/terms/brainrot" \\
  -H "Authorization: Bearer cg_live_your_api_key"`;

const jsExample = `const response = await fetch("${BASE_URL}/api/v1/terms/brainrot", {
  headers: {
    Authorization: "Bearer cg_live_your_api_key",
  },
});

const { data } = await response.json();
console.log(data.velocityIndex, data.decayTracker, data.originMapping);`;

const pythonExample = `import requests

response = requests.get(
    "${BASE_URL}/api/v1/terms/brainrot",
    headers={"Authorization": "Bearer cg_live_your_api_key"},
)
data = response.json()["data"]
print(data["velocityIndex"], data["decayTracker"])`;

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

export default function ApiDocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-page text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Culture Graph API
      </h1>
      <p className="font-page mt-4 text-base leading-relaxed text-zinc-400">
        Real-time cultural intelligence for memes, slang, and internet trends.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">Authentication</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Every request must include your API key as a bearer token:
        </p>
        <div className="mt-3">
          <CodeBlock language="http" code={"Authorization: Bearer cg_live_your_api_key"} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">Rate limits &amp; quotas</h2>
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
                <td className="px-4 py-2">Starter — $19/mo</td>
                <td className="px-4 py-2">25,000 requests</td>
                <td className="px-4 py-2">100 req/min</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Pro — $49/mo</td>
                <td className="px-4 py-2">250,000 requests</td>
                <td className="px-4 py-2">1,000 req/min</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-400">
          Usage is reported on every response via{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">X-RateLimit-Limit</code>,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">X-RateLimit-Remaining</code>,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">X-Quota-Limit</code>, and{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">X-Quota-Remaining</code> headers.
          Exceeding either returns <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">429</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">Endpoint</h2>
        <p className="mt-2 text-sm text-zinc-400">
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
            GET /api/v1/terms/:slug
          </code>
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-white">Examples</h2>
        <CodeBlock language="curl" code={curlExample} />
        <CodeBlock language="javascript" code={jsExample} />
        <CodeBlock language="python" code={pythonExample} />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">Response schema</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">decayTracker</code>,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">originMapping</code>, and{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">templateData</code> are
          derived from our own curated editorial scores and tracked platforms — this is a v1
          heuristic layer, not third-party verified telemetry.
        </p>
        <div className="mt-3">
          <CodeBlock language="json" code={responseSchema} />
        </div>
      </section>
    </main>
  );
}
