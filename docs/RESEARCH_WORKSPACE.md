# Research Workspace (RC4-B)

Internal foundation for the Editorial OS research surface.

## Routes (internal, noindex)

| Path | Purpose |
|------|---------|
| `/research` | Session list |
| `/research/[sessionId]` | Workspace for one session |

Not in public nav. Disallowed in `robots.ts`. Metadata `robots: noindex`.

## Code layout

```
types/admin/research.ts          ResearchSession model
lib/admin/research/              services, validation, mocks, AI ports
components/admin/research/       reusable workspace panels
app/(admin)/research/            pages (route group; URL still /research)
```

## Services (mock in-memory)

`createSession` · `updateSession` · `archiveSession` · `loadSession` · `validateSession` · `listSessions`

## AI integration

`lib/admin/research/aiIntegrationPoints.ts` — ports for research, evidence, entities, timeline, relationships, links, gaps. All throw until RC3 is wired.

## Public site

Unchanged. No Header/nav links. No content writes. No providers.
