# Hand-off: Part 12, Working capital and the cash cycle

File: `explainers/working-capital-cycle-eli5.html` · Audit: `plans/handoff/working-capital-cycle-eli5.audit.json` · Card: `plans/handoff/working-capital-cycle-eli5.card.svg`

Not published. Before publishing: set `file: 'working-capital-cycle-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/working-capital-cycle-eli5.html \
  --title "Working capital and the cash cycle" --category "Monetary Architecture" --minutes 16 \
  --summary "Part 12: inventory, customers and suppliers: how long a rupee stays stuck" \
  --bullet "Inventory, receivable and payable days make the cash conversion cycle" \
  --bullet "Growth needs more working capital, so profit can outrun cash" \
  --bullet "TCPL's 10-day cycle against Tata Steel's 56" \
  --nodes "STOCK,CUSTOMERS,SUPPLIER" \
  --subcategory "Fundamental analysis, from scratch" --part 12 \
  --card-svg plans/handoff/working-capital-cycle-eli5.card.svg
```

No dry run was done, so no shared files were touched; the card was linted only. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.

Note: the brief called TCPL's figure "net working capital 21 days (India business)". The AGM slide 10 shows 21 days as the group figure and "India business NWC at -2 day" separately; the page follows the slide.
