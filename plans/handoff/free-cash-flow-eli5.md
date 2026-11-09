# Hand-off: Part 13, Free cash flow and earnings quality

File: `explainers/free-cash-flow-eli5.html` · Audit: `plans/handoff/free-cash-flow-eli5.audit.json` · Card: `plans/handoff/free-cash-flow-eli5.card.svg`

Not published. Before publishing: set `file: 'free-cash-flow-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/free-cash-flow-eli5.html \
  --title "Free cash flow and earnings quality" --category "Monetary Architecture" --minutes 16 \
  --summary "Part 13: the cash left after capex, and why profit without cash is a warning" \
  --bullet "FCF = CFO minus capex; split maintenance from growth capex" \
  --bullet "CFO/PAT over several years tests earnings quality" \
  --bullet "TCPL's FCF, lease payments and where the cash went" \
  --nodes "CFO,CAPEX,FCF" \
  --subcategory "Fundamental analysis, from scratch" --part 13 \
  --card-svg plans/handoff/free-cash-flow-eli5.card.svg
```

No dry run was done, so no shared files were touched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
