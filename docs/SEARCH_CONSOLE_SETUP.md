# Google Search Console Setup

ICH ships crawl-ready: dynamic `/sitemap.xml`, `/robots.txt`, canonicals, and indexable hubs. External configuration is still required once the site is deployed.

## Prerequisites

1. Production deploy (e.g. Vercel) with a stable domain.
2. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin (no trailing slash), e.g. `https://internet-culture.vercel.app`.
3. Optional: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the meta tag token from Search Console.

## Steps

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a **URL prefix** property for your production origin (or a Domain property if you control DNS).
3. Verify ownership:
   - **HTML tag**: paste the token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy, **or**
   - DNS TXT record (preferred for Domain properties).
4. Submit the sitemap: `https://YOUR_DOMAIN/sitemap.xml`.
5. Confirm robots: `https://YOUR_DOMAIN/robots.txt` allows `/` and lists the sitemap.

## Important crawlable routes

| Route | Role |
|-------|------|
| `/` | Homepage |
| `/slang`, `/slang/*` | Slang dictionary + terms |
| `/memes`, `/memes/*` | Meme archive + articles |
| `/creators`, `/creators/*` | Creator encyclopedia |
| `/events`, `/events/*` | Internet history |
| `/brainrot` | Gen Alpha hub |
| `/trending`, `/trending/*` | Trends (detail URLs only when no stronger category canonical) |
| `/rankings` | Score hubs |
| `/search` | On-site search (`noindex, follow` — not in sitemap) |

## What not to do

- Do not `noindex` article or hub pages (search is intentionally `noindex, follow`).
- Do not submit duplicate sitemaps for `/trending/[slug]` when a category canonical already exists (the app excludes those and 308-redirects re-exports).
- Do not invent Search Console metrics in the repo — import them later into performance tooling.

## After data arrives

Use `docs/SEO_GROWTH_LOOP.md` to turn impressions/clicks/queries into content decisions.
