// ELI5 Visual Lab - Main Application Logic

(function() {
  'use strict';

  // State
  let explainers = [...EXPLAINERS];
  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'featured';
  let currentReaderIndex = -1;

  // Load custom explainers from localStorage if any
  try {
    const savedCustom = localStorage.getItem('eli5_custom_explainers');
    if (savedCustom) {
      const customItems = JSON.parse(savedCustom);
      if (Array.isArray(customItems) && customItems.length > 0) {
        explainers = [...customItems, ...explainers];
      }
    }
  } catch (e) {
    console.error('Error reading localStorage explainers:', e);
  }

  // DOM Elements
  const gridEl = document.getElementById('explainers-grid');
  const searchInput = document.getElementById('search-input');
  const navSearchInput = document.getElementById('nav-search-input');
  const resultsCountEl = document.getElementById('results-count');
  const categoryTabsContainer = document.getElementById('category-tabs');
  const sortSelect = document.getElementById('sort-select');
  const featuredSection = document.getElementById('featured-section');

  // Reader elements
  const readerModal = document.getElementById('reader-modal');
  const readerIframe = document.getElementById('reader-iframe');
  const readerTitle = document.getElementById('reader-title');
  const readerBadge = document.getElementById('reader-badge');
  const readerProgressBar = document.getElementById('reader-progress-bar');
  const btnCloseReader = document.getElementById('btn-close-reader');
  const btnReaderPrev = document.getElementById('btn-reader-prev');
  const btnReaderNext = document.getElementById('btn-reader-next');
  const btnReaderExternal = document.getElementById('btn-reader-external');
  const btnReaderShare = document.getElementById('btn-reader-share');

  // Add Studio elements
  const studioModal = document.getElementById('studio-modal');
  const btnOpenStudio = document.getElementById('btn-open-studio');
  const btnCloseStudio = document.getElementById('btn-close-studio');
  const studioTabs = document.querySelectorAll('.modal-tab-btn');
  const studioTabContents = document.querySelectorAll('.studio-tab-content');
  const previewIframe = document.getElementById('studio-preview-iframe');
  const studioHtmlInput = document.getElementById('studio-html-input');
  const studioTitleInput = document.getElementById('studio-title-input');
  const studioCategoryInput = document.getElementById('studio-category-input');
  const studioSummaryInput = document.getElementById('studio-summary-input');
  const btnSaveLocal = document.getElementById('btn-save-local');
  const btnCopyTemplate = document.getElementById('btn-copy-template');

  // Theme Toggle
  const btnThemeToggle = document.getElementById('btn-theme-toggle');

  // Init Category Counts
  function getCategoryCounts() {
    const counts = { all: explainers.length };
    explainers.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }

  function renderCategoryTabs() {
    const counts = getCategoryCounts();
    const categories = [
      { id: 'all', label: 'All Topics' },
      { id: 'ai', label: 'AI & Frontier Tech' },
      { id: 'finance', label: 'Finance & Capital' },
      { id: 'economics', label: 'Macroeconomics' },
      { id: 'science', label: 'Science & Energy' },
      { id: 'industry', label: 'Industrial Power' },
      { id: 'systems', label: 'Distributed Systems' }
    ];

    categoryTabsContainer.innerHTML = categories.map(cat => {
      const count = counts[cat.id] || 0;
      if (count === 0 && cat.id !== 'all') return '';
      const isActive = activeCategory === cat.id ? 'active' : '';
      return `
        <button class="category-tab ${isActive}" data-category="${cat.id}">
          ${cat.label}
          <span class="count">${count}</span>
        </button>
      `;
    }).join('');

    // Reattach listeners
    categoryTabsContainer.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.dataset.category;
        renderCategoryTabs();
        renderGrid();
      });
    });
  }

  // Filter & Sort Items
  function getFilteredItems() {
    let filtered = explainers.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title.toLowerCase().includes(q);
      const taglineMatch = (item.tagline || '').toLowerCase().includes(q);
      const summaryMatch = (item.summary || '').toLowerCase().includes(q);
      const highlightsMatch = (item.highlights || []).some(h => h.toLowerCase().includes(q));
      const badgeMatch = (item.badge || '').toLowerCase().includes(q);

      return titleMatch || taglineMatch || summaryMatch || highlightsMatch || badgeMatch;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'shortest') {
        const timeA = parseInt(a.readTime) || 5;
        const timeB = parseInt(b.readTime) || 5;
        return timeA - timeB;
      } else if (sortBy === 'longest') {
        const timeA = parseInt(a.readTime) || 5;
        const timeB = parseInt(b.readTime) || 5;
        return timeB - timeA;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        // 'featured'
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
    });

    return filtered;
  }

  // Render Featured Hero
  function renderFeaturedSection() {
    const featuredItem = explainers.find(item => item.featured) || explainers[0];
    if (!featuredItem) {
      featuredSection.innerHTML = '';
      return;
    }

    featuredSection.innerHTML = `
      <div class="featured-card" style="--card-accent: ${featuredItem.accentColor}; --card-glow: ${featuredItem.glowColor};">
        <div class="featured-info">
          <div class="featured-meta">
            <span class="featured-badge">★ Spotlight Explainer</span>
            <span class="card-category" style="color: ${featuredItem.accentColor}; border-color: ${featuredItem.accentColor}40;">
              ${featuredItem.categoryLabel || featuredItem.category}
            </span>
            <span class="card-read-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${featuredItem.readTime}
            </span>
          </div>

          <h2 class="featured-title">${featuredItem.title}</h2>
          <p class="featured-desc">${featuredItem.tagline || featuredItem.summary}</p>

          <ul class="featured-bullets">
            ${(featuredItem.highlights || []).slice(0, 3).map(hl => `
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${hl}</span>
              </li>
            `).join('')}
          </ul>

          <div class="featured-actions">
            <button class="btn-primary" onclick="window.openReader('${featuredItem.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Launch Interactive Deep Dive
            </button>
            <a href="${featuredItem.url}" target="_blank" class="btn-secondary" title="Open standalone HTML">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Standalone View
            </a>
          </div>
        </div>

        <div class="featured-graphic">
          <div class="featured-visual-box">
            <div class="visual-rings">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${featuredItem.accentColor}" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            </div>
            <strong style="color:#ffffff; font-size:1.05rem; margin-bottom: 6px;">Visual Mental Model</strong>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Interactive sliders & SVG architecture</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render Grid
  function renderGrid() {
    const items = getFilteredItems();
    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <span>${items.length}</span> ${items.length === 1 ? 'explainer' : 'explainers'}`;
    }

    if (items.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 class="empty-title">No explainers match your search</h3>
          <p class="empty-text">Try searching for different terms like "AI", "battery", "GDP", or clear your filter.</p>
          <button class="btn-secondary" onclick="window.clearFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = items.map(item => {
      const bullets = (item.highlights || []).slice(0, 3).map(hl => `
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${hl}</span>
        </li>
      `).join('');

      return `
        <article class="explainer-card" style="--card-accent: ${item.accentColor}; --card-glow: ${item.glowColor};" data-id="${item.id}">
          <div>
            <div class="card-top">
              <span class="card-category" style="color: ${item.accentColor}; border-color: ${item.accentColor}33;">
                ${item.badge || item.categoryLabel || item.category}
              </span>
              <span class="card-read-time">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${item.readTime}
              </span>
            </div>

            <h3 class="card-title">${item.title}</h3>
            <p class="card-tagline">${item.tagline || item.summary}</p>

            ${bullets ? `<ul class="card-highlights">${bullets}</ul>` : ''}
          </div>

          <div class="card-footer">
            <button class="card-btn-read" onclick="window.openReader('${item.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Read Explainer
            </button>
            <a href="${item.url}" target="_blank" class="card-btn-icon" title="Open in new window" aria-label="Open in new window">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <button class="card-btn-icon" onclick="window.shareExplainer('${item.id}', event)" title="Copy Link" aria-label="Copy Link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  // Reader functionality
  window.openReader = function(id) {
    const idx = explainers.findIndex(e => e.id === id);
    if (idx === -1) return;

    currentReaderIndex = idx;
    const item = explainers[idx];

    readerTitle.textContent = item.title;
    readerBadge.textContent = item.badge || item.categoryLabel || item.category;
    readerBadge.style.backgroundColor = `${item.accentColor}22`;
    readerBadge.style.color = item.accentColor;

    // Load iframe
    readerIframe.src = item.url;
    readerModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Update URL hash
    window.location.hash = item.id;

    // Update prev/next button states
    btnReaderPrev.disabled = (idx === 0);
    btnReaderNext.disabled = (idx === explainers.length - 1);
    btnReaderPrev.style.opacity = (idx === 0) ? '0.4' : '1';
    btnReaderNext.style.opacity = (idx === explainers.length - 1) ? '0.4' : '1';

    // Configure buttons
    btnReaderExternal.onclick = () => window.open(item.url, '_blank');
    btnReaderShare.onclick = () => window.shareExplainer(item.id);

    // Track iframe scroll for progress bar
    setupIframeScrollTracking();
  };

  function setupIframeScrollTracking() {
    readerProgressBar.style.width = '0%';
    readerIframe.onload = function() {
      try {
        const frameDoc = readerIframe.contentDocument || readerIframe.contentWindow.document;
        const frameWin = readerIframe.contentWindow;
        frameWin.addEventListener('scroll', () => {
          const totalHeight = frameDoc.documentElement.scrollHeight - frameWin.innerHeight;
          const currentProgress = (frameWin.scrollY / totalHeight) * 100;
          readerProgressBar.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
        });
      } catch (e) {
        // Cross-origin fallback
        readerProgressBar.style.width = '100%';
      }
    };
  }

  window.closeReader = function() {
    readerModal.classList.remove('open');
    document.body.style.overflow = '';
    readerIframe.src = 'about:blank';
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  window.navigateReader = function(direction) {
    const newIdx = currentReaderIndex + direction;
    if (newIdx >= 0 && newIdx < explainers.length) {
      window.openReader(explainers[newIdx].id);
    }
  };

  // Toast System
  window.showToast = function(msg, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  };

  // Share Explainer
  window.shareExplainer = function(id, event) {
    if (event) event.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?id=${id}#${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        window.showToast('Explainer link copied to clipboard!');
      }).catch(() => {
        prompt('Copy this link:', url);
      });
    } else {
      prompt('Copy this link:', url);
    }
  };

  window.clearFilters = function() {
    searchQuery = '';
    activeCategory = 'all';
    if (searchInput) searchInput.value = '';
    if (navSearchInput) navSearchInput.value = '';
    renderCategoryTabs();
    renderGrid();
  };

  // Search input events
  function handleSearch(e) {
    searchQuery = e.target.value;
    if (searchInput && e.target !== searchInput) searchInput.value = searchQuery;
    if (navSearchInput && e.target !== navSearchInput) navSearchInput.value = searchQuery;
    renderGrid();
  }

  if (searchInput) searchInput.addEventListener('input', handleSearch);
  if (navSearchInput) navSearchInput.addEventListener('input', handleSearch);

  // Sort select event
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderGrid();
    });
  }

  // Reader event listeners
  if (btnCloseReader) btnCloseReader.addEventListener('click', window.closeReader);
  if (btnReaderPrev) btnReaderPrev.addEventListener('click', () => window.navigateReader(-1));
  if (btnReaderNext) btnReaderNext.addEventListener('click', () => window.navigateReader(1));

  // Add Studio Modal
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

  // Studio tabs switching
  studioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      studioTabs.forEach(t => t.classList.remove('active'));
      studioTabContents.forEach(c => c.style.display = 'none');
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      document.getElementById(targetId).style.display = 'block';
    });
  });

  // Studio Live Preview
  function updateStudioPreview() {
    if (!previewIframe || !studioHtmlInput) return;
    const htmlContent = studioHtmlInput.value;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    previewIframe.src = URL.createObjectURL(blob);
  }

  if (studioHtmlInput) {
    studioHtmlInput.addEventListener('input', updateStudioPreview);
  }

  // Save to Local Gallery
  if (btnSaveLocal) {
    btnSaveLocal.addEventListener('click', () => {
      const title = studioTitleInput.value.trim() || 'Untitled Explainer';
      const category = studioCategoryInput.value || 'ai';
      const summary = studioSummaryInput.value.trim() || 'Custom added explainer.';
      const htmlContent = studioHtmlInput.value.trim();

      if (!htmlContent) {
        alert('Please paste or write some HTML content for your explainer.');
        return;
      }

      // Generate slug
      const id = 'custom-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);

      const newItem = {
        id: id,
        title: title,
        category: category,
        categoryLabel: category.toUpperCase(),
        badge: 'Custom Draft',
        tagline: summary,
        summary: summary,
        highlights: ['Custom user-authored explainer', 'Rendered client-side', 'Saved to browser cache'],
        readTime: '3 min',
        url: blobUrl,
        accentColor: '#ec4899',
        glowColor: 'rgba(236, 72, 153, 0.25)',
        isCustom: true
      };

      explainers.unshift(newItem);
      try {
        const savedCustom = JSON.parse(localStorage.getItem('eli5_custom_explainers') || '[]');
        newItem.rawHtml = htmlContent;
        savedCustom.unshift(newItem);
        localStorage.setItem('eli5_custom_explainers', JSON.stringify(savedCustom));
      } catch (e) {
        console.warn('LocalStorage limit reached');
      }

      studioModal.classList.remove('open');
      document.body.style.overflow = '';
      renderCategoryTabs();
      renderGrid();
      window.showToast(`"${title}" added to your gallery!`);
    });
  }

  // Copy template button
  if (btnCopyTemplate) {
    btnCopyTemplate.addEventListener('click', () => {
      const template = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>My New Visual Explainer</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
  h1 { font-size: 2.5rem; letter-spacing: -0.02em; margin-bottom: 12px; }
  .tag { display: inline-block; padding: 4px 10px; background: #e0e7ff; color: #4338ca; border-radius: 999px; font-weight: 600; font-size: 0.8rem; }
  .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; background: #f8fafc; }
</style>
</head>
<body>
  <span class="tag">ELI5 Concept</span>
  <h1>Explain Like I'm 5: The Core Concept</h1>
  <p>Start with the simplest analogy a 5-year-old would understand.</p>
  <div class="card">
    <h3>The Mental Model</h3>
    <p>Break down the gears and mechanics with clear step-by-step points.</p>
  </div>
</body>
</html>`;
      navigator.clipboard.writeText(template).then(() => {
        window.showToast('Starter template copied to clipboard!');
      });
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search on '/' or 'Cmd+K'
    if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== searchInput && document.activeElement !== navSearchInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
      } else if (navSearchInput) {
        navSearchInput.focus();
      }
    }

    // Close reader or modals on 'Escape'
    if (e.key === 'Escape') {
      if (readerModal.classList.contains('open')) window.closeReader();
      if (studioModal.classList.contains('open')) {
        studioModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    // Prev / Next on Left / Right arrow keys in reader
    if (readerModal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') window.navigateReader(-1);
      if (e.key === 'ArrowRight') window.navigateReader(1);
    }
  });

  // Deep Link Handling on initial page load
  function checkUrlDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const hash = window.location.hash.replace('#', '');
    const targetId = idParam || hash;

    if (targetId) {
      window.openReader(targetId);
    }
  }

  // Theme toggle handler
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('eli5_theme', newTheme);
      btnThemeToggle.innerHTML = newTheme === 'dark' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  // Saved theme restore
  try {
    const savedTheme = localStorage.getItem('eli5_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}

  // Initialize
  renderCategoryTabs();
  renderFeaturedSection();
  renderGrid();
  checkUrlDeepLink();

})();
