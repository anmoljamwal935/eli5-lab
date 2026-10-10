#!/usr/bin/env python3
"""Link previews, sitemap and RSS feed, all generated from published.js.

Usage: site_meta.py            backfill every explainer
publish-eli5.py imports build() and runs it for the one explainer it publishes.

Writes assets/og/<id>.png (title + card, 1200x630; WhatsApp and X don't show SVG),
injects preview tags into each explainer's <head>, rewrites sitemap.xml and feed.xml.
Rendering needs python3.12 with Playwright and Google Chrome installed.
"""
import base64, datetime, email.utils, hashlib, html, json, pathlib, re, urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://eli5-seven-mu.vercel.app'
PREFIX = 'window.PUBLISHED = '
START, END = '<!-- link-preview:start -->', '<!-- link-preview:end -->'
BLOCK = re.compile(re.escape(START) + '.*?' + re.escape(END) + r'\n?', re.S)

PAGE = '''<!doctype html><meta charset="utf-8"><style>
@font-face{{font-family:Outfit;src:url(data:font/ttf;base64,{font})}}
body{{margin:0;width:1200px;height:630px;box-sizing:border-box;padding:64px;background:#181818;color:#f1eee8;
font-family:Outfit,system-ui;display:grid;grid-template-columns:500px 1fr;gap:40px;align-items:center;position:relative}}
.k{{font:600 18px/1 monospace;letter-spacing:2px;text-transform:uppercase;color:{color};margin-bottom:28px}}
h1{{font-size:56px;line-height:1.05;letter-spacing:-1.5px;font-weight:600;margin:0 0 24px}}
p{{font-size:24px;line-height:1.35;color:#a5a29c;margin:0}}
svg{{width:100%;height:auto;display:block}}
.b{{position:absolute;left:64px;bottom:44px;font:600 18px monospace;letter-spacing:2px}}
</style><div><div class="k">{kicker}</div><h1>{title}</h1><p>{summary}</p></div><div>{card}</div><div class="b">ELI5 LAB</div>'''


def page_url(e):
    return f'{SITE}/{e["file"].removesuffix(".html")}'  # cleanUrls: no .html


def render(jobs):
    """jobs: [(png path, fields for PAGE)]; one browser for all of them."""
    from playwright.sync_api import sync_playwright
    font = base64.b64encode((ROOT / 'assets/outfit.ttf').read_bytes()).decode()
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        page = browser.new_page(viewport={'width': 1200, 'height': 630})
        (ROOT / 'assets/og').mkdir(exist_ok=True)
        for out, f in jobs:
            page.set_content(PAGE.format(font=font, **{k: v if k == 'card' else html.escape(v) for k, v in f.items()}))
            page.evaluate('document.fonts.ready')
            page.screenshot(path=out)
        browser.close()


def tags(e, image):
    a = html.escape
    version = hashlib.sha256(image.read_bytes()).hexdigest()[:8]  # new image, new URL, so previews refresh
    return '\n'.join([START,
        f'<meta name="description" content="{a(e["summary"])}">',
        f'<link rel="canonical" href="{page_url(e)}">',
        '<meta property="og:type" content="article">',
        '<meta property="og:site_name" content="ELI5 Lab">',
        f'<meta property="og:title" content="{a(e["title"])}">',
        f'<meta property="og:description" content="{a(e["summary"])}">',
        f'<meta property="og:url" content="{page_url(e)}">',
        f'<meta property="og:image" content="{SITE}/assets/og/{e["id"]}.png?v={version}">',
        '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{a(e["title"])}">',
        f'<meta property="article:published_time" content="{e["date"]}">',
        '<meta name="twitter:card" content="summary_large_image">',
        END]) + '\n'


def inject(doc, block):
    """Drop any old preview block, then put the new one just before </head>. Idempotent."""
    return BLOCK.sub('', doc).replace('</head>', block + '</head>', 1)


def sitemap(items):
    urls = [(SITE + '/', max(e['date'] for e in items))] + [(page_url(e), e['date']) for e in items]
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + ''.join(f'<url><loc>{html.escape(u)}</loc><lastmod>{d}</lastmod></url>\n' for u, d in urls) + '</urlset>\n')


def feed(items):
    day = lambda d: email.utils.format_datetime(datetime.datetime.fromisoformat(d).replace(tzinfo=datetime.timezone.utc))
    x = html.escape
    entries = ''.join(f'<item><title>{x(e["title"])}</title><link>{x(page_url(e))}</link><guid>{x(page_url(e))}</guid>'
                      f'<pubDate>{day(e["date"])}</pubDate><category>{x(e["category"])}</category>'
                      f'<description>{x(e["summary"])}</description></item>\n'
                      for e in sorted(items, key=lambda e: e['date'], reverse=True))
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>ELI5 Lab</title>'
            f'<link>{SITE}/</link><description>Interactive, first-principles visual explainers.</description>\n'
            + entries + '</channel></rss>\n')


def build(items, only=None):
    """Previews for the ids in `only` (all if None), plus the homepage image, sitemap and feed.
    Returns the repo-relative paths it wrote."""
    chosen = [e for e in items if only is None or e['id'] in only]
    newest = max(items, key=lambda e: e['date'])
    og = ROOT / 'assets/og'
    jobs = [(og / f'{e["id"]}.png', dict(title=e['title'], summary=e['summary'], card=e['card'], color=e['color'],
                                          kicker=f'{e["category"]} · {e["minutes"]} min')) for e in chosen]
    jobs.append((og / 'index.png', dict(title='Make complexity click.', summary='Interactive, first-principles visual explainers.',
                                        card=newest['card'], color=newest['color'], kicker='Visual explainers')))
    render(jobs)
    written = [str(p.relative_to(ROOT)) for p, _ in jobs]
    for e in chosen:
        path = ROOT / urllib.parse.unquote(e['file'])
        path.write_text(inject(path.read_text(), tags(e, og / f'{e["id"]}.png')))
        written.append(str(path.relative_to(ROOT)))
    (ROOT / 'sitemap.xml').write_text(sitemap(items))
    (ROOT / 'feed.xml').write_text(feed(items))
    return written + ['sitemap.xml', 'feed.xml']


def _selftest():
    once = inject('<head><title>t</title></head>', f'{START}\nA\n{END}\n')
    assert once == f'<head><title>t</title>{START}\nA\n{END}\n</head>'
    twice = inject(once, f'{START}\nB\n{END}\n')
    assert twice == once.replace('A', 'B')


if __name__ == '__main__':
    _selftest()
    for path in build(json.loads((ROOT / 'published.js').read_text().strip().removeprefix(PREFIX).removesuffix(';'))):
        print('wrote', path)
