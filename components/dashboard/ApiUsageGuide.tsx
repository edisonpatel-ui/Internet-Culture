"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { BASE_URL } from "@/lib/seo";
import { TIER_RATE_LIMITS, TIER_MONTHLY_QUOTAS, type ApiKeyTier } from "@/lib/api/keys";

/**
 * components/dashboard/ApiUsageGuide.tsx
 *
 * The dashboard's full multi-language integration hub — supersedes the
 * smaller 3-tab (cURL/JS/Python) "Quick Start" that used to live directly
 * in DashboardInteractive.tsx. Every snippet below hits a real, currently
 * shipped endpoint with the real request/response shape (lib/api/errors.ts's
 * uniform `{ error: { code, message, status } }`, the real query params
 * GET /api/v1/terms accepts, the real POST /api/v1/terms/batch body) — none
 * of this is aspirational API surface.
 *
 * `apiKey` is whatever the caller has on hand right now: the customer's
 * real raw key if one was just revealed this session (DashboardInteractive
 * only ever holds the raw key transiently, right after issue/regenerate —
 * see lib/api/keys.ts, the hash is all that's ever persisted), or the
 * standard "cg_live_YOUR_API_KEY" placeholder otherwise. Same convention
 * the old Quick Start already used; this just reuses it everywhere instead
 * of only in one cURL line.
 */

type Language = "curl" | "javascript" | "python" | "node" | "go" | "php";

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "curl", label: "cURL" },
  { id: "javascript", label: "JavaScript / TS" },
  { id: "python", label: "Python" },
  { id: "node", label: "Node.js" },
  { id: "go", label: "Go" },
  { id: "php", label: "PHP" },
];

interface Snippet {
  title: string;
  description: string;
  language: string;
  code: string;
}

