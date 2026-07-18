# Editorial Style Guide

How Internet Culture Hub articles should sound: consistent, human, and encyclopedia-grade — without every page reading like the same template.

For field-level authoring steps, see `content-guide.md`.  
For what language is allowed in prose, see `CONTENT_LANGUAGE_POLICY.md`.

---

## Article tone

Write like a sharp culture desk editor who actually uses the internet.

- **Clear first.** Readers came for meaning — give it quickly.
- **Specific over hype.** Prefer dates, platforms, and named moments over “went viral.”
- **Warm, not corporate.** Avoid marketing verbs (*discover*, *unlock*, *dive deep*).
- **Confident, not know-it-all.** Hedge only when sources disagree.

Humor is welcome when the subject is playful. Neutrality is required when the subject is contested, harmful, or biographical.

---

## Sentence style

- Prefer short–medium sentences. Mix length so rhythm feels human.
- Lead with the claim; put caveats second.
- Active voice by default (“Kai Cenat popularized…”).
- Cut filler: *in order to*, *it is important to note*, *in today’s digital age*.
- Do not open every article with “X is a term that means…” — vary openings.

---

## Introduction structure

1. **Hook / identity** — what this is, in plain language (1–2 sentences).
2. **Origin anchor** — platform, era, or defining moment (when known).
3. **Why it matters** — cultural weight, not SEO padding.

Card `description` fields are hooks (under ~20 words), not mini-essays. Body copy carries the full definition.

---

## Description quality

| Good | Weak |
|------|------|
| Captures recognition (“the bait-and-switch that never died”) | Dictionary paraphrase |
| Signals vibe without overselling | “A popular internet phenomenon…” |
| Specific enough to distinguish similar entries | Interchangeable with any other card |

---

## Heading conventions

- Article titles: **title case** for proper names and established meme names (`Rickroll`, `Skibidi Toilet`).
- Section headings in UI/docs: sentence case preferred (`Related entries`, not `RELATED ENTRIES`).
- Do not invent flashy H2s inside article data fields — keep structured fields (`meaning`, `origin`, `impact`) as the outline.

---

## Capitalization

- Proper nouns, creator names, and branded platform names: capitalize.
- Generic categories (`meme`, `slang`) lowercase in running prose.
- Internet coinages: follow the form people actually use (`rizz`, `gyatt`) unless the entry’s canonical title differs.
- Acronyms: all caps when spoken that way (`NPC`, `GOAT`); expand on first mention in longer prose when helpful.

---

## Citation style

- Prefer primary or authoritative sources: Know Your Meme, Wikipedia, official channel pages, contemporaneous reporting.
- `sources` array: real URLs only — never invent citations.
- In prose, attribute disputed claims (“according to Know Your Meme…”) rather than presenting rumor as fact.
- Media attribution lives on `MediaItem` fields (`source`, `sourceUrl`, `attribution`) — keep captions factual and short.

---

## When humor is appropriate

- Memes, slang, brainrot, absurdist trends: light wit is fine.
- Punch up the culture, not down at people.
- Irony about the *phenomenon* is better than forced jokes every paragraph.

## When neutrality is required

- Living creators and private individuals.
- Controversies, scandals, harassment campaigns.
- Terms tied to hate, exploitation, or real-world harm (see language policy).
- Competing origin stories — present the strongest documented accounts.

---

## Consistency without sameness

Shared standards: accuracy, specificity, source honesty.  
Vary: opening lines, metaphor, level of wit, and how much lore you unpack.

If two articles could swap introductions and still “work,” rewrite them.

---

## UI voice (product chrome)

Interface copy should feel editorial too:

- Prefer concrete labels (`Browse categories`, `No close matches found`) over generic SaaS (`Explore`, `Discover more`, `Something went wrong` without context).
- Empty states: one clear sentence + one helpful hint.
- Do not promise features that do not exist.
