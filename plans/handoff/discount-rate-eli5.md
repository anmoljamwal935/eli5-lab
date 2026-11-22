# Hand-off: Part 23, Discounting and the discount rate

File: `explainers/discount-rate-eli5.html` · Audit: `plans/handoff/discount-rate-eli5.audit.json` · Card: `plans/handoff/discount-rate-eli5.card.svg`

Before publishing: set `file: 'discount-rate-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/discount-rate-eli5.html \
  --title "Discounting and the discount rate" --category "Monetary Architecture" --minutes 15 \
  --summary "Part 23: why money later is worth less, and how much less" \
  --bullet "Present value runs compounding backwards: ₹100 in ten years at 12% is ₹32.20 today" \
  --bullet "Ramu's rate: 7% G-sec + 1.0 × 5% ERP = 12% equity, blended with 7.5% debt into an 11.6% WACC" \
  --nodes "G-SEC,ERP,BETA,WACC" \
  --subcategory "Fundamental analysis, from scratch" --part 23 \
  --card-svg plans/handoff/discount-rate-eli5.card.svg
```
