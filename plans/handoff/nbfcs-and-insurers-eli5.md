# Hand-off: Part 30, NBFCs and insurers

File: `explainers/nbfcs-and-insurers-eli5.html` · Audit: `plans/handoff/nbfcs-and-insurers-eli5.audit.json` · Card: `plans/handoff/nbfcs-and-insurers-eli5.card.svg`

Before publishing: set `file: 'nbfcs-and-insurers-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/nbfcs-and-insurers-eli5.html \
  --title "NBFCs and insurers" --category "Monetary Architecture" --minutes 18 \
  --summary "Part 30: what lenders' money costs, when it falls due, and insurers' yardsticks" \
  --bullet "A lender earns a spread over its cost of funds and fails when short borrowing falls due before its loans repay" \
  --bullet "Life insurers are read through VNB and embedded value, general insurers through the combined ratio and float" \
  --nodes "COST OF FUNDS,MATURITY LADDER,VNB AND EV" \
  --subcategory "Fundamental analysis, from scratch" --part 30 \
  --card-svg plans/handoff/nbfcs-and-insurers-eli5.card.svg
```
