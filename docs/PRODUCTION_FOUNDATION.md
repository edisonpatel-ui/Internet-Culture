# Production Foundation (Phase 4B)

Preparation notes for deployment and scaling. **Not a launch checklist** — no external services are connected yet.

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

## Deploy readiness (later)

When you do launch:

1. Set `NEXT_PUBLIC_SITE_URL` and Search Console verification
2. Keep `npm run validate` + `npm run build` as CI gates
3. Enable one analytics backend via `getAnalyticsBackend()` — do not dual-write events
4. Flip `integrations.flags` only after the matching provider is implemented

## Related docs

- Editorial: `EDITORIAL_STYLE_GUIDE.md`, `CONTENT_LANGUAGE_POLICY.md`, `EDITORIAL_AUDIT.md`
- Content: `content-guide.md`, `ADDING_ARTICLES.md`
- Scores: `CULTURAL_SCORES.md`
