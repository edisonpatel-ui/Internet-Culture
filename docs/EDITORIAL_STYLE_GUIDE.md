# Editorial Style Guide

How Internet Culture Hub articles should sound: clear, human, and useful — like a **modern, high-quality encyclopedia** written by a culture editor who actually uses the internet.

Readers include people who **do not already know the topic**. Write so a high school student can follow along, while still teaching something real to people who do know the culture.

**Teach over list.** An article is not a bullet dump of facts. It should explain a cultural story: what this is, why it mattered, how it moved, and what it left behind.

For field-level authoring steps, see `content-guide.md`.  
For what language is allowed in prose, see `CONTENT_LANGUAGE_POLICY.md`.  
Soft style warnings: `npm run validate` (`PROSE_STYLE`) and `npm run audit:editorial`.

---

## Audience test

Before you publish, ask:

1. Would a curious 15-year-old understand the first two sentences?
2. Would someone unfamiliar with the topic know **what it is** and **why people cared**?
3. Would a regular internet user want to keep reading?
4. Did you **explain** the moment — or only name-drop it?

If the answer is no, rewrite. Prefer teaching over sounding smart.

---

## The five questions (required)

Every article’s public prose should answer these. Field names differ by category (`meaning` / `definition` / `origin` / `impact` / examples), but the reader’s experience should not.

| Question | What to teach | Weak version | Stronger version |
|----------|---------------|--------------|------------------|
| **What is it?** | Concrete identity in plain language | “A popular internet phenomenon” | “A bait-and-switch YouTube prank that sends people to Rick Astley’s 1987 music video” |
| **Why did people care?** | Emotion, joke, status, fear, usefulness | “It resonated with users” | “It rewarded people who waited — and roasted the ones who clicked too fast” |
| **Why did it spread?** | Platform habits, remix ease, timing | “It went viral” | “Early YouTube made link-swapping easy, and forums treated the bait as a sport” |
| **Why is it remembered?** | What stuck in culture’s memory | “It became iconic” | “Years later, people still use ‘never gonna give you up’ as a punchline for false links” |
| **What influence did it have?** | Later formats, slang, habits — only if supportable | “It changed the internet” | “It helped normalize bait-and-switch humor as a default online prank” |

You do not need five equal-length sections. You do need the reader to leave with answers to all five.

---

## Contextual storytelling (not isolated facts)

Internet culture does not happen in a vacuum. When it helps understanding, briefly set the scene:

1. **The internet environment at the time** — What did people usually do online then? (forums, early YouTube, Vine loops, TikTok For You feeds)
2. **Competing platforms** — Where else could this have lived, and why did it win here?
3. **Related memes / trends / slang** — What family does it belong to? Name 1–2 neighbors when accurate.
4. **Why this happened when it did** — Timing, tech limits, audience mood, or platform incentives

Bad (assumes knowledge):

> After the Great Meme Reset, formats shifted toward short-form.

Better (teaches):

> Around the late 2010s, long-running image-macro formats felt tired to a lot of users. Short video apps rewarded faster jokes, so older template humor lost the center of the feed.

Do **not** invent era narratives. If you cannot support the context, keep the origin narrower and honest.

---

## Transitions and natural flow

Articles should read as one continuous explanation, even when data is stored in separate fields (`description`, `meaning`, `origin`, `impact`).

### Preferred arc

1. **Introduction** — What is it? (identity + one reason it matters)
2. **Origin** — Where / when it began, in the internet of that moment
3. **Spread** — How people copied, remixed, or argued about it
4. **Cultural impact** — Why it stuck in memory
5. **Legacy / current relevance** — Where it is now (still used, nostalgic, contested, faded)

### Transition habits

- Carry one idea into the next sentence (“Once it hit Reddit…”, “That joke format then…”)
- Reuse a concrete noun from the previous sentence instead of restarting with “Additionally,”
- Avoid field-shaped prose that sounds like labeled boxes pasted together

Bad (disconnected):

> Origin: Started on Tumblr in 2014. Impact: It influenced later aesthetics. Spread: Users posted edits.

Better (story):

> It started on Tumblr in 2014, when moodboard blogs were already trading soft, vintage-looking photos. Edits were easy to reblog, so the look spread before it had a tidy name. Later fashion and TikTok aesthetics borrowed the same cues — which is why people still recognize the vibe even if they never used Tumblr.

---

## Historical context — explain, don’t assume

Never assume the reader lived through the moment.

| Assume | Explain |
|--------|---------|
| “Classic 4chan greentext” | “On 4chan, stories were often typed in green quote text — short lines that start with `>`” |
| “During Vine’s peak” | “On Vine (2013–2017), people made looping six-second videos…” |
| “Post-Harambe internet” | “After the 2016 Cincinnati Zoo incident, memorial jokes and remixes…” |

If a related entry exists, you may point to it — but still give enough in-place context that the paragraph stands alone.

---

## Concrete examples over abstractions

Prefer:

- A specific video, sound, screenshot format, challenge, or catchphrase
- Named platforms, years, communities, creators
- One clear “here’s what people actually did” moment

Avoid:

- “resonated across demographics”
- “became part of the cultural conversation”
- “reflected broader societal anxieties”
- “a unique blend of humor and commentary”

Bad:

