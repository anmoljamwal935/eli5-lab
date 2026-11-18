# Hand-off: Part 18, Management, capital allocation and concalls

File: `explainers/management-and-capital-allocation-eli5.html` · Audit: `plans/handoff/management-and-capital-allocation-eli5.audit.json` · Card: `plans/handoff/management-and-capital-allocation-eli5.card.svg`

Not published. Before publishing: set `file: 'management-and-capital-allocation-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/management-and-capital-allocation-eli5.html \
  --title "Management, capital allocation and concalls" --category "Monetary Architecture" --minutes 24 \
  --summary "Part 18: what managers do with spare cash, and whether they keep their promises" \
  --bullet "Five uses of cash, each with one test: return on new money against what owners could earn elsewhere" \
  --bullet "Lab: ₹50 cr, four choices, ten years; and a promise tracker" \
  --bullet "TCPL's acquisitions, rights issue and a dated margin promise, checked against the reports" \
  --nodes "CASH,CHOICES,PROMISES" \
  --subcategory "Fundamental analysis, from scratch" --part 18 \
  --card-svg plans/handoff/management-and-capital-allocation-eli5.card.svg
```

No dry run was done, so no shared files were touched (no link-preview block in the page). After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.

Open points: the "acquisitions often overpay" claim is general and uncited (the page says so); the AGM presentation was not re-read this session; who first said "16%" on the Q1 FY26 call could not be verified; the series brief put Form AOC-1 on p.487, the rows are on printed p.486.
