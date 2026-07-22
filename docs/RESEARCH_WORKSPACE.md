# Research Workspace (RC4-B → RC4-D)

> **Phase 2+ / Experimental.** Legacy `/research` routes redirect into
> `/admin/experimental`. Not part of Version 1 content work.

Internal research surface for the Future Editorial System.

## Routes (internal, noindex)

| Path | Purpose |
|------|---------|
| `/admin/experimental` | Experimental AI Lab hub (current) |
| `/research` (legacy) | Redirects into the experimental lab |
| `/research/[sessionId]` (legacy) | Redirects into the experimental lab |

Not in public nav. Disallowed in `robots.ts`. Metadata `robots: noindex`.
Token gate + isolation details: [`EDITORIAL_OS_SECURITY.md`](./EDITORIAL_OS_SECURITY.md).

**Delete:** Research browser and Research Review can delete a package (confirm dialog). Cascades in-memory session / approval / draft state. Never touches published `lib/content` articles.

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
