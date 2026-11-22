# Hand-off: Part 28, Margin of safety and scenarios

File: `explainers/margin-of-safety-eli5.html` · Audit: `plans/handoff/margin-of-safety-eli5.audit.json` · Card: `plans/handoff/margin-of-safety-eli5.card.svg`

Before publishing: set `file: 'margin-of-safety-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/margin-of-safety-eli5.html \
  --title "Margin of safety and scenarios" --category "Monetary Architecture" --minutes 17 \
  --summary "Part 28: value is a range; weight bull, base, bear, then buy well below" \
  --bullet "Grids and bull, base and bear stories turn one DCF value into a range; weighted, Ramu is worth ₹74.3" \
  --bullet "A 30% margin of safety means paying at most ₹52.0, which protects you from your own errors" \
  --nodes "GRID,SCENARIOS,WEIGHTED,MARGIN" \
  --subcategory "Fundamental analysis, from scratch" --part 28 \
  --card-svg plans/handoff/margin-of-safety-eli5.card.svg
```
