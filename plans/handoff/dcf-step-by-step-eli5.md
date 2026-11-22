# Hand-off: Part 24, DCF, step by step

File: `explainers/dcf-step-by-step-eli5.html` · Audit: `plans/handoff/dcf-step-by-step-eli5.audit.json` · Card: `plans/handoff/dcf-step-by-step-eli5.card.svg`

Before publishing: set `file: 'dcf-step-by-step-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/dcf-step-by-step-eli5.html \
  --title "DCF, step by step" --category "Monetary Architecture" --minutes 22 \
  --summary "Part 24: turning ten years of free cash into a value per share" \
  --bullet "Free cash is NOPAT minus the reinvestment growth needs: 54.75 × (1 − 12% ÷ 20%) starts the forecast, discounted at the 11.6% WACC" \
  --bullet "68% of Ramu’s ₹826.9 cr value is terminal value; ₹76.7 a share against ₹100 tests the assumptions, not the shares" \
  --nodes "FORECAST,DISCOUNT,TERMINAL,PER SHARE" \
  --subcategory "Fundamental analysis, from scratch" --part 24 \
  --card-svg plans/handoff/dcf-step-by-step-eli5.card.svg
```