> The trend reflected Gen Z’s relationship with authenticity.

Better:

> Creators posted unfiltered “day in my life” clips with messy rooms and bad lighting — a pushback against polished Instagram feeds.

---

## Core writing principles

### 1. Explain before you analyze

Bad:

> AI became the defining cultural and economic anxiety of the era.

Better:

> After ChatGPT launched in late 2022, AI stopped feeling like a niche tech topic. People argued about whether chatbots would replace writers, artists, and coders — and joked about the weird answers the tools got wrong.

### 2. Prefer concrete, active writing

Prefer:

- Shorter sentences (mix length; avoid walls of clauses)
- Concrete examples
- Active voice (“Kai Cenat popularized…” not “It was popularized…”)
- Specific platforms, years, and communities

Avoid:

- Unnecessary jargon
- Generic phrases like “shaped the discourse”
- Overly dramatic claims without evidence (“the biggest,” “defining,” “changed everything”)
- Textbook / corporate / robotic tone (*dive deep*, *unlock*, *in today’s digital age*, *delve into*, *tapestry of*)

### 3. Maintain accuracy

- Do not exaggerate importance.
- Do not call something “the biggest,” “most iconic,” or “defining” unless a strong source supports that framing — or rephrase to something you can defend.
- Hedge when sources disagree. Stay confident when facts are clear.
- Do not invent statistics, origin dates, or neat causal stories.

### 4. Teaching beats listing

A timeline, highlight list, or usage examples can support the article — they should not *replace* explanation.

If a reader only skimmed `description` + `meaning`/`definition` + `origin`/`impact`, they should still understand the story.

---

## Article tone

Write like a sharp culture desk editor who actually uses the internet.

- **Clear first.** Readers came for meaning — give it quickly.
- **Specific over hype.** Prefer dates, platforms, and named moments over “went viral.”
- **Warm, not corporate.** Avoid marketing verbs (*discover*, *unlock*, *dive deep*).
- **Confident, not know-it-all.** Hedge only when sources disagree.
- **Encyclopedic, not academic.** No throat-clearing (*it is important to note*, *furthermore*, *moreover*).

Humor is welcome when the subject is playful. Neutrality is required when the subject is contested, harmful, or biographical.

---

## Sentence style

- Prefer short–medium sentences. Mix length so rhythm feels human.
- Lead with the plain fact; put analysis second.
- Active voice by default.
- Cut filler: *in order to*, *it is important to note*, *in today’s digital age*, *can be seen as*, *as we all know*, *needless to say*.
- Do not open every article with “X is a term that means…” — vary openings.
- Do not stack three abstract nouns when one concrete scene would do.

---

## Field-level generation guidance

Use these when drafting or improving entries (no UI changes required — this is author guidance).

### `description` (card hook)

- Under ~15–20 words
- Recognition + vibe, not a dictionary line
- Must still make sense to a newcomer

### `meaning` / `definition`

- Start with **what it is** in plain language
- Then nuance, irony, or secondary meanings
- Include **why people use it** (signal), not only the gloss

### `origin`

- Who / where / when — in narrative form
- Include the internet environment when helpful
- End by setting up spread (“From there, people began…”)

### `impact` (events) / closing cultural lines (memes, trends)

- Why it is remembered
- What influence it had (formats, slang, habits) — only with support
- Current status: still circulating, nostalgic reference, contested, or faded

### Examples / highlights / timeline

- Concrete moments that illustrate the story
- Not a substitute for `meaning` / `origin` / `impact` prose

---

## Introduction structure

1. **Hook / identity** — what this is, in plain language (1–2 sentences).
2. **Origin anchor** — platform, era, or moment (when known).
3. **Why it matters** — cultural weight with a concrete reason, not SEO padding.

Card `description` fields are hooks, not mini-essays. Body copy carries the full definition.

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

Shared standards: accuracy, specificity, source honesty, teach-first clarity, contextual storytelling.  
Vary: opening lines, metaphor, level of wit, and how much lore you unpack.

If two articles could swap introductions and still “work,” rewrite them.

---

## Pre-publish editorial checklist

- [ ] Answers all five questions (what / care / spread / remembered / influence)
- [ ] Explains historical context instead of assuming it
- [ ] Mentions internet environment or platform reason when relevant
- [ ] Uses at least one concrete example in body prose
- [ ] Fields read as one story (not disconnected label blocks)
- [ ] No hype, unearned superlatives, or generic AI filler
- [ ] `PROSE_STYLE` warnings reviewed (`npm run validate`)

---

## Soft tooling (editorial intelligence)

These help catch robotic / hype prose. They do **not** auto-rewrite articles.

| Command | Signal |
|---------|--------|
| `npm run validate` | `PROSE_STYLE` warnings (phrase patterns) |
| `npm run audit:editorial` | `PROSE_STYLE` flag when issues are notable |
| `npm run audit:quality` | May place copy in `improve` when prose flags stack with other weaknesses |

Always prefer a human rewrite over gaming the detector.

---

## UI voice (product chrome)

Interface copy should feel editorial too:

- Prefer concrete labels (`Browse categories`, `No close matches found`) over generic SaaS (`Explore`, `Discover more`, `Something went wrong` without context).
- Empty states: one clear sentence + one helpful hint.
- Do not promise features that do not exist.
