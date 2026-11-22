# Series plan: Fundamental analysis, from scratch

Status: plan approved in principle (hybrid approach agreed). Nothing published yet.
Series data: `series-fundamental-analysis.js` (not yet loaded by `index.html`; wire it in with Part 0).

## Basics

- **Title:** Fundamental analysis, from scratch
- **Tagline:** You know how the market works. Now learn to read a company's accounts, judge the business, and work out what it's really worth, all in an Indian context.
- **Reader:** intermediate. Already knows what a share, NSE/BSE, a demat account and market cap are. Does not yet read annual reports or value companies.
- **Series id:** `fundamental-analysis` · **Map page:** `explainers/fundamental-analysis-from-scratch.html`
- **Catalogue:** `--subcategory "Fundamental analysis, from scratch"`

## Tracks

| Key | Name | Short | Colour |
|---|---|---|---|
| `numbers` | Reading the numbers | Numbers track | `#76d5c1` teal |
| `business` | Judging the business | Business track | `#c3b8ff` lavender |
| `value` | Price and value | Value track | `#f5c76a` gold |

## Colour key (same colour = same meaning in every part)

| Colour | Means |
|---|---|
| Teal `#76d5c1` | Money coming in: sales, cash inflows |
| Coral `#ff8059` | Money going out: costs, capex, outflows |
| Gold `#f5c76a` | What belongs to shareholders: profit, EPS, equity, book value, dividends |
| Rose `#ec6a94` | What is owed: debt, interest, liabilities |
| Lavender `#c3b8ff` | The market's view: price, market cap, multiples |

## The hybrid approach

1. **Teaching company: Ramu Chai Ltd** (fictional, every number tagged `example`). Clean numbers drive every lab.
   Base case: sales ₹500 cr · PAT ₹50 cr (10% net margin) · 10 cr shares · EPS ₹5 · price ₹100 · P/E 20 ·
   market cap ₹1,000 cr · equity ₹250 cr (ROE 20%) · borrowings ₹100 cr.
   Full canonical accounts are in the section "Ramu Chai Ltd: the canonical accounts" below.
2. **Real anchor: Tata Consumer Products, FY2026 annual report** (year to 31 March 2026). Every part in
   Stages 2–5 ends with a **"Now find it in a real report"** box: where the line sits in TCPL's report and its actual figure.
   Where useful, a lab starts from the real figures ("what if sales fall 10%?").
3. **Contrast company where the anchor is too clean.** TCPL is net cash with low working capital, so the debt and
   working-capital parts (11, 12) and cyclicals (33) also use **Tata Steel** (to confirm at build: net debt, inventory days).
   Two Tata companies, opposite balance sheets.
