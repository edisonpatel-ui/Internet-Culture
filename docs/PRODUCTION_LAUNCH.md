# Production Launch Foundation (Phase 8)

Checklist for deploying Internet Culture Hub to real users on **Vercel**.

This phase is production readiness only. It does **not** add monetization, accounts, chatbots, or new public product features.

Related architecture notes: `PRODUCTION_FOUNDATION.md` (integrations / analytics ports).

---

## Deployment checklist

### Before first deploy

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live origin (no trailing slash)
- [ ] Optionally set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` after Search Console ownership
- [ ] Confirm `.env*` secrets are never committed (`.env.example` is the only env file in git)
- [ ] Run local production gates (see [Production commands](#production-commands))
- [ ] Confirm `integrations.flags` remain `false` and providers `null` until deliberately enabled
- [ ] Deploy to Vercel (Git import or CLI)
- [ ] Verify homepage, one article, search, `/sitemap.xml`, `/robots.txt`
- [ ] Spot-check Open Graph with a share debugger after DNS is live
- [ ] Submit sitemap in Google Search Console (`docs/SEARCH_CONSOLE_SETUP.md`)

### After deploy

- [ ] Confirm canonical URLs use the production domain (View Source → `rel="canonical"`)
- [ ] Confirm 404 for a fake slug (e.g. `/memes/this-slug-does-not-exist`)
- [ ] Confirm broken remote media falls back to gradient / “unavailable” (not a white crash)
- [ ] Monitor Vercel Analytics (page views) — custom events already use the analytics port

---

## Environment setup

Copy `.env.example` → `.env.local` for local overrides.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | **Yes in production** | Absolute URLs for sitemap, robots, Open Graph, canonicals, `metadataBase` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console HTML-tag verification token |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No (recommended) | GA4 measurement ID — loaded only in production |

### SITE_URL verification

1. Set `NEXT_PUBLIC_SITE_URL` to the exact live origin (no trailing slash)
2. Redeploy after any change
3. Open the homepage → View Source → confirm `rel="canonical"` and Open Graph `og:url` use that origin
4. Open `/sitemap.xml` and `/robots.txt` — every absolute URL must use the same host
5. When moving from `*.vercel.app` to a custom domain, update the env var and re-submit the sitemap in Search Console

`npm run validate` prints the resolved SITE_URL status (soft check; does not fail the gate).

### Secret handling

- Only `NEXT_PUBLIC_*` vars are used today — they are **public in the browser bundle**
- Do **not** put private API keys, AI keys, or DB credentials in `NEXT_PUBLIC_*`
- Future private secrets must be server-only env vars (no `NEXT_PUBLIC_` prefix) and never logged
- No external AI / auth / DB services are connected in Phase 8

### Vercel

Project → **Settings → Environment Variables**:

1. Add `NEXT_PUBLIC_SITE_URL` for Production (and Preview if you use a stable preview domain)
2. Redeploy after changing env vars
3. Framework preset: Next.js (default)

No `vercel.json` is required for a standard Next.js App Router deploy.

---

## Production commands

```bash
# Content + intelligence soft validation (also runs as prebuild)
npm run validate

# Media URL / completeness audit
npm run audit:media

# Editorial flag audit
npm run audit:editorial

# Quality bucket audit
npm run audit:quality

# Production build (runs validate via prebuild)
npm run build

# Serve the production build locally
npm run start
```

GitHub Actions CI (`.github/workflows/ci.yml`) runs on push/PR to `main`:

```bash
npm ci
npm run validate
npm run build
```

Optional deeper gates before a major content release (local or future CI jobs):

```bash
npm run audit:media && npm run audit:editorial && npm run audit:quality
```

---

## What was hardened in Phase 8

| Area | Change |
|------|--------|
| Env | `.env.example` + gitignore exception |
| Images | `next.config.ts` allowlist (Wikimedia, YouTube thumbs, KYM CDN, Insider) |
| Security | `nosniff`, referrer policy, `SAMEORIGIN`, permissions-policy, HSTS, CSP; `poweredByHeader: false` |
| Errors | `app/global-error.tsx`; segment `error.tsx` rename; missing-entry metadata noindex |
| Routes | `dynamicParams = false` on all entry detail routes |
| SEO | Trailing-slash stripped from `BASE_URL`; not-found metadata helper |

### Already solid (no redesign)

- `app/not-found.tsx`, category `loading.tsx` skeletons
- Media `onError` → gradient / unavailable fallbacks
- Metadata / Open Graph / Twitter / canonical helpers in `lib/seo.ts`
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- Trending URLs canonicalized to category-native pages when applicable
- `prebuild` → `validate`

### Known follow-ups (not launch blockers)

- Category listing catalogs still hydrate full entry objects on the client (search already uses slim documents)
- Encyclopedia media uses raw `<img>` for reliable error fallbacks (not `next/image` optimization yet)
- CI runs validate + build only (lint / media / editorial audits remain local or optional)

---

## Rollback process

### Bad deploy on Vercel

1. Open the Vercel project → **Deployments**
2. Find the last known-good deployment
3. **⋯ → Promote to Production** (instant rollback of the Next build)
4. If the fault was an env var, fix the variable and redeploy

### Bad content merge (git)

1. Revert the content commit(s) on the deployment branch  
   `git revert <sha>` (preferred) or restore files from the previous good commit
2. Push and let Vercel rebuild
3. Re-run `npm run validate` before pushing again

### Emergency content hotfix

1. Fix the offending file under `lib/content/`
2. `npm run validate && npm run build`
3. Push a focused commit — do not mix with feature work

---

## Out of scope for Phase 8

- Monetization / ads enablement
- User accounts or auth
- Public chatbot / AI UI
- Homepage or article redesigns
- New public product features

When those land, flip `lib/integrations` flags only after a real provider is implemented and reviewed.
