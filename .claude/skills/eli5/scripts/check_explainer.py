#!/usr/bin/env python3
"""Structural lint only; not semantic, numerical, visual or publication approval.

Usage: check_explainer.py PAGE [--audit AUDIT.json] [--verify-hash]
--audit atomically merges verification.structural_lint and artifact_sha256.
--verify-hash requires --audit and compares its EXISTING artifact_sha256 first.
A missing/stale hash fails without modifying the audit. Without --verify-hash,
--audit records a new baseline, not a renewed approval of other audit evidence.
"""
import argparse
import hashlib
from html.parser import HTMLParser
import json
import math
import os
from pathlib import Path
import re
import tempfile


class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children = []

    def has_class(self, name):
        return name in self.attrs.get('class', '').split()

    def descendants(self, tag=None):
        for child in self.children:
            if isinstance(child, Node):
                if tag is None or child.tag == tag:
                    yield child
                yield from child.descendants(tag)

    def text(self):
        return ''.join(c.text() if isinstance(c, Node) else c for c in self.children)


class Document(HTMLParser):
    VOID = set('area base br col embed hr img input link meta param source track wbr'.split())

    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.current = self.root
        self.feed(html)
        self.close()

    def handle_starttag(self, tag, attrs):
        node = Node(tag, [(k, v or '') for k, v in attrs], self.current)
        self.current.children.append(node)
        if tag not in self.VOID:
            self.current = node

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        node = self.current
        while node.parent is not None:
            if node.tag == tag:
                self.current = node.parent
                return
            node = node.parent

    def handle_data(self, data):
        self.current.children.append(data)


def number(value):
    try:
        result = float(value)
        return result if math.isfinite(result) else None
    except (TypeError, ValueError):
        return None


def coordinate(value, extent):
    """Resolve bare/px/percentage lengths; defer other SVG units to browser."""
    value = str(value).strip()
    if value.endswith('%'):
        n = number(value[:-1])
        return n * extent / 100 if n is not None and extent is not None else None
    return number(value.removesuffix('px'))