4. **Each sector part uses its own real company** (candidates below, all confirmed at build).
5. **Frozen at FY2026.** Every page says so, carries "educational, not a recommendation", and every real figure is
   checked against the filing itself (BSE/NSE or the company's annual report), not a data aggregator.

### Anchor facts checked so far (TCPL FY26 AGM presentation, 10 June 2026)

Source: https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/2026-06/TCPL-AGM-PRESENTATION-FOR-FY-2025-26.pdf

- Consolidated revenue ₹20,290 cr (+15%); EBITDA ₹2,815 cr (13.9% margin); group net profit ₹1,547 cr (+20%)
- Net cash ₹2,978 cr (cash and equivalents net of total borrowings, 31 March 2026)
- Basic EPS ₹15.59; adjusted EPS ₹17.30 (adjusted for amortisation of Capital Foods and Organic India)
- Free cash flow to EBITDA 107%; net working capital 21 days (India business); proposed dividend ₹10/share
- Segments: India Beverages ₹6,467 cr, India Foods ₹6,588 cr, International ₹4,885 cr, Non-branded ₹2,387 cr

Note: press reports quote revenue from operations as ₹20,280 cr. Reconcile against the audited statement at build.

Why it works as the anchor: a tea company (matches Ramu Chai), acquisitions with goodwill and amortisation
(Part 6: reported vs adjusted EPS), big standalone vs consolidated gap (Part 2), segments (Part 16), overseas
business and rupee exposure (Part 22), dividends (Part 14).

### Ramu Chai Ltd: the canonical accounts (every part uses exactly these; tag them `example`)

All ₹ crore, year to 31 March 2026 (FY26), with FY25 for comparison. Face value ₹10, 10 crore shares, price ₹100.

**Profit and loss (FY26)**

| Line | FY26 | Note |
|---|---|---|
| Revenue from operations | 500 | FY25: 450 (+11%) |
| Cost of materials (tea, milk, sugar, packaging) | 250 | Gross profit 250 (50%) |
| Employee benefits | 60 | |
| Other expenses (rent, ads, power, freight) | 105 | |
| **EBITDA** | **85** | 17% margin |
| Depreciation and amortisation | 12 | |
| **EBIT** | **73** | |
| Other income (interest on cash) | 4 | |
| Finance costs | 10 | ~10% on ₹100 cr borrowings |
| **Profit before tax** | **67** | |
| Tax | 17 | ~25% |
| **Profit after tax** | **50** | FY25: 44. EPS ₹5.00 (FY25 ₹4.40) |
| Dividend proposed for FY26 | 20 | ₹2.00/share, 40% payout, paid in FY27 |

Quarters, revenue / PAT: FY26 Q1 115/11, Q2 120/12, Q3 140/15, Q4 125/12. FY25 Q1 105/10, Q2 108/10.5, Q3 125/13, Q4 112/10.5. (Q3 is the winter and festive peak.)

**Balance sheet (31 March)**

| Line | FY26 | FY25 |
|---|---|---|
| Net fixed assets (PP&E) | 220 | 190 |
| Capital work in progress | 25 | 22 |
| Inventory | 55 | 47 |
| Trade receivables | 45 | 38 |
| Other current assets | 15 | 15 |
| Cash and equivalents | 40 | 41 |
| **Total assets** | **400** | **353** |
| Share capital (10 cr × ₹10) | 100 | 100 |
| Reserves and surplus | 150 | 118 |
| **Equity** | **250** | **218** |
| Borrowings (long-term 70, short-term 30) | 100 | 90 |
| Trade payables | 35 | 30 |
| Other liabilities and provisions | 15 | 15 |
| **Total equity and liabilities** | **400** | **353** |

Equity roll: 218 + PAT 50 − FY25 dividend paid 18 = 250.

**Cash flow (FY26)**

| Line | FY26 |
|---|---|
| PBT 67 + depreciation 12 + finance costs 10 − interest income 4 | 85 (= EBITDA) |
| Change in working capital: inventory −8, receivables −7, payables +5 | −10 |
| Tax paid | −17 |
| **Cash from operations (CFO)** | **58** |
| Capex (PP&E + CWIP) | −45 |
| Interest received | +4 |
| **Cash from investing (CFI)** | **−41** |
| Net new borrowing | +10 |
| Interest paid | −10 |
| Dividend paid (FY25's, ₹1.80/share) | −18 |
| **Cash from financing (CFF)** | **−18** |
| **Net change in cash** | **−1** (41 → 40) |

**Derived (use these, don't recompute differently)**: net margin 10% · EBITDA margin 17% · ROE 20% (PAT / closing equity) ·
capital employed 350 · ROCE 20.9% (EBIT / (equity + debt)) · net debt 60 · D/E 0.4 · interest cover 7.3× (EBIT / finance costs) ·
FCF 13 (CFO − capex) · CFO/PAT 1.16 · inventory days 80 (on cost of materials) · receivable days 33 · payable days 51 · cash cycle 62 days ·
market cap 1,000 · P/E 20 · P/B 4 · EV 1,060 · EV/EBITDA 12.5 · dividend yield 2%.

### Ramu Chai Ltd: extra canonical numbers (added for Parts 6–10; use exactly these)

**Units (fixed by Part 3):** 100 crore cups a year at ₹5.00 a cup = ₹500 cr; materials ₹2.50 a cup = ₹250 cr.

**Cost behaviour (Part 8, operating leverage).** Variable costs move with cups sold; fixed costs don't.

| Cost | FY26 | Behaviour |
|---|---|---|
| Cost of materials | 250 | variable (₹2.50 a cup) |
| Other expenses: freight and distributor commissions | 25 | variable (₹0.25 a cup) |
| Other expenses: rent, advertising, power base load | 80 | fixed |
| Employee benefits | 60 | fixed |
| Depreciation | 12 | fixed |

Variable costs 275 (55% of sales, contribution margin 45%). Fixed cash costs 140. EBITDA 85, EBIT 73 as before.
Worked case: sales +10% (110 cr cups) → contribution 247.5 → EBITDA 107.5 (+26%) → EBIT 95.5 (+31%) → PBT 89.5.

**Five-year history (Part 9, growth).** Shares stay at 10 crore throughout.

| | FY22 | FY23 | FY24 | FY25 | FY26 |
|---|---|---|---|---|---|
| Revenue | 330 | 365 | 405 | 450 | 500 |
| PAT | 30 | 34 | 39 | 44 | 50 |
| EPS (₹) | 3.00 | 3.40 | 3.90 | 4.40 | 5.00 |

4-year CAGR (FY22→FY26): revenue 11.0%, PAT 13.6%.

**Next-year estimate (Part 7, forward P/E), tagged example:** FY27E revenue 560 (+12%), PAT 57.5 (+15%), EPS ₹5.75.
At ₹100: trailing P/E 20, forward P/E 17.4, earnings yield 5%.

**DuPont (Part 10), on closing FY26 figures:** net margin 10% × asset turnover 1.25 (500/400) × equity multiplier 1.6 (400/250) = ROE 20%.
ROCE 20.9% (EBIT 73 / capital employed 350). Use closing balances unless a page explains averages, and say which.

### Ramu Chai Ltd: extra canonical numbers (added for Parts 11–15; use exactly these)

**Debt (Part 11).** Borrowings 100 (long-term 70, short-term 30) at ~10%; cash 40; net debt 60.
D/E 0.40 · net debt/equity 0.24 · net debt/EBITDA 0.71× · interest cover 7.3× (EBIT 73 ÷ finance costs 10).
Rate shock: 10% → 12% on all borrowings → finance costs 12, interest cover 6.1×, PBT 65.

**Working capital (Part 12).** Current assets 155 (inventory 55, receivables 45, other 15, cash 40).
Current liabilities 80 (payables 35, short-term borrowings 30, other liabilities and provisions 15).
Current ratio 1.94 · quick ratio 1.25 ((155 − 55) ÷ 80).
Days (year-end balances, 365 days): inventory 80 (on cost of materials 250) · receivables 33 (on sales 500) · payables 51 (on cost of materials 250) · cash cycle 62.
FY25 for comparison (FY25 cost of materials 225, i.e. 50% of sales 450): inventory 76 (47) · receivables 31 (38) · payables 49 (30) · cycle 58. The cycle lengthened by 4 days, which is part of why working capital absorbed 10 in FY26.

**Free cash flow (Part 13).** FY26: CFO 58 · capex 45 · FCF 13 · CFO/PAT 1.16 · FCF yield 1.3% (13 ÷ market cap 1,000).
Maintenance capex ≈ depreciation 12; growth capex 33. CFO − maintenance capex = 46.

| | FY22 | FY23 | FY24 | FY25 | FY26 |
|---|---|---|---|---|---|
| PAT | 30 | 34 | 39 | 44 | 50 |
| CFO | 35 | 40 | 46 | 52 | 58 |
| Capex | 20 | 30 | 38 | 42 | 45 |
| FCF | 15 | 10 | 8 | 10 | 13 |

**Price tags (Part 14).** Book value per share ₹25 (250 ÷ 10) · P/B 4.0 · DPS ₹2.00 (FY26 proposed) · payout 40% · dividend yield 2.0% ·
retention 60% → sustainable growth = ROE 20% × 60% = 12% · EV 1,060 (market cap 1,000 + debt 100 − cash 40) · EV/EBITDA 12.5 · EV/Sales 2.1.

**Peers for comparison (Part 15), fictional, tagged example.** Shares 10 crore each.

| | Ramu Chai | Pahadi Leaf Ltd | Masala Brew Ltd |
|---|---|---|---|
| Sales | 500 | 800 | 300 |
| PAT | 50 | 56 | 39 |
| Net margin | 10% | 7% | 13% |
| ROE | 20% | 14% | 26% |
| D/E | 0.4 | 0.9 | 0.0 |
| 4-yr EPS CAGR | 13.6% | 8% | 22% |
| Price (₹) | 100 | 84 | 136.5 |
| P/E | 20 | 15 | 35 |
| PEG | 1.5 | 1.9 | 1.6 |
| CFO/PAT | 1.16 | 0.70 | 1.05 |

### Ramu Chai Ltd: extra canonical numbers (added for Parts 16–20; use exactly these)

**One cup (Part 16).** Price ₹5.00. Variable cost ₹2.75: tea ₹0.90, milk powder ₹1.10, sugar ₹0.20, cup and packaging ₹0.30 (these four = materials ₹2.50), freight and distributor commission ₹0.25.
Contribution ₹2.25 a cup (45%). Fixed cash costs ₹1.40 a cup at 100 crore cups → EBITDA ₹0.85 a cup (17%). Break-even volume: 140 ÷ 2.25 = 62.2 crore cups.
Revenue mix: packaged tea through shops ₹300 cr (60%) · Ramu cafés ₹125 cr (25%) · offices and institutions ₹75 cr (15%).
Largest customer: one regional distributor, ₹60 cr (12% of sales).

**Industry (Part 17), fictional.** Ramu sells in a ₹12,500 cr regional packaged-tea market growing 8% a year; Ramu's share is 2.4% (packaged tea ₹300 cr ÷ 12,500). The top three brands hold 55%.

**Capital allocation (Part 18).** Spare cash to decide on: ₹50 cr, over 10 years. Four choices, each tagged example:
reinvest in Ramu at its 20% return · buy a rival that earns 8% on the price paid · pay it out as a dividend (₹5 a share) · buy back 0.5 crore shares at ₹100.
Track record (example): management guided 10% sales growth for each of FY24–FY26 and delivered 11.0% (405/365), 11.1% (450/405) and 11.1% (500/450).

**Ownership (Part 19).** Shareholding pattern at 31 March 2026: promoters (the Ramu family) 55% (5.5 crore shares) · foreign portfolio investors 10% · domestic institutions (mutual funds, insurers) 15% · public 20%.
Pledge: 0.55 crore promoter shares (10% of the promoter holding) pledged for a ₹22 cr loan. At ₹100 the shares are worth ₹55 cr (2.5× cover); the lender calls for more security below 2.0× cover, i.e. below ₹80 a share (−20%).
Related party: Ramu buys ₹15 cr a year of cups and packaging from a company owned by the promoter's brother (3% of sales; 60% of packaging spend).
Board: 8 directors, 4 independent. Auditor: a mid-sized firm, unmodified opinion.

**Red flags (Part 20).** "Ramu Chai B" is a fudged twin for the spot-the-difference lab, tagged example. Keep the real Ramu's numbers unchanged; put all the differences in Ramu B.

### Ramu Chai Ltd: extra canonical numbers (added for Parts 21–25; use exactly these)

All tagged `example`. Start from the canonical FY26 accounts: 10 crore shares, face value ₹10, price ₹100,
market cap ₹1,000 cr, PAT ₹50 cr, EPS ₹5.00, equity ₹250 cr, borrowings ₹100 cr, cash ₹40 cr, net debt ₹60 cr.

**Corporate actions (Part 21).** Each action on its own, starting from the base case.

| Action | Shares after | Price after | EPS after | Market cap | Note |
|---|---|---|---|---|---|
| Bonus 1:1 | 20 cr | ₹50 | ₹2.50 | ₹1,000 cr | ₹100 cr moves from reserves to share capital (200); equity unchanged at 250 |
| Split ₹10 → ₹5 face value | 20 cr | ₹50 | ₹2.50 | ₹1,000 cr | share capital unchanged at 100 |
| Buyback 0.5 cr shares at ₹100 (Part 18's) | 9.5 cr | ₹100 | ₹5.26 | ₹950 cr | ₹50 cr cash out; ignores lost interest income |
| Rights issue 1 for 10 at ₹80 | 11 cr | ₹98.18 (theoretical ex-rights) | ₹4.55 before new profit | ₹1,080 cr | raises ₹80 cr |
| QIP: 1 cr new shares at ₹95 | 11 cr | — | ₹4.55 before new profit | — | raises ₹95 cr; existing holders go from 100% to 90.9% |
| ESOPs: 0.2 cr options at ₹60 | 10.2 cr | — | ₹4.90 | — | 2.0% dilution; company receives ₹12 cr |

Demerger (example): the cafés (₹125 cr of sales, Part 16) become "Ramu Cafés Ltd", 1 new share for every 10 held.

**The economy (Part 22).** Tea is ₹0.90 of each ₹5.00 cup (Part 16), ₹90 cr on 100 crore cups.
- Tea price +20% after a weak monsoon: +₹0.18 a cup, +₹18 cr cost. Not passed on: EBITDA 85 → 67 (−21%). Passed on in full: cup price ₹5.18 (+3.6%).
- Repo-led borrowing cost +1 point (10% → 11%): finance costs 10 → 11, PBT 67 → 66. (Part 11 already shows 10% → 12%.)
- Ramu sells only in India; the rupee story uses TCPL's International segment (₹4,885 cr, the anchor facts).

**Discount rate (Part 23).** Risk-free 7.0% (a rounded stand-in for the 10-year G-sec; show the real yield at 31 March 2026 in the real-report box) ·
beta 1.0 · equity risk premium 5.0% → cost of equity 12.0% · cost of debt 10% pre-tax, 7.5% after 25% tax ·
weights at market value: equity 1,000, debt 100 → WACC 11.59%, used as **11.6%**.
Present value at 12%: ₹100 in 1 year = ₹89.29; in 10 years = ₹32.20.

**DCF (Part 24).** Free cash flow to the firm (FCFF) = NOPAT × (1 − growth ÷ return on new investment).
- NOPAT FY26 = EBIT 73 × (1 − 25%) = 54.75. Return on new investment 20% (Ramu's ROE and ROCE are about 20%).
- Growth: 12% a year FY27–FY31, 8% FY32–FY36, 5% for ever after. So reinvestment is 60% of NOPAT, then 40%, then 25%.
- FY27: NOPAT 61.3, FCFF 24.5 · FY28 68.7 / 27.5 · FY29 76.9 / 30.8 · … · FY36 141.8 / 85.1.
- Discount at WACC 11.6%: PV of FY27–FY36 FCFF 262.4 · terminal value at FY36 1,691.6 (FCFF FY37 111.65 ÷ (11.6% − 5%)), PV 564.5 = 68% of EV.
- EV 826.9 − net debt 60 = equity 766.9 → **₹76.7 a share**, against a price of ₹100.
- Sensitivity to WACC: 10% → ₹108.7 · 11% → ₹86.6 · 11.6% → ₹76.7 · 12% → ₹71.0 · 13% → ₹59.5.
- Reconcile with Part 13: FY26 FCF was 13 (CFO − capex); NOPAT 54.75 − reinvestment 43 (net capex 33 + working capital 10) = 11.75. The gap is interest treatment; say so.

**Reverse DCF (Part 25).** Same model; solve for the growth the ₹100 price assumes (equity 1,000, EV 1,060).
- One growth rate for FY27–FY36 (then 5%): **15.3% a year**.
- Or keep 8% then 5% and solve FY27–FY31 only: **21.9% a year**. That is above the 20% return on new money, so FCFF is negative in FY27–FY31 (reinvestment above 100% of NOPAT).
- Compare: Ramu's FY22–26 CAGR was 11.0% (sales) and 13.6% (PAT), Part 9.

### Ramu Chai Ltd: extra canonical numbers (added for Parts 26–28; use exactly these)

All tagged `example`. Builds on the canonical accounts and on Parts 21–25 (WACC 11.6%, Part 24's DCF ₹76.7 a share, Part 25's 15.3% implied growth).

**Relative valuation (Part 26).** Year-end P/E history (EPS from Part 9):

| | FY22 | FY23 | FY24 | FY25 | FY26 |
|---|---|---|---|---|---|
| EPS (₹) | 3.00 | 3.40 | 3.90 | 4.40 | 5.00 |
| P/E at year end | 18 | 16 | 22 | 24 | 20 |
| Price (₹) | 54.00 | 54.40 | 85.80 | 105.60 | 100.00 |

Five-year average P/E 20; band 16 to 24. On FY27E EPS ₹5.75 (Part 7): ₹92 at 16×, ₹115 at 20×, ₹138 at 24×.
Peers from Part 15: Pahadi Leaf P/E 15, Ramu 20, Masala Brew 35; median 20.

**Sum of the parts (Part 27).** Segment EBITDA adds to Ramu's ₹85 cr; revenue mix from Part 16.

| Segment | Sales | EBITDA | Margin | EV/EBITDA (example) | Value |
|---|---|---|---|---|---|
| Packaged tea through shops | 300 | 60 | 20.0% | 14× | 840 |
| Ramu cafés | 125 | 15 | 12.0% | 10× | 150 |
| Offices and institutions | 75 | 10 | 13.3% | 8× | 80 |
| **Total** | **500** | **85** | 17% | 12.6× | **1,070** |

EV 1,070 − net debt 60 = equity 1,010 → ₹101 a share (against ₹100). Part 21's demerger example spins off the cafés.
Holding-company discount (example): "Ramu Family Holdings" owns 55% of Ramu (5.5 crore shares, Part 19), worth ₹550 cr at ₹100, but itself trades at a market cap of ₹385 cr: a 30% discount. Its book cost for the stake is ₹55 cr (5.5 crore shares at ₹10 face value), so NAV 550 against book 55.
Dividend discount model: DPS ₹2.00 (Part 14), cost of equity 12% (Part 23). With 8% growth for ever: 2.00 × 1.08 ÷ (12% − 8%) = ₹54. With 10%: ₹110. With 12%, Part 14's sustainable growth, the formula breaks (growth = discount rate); say so.

**Margin of safety and scenarios (Part 28).** Part 24's model, three cases:

| Case | Growth FY27–31 / FY32–36 / after | Return on new investment | WACC | Value a share |
|---|---|---|---|---|
| Bull | 15% / 10% / 5% | 25% | 11.6% | ₹99.6 |
| Base (Part 24) | 12% / 8% / 5% | 20% | 11.6% | ₹76.7 |
| Bear | 6% / 5% / 4% | 15% | 12.6% | ₹44.1 |

Probabilities 25% / 50% / 25% → probability-weighted value ₹74.3. Price ₹100 is 35% above it.
A 30% margin of safety on the weighted value means buying at or below ₹52.0 (on the base case, ₹53.7).
Sensitivity grid (value a share; FY32–36 at 8%, then 5%, return 20%):

| WACC \ growth FY27–31 | 8% | 10% | 12% | 14% | 16% |
|---|---|---|---|---|---|
| 10.6% | 83.6 | 88.9 | 94.5 | 100.3 | 106.5 |
| 11.6% | 68.6 | 72.6 | 76.7 | 81.0 | 85.5 |
| 12.6% | 57.7 | 60.7 | 63.7 | 67.0 | 70.3 |

### Sector parts: fictional teaching companies (Parts 29 onward; tag `example`)

Sector parts do not use Ramu Chai. Each builds its own fictional company with clean numbers and uses the real company in the Stage 6 table.

**Pipal Bank Ltd (Part 29), ₹ cr, FY26.**
- Assets: net loans 800 (812 gross less 12 provisions), G-secs 150, cash 50 = 1,000.
- Funding: deposits 900 (CASA 360 at 2%, i.e. 40%; term 540 at 7%), equity 100 (opening 85, no dividend). 10 crore shares, book value ₹10 a share.
- Interest: earned 85 (loans 9.5% = 76, G-secs 6% = 9); paid 45; NII 40; NIM 4.0%. With CASA at 30%: paid 49.5, NIM 3.55%.
- P&L: fees 10, costs 18 (cost-to-income 36%), PPOP 32, provisions 12, PBT 20, tax 5, profit 15. ROA 1.5%, ROE 15%.
- Bad loans 16 (GNPA 1.97%), PCR 75%, NNPA 4 (0.50%), credit cost 1.5%.
- Capital: RWA 750 (75% of loans + 150); CET1 = CRAR = 13.33%; minimum 11.5%.
- Price ₹20: P/B 2.0, P/E 13.3; justified P/B (15 − 10) ÷ (12.5 − 10) = 2.0.

**Sahyadri Finance Ltd (Part 30, NBFC), ₹ cr.**
- Loans 10,000 (three-year EMI loans, about 400 a month repaid, yield 15%). Borrowings 8,000 at 8%: 3-month paper 3,200 (40%), long-term 4,800 over 36 months. Equity 2,000. Cash buffer 500.
- P&L: interest earned 1,500, paid 640, NII 860, costs 300, credit cost 200 (2%), PBT 360, tax 90, profit 270. Spread 7 points, NIM 8.6%, ROA 2.7%, ROE 13.5%.
- Cost of funds to 9%: interest 720, PBT 280 (−22%).
- First-month ladder: +103% (1–7 days), +17% (8–14), −28% (15–30), breaching RBI's −20% limit. Three-month freeze with nothing renewed: short in month 1, deepest −2,036 in month 3, +132 by month 12; a 2,600 buffer survives.

**Kaveri Life (Part 30).** APE 1,000, VNB about 250 (margin 25%): −120 in year 1 then +57 a year for 14 years at 11%. EV opening 5,300 (ANW 1,900 + VIF 3,400); unwind 424 + VNB 250 + experience 26 = operating profit 700, RoEV 13.2%; closing 6,000 (ANW 2,000 + VIF 4,000). P/EV 2.0 at ₹12,000 cr market cap.

**Godavari General (Part 30).** Earned premium 1,000, claims 730 (73%), costs 300 (30%), combined ratio 103%, underwriting loss 30; float 2,000 at 7.5% = 150; PBT 120.

### Lab layout rule (owner feedback on Part 15, 9 Nov 2026)

A longer page is fine; a crowded one is not.
- Side-by-side `lab-grid` (controls left, chart right) only for small labs: up to 4 sliders and a few buttons.
- Anything bigger, or more than one tool in a lab: one column of numbered steps ("1 · …"), each with a short heading and a divider, charts and tables full width under their controls. Model: `explainers/ratios-together-eli5.html` (`.dashlab`).
- Tables: one short column per idea, no two-line cells; on phones override the shared `table{min-width:620px}` so every column fits without sideways scrolling.
- Working, formulas and long assumptions go behind `<details class="trace">`.
- Check the 390px screenshots for crowding before finishing.

## Parts (38 + bonus)

`R:` = what the "real report" box shows.

### Stage 1: Start here
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 1 | `fundamental-analysis-in-one-page-eli5` | Fundamental analysis in one page | value | Recap: share = slice of a business, market cap, price vs value; fundamental vs technical; series map | Price wiggling around a slow value line; market-cap sliders |

### Stage 2: The accounts
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 2 | `where-the-numbers-live-eli5` | Where the numbers live | numbers | Annual report sections, exchange filings (SEBI LODR), standalone vs consolidated, quarterly results: YoY, QoQ, TTM | Clickable annual report; quarterly bars with YoY/QoQ/TTM toggle. R: TCPL standalone vs consolidated |
| 3 | `the-profit-and-loss-eli5` | The P&L, line by line | numbers | Sales → EBITDA → D&A → interest → tax → PAT; other income; exceptional items | Drivable waterfall (cups, price, costs). R: TCPL P&L |
| 4 | `the-balance-sheet-eli5` | The balance sheet | numbers | Assets = liabilities + equity; CWIP, inventory, receivables, goodwill, borrowings, reserves, minority interest | Balance scale: buy a machine with cash vs a loan. R: TCPL goodwill |
| 5 | `cash-flow-and-the-three-statements-eli5` | Cash flow, and how the three connect | numbers | CFO/CFI/CFF; profit ≠ cash; one event through all three | Pick an event, watch all three update. R: TCPL cash flow |
| 6 | `accounting-choices-eli5` | Accounting choices that change profit | numbers | Ind AS, capitalise vs expense, depreciation life, provisions, amortisation, one-offs | Capitalise/expense switch. R: TCPL reported vs adjusted EPS |

### Stage 3: Ratios
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 7 | `pe-ratio-eli5` | P/E: what it says and when it lies | value | EPS, P/E, earnings yield, trailing vs forward; traps: cyclical peaks, one-offs, losses | **Flagship:** sliders for sales, margin, shares, price → live EPS and P/E; "trap" toggle. R: TCPL EPS |
| 8 | `margins-and-operating-leverage-eli5` | Margins and operating leverage | numbers | Gross, EBITDA, net margin; fixed vs variable costs | Fixed-cost slider: sales +10% → profit +?% |
| 9 | `growth-worth-paying-for-eli5` | Growth that's worth paying for | numbers | CAGR, compounding, base effects, growth that eats cash | CAGR calculator and compounding curve |
| 10 | `roe-roce-dupont-eli5` | ROE, ROCE and DuPont | numbers | Return on owners' money vs all capital; margin × turnover × leverage | Three dials, same ROE three ways |
| 11 | `how-much-debt-eli5` | Debt: how much is too much | numbers | D/E, net debt/EBITDA, interest coverage, RBI rate cycle | Borrow more, raise rates, coverage breaks. R: TCPL (net cash) vs Tata Steel |
| 12 | `working-capital-cycle-eli5` | Working capital and the cash cycle | numbers | Inventory, receivable, payable days; cash conversion cycle | One rupee round the cycle. R: TCPL 21 days vs a heavy-inventory business |
| 13 | `free-cash-flow-eli5` | Free cash flow and earnings quality | numbers | FCF, CFO/PAT, maintenance vs growth capex, FCF yield | Profit vs cash over 5 years. R: TCPL FCF/EBITDA |
| 14 | `pb-dividends-ev-eli5` | The other price tags: P/B, dividends, EV/EBITDA | value | Book value, payout, yield, enterprise value, EV/Sales | Same market cap, different debt. R: TCPL dividend history |
| 15 | `ratios-together-eli5` | Reading ratios together | value | Peer comparison, PEG, one-page dashboard | Traffic-light dashboard |

### Stage 4: The business behind the numbers
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 16 | `business-model-eli5` | Business model and unit economics | business | Volume × price, unit economics, customer concentration, segments | Economics of one cup. R: TCPL segments |
| 17 | `industry-and-moats-eli5` | Industry structure and moats | business | Five forces, market share, brand, switching costs, scale, licences | Competitor enters: returns with vs without a moat |
| 18 | `management-and-capital-allocation-eli5` | Management, capital allocation and concalls | business | Track record, uses of cash, guidance vs delivery | Four uses of cash over 10 years. R: TCPL acquisitions |
| 19 | `governance-and-ownership-eli5` | Governance and who owns the company | business | Shareholding pattern, pledges, related-party deals, auditors, independent directors | Pledge slider: price fall before margin call |
| 20 | `red-flags-eli5` | Red flags and forensic checks | business | Receivables outrunning sales, CFO ≪ PAT, contingent liabilities, auditor exits, dilution | Spot the fudged accounts |
| 21 | `corporate-actions-eli5` | Corporate actions and dilution | value | Bonus, split, buyback, rights, QIP, ESOPs, demergers | Split leaves value unchanged; dilution cuts EPS |
| 22 | `the-economy-around-the-company-eli5` | The economy around the company | business | Repo rate, inflation, rupee, commodities (tea prices), monsoon, policy; cyclical vs defensive | Input-cost and rate shocks. Links `real-gdp-eli5`, `how-money-actually-works-in-india` |

### Stage 5: Valuation
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 23 | `discount-rate-eli5` | Discounting and the discount rate | value | Present value, 10-yr G-sec, equity risk premium, beta, WACC | Build a discount rate |
| 24 | `dcf-step-by-step-eli5` | DCF, step by step | value | FCF forecast, terminal value, value per share | Full DCF of Ramu Chai |
| 25 | `reverse-dcf-eli5` | Reverse DCF | value | Growth implied by today's price | Solve for implied growth. R: TCPL |
| 26 | `relative-valuation-eli5` | Relative valuation and P/E bands | value | Peer multiples, historical bands, re-rating | P/E band chart |
| 27 | `sum-of-the-parts-eli5` | Conglomerates and special cases | value | SOTP, holding-company discount, DDM, NAV | SOTP builder |
| 28 | `margin-of-safety-eli5` | Margin of safety and scenarios | value | Bull/base/bear, sensitivity, probability-weighted value | Sensitivity grid |

### Stage 6: Sectors (each with its own real company; candidates, confirm at build)
| # | id | Title | Track | Covers | Lab | Real company |
|---|---|---|---|---|---|---|
| 29 | `analysing-banks-eli5` | Banks | business | NIM, CASA, GNPA/NNPA, PCR, credit cost, CRAR, P/B | Fictional bank, bad-loan slider | HDFC Bank |
| 30 | `nbfcs-and-insurers-eli5` | NBFCs and insurers | business | Cost of funds, ALM mismatch; VNB, embedded value, combined ratio | ALM mismatch timeline | Bajaj Finance; HDFC Life |
| 31 | `it-and-pharma-exporters-eli5` | Exporters: IT services and pharma | business | Constant currency, rupee, deal wins, USFDA inspections | Rupee slider | Infosys; Sun Pharma |
| 32 | `consumer-companies-eli5` | Consumer companies | business | FMCG and retail: volume vs price growth, rural demand, high P/Es | Split growth into volume and price | HUL; Avenue Supermarts |
| 33 | `cyclicals-eli5` | Cyclicals | business | Cement (EV/tonne), steel, autos; normalised earnings; P/E paradox | Ride a full cycle | UltraTech; Tata Steel |
| 34 | `utilities-psus-real-estate-eli5` | Utilities, PSUs and real estate | business | Regulated returns, government ownership, pre-sales | Key-metric card per sector | NTPC; DLF |
| 35 | `loss-makers-and-ipos-eli5` | Loss-making companies and IPOs | business | DRHP/RHP, contribution margin, burn, runway | Burn and runway calculator | Swiggy (if still loss-making) |

### Stage 7: Putting it together
| # | id | Title | Track | Covers | Lab |
|---|---|---|---|---|---|
| 36 | `screening-for-ideas-eli5` | Screening for ideas | value | Filters, value traps, survivorship bias | Screen 30 made-up companies |
| 37 | `one-company-start-to-finish-eli5` | One company, start to finish | business | Full TCPL walk-through, one-page thesis. Links `stock-research-process-eli5` | The full checklist |
| 38 | `portfolio-taxes-costs-eli5` | Portfolio, taxes and costs | value | Position sizing, when to sell, biases; STT, STCG/LTCG, dividend tax | After-tax return and position-size calculator |

**Bonus:** `satyam-decoded-eli5`: *Satyam, decoded.* The 2009 fraud read through Part 20's red flags.

## Rollout

1. Part 0: wire `series-fundamental-analysis.js` into `index.html` (own commit, site change), build and publish the map page.
2. Parts in reading order, each through every eli5 gate (inventory, fact check, tested lab, render check, live check).
3. Set `file:` on a part only in the commit that publishes it.
