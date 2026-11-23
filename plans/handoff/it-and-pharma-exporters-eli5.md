# Hand-off: Part 31, Exporters: IT services and pharma

File: `explainers/it-and-pharma-exporters-eli5.html` · Audit: `plans/handoff/it-and-pharma-exporters-eli5.audit.json` · Card: `plans/handoff/it-and-pharma-exporters-eli5.card.svg`

Before publishing: set `file: 'it-and-pharma-exporters-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/it-and-pharma-exporters-eli5.html \
  --title "Exporters: IT services and pharma" --category "Monetary Architecture" --minutes 18 \
  --summary "Part 31: constant currency, rupee swings, deal wins and FDA inspections" \
  --bullet "Judge an exporter on constant-currency growth; a weaker rupee lifts margins because rupee costs stay put" \
  --bullet "TCV is a multi-year pipeline, and one failed FDA inspection can switch off a plant's US sales" \
  --nodes "CONSTANT CURRENCY,RUPEE,MARGIN,TCV,USFDA" \
  --subcategory "Fundamental analysis, from scratch" --part 31 \
  --card-svg plans/handoff/it-and-pharma-exporters-eli5.card.svg
```
