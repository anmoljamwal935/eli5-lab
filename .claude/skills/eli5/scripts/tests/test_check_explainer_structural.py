"""Regression tests for structural lint and durable audit hash handling."""
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('checker', Path(__file__).resolve().parents[1] / 'check_explainer.py')
checker = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checker)
SCRATCH = Path.home() / '.hermes/cache/scratch'


def page():
    svg = "<figure><svg role='img' aria-label='Amounts compared' viewBox='0 0 800 300'><rect x='10%' y='20%' width='25%' height='30%' fill='#ff8059'/><text x='50%' y='50%' font-size='16'>Output</text></svg></figure>"
    panel = "<section class='extra panel'><p class='kicker extra'>The mechanism</p><h2>A short <em>heading</em></h2><p>Explanation.</p>" + svg + '</section>'
    return """<!doctype html><html><head><link rel='stylesheet' href='../eli5-study.css'><style>@media (max-width: 700px) {figure {overflow-x:auto}}</style></head><body>
<header class='other study-masthead'></header><main class='eli5-study-container'><p class='source-note'>Source</p><div class='legend'></div>""" + panel * 6 + """<div class='eli5-takeaway-card'>Takeaway</div>
<label for='a'>Output</label><input type='range' id='a'><label>Input<input type='range' id='b'></label>
<div class='presets'><button>First</button><button>Second</button></div><div class='ledger'></div></main><script src='../eli5-study.js'></script></body></html>"""


class StructuralTests(unittest.TestCase):
    def lint(self, html):
        return checker.check(Path('explainers/test-eli5.html'), html)

    def test_percent_coords_valid_and_single_quotes_multiple_classes(self):
        self.assertEqual([], self.lint(page())['errors'])

    def test_missing_empty_aria_and_role(self):
        for old, new, expected in [(" aria-label='Amounts compared'", '', 'aria-label'), ("aria-label='Amounts compared'", "aria-label='  '", 'aria-label'), (" role='img'", '', 'role=')]:
            with self.subTest(expected=expected, new=new):
                self.assertTrue(any(expected in e for e in self.lint(page().replace(old, new, 1))['errors']))

    def test_several_arrows_in_one_marked_path(self):
        arrows = "<defs><marker id='a'><path d='M0 0L8 4L0 8Z'/></marker></defs><path d='M10 10H90M10 50H90' stroke='#fff' marker-end='url(#a)'/>"
        html = page().replace("<text x='50%'", arrows + "<text x='50%'", 1)
        self.assertTrue(any('one path per arrow' in e for e in self.lint(html)['errors']))

    def test_class_without_css_rule(self):
        with tempfile.TemporaryDirectory(dir=SCRATCH) as d:
            (Path(d) / 'eli5-study.css').write_text('.other,.study-masthead,.eli5-study-container,.eli5-takeaway-card,.source-note,.legend,.panel,.kicker,.presets,.ledger,.extra{}')
            site = Path(d) / 'explainers' / 'test-eli5.html'
            site.parent.mkdir()
            self.assertEqual([], checker.check(site, page())['errors'])
            errors = checker.check(site, page().replace("<div class='ledger'>", "<div class='ledger field-grid'>"))['errors']
            self.assertEqual(['class "field-grid" has no CSS rule (page <style> or eli5-study.css); restore the template rule or remove the class'], errors)

    def test_long_heading_nested_text(self):
        html = page().replace('A short <em>heading</em>', 'One two three four five six seven <em>eight nine</em>', 1)
        self.assertTrue(any('exceeds 8' in e for e in self.lint(html)['errors']))

    def test_role_must_be_nonempty_and_first(self):
        for html in [page().replace('The mechanism', ' ', 1), page().replace("<p class='kicker extra'>", "<p class='not-kicker'>", 1)]:
            self.assertTrue(any('ROLE' in e for e in self.lint(html)['errors']))

    def test_drawing_required_except_documented_roles(self):
        html = page().replace('<figure>', '<div>', 1)
        # Removing the entire SVG from one panel leaves five diagrams elsewhere.
        start, end = html.index('<svg'), html.index('</svg>') + len('</svg>')
        html = html[:start] + html[end:]
        self.assertTrue(any('missing required drawing' in e for e in self.lint(html)['errors']))
        for role in ['Field guide', 'So what']:
            self.assertFalse(any('missing required drawing' in e for e in self.lint(html.replace('The mechanism', role, 1))['errors']))

    def test_slider_and_preset_counts_and_labels(self):
        variants = [(page().replace("<input type='range' id='b'>", ''), '2–4 sliders'), (page().replace('<button>Second</button>', ''), '2–4 preset'), (page().replace("<label for='a'>Output</label>", ''), 'accessible label'), (page().replace("<div class='ledger'></div>", ''), 'ledger')]
        for html, expected in variants:
            self.assertTrue(any(expected in e for e in self.lint(html)['errors']), expected)
        for html, expected in [(page().replace('</main>', "<input type='range' aria-label='x'>" * 3 + '</main>'), '2–4 sliders'), (page().replace('<button>Second</button>', '<button>More</button>' * 4), '2–4 preset')]:
            self.assertTrue(any(expected in e for e in self.lint(html)['errors']))

    def test_one_formula_warning_allowed_two_error(self):
        boxes = "<rect x='0%' y='0%' width='25%' height='30%' fill='#202020' stroke='#57534f'/><text x='10%' y='20%'>First</text><rect x='50%' y='0%' width='25%' height='30%' fill='#202020' stroke='#57534f'/><text x='60%' y='20%'>Second</text>"
        result = self.lint(page().replace('</svg>', boxes + '</svg>', 1))
        self.assertEqual([], result['errors'])
        self.assertEqual(1, sum('formula box-row' in w for w in result['warnings']))
        self.assertTrue(any('max 1' in e for e in self.lint(page().replace('</svg>', boxes + '</svg>', 2))['errors']))

    def test_script_fake_markup_does_not_supply_missing_role(self):
        html = page().replace(" role='img'", '') + '<script>const s=`<svg role="img" aria-label="fake"></svg>`;</script>'
        self.assertEqual(6, sum('role=' in e for e in self.lint(html)['errors']))
        self.assertEqual(6, self.lint(html)['counts']['diagrams'])

    def test_unsupported_coords_and_transforms_do_not_crash(self):
        self.lint(page().replace("x='50%'", "x='calc(50% - 2px)'"))
        self.assertTrue(self.lint(page().replace("<svg role=", "<svg transform='translate(2 3)' role=", 1))['warnings'])


