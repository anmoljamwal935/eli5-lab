# Hand-off: Part 21, Corporate actions and dilution

File: `explainers/corporate-actions-eli5.html` · Audit: `plans/handoff/corporate-actions-eli5.audit.json` · Card: `plans/handoff/corporate-actions-eli5.card.svg`

Before publishing: set `file: 'corporate-actions-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/corporate-actions-eli5.html \
  --title "Corporate actions and dilution" --category "Monetary Architecture" --minutes 22 \
  --summary "Part 21: bonus, split, buyback, rights, QIP and ESOPs, and what each does to you" \
  --bullet "A bonus, split or demerger re-slices the same company; your stake is unchanged" \
  --bullet "Rights, QIPs, options and buybacks change your slice; the price paid against value decides who gains" \
  --nodes "RE-SLICE,ADD SHARES,REMOVE SHARES" \
  --subcategory "Fundamental analysis, from scratch" --part 21 \
  --card-svg plans/handoff/corporate-actions-eli5.card.svg
```
