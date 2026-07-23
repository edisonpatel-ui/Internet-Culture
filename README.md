# Internet Culture Hub

Encyclopedia of internet culture — memes, slang, people, events, and trends.

## Local development

```bash
npm install
cp .env.example .env.local   # optional local overrides
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production gates

```bash
npm run validate
npm run audit:media
npm run audit:editorial
npm run audit:quality
npm run build
```

`npm run build` also runs `validate` via `prebuild`.

## Environment

See `.env.example` and [`docs/PRODUCTION_LAUNCH.md`](docs/PRODUCTION_LAUNCH.md).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap / OG / canonicals (required in production) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console token |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 ID (production only) |

Never put private secrets in `NEXT_PUBLIC_*` variables.

## Deploy (Vercel)

1. Import the repo into Vercel (Next.js preset)
2. Set `NEXT_PUBLIC_SITE_URL` for Production to the live origin (verify canonicals after deploy)
3. Optionally set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Follow the checklist in `docs/PRODUCTION_LAUNCH.md`

CI: `.github/workflows/ci.yml` runs validate + build on push/PR to `main`.

## Version 1 content workflow (primary)

```
Topic → Research with Cursor AI → Generate article in Cursor → Human review → Commit → Website
```

Articles live in `lib/content/`. See [`docs/VERSION_1_CONTENT_WORKFLOW.md`](docs/VERSION_1_CONTENT_WORKFLOW.md) and `AGENTS.md`.

## Experimental AI Lab (Phase 2+ — not V1)

The internal Editorial OS / Knowledge Engine remains fully functional at
[`/admin/experimental`](docs/EDITORIAL_OS_EXPERIMENTAL.md) for future development.
**Do not use it as the Version 1 content workflow.**

## Docs

| Doc | Topic |
|-----|--------|
| `docs/VERSION_1_CONTENT_WORKFLOW.md` | **Primary** article creation for V1 |
| `docs/EDITORIAL_OS_EXPERIMENTAL.md` | Experimental AI Lab (Phase 2+) |
| `docs/EDITORIAL_OS_V2.md` | Editorial OS v2 routes (experimental) |
| `docs/PRODUCTION_LAUNCH.md` | Launch checklist, env, rollback |
| `docs/PRODUCTION_FOUNDATION.md` | Integrations / analytics ports |
| `docs/AI_EDITORIAL_PLATFORM.md` | AI editorial foundation (RC3-A/B — not wired) |
| `docs/EDITORIAL_WORKFLOW.md` | Internal editorial AI lifecycle (future) |
| `docs/EDITORIAL_INTELLIGENCE.md` | Research/evidence reasoning framework (RC3-C) |
| `docs/KNOWLEDGE_BASE.md` | Encyclopedia knowledge assets (RC3-D) |
| `docs/EDITORIAL_OPERATING_SYSTEM.md` | Admin AI OS blueprint (RC4-A) |
| `docs/ADMIN_PLATFORM.md` | Future admin IA & isolation |
| `docs/EDITORIAL_PIPELINES.md` | Full publish pipeline stages |
| `docs/AI_ASSISTANTS.md` | Internal assistant catalog |
| `docs/PUBLISHING_WORKFLOW.md` | Lifecycle & publish rules |
| `docs/DASHBOARD_ARCHITECTURE.md` | Every future dashboard page |
| `docs/RESEARCH_WORKSPACE.md` | Research workspace foundation (RC4-B) |
| `docs/INTELLIGENCE_DATA_MODEL.md` | Internal cultural intelligence |
| `docs/ADDING_ARTICLES.md` | How to add content |
| `AGENTS.md` | Agent / contributor rules |

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- File-based content in `lib/content/`
