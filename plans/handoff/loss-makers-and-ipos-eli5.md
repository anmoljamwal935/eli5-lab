# Hand-off: Part 35, Loss-making companies and IPOs

File: `explainers/loss-makers-and-ipos-eli5.html` · Audit: `plans/handoff/loss-makers-and-ipos-eli5.audit.json` · Card: `plans/handoff/loss-makers-and-ipos-eli5.card.svg`

Before publishing: set `file: 'loss-makers-and-ipos-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/loss-makers-and-ipos-eli5.html \
  --title "Loss-making companies and IPOs" --category "Monetary Architecture" --minutes 19 \
  --summary "Part 35: unit economics, cash burn and runway, and reading an IPO prospectus" \
  --bullet "When a company has no profit, check that each order makes money, then count the months of cash" \
  --bullet "In an IPO only the fresh issue reaches the company; the offer for sale pays the sellers" \
  --nodes "UNIT ECONOMICS,BURN,RUNWAY,RHP" \
  --subcategory "Fundamental analysis, from scratch" --part 35 \
  --card-svg plans/handoff/loss-makers-and-ipos-eli5.card.svg
```
