# Hand-off: Part 2, Where the numbers live

Not published. Page: `explainers/where-the-numbers-live-eli5.html`. Audit: `plans/handoff/where-the-numbers-live-eli5.audit.json`.

Before publishing: set `file: 'where-the-numbers-live-eli5.html'` on the part in `series-fundamental-analysis.js` in its own commit, save the card below as `card.svg`, then run (the publisher adds the link-preview block and rewrites published.js, feed, sitemap and OG images):

```bash
python3.12 scripts/publish-eli5.py explainers/where-the-numbers-live-eli5.html \
  --title "Where the numbers live" --category "Monetary Architecture" --minutes 26 \
  --summary "Part 2: where a company's numbers live, and how to read a quarter" \
  --bullet "Annual report sections, exchange filings, standalone vs consolidated" \
  --bullet "YoY, QoQ and TTM, and why QoQ misleads a seasonal business" \
  --nodes "REPORT,FILINGS,QUARTERS" \
  --subcategory "Fundamental analysis, from scratch" --part 2 \
  --card-svg card.svg
```

After the publisher's head block is added, re-run `check_explainer.py --audit` to refresh the hash. Part 1 and Part 3 are not yet published, so the end cards show them as coming soon.

## Card SVG (`check_card.py`: 0 errors, 0 warnings)

```svg
<svg viewBox="0 0 320 155" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Annual report sections as stacked bands beside eight quarterly bars with Q3 tallest and a smooth gold twelve-month line"><rect x="24" y="34" width="70" height="14" fill="#76d5c1" opacity="1"/><rect x="24" y="56" width="56" height="14" fill="#76d5c1" opacity="0.8"/><rect x="24" y="78" width="62" height="14" fill="#76d5c1" opacity="0.6"/><rect x="24" y="100" width="48" height="14" fill="#76d5c1" opacity="0.45"/><rect x="128" y="56.9" width="14" height="65.1" fill="#76d5c1" opacity="0.5"/><rect x="149" y="55" width="14" height="67" fill="#76d5c1" opacity="0.5"/><rect x="170" y="44.5" width="14" height="77.5" fill="#76d5c1" opacity="1"/><rect x="191" y="52.6" width="14" height="69.4" fill="#76d5c1" opacity="0.5"/><rect x="212" y="50.7" width="14" height="71.3" fill="#76d5c1" opacity="0.5"/><rect x="233" y="47.6" width="14" height="74.4" fill="#76d5c1" opacity="0.5"/><rect x="254" y="35.2" width="14" height="86.8" fill="#76d5c1" opacity="1"/><rect x="275" y="44.5" width="14" height="77.5" fill="#76d5c1" opacity="0.5"/><path d="M128 100 L296 78" stroke="#f5c76a" stroke-width="2" fill="none"/><text x="24" y="136" font-family="monospace" font-size="9" fill="#76d5c1">PART 2</text></svg>
```
