<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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
- Resolve + utilities: `lib/intelligence` (`getCulturalIntelligence`, `getTrendIntelligence`, `suggestArticleOpportunities`, …)
- Inference / analytics / AI overlays are read-only suggestions — never overwrite `trendDirection`, scores, or articles
- Lifecycle inference is read-only — never bulk-write `lifecycleStage` or `status`
- Docs: `docs/INTELLIGENCE_DATA_MODEL.md`

Do not add chatbots, accounts, dashboards, or public AI UI unless explicitly requested. AI output always requires human review.
<!-- END:intelligence-foundation-rules -->

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