def check(path, html):
    root = Document(html).root
    nodes = list(root.descendants())
    errors, warnings = [], []
    err, warn = errors.append, warnings.append
    if path.parent.name != 'explainers' or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*-eli5\.html', path.name):
        err('file must be explainers/<lowercase-kebab-slug>-eli5.html')
    if '{{' in root.text() or any('{{' in v for n in nodes for v in n.attrs.values()):
        err('template placeholders {{...}} left in the file')
    for name in ('study-masthead', 'eli5-study-container', 'eli5-takeaway-card', 'source-note', 'legend'):
        if not any(n.has_class(name) for n in nodes):
            err(f'missing class {name}')
    for tag, attr, asset in [('link', 'href', '../eli5-study.css'), ('script', 'src', '../eli5-study.js')]:
        if not any(n.tag == tag and n.attrs.get(attr) == asset for n in nodes):
            err(f'missing {asset}')
    for n in nodes:
        if n.tag == 'script' and 'src' in n.attrs:
            if n.attrs['src'] != '../eli5-study.js':
                err(f"external stylesheet/script not allowed: {n.attrs['src']}")
        if n.tag == 'link' and 'stylesheet' in n.attrs.get('rel', '').lower().split():
            if n.attrs.get('href') != '../eli5-study.css':
                err(f"external stylesheet/script not allowed: {n.attrs.get('href')}")
    svgs = [n for n in nodes if n.tag == 'svg']
    if len(svgs) < 5:
        err(f'only {len(svgs)} diagrams; an explainer needs a drawing in nearly every panel')
    boxy = 0
    for i, svg in enumerate(svgs, 1):
        vb = [number(v) for v in re.split(r'[\s,]+', svg.attrs.get('viewbox', '').strip())]
        valid_vb = len(vb) == 4 and all(v is not None for v in vb) and vb[2] > 0 and vb[3] > 0
        if not valid_vb:
            err(f'svg #{i}: missing or invalid viewBox')
        if svg.attrs.get('role', '').strip() != 'img':
            err(f'svg #{i}: missing role="img"')
        if not svg.attrs.get('aria-label', '').strip():
            err(f'svg #{i}: missing nonempty aria-label describing the drawing')
        for n in svg.descendants():
            size = number(n.attrs.get('font-size', '').removesuffix('px'))
            if size is not None and size < 14:
                err(f'svg #{i}: font-size {size:g} is unreadable on phones (min 14, prefer 16+)')
        for n in svg.descendants('path'):
            if (n.attrs.get('marker-end') or n.attrs.get('marker-start')) and len(re.findall(r'[Mm]', n.attrs.get('d', ''))) > 1:
                err(f'svg #{i}: one <path> holds several arrows but gets only one arrowhead; draw one path per arrow')
        for text in svg.descendants('text'):
            words = len(re.findall(r'[^\W\d_]{2,}', text.text()))
            if words > 10:
                err(f'svg #{i}: sentence inside a drawing ({words} words): {text.text()[:50]!r}; move it to a <p>')
        # This is only a conservative box-row heuristic, not collision testing.
        # Transforms and nested viewports require browser measurement.
        if any(n.tag == 'svg' or 'transform' in n.attrs for n in svg.descendants()) or 'transform' in svg.attrs:
            warn(f'svg #{i}: transformed/nested geometry needs browser inspection; box heuristic skipped')
            continue
        width, height = (vb[2], vb[3]) if valid_vb else (None, None)
        pts = [(coordinate(n.attrs.get('x', '0'), width), coordinate(n.attrs.get('y', '0'), height)) for n in svg.descendants('text')]
        labelled = 0
        for rect in svg.descendants('rect'):
            a = rect.attrs
            if not a.get('stroke') or a.get('fill', '').lower() not in ('#202020', '#171a1d', '#1a1c18', 'none', 'transparent'):
                continue
            x, y, w, h = [coordinate(a.get(k, '0'), extent) for k, extent in [('x', width), ('y', height), ('width', width), ('height', height)]]
            if None in (x, y, w, h):
                warn(f'svg #{i}: unsupported box coordinates; inspect in browser')
                continue
            if any(tx is not None and ty is not None and x <= tx <= x+w and y <= ty <= y+h for tx, ty in pts):
                labelled += 1
        if labelled >= 2:
            boxy += 1
            warn(f'svg #{i}: {labelled} labelled boxes; show geometry instead (one formula box-row per explainer is allowed with justification)')
    if boxy > 1:
        err(f'{boxy} diagrams are mostly labelled boxes (max 1)')
    panels = [n for n in nodes if n.tag == 'section' and n.has_class('panel')]
    if not panels:
        err('missing required section.panel elements')
    if len(panels) < 6:
        warn(f'only {len(panels)} panels; verify teaching-inventory coverage')
    for i, panel in enumerate(panels, 1):
        children = [c for c in panel.children if isinstance(c, Node) or c.strip()]
        first = children[0] if children else None
        role = first.text().strip() if isinstance(first, Node) and first.tag == 'p' and first.has_class('kicker') else ''
        if not role:
            err(f'panel #{i}: must start with nonempty <p class="kicker">ROLE</p>')
        headings = [c for c in panel.children if isinstance(c, Node) and c.tag == 'h2']
        if len(headings) != 1 or not headings[0].text().strip():
            err(f'panel #{i}: requires one nonempty <h2>')
        elif len(headings[0].text().split()) > 8:
            err(f'panel #{i}: heading exceeds 8 words')
        exception = re.sub(r'[^a-z]+', ' ', role.lower()).strip() in ('field guide', 'so what')
        if not exception and not list(panel.descendants('svg')):
            err(f'panel #{i}: missing required drawing (only Field guide / So what may omit it)')
    notes = sum(n.has_class('note') for n in nodes)
    if notes > 2:
        err(f'{notes} caveat notes; max 2 per explainer')
    sliders = [n for n in nodes if n.tag == 'input' and n.attrs.get('type', '').lower() == 'range']
    if not sliders:
        warn('no lab sliders; acceptable only with a documented not-applicable reason')
    else:
        if not 2 <= len(sliders) <= 4:
            err(f'lab requires 2–4 sliders; found {len(sliders)}')
        for i, slider in enumerate(sliders, 1):
            a = slider.attrs
            named = bool(a.get('aria-label', '').strip())
            refs = a.get('aria-labelledby', '').split()
            named |= bool(refs) and all(any(n.attrs.get('id') == ref and n.text().strip() for n in nodes) for ref in refs)
            named |= any(n.tag == 'label' and n.text().strip() and ((a.get('id') and n.attrs.get('for') == a['id']) or slider in list(n.descendants())) for n in nodes)
            if not named:
                err(f'slider #{i}: missing accessible label')
        presets = {id(b): b for n in nodes if n.has_class('presets') for b in n.descendants('button')}
        if not 2 <= len(presets) <= 4:
            err(f'lab requires 2–4 preset buttons; found {len(presets)}')
        if any(not b.text().strip() and not b.attrs.get('aria-label', '').strip() for b in presets.values()):
            err('preset buttons require nonempty labels')
        if not any(n.has_class('ledger') for n in nodes):
            err('lab has no ledger showing the working')
    css = '\n'.join(n.text() for n in nodes if n.tag == 'style')
    site_css = path.resolve().parent.parent / 'eli5-study.css'
    if site_css.exists():
        styled = set(re.findall(r'\.(-?[_a-zA-Z][\w-]*)', re.sub(r'url\([^)]*\)', '', css + site_css.read_text(encoding='utf-8'))))
        scripts = '\n'.join(n.text() for n in nodes if n.tag == 'script')
        used = {c for n in nodes for c in n.attrs.get('class', '').split()}
        for name in sorted(used - styled):
            if not re.search(r'\b' + re.escape(name) + r'\b', scripts):
                err(f'class "{name}" has no CSS rule (page <style> or eli5-study.css); restore the template rule or remove the class')
    else:
        warn(f'{site_css} not found; class-to-CSS check skipped')
    if not re.search(r'@media[^{}]*\(\s*max-width\s*:\s*700px\s*\)', css):
        err('missing phone media rule (@media (max-width:700px)); scrolling still needs browser testing')
    return {'scope': 'structural lint only; not semantic, numerical, visual or publication approval', 'errors': errors, 'warnings': warnings, 'counts': {'diagrams': len(svgs), 'panels': len(panels), 'notes': notes}}


