# Hand-off: Part 22, The economy around the company

File: `explainers/the-economy-around-the-company-eli5.html` · Audit: `plans/handoff/the-economy-around-the-company-eli5.audit.json` · Card: `plans/handoff/the-economy-around-the-company-eli5.card.svg`

Before publishing: set `file: 'the-economy-around-the-company-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/the-economy-around-the-company-eli5.html \
  --title "The economy around the company" --category "Monetary Architecture" --minutes 18 \
  --summary "Part 22: tea prices, the monsoon, rates and the rupee in a company's accounts" \
  --bullet "A 20% tea rise is 3.6% of a cup's price but takes a fifth of Ramu's EBITDA unless it can be passed on" \
  --bullet "Rates, the rupee and demand swings reach profit differently; constant-currency growth strips out the rupee" \
  --nodes "TEA,MONSOON,RATES,RUPEE" \
  --subcategory "Fundamental analysis, from scratch" --part 22 \
  --card-svg plans/handoff/the-economy-around-the-company-eli5.card.svg
```
