# Hand-off: Part 6, Accounting choices that change profit

- Page: `explainers/accounting-choices-eli5.html` (Numbers track, 12 panels, 30 min)
- Audit: `plans/handoff/accounting-choices-eli5.audit.json`
- Card: `plans/handoff/accounting-choices-eli5.card.svg` (lints clean; `PART 6` in teal; one tall block vs five short blocks)
- Not published. Per the brief: set `file: 'accounting-choices-eli5.html'` on the part in
  `series-fundamental-analysis.js` in its own commit, then run (from the repo root):

```bash
python3.12 scripts/publish-eli5.py explainers/accounting-choices-eli5.html \
  --title "Accounting choices that change profit" --category "Monetary Architecture" --minutes 30 \
  --summary "Part 6: how accounting choices move profit while cash stays put" \
  --bullet "Capitalise or expense: which year carries a cost" \
  --bullet "Depreciation life and method move profit, not cash" \
  --bullet "Goodwill is tested, brands are amortised; adjusted EPS adds back" \
  --nodes "SPEND,PROFIT,CASH" \
  --subcategory "Fundamental analysis, from scratch" --part 6 \
  --card-svg plans/handoff/accounting-choices-eli5.card.svg
```

- The dry run was done and reverted (published.js, sitemap, feed, og images, the page's link-preview block).
- After the real publish, re-run `check_explainer.py --audit` (the preview block changes the file hash).
- Open points: the ₹169 cr after-tax amortisation add-back is derived (1.71 × 98.95 cr shares); TCPL prints only the per-share figure
  and the AGM footnote. Schedule II was read from the ca2013.com reproduction, not the MCA original. The Ramu lab spend (₹20 cr) is a
  labelled one-off on top of canonical FY26; the page says so.
