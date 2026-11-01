---
name: eli5
description: >-
  Use when explaining topics or sources visually. Build fact-checked HTML explainers
  in the ELI5 Lab format, with audited coverage, tested labs, and verified publication.
  Triggers include /eli5, ELI5, explain like I'm five, explain this simply,
  beginner explanations, and article/video/thread links to explain.
---

# ELI5

Turn a topic or a source (video, article, thread) into **one HTML explainer** in the ELI5 Lab house format, then publish it to https://eli5-seven-mu.vercel.app.

The reader is a smart adult with zero background in this topic, not a child. Never talk down, never use baby analogies, never trade truth for cuteness. They should leave with a **correct** mental model and every substantive teaching point within the declared scope. Five minutes is a target, not permission to omit ideas; use a longer honest reading time or clearly divided sections for long sources.

## What to make: one standalone explainer, unless told otherwise

**Default: every request makes one standalone explainer.** A link, a pasted article, a video, a thread or a bare topic becomes a single page that stands on its own, in its category and subcategory, built with the nine steps below. This holds even when:
- the source is long. Use a longer honest reading time or clearly divided sections (see the scope rule above). Do not split it into several pages.
- the topic sounds like it belongs in an existing series, or matches one of its planned parts. Build it standalone, and in the reply add one line saying it could become Part N of "<series title>" if the user wants.
- the source itself is "part 3 of" someone else's series. That is their series, not one on this site.

**Series work only on an explicit instruction**, such as "start a series on X", "make this Part 5 of How AI works", "add the next part" or "expand the series with a part on Y". Then follow **Series mode** below as well as the nine steps. If it is unclear whether the user wants a series, ask one short question before Step 4. Do not guess either way.

**Changes to the site itself** (home page, reader, series UI, `app.js`, `index.html`, `design.css`, `eli5-study.*`, `series-ui.*`) are never part of publishing an explainer. Do them only when asked, on their own branch, and ask before merging to `main`.

**Gold example:** `examples/real-gdp-eli5.html` in this skill's folder. It was built from a 10-minute Hindi YouTube video. Before you start, open it and read it end to end: the panels, the drawings, the lab, and the code. Copy its visual patterns, not its dated facts or unverified interpretations. It is a design reference, not an authority; apply all current checks to it.

## Files in this skill

| File | Use |
|---|---|
| `template.html` | Start every explainer from a copy of this. Fill the `{{...}}` slots. |
| `examples/real-gdp-eli5.html` | The finished reference. Copy its patterns. |
| `scripts/transcript.py` | Fetch captions, diagnose gaps/endpoints, write source metadata; not a guarantee of completeness. |
| `scripts/check_explainer.py` | Structural lint, audit results, and artifact hash checks; necessary but not sufficient. |
| `scripts/check_render.py` | Browser checks: collisions, arrows through shapes, lab axis vs bars at every preset/extreme, phone overflow; saves per-panel screenshots. |
| `templates/audit.json` | Starter audit structure; store filled audits outside the public repository. |
| `templates/card.svg` | Starter for the catalogue card drawing (Step 8). |
| `examples/cards/*.svg` | Finished cards: the J-curve (Oracle) and the sector lenses (GDP). Copy their approach. |
| `scripts/check_card.py` | Card lint: shell, safety, labels, edges, palette, labelled boxes. Static only. |
| `references/video-frames.md` | Concrete download, frame extraction, and inspection recipe. |
| `references/series.md` | Series mechanics: the data file, the series map page, page wiring, the home page band, reading progress. Read it only in Series mode. |

Paths below use `SKILL` for this skill's folder and `SITE` for the root of the site repository (the one with `published.js` and `explainers/`). On the owner's Mac that is `SKILL=~/.hermes/skills/eli5` and the local site checkout. Inside the site repository the skill lives at `SITE/.claude/skills/eli5`. In a cloud session, use the repository clone as `SITE`, the session's scratchpad for `WORK`, and `python3.12` with Python Playwright (`python3.12 -m pip install --user --break-system-packages playwright` if missing). The browser scripts fall back to the preinstalled Chromium when Google Chrome is absent (set `ELI5_CHROME` to choose another binary).

## Reliability contract — mandatory

Read `references/reliability-gates.md` before execution. It refines the nine steps below and takes precedence over conflicting shortcuts in the reference example or template comments.

