# Hand-off: Part 25, Reverse DCF

File: `explainers/reverse-dcf-eli5.html` · Audit: `plans/handoff/reverse-dcf-eli5.audit.json` · Card: `plans/handoff/reverse-dcf-eli5.card.svg`

Before publishing: set `file: 'reverse-dcf-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/reverse-dcf-eli5.html \
  --title "Reverse DCF" --category "Monetary Architecture" --minutes 15 \
  --summary "Part 25: what growth today's price already assumes, solved and checked" \
  --bullet "Run the DCF backwards: find the growth that makes value equal the price" \
  --bullet "Then test it against the record, the market and the discount rate" \
  --nodes "PRICE,DCF,IMPLIED GROWTH" \
  --subcategory "Fundamental analysis, from scratch" --part 25 \
  --card-svg plans/handoff/reverse-dcf-eli5.card.svg
```
