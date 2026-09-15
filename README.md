# ELI5 Visual Lab 🔬

[![Production Site](https://img.shields.io/badge/Vercel-Live%20Site-black?style=flat-square&logo=vercel)](https://eli5-seven-mu.vercel.app)
[![Explainers](https://img.shields.io/badge/Explainers-9%20Interactive%20Models-6366f1?style=flat-square)](https://eli5-seven-mu.vercel.app)
[![Architecture](https://img.shields.io/badge/Architecture-100%25%20Serverless%20Static-10b981?style=flat-square)](https://eli5-seven-mu.vercel.app)

> **Live Website:** [https://eli5-seven-mu.vercel.app](https://eli5-seven-mu.vercel.app)

**Complex Systems, Explained Visually.** Interactive visual mental models breaking down frontier AI benchmarks, monetary mechanics, high-voltage electrical physics, and macroeconomics. 100% client-side, zero backend required, deployed to Vercel in seconds.

---

## ⚡ Features

- **9 Production-Ready Interactive Explainers**:
  1. *BlackRock’s $15 Trillion Machine* (Aladdin, index custody, voting power)
  2. *What OpenAI Claims It Solved: Navier–Stokes* (Fluid turbulence & Millennium Prize)
  3. *How a Lithium-Ion Battery Works* (Chemical pump, anode/cathode highways)
  4. *India's 7.8% GDP Fight* (GDP vs GVA, price deflators, K-shaped recovery)
  5. *The Test That Talked to Itself* (OpenAI & Hugging Face benchmark sandbox leakage)
  6. *Transformer Economics: The Hidden Bottleneck* (Grid infrastructure & custom integration)
  7. *FCNR(B) Swaps: Who Owes Whom?* (Central bank wiring & forex reserves)
  8. *Hermes Newswire Pipeline* (High-speed financial data ingestion & deduplication)
  9. *Transformer Boom: Factory Floor Notes* (Capital velocity & lead time dynamics)

- **Interactive Reader Mode**:
  - Reading progress bar
  - Keyboard navigation (`Esc` to exit, `←` / `→` to flip explainers)
  - Deep linking support (`#slug` and `?id=slug`)
  - Direct fullscreen/standalone viewing

- **Instant Search & Topic Filtering**:
  - Search by keyword, title, tag, or takeaway
  - Filter by Category (AI, Finance, Macro, Science, Power, Systems)
  - Sort by Featured, Shortest Read, Deep Dives, Alphabetical

- **Add Explainer Studio**:
  - Live sandbox to preview any HTML explainer instantly
  - Saves custom explainers to local browser storage
  - Starter skeleton generator with one-click copy

- **Zero Backend Required**:
  - 100% static client-side architecture
  - No databases to provision or maintain
  - Deploys instantly to Vercel Edge Network

---

## 🚀 How to Add a New Explainer

1. **Create your HTML file**:
   Save your standalone visual explainer in the `explainers/` directory (e.g. `explainers/quantum-computing-eli5.html`).

2. **Add metadata to `data/explainers.js`**:
   ```javascript
   {
     id: "quantum-computing",
     title: "How Quantum Computers Work — ELI5",
     category: "ai",
     categoryLabel: "Quantum & Tech",
     badge: "Quantum Physics",
     tagline: "Qubits, superposition, and entanglement without the linear algebra.",
     summary: "A 4-minute visual model of quantum computing for normal humans.",
     highlights: [
       "Superposition: Coins spinning on a table",
       "Entanglement: Connected dice across the universe",
       "Decoherence: Why heat is the ultimate enemy"
     ],
     readTime: "4 min",
     filename: "quantum-computing-eli5.html",
     url: "explainers/quantum-computing-eli5.html",
     accentColor: "#a855f7",
     glowColor: "rgba(168, 85, 247, 0.25)",
     featured: false
   }
   ```

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Add Quantum Computing explainer"
   git push
   ```
   Or run:
   ```bash
   npx vercel --prod
   ```

---

## 🛠 Local Development

```bash
# Start a local static server
npx serve .
```
Visit `http://localhost:3000`.
