# API Key Auth + Rate Limiting — Deliverable

## New files (all additive, nothing existing changed)
- `lib/api/keys.ts` — key generation (`cg_live_` + SHA-256 hash), registration in Redis
- `lib/api/validateRequest.ts` — bearer-token auth + per-tier sliding-window rate limit
- `app/api/v1/terms/[slug]/route.ts` — public, authenticated example endpoint
- `app/api/admin/keys/route.ts` — session-gated key issuance (404s if unauthorized, matching this repo's existing admin security policy)

## One dependency to add
```
npm install @upstash/ratelimit
```
(`@upstash/redis` is already a dependency of this project.)

## Env vars
Uses the `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` vars already
documented in `.env.example` — no new env vars required.

## Issuing a key
```
POST /api/admin/keys   (must be signed in as an allowed admin)
{ "owner": "partner-name", "tier": "free" | "pro" }
```
Returns the raw key once — only its SHA-256 hash is ever stored.

## Calling the public endpoint
```
GET /api/v1/terms/some-slug
Authorization: Bearer cg_live_...
```

## Verification gates run against the live repo
- `npx tsc --noEmit` — pass
- `npm run validate` — pass (391 entries, pre-existing warnings only)
- `npm run test:culture-graph` — 25/25 pass
- `npm run build` — Turbopack compiled all routes (including the 3 new ones)
  with zero errors from this change; the build only fails in this sandbox
  because outbound requests to `fonts.googleapis.com` are blocked by the
  container's network allowlist (pre-existing `next/font` Google Fonts calls
  in `app/layout.tsx`, unrelated to this feature) and the diagnostic
  Turbopack notice on `lib/admin/articleUpdate/applyUpdate.ts` is also
  pre-existing. Neither references any file in this deliverable. Expect
  `npm run build` to succeed in the normal Vercel/dev environment.
