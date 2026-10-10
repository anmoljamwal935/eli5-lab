#!/usr/bin/env python3
"""Add an ELI5 explainer to the live site: upsert it into published.js, commit, push.

Usage:
  publish-eli5.py explainers/<slug>-eli5.html --title T --category C --minutes N \
      --summary S --bullet B1 --bullet B2 --nodes A,B,C --subcategory SUB
      [--card-svg card.svg] [--date YYYY-MM-DD] [--kind ai|fluid|inflation] [--color #hex] [--dry-run]

Only the explainer file and published.js are committed; other local changes are left alone.
"""
import argparse, datetime, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CATEGORIES = ['AI & Frontier', 'Monetary Architecture', 'Macroeconomics', 'Energy & Physics', 'Infrastructure', 'Distributed Systems']
PREFIX = 'window.PUBLISHED = '

a = argparse.ArgumentParser()
a.add_argument('file')
a.add_argument('--title', required=True)
a.add_argument('--category', required=True, choices=CATEGORIES)
a.add_argument('--minutes', required=True, type=int)
a.add_argument('--summary', required=True)
a.add_argument('--bullet', action='append', required=True)
a.add_argument('--nodes', required=True, help='three short caps labels for the card diagram, comma-separated')
a.add_argument('--kind', default='flow', help='card diagram style: ai, fluid, inflation, or anything else for a 3-box flow')
a.add_argument('--color', default='#ff8059')
a.add_argument('--subcategory', required=True, help='catalogue sub-heading inside the category, e.g. "AI data centres"')
a.add_argument('--date', default=datetime.date.today().isoformat(), type=datetime.date.fromisoformat, help='publication date, default today')
a.add_argument('--card-svg', type=pathlib.Path, help='catalogue card drawing: one <svg viewBox="0 0 320 155"> file, replaces the --nodes box diagram')
a.add_argument('--dry-run', action='store_true', help='update published.js but skip git')
args = a.parse_args()

html = pathlib.Path(args.file).resolve()
if html.parent != ROOT / 'explainers' or html.suffix != '.html' or ' ' in html.name or not html.is_file():
    sys.exit(f'expected an existing explainers/<slug>.html with no spaces, got {html}')
if '../eli5-study.css' not in html.read_text():
    sys.exit('explainer does not use the house format (missing ../eli5-study.css)')

card = None
if args.card_svg:
    card = args.card_svg.read_text().strip()
    # inlined into the catalogue page, so only a plain drawing is allowed
    if not card.startswith('<svg') or 'viewBox="0 0 320 155"' not in card or 'role="img"' not in card or 'aria-label=' not in card:
        sys.exit('card SVG must be one <svg viewBox="0 0 320 155" role="img" aria-label=...>')
    if re.search(r'<(script|style|foreignObject|image|use)\b|\son\w+\s*=|javascript:|href\s*=', card, re.I):
        sys.exit('card SVG may not contain script, style, foreignObject, image, use, event handlers or links')

entry = {
    'id': html.stem, 'title': args.title, 'category': args.category, 'minutes': args.minutes,
    'summary': args.summary, 'bullets': args.bullet, 'kind': args.kind, 'color': args.color,
    'nodes': [n.strip() for n in args.nodes.split(',')], 'file': f'explainers/{html.name}',
    'date': args.date.isoformat(), 'subcategory': args.subcategory,
}
if card:
    entry['card'] = card

pub = ROOT / 'published.js'
items = json.loads(pub.read_text().strip().removeprefix(PREFIX).removesuffix(';'))
items = [entry] + [e for e in items if e['id'] != entry['id']]
pub.write_text(PREFIX + json.dumps(items, indent=2, ensure_ascii=False) + ';\n')
print(f'published.js: {len(items)} entries, upserted {entry["id"]}')

if args.dry_run:
    sys.exit(0)

git = lambda *c: subprocess.run(['git', '-C', str(ROOT), *c], check=True)
paths = [str(html.relative_to(ROOT)), 'published.js']
git('add', '--', *paths)
git('commit', '-m', f'content: publish ELI5 "{args.title}"', '--', *paths)
git('pull', '--rebase', '--autostash', 'origin', 'main')
git('push', 'origin', 'HEAD:main')
print('pushed; Vercel deploys main automatically')
