---
name: eli5-series
description: Start, extend or change a multi-part series on the ELI5 Lab site (like "How AI works, from scratch") - the series data file, the series map (hub) page, the strip and previous/next cards inside each study, the home page series band, reading progress and publishing. Use whenever someone wants a new series, a new part in an existing series, or changes to the series UI.
---

# ELI5 Lab series

A **series** is an ordered set of ELI5 studies with a shared map page, a strip at the top of each
study ("Part 3 of 17 · Chip track"), previous/next cards at the end, and a band on the home page with
a lane map, a Start/Continue button and reading progress. All of it is drawn from one data object per
series, so a new series is mostly data plus pages. You don't need to write new UI code.

Write the study pages themselves with the `eli5` skill (house format: `../eli5-study.css`, dark theme,
Outfit + monospace labels). This skill covers how they join a series.

## How it fits together

| Piece | File | What it does |
|---|---|---|
| Series data | `series.js` (first series) / `series-<id>.js` (every later one) | Title, tagline, tracks, parts in reading order, optional bonus |
| Study strip and cards | `eli5-study.js` `renderSeries()` + `eli5-study.css` | Fills `<div class="series-strip" data-series="top|end">` slots in any page with `<body data-series-id="...">` |
| Series map (hub) | `explainers/<hub>.html` | Lane diagram + reading list for one series |
| Home page band | `series-ui.js` + `series-ui.css`, slot `#seriesBand` in `index.html` | One band per series, in load order |
| Catalogue rows | `published.js` (written by `scripts/publish-eli5.py`) | Parts are grouped under `subcategory` and sorted by `part` |
| Reading progress | `localStorage['eli5-series-read']` | Array of study ids read past 80%. Recorded by `eli5-study.js` on standalone pages and by `series-ui.js` from the Lab reader's `eli5-progress` messages (the reader iframe is sandboxed and can't use storage). |

Series registry: `window.ELI5_SERIES` is the first series (kept for backward compatibility). Every
later series pushes itself onto `window.ELI5_SERIES_LIST`. Shared code reads both. **Never turn
`series.js` into something else or rename its fields.** Other sessions publish parts by editing it.

## Data shape

```js
(window.ELI5_SERIES_LIST = window.ELI5_SERIES_LIST || []).push({
  id: 'how-money-works',                 // unique across series; used as data-series-key
  title: 'How money works, from scratch',
  tagline: 'One or two sentences for the home page band.',   // optional
  hub: 'how-money-works-from-scratch.html',                  // the series map, a file in explainers/
  feature: true,                         // optional; false keeps it off the home page
  tracks: {                              // 1 to 3 tracks, listed top lane first
    banks: { name: 'How banks work', short: 'Banks track', color: '#76d5c1' },
    state: { name: 'How the state works', short: 'State track', color: '#c3b8ff', lightColor: '#6c5bd0' }
  },
  parts: [                               // reading order; ids = file name without .html
    { id: 'where-money-comes-from-eli5', track: 'banks', title: '...', blurb: '...', file: 'where-money-comes-from-eli5.html' },
    { id: 'the-central-bank-eli5', track: 'state', title: '...', blurb: '...' }   // no file = coming soon
  ],
  bonus: { id: '...', title: '...', blurb: '...', file: '...' }   // optional, drawn as a gold diamond
});
```

Rules:
- A part with `file` is published. Leave `file` off until the page is live; the map shows it dashed.
- Part `id` must equal the explainer's file name without `.html`. That is also its id in `published.js`,
  which is how the home page reader opens it.
- With one track, labels drop the track name ("Part 2 of 6"). With 2 or 3 tracks they include `short`.
- Track colours come from the series colour key: teal `#76d5c1`, purple `#c3b8ff`, gold `#f5c76a`,
  orange `#ff8059`, rose `#ec6a94`. Light-theme versions are built in for these. For any other colour,
  set `lightColor`.
- Add new fields only. Never rename or remove existing ones; pages already published depend on them.

## Starting a new series

1. **Branch.** Work on your own branch (`claude/<series-id>`). Don't use another session's branch.
2. **Data file.** Create `series-<id>.js` at the repo root in the shape above. List every planned
   part, with no `file` yet.
3. **Load it.** Add `<script src="series-<id>.js?v=1"></script>` to `index.html` right after
   `series.js` and before `series-ui.js`. Bands appear in script order. In each study and the hub of
   the new series, load `../series.js` and then `../series-<id>.js` before `../eli5-study.js`.
4. **Hub page.** Copy `explainers/how-ai-works-from-scratch.html` to `explainers/<hub>.html`. Then:
   - Set `<body data-series-id="hub" data-series-key="<series id>">`. Without `data-series-key`,
     the strip falls back to the first series.
   - In its inline script, replace `const S=window.ELI5_SERIES` with
     `const S=window.ELI5_SERIES_LIST.find(s=>s.id==='<series id>')`.
   - Its lane map hard-codes `Y={llm:..,chip:..}` and the two track labels. Rebuild that for the new
     tracks. For one track, use one lane.
   - Rewrite the prose panels (the plan, how to read it, why the tracks connect) for the new topic.
     Keep the reading list `<ol id="reading">` and the `series-strip` slot.
5. **Each study page** (written with the `eli5` skill):
   - `<body data-series-id="<part id>">`
   - `<div class="series-strip" data-series="top" role="navigation" aria-label="Series"></div>`
     under the hero, and the same with `data-series="end"` after the last panel.
   - The scripts from step 3, at the end of `<body>`.
6. **Publish each page** (the hub first, as `--part 0`, then each part as `--part N`):
   ```
   python3 scripts/publish-eli5.py explainers/<slug>.html --title "..." --category "AI & Frontier" \
     --minutes N --summary "Part N: ..." --bullet "..." --bullet "..." --nodes A,B,C \
     --subcategory "<series title>" --card-svg card.svg --part N --dry-run
   ```
   - **Without `--dry-run` the script commits and pushes straight to `main`, which deploys.** Use
     `--dry-run` on a branch, and only drop it once the owner has said to go live.
   - `--subcategory` must be the series title, so the catalogue groups the parts together.
   - Link previews need Playwright with Chrome. In a cloud container, launch the preinstalled
     Chromium at `/opt/pw-browsers/chromium-*/chrome-linux64/chrome`.
   - Then set `file:` on that part in the series data file.
7. **Check** at 1440px and 375px wide, in dark and light themes (`◐` in the header): the home page
   band, the hub, and one study's top strip and end cards. Look for no script errors, no sideways page
   scroll, and correct "Part N of M" labels and previous/next links. Serve locally with
   `python3 -m http.server`. Playwright's `chromium.launch()` works without options.
8. **Before merging**, fetch and merge the latest `main`, re-check, then ask the owner before
   merging to `main`.

## Adding a part to an existing series

Write the study (step 5), publish it (step 6), and set `file:` on its entry in the series data file.
Nothing else changes: the home band, hub, strip and cards pick it up from the data. If the part is not
in the planned list yet, insert it at its reading position. Every later part's number shifts, so
update the `--part` numbers for the parts after it in `published.js` too.

## Changing the series UI

- Strip and cards: `renderSeries()` in `eli5-study.js` and the `SERIES NAVIGATION` block in `eli5-study.css`.
- Home band: `series-ui.js` / `series-ui.css`. It uses the site's own background and theme variables
  (`--bg`, `--fg`, `--muted`, `--line`), so it matches the page in both themes. Keep it that way.
- Don't rewrite the content of study pages when changing UI.
- Bump the `?v=` query on any changed CSS/JS in `index.html` so returning visitors get the new file.
