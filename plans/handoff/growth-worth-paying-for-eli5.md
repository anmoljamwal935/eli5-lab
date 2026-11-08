# Hand-off: Part 9, Growth that's worth paying for

- Page: `explainers/growth-worth-paying-for-eli5.html` (Numbers track, 15 panels, 30 min)
- Audit: `plans/handoff/growth-worth-paying-for-eli5.audit.json`
- Card: `plans/handoff/growth-worth-paying-for-eli5.card.svg` (lints clean; `PART 9` in teal)
- Not published. Set `file: 'growth-worth-paying-for-eli5.html'` on the part in `series-fundamental-analysis.js` in its own commit, then run (repo root):

```bash
python3.12 scripts/publish-eli5.py explainers/growth-worth-paying-for-eli5.html \
  --title "Growth that’s worth paying for" --category "Monetary Architecture" --minutes 30 \
  --summary "Part 9: CAGR, compounding, base effects, and growth that costs too much" \
  --bullet "CAGR is the steady rate; averaging yearly growth overstates it" \
  --bullet "Bought, diluted or cash-hungry growth is worth less than it looks" \
  --bullet "Growth is worth paying for when it earns more than its capital costs" \
  --nodes "CAGR,BASE,CASH" \
  --subcategory "Fundamental analysis, from scratch" --part 9 \
  --card-svg plans/handoff/growth-worth-paying-for-eli5.card.svg
```

Dry run done and reverted. After the real publish, re-run `check_explainer.py --audit` (the preview block changes the file hash).

## Things other parts should know
- Ramu's FY22→FY26 revenue CAGR is exactly 10.9466%, which rounds to **10.9%**, not the plan's "11.0%". This page shows 10.95%. PAT CAGR 13.62% (plan: 13.6%). The average of yearly revenue rates is 10.9468%, so on Ramu's steady history CAGR and the average match; the gap is shown with a clearly labelled one-off jumpy what-if.
- One-off what-ifs on this page (tagged `example`, not Ramu's accounts): ±50% path, bad-year paths from ₹500 cr, a +20% year with ₹75 cr bought, two growth plans (₹20 cr vs ₹50 cr for ₹5 cr profit), a 1 cr new-share issue at ₹100. Derived: ₹62 of operating capital per ₹100 sales (310/500); kept profit ₹30 cr (50 less 40% payout).
- Lab D defaults to canonical (+15% profit, no new shares), so it opens with no EPS gap; the "1 for 10 issue" button shows it.
- TCPL: AR p.223 prints last year's EPS as ₹13.60; audited note 30 (p.456) says ₹13.06. The page uses ₹13.06. Acquisition dates and an organic growth rate are not in the FY26 documents; the page says so and computes neither.
