# Hand-off: Part 29, Banks

File: `explainers/analysing-banks-eli5.html` · Audit: `plans/handoff/analysing-banks-eli5.audit.json` · Card: `plans/handoff/analysing-banks-eli5.card.svg`

Before publishing: set `file: 'analysing-banks-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/analysing-banks-eli5.html \
  --title "Banks" --category "Monetary Architecture" --minutes 18 \
  --summary "Part 29: spreads, bad loans and capital, and why banks trade on book" \
  --bullet "Debt is a bank's raw material: judge NIM, CASA, bad loans and provision cover instead of D/E" \
  --bullet "Bad loans flow through provisions into profit, capital and book value; price banks on P/B against ROE" \
  --nodes "NIM,BAD LOANS,CAPITAL,P/B" \
  --subcategory "Fundamental analysis, from scratch" --part 29 \
  --card-svg plans/handoff/analysing-banks-eli5.card.svg
```