Produce either a verified artifact or an explicit blocked result. Do not silently lower requirements. Do not automatically switch models or delegate to a stronger model: the user controls model selection. Scripts are partial checks, not proof of correctness: transcript diagnostics are not proof of source completeness, and 0 errors from the checker is only structural lint. Persist evidence and results in an audit file. No model-independent guarantee of understanding is claimed. Early in the task, inspect the site's Git state so publication risk is known before expensive work. A dirty worktree gates publishing, not safe local authoring: finish the artifact and its checks without touching unrelated changes, then report publication blocked if the publisher would manipulate or push them.

## The workflow: 9 steps, in order, none skipped

Each step ends with a **Done when** line. Do not start the next step until it is true.

---

### Step 1: Capture the whole source

Skip to Step 2 if the user gave only a topic and no link.

**YouTube / video:**
```bash
python3.12 $SKILL/scripts/transcript.py "<url>" "$WORK/source"
```
First create a unique run directory under the managed scratch directory and set `WORK` to its absolute path. Never use a shared capture folder or `/tmp`. The helper writes the transcript and source metadata with coverage diagnostics. Check actual text, caption quality, gaps, and beginning/middle/ending coverage. Nonzero capture status requires investigation or fallback, not publication. Use a bounded tool timeout. This helper is YouTube-specific; route other video sources through `video-study-notes`.

**Caption-language trap:** inspect the available subtitle tracks before accepting the first one. If YouTube selected a dubbed or wrong-language track, explicitly request the original/English track with a fresh run directory, for example `yt-dlp --ignore-config --no-playlist --skip-download --write-auto-subs --sub-langs 'en,en-orig' --socket-timeout 20 '<url>'`; retry a transient rate limit once after a short delay. Parse the clean VTT rather than displaying rolling duplicate cues, and compare its opening, middle, and ending against the source before treating it as usable. If the explicit track is still unavailable or unusable, then use the audio-transcription fallback below.
- If capture is incomplete, empty, unavailable, or captions are unusable, follow the `video-study-notes` skill. It downloads the audio and transcribes it locally with `python3.12` + MLX Whisper.
- Hindi or other non-English captions are fine. Read them directly and translate the ideas yourself.

**X post/thread, Substack, blog, docs:** use `web-content-extraction`. If the page is paywalled, partial or JS-rendered, use `ego-browser` with the user's logged-in session. Use `blocked-page-recovery` only as a last resort, and say so in your reply.

