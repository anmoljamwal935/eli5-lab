# Hand-off: Part 36, Screening for ideas

File: `explainers/screening-for-ideas-eli5.html` · Audit: `plans/handoff/screening-for-ideas-eli5.audit.json` · Card: `plans/handoff/screening-for-ideas-eli5.card.svg`

Before publishing: set `file: 'screening-for-ideas-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/screening-for-ideas-eli5.html \
  --title "Screening for ideas" --category "Monetary Architecture" --minutes 17 \
  --summary "Part 36: filters that find candidates, the traps they pass, and survivorship bias" \
  --bullet "A screen is a few lines on ratios; it shortens the list but cannot see why something is cheap" \
  --bullet "Cyclicals at the peak, falling businesses and shaky governance pass screens; backtests that forget dead companies flatter them" \
  --nodes "FILTERS,FUNNEL,TRAPS,SURVIVORS" \
  --subcategory "Fundamental analysis, from scratch" --part 36 \
  --card-svg plans/handoff/screening-for-ideas-eli5.card.svg
```
