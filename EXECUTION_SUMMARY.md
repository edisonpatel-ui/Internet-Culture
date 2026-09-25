# Culture Graph API — Complete Stripe Sandbox Platform

## New dependencies
```
npm install stripe @upstash/ratelimit
```
(`@upstash/redis` was already a project dependency.)

## New env vars (added to `.env.example`, all documented there)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_STARTER=price_...   # $19/mo, 25,000 req/mo
STRIPE_PRICE_ID_PRO=price_...       # $49/mo, 250,000 req/mo
```
Reuses the existing `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` and
`CRON_SECRET` — no new Redis instance or admin-auth setup needed.

## File map
**Backend / lib**
- `lib/api/keys.ts` (updated) — 3 tiers now: `free` (admin/testing, unmetered), `starter`, `pro` (paid, monthly-quota'd)
- `lib/api/monthlyQuota.ts` (new) — Redis monthly request-quota counter
- `lib/api/validateRequest.ts` (updated) — burst limit **and** monthly quota enforcement
- `lib/api/enrichedTerm.ts` (new) — builds `velocityIndex`/`decayTracker`/`originMapping`/`templateData`
- `lib/api/viewCounters.ts` (new) — real API-traffic counters feeding the velocity cron
- `lib/stripe/client.ts`, `lib/stripe/checkoutKeyHandoff.ts` (new)

**Routes**
- `app/api/checkout/route.ts` — creates Stripe Checkout Session
- `app/api/webhooks/stripe/route.ts` — verifies signature, issues key on `checkout.session.completed`
- `app/api/checkout/session/route.ts` — one-time key readback for the success page
- `app/api/v1/terms/[slug]/route.ts` (updated) — enriched schema, quota headers
- `app/api/demo/terms/[slug]/route.ts` (new) — see security note below
- `app/api/admin/keys/route.ts` (updated) — now accepts `starter` tier too
- `app/api/cron/velocity/route.ts` (new) — 6-hour leaderboard cron

**Pages**
- `app/pricing/page.tsx`, `app/checkout/success/page.tsx`, `app/docs/api/page.tsx`, `app/demo/page.tsx`, `app/refunds/page.tsx` (all new)
- `app/terms/page.tsx`, `app/privacy/page.tsx` (surgically **extended**, not overwritten — these already existed as the site's general ToS/Privacy pages; new sections added covering API acceptable use, key/payment/telemetry handling)

**Config**
- `vercel.json` (updated) — appended the velocity cron alongside the existing daily metrics cron (did not remove it)
- `.env.example` (updated)
- `package.json` (updated) — `stripe`, `@upstash/ratelimit` added

## Design decisions worth knowing about

1. **`/demo` does not embed a real API key.** A key placed in client-side JS
   is readable by anyone via devtools and would let visitors burn a real
   customer's (or an unmetered admin) quota outside the demo. Instead,
   `/api/demo/terms/[slug]` needs no Authorization header and is rate-limited
   directly by IP (10 req/min) using the same `@upstash/ratelimit` primitive.
   It returns the identical payload shape a real key would.

2. **`velocityIndex`, `decayTracker`, `originMapping`, `templateData` are
   heuristics computed from your real curated data** (cringe/influence
   scores, `activePlatforms`, `formatType`, historical dates,
   `metricsHistory`) — not fabricated per-platform dates or invented
   template associations. Inventing specific facts (e.g. a fake "TikTok
   peaked on 2026-02-14" or claiming an entry copies a named real meme
   template with no basis) would misrepresent synthetic data as verified
   telemetry to paying customers. `lib/api/enrichedTerm.ts` documents
   exactly which real field backs each output field, and both `/docs/api`
   and the Terms of Service now disclose this is v1/beta-granularity,
   derived data — not third-party verified telemetry.

3. **Tier naming**: the pre-existing admin-issued `"pro"` tier (1000 req/min,
   no monthly cap) and the new Stripe-purchased `"pro"` tier ($49/mo) are
   the same tier name, now carrying an optional `monthlyQuota` — `null`
   for admin-issued keys (unmetered, for internal testing), `250,000` for
   Stripe-issued ones. Nothing breaks for existing admin-issued keys.

4. **Vercel cron frequency**: `vercel.json` now schedules the velocity cron
   every 6 hours. Vercel's Hobby plan only supports daily cron execution —
   a paid Vercel plan is required for this schedule to actually fire as
   configured; it will still deploy without error on Hobby, just run less
   often than configured (Vercel silently coerces to the plan's allowed
   frequency).

5. **Webhook raw body**: Next.js App Router route handlers don't pre-parse
   the request body, so `request.text()` in the webhook route already gives
   the raw bytes Stripe's signature check needs — no special route config
   was required.

## Verification gates (as requested)
- `npx tsc --noEmit` — **pass**
- `npm run validate` — **pass** (391 entries, 0 errors, pre-existing warnings only)
- `npm run test:culture-graph` — **25/25 pass**

(`npm run build` was also run for extra confidence: Turbopack compiled every
new/changed route and page with zero errors attributable to this change. The
build only fails in this sandboxed container because outbound requests to
`fonts.googleapis.com` are blocked by the container's network allowlist — a
pre-existing `next/font` call in `app/layout.tsx`, unrelated to this feature.
Expect a clean `npm run build` in the normal Vercel/dev environment.)

## Not included (would need your input / Stripe Dashboard)
- Creating the actual Stripe Products/Prices and pasting their IDs into
  `STRIPE_PRICE_ID_STARTER` / `STRIPE_PRICE_ID_PRO`
- Registering the webhook endpoint URL in the Stripe Dashboard (or `stripe
  listen --forward-to localhost:3000/api/webhooks/stripe` for local testing)
- Nav/footer links to the new pages — left untouched per your standing
  instruction not to redesign navigation; the pages are fully routable on
  their own (`/pricing`, `/docs/api`, `/demo`, `/refunds`)
