# Series mechanics

Read this in Series mode only (see "What to make" in `SKILL.md`). It explains how a series is wired into
the site. The editorial rules (plan first, colour key, scope, hand-offs, publishing flags) are in
`SKILL.md` → Series mode.

## How the pieces fit together

| Piece | File | What it does |
|---|---|---|
| Series data | `series.js` (first series) / `series-<id>.js` (every later one) | Title, tagline, tracks, parts in reading order, optional bonus |
| Strip and end cards in each part | `renderSeries()` in `eli5-study.js` + the `SERIES NAVIGATION` block in `eli5-study.css` | Fills `<div class="series-strip" data-series="top\|end">` on any page with `<body data-series-id="...">` |
| Series map page | `explainers/<series-slug>.html` | Lane diagram and reading list for one series (`data-series-id="hub"`) |
| Home page band | `series-ui.js` + `series-ui.css`, slot `#seriesBand` in `index.html` | One band per series, in script order: lane map, Start/Continue button, link to the map |
| Catalogue rows | `published.js` (written by `scripts/publish-eli5.py`) | Parts sit under `subcategory` = series title, sorted by `part` (map page = 0) |
| Reading progress | `localStorage['eli5-series-read']` | Ids read past 80%. Recorded by `eli5-study.js` on standalone pages, and by `series-ui.js` from the reader's `eli5-progress` messages (the reader iframe is sandboxed and has no storage) |
| Reader | `app.js` | Series links inside the reader send `postMessage({type:'eli5-open', id})`, so the Lab opens the next part in place |

**Registry.** `window.ELI5_SERIES` is the first series, kept for backward compatibility. Every later
series pushes itself onto `window.ELI5_SERIES_LIST`. The shared code reads both. Never restructure
`series.js` or rename its fields: other sessions publish parts by setting `file:` in it.

## Data shape

```js
(window.ELI5_SERIES_LIST = window.ELI5_SERIES_LIST || []).push({
  id: 'money-basics',                    // unique across series; also the map page's data-series-key
  title: 'How money works, from scratch',  // = --subcategory for every part
  tagline: 'One or two sentences for the home page band.',   // optional
  hub: 'money-basics.html',              // the series map page, a file in explainers/
  feature: true,                         // optional; false keeps it off the home page
  tracks: {                              // 1 to 3 tracks, listed top lane first
    banks: { name: 'How banks work', short: 'Banks track', color: '#76d5c1' },
    state: { name: 'How the state works', short: 'State track', color: '#c3b8ff', lightColor: '#6c5bd0' }
  },
  parts: [                               // reading order; id = file name without .html
    { id: 'where-money-comes-from-eli5', track: 'banks', title: '…', blurb: '…', file: 'where-money-comes-from-eli5.html' },
    { id: 'the-central-bank-eli5', track: 'state', title: '…', blurb: '…' }   // no file = coming soon
  ],
  bonus: { id: '…', title: '…', blurb: '…', file: '…' }   // optional; drawn as a gold diamond
});
```

- A part with `file` is published. Set `file` only in the commit that publishes the page. The map shows parts without one as dashed "coming soon" dots.
- A part's `id` must equal its file name without `.html`. That is also its `published.js` id, which is how the home page reader opens it, and its `data-series-id`.
- With one track, labels drop the track name ("Part 2 of 6"). With 2 or 3 tracks they add `short`.
- Track colours come from the house palette. The home band has built-in light-theme versions for `#76d5c1`, `#c3b8ff`, `#f5c76a`, `#ff8059` and `#ec6a94`. Set `lightColor` for any other colour.
- Add fields only. Never rename or remove one, because published pages depend on them.

## Wiring a new series (once per series)

1. Create `series-<id>.js` at the site root in the shape above, with every planned part and no `file` yet.
2. In `index.html`, add `<script src="series-<id>.js?v=1"></script>` after `series.js` and before `series-ui.js`. Bands appear in script order. This is a site change: commit it on its own, separately from any explainer.
3. **Series map page.** Copy `explainers/how-ai-works-from-scratch.html` to `explainers/<series-slug>.html` (no `-eli5` suffix; the checker expects that for map pages). Then:
   - Set `<body data-series-id="hub" data-series-key="<series id>">`. Without `data-series-key`, the strip falls back to the first series.
   - Load `../series.js`, then `../series-<id>.js`, then `../eli5-study.js`.
   - In its inline script, replace `const S=window.ELI5_SERIES` with `const S=window.ELI5_SERIES_LIST.find(s=>s.id==='<series id>')`.
   - The lane map hard-codes `Y={llm:..,chip:..}` and two track labels. Rebuild that for the new tracks (one lane for one track).
   - Rewrite the prose panels for the new topic: the plan, the colour key, and why the tracks connect. Keep the top `series-strip` slot, the reading list `<ol id="reading">` and the takeaway card.
   - Lint it with `check_explainer.py`, which applies map-page rules. Run `check_render.py` and look at the screenshots as for any page. Publish it with `--part 0` and a summary that describes the whole series.

## Checking series wiring

Beyond Step 7, serve the site (`python3 -m http.server 8765` from `SITE`) and check at 1440px and 390px, in dark and light themes (the `◐` button on the home page):
- **Home page:** the band shows the right count ("N of M parts out"), the new part's dot is lit, and the Start/Continue button opens the right part in the reader.
- **The part:** the top strip reads "Part N of M · <track>", and the end cards link the real previous and next parts. Unpublished ones show "Coming soon".
- **The previous part:** its "Next →" card now links to the new part.
- **The map page:** the new part is lit in the lane diagram and links from the reading list.
- **The whole site:** no script errors in the console and no sideways page scroll.

## Changing the series UI

- Strip and cards: `renderSeries()` in `eli5-study.js`, and `SERIES NAVIGATION` in `eli5-study.css`.
- Home band: `series-ui.js` / `series-ui.css`. It uses the site's own `--bg`, `--fg`, `--muted` and `--line`, so it matches the page in both themes. Keep it that way.
- UI work goes on its own branch and needs the owner's approval before merging to `main`. Don't change the content of study pages while doing it.
- Bump the `?v=` query on any changed CSS/JS that `index.html` loads, so returning visitors get the new file.
