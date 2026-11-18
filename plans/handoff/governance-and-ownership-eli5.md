# Hand-off: Part 19, Governance and who owns the company

File: `explainers/governance-and-ownership-eli5.html` · Audit: `plans/handoff/governance-and-ownership-eli5.audit.json` · Card: `plans/handoff/governance-and-ownership-eli5.card.svg`

Not published. Before publishing: set `file: 'governance-and-ownership-eli5.html'` on the part in `series-fundamental-analysis.js` (own commit), then run, from the repo root:

```bash
python3.12 scripts/publish-eli5.py explainers/governance-and-ownership-eli5.html \
  --title "Governance and who owns the company" --category "Monetary Architecture" --minutes 24 \
  --summary "Part 19: who owns the company, who has pledged shares, and who is watching" \
  --bullet "Shareholding pattern: promoters, FPIs, DIIs, public" \
  --bullet "Pledges, margin calls and related-party approvals" \
  --bullet "Board, audit committee, auditor's opinion and TCPL's filings" \
  --nodes "OWNERS,PLEDGE,WATCHERS" \
  --subcategory "Fundamental analysis, from scratch" --part 19 \
  --card-svg plans/handoff/governance-and-ownership-eli5.card.svg
```

No dry run was done, so no shared files were touched. After publishing, re-run `check_explainer.py --audit` to refresh the hash and fill the audit's `publication` section.

Open points: (1) the plan's "60% of packaging spend" for Ramu's related-party purchase does not reconcile with canonical cup-and-packaging cost of ₹30 cr (₹15 cr would be 50%); the page uses only ₹15 cr and 3% of sales. (2) SEBI's January 2026 board memo dates the new Schedule XII bands 19 Nov 2025, while the regulation's own footnote says 19 Dec 2025; the page follows the footnote.
