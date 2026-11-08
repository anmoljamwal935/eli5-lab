# Hand-off: Part 7, P/E: what it says and when it lies

- Page: `explainers/pe-ratio-eli5.html` (Value track, 13 panels, 24 min)
- Audit: `plans/handoff/pe-ratio-eli5.audit.json`
- Card: `plans/handoff/pe-ratio-eli5.card.svg` (lints clean; `PART 7` in gold)
- Not published. Set `file: 'pe-ratio-eli5.html'` on the part in `series-fundamental-analysis.js` in its own commit, then run from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/pe-ratio-eli5.html \
  --title "P/E: what it says and when it lies" --category "Monetary Architecture" --minutes 24 \
  --summary "Part 7: P/E and EPS you can drive, and five ways P/E misleads" \
  --bullet "EPS is profit per share; P/E is price in years of EPS" \
  --bullet "Trailing and forward P/E differ by which profit you use" \
  --bullet "One-offs, cyclical peaks, losses, growth and debt all fool P/E" \
  --nodes "PROFIT,PRICE,P/E" \
  --subcategory "Fundamental analysis, from scratch" --part 7 \
  --card-svg plans/handoff/pe-ratio-eli5.card.svg
```

Dry run done and reverted (published.js, sitemap, feed, og images, link-preview block).
After the real publish, re-run `check_explainer.py --audit` (the preview block changes the file hash).

Open items: no dated NSE/BSE closing price is quoted (could not verify one); the TCPL box takes a reader-typed price. Page links Parts 1 and 3 only; Parts 6, 8+ are named in text, not linked, because they are not live yet.