class AuditTests(unittest.TestCase):
    def setUp(self):
        SCRATCH.mkdir(parents=True, exist_ok=True)
        self.tmp = tempfile.TemporaryDirectory(prefix='eli5-check-tests-', dir=SCRATCH)
        self.addCleanup(self.tmp.cleanup)
        self.path = Path(self.tmp.name) / 'explainers/test-eli5.html'
        self.path.parent.mkdir()
        self.path.write_text(page(), encoding='utf-8')
        self.audit = Path(self.tmp.name) / 'audit.json'

    def run_check(self, *extra):
        with contextlib.redirect_stdout(io.StringIO()):
            return checker.main([str(self.path), '--audit', str(self.audit), *extra])

    def test_merge_preserves_unrelated_evidence_and_hash(self):
        self.audit.write_text(json.dumps({'source': {'title': 'Keep'}, 'verification': {'semantic_review': 'not run'}, 'publication': {'status': 'blocked'}}))
        self.assertEqual(0, self.run_check())
        result = json.loads(self.audit.read_text())
        self.assertEqual('Keep', result['source']['title'])
        self.assertEqual('not run', result['verification']['semantic_review'])
        self.assertEqual('blocked', result['publication']['status'])
        self.assertEqual(hashlib.sha256(self.path.read_bytes()).hexdigest(), result['verification']['artifact_sha256'])
        self.assertIn('not semantic', result['verification']['structural_lint']['scope'])
        self.assertEqual(0, self.run_check('--verify-hash'))
        self.assertEqual([], list(self.audit.parent.glob('.audit.json.*')))

    def test_stale_hash_is_not_overwritten(self):
        self.assertEqual(0, self.run_check())
        previous = self.audit.read_bytes()
        self.path.write_text(page() + '<!-- edit -->')
        self.assertEqual(1, self.run_check('--verify-hash'))
        self.assertEqual(previous, self.audit.read_bytes())

    def test_missing_hash_and_invalid_audit_are_not_overwritten(self):
        self.assertEqual(1, self.run_check('--verify-hash'))
        self.assertFalse(self.audit.exists())
        for text in ['{}', '{bad json', '[]', '{"verification": []}']:
            self.audit.write_text(text)
            self.assertEqual(1, self.run_check('--verify-hash'))
            self.assertEqual(text, self.audit.read_text())

    def test_errors_persist_as_failures(self):
        self.path.write_text(page().replace(" role='img'", ''))
        self.assertEqual(1, self.run_check())
        self.assertTrue(json.loads(self.audit.read_text())['verification']['structural_lint']['errors'])


if __name__ == '__main__':
    unittest.main()
