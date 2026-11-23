# Hand-off: Part 33, Cyclicals

File: `explainers/cyclicals-eli5.html` · Audit: `plans/handoff/cyclicals-eli5.audit.json` · Card: `plans/handoff/cyclicals-eli5.card.svg`

Before publishing: set `file: 'cyclicals-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/cyclicals-eli5.html \
  --title "Cyclicals" --category "Monetary Architecture" --minutes 19 \
  --summary "Part 33: cement, steel and autos, where a high P/E can be the bargain" \
  --bullet "Judge a cyclical per tonne and over a whole cycle: mid-cycle earnings, EV per tonne of capacity" \
  --bullet "The P/E paradox: the lowest P/E comes at the peak, the highest near the bottom (Tata Steel 3.93 in FY22, 56.29 in FY25)" \
  --nodes "CAPACITY,PER TONNE,MID-CYCLE EPS,P/E PARADOX" \
  --subcategory "Fundamental analysis, from scratch" --part 33 \
  --card-svg plans/handoff/cyclicals-eli5.card.svg
```
