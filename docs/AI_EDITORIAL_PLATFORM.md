# AI Editorial Platform

Architecture notes for **RC3-A** (foundation), **RC3-B** (workflow), and **RC3-C** (intelligence).

## Status

| Item | State |
|------|--------|
| Providers + prompts + pipelines | Present (RC3-A) |
| Packages + workflows + state machine | Present (RC3-B) |
| Editorial intelligence engine | Present (RC3-C) |
| AI SDKs / env vars / API routes | **None** |
| Public UI / article generation | **None** |
| Wired into App Router | **No** |

## Docs

- [`lib/ai/README.md`](../lib/ai/README.md)
- [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md)
- [`EDITORIAL_INTELLIGENCE.md`](./EDITORIAL_INTELLIGENCE.md)

## Relationship to other ports

| Module | Role |
|--------|------|
| `lib/ai` | Editorial LLM platform + reasoning framework |
| `lib/intelligence/` | Live-site cultural scores / related recommendations |
| `lib/intelligence/ai` | Heuristic suggestion envelopes (no LLM required) |
| `lib/integrations` `AiAssistProvider` | Future thin assist port for product features |

## Next phases (not started)

1. Implement one provider behind `AIProvider` with server-only secrets
2. Internal CLI/tooling that runs workflows using intelligence helpers
3. Map `DraftPackage` → article templates with human confirmation
4. Keep `npm run validate` as the hard gate before any commit
