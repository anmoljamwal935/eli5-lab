// ELI5 Visual Lab — Editorial Application Logic

(function() {
  'use strict';

  // Micro-diagram SVG generators for each explainer (NYT / Quanta / The Pudding style)
  const MICRO_DIAGRAMS = {
    'how-money-actually-works-in-india': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <!-- RBI Liability Layer -->
        <rect x="15" y="10" width="130" height="20" rx="3" fill="rgba(179, 75, 13, 0.12)" stroke="var(--accent-amber)" stroke-width="1.5"/>
        <text x="80" y="23" font-family="var(--font-mono)" font-size="8" fill="var(--accent-amber)" text-anchor="middle" font-weight="600">RBI: Reserves & Notes</text>

        <!-- Settlement Channel -->
        <path d="M150 20 H180" stroke="var(--border-strong)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <polygon points="182,20 176,17 176,23" fill="var(--border-strong)"/>
        
        <!-- Interbank Settlement -->
        <rect x="185" y="10" width="120" height="20" rx="3" fill="rgba(13, 148, 136, 0.12)" stroke="var(--accent-emerald)" stroke-width="1.5"/>
        <text x="245" y="23" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" text-anchor="middle" font-weight="600">Interbank Settlement</text>

        <!-- Commercial Bank Deposits Layer -->
        <rect x="15" y="38" width="290" height="20" rx="3" fill="rgba(59, 130, 246, 0.1)" stroke="var(--accent-blue)" stroke-width="1.5"/>
        <text x="160" y="51" font-family="var(--font-mono)" font-size="8" fill="var(--accent-blue)" text-anchor="middle" font-weight="600">Commercial Bank Lending → Spendable Deposits (M3)</text>
      </svg>
    `,
    'blackrock-15-trillion-machine': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <circle cx="45" cy="32" r="22" stroke="var(--accent-blue)" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="45" cy="32" r="8" fill="var(--accent-blue)" opacity="0.2"/>
        <text x="45" y="35" font-family="var(--font-mono)" font-size="9" fill="var(--ink-primary)" text-anchor="middle" font-weight="600">Aladdin</text>
        
        <path d="M70 32 H110" stroke="var(--border-strong)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <polygon points="112,32 106,29 106,35" fill="var(--border-strong)"/>
        
        <circle cx="160" cy="32" r="22" stroke="var(--accent-blue)" stroke-width="2"/>
        <text x="160" y="31" font-family="var(--font-mono)" font-size="9" fill="var(--ink-primary)" text-anchor="middle" font-weight="600">$10T</text>
        <text x="160" y="41" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)" text-anchor="middle">Custody</text>
        
        <path d="M185 32 H225" stroke="var(--border-strong)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <polygon points="227,32 221,29 221,35" fill="var(--border-strong)"/>
        
        <circle cx="275" cy="32" r="22" stroke="var(--accent-blue)" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="275" y="31" font-family="var(--font-mono)" font-size="9" fill="var(--ink-primary)" text-anchor="middle" font-weight="600">Proxy</text>
        <text x="275" y="41" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)" text-anchor="middle">Voting</text>
      </svg>
    `,
    'openai-navier-stokes': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <path d="M20 12 C100 12, 140 30, 160 32 C180 34, 220 52, 300 52" stroke="var(--accent-purple)" stroke-width="2"/>
        <path d="M20 52 C100 52, 140 34, 160 32 C180 30, 220 12, 300 12" stroke="var(--accent-purple)" stroke-width="2"/>
        <circle cx="160" cy="32" r="7" fill="var(--accent-purple)" opacity="0.2" stroke="var(--accent-purple)" stroke-width="1.5"/>
        <circle cx="160" cy="32" r="2" fill="var(--accent-purple)"/>
        <text x="160" y="20" font-family="var(--font-mono)" font-size="8" fill="var(--accent-purple)" text-anchor="middle" font-weight="600">Blowup Point (Singularity?)</text>
        <path d="M60 22 L75 22 M70 19 L75 22 L70 25" stroke="var(--ink-muted)" stroke-width="1.2"/>
        <path d="M245 42 L260 42 M255 39 L260 42 L255 45" stroke="var(--ink-muted)" stroke-width="1.2"/>
      </svg>
    `,
    'lithium-ion-battery': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <!-- Anode -->
        <rect x="25" y="14" width="80" height="36" rx="4" fill="rgba(13, 148, 136, 0.1)" stroke="var(--accent-emerald)" stroke-width="1.5"/>
        <text x="65" y="30" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" text-anchor="middle" font-weight="600">ANODE</text>
        <text x="65" y="42" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)" text-anchor="middle">Graphite Cages</text>
        
        <!-- Separator -->
        <line x1="160" y1="10" x2="160" y2="54" stroke="var(--border-strong)" stroke-width="2" stroke-dasharray="3 3"/>
        
        <!-- Ion stream -->
        <path d="M110 32 H150" stroke="var(--accent-emerald)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle cx="130" cy="32" r="4" fill="var(--accent-emerald)"/>
        <text x="130" y="24" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" text-anchor="middle">Li+</text>
        
        <!-- Cathode -->
        <rect x="215" y="14" width="80" height="36" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="var(--accent-blue)" stroke-width="1.5"/>
        <text x="255" y="30" font-family="var(--font-mono)" font-size="8" fill="var(--accent-blue)" text-anchor="middle" font-weight="600">CATHODE</text>
        <text x="255" y="42" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)" text-anchor="middle">Metal Oxide</text>
      </svg>
    `,
    'india-gdp-78': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <!-- Nominal bar -->
        <rect x="20" y="16" width="220" height="14" rx="2" fill="rgba(59, 130, 246, 0.2)" stroke="var(--accent-blue)" stroke-width="1.2"/>
        <text x="28" y="27" font-family="var(--font-mono)" font-size="8" fill="var(--accent-blue)" font-weight="600">Nominal Output: 10.3%</text>
        
        <!-- Eraser bracket -->
        <rect x="180" y="16" width="60" height="14" rx="2" fill="rgba(245, 158, 11, 0.3)" stroke="var(--accent-amber)" stroke-width="1.2"/>
        <text x="210" y="27" font-family="var(--font-mono)" font-size="7" fill="var(--accent-amber)" text-anchor="middle" font-weight="600">Deflator: -2.5%</text>

        <!-- Real bar -->
        <rect x="20" y="38" width="160" height="14" rx="2" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-emerald)" stroke-width="1.2"/>
        <text x="28" y="49" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" font-weight="600">Real Headline GDP: 7.8%</text>
      </svg>
    `,
    'openai-hugging-face-incident': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <rect x="30" y="14" width="85" height="36" rx="3" stroke="var(--accent-rose)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="72" y="35" font-family="var(--font-mono)" font-size="9" fill="var(--accent-rose)" text-anchor="middle">Agent Room A</text>
        
        <!-- Leaked channel -->
        <path d="M120 32 H200" stroke="var(--accent-rose)" stroke-width="2"/>
        <circle cx="160" cy="32" r="5" fill="var(--accent-rose)"/>
        <text x="160" y="22" font-family="var(--font-mono)" font-size="7" fill="var(--accent-rose)" text-anchor="middle" font-weight="600">UNSEALED PORT</text>
        
        <rect x="205" y="14" width="85" height="36" rx="3" stroke="var(--accent-rose)" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="247" y="35" font-family="var(--font-mono)" font-size="9" fill="var(--accent-rose)" text-anchor="middle">Agent Room B</text>
      </svg>
    `,
    'transformer-economics': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <!-- Input coil -->
        <path d="M40 46 C40 18, 70 18, 70 46 C70 18, 100 18, 100 46" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="70" y="58" font-family="var(--font-mono)" font-size="7" fill="var(--accent-amber)" text-anchor="middle">Primary 33kV</text>

        <!-- Core -->
        <line x1="135" y1="12" x2="135" y2="52" stroke="var(--border-strong)" stroke-width="3"/>
        <line x1="145" y1="12" x2="145" y2="52" stroke="var(--border-strong)" stroke-width="3"/>

        <!-- Output coil -->
        <path d="M180 46 C180 14, 205 14, 205 46 C205 14, 230 14, 230 46 C230 14, 255 14, 255 46" stroke="var(--accent-blue)" stroke-width="2"/>
        <text x="218" y="58" font-family="var(--font-mono)" font-size="7" fill="var(--accent-blue)" text-anchor="middle">Step-Up 400kV Grid</text>
      </svg>
    `,
    'fcnr-b-swaps': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <circle cx="50" cy="32" r="18" stroke="var(--accent-blue)" stroke-width="1.5"/>
        <text x="50" y="35" font-family="var(--font-mono)" font-size="8" fill="var(--ink-primary)" text-anchor="middle">NRI $</text>
        
        <path d="M72 32 H138" stroke="var(--ink-muted)" stroke-width="1.5"/>
        <polygon points="140,32 134,29 134,35" fill="var(--ink-muted)"/>
        <text x="105" y="24" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)" text-anchor="middle">Deposit</text>

        <circle cx="160" cy="32" r="18" stroke="var(--accent-emerald)" stroke-width="1.5"/>
        <text x="160" y="35" font-family="var(--font-mono)" font-size="8" fill="var(--ink-primary)" text-anchor="middle">Bank</text>

        <path d="M182 32 H248" stroke="var(--accent-amber)" stroke-width="1.5"/>
        <polygon points="250,32 244,29 244,35" fill="var(--accent-amber)"/>
        <text x="215" y="24" font-family="var(--font-mono)" font-size="7" fill="var(--accent-amber)" text-anchor="middle">Swap</text>

        <circle cx="270" cy="32" r="18" stroke="var(--accent-amber)" stroke-width="1.5"/>
        <text x="270" y="35" font-family="var(--font-mono)" font-size="8" fill="var(--ink-primary)" text-anchor="middle">RBI</text>
      </svg>
    `,
    'hermes-newswire': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <!-- Inputs -->
        <line x1="20" y1="20" x2="80" y2="28" stroke="var(--ink-muted)" stroke-width="1.5"/>
        <line x1="20" y1="32" x2="80" y2="32" stroke="var(--ink-muted)" stroke-width="1.5"/>
        <line x1="20" y1="44" x2="80" y2="36" stroke="var(--ink-muted)" stroke-width="1.5"/>
        <text x="35" y="14" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)">Feeds</text>

        <!-- Funnel Hash -->
        <polygon points="90,16 150,26 150,38 90,48" stroke="var(--accent-blue)" stroke-width="1.5" fill="rgba(59,130,246,0.08)"/>
        <text x="120" y="35" font-family="var(--font-mono)" font-size="8" fill="var(--accent-blue)" text-anchor="middle">Dedupe</text>

        <!-- Stream -->
        <path d="M155 32 H280" stroke="var(--accent-emerald)" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="285,32 277,28 277,36" fill="var(--accent-emerald)"/>
        <text x="220" y="24" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" font-weight="600">Terminal Stream</text>
      </svg>
    `,
    'transformer-floor-notes': `
      <svg viewBox="0 0 320 64" width="100%" height="100%" fill="none" stroke="currentColor">
        <rect x="30" y="16" width="220" height="12" rx="2" fill="var(--bg-subtle)" stroke="var(--border-strong)" stroke-width="1"/>
        <text x="36" y="25" font-family="var(--font-mono)" font-size="7" fill="var(--ink-muted)">Legacy Competitor: 180-Day Cash Cycle</text>

        <rect x="30" y="36" width="90" height="14" rx="2" fill="rgba(13,148,136,0.2)" stroke="var(--accent-emerald)" stroke-width="1.5"/>
        <text x="36" y="47" font-family="var(--font-mono)" font-size="8" fill="var(--accent-emerald)" font-weight="600">Shilchar: 60-Day Cycle</text>
        <text x="130" y="47" font-family="var(--font-mono)" font-size="7" fill="var(--accent-emerald)">3x Faster Turnaround</text>
      </svg>
    `
  };

  // State
  let explainers = [...EXPLAINERS];
  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'featured';
  let currentReaderIndex = -1;

  // Restore custom local items if any
  try {
    const saved = localStorage.getItem('eli5_custom_explainers');
    if (saved) {
      const items = JSON.parse(saved);
      if (Array.isArray(items) && items.length > 0) {
        explainers = [...items, ...explainers];
      }
    }
  } catch (e) {}

  // DOM Elements
  const leadContainer = document.getElementById('lead-feature-container');
  const gridEl = document.getElementById('essays-grid');
  const categoryTabsContainer = document.getElementById('category-tabs');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');
  const navSearchInput = document.getElementById('nav-search-input');

  // Reader elements
  const readerModal = document.getElementById('reader-modal');
  const readerIframe = document.getElementById('reader-iframe');
  const readerTitle = document.getElementById('reader-title');
  const readerProgressBar = document.getElementById('reader-progress-bar');
  const btnCloseReader = document.getElementById('btn-close-reader');
  const btnReaderPrev = document.getElementById('btn-reader-prev');
  const btnReaderNext = document.getElementById('btn-reader-next');
  const btnReaderExternal = document.getElementById('btn-reader-external');
  const btnReaderShare = document.getElementById('btn-reader-share');

  // Studio elements
  const studioModal = document.getElementById('studio-modal');
  const btnOpenStudio = document.getElementById('btn-open-studio');
  const btnCloseStudio = document.getElementById('btn-close-studio');
  const studioHtmlInput = document.getElementById('studio-html-input');
  const studioTitleInput = document.getElementById('studio-title-input');
  const studioCategoryInput = document.getElementById('studio-category-input');
  const studioSummaryInput = document.getElementById('studio-summary-input');
  const previewIframe = document.getElementById('studio-preview-iframe');
  const btnSaveLocal = document.getElementById('btn-save-local');
  const btnCopyTemplate = document.getElementById('btn-copy-template');

  // Theme
  const btnThemeToggle = document.getElementById('btn-theme-toggle');

  // Categories
  const CATEGORIES = [\n    { id: 'all', label: 'All Essays' },\n    { id: 'ai', label: 'AI & Frontier' },\n    { id: 'finance', label: 'Monetary & Capital' },\n    { id: 'economics', label: 'Macro' },\n    { id: 'science', label: 'Physics & Energy' },\n    { id: 'industry', label: 'Infrastructure' },\n    { id: 'systems', label: 'Systems' }\n  ];

  function getCategoryCounts() {
    const counts = { all: explainers.length };
    explainers.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }

  function renderCategoryPills() {
    const counts = getCategoryCounts();
    categoryTabsContainer.innerHTML = CATEGORIES.map(cat => {
      const count = counts[cat.id] || 0;
      if (count === 0 && cat.id !== 'all') return '';
      const isActive = activeCategory === cat.id ? 'active' : '';
      return `
        <button class="filter-btn ${isActive}" data-category="${cat.id}">
          <span>${cat.label}</span>
          <span class="badge-count">${count}</span>
        </button>
      `;
    }).join('');

    categoryTabsContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderCategoryPills();
        renderGrid();
      });
    });
  }

  window.filterByCategory = function(catId) {
    activeCategory = catId;
    renderCategoryPills();
    renderGrid();
    window.scrollTo({ top: categoryTabsContainer.offsetTop - 80, behavior: 'smooth' });
  };

  function getFilteredExplainers() {
    let filtered = explainers.filter(item => {
      const catMatch = activeCategory === 'all' || item.category === activeCategory;
      if (!catMatch) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return item.title.toLowerCase().includes(q) ||
             (item.tagline || '').toLowerCase().includes(q) ||
             (item.summary || '').toLowerCase().includes(q) ||
             (item.badge || '').toLowerCase().includes(q);
    });

    filtered.sort((a, b) => {
      if (sortBy === 'shortest') {
        return (parseInt(a.readTime) || 5) - (parseInt(b.readTime) || 5);
      } else if (sortBy === 'longest') {
        return (parseInt(b.readTime) || 5) - (parseInt(a.readTime) || 5);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return filtered;
  }

  // Render Lead Feature
  function renderLeadFeature() {
    const lead = explainers.find(e => e.featured) || explainers[0];
    if (!lead) {
      leadContainer.innerHTML = '';
      return;
    }

    const microDiagram = MICRO_DIAGRAMS[lead.id] || `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--ink-muted);">
        Interactive Mental Model Simulation
      </div>
    `;

    leadContainer.innerHTML = `
      <article class="lead-card">
        <div class="lead-content">
          <div>
            <div class="lead-kicker">
              <span>Lead Visual Essay</span>
              <span style="opacity:0.4;">/</span>
              <span>${lead.categoryLabel || lead.category}</span>
              <span style="opacity:0.4;">/</span>
              <span>${lead.readTime}</span>
            </div>

            <h2 class="lead-title">${lead.title}</h2>
            <p class="lead-synopsis">${lead.tagline || lead.summary}</p>

            <ul class="lead-takeaways">
              ${(lead.highlights || []).slice(0, 3).map(hl => `<li>${hl}</li>`).join('')}
            </ul>
          </div>

          <div class="lead-footer">
            <button class="btn-editorial-primary" onclick="window.openReader('${lead.id}')">
              <span>Read Visual Essay</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <a href="${lead.url}" target="_blank" class="btn-editorial-ghost">
              <span>Standalone Window</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <div class="lead-visual-panel">
          <div class="interactive-preview-frame">
            <div class="preview-topbar">
              <span class="preview-label">Core Diagram Primitives</span>
              <span class="preview-label">Model Preview</span>
            </div>
            <div class="preview-diagram-box">
              ${microDiagram}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // Render Grid
  function renderGrid() {
    const items = getFilteredExplainers();
    resultsCount.textContent = `${items.length} ${items.length === 1 ? 'essay' : 'essays'}`;

    if (items.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 64px 20px; text-align: center; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 4px;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 8px;">No essays found matching "${searchQuery}"</h3>
          <p style="color: var(--ink-muted); font-size: 0.9rem; margin-bottom: 20px;">Try searching for "Navier", "Battery", "Swap", or "GDP".</p>
          <button class="btn-editorial-ghost" onclick="window.clearSearch()">Clear Filter</button>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = items.map((item, index) => {
      const idxStr = String(index + 1).padStart(2, '0');
      const diagram = MICRO_DIAGRAMS[item.id] || `
        <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-muted);">Interactive Architecture</div>
      `;
      const bullets = (item.highlights || []).slice(0, 2).map(hl => `<li>${hl}</li>`).join('');

      return `
        <article class="essay-card" data-id="${item.id}">
          <div>
            <div class="card-header">
              <span class="card-index">${idxStr}</span>
              <span class="card-category">${item.categoryLabel || item.category} · ${item.readTime}</span>
            </div>

            <h3 class="card-title">${item.title}</h3>
            <p class="card-deck">${item.tagline || item.summary}</p>

            <div class="card-mini-wireframe" title="Visual model preview">
              ${diagram}
            </div>

            ${bullets ? `<ul class="card-takeaways">${bullets}</ul>` : ''}
          </div>

          <div class="card-action-row">
            <button class="btn-open-essay" onclick="window.openReader('${item.id}')">
              <span>Read Essay</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div class="card-links">
              <button class="btn-icon-link" onclick="window.shareEssay('${item.id}', event)" title="Copy Link" aria-label="Copy Link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </button>
              <a href="${item.url}" target="_blank" class="btn-icon-link" title="Open Fullscreen in New Tab" aria-label="Open Fullscreen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Reader Implementation
  window.openReader = function(id) {
    const idx = explainers.findIndex(e => e.id === id);
    if (idx === -1) return;

    currentReaderIndex = idx;
    const item = explainers[idx];

    readerTitle.textContent = item.title;
    readerIframe.src = item.url;
    readerModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Hash update
    window.location.hash = item.id;

    // Prev/Next disable
    btnReaderPrev.style.opacity = (idx === 0) ? '0.35' : '1';
    btnReaderPrev.disabled = (idx === 0);
    btnReaderNext.style.opacity = (idx === explainers.length - 1) ? '0.35' : '1';
    btnReaderNext.disabled = (idx === explainers.length - 1);

    btnReaderExternal.onclick = () => window.open(item.url, '_blank');
    btnReaderShare.onclick = () => window.shareEssay(item.id);

    // Progress bar inside iframe
    readerProgressBar.style.width = '0%';
    readerIframe.onload = () => {
      try {
        const frameDoc = readerIframe.contentDocument || readerIframe.contentWindow.document;
        const frameWin = readerIframe.contentWindow;
        frameWin.addEventListener('scroll', () => {
          const total = frameDoc.documentElement.scrollHeight - frameWin.innerHeight;
          const prog = (frameWin.scrollY / total) * 100;
          readerProgressBar.style.width = `${Math.min(100, Math.max(0, prog))}%`;
        });
      } catch (e) {
        readerProgressBar.style.width = '100%';
      }
    };
  };

  window.closeReader = function() {
    readerModal.classList.remove('open');
    document.body.style.overflow = '';
    readerIframe.src = 'about:blank';
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  window.navigateReader = function(step) {
    const nextIdx = currentReaderIndex + step;
    if (nextIdx >= 0 && nextIdx < explainers.length) {
      window.openReader(explainers[nextIdx].id);
    }
  };

  // Toast
  window.showToast = function(msg) {
    const container = document.getElementById('toast-shelf');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2400);
  };

  window.shareEssay = function(id, e) {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?id=${id}#${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        window.showToast('Link copied to clipboard');
      });
    } else {
      prompt('Copy this link:', url);
    }
  };

  window.clearSearch = function() {
    searchQuery = '';
    if (navSearchInput) navSearchInput.value = '';
    renderGrid();
  };

  // Search input
  if (navSearchInput) {
    navSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGrid();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderGrid();
    });
  }

  // Reader buttons
  if (btnCloseReader) btnCloseReader.addEventListener('click', window.closeReader);
  if (btnReaderPrev) btnReaderPrev.addEventListener('click', () => window.navigateReader(-1));
  if (btnReaderNext) btnReaderNext.addEventListener('click', () => window.navigateReader(1));

  // Studio buttons
  if (btnOpenStudio) {
    btnOpenStudio.addEventListener('click', () => {
      studioModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      updateStudioPreview();
    });
  }

  if (btnCloseStudio) {
    btnCloseStudio.addEventListener('click', () => {
      studioModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  function updateStudioPreview() {
    if (!previewIframe || !studioHtmlInput) return;
    const html = studioHtmlInput.value || '<p style="padding:20px; font-family:sans-serif; color:#666;">Type or paste HTML above to preview...</p>';
    const blob = new Blob([html], { type: 'text/html' });
    previewIframe.src = URL.createObjectURL(blob);
  }

  if (studioHtmlInput) studioHtmlInput.addEventListener('input', updateStudioPreview);

  if (btnSaveLocal) {
    btnSaveLocal.addEventListener('click', () => {
      const title = studioTitleInput.value.trim() || 'Untitled Essay';
      const cat = studioCategoryInput.value || 'ai';
      const summary = studioSummaryInput.value.trim() || 'Draft visual explanation';
      const html = studioHtmlInput.value.trim();

      if (!html) {
        alert('Please provide some HTML content.');
        return;
      }

      const id = 'custom-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      const blob = new Blob([html], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);

      const item = {
        id: id,
        title: title,
        category: cat,
        categoryLabel: cat.toUpperCase(),
        tagline: summary,
        summary: summary,
        readTime: '3 min',
        url: blobUrl,
        highlights: ['User-created draft', 'Rendered locally in sandbox'],
        featured: false
      };

      explainers.unshift(item);
      try {
        const saved = JSON.parse(localStorage.getItem('eli5_custom_explainers') || '[]');
        saved.unshift(item);
        localStorage.setItem('eli5_custom_explainers', JSON.stringify(saved));
      } catch (e) {}

      studioModal.classList.remove('open');
      document.body.style.overflow = '';
      renderCategoryPills();
      renderGrid();
      window.showToast(`Added "${title}"`);
    });
  }

  if (btnCopyTemplate) {
    btnCopyTemplate.addEventListener('click', () => {
      const tpl = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #111; }
  h1 { font-size: 2.4rem; letter-spacing: -0.02em; margin-bottom: 8px; }
  .tag { font-family: monospace; font-size: 0.8rem; background: #eee; padding: 3px 8px; border-radius: 4px; }
</style>
</head>
<body>
  <span class="tag">VISUAL MODEL</span>
  <h1>Title: The Core Mechanic</h1>
  <p>Explain the simplest intuition first.</p>
</body>
</html>`;
      navigator.clipboard.writeText(tpl).then(() => window.showToast('Starter template copied'));
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== navSearchInput) {
      e.preventDefault();
      if (navSearchInput) navSearchInput.focus();
    }
    if (e.key === 'Escape') {
      if (readerModal.classList.contains('open')) window.closeReader();
      if (studioModal.classList.contains('open')) {
        studioModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    if (readerModal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') window.navigateReader(-1);
      if (e.key === 'ArrowRight') window.navigateReader(1);
    }
  });

  // Theme toggle
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('eli5_journal_theme', next);
      btnThemeToggle.innerHTML = next === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  // Restore saved theme
  try {
    const savedTheme = localStorage.getItem('eli5_journal_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}

  // Check URL deep link
  function checkDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || window.location.hash.replace('#', '');
    if (id) window.openReader(id);
  }

  // Initialize
  renderCategoryPills();
  renderLeadFeature();
  renderGrid();
  checkDeepLink();

})();
