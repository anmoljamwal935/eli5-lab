if (window.self !== window.top) {
  document.body.classList.add('in-frame');
}
const backBtn = document.getElementById('backToLabBtn');
if (backBtn && window.self !== window.top) {
  backBtn.onclick = function(e) {
    e.preventDefault();
    parent.postMessage({ type: 'eli5-close' }, '*');
  };
}

// Series navigation. A page opts in with <body data-series-id="..."> plus empty
// <nav data-series="top"> / <nav data-series="end"> slots, and loads ../series.js before this file.
(function renderSeries() {
  // Series: window.ELI5_SERIES (series.js) plus any later series in window.ELI5_SERIES_LIST.
  // A study is matched by its part id; a series map page uses data-series-id="hub" and names its
  // series with data-series-key="<series id>" (falls back to the first series).
  const id = document.body.dataset.seriesId, key = document.body.dataset.seriesKey;
  const list = [window.ELI5_SERIES, ...(window.ELI5_SERIES_LIST || [])].filter(Boolean);
  if (!list.length || !id) return;
  const S = (key && list.find(s => s.id === key)) || list.find(s => s.parts.some(p => p.id === id) || (s.bonus && s.bonus.id === id)) || list[0];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const all = [...S.parts, S.bonus].filter(Boolean), i = S.parts.findIndex(p => p.id === id), isBonus = !!S.bonus && S.bonus.id === id, isHub = id === 'hub';
  const href = p => p.file ? esc(p.file) : null;
  const label = p => p === S.bonus ? 'Bonus deep dive' : `Part ${S.parts.indexOf(p) + 1}` + (Object.keys(S.tracks).length > 1 ? ` · ${S.tracks[p.track].short}` : '');
  const card = (p, dir) => {
    if (!p) return '<span></span>';
    const inner = `<small>${dir} · ${esc(label(p))}</small><b>${esc(p.title)}</b>${p.file ? '' : '<em>Coming soon</em>'}`;
    return p.file ? `<a class="series-card" href="${href(p)}" data-series-link="${esc(p.id)}">${inner}</a>` : `<div class="series-card soon">${inner}</div>`;
  };
  const here = isHub ? 'The series map' : isBonus ? 'Bonus deep dive' : `Part ${i + 1} of ${S.parts.length}` + (Object.keys(S.tracks).length > 1 ? ` · ${S.tracks[S.parts[i].track].short}` : '');
  document.querySelectorAll('[data-series="top"]').forEach(n => {
    n.innerHTML = `<span class="series-name">${esc(S.title)}</span><span class="series-here">${esc(here)}</span>` +
      (isHub ? '' : `<a href="${esc(S.hub)}" data-series-link="${esc(S.hub.replace(/\.html$/, ''))}">See the series map ↗</a>`);
  });
  document.querySelectorAll('[data-series="end"]').forEach(n => {
    const prev = isBonus ? S.parts[S.parts.length - 1] : i > 0 ? S.parts[i - 1] : null;
    const next = isBonus ? null : i < S.parts.length - 1 ? S.parts[i + 1] : (S.bonus || null);
    n.innerHTML = `<div class="series-end-head"><span>${esc(S.title)}</span><a href="${esc(S.hub)}" data-series-link="${esc(S.hub.replace(/\.html$/, ''))}">All ${all.length} studies ↗</a></div>` +
      `<div class="series-cards">${card(prev, '← Previous')}${card(next, 'Next →')}</div>`;
  });
  // Reading progress, kept in this browser only: past 80% of a series study counts as read.
  // (Inside the Lab's sandboxed reader storage is unavailable; the Lab records it from eli5-progress instead.)
  if (id !== 'hub' && window.self === window.top) {
    const mark = () => {
      const d = document.documentElement, h = d.scrollHeight - d.clientHeight;
      if (h > 0 && d.scrollTop / h < 0.8) return;
      try { const k = 'eli5-series-read', s = new Set(JSON.parse(localStorage.getItem(k) || '[]')); if (!s.has(id)) { s.add(id); localStorage.setItem(k, JSON.stringify([...s])); } } catch {}
      window.removeEventListener('scroll', mark);
    };
    window.addEventListener('scroll', mark, { passive: true });
  }
  // Inside the Lab's reader, ask the Lab to open the study so its title and navigation follow along.
  if (window.self !== window.top) {
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-series-link]');
      if (!a) return;
      e.preventDefault();
      parent.postMessage({ type: 'eli5-open', id: a.dataset.seriesLink }, '*');
    });
  }
})();

function reportProgress() {
  const doc = document.documentElement;
  const winScroll = document.body.scrollTop || doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? Math.min(100, Math.max(0, Math.round((winScroll / height) * 100))) : 0;
  const fill = document.getElementById('readingProgress');
  if (fill) fill.style.width = pct + '%';
  if (parent && parent !== window) {
    parent.postMessage({ type: 'eli5-progress', value: pct }, '*');
  }
}
window.addEventListener('scroll', reportProgress, { passive: true });
window.addEventListener('load', reportProgress);
window.addEventListener('resize', reportProgress);
window.addEventListener('keydown', e => {
  if (!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && ['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key) && parent && parent !== window) {
    parent.postMessage({ type: 'eli5-key', key: e.key }, '*');
  }
});
reportProgress();
