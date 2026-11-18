# Hand-off: Part 17, Industry structure and moats

File: `explainers/industry-and-moats-eli5.html` · Audit: `plans/handoff/industry-and-moats-eli5.audit.json` · Card: `plans/handoff/industry-and-moats-eli5.card.svg`

Not published. Before publishing: set `file: 'industry-and-moats-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/industry-and-moats-eli5.html \
  --title "Industry structure and moats" --category "Monetary Architecture" --minutes 24 \
  --summary "Part 17: five forces, moats, and how a rival erodes returns" \
  --bullet "Industry structure and Porter's five forces, in tea terms" \
  --bullet "Moats, how they show in ROCE and gross margin, how they erode" \
  --bullet "A rival arrives: ROCE with and without a moat" \
  --nodes "FORCES,MOAT,RIVAL" \
  --subcategory "Fundamental analysis, from scratch" --part 17 \
  --card-svg plans/handoff/industry-and-moats-eli5.card.svg
```

No dry run was done, so no shared files were touched. The NSE price (₹1,086.30) is not used on this page. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
