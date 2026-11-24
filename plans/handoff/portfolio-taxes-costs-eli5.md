# Hand-off: Part 38, Portfolio, taxes and costs

File: `explainers/portfolio-taxes-costs-eli5.html` · Audit: `plans/handoff/portfolio-taxes-costs-eli5.audit.json` · Card: `plans/handoff/portfolio-taxes-costs-eli5.card.svg`

Before publishing: set `file: 'portfolio-taxes-costs-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/portfolio-taxes-costs-eli5.html \
  --title "Portfolio, taxes and costs" --category "Monetary Architecture" --minutes 20 \
  --summary "Part 38: position sizing, when to sell, and what tax and costs take" \
  --bullet "Size each idea by its bear-case downside, and sell when value changes, not price" \
  --bullet "FY2026 rules: STT 0.1% each side, short-term gains 20%, long-term 12.5% above ₹1.25 lakh, dividends at your slab" \
  --nodes "SIZE,SELL,COSTS,TAX,KEEP" \
  --subcategory "Fundamental analysis, from scratch" --part 38 \
  --card-svg plans/handoff/portfolio-taxes-costs-eli5.card.svg
```
