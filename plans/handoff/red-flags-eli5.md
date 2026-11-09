# Hand-off: Part 20, Red flags and forensic checks

File: `explainers/red-flags-eli5.html` · Audit: `plans/handoff/red-flags-eli5.audit.json` · Card: `plans/handoff/red-flags-eli5.card.svg`

Not published. Before publishing: set `file: 'red-flags-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/red-flags-eli5.html \
  --title "Red flags and forensic checks" --category "Monetary Architecture" --minutes 28 \
  --summary "Part 20: the patterns in the accounts that come before a blow-up" \
  --bullet "A flag is a question, not a verdict" \
  --bullet "Spot six planted flags in a fudged twin of Ramu Chai" \
  --bullet "Run the checklist on TCPL FY26 and see what to ask" \
  --nodes "PROFIT,CASH,FLAG" \
  --subcategory "Fundamental analysis, from scratch" --part 20 \
  --card-svg plans/handoff/red-flags-eli5.card.svg
```

No dry run was done, so no shared files were touched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
