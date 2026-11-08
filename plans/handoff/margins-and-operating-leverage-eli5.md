# Hand-off: Part 8, Margins and operating leverage

Page: `explainers/margins-and-operating-leverage-eli5.html` · audit: `plans/handoff/margins-and-operating-leverage-eli5.audit.json` · card: `plans/handoff/margins-and-operating-leverage-eli5.card.svg`

Not published. Before publishing: set `file: 'margins-and-operating-leverage-eli5.html'` on Part 8 in `series-fundamental-analysis.js` in its own commit (the map page, Part 0, must exist first).

## Publisher command (run from the repo root)

```bash
python3.12 scripts/publish-eli5.py explainers/margins-and-operating-leverage-eli5.html \
  --title "Margins and operating leverage" --category "Monetary Architecture" --minutes 16 \
  --summary "Part 8: why a 10% rise in sales can mean a 31% rise in profit" \
  --bullet "Gross, EBITDA, EBIT and net margin: paise kept per rupee" \
  --bullet "Fixed costs make profit swing more than sales, both ways" \
  --bullet "Pull Ramu's lever, then read TCPL's margins" \
  --nodes "SALES,COSTS,PROFIT" \
  --subcategory "Fundamental analysis, from scratch" --part 8 \
  --card-svg plans/handoff/margins-and-operating-leverage-eli5.card.svg
```

A dry run of this command was done and reverted (published.js, sitemap, feed, og images and the page's link-preview block restored).

## Things the owner should know

- Lab has four sliders (cups, price, fixed cash costs, variable cost per cup) and exactly four presets (Base, Sales +10%, Sales -10%, Low fixed costs), the limits `check_explainer.py` allows. A "price +10%" case is a go-deeper note, not a preset.
- The slider moves materials; freight stays at Rs 0.25/cup, so gross margin (sales minus materials) is 50% at the default. Stated on the page.
- The "low-fixed tea trader" (fixed 40 + depreciation 12, variable Rs 3.75) is a one-off example, tagged `example`; Ramu's accounts are unchanged.
- The second lab chart (#labSwing, % change) is a separate SVG because `check_render.py` assumes one axis in #labChart. I tested it myself at all 24 cases (ticks, bars, geometry).
- TCPL EBITDA gap (13.8% vs 13.9%): TCPL prints no definition or bridge. The page shows our reconciliation: statement-derived EBITDA + other income counted in segment results (Note 38, p.477) = management's figure in both years, flagged as arithmetic, not TCPL's statement. The report gives no consolidated gross-margin bridge, and the page says so.
