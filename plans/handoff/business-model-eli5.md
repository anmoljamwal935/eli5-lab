# Hand-off: Part 16, Business model and unit economics

File: `explainers/business-model-eli5.html` · Audit: `plans/handoff/business-model-eli5.audit.json` · Card: `plans/handoff/business-model-eli5.card.svg`

Not published. Before publishing: set `file: 'business-model-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/business-model-eli5.html \
  --title "Business model and unit economics" --category "Monetary Architecture" --minutes 17 \
  --summary "Part 16: how a company really makes money, one cup at a time" \
  --bullet "Revenue is volume × price × mix, and one cup's contribution" \
  --bullet "A lab: price, milk, volume, fixed costs, mix and a lost customer" \
  --bullet "TCPL's segments, two classifications, and what drove each" \
  --nodes "ONE CUP,MIX,CUSTOMER" \
  --subcategory "Fundamental analysis, from scratch" --part 16 \
  --card-svg plans/handoff/business-model-eli5.card.svg
```

No dry run was done, so no shared files were touched. No share price is used in this part. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
