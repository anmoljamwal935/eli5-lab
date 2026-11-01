"""Browser checker regression: catches the 4F Shock faults, passes the template."""
import contextlib
import importlib.util
import io
from pathlib import Path
import re
import tempfile
import unittest

HERE = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('render', HERE / 'check_render.py')
render = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(render)
SCRATCH = Path.home() / '.hermes/cache/scratch'
TEMPLATE = (HERE.parent / 'template.html').read_text()
PANEL = '\n    <section class="panel">'  # line start: the template also mentions it inside a comment

BAD_SVG = """<figure><svg viewBox="0 0 800 300" role="img" aria-label="Arrows through nodes.">
  <defs><marker id="m" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#aaa"/></marker></defs>
  <path d="M100 150H400" stroke="#aaa" stroke-width="3" marker-end="url(#m)"/>
  <circle cx="100" cy="150" r="52" fill="#ff8059" opacity=".2"/><circle cx="500" cy="150" r="52" fill="#76d5c1" opacity=".2"/>
  <text x="500" y="156" text-anchor="middle" fill="#fff" font-size="18">food</text>
  <path d="M440 156H560" stroke="#f87171" stroke-width="2"/>
</svg></figure>"""


def run(html):
    with tempfile.TemporaryDirectory(dir=SCRATCH) as d:
        for asset in ('eli5-study.css', 'eli5-study.js'):
            (Path(d) / asset).write_text('')
        page = Path(d) / 'explainers' / 'test-eli5.html'
        page.parent.mkdir()
        page.write_text(html)
        out = io.StringIO()
        with contextlib.redirect_stdout(out):
            code = render.main([str(page), '--shots', str(Path(d) / 'shots')])
        return code, out.getvalue()


class RenderTests(unittest.TestCase):
    def setUp(self):
        SCRATCH.mkdir(parents=True, exist_ok=True)
        self.good = re.sub(r'{{.*?}}', 'Example', TEMPLATE)

    def test_template_passes(self):
        code, out = run(self.good)
        self.assertEqual(0, code, out)

    def test_drawing_faults(self):
        code, out = run(self.good.replace(PANEL, PANEL + BAD_SVG, 1))
        self.assertEqual(1, code)
        self.assertIn('an arrow runs through a circle', out)
        self.assertIn('a line crosses the label "food"', out)

    def test_strike_is_allowed(self):
        code, out = run(self.good.replace(PANEL, PANEL + BAD_SVG.replace('<path d="M440', '<path class="strike" d="M440'), 1))
        self.assertNotIn('crosses the label "food"', out)

    def test_hand_relabelled_axis(self):
        # The 4F fault: zero drawn mid-chart, ticks retyped as 0 / m/2 / m.
        html = self.good.replace("ticks=neg?[-m,0,m]:[0,m/2,m]", "ticks=[-m,0,m]").replace(
            "x0=neg?260:60, span=neg?200:400", "x0=260, span=200").replace(
            "sx=x=>x0+Math.max(neg?-m:0,Math.min(m,x))*span/m", "sx=x=>x0+Math.max(-m,Math.min(m,x))*span/m").replace(
            "${esc(fmt(t))}</text>`", "${esc(fmt((t+m)/2))}</text>`")
        html = html.replace("return {truth:a,", "return {truth:a+5,").replace("['{{CORRECT METHOD}}',a,", "['Right',a+5,")
        code, out = run(html)
        self.assertEqual(1, code)
        self.assertIn('tick reads', out)

    def test_missing_ticks(self):
        code, out = run(self.good.replace('class="tick" ', ''))
        self.assertIn('lab: chart needs >= 2', out)


if __name__ == '__main__':
    unittest.main()
