# Handoff: Part 1, Fundamental analysis in one page

- Page: `explainers/fundamental-analysis-in-one-page-eli5.html` (sha256 `3cc474dc…0279` before the publisher's link-preview block)
- Audit: `plans/handoff/fundamental-analysis-in-one-page-eli5.audit.json`
- Card: `plans/handoff/fundamental-analysis-in-one-page-eli5.card.svg` (lint clean, rendered on the home page)
- Not done on purpose: `file:` not set in `series-fundamental-analysis.js`, nothing published, `published.js` untouched.

Publisher command (run after setting `file: 'fundamental-analysis-in-one-page-eli5.html'` on Part 1 in the series data and committing that on its own, after Part 0 exists):

```bash
python3.12 scripts/publish-eli5.py explainers/fundamental-analysis-in-one-page-eli5.html \
  --title "Fundamental analysis in one page" --category "Monetary Architecture" --minutes 8 \
  --summary "Part 1: price is a mood, value follows profit" \
  --bullet "A share is a slice of a business; market cap is price times shares" \
  --bullet "Price is noisy day to day; value follows profits over years" \
  --bullet "Fundamental vs technical analysis, and a map of the whole series" \
  --nodes "SHARE,PRICE,VALUE" \
  --subcategory "Fundamental analysis, from scratch" --part 1 \
  --card-svg plans/handoff/fundamental-analysis-in-one-page-eli5.card.svg
```

After publishing, re-run `check_explainer.py --audit` for the new hash (the publisher inserts a head block), and check live: strip "Part 1 of 38", Part 2 end card, lab, card first on home.
