'use strict';
// "How AI works, from scratch" on the home page: a feature band with a two-lane map of the series,
// plus reading progress kept in this browser only (localStorage key 'eli5-series-read').
(function seriesBand() {
  const S = window.ELI5_SERIES, host = document.getElementById('seriesBand');
  if (!S || !host) return;
  const KEY = 'eli5-series-read', NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const readSet = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return new Set(); } };
  const markRead = id => { try { const s = readSet(); if (s.has(id)) return; s.add(id); localStorage.setItem(KEY, JSON.stringify([...s])); draw(); } catch {} };
  const ids = new Set([...S.parts, S.bonus].map(p => p.id));
  const hubId = S.hub.replace(/\.html$/, '');
  const open = id => (typeof openReader === 'function' ? openReader(id) : (location.href = '?id=' + encodeURIComponent(id)));
  const label = p => p === S.bonus ? 'Bonus deep dive' : `Part ${S.parts.indexOf(p) + 1} · ${S.tracks[p.track].short}`;

  // The Lab's reader reports scroll progress; past 80% of a series study counts as read.
  window.addEventListener('message', e => {
    const frame = document.getElementById('document');
    if (!frame || e.source !== frame.contentWindow || e.data?.type !== 'eli5-progress') return;
    const id = (typeof active !== 'undefined' && active) ? active.id : null;
    if (id && ids.has(id) && e.data.value >= 80) markRead(id);
  });

  function draw() {
    const read = readSet(), live = S.parts.filter(p => p.file), n = S.parts.length;
    const readLive = live.filter(p => read.has(p.id)).length;
    const next = live.find(p => !read.has(p.id));
    const soon = S.parts.find(p => !p.file);
    const started = readLive > 0;
    const cta = next
      ? `<button class="primary" data-sb-open="${esc(next.id)}">${started ? 'Continue' : 'Start'} with Part ${S.parts.indexOf(next) + 1} <span>↗</span></button>`
      : `<button class="primary" data-sb-open="${esc(hubId)}">You’re caught up · see the map <span>↗</span></button>`;
    const status = `${live.length} of ${n} parts out` + (started ? ` · ${readLive} read` : '') + (soon ? ` · next up: Part ${S.parts.indexOf(soon) + 1}` : '');
    host.innerHTML =
      `<div class="sb-copy">
        <p class="sb-kicker"><span>A series</span><i></i><span>${n} parts · 2 tracks</span></p>
        <h2>${esc(S.title)}</h2>
        <p class="sb-lede">Start with no background at all. End with the whole picture: the program that writes the answers, and the chips it runs on.</p>
        <div class="sb-actions">${cta}<button class="sb-map" data-sb-open="${esc(hubId)}">Series map <span>↗</span></button></div>
        <p class="sb-status">${esc(status)}</p>
      </div>
      <div class="sb-visual">
        <div class="sb-scroll"><svg class="sb-svg" viewBox="0 0 760 230" role="group" aria-label="Series map: ${n} parts across two tracks"></svg></div>
        <p class="sb-caption" aria-live="polite"></p>
        <p class="sb-legend"><span><i class="lg-live"></i>Published</span><span><i class="lg-read"></i>Read</span><span><i class="lg-soon"></i>Coming soon</span></p>
      </div>`;
    const svg = host.querySelector('svg'), cap = host.querySelector('.sb-caption');
    const add = (tag, a, parent = svg, text) => { const el = document.createElementNS(NS, tag); for (const k in a) el.setAttribute(k, a[k]); if (text != null) el.textContent = text; parent.appendChild(el); return el; };
    const x0 = 46, dx = (680 - x0) / (n - 1), Y = { llm: 72, chip: 158 };
    for (const t of ['llm', 'chip']) {
      add('line', { x1: 20, y1: Y[t], x2: 740, y2: Y[t], class: 'sb-lane' });
      add('text', { x: 20, y: t === 'llm' ? Y[t] - 40 : Y[t] + 52, class: 'sb-lane-name', fill: S.tracks[t].color }, svg, S.tracks[t].name.toUpperCase());
    }
    const pts = S.parts.map((p, i) => [x0 + i * dx, Y[p.track]]), bx = 724, by = (Y.llm + Y.chip) / 2;
    const lastLive = S.parts.reduce((k, p, i) => p.file ? i : k, -1);
    const pathTo = k => 'M' + pts.slice(0, k + 1).map(q => q.join(' ')).join(' L');
    add('path', { d: pathTo(n - 1) + ` L${bx} ${by}`, class: 'sb-route' });
    if (lastLive > 0) add('path', { d: pathTo(lastLive), class: 'sb-route lit' });
    const describe = p => `${label(p)} — ${p.title}${p.file ? (read.has(p.id) ? ' · read ✓' : '') : ' · coming soon'}`;
    const setCap = p => { cap.innerHTML = p ? `<b>${esc(label(p))}</b> ${esc(p.title)}${p.file ? (read.has(p.id) ? ' <em>read ✓</em>' : '') : ' <em>coming soon</em>'}` : ''; };
    const nodes = [...S.parts.map((p, i) => ({ p, x: pts[i][0], y: pts[i][1], i })), { p: S.bonus, x: bx, y: by, bonus: true }];
    for (const { p, x, y, i, bonus } of nodes) {
      const c = bonus ? 'var(--sb-gold)' : S.tracks[p.track].color, isRead = read.has(p.id), isNext = next && p.id === next.id;
      const g = p.file ? add('a', { href: '?id=' + encodeURIComponent(p.id), 'data-sb-open': p.id, 'aria-label': describe(p) }) : add('g', { tabindex: 0, role: 'img', 'aria-label': describe(p) });
      g.setAttribute('class', 'sb-node' + (p.file ? ' live' : ' soon') + (isRead ? ' read' : '') + (isNext ? ' next' : ''));
      g.style.setProperty('--c', c);
      if (isNext) add('circle', { cx: x, cy: y, r: 19, class: 'sb-halo' }, g);
      add('circle', { cx: x, cy: y, r: 22, class: 'sb-hit' }, g);
      if (bonus) add('path', { d: `M${x} ${y - 15}L${x + 15} ${y}L${x} ${y + 15}L${x - 15} ${y}Z`, class: 'sb-dot' }, g);
      else add('circle', { cx: x, cy: y, r: p.file ? 12 : 9, class: 'sb-dot' }, g);
      if (isRead) add('path', { d: `M${x - 5} ${y}l3.5 3.5 6.5-7`, class: 'sb-tick' }, g);
      add('text', { x, y: bonus ? y + 34 : y + (p.track === 'llm' ? -22 : 32), class: 'sb-num' }, g, bonus ? 'bonus' : String(i + 1));
      g.addEventListener('mouseenter', () => setCap(p));
      g.addEventListener('focus', () => setCap(p));
    }
    svg.addEventListener('mouseleave', () => setCap(next || soon));
    setCap(next || soon);
    // On a phone the map scrolls sideways; bring the next part into view.
    const sc = host.querySelector('.sb-scroll');
    if (sc.scrollWidth > sc.clientWidth && (next || soon)) {
      const k = S.parts.indexOf(next || soon);
      sc.scrollLeft = Math.max(0, (pts[k][0] / 760) * sc.scrollWidth - sc.clientWidth / 2);
    }
  }

  host.addEventListener('click', e => {
    const t = e.target.closest('[data-sb-open]');
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute('data-sb-open'));
  });
  window.addEventListener('storage', e => { if (e.key === KEY) draw(); });
  window.addEventListener('pageshow', e => { if (e.persisted) draw(); });
  draw();
})();
