# Hand-off: Part 15, Reading ratios together

File: `explainers/ratios-together-eli5.html` · Audit: `plans/handoff/ratios-together-eli5.audit.json` · Card: `plans/handoff/ratios-together-eli5.card.svg`

Not published. Before publishing: set `file: 'ratios-together-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/ratios-together-eli5.html \
  --title "Reading ratios together" --category "Monetary Architecture" --minutes 16 \
  --summary "Part 15: peers, PEG, and a one-page dashboard where no ratio stands alone" \
  --bullet "Peer comparison and PEG: price against growth, and its limits" \
  --bullet "A traffic-light dashboard with thresholds you can move" \
  --bullet "TCPL's dashboard read as a story, with no verdict" \
  --nodes "PEERS,PEG,DASHBOARD" \
  --subcategory "Fundamental analysis, from scratch" --part 15 \
  --card-svg plans/handoff/ratios-together-eli5.card.svg
```

No dry run was done, so no shared files were touched. The NSE bhavcopy price (₹1,086.30, 6 Nov 2026) was taken from the brief, not re-fetched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
