# Research Intelligence Engine (RC4-C)

Provider-agnostic reasoning layer for the Research Workspace.

**Location:** `lib/admin/research/intelligence/`

## What this is

Transforms research inputs into a structured **Research Report** — editorial knowledge, not published articles.

## What this is not

- Not article generation
- Not provider SDKs or API calls
- Not a chatbot
- Not App Router / UI wiring
- Not public encyclopedia writes

## Pipeline (mock)

`ResearchInput` → sourceCollector → researchOrganizer → evidenceMatrix → entityGraph → timelineAnalysis → relationshipAnalysis → coverageAnalysis → knowledgeSummary → confidenceEngine → **ResearchReport** / `ResearchOutput`

## RC3 connection

See `rc3Integration.ts` — ports map to RC3-B workflows and RC3-C intelligence modules. Async ports throw until wired. Sync reshape helpers are safe.

## Mock fixtures

`mockReports.ts`: Italian Brainrot, NPC Streaming, Looksmaxxing, Skibidi Toilet, Barbenheimer.
