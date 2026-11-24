# Hand-off: Part 37, One company, start to finish

File: `explainers/one-company-start-to-finish-eli5.html` · Audit: `plans/handoff/one-company-start-to-finish-eli5.audit.json` · Card: `plans/handoff/one-company-start-to-finish-eli5.card.svg`

Before publishing: set `file: 'one-company-start-to-finish-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/one-company-start-to-finish-eli5.html \
  --title "One company, start to finish" --category "Monetary Architecture" --minutes 26 \
  --summary "Part 37: one real company, Tata Consumer, through every test, ending in a thesis" \
  --bullet "Run the series' tests in order on TCPL's FY2026 filings, from business and moat to cash, governance and the price" \
  --bullet "A 22-item checklist lab writes a one-page thesis as you mark it; a worked example, not a recommendation" \
  --nodes "BUSINESS,ACCOUNTS,RATIOS,QUALITY,PEOPLE,PRICE" \
  --subcategory "Fundamental analysis, from scratch" --part 37 \
  --card-svg plans/handoff/one-company-start-to-finish-eli5.card.svg
```
