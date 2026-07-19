# Production Foundation (Phase 4B)

Preparation notes for deployment and scaling. Architecture ports only.

**For the Phase 8 launch checklist, env setup, commands, and rollback:** see [`PRODUCTION_LAUNCH.md`](./PRODUCTION_LAUNCH.md).

## Architecture decisions

| Decision | Why |
|----------|-----|
| Slim `SearchDocument` index passed from server → client | Keeps full `lib/content` catalogs out of the search UI bundle |
| `lib/integrations` interfaces only | Future auth / DB / AI / ads / affiliate / shop plug in without parallel systems |
| `AnalyticsBackend` port in `lib/analytics/provider.ts` | Vercel today; swap vendors without a second `trackEvent` API |
| `EXPLORE_CATEGORIES` derived from `CATEGORIES` | One source for icons/colors |
| Shared `CategoryListingSkeleton` | Identical loading routes stay in sync |
| Dead `Button` / `EntryComingSoon` removed | Unused surface area |

## Integration registry

```ts
import { integrations, isIntegrationEnabled } from "@/lib/integrations";
```

All providers are `null` and flags are `false` until a deliberate launch phase.

Content remains file-based in `lib/content/`. A future Supabase/`DataStoreProvider` is for **user** data (accounts, collections), not a silent rewrite of the encyclopedia.

## Deploy readiness

See **`PRODUCTION_LAUNCH.md`** for the full checklist. Short version:

1. Set `NEXT_PUBLIC_SITE_URL` and optional Search Console verification
2. Keep `npm run validate` + `npm run build` as CI gates
3. Enable one analytics backend via `getAnalyticsBackend()` — do not dual-write events
4. Flip `integrations.flags` only after the matching provider is implemented

## Related docs

- Editorial: `EDITORIAL_STYLE_GUIDE.md`, `CONTENT_LANGUAGE_POLICY.md`, `EDITORIAL_AUDIT.md`
- Category standards: `CATEGORY_STANDARDS.md`
- Content: `content-guide.md`, `ADDING_ARTICLES.md`
- Scores: `CULTURAL_SCORES.md`

## Quality tooling (Phase 5)

| Script | Role |
|--------|------|
| `npm run audit:quality` | Strong / improve / merge / questionable buckets |
| `npm run audit:editorial` | Raw flag codes (debug) |

Internal editorial overrides: `lib/editorial/registry.ts` (never exposed in UI).
