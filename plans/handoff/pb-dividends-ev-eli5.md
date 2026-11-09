# Hand-off: Part 14, The other price tags: P/B, dividends, EV/EBITDA

File: `explainers/pb-dividends-ev-eli5.html` · Audit: `plans/handoff/pb-dividends-ev-eli5.audit.json` · Card: `plans/handoff/pb-dividends-ev-eli5.card.svg`

Not published. Before publishing: set `file: 'pb-dividends-ev-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/pb-dividends-ev-eli5.html \
  --title "The other price tags: P/B, dividends, EV/EBITDA" --category "Monetary Architecture" --minutes 16 \
  --summary "Part 14: book value, dividends, and pricing the whole company with its debt" \
  --bullet "P/B, dividend yield, payout and sustainable growth (ROE x retention)" \
  --bullet "Enterprise value: market cap + debt - cash, and why EV/EBITDA compares debt fairly" \
  --bullet "TCPL's P/B, dividend history and EV, worked line by line" \
  --nodes "BOOK,DIVIDENDS,EV" \
  --subcategory "Fundamental analysis, from scratch" --part 14 \
  --card-svg plans/handoff/pb-dividends-ev-eli5.card.svg
```

No dry run was done, so no shared files were touched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.

Open points: the NSE bhavcopy for the ₹1,086.30 price could not be fetched in this session (price taken from the series brief); the exact ex-date vs record-date gap is not claimed on the page; TCPL's record date was omitted because only aggregator sites carried it.