function buildSnippets(apiKey: string): Record<Language, Snippet[]> {
  return {
    curl: [
      {
        title: "Get a single term",
        description: "Full cultural-intelligence payload for one slug.",
        language: "bash",
        code: `curl "${BASE_URL}/api/v1/terms/brainrot" \\
  -H "Authorization: Bearer ${apiKey}"`,
      },
      {
        title: "Search & filter the directory",
        description: "Browse by category and minimum velocity, paginated.",
        language: "bash",
        code: `curl "${BASE_URL}/api/v1/terms?category=meme&minVelocity=5&limit=20&page=1" \\
  -H "Authorization: Bearer ${apiKey}"`,
      },
      {
        title: "Batch lookup (up to 20 slugs)",
        description: "One request for several terms — unknown slugs come back as found: false, not a 404.",
        language: "bash",
        code: `curl -X POST "${BASE_URL}/api/v1/terms/batch" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"slugs": ["brainrot", "skibidi-toilet"]}'`,
      },
    ],
    javascript: [
      {
        title: "Get a single term",
        description: "fetch + async/await, with the uniform error shape handled.",
        language: "typescript",
        code: `const API_KEY = "${apiKey}";
const BASE_URL = "${BASE_URL}";

async function getTerm(slug: string) {
  const response = await fetch(\`\${BASE_URL}/api/v1/terms/\${slug}\`, {
    headers: { Authorization: \`Bearer \${API_KEY}\` },
  });
  const json = await response.json();
  if (!response.ok) {
    // Every /api/v1 error is { error: { code, message, status } }
    throw new Error(\`\${json.error.code}: \${json.error.message}\`);
  }
  return json.data;
}

getTerm("brainrot")
  .then((data) => console.log(data))
  .catch((err) => console.error("Request failed:", err.message));`,
      },
      {
        title: "Search & filter the directory",
        description: "Builds the query string from an object so params stay optional and typed.",
        language: "typescript",
        code: `const API_KEY = "${apiKey}";
const BASE_URL = "${BASE_URL}";

interface SearchParams {
  category?: string;
  minVelocity?: number;
  limit?: number;
  page?: number;
}

async function searchTerms(params: SearchParams) {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  );

  const response = await fetch(\`\${BASE_URL}/api/v1/terms?\${query}\`, {
    headers: { Authorization: \`Bearer \${API_KEY}\` },
  });
  const json = await response.json();
  if (!response.ok) throw new Error(\`\${json.error.code}: \${json.error.message}\`);
  return json; // { success, data, pagination }
}`,
      },
      {
        title: "Batch lookup (up to 20 slugs)",
        description: "POST with a JSON body — errors.length is 0 when every slug resolved.",
        language: "typescript",
        code: `const API_KEY = "${apiKey}";
const BASE_URL = "${BASE_URL}";

async function batchGetTerms(slugs: string[]) {
  const response = await fetch(\`\${BASE_URL}/api/v1/terms/batch\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slugs }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(\`\${json.error.code}: \${json.error.message}\`);
  return json.data; // [{ slug, found, term? }, ...]
}`,
      },
    ],
    python: [
      {
        title: "Get a single term (requests)",
        description: "Reads the structured error body on failure instead of a bare raise_for_status().",
        language: "python",
        code: `import requests

API_KEY = "${apiKey}"
BASE_URL = "${BASE_URL}"

def get_term(slug: str) -> dict:
    response = requests.get(
        f"{BASE_URL}/api/v1/terms/{slug}",
        headers={"Authorization": f"Bearer {API_KEY}"},
    )
    payload = response.json()
    if not response.ok:
        error = payload["error"]
        raise RuntimeError(f"{error['code']}: {error['message']}")
    return payload["data"]

print(get_term("brainrot"))`,
      },
      {
        title: "Search & filter the directory (requests)",
        description: "Pass filters as query params — omit any you don't need.",
        language: "python",
        code: `import requests

API_KEY = "${apiKey}"
BASE_URL = "${BASE_URL}"

response = requests.get(
    f"{BASE_URL}/api/v1/terms",
    headers={"Authorization": f"Bearer {API_KEY}"},
    params={"category": "meme", "minVelocity": 5, "limit": 20, "page": 1},
)
payload = response.json()
print(payload["data"], payload["pagination"])`,
      },
      {
        title: "Batch lookup (requests)",
        description: "Up to 20 slugs per call.",
        language: "python",
        code: `import requests

API_KEY = "${apiKey}"
BASE_URL = "${BASE_URL}"

response = requests.post(
    f"{BASE_URL}/api/v1/terms/batch",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"slugs": ["brainrot", "skibidi-toilet"]},
)
print(response.json()["data"])`,
      },
      {
        title: "Async alternative (httpx)",
        description: "Same API, non-blocking — useful inside an existing asyncio app.",
        language: "python",
        code: `import asyncio
import httpx

API_KEY = "${apiKey}"
BASE_URL = "${BASE_URL}"

async def get_term(slug: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/api/v1/terms/{slug}",
            headers={"Authorization": f"Bearer {API_KEY}"},
        )
        payload = response.json()
        if response.is_error:
            error = payload["error"]
            raise RuntimeError(f"{error['code']}: {error['message']}")
        return payload["data"]

asyncio.run(get_term("brainrot"))`,
      },
    ],
    node: [
      {
        title: "Server-side with Axios",
        description: "npm install axios — Axios's own error shape wraps the response body.",
        language: "javascript",
        code: `const axios = require("axios");

const API_KEY = "${apiKey}";
const BASE_URL = "${BASE_URL}";

async function getTerm(slug) {
  try {
    const { data } = await axios.get(\`\${BASE_URL}/api/v1/terms/\${slug}\`, {
      headers: { Authorization: \`Bearer \${API_KEY}\` },
    });
    return data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const { code, message } = err.response.data.error;
      throw new Error(\`\${code}: \${message}\`);
    }
    throw err;
  }
}

getTerm("brainrot").then(console.log).catch(console.error);`,
      },
      {
        title: "Native Node.js (no dependencies)",
        description: "Using Node's built-in https module — nothing to install.",
        language: "javascript",
        code: `const https = require("node:https");

const API_KEY = "${apiKey}";

function getTerm(slug) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "${new URL(BASE_URL).hostname}",
        path: \`/api/v1/terms/\${slug}\`,
        headers: { Authorization: \`Bearer \${API_KEY}\` },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const json = JSON.parse(body);
          if (res.statusCode >= 400) {
            return reject(new Error(\`\${json.error.code}: \${json.error.message}\`));
          }
          resolve(json.data);
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

getTerm("brainrot").then(console.log).catch(console.error);`,
      },
    ],
    go: [
      {
        title: "Get a single term",
        description: "Standard library only — no third-party HTTP client needed.",
        language: "go",
        code: `package main

import (
\t"encoding/json"
\t"fmt"
\t"io"
\t"net/http"
)

func main() {
\treq, _ := http.NewRequest("GET", "${BASE_URL}/api/v1/terms/brainrot", nil)
\treq.Header.Set("Authorization", "Bearer ${apiKey}")

\tresp, err := http.DefaultClient.Do(req)
\tif err != nil {
\t\tpanic(err)
\t}
\tdefer resp.Body.Close()

\tbody, _ := io.ReadAll(resp.Body)
\tvar result map[string]any
\tjson.Unmarshal(body, &result)

\tif resp.StatusCode >= 400 {
\t\tfmt.Println("request failed:", result["error"])
\t\treturn
\t}
\tfmt.Println(result["data"])
}`,
      },
    ],
    php: [
      {
        title: "Get a single term",
        description: "Using the built-in cURL extension — no Composer dependency required.",
        language: "php",
        code: `<?php

$apiKey = "${apiKey}";
$url = "${BASE_URL}/api/v1/terms/brainrot";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $apiKey"]);

$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$payload = json_decode($response, true);

if ($statusCode >= 400) {
    throw new Exception($payload['error']['code'] . ': ' . $payload['error']['message']);
}

print_r($payload['data']);`,
      },
    ],
  };
}

