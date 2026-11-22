# Hand-off: Part 27, Conglomerates and special cases

File: `explainers/sum-of-the-parts-eli5.html` · Audit: `plans/handoff/sum-of-the-parts-eli5.audit.json` · Card: `plans/handoff/sum-of-the-parts-eli5.card.svg`

Before publishing: set `file: 'sum-of-the-parts-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/sum-of-the-parts-eli5.html \
  --title "Conglomerates and special cases" --category "Monetary Architecture" --minutes 18 \
  --summary "Part 27: sum of the parts, holding-company discounts, dividend models and NAV" \
  --bullet "Value a group business by business, then take net debt off once: Ramu's parts give ₹101 a share" \
  --bullet "Holding companies trade below their holdings (Bajaj Holdings 55% below NAV); dividend models break when growth reaches the discount rate" \
  --nodes "SEGMENTS,MULTIPLES,EV,NET DEBT,PER SHARE" \
  --subcategory "Fundamental analysis, from scratch" --part 27 \
  --card-svg plans/handoff/sum-of-the-parts-eli5.card.svg
```
