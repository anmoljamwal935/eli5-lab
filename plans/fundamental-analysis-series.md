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
