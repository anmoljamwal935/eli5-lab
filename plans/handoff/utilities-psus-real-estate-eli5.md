# Hand-off: Part 34, Utilities, PSUs and real estate

File: `explainers/utilities-psus-real-estate-eli5.html` · Audit: `plans/handoff/utilities-psus-real-estate-eli5.audit.json` · Card: `plans/handoff/utilities-psus-real-estate-eli5.card.svg`

Before publishing: set `file: 'utilities-psus-real-estate-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/utilities-psus-real-estate-eli5.html \
  --title "Utilities, PSUs and real estate" --category "Monetary Architecture" --minutes 22 \
  --summary "Part 34: regulated returns, government owners, and cash before revenue" \
  --bullet "A regulated utility earns a set return on approved equity, so profit tracks equity, not sales" \
  --bullet "Developers collect years before revenue: read bookings, collections, customer advances and net debt" \
  --nodes "REGULATED EQUITY,PSU DIVIDEND,PRE-SALES" \
  --subcategory "Fundamental analysis, from scratch" --part 34 \
  --card-svg plans/handoff/utilities-psus-real-estate-eli5.card.svg
```