def atomic_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix='.' + path.name + '.', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as stream:
            json.dump(data, stream, indent=2, ensure_ascii=False)
            stream.write('\n')
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('page', type=Path)
    parser.add_argument('--audit', type=Path)
    parser.add_argument('--verify-hash', action='store_true')
    args = parser.parse_args(argv)
    if args.verify_hash and not args.audit:
        parser.error('--verify-hash requires --audit')
    try:
        if args.audit and args.audit.resolve() == args.page.resolve():
            raise ValueError('audit must not overwrite the HTML artifact')
        raw = args.page.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        audit = json.loads(args.audit.read_text(encoding='utf-8')) if args.audit and args.audit.exists() else {}
        if not isinstance(audit, dict) or not isinstance(audit.get('verification', {}), dict):
            raise ValueError('audit and verification must be JSON objects')
        old_hash = audit.get('verification', {}).get('artifact_sha256')
        if args.verify_hash and old_hash != digest:
            print('ERROR artifact hash missing or stale; artifact changed or has no baseline. Audit left unchanged.')
            return 1
        result = check(args.page, raw.decode('utf-8'))
        for message in result['errors']:
            print('ERROR', message)
        for message in result['warnings']:
            print('WARN ', message)
        print(f"{len(result['errors'])} errors, {len(result['warnings'])} warnings; {result['counts']}")
        print(result['scope'])
        if args.audit:
            verification = audit.setdefault('verification', {})
            verification['artifact_sha256'] = digest
            verification['structural_lint'] = dict(result, artifact_sha256=digest, artifact_path=str(args.page.resolve()))
            atomic_json(args.audit, audit)
        return int(bool(result['errors']))
    except (OSError, ValueError, UnicodeError) as exc:
        print(f'ERROR {exc}')
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
