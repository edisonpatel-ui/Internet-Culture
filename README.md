# Internet Culture Hub

Encyclopedia of internet culture — memes, slang, creators, events, and trends.

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

## Docs

| Doc | Topic |
|-----|--------|
| `docs/PRODUCTION_LAUNCH.md` | Launch checklist, env, rollback |
| `docs/PRODUCTION_FOUNDATION.md` | Integrations / analytics ports |
| `docs/AI_EDITORIAL_PLATFORM.md` | AI editorial foundation (RC3-A — not wired) |
| `docs/INTELLIGENCE_DATA_MODEL.md` | Internal cultural intelligence |
| `docs/ADDING_ARTICLES.md` | How to add content |
| `AGENTS.md` | Agent / contributor rules |

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- File-based content in `lib/content/`
