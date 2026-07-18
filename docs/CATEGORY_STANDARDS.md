# Category Content Standards

Quality expectations for encyclopedia entries. Use these when writing or reviewing articles.

Do **not** invent fields that do not fit history. Prefer clear, sourced prose over padding.

Internal editorial status lives in `lib/editorial/registry.ts` — never in public UI.

---

## Shared (all categories)

| Expectation | Notes |
|-------------|--------|
| Accurate one-line `description` | Card/search hook — not a dictionary dump |
| Verifiable `sources` | At least one real source for factual claims |
| Honest scores | Exactly four: relevance, influence, cringe, brainrot |
| Cultural links | Prefer `relationships.*` (origin, creator, format) over filler `relatedSlugs` |
| Aliases when useful | Alternate spellings / common misspellings for search |

Run quality review: `npm run audit:quality`

---

## Memes

Cover when historically relevant:

1. **Definition** — what the meme is / does in culture (`meaning`)
2. **Origin** — where, when, who (`origin`, timeline start)
3. **Format / template** — image macro, video, catchphrase, etc.
4. **Spread** — platforms and moments that carried it (`timeline`)
5. **Cultural impact** — lasting footprint (influence score + prose)

Visual memes should have a featured media item when a stable licensed source exists.

---

## Slang

1. **Primary meaning first** — lead `definition` with the dominant internet sense
2. **Origin** — community, platform, or person (`origin`)
3. **Usage examples** — real conversational examples (`usageExamples`)
4. **Communities** — who uses it (tags / related creators / community edges)

Do not bury the main meaning under etymology trivia.

---

## Creators

1. **Rise** — how they became culturally relevant (`careerStart`, description)
2. **Platforms** — where they publish (`platforms`, followers optional)
3. **Major cultural moments** — defining clips, eras, controversies (`notableMoments`)
4. **Influence** — what they shaped (related memes/slang/events via relationships)

Prefer Wikimedia CC photos; never invent portrait URLs.

---

## Events

1. **Timeline** — when it happened (`historicalDate`, highlights)
2. **Why it mattered** — `impact` in plain language
3. **Cultural impact** — what changed afterward (related entries, influence)

A defining video belongs in `media` with `role: "video"` when one exists.

---

## Trends

1. **What changed culturally** — behavior, aesthetic, or discourse shift
2. **Why it spread** — platforms, incentives, timing (`origin`)
3. **Related movements** — linked slang, memes, creators (`relationships` / `relatedSlugs`)

Most trends do not need media. Gradient fallback is fine.

---

## Brainrot

Treat like memes/slang with higher absurdity: clear origin when known, honest brainrot score, strong links into the Gen Alpha / chaos cluster when real.

---

## Relationships (priority order)

Prefer typed edges over same-category padding:

1. Origin (`originated` / `originatedFrom`)
2. Creator / popularizer (`popularized` / `popularizedBy`)
3. Format (`sameFormat`)
4. Historical / community (`relatedEvent`, `community`, `inspiredBy`)

Avoid linking only because something is popular.

---

## Related tooling

| Script | Purpose |
|--------|---------|
| `npm run audit:quality` | Strong / improve / merge / questionable buckets |
| `npm run audit:editorial` | Raw detector flags |
| `npm run validate` | Hard data integrity gate |
| `npm run audit:media` | Media completeness warnings |
