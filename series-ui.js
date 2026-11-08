'use strict';
// Series on the home page: one feature band per series, each with a lane map of its parts,
// plus reading progress kept in this browser only (localStorage key 'eli5-series-read').
// Series come from window.ELI5_SERIES (the first series, series.js) and window.ELI5_SERIES_LIST
// (every later series file pushes itself there). See .claude/skills/eli5-series/SKILL.md.
(function seriesBands() {
  const host = document.getElementById('seriesBand');
  const list = [window.ELI5_SERIES, ...(window.ELI5_SERIES_LIST || [])].filter((s, i, a) => s && a.indexOf(s) === i && s.feature !== false);
  if (!host || !list.length) return;
  const KEY = 'eli5-series-read', NS = 'http://www.w3.org/2000/svg';
  // Deeper versions of the dark-theme colours for the light theme; a track can also set its own `lightColor`.
  const LIGHT = { '#76d5c1': '#23927c', '#c3b8ff': '#6c5bd0', '#f5c76a': '#b07d1e', '#ff8059': '#d65a32', '#ec6a94': '#c2406c' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const readSet = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return new Set(); } };
  const markRead = id => { try { const s = readSet(); if (s.has(id)) return; s.add(id); localStorage.setItem(KEY, JSON.stringify([...s])); drawAll(); if (typeof render === 'function') render(); if (typeof readerSeries === 'function' && typeof active !== 'undefined' && active) readerSeries(active); } catch {} };
  const ids = new Set(list.flatMap(S => [...S.parts, S.bonus].filter(Boolean).map(p => p.id)));
  const open = id => (typeof openReader === 'function' ? openReader(id) : (location.href = '?id=' + encodeURIComponent(id)));
  const colors = c => `--cd:${c};--cl:${LIGHT[String(c).toLowerCase()] || c}`;
  const numWord = n => ['zero', 'one', 'two', 'three', 'four'][n] || String(n);

  // The Lab's reader reports scroll progress; past 80% of a series study counts as read.
  window.addEventListener('message', e => {
    const frame = document.getElementById('document');
    if (!frame || e.source !== frame.contentWindow || e.data?.type !== 'eli5-progress') return;
    const id = (typeof active !== 'undefined' && active) ? active.id : null;
    if (id && ids.has(id) && e.data.value >= 80) markRead(id);
  });

  function draw(S, el) {
    const read = readSet(), live = S.parts.filter(p => p.file), n = S.parts.length;
    const trackKeys = Object.keys(S.tracks), hubId = S.hub.replace(/\.html$/, '');
    const label = p => p === S.bonus ? 'Bonus deep dive' : `Part ${S.parts.indexOf(p) + 1}` + (trackKeys.length > 1 ? ` · ${S.tracks[p.track].short}` : '');
    const readLive = live.filter(p => read.has(p.id)).length;
    const next = live.find(p => !read.has(p.id)) || (S.bonus && S.bonus.file && !read.has(S.bonus.id) && live.length === n ? S.bonus : null);
    const soon = S.parts.find(p => !p.file);
    const started = readLive > 0;
    const nextName = p => p === S.bonus ? 'the bonus' : `Part ${S.parts.indexOf(p) + 1}`;
    const cta = next
      ? `<button class="primary" data-sb-open="${esc(next.id)}">${started ? 'Continue' : 'Start'} with ${nextName(next)} <span>↗</span></button>`
      : `<button class="primary" data-sb-open="${esc(hubId)}">You’re caught up · see the map <span>↗</span></button>`;
    const status = `${live.length} of ${n} parts out` + (started ? ` · ${readLive} read` : '') + (soon ? ` · next up: Part ${S.parts.indexOf(soon) + 1}` : '');
    const lede = S.tagline || S.blurb || '';
    el.innerHTML =
      `<div class="sb-copy">
        <p class="sb-kicker"><span>A series</span><i></i><span>${n} parts${trackKeys.length > 1 ? ` · ${numWord(trackKeys.length)} tracks` : ''}</span></p>
        <h2>${esc(S.title)}</h2>
        ${lede ? `<p class="sb-lede">${esc(lede)}</p>` : ''}
        <div class="sb-actions">${cta}<button class="sb-map" data-sb-open="${esc(hubId)}">Series map <span>↗</span></button></div>
        <p class="sb-status">${esc(status)}</p>
      </div>
      <div class="sb-visual">
        <div class="sb-scroll"><svg class="sb-svg" viewBox="${Object.keys(S.tracks).length === 1 ? '0 60 760 100' : Object.keys(S.tracks).length === 3 ? '0 0 760 244' : '0 0 760 230'}" role="group" aria-label="Series map: ${n} parts${trackKeys.length > 1 ? ` across ${trackKeys.length} tracks` : ''}"></svg></div>
        <p class="sb-caption" aria-live="polite"></p>
        <p class="sb-legend" style="${colors(S.tracks[trackKeys[0]].color)}"><span><i class="lg-live"></i>Published</span><span><i class="lg-read"></i>Read</span><span><i class="lg-soon"></i>Coming soon</span></p>
      </div>`;
    const svg = el.querySelector('svg'), cap = el.querySelector('.sb-caption');
    const add = (tag, a, parent = svg, text) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (text != null) e.textContent = text; parent.appendChild(e); return e; };
    // Lanes: one per track, top to bottom in the order the tracks are listed.
    const lanesY = { 1: [115], 2: [72, 158], 3: [52, 115, 178] }[trackKeys.length] || trackKeys.map((_, k) => 40 + k * (150 / Math.max(1, trackKeys.length - 1)));
    const Y = Object.fromEntries(trackKeys.map((t, k) => [t, lanesY[k]]));
    const last = trackKeys.length - 1, above = t => trackKeys.indexOf(t) < last || last === 0;
    const hasBonus = !!S.bonus, xEnd = hasBonus ? 680 : 720, x0 = 46, dx = n > 1 ? (xEnd - x0) / (n - 1) : 0;
    // Long series pack their dots closer: shrink dots, halo, hit area and numbers so neighbours never overlap.
    const rLive = Math.min(12, dx * 0.42), rSoon = Math.min(9, dx * 0.34), k = rLive / 12, dense = dx < 24;
    trackKeys.forEach((t, k) => {
      add('line', { x1: 20, y1: Y[t], x2: 740, y2: Y[t], class: 'sb-lane' });
      add('text', { x: 20, y: k === last && last > 0 ? Y[t] + 52 : Y[t] - 40, class: 'sb-lane-name', style: colors(S.tracks[t].color) }, svg, S.tracks[t].name.toUpperCase());
    });
    const pts = S.parts.map((p, i) => [x0 + i * dx, Y[p.track]]);
    const bx = 724, by = trackKeys.length > 1 ? (Y[trackKeys[0]] + Y[trackKeys[last]]) / 2 : Y[trackKeys[0]];
    const lastLive = S.parts.reduce((k, p, i) => p.file ? i : k, -1);
    const pathTo = k => 'M' + pts.slice(0, k + 1).map(q => q.join(' ')).join(' L');
    add('path', { d: pathTo(n - 1) + (hasBonus ? ` L${bx} ${by}` : ''), class: 'sb-route' });
    if (lastLive > 0) add('path', { d: pathTo(lastLive), class: 'sb-route lit' });
    const tail = p => p.file ? (read.has(p.id) ? ' <em>read ✓</em>' : '') : ' <em>coming soon</em>';
    const describe = p => `${label(p)} — ${p.title}${p.file ? (read.has(p.id) ? ' · read' : '') : ' · coming soon'}`;
    const setCap = p => { cap.innerHTML = p ? `<b>${esc(label(p))}</b> ${esc(p.title)}${tail(p)}` : ''; };
    const nodes = [...S.parts.map((p, i) => ({ p, x: pts[i][0], y: pts[i][1], i })), ...(hasBonus ? [{ p: S.bonus, x: bx, y: by, bonus: true }] : [])];
    for (const { p, x, y, i, bonus } of nodes) {
      const tr = bonus ? null : S.tracks[p.track], isRead = read.has(p.id), isNext = next && p.id === next.id;
      const g = p.file ? add('a', { href: '?id=' + encodeURIComponent(p.id), 'data-sb-open': p.id, 'aria-label': describe(p) }) : add('g', { tabindex: 0, role: 'img', 'aria-label': describe(p) });
      g.setAttribute('class', 'sb-node' + (p.file ? ' live' : ' soon') + (isRead ? ' read' : '') + (isNext ? ' next' : ''));
      g.setAttribute('style', bonus ? '--cd:var(--sb-gold);--cl:var(--sb-gold)' : `--cd:${tr.color};--cl:${tr.lightColor || LIGHT[String(tr.color).toLowerCase()] || tr.color}`);
      if (isNext) add('circle', { cx: x, cy: y, r: bonus ? 19 : rLive + 7, class: 'sb-halo' }, g);
      add('circle', { cx: x, cy: y, r: bonus ? 22 : Math.min(22, Math.max(10, dx * 0.55)), class: 'sb-hit' }, g);
      if (bonus) add('path', { d: `M${x} ${y - 15}L${x + 15} ${y}L${x} ${y + 15}L${x - 15} ${y}Z`, class: 'sb-dot' }, g);
      else add('circle', { cx: x, cy: y, r: p.file ? rLive : rSoon, class: 'sb-dot' }, g);
      if (isRead) add('path', { d: `M${x - 5 * k} ${y}l${3.5 * k} ${3.5 * k} ${6.5 * k}-${7 * k}`, class: 'sb-tick' }, g);
      const num = add('text', { x, y: bonus ? y + 34 : y + (above(p.track) ? -(10 + rLive) : 20 + rLive), class: 'sb-num' }, g, bonus ? 'bonus' : String(i + 1));
      if (dense && !bonus) num.style.fontSize = '10px';
      g.addEventListener('mouseenter', () => setCap(p));
      g.addEventListener('focus', () => setCap(p));
    }
    svg.addEventListener('mouseleave', () => setCap(next || soon));
    setCap(next || soon);
    // On a phone the map scrolls sideways; bring the next part into view.
    const sc = el.querySelector('.sb-scroll'), focus = next || soon;
    if (sc.scrollWidth > sc.clientWidth && focus) {
      const fx = focus === S.bonus ? bx : pts[S.parts.indexOf(focus)][0];
      sc.scrollLeft = Math.max(0, (fx / 760) * sc.scrollWidth - sc.clientWidth / 2);
    }
  }

  // One <section class="series-band"> per series inside #seriesBand.
  host.innerHTML = list.map(S => `<section class="series-band" data-series-key="${esc(S.id)}" aria-label="Series: ${esc(S.title)}"></section>`).join('');
  const bands = [...host.children];
  const drawAll = () => list.forEach((S, k) => draw(S, bands[k]));
  host.addEventListener('click', e => {
    const t = e.target.closest('[data-sb-open]');
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute('data-sb-open'));
  });
  window.addEventListener('storage', e => { if (e.key === KEY) { drawAll(); if (typeof render === 'function') render(); } });
  window.addEventListener('pageshow', e => { if (e.persisted) drawAll(); });
  drawAll();
})();