interface HeaderDoc {
  name: string;
  description: string;
}

const RESPONSE_HEADERS: HeaderDoc[] = [
  { name: "X-RateLimit-Limit", description: "Requests allowed per 60-second burst window for your tier." },
  { name: "X-RateLimit-Remaining", description: "Requests remaining in the current 60-second burst window." },
  { name: "X-Quota-Limit", description: "Total requests allowed this calendar month (omitted on unlimited tiers)." },
  { name: "X-Quota-Remaining", description: "Requests remaining this calendar month." },
];

interface ErrorCodeDoc {
  status: string;
  code: string;
  meaning: string;
}

const ERROR_CODES: ErrorCodeDoc[] = [
  { status: "400", code: "INVALID_INPUT", meaning: "A parameter failed validation — the response includes an `issues` array with per-field detail." },
  { status: "401", code: "UNAUTHORIZED", meaning: "Missing, malformed, or unrecognized API key." },
  { status: "404", code: "NOT_FOUND", meaning: "No entry exists for that slug." },
  { status: "429", code: "RATE_LIMITED", meaning: "Burst limit or monthly quota exceeded — check the X-RateLimit-* / X-Quota-* headers." },
  { status: "500", code: "INTERNAL_ERROR", meaning: "Something went wrong on our end — safe to retry." },
  { status: "503", code: "SERVICE_UNAVAILABLE", meaning: "A dependency is temporarily down — safe to retry shortly." },
];

function TierLimitsNote({ tier }: { tier?: ApiKeyTier }) {
  if (!tier || tier === "free") return null;
  const burst = TIER_RATE_LIMITS[tier];
  const quota = TIER_MONTHLY_QUOTAS[tier];
  return (
    <p className="mt-2 text-xs text-zinc-500">
      Your plan: {burst.toLocaleString()} requests/minute burst, {quota?.toLocaleString()} requests/month.
    </p>
  );
}

export function ApiUsageGuide({ apiKey, tier }: { apiKey: string; tier?: ApiKeyTier }) {
  const [language, setLanguage] = useState<Language>("curl");
  const snippets = buildSnippets(apiKey);

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">API Usage Hub</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Pre-filled, ready-to-run examples for every supported integration method.
      </p>
      <TierLimitsNote tier={tier} />

      {/* Language tabs — wraps to multiple rows on narrow screens rather
          than requiring horizontal scroll; 6 short labels wrap cleanly. */}
      <div className="mt-4 flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            type="button"
            onClick={() => setLanguage(lang.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              language === lang.id
                ? "bg-[var(--accent-muted)] text-[var(--accent-secondary)]"
                : "text-zinc-400 hover:bg-white/5"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-5">
        {snippets[language].map((snippet) => (
          <div key={snippet.title}>
            <p className="text-sm font-medium text-zinc-200">{snippet.title}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{snippet.description}</p>
            <div className="mt-2">
              <CodeBlock language={snippet.language} code={snippet.code} />
            </div>
          </div>
        ))}
      </div>

      {/* Headers & error codes reference — a card grid, not a <table>, so
          it can never need horizontal scrolling on a narrow screen. */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Response headers
        </h3>
        <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RESPONSE_HEADERS.map((header) => (
            <div key={header.name} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <dt className="break-all font-mono text-xs text-[var(--accent-secondary)]">{header.name}</dt>
              <dd className="mt-1 text-xs text-zinc-500">{header.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Standard error codes
        </h3>
        <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ERROR_CODES.map((entry) => (
            <div key={entry.code} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <dt className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300">{entry.status}</span>
                <span className="break-all text-[var(--accent-secondary)]">{entry.code}</span>
              </dt>
              <dd className="mt-1.5 text-xs text-zinc-500">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