**Completeness gate.** Write down: title, author/channel, date, URL, runtime or section count, and what proves you have the **ending** (last timestamp near the runtime, or the article's final heading). Never build from a teaser, a paywall shell, a search snippet, or a clipped transcript. If you cannot get the full source, tell the user and stop.

Follow `references/video-frames.md` for concrete extraction commands and record which frames were actually inspected.

**Visual-source gate:** captions do not contain every chart, equation, demonstration, or on-screen correction. Inspect representative frames and identified moments that rely on visuals. Use low-resolution periodic sampling for reconnaissance, then extract high-resolution frames at exact timestamps for charts, maps, equations, or visual corrections; do not infer unreadable numbers from a thumbnail. Inventory substantive visual teachings with timestamps. Record transcript-only versus transcript-plus-relevant-visuals and what was sampled; do not claim full-frame review. Essential inaccessible visuals block completion.

**Done when:** metadata, source text, relevant visual teachings, and beginning/middle/ending coverage are recorded in the audit. A caption near the end alone is not proof of completeness.

---

### Step 2: Write the teaching inventory

Read the **entire** source. List every teachable item in a table: one row per definition, mechanism, example, number, misconception, analogy, or claim. For the GDP video this was 18 rows.

| # | What the source teaches | Kind | Where | Check needed? |
|---|---|---|---|---|
| 1 | "Real GDP = nominal − imports − deflator" (claim being attacked) | misconception | 0:40 | no (it's the claim) |
| 10 | Firm buys at ₹40, sells at ₹44 → value added ₹4; sum of value added = GVA | example | 4:03 | no |
| 14 | Manufacturing deflator growth was −1.5% | number | 5:20 | yes |
| 18 | "Why deflate someone's output by banana prices?" | analogy | 8:30 | no |

Kinds: `definition`, `mechanism`, `example`, `number`, `misconception`, `analogy`, `claim`, `context`.

Rules:
- **Include** everything that teaches, even small asides. They are often the best ELI5 material (the banana line was).
- **Exclude** rants, insults, self-promotion, debate drama, and calls to subscribe. List them once as "excluded: rhetoric".
- **Mark the source's own examples and analogies.** You will reuse them (Step 4).
- **Mark what the source is arguing against.** It gets its own panel.
- **Topic-only requests (no source):** build the inventory from primary sources (official docs, papers, statistics agencies). It should have 10–20 rows covering the definitions, mechanism, common misconceptions, and key numbers.

**Done when:** every part of the source maps to an inventory row or to "excluded: rhetoric".

---

### Step 3: Check the facts

For every row marked "check needed" (numbers, dates, claims about how institutions work, "X recommends Y"):
1. Find a **primary source**: the official statistics office, regulator, law, filing, paper, or official FAQ. For India macro, MoSPI, RBI and PIB documents come first.
2. Give each row a verdict: **Supported**, **Mostly supported**, **Misleading / incomplete**, **Contradicted**, **Opinion / prediction**, **Unverifiable**, or **Time-sensitive**.
3. **Contradicted or misleading:** the explainer states the correct version and links the evidence, in the panel where the topic comes up. Example: "double deflation in manufacturing *and* agriculture in the annual estimates (manufacturing only in the quarterly ones — see rule 6)".
4. **Unverifiable:** keep it, attributed ("figure cited in the video"). Never present it as fact, and never call it false.
5. Never invent a URL, a quote, or a number. Use `grounded-citations` discipline: note the URL when you read it, and cite only what you read.
6. Keep attribution boundaries explicit when the source and primary evidence use different frameworks. If a video says “4F” but the official speech says “3F,” state both and explain the video’s extension; never silently rewrite one into the other.
7. **Match the series and period.** Before publishing a correction, check it applies to the same series, period, and frequency as the claim it corrects: annual vs quarterly, national vs sectoral, new series vs old. A correction that is true of one series but stated against another is itself a factual error.

Explain the **strongest version** of the source's argument. Correct its facts, but don't turn the explainer into a rebuttal.

**Done when:** every "check needed" row has a verdict, and every correction has a real URL.

---

### Step 4: Plan the panels and map coverage

**4a. Pick the running example.** Use one concrete toy case for the whole page. **If the source has its own example, use it** (Keshav Enterprises, ₹40 → ₹44), not an invented one. Fix its numbers now. Every later panel and the lab reuse them.

**4b. Pick the colours.** Give each recurring concept one colour, and keep it everywhere: drawings, text highlights, sliders, lab bars, and the legend.

| Colour | Hex | Default meaning |
|---|---|---|
| coral | `#ff8059` | the thing being explained (output, value added, the correct method) |
| teal | `#76d5c1` | the main other ingredient (inputs, costs) |
| gold | `#f5c76a` | a "fake" or price-only change |
| purple | `#c3b8ff` | a different measure people confuse it with (e.g. CPI) |
| red | `#f87171` | the wrong method or the claim being debunked |

Text `#f1eee8`, muted labels `#a5a29c`, dark text on coloured bars `#202020`, box fill `#202020`, box stroke `#57534f`. Use only the colours you need, and list each one in the hero legend.

**4c. Order the panels.** This is the usual arc. Adapt it, but keep the order logic:

1. **The claim** (if the source attacks one): show the wrong claim, then why each part is wrong.
2. **The problem:** what goes wrong without this idea. Motivation before mechanism.
3. **The catch / the analogy:** a familiar thing, drawn, with each part mapped onto the real thing.
4. **The building block:** the running example, introduced and drawn to scale.
5. **The textbook shortcut:** the naive approach and why it fails. Use the source's own analogy here if it has one.
6. **What actually happens:** the real mechanism, over 1–3 panels.
7. **Try it:** the lab (Step 6).
8. **The surprise:** the counter-intuitive consequence, with the source's real numbers.
9. **The common mistake:** the specific confusion the source exposes.
10. **Field guide** (optional): a card grid for a family of related things.
11. **So what:** 3 questions or uses for the real world, tied to the source's context (country, market, debate).

Usually 9–13 panels, then the takeaway card.

**4d. Coverage map.** Assign every inventory row to a panel, the lab, the field guide, or "dropped: <reason>". Dropping is allowed only for rhetoric or true duplicates.

**Done when:** every inventory row has a destination, and the running example's numbers are fixed.

---

### Step 5: Build the page from the template

```bash
cp $SKILL/template.html $SITE/explainers/<slug>-eli5.html
```
`<slug>` is lowercase-kebab-case with no spaces. Fill every `{{...}}`. Keep all the template's CSS (every rule, even ones your page doesn't use yet; the checker fails any class without a rule), the masthead, the legend, the takeaway card, and both `../eli5-study.*` links. Never inline the site CSS, add fonts, Google Fonts, CDNs, a light theme, or a new palette.

**Hero:** a `CATEGORY / N MIN` kicker, the `<h1>`, a 1–2 sentence `.lede`, then the source line. Use `Watch the source ↗` for video and `Read the source ↗` for text, and link the real URL. If facts were checked, add "facts checked against <primary source>". If there's no URL, give an honest attribution with no link. Then the colour legend.

**Category** (the home page calls it a *topic*) is normally one of the topics the site already has: `AI & Frontier`, `Monetary Architecture`, `Macroeconomics`, `Energy & Physics`, `Infrastructure`, `Distributed Systems`, plus any added later (list them with `grep -o '"category": "[^"]*"' $SITE/published.js | sort -u`). Reuse one whenever the explainer reasonably fits.

**A new topic**, only when the subject truly fits none of them (e.g. a biology explainer on a site with no biology):
- Name it like the others: Title Case, 1–3 words, an ampersand allowed ("Biology & Health", "Law & Policy"). It must name a broad shelf many future explainers could sit on, never this one explainer's subject ("Biology & Health", not "CRISPR").
- Don't create a near-duplicate of an existing topic ("Economics" next to "Macroeconomics"). If in doubt, use the closest existing topic and pick a new subcategory instead (Step 8).
- Use the new name in the masthead `topic-tag` and the hero kicker exactly as for any topic.
- Publish with `--category "<New Topic>" --new-category` (Step 9). The publisher refuses an unknown topic without that flag, so a typo can't create one by accident.
- Nothing else needs editing. The home page reads topics from `published.js`, so the new one gets its own tile after the built-in six, plus a footer link and a studio option.
- Say in the reply that you created a new topic, and why none of the existing ones fit.
- On the live check (Step 9), confirm the new tile shows the right name and count, and that clicking it lists the explainer.

**Every panel:** `<p class="kicker">ROLE</p>`, `<h2>` (≤ 8 words), `<p>` (target ~25 words, up to ~45 when precision needs it), then `<figure><svg>`. Text panels without a drawing are allowed only for the field guide and "So what".

#### Drawing rules (the core of this skill)

The test: **delete all the text. Does the drawing still carry ~60% of the idea?** If not, redraw it.

- **Sizes are the numbers.** Draw every quantity at its true size, and write the scale on the drawing ("16 px = ₹1"). Use **one scale for comparable diagrams of the running example**. Index, percentage, and unrelated-total charts may use different explicitly labelled scales; never force unlike units onto one scale. In the gold example, ₹44 is always 704px, so the ₹4 value added is visibly a thin slice.
- **No words in boxes.** A row of same-looking labelled rectangles with arrows is a slide, not a diagram. **One** per explainer at most (e.g. a formula). Everything else uses geometry: bar lengths, stacked segments, before/after on one baseline, treemaps, overlap, icons.
- **Overlap is drawn as overlap.** If two things partly overlap (CPI vs GDP coverage), the shapes must overlap. Two separate circles say "unrelated".
- **Labels are 1–5 words.** Sentences, lists and explanations go in `<p>` outside the SVG.
- **Font size 16+** in an 800-wide viewBox (never below 14). Phones shrink SVG text.
- **Every `<svg>` gets `role="img"` and an `aria-label`**: one sentence saying what it shows.
- Use small hand-drawn icons (a bottle, a loaf, a factory, scissors) when they help. Never use emoji as the main visual.

Pick the drawing from the shape of the idea:

| Shape of idea | Draw |
|---|---|
| Part of a whole | One long bar split into segments at true proportions |
| Total minus something | Two aligned bars on one scale, with the leftover gap labelled |
| Growth from two causes | Before/after bars on one baseline, the increase split by colour |
| Same total, two possible meanings | Two "worlds" side by side, with identical totals and different splits |
| Weighted average / basket | A treemap whose block areas are the weights |
| Many parts, each treated differently | One segmented bar, each segment with its own arrow or "lens" below |
| Stages | Left-to-right, each stage showing *what changes* (a quantity growing) |
| Wrong formula / claim | The formula as tiles, wrong parts struck through in red, each with a 2–4 word reason underneath |
| Three things people confuse | Three different kinds of object (a tool, a ratio, a basket) with ≠ between them |
| Index numbers | Horizontal bars from 0, a dashed line at base 100, the value at each bar's end |

#### SVG collision rules

- Plan label zones first. Never put a caption between two rows where connectors run.
- Text width ≈ 0.5 × font-size × characters. Check every label's box against its neighbours and the viewBox edge. Keep 20px clear of the edges.
- Dark text (`#202020`) only on coloured bars wide enough to hold it. Otherwise put the label next to the bar in a light colour.
- Spread converging arrows across the target's edge, and don't run connectors through text.
- **One `<path>` per arrow.** A `marker-end` draws a single arrowhead at the end of the whole path, so `M…H…M…H…` with one marker shows one head for several arrows.
- **Arrows run edge to edge.** Start and end each connector on the shape's boundary (for a circle: centre ± radius along the line), never at its centre.
- **Loops and rings go around labels, not through them.** Put the ring outside or inside the nodes' label boxes.
- A deliberate strike-through (wrong formula) gets `class="strike"` so the collision check allows it.

#### Words

- **Caveat notes** (`<p class="note">`): **maximum 2** per page. Spend them on limits that change understanding (e.g. "thin margins magnify errors"). Source-verification boundaries go once, in the hero source line.
- Use the source's real numbers, with what each one measures and who said it ("−1.5%, figure cited in the video").
- Explain every term the first time it's used, ideally by drawing it first and naming it second.

**Done when:** every inventory row appears where the coverage map says, and no `{{` remains.

---

### Step 6: Build the lab

If anything in the topic can be varied (a price, a rate, a size, a probability), the lab is **required**. It's the most valuable panel on the page.

1. **Fix the truth by construction.** State assumptions, units, and a checkable relationship. In the GDP lab, output and input quantities grow by the same proportion with unchanged efficiency; only then does real GVA growth equal the quantity slider. Draw the expected result as a dashed line where appropriate.
2. **Choose the lab type.** Use method comparison for genuine correct-versus-shortcut cases. Use mechanism exploration for verified outcomes or trade-offs. Never invent a wrong method merely to fit the template. Keep conceptual colours consistent.
3. **Compute every method; include every shortcut.** Each method shown must be computed live from the slider inputs — never hard-wire a bar to the right answer. A bar that cannot be wrong teaches nothing, and the structural checker cannot catch this; only your independent calculation in item 8 can. Every shortcut in the teaching inventory must appear as a lab row, preset, or explicitly dropped with a reason.
4. **2–4 sliders, with sensible defaults.** The defaults should already show a visible gap, not zero.
5. **2–4 presets** named after real situations ("Oil shock, can't pass on", "Commodity crash", "Prices move together", "Growth, flat prices"). For method-comparison labs, include one where the shortcut happens to be right. Mechanism-exploration labs instead need meaningful contrasting settings.
6. **The ledger** lists the intermediate numbers so the reader can redo the maths.
7. **Configure, don't hand-edit, the renderer.** Change only `ids`, `compute()` and `labConfig` (units via `format`/`sliderFormats`, axis via `minSpan`/`maxSpan`/`step`). The template's `update()` puts zero at the left edge when no value can be negative and centres it otherwise, and it places every tick and bar with one scale function. Never retype tick labels or coordinates. If a topic truly needs a different chart (a timeline, a curve), write it with one scale function and tag its axis labels `<text class="tick" data-v="VALUE">` and its bars `<rect data-v="VALUE">`; `check_render.py` fails a lab chart without them. Dynamically generated SVG text must also be readable (16px minimum). Clipped bars require overflow markers, full values, and visible disclosure. Do not let auto-scaling hide the teaching signal.
8. **Check independently with calculation tools.** Calculate expected defaults, every preset, boundaries, and invariants separately from the page implementation. Do not generate expected answers by calling the same compute() being tested. Compare against browser results with explicit tolerances, including simultaneous extreme slider settings. A wrong lab is worse than none.

If the topic truly has nothing to vary, skip the lab and say why in your reply.

**Done when:** default, preset, and boundary outputs match independently calculated expected values within recorded tolerances.

---

### Step 7: Check it, mechanically and by eye

**7a. Automatic check:**
```bash
python3.12 $SKILL/scripts/check_explainer.py $SITE/explainers/<slug>-eli5.html
```
Fix every **ERROR** and re-run until it says `0 errors`. Fix each **WARN** too, unless you can say in one line why it's fine (e.g. "the one allowed formula row").

```bash
python3.12 $SKILL/scripts/check_render.py $SITE/explainers/<slug>-eli5.html --shots $WORK/shots
```
Fix every **ERROR** and re-run until it says `0 errors`. It renders the page in Chrome and checks text clipping and overlap, lines crossing labels, arrows through shapes, the lab's ticks and bars at the defaults, every preset and every all-min/all-max slider combination, and sideways scrolling at 390px. Both checkers apply to every explainer, whatever the source (video, article, thread, docs, or a bare topic). Never weaken a check or tag something `strike` to get to 0 errors; fix the drawing.

**7b. Look at it.** Open every screenshot `check_render.py` saved (`desktop-NN.png`, `phone-NN.png`, one per panel) and answer for each, in the audit: does every arrow have a head, does every label sit clear of lines and shapes, is the lab's longest bar at the right place on the axis, is anything unstyled (plain stacked text where a grid or card should be)? Fix anything cramped, clipped or unreadable, then re-run 7a. The script catches the measurable faults; the screenshots are for what it can't measure.

**7c. Coverage re-check.** Go down the inventory one row at a time and find each one on the page. Anything missing gets added now.

The supplied scripts are incomplete checks. Complete the supplementary checks in `references/reliability-gates.md`: dynamic labels, vertical clipping, transformed coordinates, text-shape collisions, mobile scrolling, semantic accuracy, and numerical boundaries. A checker crash is not a pass.

**Done when:** lint, supplementary browser checks, screenshots, independent numerical tests, and inventory review pass. Record the final artifact SHA-256 and results in the audit. Later edits invalidate affected checks; rerun them before publication.

---

### Step 8: Draw the catalogue card

The homepage shows the **three newest explainers as cards** (at most one per series), each with a small drawing. The catalogue then starts as **one tile per topic** with its count; a tile opens that topic's list, grouped by **subcategory** and sorted by date. The card is the first thing a reader sees, so it gets the same care as a panel.

1. **Draw it.** `cp $SKILL/templates/card.svg $WORK/card.svg`, then draw a miniature of the page's central picture, the one that carries the main idea. Look at `examples/cards/`: the Oracle card is its J-curve, the GDP card is its sector lenses. Not labelled boxes, not the headline in text, not a new metaphor the page doesn't use.
2. **Rules.** `viewBox="0 0 320 155"`, `role="img"` and a one-sentence `aria-label`. Transparent background (the card supplies it). The page's legend colours with the same meanings. 0–3 labels, each 1–3 CAPS words, `font-family="monospace" font-size="9"` on the text or a parent `<g>`. Every label 16+ units from every edge. Give every shape an explicit `fill` (`none` or a colour): the default black disappears on the dark card. No `<style>`, `<script>`, `<image>`, `<use>`, links or event handlers. The publisher rejects them because the card is inlined into the homepage.
3. **Lint.** `python3.12 $SKILL/scripts/check_card.py $WORK/card.svg` until it reports 0 errors. Fix each warning or justify it in one line.
4. **Pick the subcategory.** Reuse an existing one when it fits. List them with `grep -o '"subcategory": "[^"]*"' $SITE/published.js | sort -u`. A new one is Title case, 1–3 words, and names a shelf more than one future explainer could sit on ("AI data centres", not "Oracle's debt").
5. **Look at it rendered.** Run the Step 9 publisher command with `--dry-run`. It only rewrites `published.js`, and a dry run never counts as published. Serve `$SITE` (Step 7b) and open `http://localhost:8765/`: the new explainer is first under "Latest explainers". Run the Step 7b snippet with `document.querySelectorAll('#grid .diagram svg')` in place of `document.querySelectorAll('svg')`, then screenshot the card at desktop and 390px. Check that it reads at a glance next to the other two cards and that no label is clipped or overlapping.

**Done when:** the card lints clean, renders correctly at both widths, and the subcategory is chosen. Record the card path and checks in the audit.

---

### Step 9: Publish, then reply

```bash
python3.12 $SITE/scripts/publish-eli5.py $SITE/explainers/<slug>-eli5.html \
  --title "<same as h1>" --category "<existing topic>" --minutes <read time> \
  --summary "<hook, ≤ 12 words>" \
  --bullet "<key idea 1>" --bullet "<key idea 2>" \
  --nodes "STAGE1,STAGE2,STAGE3" \
  --subcategory "<from Step 8>" \
  --card-svg "$WORK/card.svg"
```
For a brand-new topic (Step 5), add `--new-category`. `--nodes` only feeds a fallback box drawing; the card replaces it. The date defaults to today (`--date YYYY-MM-DD` to override). A new explainer without `--subcategory` and `--card-svg` is refused.
The publisher also writes the link preview: it renders `assets/og/<slug>-eli5.png` (title + card, 1200×630; needs Playwright and Google Chrome), puts preview tags into the explainer just before `</head>` between `link-preview` markers, and regenerates `sitemap.xml` and `feed.xml` (`scripts/site_meta.py`). Never hand-edit inside the markers. The block changes the file, so after the Step 8 dry run re-run the 7a check with `--audit <audit file>` to re-record the artifact hash; nothing outside the head changes, so other checks stand.
First run the Git preflight in `references/reliability-gates.md`. The script commits selected paths but pushes all outgoing HEAD commits, and internally uses pull --rebase --autostash. Stop if unrelated work would be published or manipulated. Never clean/reset/discard changes to manufacture a safe state.

After pushing, read back the exact live explainer and catalogue entry, verify reviewed content/assets, and exercise the live lab. On the live homepage, confirm the card is first under "Latest explainers" with its drawing and date, and that clicking its topic tile lists the explainer under the right subcategory (a series part sits inside its series' row). Check that the live explainer's `og:image` URL returns 200. Use bounded retries for genuine deployment lag (e.g. route still 404 or server error), not for failed content assertions. Verify the deployed route after redirects (the site may canonicalize away `.html`) and record the final URL, HTTP status, lab result, and catalogue link in the audit. Assert the page's actual `<h1>` or canonical route for identity; `document.title` may append the site brand, so don't compare it to the unadorned catalogue title. Once the page returns 200, a failed assertion is a verification defect to diagnose immediately, not a reason to replay the whole retry loop. If deployment cannot be confirmed, report `pushed; deployment not verified`. On script failure inspect current Git/catalogue state before retrying; unchanged reruns can fail at commit. Never hand-edit `app.js` or publish unrelated work.

**Reply to the user with:**
1. The live link: `https://eli5-seven-mu.vercel.app/explainers/<slug>-eli5` (the explainer's own page; it carries the link preview, `?id=` links preview as the homepage)
2. One line on the source and its completeness (e.g. "10:57 video, Hindi captions, complete").
3. The coverage table, one line per inventory row: `# · item · → panel name` (or `dropped: reason`).
4. Corrections made to the source, each with its evidence link.
5. Anything unverifiable, kept but attributed.

Don't paste the explainer's content into chat. The page is the deliverable.

**Honest endings:** partial capture blocks publication unless the user explicitly authorises a partial-source explainer. In that exception name missing coverage in the hero, audit, and reply. If no material factual error was found, say "No material factual error found in the checks performed." Include the audit path; never claim exhaustive truth or guaranteed quality.

---

## Updating a published explainer

When the user asks to fix, extend or refresh an explainer that is already live:

1. **Edit it in place.** Change `$SITE/explainers/<slug>-eli5.html` directly. Never rename the slug: it is the URL and the catalogue id. A new source or a changed claim goes back through Steps 1–3 for the parts it touches.
2. **Re-run what the change affects.** Lint, the browser and screenshot checks, and the independent lab tests for the touched panels. Then the coverage re-check, and the audit with a new artifact hash (Step 7). An unrelated panel doesn't need re-testing; a changed lab does.
3. **Card.** If the central picture changed, redraw the card and run Step 8 again. Otherwise keep the existing one.
4. **Re-publish** with the Step 9 command, using the same file and the current title, summary, bullets and nodes. Leave out `--subcategory`, `--card-svg` and `--date` to keep what's live. Pass `--card-svg` to replace the drawing, `--subcategory` to move it to another shelf. The original publication date is kept unless you pass `--date`. The commit reads `content: update ELI5 "<title>"`.
5. **Verify live** exactly as for a new explainer (page hash, lab, card, catalogue row, preview image). A changed title, summary or card re-renders the preview image under a new URL, so shared links pick it up. Reply with the link, what changed and why, and any new corrections with evidence.

The publisher only commits the explainer, `published.js` and the generated preview, sitemap and feed. Changes to the site itself (`app.js`, `index.html`, `design.css`, `eli5-study.css`) are separate, reviewed commits, never part of publishing.

---

## Series mode

Use this only on an explicit series instruction (see "What to make"). A series is an ordered set of explainers with one series map page, a strip at the top of each part ("Part 3 of 17 · Chip track"), previous/next cards at the end, and a band on the home page with a lane map and reading progress. All of that is drawn from one series data file, so publishing a part is mostly the nine steps plus a few series-specific changes. Read `references/series.md` for the mechanics before the first series task in a session.

### Starting a new series

1. **Plan first, then ask.** Before writing any page, send the user a plan: the series title, one-line tagline, 1–3 tracks (with name, short name and colour each), every planned part in reading order (title + one-line blurb + track), an optional bonus deep dive, and the shared colour key. Wait for approval. The plan is cheap to change. Published URLs are not.
2. **Series colour key.** Pick it once for the whole series and write it into the series map page ("The same colours mean the same things") and as a comment in each part's `<style>`. Every part uses the same colour for the same concept, even where Step 4b would choose differently for a single page.
3. **Data file.** `series.js` holds the first series and must keep its shape. Every later series gets its own `series-<id>.js` at the site root that pushes itself onto `window.ELI5_SERIES_LIST`, and is loaded in `index.html` after `series.js`. List every planned part with no `file` yet.
4. **Series map page** (`explainers/<series-slug>.html`, published first, as `--part 0`). Copy the existing map page and adapt it as `references/series.md` describes. `check_explainer.py` checks it as a series map, not as an explainer.
5. **Then Part 1**, as below.

### Writing a part

Run all nine steps. These are the differences:

- **Step 1–2 scope.** The part's scope is its blurb in the series data. The inventory covers that scope. List terms earlier parts already taught: recap each in one line and link back, don't re-teach. List topics deferred to later parts and say so on the page ("Part 7 covers this").
- **Step 4.** Use the series colour key. Carry the running example across parts when the topic allows, so readers meet familiar numbers.
- **Step 5 page wiring** (checked by `check_explainer.py`):
  - `<body data-series-id="<slug>-eli5">`, where the id equals the file name without `.html`.
  - `<div class="series-strip" data-series="top" role="navigation" aria-label="Series"></div>` right after the hero's source note.
  - The same with `data-series="end"` after the last panel, before the takeaway card.
  - Before `../eli5-study.js`, load `<script src="../series.js"></script>`, plus `../series-<id>.js` for a later series.
- **Fact tags.** Series parts are often built from topics rather than a single source. In the hero, explain the tags once (`<span class="tag">public</span>` for a published paper, spec sheet or plain arithmetic, `<span class="tag">example</span>` for a made-up but consistent number, `<span class="tag np">not public</span>` where a company has not said) and tag facts as you use them. This is on top of Step 3, not instead of it.
- **Go deeper boxes.** Optional detail goes in `<details class="trace"><summary>Go deeper: …</summary>…</details>`. A reader who skips every one must still follow every later part.
- **Hand-off.** The last panel before the takeaway names what the next part answers. The end cards link it automatically.
- **Step 8 card.** Add the label `PART N · <TRACK NAME>` in the track's colour (still 0–3 labels).
- **Step 9 publish.** Use `--subcategory "<series title>"` (exactly the series title, so the catalogue groups the parts) and `--part N`. Start `--summary` with `Part N: `. Before running the publisher, set `file: '<slug>-eli5.html'` on the part in the series data file and commit that change on its own, so the publisher's push carries both. Note it in the Git preflight as the one expected outgoing commit.
- **Live checks, in addition to Step 9's.** The part's strip reads "Part N of M". The previous part's end card now links to it. Its dot on the home page band and the series map is lit, not dashed.

### Expanding a series

- **New parts:** add them to the data file's `parts` list first. Appending is safe. Inserting before an already-published part renumbers every later part, which changes "Part N" labels, summaries and cards that are already live. Ask before doing that, and if approved, re-publish each affected part with its new `--part` and summary.
- **More tracks or a bonus:** add fields only. Never rename or remove fields in a series data file, because published pages read them.
- **A part that is already live as a standalone explainer:** only when the user asks. Wire it in as above and re-publish with `--subcategory` and `--part` (Updating a published explainer). Keep the slug.

## Anti-patterns (each one has shipped before)

- **Explaining the neatest sub-idea instead of the whole source.** An earlier GDP explainer explained double deflation well, but missed the video's main point (there is no single deflator) and its punchline (a method confused with a number). Step 2 exists to prevent this.
- **Words in boxes:** rows of labelled rectangles with arrows standing in for diagrams. This includes the catalogue card: the old default card was exactly this.
- **Inventing a new example** when the source gave one.
- **Dropping the source's real numbers** in favour of toy ones. Use toy numbers to explain, and real numbers to anchor.
- **A caveat note on every panel**, or turning the page into a rebuttal of the source.
- **A lab that's too zoomed out** (bars a few pixels wide) or that only changes a number in text.
- **Sentences inside SVGs.** They become 6px on phones.
- **Leaving the house format:** custom fonts, palettes, light pages, a different header, a missing legend or takeaway card.
- **Hand-editing the lab's axis.** A page relabelled the template's ticks to `0% / m/2 / m` while the bars still started mid-chart, so a 32% bar appeared to start at 20%. Configure `labConfig`; never retype ticks.
- **Deleting template CSS** "because it looked unused": the field guide then rendered as plain stacked text.
- **Several arrows in one `<path>`** (one arrowhead for three arrows), arrows drawn centre-to-centre through circles, and dashed rings running through node labels.
- **Analogies that are load-bearing but false.** If the analogy breaks somewhere important, say so in one line.
- **Starting a series nobody asked for**, or splitting one long source into "Part 1/2/3". The default is one standalone explainer.
- **Series parts that skip the checkers.** Parts 1–4 of "How AI works" shipped with sentences inside drawings, 12px labels and panels without drawings. A series part goes through every gate a standalone explainer does.
- **Re-teaching earlier parts at length**, or using a different colour for a concept the series already coloured.
