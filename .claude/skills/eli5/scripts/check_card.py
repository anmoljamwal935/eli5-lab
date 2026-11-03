#!/usr/bin/env python3
"""Lint a catalogue card SVG before publish-eli5.py --card-svg.

Usage: check_card.py CARD.svg
Static checks only: shell, safety (same rules as the publisher), labels, edges,
palette, labelled boxes. Still inspect the rendered card on the local homepage.
Exit 0 = no errors, 1 = errors.
"""
import re
import sys
import xml.etree.ElementTree as ET

W, H, EDGE = 320, 155, 16
PALETTE = {'#ff8059', '#76d5c1', '#f5c76a', '#c3b8ff', '#f87171', '#ec6a94',  # #ec6a94: series 'wrong intuition' rose
           '#f1eee8', '#a5a29c',
           '#57534f', '#73706a', '#202020', '#181818', 'none'}
UNSAFE = re.compile(r'<(script|style|foreignObject|image|use)\b|\son\w+\s*=|javascript:|href\s*=', re.I)


def check(src):
    errors, warns = [], []
    src = src.strip()
    if not src.startswith('<svg') or f'viewBox="0 0 {W} {H}"' not in src:
        errors.append(f'must be one <svg viewBox="0 0 {W} {H}"> element')
    if UNSAFE.search(src):
        errors.append('no script, style, foreignObject, image, use, event handlers or links')
    try:
        root = ET.fromstring(src)
    except ET.ParseError as exc:
        return errors + [f'not well-formed XML: {exc}'], warns
    if root.get('role') != 'img' or not (root.get('aria-label') or '').strip():
        errors.append('needs role="img" and a one-sentence aria-label')

    texts, rects = [], []

    def walk(node, inherited):
        attrs = {**inherited, **{k: v for k, v in node.attrib.items() if k in ('font-size', 'text-anchor')}}
        tag = node.tag.split('}')[-1]
        for key in ('fill', 'stroke'):
            value = (node.get(key) or '').lower()
            if value and value not in PALETTE:
                warns.append(f'{tag} {key}={value} is outside the house palette')
        if tag == 'text':
            texts.append((node, attrs))
        elif tag == 'rect':
            rects.append(node)
        for child in node:
            walk(child, attrs)

    walk(root, {})
    if len(texts) > 3:
        errors.append(f'{len(texts)} labels; use at most 3, the drawing should carry the idea')
    for node, attrs in texts:
        label = ''.join(node.itertext()).strip()
        size = float(attrs.get('font-size', 0) or 0)
        x, y = float(node.get('x', 0)), float(node.get('y', 0))
        width = 0.6 * size * len(label)  # monospace advance
        left = {'middle': x - width / 2, 'end': x - width}.get(attrs.get('text-anchor'), x)
        if len(label.split()) > 3:
            errors.append(f'label "{label}" is over 3 words')
        if label != label.upper():
            warns.append(f'label "{label}" is not CAPS')
        if not 9 <= size <= 12:
            errors.append(f'label "{label}" font-size {size:g}; use 9-12 (set font-size on the text or a parent <g>)')
        if left < EDGE or left + width > W - EDGE or y - size < EDGE or y > H - EDGE + 4:
            errors.append(f'label "{label}" is within {EDGE} units of the edge or outside the card')
        for r in rects:
            if r.get('stroke') and r.get('fill', 'none').lower() in ('none', '#202020', '#181818'):
                rx, ry, rw, rh = (float(r.get(k, 0)) for k in ('x', 'y', 'width', 'height'))
                if rx <= x <= rx + rw and ry <= y <= ry + rh:
                    errors.append(f'label "{label}" sits in an outlined box; draw the idea instead of words in boxes')
    return errors, warns


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1:
        print(__doc__)
        return 1
    errors, warns = check(open(argv[0], encoding='utf-8').read())
    for message in errors:
        print('ERROR', message)
    for message in warns:
        print('WARN ', message)
    print(f'{len(errors)} errors, {len(warns)} warnings; static card lint only, inspect it rendered')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
