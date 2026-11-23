# Hand-off: Part 32, Consumer companies

File: `explainers/consumer-companies-eli5.html` · Audit: `plans/handoff/consumer-companies-eli5.audit.json` · Card: `plans/handoff/consumer-companies-eli5.card.svg`

Before publishing: set `file: 'consumer-companies-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/consumer-companies-eli5.html \
  --title "Consumer companies" --category "Monetary Architecture" --minutes 20 \
  --summary "Part 32: split consumer growth into volume, price and mix, and stores" \
  --bullet "Split sales growth into volume, price and mix; price can hide in grams and promotions" \
  --bullet "Retail growth is old stores plus new ones; high consumer P/Es assume long, steady growth" \
  --nodes "VOLUME,PRICE,MIX,P/E" \
  --subcategory "Fundamental analysis, from scratch" --part 32 \
  --card-svg plans/handoff/consumer-companies-eli5.card.svg
```
