<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:version-1-workflow -->
# Version 1 content workflow (primary)

Encyclopedia articles are created **outside** the in-app Editorial OS:

`Topic → Research with Cursor AI → Generate article in Cursor → Human review → Commit → Website`

- Write into `lib/content/` using article templates and rules below
- Do **not** use `/admin/experimental` (Experimental AI Lab) for Version 1 content work
- That lab is Phase 2+ / future development — fully preserved, not deleted
- Docs: `docs/VERSION_1_CONTENT_WORKFLOW.md`, `docs/EDITORIAL_OS_EXPERIMENTAL.md`
<!-- END:version-1-workflow -->

<!-- BEGIN:content-research-rules -->
# Content research and accuracy

Before creating ANY article, follow the pipeline in:

`.cursor/rules/content-research.mdc`

The full pipeline every article must pass through:

**Research → Duplicate check → Create → next-id → Aliases → Relationships → Media → Validate → Publish**

1. **Research** — Identify the entity. Answer: What is it? What is it NOT?
2. **Duplicate check** — Slug grep + title-similarity warnings + alias registry
3. **Classification** — Confirm the correct category (meme / slang / trend / event / creator / brainrot)
4. **Sources** — Verify origin claims. No invented dates, creators, or statistics.
5. **Article** — `npm run next-id <category>`; write using the correct template
6. **Aliases** — Add search variants in `lib/content/aliases/registry.ts` (not in the article file)
7. **Relationships** — Prefer typed `relationships` + `relatedSlugs`; no fake edges
8. **Media** — Add media only if it genuinely represents the topic. Set `verified: false`
9. **Validate** — `npm run validate`, `npm run audit:media`, optional `audit:media:live`
10. **Build** — `npm run build` (runs validate via prebuild)

Never publish a guess as a fact. Do not index unfinished drafts — live entries must have sources (`validate` fails on empty `sources`).
<!-- END:content-research-rules -->

<!-- BEGIN:editorial-writing-rules -->
# Editorial writing (public prose)

Modern encyclopedia voice — teach first, then go deeper. Clear for a high school reader; specific for culture fans.

- Full standards: `docs/EDITORIAL_STYLE_GUIDE.md`
- Every article should answer: what it is, why people cared, why it spread, why it is remembered, what influence it had
- Add contextual storytelling (internet environment, platforms, related culture, timing) when it helps understanding
- Prefer continuous narrative across fields over disconnected fact lists
- Prefer concrete examples; explain history instead of assuming it
- Avoid jargon, hype, corporate filler, and generic AI wording
- Soft signals: `PROSE_STYLE` via `npm run validate` and `npm run audit:editorial`
<!-- END:editorial-writing-rules -->

<!-- BEGIN:article-creation-rules -->
# Article creation workflow

When creating a NEW article for Internet Culture Hub, follow the rule in:

`.cursor/rules/article-creation.mdc`

Key rules (full details in the rule file above):
- Search for existing slugs across ALL categories before creating anything; review `TITLE_SIMILARITY` warnings
- Assign IDs with `npm run next-id <category>` — do not guess sequential IDs
- Use the correct TypeScript type: `MemeEntry`, `SlangEntry`, `EventEntry`, `CreatorEntry`, `BrainrotEntry`, or `BaseEntry` (for trends — `TrendEntry` does not exist)
- Create the file in the correct category folder: `lib/content/[category]/[slug].ts`
- Register the import in the category's `index.ts`
- Add aliases in `lib/content/aliases/registry.ts` when alternate spellings exist
- Prefer typed `relationships` over random same-category related filler
- If an entry is cross-category trending, import from canonical location into `trends/index.ts` — never create a stub duplicate
- Run `npm run validate`, then `npm run audit:media`, then `npm run build` after every new article; fix all validate errors before finishing

Article templates: `lib/content/templates/articleTemplate.ts`
<!-- END:article-creation-rules -->

<!-- BEGIN:intelligence-foundation-rules -->
# Cultural intelligence (Phase 7 — internal)

Optional structured metadata for future intelligence tooling. **Not** a public feature.

- Types: `CulturalIntelligence` / `CulturalImportance` / `TrendIntelligence` / `entry.intelligence?` / `entry.trendIntelligence?` in `types/index.ts`
- Seeds without rewriting articles: `lib/intelligence/registry.ts`, `lib/intelligence/trendRegistry.ts`
- Clusters: `lib/intelligence/clusters.ts`
- Trend signals / opportunity (internal): `trendSignals.ts`, `trendIntelligence.ts`, `opportunity.ts`
- Analytics intelligence (Phase 7D): `analyticsEvents.ts`, `analyticsSignals.ts`, `analyticsAdapters.ts`, `searchIntelligence.ts`
- AI assistance (Phase 7E): `lib/intelligence/ai/` — provider port + suggestion utilities; default `nullAiAssistanceProvider`
- Content coverage gaps / expansion roadmap: `lib/intelligence/contentRoadmap.ts` (~100 planned entries); see `docs/CONTENT_EXPANSION_ROADMAP.md` + `docs/CONTENT_COVERAGE.md`
- Resolve + utilities: `lib/intelligence` (`getCulturalIntelligence`, `getTrendIntelligence`, `suggestArticleOpportunities`, …)
- Inference / analytics / AI overlays are read-only suggestions — never overwrite `trendDirection`, scores, or articles
- Lifecycle inference is read-only — never bulk-write `lifecycleStage` or `status`
- Docs: `docs/INTELLIGENCE_DATA_MODEL.md`

Do not add chatbots, accounts, dashboards, or public AI UI unless explicitly requested. AI output always requires human review.
<!-- END:intelligence-foundation-rules -->

<!-- BEGIN:production-launch-rules -->
# Production launch (Phase 8)

- Launch checklist / env / rollback: `docs/PRODUCTION_LAUNCH.md`
- Set `NEXT_PUBLIC_SITE_URL` in production; never put private secrets in `NEXT_PUBLIC_*`
- Image hosts are allowlisted in `next.config.ts` — do not re-open `hostname: "**"`
- Keep `integrations.flags` false until a real provider is reviewed
<!-- END:production-launch-rules -->

<!-- BEGIN:media-architecture-rules -->
# Media architecture rules

When creating or editing content in `lib/content/`, follow the rules in:

`.cursor/rules/media-architecture.mdc`

Key rules (full details in the rule file above):
- ONLY use `media?: MediaItem[]` — never `imageUrl`, `thumbnailUrl`, or `mediaEmbeds`
- Every MediaItem must have: `role`, `type`, `url`, `title`, `source`, `sourceUrl`, `platform`, `attribution`
- Maximum ONE `role:"featured"` image/gif per article
- Featured images must pass the encyclopedia test: appropriate as the first image on a public encyclopedia site; prefer clean canonical over extreme/awkward related examples
- AI-suggested media must always have `verified: false` — humans set `verified: true`
- Run `npm run validate` and `npm run audit:media` after creating or editing any article
- Optional: `npm run audit:media:live` for HEAD + YouTube oEmbed — never auto-sets `verified: true`
- Slang/abstract trends may omit media; memes/creators/events should have featured media when a reliable visual exists

Media templates: `lib/content/templates/mediaTemplate.ts`
<!-- END:media-architecture-rules -->
