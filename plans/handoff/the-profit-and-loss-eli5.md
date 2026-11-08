# Hand-off: Part 3, The P&L, line by line

Page: `explainers/the-profit-and-loss-eli5.html` · audit: `plans/handoff/the-profit-and-loss-eli5.audit.json` · card: `plans/handoff/the-profit-and-loss-eli5.card.svg`

Not published. Before publishing: set `file: 'the-profit-and-loss-eli5.html'` on Part 3 in `series-fundamental-analysis.js` in its own commit (the series map page, Part 0, must exist first).

## Publisher command (run from the repo root)

```bash
python3.12 scripts/publish-eli5.py explainers/the-profit-and-loss-eli5.html \
  --title "The P&L, line by line" --category "Monetary Architecture" --minutes 15 \
  --summary "Part 3: from sales to profit, and the lines that hide surprises" \
  --bullet "Revenue to profit after tax, one line at a time" \
  --bullet "Other income and exceptional items hide surprises" \
  --bullet "Drive Ramu Chai's P&L, then find it in TCPL's report" \
  --nodes "SALES,COSTS,PROFIT" \
  --subcategory "Fundamental analysis, from scratch" --part 3 \
  --card-svg plans/handoff/the-profit-and-loss-eli5.card.svg
```

A dry run of this command was done and reverted (published.js, sitemap, feed, og images, and the link-preview block in the page were all restored); the publisher adds the preview block itself.

## Card

```svg
<svg viewBox="0 0 320 155" role="img" aria-label="A staircase of bars from 500 of sales down through costs, interest and tax to 50 of profit"><path d="M24 35V135" stroke="#57534f" fill="none"/><g font-family="monospace" font-size="9"><text x="24" y="28" fill="#76d5c1">PART 3</text><text x="296" y="28" text-anchor="end" fill="#a5a29c">SALES TO PROFIT</text></g><rect x="24.0" y="38.0" width="272.0" height="7" fill="#76d5c1"/><rect x="160.0" y="48.5" width="136.0" height="7" fill="#ff8059"/><rect x="127.4" y="59.0" width="32.6" height="7" fill="#ff8059"/><rect x="70.2" y="69.5" width="57.1" height="7" fill="#ff8059"/><rect x="24.0" y="80.0" width="46.2" height="7" fill="#f5c76a"/><rect x="63.7" y="90.5" width="6.5" height="7" fill="#ff8059"/><rect x="60.4" y="101.0" width="5.4" height="7" fill="#ec6a94"/><rect x="51.2" y="111.5" width="9.2" height="7" fill="#ff8059"/><rect x="24.0" y="122.0" width="27.2" height="7" fill="#f5c76a"/></svg>
```

## Things the owner should know

- The lab has four sliders (cups, price per cup, material cost per cup, other expenses) and the interest rate is a -/+ stepper, because `check_explainer.py` rejects more than four range inputs. Making it a fifth slider needs that limit relaxed.
- Ramu's canonical revenue 500 is shown as 100 crore cups at Rs 5 with materials Rs 2.50 a cup. The plan does not fix cups and price, so Part 16 ("Economics of one cup") should reuse these.
- The panel on exceptional items uses a hypothetical Rs 12 crore land gain (labelled example). Ramu's canonical FY26 has no exceptional line and is unchanged.
- Open: the claim that Ind AS has no "extraordinary" line and "exceptional" is loosely defined rests on secondary commentary; Schedule III and Ind AS 1 text could not be opened (MCA returned 403).
