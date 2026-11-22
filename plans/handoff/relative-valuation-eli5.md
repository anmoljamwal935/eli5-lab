# Hand-off: Part 26, Relative valuation and P/E bands

File: `explainers/relative-valuation-eli5.html` · Audit: `plans/handoff/relative-valuation-eli5.audit.json` · Card: `plans/handoff/relative-valuation-eli5.card.svg`

Before publishing: set `file: 'relative-valuation-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/relative-valuation-eli5.html \
  --title "Relative valuation and P/E bands" --category "Monetary Architecture" --minutes 15 \
  --summary "Part 26: peer multiples, P/E bands, and why re-ratings move prices" \
  --bullet "A P/E is a DCF in shorthand: compare only with peers that grow, earn and borrow alike" \
  --bullet "Price = EPS × P/E, so a re-rating can add or erase a year of earnings growth" \
  --nodes "PEERS,P/E BAND,RE-RATING" \
  --subcategory "Fundamental analysis, from scratch" --part 26 \
  --card-svg plans/handoff/relative-valuation-eli5.card.svg
```
