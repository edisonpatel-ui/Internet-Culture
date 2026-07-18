# SEO & Traffic Growth Loop

Process for turning measurement into content decisions. No ads, accounts, or monetization required.

## Data sources

| Source | Answers |
|--------|---------|
| Vercel Analytics (page views + custom events) | What pages are visited? What do people search on-site? Which related links work? |
| Google Search Console | What queries show ICH? CTR? Average position? |
| `lib/analytics/performance.ts` | Editorial priority heuristic (expand / maintain / refresh_seo / monitor) until live traffic merges in |

## Loop

```
Traffic / search data
        ↓
Diagnose page or cluster
        ↓
Choose action (title, related links, new article, hub expansion)
        ↓
Ship change → validate → build
        ↓
Re-measure in 2–4 weeks
```

## Decision playbook

### Ranks but low clicks

- Improve SEO title / description (`buildEntrySeoTitle` patterns + entry description).
- Ensure featured media exists for OG previews.
- Example: high impressions on a slang term with a vague title → rewrite for “What does X mean?”

### Gets traffic (on-site or search)

- Add / strengthen `relatedSlugs` and `relationships`.
- Link into the right hub (`/brainrot`, `/slang`, `/memes`, …).
- Expand the cluster with missing adjacent articles (only after research).

### Cluster is growing (many searches / related clicks)

- Expand that hub section.
- Prefer depth in one cluster over random new topics.

### Users search something missing

- Check `search` + `search_result_click` events and zero-result queries.
- Create a researched article; register aliases for common spellings.
- Do not publish guesses.

### High legacy, low current demand

- Example pattern: landmark creators/memes with high Influence but lower Relevance.
- Refresh accuracy and SEO lightly; do not prioritize large new builds unless demand returns.

## Event reference (on-site)

| Event | Use |
|-------|-----|
| `search` | Query + result count (debounced) |
| `search_result_click` | Which result won |
| `category_filter` / `topic_filter` | Discovery UI usage |
| `related_article_click` | Graph quality |
| `topic_link_click` / `hub_click` | SEO topic / hub navigation |
| `home_search_submit` | Homepage intent |

No PII is collected. Queries are truncated and lowercased before send.

## Future dashboard (not built yet)

`buildPerformanceCatalog(entries)` produces rows ready to merge with:

- live `pageViews`
- GSC `searchImpressions` / `searchClicks` / `avgPosition`

Keep zeros out of the model until real data exists — optional fields stay omitted.
