# Hand-off: Part 5, Cash flow, and how the three connect

- Page: `explainers/cash-flow-and-the-three-statements-eli5.html` (Numbers track, 12 panels, 28 min)
- Audit: `plans/handoff/cash-flow-and-the-three-statements-eli5.audit.json`
- Card: `plans/handoff/cash-flow-and-the-three-statements-eli5.card.svg` (lints clean; `PART 5` in teal)
- Not published. Per the brief: set `file: 'cash-flow-and-the-three-statements-eli5.html'` on the part in
  `series-fundamental-analysis.js` in its own commit, then run (from the repo root):

```bash
python3.12 scripts/publish-eli5.py explainers/cash-flow-and-the-three-statements-eli5.html \
  --title "Cash flow, and how the three connect" --category "Monetary Architecture" --minutes 28 \
  --summary "Part 5: why profit is not cash, and how the three statements connect" \
  --bullet "Cash flow has three buckets: operations, investing, financing" \
  --bullet "Profit is not cash: depreciation, working capital, capex, loans, dividends" \
  --bullet "Every balance-sheet change is explained by the P&L or the cash flow" \
  --nodes "PROFIT,CASH,BALANCE SHEET" \
  --subcategory "Fundamental analysis, from scratch" --part 5 \
  --card-svg plans/handoff/cash-flow-and-the-three-statements-eli5.card.svg
```

The dry run was done and reverted (published.js, sitemap, feed, og images untouched).
After the real publish, re-run `check_explainer.py --audit` (the publisher adds a preview block to `<head>`, changing the file hash).
