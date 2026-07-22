# Research Workspace (RC4-B → RC4-D)

Internal editorial research surface for the Editorial OS.

## Routes (internal, noindex)

| Path | Purpose |
|------|---------|
| `/research` | Two-column workspace — select a session |
| `/research/[sessionId]` | Session open in the main panel |

Not in public nav. Disallowed in `robots.ts`. Metadata `robots: noindex`.

## Layout (RC4-D)

- **Left sidebar:** sessions, search, workflow/priority filters, status chips, New Session (placeholder)
- **Main panel:** topic header, executive summary, research overview, tabbed workspace

### Tabs

Overview · Timeline · Evidence · Entities · Relationships · Coverage · Recommendations · Activity

## Data

- Sessions: `lib/admin/research/mockData.ts` (in-memory)
- Intelligence reports: RC4-C `resolveReportForSession` (curated mocks + mock builder)
- No AI providers, no APIs, no DB, no `lib/content` writes

## Code layout

```
types/admin/research.ts
lib/admin/research/              services, mocks, resolveReport, intelligence/
components/admin/research/       shell, sidebar, tabs, chips
app/(admin)/research/            pages
```

## Public site

Unchanged. No Header/nav links. No encyclopedia content changes.
