# Hand-off: Part 4, The balance sheet

File: `explainers/the-balance-sheet-eli5.html` · Audit: `plans/handoff/the-balance-sheet-eli5.audit.json` · Card: `plans/handoff/the-balance-sheet-eli5.card.svg`

Not published. Before publishing: set `file: 'the-balance-sheet-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/the-balance-sheet-eli5.html \
  --title "The balance sheet" --category "Monetary Architecture" --minutes 12 \
  --summary "Part 4: what a company owns, owes and keeps, on one date" \
  --bullet "Assets always equal liabilities plus equity" \
  --bullet "Every event moves two things" \
  --bullet "Goodwill and cash show up in TCPL's real accounts" \
  --nodes "OWN,OWE,KEEP" \
  --subcategory "Fundamental analysis, from scratch" --part 4 \
  --card-svg plans/handoff/the-balance-sheet-eli5.card.svg
```

The publisher injects the link-preview block into the page; the committed page has none. A dry run was done and reverted (published.js, feed.xml, sitemap.xml, og images untouched).
After publishing, re-run `check_explainer.py --audit` to refresh the hash, and fill the audit's `publication` section.
