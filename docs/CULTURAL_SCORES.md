# Cultural Scores

ICH uses exactly four editorial scores on every article (0–100).

## Why these four

Internet culture needs a small, readable score set — not a dashboard of proxies.

| Score | Meaning |
|-------|---------|
| **Relevance** | How current / actively discussed this is right now |
| **Influence** | How much this shaped internet culture over time |
| **Cringe** | How the topic is generally framed online (perception) |
| **Brainrot** | How absurdist / chaotic the associated content feels |

## What we do not store

- Popularity / virality / discussion as score fields (use `views` for catalog popularity listings)
- Longevity / search interest / “legacy impact” as separate score fields
- Live Google Trends numbers disguised as encyclopedia truth

## Editing guidance

- High Influence + low Relevance → landmark / legacy topic (refresh SEO lightly)
- High Relevance + lower Influence → hot now; longevity still unproven
- Never invent precision; scores are editorial estimates

See also: `lib/intelligence/scoreDocs.ts`, `types` `Scores` interface.
