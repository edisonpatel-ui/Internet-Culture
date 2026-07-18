<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:content-research-rules -->
# Content research and accuracy

Before creating ANY article, follow the pipeline in:

`.cursor/rules/content-research.mdc`

The full pipeline every article must pass through:

**Research → Classification → Sources → Article → Media → Audit → Build**

1. **Research** — Identify the entity. Answer: What is it? What is it NOT?
2. **Classification** — Confirm the correct category (meme / slang / trend / event / creator / brainrot)
3. **Sources** — Verify origin claims. No invented dates, creators, or statistics.
4. **Article** — Write using the correct template. Every required field must be accurate.
5. **Media** — Add media only if it genuinely represents the topic. Set `verified: false`.
6. **Audit** — Run `npm run audit:media`. Fix all warnings.
7. **Build** — Run `npm run build`. Fix all TypeScript errors.

Never publish a guess as a fact. If uncertain, leave `sources: []` and add a `// NEEDS RESEARCH` comment.
<!-- END:content-research-rules -->

<!-- BEGIN:article-creation-rules -->
# Article creation workflow

When creating a NEW article for Internet Culture Hub, follow the rule in:

`.cursor/rules/article-creation.mdc`

Key rules (full details in the rule file above):
- Search for existing slugs across ALL categories before creating anything
- Use the correct TypeScript type: `MemeEntry`, `SlangEntry`, `EventEntry`, `CreatorEntry`, `BrainrotEntry`, or `BaseEntry` (for trends — `TrendEntry` does not exist)
- Create the file in the correct category folder: `lib/content/[category]/[slug].ts`
- Register the import in the category's `index.ts`
- If an entry is cross-category trending, import from canonical location into `trends/index.ts` — never create a stub duplicate
- Run `npm run audit:media` then `npm run build` after every new article; fix all errors before finishing

Article templates: `lib/content/templates/articleTemplate.ts`
<!-- END:article-creation-rules -->

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
- Run `npm run audit:media` after creating or editing any article

Media templates: `lib/content/templates/mediaTemplate.ts`
<!-- END:media-architecture-rules -->
