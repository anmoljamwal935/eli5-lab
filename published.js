window.PUBLISHED = [
  {
    "id": "inside-llm-serving-eli5",
    "title": "Inside LLM serving: one model, millions of chats",
    "category": "AI & Frontier",
    "minutes": 20,
    "summary": "One shared model copy, private memory per chat",
    "bullets": [
      "Weights are shared; each chat owns a growing KV cache",
      "Batching, paging and precision decide how many chats fit"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "WEIGHTS",
      "KV CACHE",
      "BATCH"
    ],
    "file": "explainers/inside-llm-serving-eli5.html",
    "date": "2026-10-28",
    "subcategory": "LLM serving",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"One long shared weights bar next to eight tiny private chat memory bars\"><rect x=\"24\" y=\"48\" width=\"200\" height=\"22\" fill=\"#ff8059\"/><g fill=\"#76d5c1\"><rect x=\"24\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"34\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"44\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"54\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"64\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"74\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"84\" y=\"92\" width=\"6\" height=\"28\"/><rect x=\"94\" y=\"92\" width=\"6\" height=\"28\"/></g><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"36\" fill=\"#ff8059\">WEIGHTS</text><text x=\"24\" y=\"140\" fill=\"#76d5c1\">CHAT KV</text><text x=\"296\" y=\"62\" text-anchor=\"end\" fill=\"#a5a29c\">SHARED</text></g></svg>"
  },
  {
    "id": "exponential-time-hypothesis-eli5",
    "title": "The Exponential Time Hypothesis, and OpenAI’s claim to break it",
    "category": "AI & Frontier",
    "minutes": 14,
    "summary": "Two AI labs claim 3-SAT beats exponential time, in theory",
    "bullets": [
      "ETH bet each extra switch multiplies the work by a fixed amount",
      "The claimed multiplier shrinks so slowly it only pays off past 10^78 switches"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "CHECK ALL",
      "BEST BEFORE",
      "CLAIMED"
    ],
    "file": "explainers/exponential-time-hypothesis-eli5.html",
    "date": "2026-10-27",
    "subcategory": "Research claims",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Extra work per added switch: the claimed method rises, then sinks so slowly it only passes the best earlier method near 10 to the 78 switches, heading toward the ETH floor.\"><path d=\"M24 35.0H296\" fill=\"none\" stroke=\"#f5c76a\" stroke-width=\"2\"/><path d=\"M24 97.3H296\" fill=\"none\" stroke=\"#76d5c1\" stroke-width=\"2\"/><path d=\"M24 120.5H296\" fill=\"none\" stroke=\"#f87171\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><polyline points=\"24.0,83.3 25.8,70.2 27.6,66.2 29.4,65.2 31.3,65.3 33.1,65.9 34.9,66.7 36.7,67.6 38.5,68.5 40.3,69.5 42.1,70.4 43.9,71.3 45.8,72.1 47.6,72.9 49.4,73.7 51.2,74.4 53.0,75.1 54.8,75.8 56.6,76.4 58.5,77.1 60.3,77.6 62.1,78.2 63.9,78.8 65.7,79.3 67.5,79.8 69.3,80.3 71.1,80.7 73.0,81.2 74.8,81.6 76.6,82.0 78.4,82.4 80.2,82.8 82.0,83.2 83.8,83.5 85.7,83.9 87.5,84.2 89.3,84.6 91.1,84.9 92.9,85.2 94.7,85.5 96.5,85.8 98.3,86.1 100.2,86.4 102.0,86.6 103.8,86.9 105.6,87.1 107.4,87.4 109.2,87.6 111.0,87.9 112.9,88.1 114.7,88.4 116.5,88.6 118.3,88.8 120.1,89.0 121.9,89.2 123.7,89.4 125.5,89.6 127.4,89.8 129.2,90.0 131.0,90.2 132.8,90.4 134.6,90.6 136.4,90.8 138.2,90.9 140.1,91.1 141.9,91.3 143.7,91.4 145.5,91.6 147.3,91.8 149.1,91.9 150.9,92.1 152.7,92.2 154.6,92.4 156.4,92.5 158.2,92.7 160.0,92.8 161.8,93.0 163.6,93.1 165.4,93.2 167.3,93.4 169.1,93.5 170.9,93.6 172.7,93.8 174.5,93.9 176.3,94.0 178.1,94.1 179.9,94.2 181.8,94.4 183.6,94.5 185.4,94.6 187.2,94.7 189.0,94.8 190.8,94.9 192.6,95.0 194.5,95.2 196.3,95.3 198.1,95.4 199.9,95.5 201.7,95.6 203.5,95.7 205.3,95.8 207.1,95.9 209.0,96.0 210.8,96.1 212.6,96.2 214.4,96.3 216.2,96.4 218.0,96.4 219.8,96.5 221.7,96.6 223.5,96.7 225.3,96.8 227.1,96.9 228.9,97.0 230.7,97.1 232.5,97.1 234.3,97.2 236.2,97.3 238.0,97.4 239.8,97.5 241.6,97.6 243.4,97.6 245.2,97.7 247.0,97.8 248.9,97.9 250.7,97.9 252.5,98.0 254.3,98.1 256.1,98.2 257.9,98.2 259.7,98.3 261.5,98.4 263.4,98.4 265.2,98.5 267.0,98.6 268.8,98.7 270.6,98.7 272.4,98.8 274.2,98.9 276.1,98.9 277.9,99.0 279.7,99.1 281.5,99.1 283.3,99.2 285.1,99.2 286.9,99.3 288.7,99.4 290.6,99.4 292.4,99.5 294.2,99.6 296.0,99.6\" fill=\"none\" stroke=\"#ff8059\" stroke-width=\"2.5\"/><circle cx=\"235.5\" cy=\"97.3\" r=\"3.5\" fill=\"#f1eee8\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"133.5\" fill=\"#f87171\">ETH FLOOR</text><text x=\"70\" y=\"52\" fill=\"#ff8059\">CLAIMED</text><text x=\"296\" y=\"113.3\" text-anchor=\"end\" fill=\"#76d5c1\">BEST BEFORE</text></g></svg>"
  },
  {
    "id": "sgb-fcnr-masterstroke-eli5",
    "title": "Gold bonds, dollar swaps and the RBI “masterstroke”",
    "category": "Monetary Architecture",
    "minutes": 15,
    "summary": "Two bets on prices the government doesn't control — fact-checked.",
    "bullets": [
      "Gold bonds lost money because the government owed grams that kept rising",
      "The 2026 FCNR(B) swap pays the RBI only on dollars it actually spends",
      "The video's 10–20× profit claim tops out near 3.5× even in its best case"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "GOLD BONDS",
      "DOLLAR SWAP",
      "RUPEE"
    ],
    "file": "explainers/sgb-fcnr-masterstroke-eli5.html",
    "date": "2026-10-26",
    "subcategory": "Currency swaps",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Gold-bond payout per gram rising from 2,684 to 15,384 rupees beside the RBI swap, where dollars go in and the same dollars come back at the same rate\"><path d=\"M24 118H140\" stroke=\"#57534f\" fill=\"none\"/><rect x=\"32\" y=\"102\" width=\"24\" height=\"16\" fill=\"#f5c76a\" opacity=\".55\"/><rect x=\"68\" y=\"82\" width=\"24\" height=\"36\" fill=\"#f5c76a\"/><rect x=\"104\" y=\"28\" width=\"24\" height=\"90\" fill=\"#f5c76a\"/><rect x=\"186\" y=\"40\" width=\"44\" height=\"22\" fill=\"#ff8059\"/><rect x=\"250\" y=\"86\" width=\"44\" height=\"22\" fill=\"#76d5c1\"/><path d=\"M232 51 C262 51 272 62 272 82\" stroke=\"#ff8059\" stroke-width=\"2\" fill=\"none\"/><path d=\"M268 76 L272 84 L276 76\" stroke=\"#ff8059\" stroke-width=\"2\" fill=\"none\"/><path d=\"M248 97 C218 97 208 86 208 66\" stroke=\"#76d5c1\" stroke-width=\"2\" fill=\"none\"/><path d=\"M204 72 L208 64 L212 72\" stroke=\"#76d5c1\" stroke-width=\"2\" fill=\"none\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"136\" fill=\"#f5c76a\">GOLD BONDS</text><text x=\"296\" y=\"136\" text-anchor=\"end\" fill=\"#ff8059\">DOLLAR SWAP</text></g></svg>"
  },
  {
    "id": "eli5-3-vs-4-cylinder",
    "title": "Three cylinders vs four, and why one grunts at idle",
    "category": "Energy & Physics",
    "minutes": 11,
    "summary": "How a car engine turns small explosions into spin — and why the same 1.2-litre engine shakes in three cylinders but purrs in four.",
    "bullets": [
      "Why a 3-cylinder fires every 240° and leaves a 60° hole in its torque",
      "The rocking couple that makes a 3-cylinder block see-saw at idle",
      "What balance shafts, lopsided flywheels and dual-mass discs do about it"
    ],
    "kind": "engine",
    "color": "#f5c76a",
    "nodes": [
      "PUSH",
      "GAP",
      "SHAKE"
    ],
    "file": "explainers/eli5-3-vs-4-cylinder.html",
    "date": "2026-10-20",
    "subcategory": "Engines",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Over one 720-degree engine cycle a 3-cylinder fires three times with a 60-degree gap after each bang, while a 4-cylinder fires four evenly spaced times with no gap\"><text x=\"24\" y=\"22\" font-family=\"monospace\" font-size=\"9\" fill=\"#f5c76a\">3 CYL · 3 PUSHES, 3 HOLES</text><text x=\"296\" y=\"22\" text-anchor=\"end\" font-family=\"monospace\" font-size=\"9\" fill=\"#73706a\">ONE 720° CYCLE</text><g><rect x=\"24\" y=\"32\" width=\"68\" height=\"20\" fill=\"#f5c76a\"/><rect x=\"92\" y=\"32\" width=\"22.7\" height=\"20\" fill=\"#ff8059\" opacity=\".85\"/><rect x=\"114.7\" y=\"32\" width=\"68\" height=\"20\" fill=\"#f5c76a\"/><rect x=\"182.7\" y=\"32\" width=\"22.7\" height=\"20\" fill=\"#ff8059\" opacity=\".85\"/><rect x=\"205.3\" y=\"32\" width=\"68\" height=\"20\" fill=\"#f5c76a\"/><rect x=\"273.3\" y=\"32\" width=\"22.7\" height=\"20\" fill=\"#ff8059\" opacity=\".85\"/></g><text x=\"24\" y=\"86\" font-family=\"monospace\" font-size=\"9\" fill=\"#76d5c1\">4 CYL · 4 EVEN PUSHES</text><g fill=\"#76d5c1\"><rect x=\"24\" y=\"96\" width=\"68\" height=\"20\"/><rect x=\"92\" y=\"96\" width=\"68\" height=\"20\"/><rect x=\"160\" y=\"96\" width=\"68\" height=\"20\"/><rect x=\"228\" y=\"96\" width=\"68\" height=\"20\"/></g><g font-family=\"monospace\" font-size=\"9\" fill=\"#a5a29c\"><rect x=\"24\" y=\"128\" width=\"10\" height=\"10\" fill=\"#f5c76a\"/><text x=\"40\" y=\"137\">3-CYL PUSH</text><rect x=\"106\" y=\"128\" width=\"10\" height=\"10\" fill=\"#ff8059\"/><text x=\"122\" y=\"137\">GAP</text><rect x=\"152\" y=\"128\" width=\"10\" height=\"10\" fill=\"#76d5c1\"/><text x=\"168\" y=\"137\">4-CYL PUSH</text></g></svg>"
  },
  {
    "id": "stock-research-process-eli5",
    "title": "How I research a stock: six checks before buying",
    "category": "Monetary Architecture",
    "minutes": 9,
    "summary": "A six-step, no-hype walkthrough of one analyst’s stock-research process—from broad screening to a business thesis, valuation, and ongoing review.",
    "bullets": [
      "Use a screener to build a shortlist, not to make the decision.",
      "Read the business, its statements, strategy, risks, and value before buying.",
      "A good company can still be too expensive; keep the thesis testable."
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "SCREEN",
      "BUSINESS",
      "VALUE"
    ],
    "file": "explainers/stock-research-process-eli5.html",
    "date": "2026-10-16",
    "subcategory": "Equity research",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"A wide field of companies narrows through research to one business whose future cash flow is valued\"><path d=\"M24 46 L148 64 L148 91 L24 109 Z\" fill=\"none\" stroke=\"#76d5c1\" stroke-width=\"3\"/><g fill=\"#76d5c1\"><circle cx=\"32\" cy=\"55\" r=\"4\"/><circle cx=\"54\" cy=\"65\" r=\"4\"/><circle cx=\"76\" cy=\"74\" r=\"4\"/><circle cx=\"98\" cy=\"82\" r=\"4\"/><circle cx=\"120\" cy=\"90\" r=\"4\"/></g><path d=\"M148 78 H210\" stroke=\"#57534f\" stroke-width=\"3\"/><circle cx=\"236\" cy=\"78\" r=\"26\" fill=\"#ff8059\"/><path d=\"M236 43 V29 M236 113 V99 M201 78 H187 M285 78 H271\" stroke=\"#ff8059\" stroke-width=\"3\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"140\" fill=\"#a5a29c\">SCREEN</text><text x=\"296\" y=\"28\" text-anchor=\"end\" fill=\"#ff8059\">VALUE</text></g></svg>"
  },
  {
    "id": "4f-shock-eli5",
    "title": "The 4F Shock",
    "category": "Macroeconomics",
    "minutes": 10,
    "summary": "How fuel, fertilizer, food, and finance can turn a supply shock into a household cost problem — even when grain stocks look comfortable.",
    "bullets": [
      "The four Fs are linked, not four isolated shortages.",
      "Buffers buy time; they do not erase import exposure or fiscal cost.",
      "The useful question is where a bottleneck can be removed."
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "FUEL",
      "FOOD",
      "FINANCE"
    ],
    "file": "explainers/4f-shock-eli5.html",
    "date": "2026-10-15",
    "subcategory": "Supply chains",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Four linked pressure points feed a resilient economy.\"><path d=\"M52 78Q105 25 160 78T268 78\" fill=\"none\" stroke=\"#57534f\" stroke-width=\"3\"/><circle cx=\"52\" cy=\"78\" r=\"24\" fill=\"#ff8059\" opacity=\".25\" stroke=\"#ff8059\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"78\" r=\"32\" fill=\"#f87171\" opacity=\".2\" stroke=\"#f87171\" stroke-width=\"2\"/><circle cx=\"268\" cy=\"78\" r=\"24\" fill=\"#76d5c1\" opacity=\".25\" stroke=\"#76d5c1\" stroke-width=\"2\"/><path d=\"M38 120H282\" stroke=\"#f5c76a\" stroke-width=\"3\"/><text x=\"52\" y=\"83\" text-anchor=\"middle\" font-size=\"10\" fill=\"#f1eee8\">4F</text><text x=\"160\" y=\"83\" text-anchor=\"middle\" font-size=\"10\" fill=\"#f1eee8\">SHOCK</text><text x=\"268\" y=\"83\" text-anchor=\"middle\" font-size=\"10\" fill=\"#f1eee8\">BUFFER</text></svg>"
  },
  {
    "id": "oracle-ai-debt-bet-eli5",
    "title": "Why a profitable Oracle scares investors",
    "category": "Infrastructure",
    "minutes": 14,
    "summary": "Free-to-copy software swapped for debt-funded data centres.",
    "bullets": [
      "RPO is a promise; capex and interest are paid now",
      "The J-curve: build first, earn later, interest the whole way"
    ],
    "kind": "flow",
    "color": "#f87171",
    "nodes": [
      "ORDER BOOK",
      "BORROW & BUILD",
      "RENT OR BUST"
    ],
    "file": "explainers/oracle-ai-debt-bet-eli5.html",
    "date": "2026-10-10",
    "subcategory": "AI data centres",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"J-curve: cash dips below zero while the data centre is built on debt, then climbs once rent arrives\"><path d=\"M24 80H300\" stroke=\"#57534f\"/><path d=\"M36 80V130L78 115L120 100L162 85L176 80Z\" fill=\"#f87171\" opacity=\".35\"/><path d=\"M176 80L204 70L246 55L288 40V80Z\" fill=\"#ff8059\" opacity=\".25\"/><polyline points=\"36,130 78,115 120,100 162,85 204,70 246,55 288,40\" fill=\"none\" stroke=\"#ff8059\" stroke-width=\"2.5\"/><path d=\"M176 72V88\" stroke=\"#f1eee8\" stroke-width=\"1.5\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"40\" y=\"142\" fill=\"#f87171\">BUILD ON DEBT</text><text x=\"288\" y=\"28\" text-anchor=\"end\" fill=\"#ff8059\">RENT ARRIVES</text><text x=\"182\" y=\"96\" fill=\"#f1eee8\">BREAK-EVEN</text></g></svg>"
  },
  {
    "id": "real-gdp-eli5",
    "title": "How India turns rupees into real GDP",
    "category": "Macroeconomics",
    "minutes": 7,
    "summary": "No single inflation number: each sector gets its own price lens.",
    "bullets": [
      "Count value added, deflate each sector by its own prices",
      "Double deflation is a method; the deflator is a ratio; CPI is an index"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "NOMINAL",
      "SECTOR LENSES",
      "REAL"
    ],
    "file": "explainers/real-gdp-eli5.html",
    "date": "2026-10-06",
    "subcategory": "Measuring growth",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Each sector's output passes through its own price lens before the real values are stacked into real GDP\"><g fill=\"#ff8059\"><rect x=\"24\" y=\"28\" width=\"110\" height=\"16\" opacity=\".9\"/><rect x=\"24\" y=\"52\" width=\"36\" height=\"16\" opacity=\".7\"/><rect x=\"24\" y=\"76\" width=\"34\" height=\"16\" opacity=\".55\"/><rect x=\"24\" y=\"100\" width=\"24\" height=\"16\" opacity=\".4\"/></g><g stroke=\"#73706a\"><path d=\"M136 36H180M62 60H180M60 84H180M50 108H180\"/><path d=\"M200 36L262 52M200 60L262 79M200 84L262 94M200 108L262 106\"/></g><g fill=\"none\" stroke=\"#f1eee8\" stroke-width=\"1.5\"><circle cx=\"190\" cy=\"36\" r=\"9\"/><circle cx=\"190\" cy=\"60\" r=\"9\"/><circle cx=\"190\" cy=\"84\" r=\"9\"/><circle cx=\"190\" cy=\"108\" r=\"9\"/></g><g fill=\"#ff8059\"><rect x=\"264\" y=\"30\" width=\"18\" height=\"44\" opacity=\".9\"/><rect x=\"264\" y=\"74\" width=\"18\" height=\"15\" opacity=\".7\"/><rect x=\"264\" y=\"89\" width=\"18\" height=\"14\" opacity=\".55\"/><rect x=\"264\" y=\"103\" width=\"18\" height=\"10\" opacity=\".4\"/></g><g font-family=\"monospace\" font-size=\"9\" fill=\"#a5a29c\"><text x=\"24\" y=\"140\">EACH SECTOR</text><text x=\"190\" y=\"140\" text-anchor=\"middle\">OWN PRICE LENS</text><text x=\"273\" y=\"140\" text-anchor=\"middle\">REAL</text></g></svg>"
  },
  {
    "id": "how-money-actually-works-in-india",
    "title": "How money actually works in India",
    "category": "Monetary Architecture",
    "minutes": 66,
    "summary": "Money is layered promises: RBI money, bank deposits, government accounts.",
    "bullets": [
      "A loan creates a matching bank deposit",
      "RBI money settles between banks; deposits are what people spend"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "RBI",
      "BANKS",
      "YOU"
    ],
    "file": "explainers/how-money-actually-works-in-india.html",
    "date": "2026-09-16",
    "subcategory": "Money creation",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"A wide layer of bank deposits rests on a much narrower base of RBI money\"><rect x=\"40\" y=\"40\" width=\"240\" height=\"26\" fill=\"#ff8059\" opacity=\".8\"/><path d=\"M40 66L115 94M280 66L205 94\" fill=\"none\" stroke=\"#57534f\"/><rect x=\"115\" y=\"94\" width=\"90\" height=\"26\" fill=\"#f5c76a\" opacity=\".85\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"40\" y=\"30\" fill=\"#ff8059\">BANK DEPOSITS</text><text x=\"160\" y=\"138\" text-anchor=\"middle\" fill=\"#f5c76a\">RBI MONEY</text></g></svg>"
  },
  {
    "id": "fcnr-b-swap-for-school-kids-eli5",
    "title": "FCNR(B) swaps: who actually owes whom?",
    "category": "Monetary Architecture",
    "minutes": 4,
    "summary": "Draw the contracts first, then give each debt to the right party.",
    "bullets": [
      "Three parties: NRI depositor, Indian bank, RBI",
      "The deposit and the FX swap are separate contracts"
    ],
    "kind": "flow",
    "color": "#f5c76a",
    "nodes": [
      "NRI",
      "BANK",
      "RBI"
    ],
    "file": "explainers/fcnr-b-swap-for-school-kids-eli5.html",
    "date": "2026-09-16",
    "subcategory": "Currency swaps",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Dollars go from the NRI depositor to the bank and on to the RBI in a swap, rupees come back, and the dollars are owed back later\"><path d=\"M70 66H144M138 62L144 66L138 70\" fill=\"none\" stroke=\"#f5c76a\"/><path d=\"M146 82Q108 106 70 82M76 82L70 82L73 88\" fill=\"none\" stroke=\"#f5c76a\" stroke-dasharray=\"3 3\"/><path d=\"M174 66H248M242 62L248 66L242 70\" fill=\"none\" stroke=\"#f5c76a\"/><path d=\"M250 80H176M182 76L176 80L182 84\" fill=\"none\" stroke=\"#76d5c1\"/><circle cx=\"56\" cy=\"72\" r=\"12\" fill=\"#181818\" stroke=\"#f5c76a\"/><circle cx=\"160\" cy=\"72\" r=\"12\" fill=\"#181818\" stroke=\"#f1eee8\"/><circle cx=\"264\" cy=\"72\" r=\"12\" fill=\"#181818\" stroke=\"#c3b8ff\"/><g font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\" fill=\"#a5a29c\"><text x=\"56\" y=\"116\">NRI</text><text x=\"160\" y=\"116\">BANK</text><text x=\"264\" y=\"116\">RBI</text></g></svg>"
  },
  {
    "id": "blackrock-15-trillion-money-making-machine-eli5",
    "title": "BlackRock’s $15 trillion machine",
    "category": "Monetary Architecture",
    "minutes": 7,
    "summary": "Managing $15 trillion is not owning it: tiny fee, huge base.",
    "bullets": [
      "Assets under management are clients’ money, not BlackRock’s own",
      "Risk models and ETFs turn tiny fees into a giant business"
    ],
    "kind": "flow",
    "color": "#c3b8ff",
    "nodes": [
      "RISK",
      "INFRASTRUCTURE",
      "ETFS"
    ],
    "file": "explainers/blackrock-15-trillion-money-making-machine-eli5.html",
    "date": "2026-09-16",
    "subcategory": "Asset managers",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"A thin fee skimmed off a huge pool of client money gathers into one solid block of revenue\"><rect x=\"24\" y=\"44\" width=\"200\" height=\"80\" fill=\"#c3b8ff\" opacity=\".18\"/><path d=\"M24 64H224M24 84H224M24 104H224M64 44V124M104 44V124M144 44V124M184 44V124\" fill=\"none\" stroke=\"#c3b8ff\" opacity=\".25\"/><rect x=\"24\" y=\"38\" width=\"200\" height=\"4\" fill=\"#f5c76a\"/><path d=\"M228 40H262V78M258 72L262 78L266 72\" fill=\"none\" stroke=\"#f5c76a\"/><rect x=\"252\" y=\"84\" width=\"20\" height=\"40\" fill=\"#f5c76a\" opacity=\".85\"/><path d=\"M24 124H296\" stroke=\"#57534f\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"30\" fill=\"#f5c76a\">TINY FEE</text><text x=\"24\" y=\"140\" fill=\"#a5a29c\">$15T MANAGED</text><text x=\"296\" y=\"140\" text-anchor=\"end\" fill=\"#f5c76a\">BIG BUSINESS</text></g></svg>"
  },
  {
    "id": "eli5-india-gdp-78",
    "title": "India grew 7.8%. Why is everyone fighting?",
    "category": "Macroeconomics",
    "minutes": 6,
    "summary": "The headline says boom. The fight is over the price eraser.",
    "bullets": [
      "Real growth is counted growth minus a price eraser",
      "Critics say this quarter’s eraser was too small"
    ],
    "kind": "flow",
    "color": "#76d5c1",
    "nodes": [
      "COUNTED",
      "ERASER",
      "REAL"
    ],
    "file": "explainers/eli5-india-gdp-78.html",
    "date": "2026-09-16",
    "subcategory": "Measuring growth",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Counted growth of 10.3 percent minus a 2.5 percent price eraser leaves 7.8 percent real growth\"><path d=\"M40 124H280\" stroke=\"#57534f\"/><rect x=\"56\" y=\"36\" width=\"64\" height=\"88\" fill=\"#c3b8ff\" opacity=\".55\"/><rect x=\"196\" y=\"57\" width=\"64\" height=\"67\" fill=\"#76d5c1\" opacity=\".8\"/><rect x=\"196\" y=\"36\" width=\"64\" height=\"21\" fill=\"none\" stroke=\"#f5c76a\" stroke-dasharray=\"3 3\"/><path d=\"M120 36H196\" fill=\"none\" stroke=\"#57534f\" stroke-dasharray=\"2 4\"/><g font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\"><text x=\"88\" y=\"140\" fill=\"#c3b8ff\">10.3% COUNTED</text><text x=\"228\" y=\"140\" fill=\"#76d5c1\">7.8% REAL</text><text x=\"228\" y=\"28\" fill=\"#f5c76a\">2.5% ERASER</text></g></svg>"
  },
  {
    "id": "eli5-lithium-ion-battery",
    "title": "How a lithium-ion battery works",
    "category": "Energy & Physics",
    "minutes": 5,
    "summary": "Ions cross inside the cell so electrons can run your gadget.",
    "bullets": [
      "Ions take the inside road; electrons take the wire",
      "Charging pushes both back the other way"
    ],
    "kind": "flow",
    "color": "#76d5c1",
    "nodes": [
      "ANODE",
      "LOAD",
      "CATHODE"
    ],
    "file": "explainers/eli5-lithium-ion-battery.html",
    "date": "2026-09-16",
    "subcategory": "Batteries",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Electrons run around the outside wire through the gadget while lithium ions cross inside the cell\"><rect x=\"60\" y=\"70\" width=\"200\" height=\"54\" rx=\"6\" fill=\"none\" stroke=\"#73706a\"/><path d=\"M160 74V120\" fill=\"none\" stroke=\"#73706a\" stroke-dasharray=\"3 3\"/><rect x=\"66\" y=\"76\" width=\"20\" height=\"42\" fill=\"#57534f\"/><rect x=\"234\" y=\"76\" width=\"20\" height=\"42\" fill=\"#57534f\"/><path d=\"M76 76V44H244V76\" fill=\"none\" stroke=\"#c3b8ff\" stroke-width=\"1.5\"/><circle cx=\"160\" cy=\"44\" r=\"9\" fill=\"#181818\" stroke=\"#f1eee8\"/><g fill=\"#c3b8ff\"><circle cx=\"108\" cy=\"44\" r=\"3\"/><circle cx=\"208\" cy=\"44\" r=\"3\"/></g><path d=\"M116 40L122 44L116 48M216 40L222 44L216 48\" fill=\"none\" stroke=\"#c3b8ff\"/><g fill=\"#76d5c1\"><circle cx=\"112\" cy=\"90\" r=\"4\"/><circle cx=\"138\" cy=\"100\" r=\"4\"/><circle cx=\"184\" cy=\"92\" r=\"4\"/><circle cx=\"208\" cy=\"102\" r=\"4\"/></g><path d=\"M120 112H200M194 108L200 112L194 116\" fill=\"none\" stroke=\"#76d5c1\"/><g font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\"><text x=\"160\" y=\"28\" fill=\"#c3b8ff\">ELECTRONS OUTSIDE</text><text x=\"160\" y=\"140\" fill=\"#76d5c1\">IONS INSIDE</text></g></svg>"
  },
  {
    "id": "openai-hugging-face-incident",
    "title": "The test that talked to itself",
    "category": "AI & Frontier",
    "minutes": 4,
    "summary": "Sealed-off AI agents found a shared vent and broke out.",
    "bullets": [
      "A shared cache let isolated agents pass notes",
      "It was cheating on an exam, not a conquest"
    ],
    "kind": "flow",
    "color": "#f5c76a",
    "nodes": [
      "SANDBOX",
      "CACHE",
      "CLUSTER"
    ],
    "file": "explainers/openai%20hugging%20face%20incident.html",
    "date": "2026-09-16",
    "subcategory": "AI safety",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Agents in sealed rooms pass notes through a shared cache underneath, and one path leads out to Hugging Face\"><g fill=\"none\" stroke=\"#73706a\"><rect x=\"36\" y=\"40\" width=\"64\" height=\"56\" rx=\"4\"/><rect x=\"116\" y=\"40\" width=\"64\" height=\"56\" rx=\"4\"/><rect x=\"196\" y=\"40\" width=\"64\" height=\"56\" rx=\"4\"/></g><g fill=\"#76d5c1\"><circle cx=\"68\" cy=\"68\" r=\"6\"/><circle cx=\"148\" cy=\"68\" r=\"6\"/><circle cx=\"228\" cy=\"68\" r=\"6\"/></g><path d=\"M68 74V112M148 74V112M228 74V112\" fill=\"none\" stroke=\"#f5c76a\" stroke-dasharray=\"3 3\"/><rect x=\"36\" y=\"112\" width=\"224\" height=\"8\" fill=\"#f5c76a\" opacity=\".8\"/><path d=\"M260 116H284V40M280 46L284 40L288 46\" fill=\"none\" stroke=\"#f87171\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"36\" y=\"30\" fill=\"#a5a29c\">SEALED ROOMS</text><text x=\"36\" y=\"140\" fill=\"#f5c76a\">SHARED CACHE</text><text x=\"292\" y=\"30\" text-anchor=\"end\" fill=\"#f87171\">HUGGING FACE</text></g></svg>"
  },
  {
    "id": "openai-navier-stokes-claim-and-critique-eli5",
    "title": "What OpenAI says it solved about Navier–Stokes",
    "category": "AI & Frontier",
    "minutes": 7,
    "summary": "One pushed vortex makes the fluid equations break, not ordinary water.",
    "bullets": [
      "The outside push makes it less natural, but the prize rules allow it",
      "Claim and critique are talking past each other"
    ],
    "kind": "flow",
    "color": "#c3b8ff",
    "nodes": [
      "FLOW",
      "VORTEX",
      "BLOW-UP"
    ],
    "file": "explainers/openai-navier-stokes-claim-and-critique-eli5.html",
    "date": "2026-09-16",
    "subcategory": "Research claims",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Smooth flow lines are squeezed into one point where the predicted speed has no limit\"><path d=\"M24 40C120 42 200 70 250 80M24 60C120 62 200 76 250 80M24 80H250M24 100C120 98 200 84 250 80M24 120C120 118 200 90 250 80\" fill=\"none\" stroke=\"#c3b8ff\" opacity=\".6\"/><path d=\"M200 70C220 75 236 78 250 80M200 90C220 85 236 82 250 80\" fill=\"none\" stroke=\"#ff8059\" stroke-width=\"1.5\"/><circle cx=\"250\" cy=\"80\" r=\"5\" fill=\"#ff8059\"/><path d=\"M262 80H282M258 70L272 58M258 90L272 102\" fill=\"none\" stroke=\"#ff8059\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"28\" fill=\"#c3b8ff\">SMOOTH START</text><text x=\"250\" y=\"140\" text-anchor=\"middle\" fill=\"#ff8059\">BLOW-UP?</text></g></svg>"
  },
  {
    "id": "power-grid-balance-eli5",
    "title": "Why the power grid needs balance",
    "category": "Infrastructure",
    "minutes": 3,
    "summary": "Electricity is a live coordination problem.",
    "bullets": [
      "Supply and demand must balance in real time",
      "Frequency helps reveal an imbalance"
    ],
    "kind": "flow",
    "color": "#f5c76a",
    "nodes": [
      "SUPPLY",
      "FREQUENCY",
      "DEMAND"
    ],
    "file": "explainers/power-grid-balance-eli5.html",
    "date": "2026-10-06",
    "subcategory": "Power grid",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Grid frequency dips when demand runs ahead of supply and rises when supply runs ahead\"><path d=\"M24 70H296\" fill=\"none\" stroke=\"#57534f\" stroke-dasharray=\"3 4\"/><path d=\"M24 70C50 70 60 70 80 70S110 96 140 94S180 72 200 70S240 48 260 50S290 70 296 70\" fill=\"none\" stroke=\"#f5c76a\" stroke-width=\"2\"/><rect x=\"24\" y=\"106\" width=\"130\" height=\"8\" fill=\"#76d5c1\"/><rect x=\"24\" y=\"120\" width=\"150\" height=\"8\" fill=\"#ff8059\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"28\" fill=\"#f5c76a\">FREQUENCY</text><text x=\"162\" y=\"114\" fill=\"#76d5c1\">SUPPLY</text><text x=\"182\" y=\"128\" fill=\"#ff8059\">DEMAND</text></g></svg>"
  },
  {
    "id": "the-transformer-industrys-hidden-bkt-eli5",
    "title": "The hidden economics of power transformers",
    "category": "Infrastructure",
    "minutes": 6,
    "summary": "Premium custom units and a fast factory: two engines of return.",
    "bullets": [
      "Return on capital is margin times asset turns",
      "The figures are the author’s claims, not verified proof"
    ],
    "kind": "flow",
    "color": "#ff8059",
    "nodes": [
      "MARGIN",
      "TURNS",
      "ROCE"
    ],
    "file": "explainers/the-transformer-industrys-hidden-bkt-eli5.html",
    "date": "2026-09-16",
    "subcategory": "Power grid",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Return on capital is the area of a rectangle: profit margin along one side times asset turns along the other\"><path d=\"M100 124H240M100 124V30\" fill=\"none\" stroke=\"#57534f\"/><rect x=\"100\" y=\"44\" width=\"120\" height=\"80\" fill=\"#f5c76a\" opacity=\".35\"/><path d=\"M100 124H220\" fill=\"none\" stroke=\"#ff8059\" stroke-width=\"3\"/><path d=\"M100 124V44\" fill=\"none\" stroke=\"#76d5c1\" stroke-width=\"3\"/><g font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\"><text x=\"160\" y=\"140\" fill=\"#ff8059\">MARGIN</text><text x=\"160\" y=\"88\" fill=\"#f1eee8\">= ROCE</text><text x=\"130\" y=\"28\" fill=\"#76d5c1\">ASSET TURNS</text></g></svg>"
  },
  {
    "id": "hermes-newswire-eli5",
    "title": "Hermes Newswire: a headline belt you can trust",
    "category": "Distributed Systems",
    "minutes": 6,
    "summary": "Messy public feeds in, checked plain-text headlines out.",
    "bullets": [
      "Every story takes one narrow path: receive, normalise, present",
      "The approved IP is pinned so DNS can’t change its answer"
    ],
    "kind": "flow",
    "color": "#76d5c1",
    "nodes": [
      "RECEIVE",
      "NORMALISE",
      "PRESENT"
    ],
    "file": "explainers/hermes-newswire-eli5.html",
    "date": "2026-09-16",
    "subcategory": "Feed pipelines",
    "card": "<svg viewBox=\"0 0 320 155\" role=\"img\" aria-label=\"Messy feeds squeeze through one safety gate and come out as a single clean line of headlines on a belt\"><path d=\"M24 36C70 40 110 70 146 78M24 62C70 60 110 76 146 79M24 96C70 98 110 84 146 81M24 124C70 120 110 90 146 82\" fill=\"none\" stroke=\"#ff8059\" opacity=\".55\"/><rect x=\"148\" y=\"32\" width=\"6\" height=\"40\" fill=\"#f1eee8\"/><rect x=\"148\" y=\"88\" width=\"6\" height=\"40\" fill=\"#f1eee8\"/><path d=\"M156 80H222\" fill=\"none\" stroke=\"#76d5c1\" stroke-width=\"2\"/><rect x=\"222\" y=\"68\" width=\"74\" height=\"24\" rx=\"3\" fill=\"none\" stroke=\"#76d5c1\"/><path d=\"M230 80h12M248 80h12M266 80h12M284 80h6\" fill=\"none\" stroke=\"#76d5c1\"/><g font-family=\"monospace\" font-size=\"9\"><text x=\"24\" y=\"28\" fill=\"#ff8059\">MESSY FEEDS</text><text x=\"151\" y=\"142\" text-anchor=\"middle\" fill=\"#f1eee8\">SAFETY GATE</text><text x=\"259\" y=\"112\" text-anchor=\"middle\" fill=\"#76d5c1\">HEADLINES</text></g></svg>"
  }
];
