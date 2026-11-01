#!/usr/bin/env python3
"""Browser checks for an ELI5 explainer; complements check_explainer.py (static lint).

Usage: check_render.py PAGE [--shots DIR]

Renders PAGE in Chrome (Playwright) and fails on:
- JS errors; NaN/Infinity/undefined in the lab chart or ledger
- SVG text clipped by its viewBox, or overlapping other text
- a stroked line/connector crossing a text label (opt out: class="strike" for deliberate strike-throughs)
- an arrow (marker-start/end) running through a circle, ellipse or node box
- lab chart: missing .tick[data-v] ticks, tick labels that disagree with labConfig.format,
  ticks not evenly placed, or bars whose ends disagree with the tick scale; checked at
  the defaults, every preset, and every all-min/all-max slider combination
- whole-page horizontal overflow at 390px
It saves screenshots of the hero and every panel at 1280px and 390px for a final look.
Passing is necessary, not sufficient: it does not judge meaning, accuracy or taste.
"""
import argparse
import itertools
from pathlib import Path
import sys
import tempfile

from playwright.sync_api import sync_playwright

GEOMETRY_JS = r"""() => {
  const out = [], seen = new Set();
  const add = m => { if (!seen.has(m)) { seen.add(m); out.push(m); } };
  const svgs = [...document.querySelectorAll('svg')];
  const name = svg => svg.id ? '#' + svg.id : 'svg #' + (svgs.indexOf(svg) + 1);
  const label = t => JSON.stringify(t.textContent.trim().slice(0, 30));
  const box = el => { const r = el.getBoundingClientRect(); return {l: r.left, r: r.right, t: r.top, b: r.bottom}; };
  const shrink = (b, d) => ({l: b.l + d, r: b.r - d, t: b.t + d, b: b.b - d});
  const inside = (p, b) => p.x > b.l && p.x < b.r && p.y > b.t && p.y < b.b;
  const hit = (a, c) => a.l < c.r && c.l < a.r && a.t < c.b && c.t < a.b;
  const isNone = v => !v || v === 'none' || v === 'transparent';
  for (const svg of svgs) {
    if (!svg.getClientRects().length) continue;
    const vb = svg.viewBox.baseVal, ctm = svg.getScreenCTM();
    const frame = vb && vb.width ? {l: ctm.e + vb.x * ctm.a, r: ctm.e + (vb.x + vb.width) * ctm.a,
                                    t: ctm.f + vb.y * ctm.d, b: ctm.f + (vb.y + vb.height) * ctm.d} : box(svg);
    const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim()).map(t => ({t, b: box(t)}));
    for (const {t, b} of texts)
      if (b.l < frame.l - 1 || b.r > frame.r + 1 || b.t < frame.t - 1 || b.b > frame.b + 1) add(`${name(svg)}: text clipped by the viewBox: ${label(t)}`);
    for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++)
      if (hit(shrink(texts[i].b, 1), shrink(texts[j].b, 1))) add(`${name(svg)}: text overlaps text: ${label(texts[i].t)} x ${label(texts[j].t)}`);
    const nodes = [...svg.querySelectorAll('circle,ellipse,rect')].filter(n => {
      const s = getComputedStyle(n);
      if (isNone(s.fill) && isNone(s.stroke)) return false;
      if (n.tagName !== 'rect') return true;
      const b = n.getBBox(); return vb && vb.width && b.width * b.height < 0.25 * vb.width * vb.height;
    });
    for (const el of svg.querySelectorAll('path,line,polyline')) {
      const s = getComputedStyle(el);
      if (isNone(s.stroke) || el.classList.contains('strike') || el.closest('.strike')) continue;
      const arrow = !isNone(s.markerEnd) || !isNone(s.markerStart), bb = el.getBBox();
      if (el.tagName === 'path' && !arrow && !isNone(s.fill) && bb.width > 1 && bb.height > 1) continue;  // filled areas are not connectors
      const len = el.getTotalLength(), m = el.getScreenCTM();
      for (let d = 0; d <= len; d += 3) {
        const q = el.getPointAtLength(d), p = new DOMPoint(q.x, q.y).matrixTransform(m);
        for (const {t, b} of texts) if (inside(p, shrink(b, 2))) add(`${name(svg)}: a line crosses the label ${label(t)}`);
        if (!arrow || d < 6 || d > len - 6) continue;
        for (const n of nodes) {
          const local = new DOMPoint(p.x, p.y).matrixTransform(n.getScreenCTM().inverse());
          if (n.isPointInFill(local) && !n.isPointInStroke(local))
            add(`${name(svg)}: an arrow runs through a ${n.tagName}; start and end arrows at shape edges`);
        }
      }
    }
  }
  return out;
}"""

