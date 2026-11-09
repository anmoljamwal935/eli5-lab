# Hand-off: Part 11, Debt: how much is too much

File: `explainers/how-much-debt-eli5.html` · Audit: `plans/handoff/how-much-debt-eli5.audit.json` · Card: `plans/handoff/how-much-debt-eli5.card.svg`

Not published. Before publishing: set `file: 'how-much-debt-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/how-much-debt-eli5.html \
  --title "Debt: how much is too much" --category "Monetary Architecture" --minutes 20 \
  --summary "Part 11: leverage, interest cover, and what a rate hike does to a borrower" \
  --bullet "Debt is cheap and lifts ROE, but interest is due in bad years too" \
  --bullet "D/E, net debt/EBITDA and interest cover, with where cover breaks" \
  --bullet "TCPL (net cash) against Tata Steel (net debt 2.2x EBITDA)" \
  --nodes "BORROW,COVER,RATE HIKE" \
  --subcategory "Fundamental analysis, from scratch" --part 11 \
  --card-svg plans/handoff/how-much-debt-eli5.card.svg
```

No dry run was done, so no shared files were touched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
