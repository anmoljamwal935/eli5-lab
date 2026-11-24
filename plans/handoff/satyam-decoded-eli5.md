# Hand-off: Bonus, Satyam, decoded

File: `explainers/satyam-decoded-eli5.html` · Audit: `plans/handoff/satyam-decoded-eli5.audit.json` · Card: `plans/handoff/satyam-decoded-eli5.card.svg`

Before publishing: set `file: 'satyam-decoded-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/satyam-decoded-eli5.html \
  --title "Satyam, decoded" --category "Monetary Architecture" --minutes 32 \
  --summary "Bonus: the 2009 fraud read through Part 20's red flags" \
  --bullet "Fake profits came with fake cash, so most ratio checks passed" \
  --bullet "Interest never received, a founders' deal and pledges gave it away" \
  --nodes "FAKE INVOICES,FAKE CASH,UNPAID INTEREST" \
  --subcategory "Fundamental analysis, from scratch" \
  --card-svg plans/handoff/satyam-decoded-eli5.card.svg
```
