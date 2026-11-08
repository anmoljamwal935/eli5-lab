# Hand-off: Part 10, ROE, ROCE and DuPont

File: `explainers/roe-roce-dupont-eli5.html` · Audit: `plans/handoff/roe-roce-dupont-eli5.audit.json` · Card: `plans/handoff/roe-roce-dupont-eli5.card.svg`

Not published. Before publishing: set `file: 'roe-roce-dupont-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/roe-roce-dupont-eli5.html \
  --title "ROE, ROCE and DuPont" --category "Monetary Architecture" --minutes 15 \
  --summary "Part 10: return on owners' money, on all capital, and three ways to 20%" \
  --bullet "ROE and ROCE divide profit by the money that earned it" \
  --bullet "DuPont: margin x turnover x leverage, same ROE three ways" \
  --bullet "TCPL's ROCE with and without goodwill and intangibles" \
  --nodes "MARGIN,TURNOVER,LEVERAGE" \
  --subcategory "Fundamental analysis, from scratch" --part 10 \
  --card-svg plans/handoff/roe-roce-dupont-eli5.card.svg
```

No dry run was done, so no shared files were touched; the card was linted and rendered standalone. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.