LAB_JS = r"""(scenario) => {
  const out = [], chart = document.getElementById('labChart');
  const say = m => out.push(`lab (${scenario}): ${m}`);
  if (window.labResults && window.labResults.valid === false) say('labResults.valid is false');
  const text = chart.textContent + ' ' + (document.getElementById('ledger') || {textContent: ''}).textContent;
  if (/NaN|Infinity|undefined/.test(text)) say('NaN/Infinity/undefined shown in the chart or ledger');
  const ticks = [...chart.querySelectorAll('.tick[data-v]')].map(t => ({t, v: +t.dataset.v, x: +t.getAttribute('x')}));
  if (ticks.length < 2) { out.push('lab: chart needs >= 2 <text class="tick" data-v="..."> ticks placed by the scale function; do not hand-place axis labels'); return out; }
  const fmt = typeof labConfig !== 'undefined' && labConfig.format;
  for (const {t, v} of ticks)
    if (fmt && t.textContent.trim() !== String(fmt(v)).trim()) say(`tick reads "${t.textContent.trim()}" but sits at ${fmt(v)}`);
  const a = ticks[0], z = ticks[ticks.length - 1];
  if (a.v === z.v) { say('ticks have no range'); return out; }
  const k = (z.x - a.x) / (z.v - a.v), at = v => a.x + (v - a.v) * k;
  for (const {v, x} of ticks) if (Math.abs(at(v) - x) > 1) say(`tick ${v} is off the axis scale`);
  const lo = Math.min(a.v, z.v), hi = Math.max(a.v, z.v), zero = at(Math.min(hi, Math.max(lo, 0)));
  for (const r of chart.querySelectorAll('rect[data-v]')) {
    const v = +r.dataset.v, x = +r.getAttribute('x'), w = +r.getAttribute('width');
    if (Math.abs(at(Math.min(hi, Math.max(lo, v))) - zero) < 3) continue;  // near-zero bars may keep a minimum visible width
    const end = Math.abs(x - zero) < Math.abs(x + w - zero) ? x + w : x;
    if (Math.abs(end - at(Math.min(hi, Math.max(lo, v)))) > 1.5) say(`bar for ${v} ends at the axis value ${((end - a.x) / k + a.v).toPrecision(3)}`);
    if (w > 0.5 && Math.abs(Math.min(x, x + w) - zero) > 1.5 && Math.abs(Math.max(x, x + w) - zero) > 1.5) say(`bar for ${v} does not start at zero`);
  }
  return out;
}"""


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('page', type=Path)
    parser.add_argument('--shots', type=Path, help='screenshot directory (default: a new temp dir)')
    args = parser.parse_args(argv)
    shots = args.shots or Path(tempfile.mkdtemp(prefix='eli5-shots-'))
    shots.mkdir(parents=True, exist_ok=True)
    errors, js_errors = [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        page = browser.new_page(viewport={'width': 1280, 'height': 900})
        page.on('pageerror', lambda e: js_errors.append(str(e)))
        page.on('console', lambda m: m.type == 'error' and js_errors.append(m.text))
        page.goto(args.page.resolve().as_uri())
        page.wait_for_load_state('load')
        page.evaluate('document.fonts.ready')
        errors += page.evaluate(GEOMETRY_JS)
        if page.locator('#labChart').count():
            ids = page.evaluate("[...document.querySelectorAll('.lab input[type=range]')].map(s=>s.id)")
            limits = page.evaluate("[...document.querySelectorAll('.lab input[type=range]')].map(s=>[s.min||'0',s.max||'100'])")
            scenarios = [('defaults', None)]
            scenarios += [(f'preset "{t.strip()}"', i) for i, t in enumerate(page.locator('.presets button').all_inner_texts())]
            scenarios += [('sliders ' + '/'.join('max' if c else 'min' for c in combo), combo)
                          for combo in itertools.islice(itertools.product((0, 1), repeat=len(ids)), 16)]
            for label, how in scenarios:
                if isinstance(how, int):
                    page.locator('.presets button').nth(how).click()
                elif how is not None:
                    for sid, (lo, hi), c in zip(ids, limits, how):
                        page.evaluate("([id,v])=>{const s=document.getElementById(id);s.value=v;s.dispatchEvent(new Event('input',{bubbles:true}))}", [sid, hi if c else lo])
                errors += page.evaluate(LAB_JS, label)
                errors += [e for e in page.evaluate(GEOMETRY_JS) if e.startswith('#labChart')]
        targets = page.locator('section.hero, section.panel')
        for i in range(targets.count()):
            targets.nth(i).screenshot(path=str(shots / f'desktop-{i:02d}.png'))
        page.set_viewport_size({'width': 390, 'height': 844})
        if page.evaluate('document.scrollingElement.scrollWidth > window.innerWidth + 1'):
            errors.append('page scrolls sideways at 390px; only figures may scroll')
        for i in range(targets.count()):
            targets.nth(i).screenshot(path=str(shots / f'phone-{i:02d}.png'))
        browser.close()
    errors = [f'JS error: {e}' for e in dict.fromkeys(js_errors)] + list(dict.fromkeys(errors))
    for e in errors:
        print('ERROR', e)
    print(f'{len(errors)} errors; screenshots in {shots}')
    print('browser checks only; still look at every screenshot, and test lab numbers independently')
    return int(bool(errors))


if __name__ == '__main__':
    sys.exit(main())
