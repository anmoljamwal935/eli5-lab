"""Checker structural lint: percentage coordinates, roles, headings, sliders."""
import io
import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts'))
import check_explainer  # noqa: E402

HERE = Path(__file__).resolve().parent

PERCENT_OK = '''<!DOCTYPE html><html><head><style>@media (max-width:700px){body{margin:0}}</style></head>
<body><section class="panel"><p class="kicker">Problem</p><h2>Percent coords work</h2>
<svg viewBox="0 0 500 300" role="img" aria-label="percent coord"><rect x="10%" y="20%" width="50%" height="10"></rect>
<text x="20%" y="30" font-size="16">label</text></svg></section>
<section class="panel"><p class="kicker">Build</p><h2>A drawing</h2><svg viewBox="0 0 500 300" role="img" aria-label="bar"><rect x="10" y="10" width="100" height="40"></rect></section>
<link rel="stylesheet" href="../eli5-study.css"><script src="../eli5-study.js"></script>
<div class="eli5-study-container"><div class="study-masthead"></div></div>
<div class="eli5-takeaway-card">x</div>
<p class="source-note">src</p><div class="legend"></div>
<section class="panel"><p class="kicker">Lab</p><h2>Try it</h2>
<input type="range" id="s1" aria-label="s1"><input type="range" id="s2" aria-label="s2">
<div class="presets"><button>A</button><button>B</button></div><div class="ledger"><span>x</span><span>y</span></div>
<svg viewBox="0 0 10 10" role="img" aria-label="l"></svg></section></body></html>'''

BAD_ROLE = PERCENT_OK.replace('role="img"', 'role="figure"')

LONG_HEADING = '''<!DOCTYPE html><html><head><style>@media (max-width:700px){}</style></head><body>'''
LONG_HEADING += '<section class="panel"><p class="kicker">x</p><h2>' + 'A ' * 12 + 'b</h2>'
LONG_HEADING += '<svg viewBox="0 0 1 1" role="img" aria-label="x"></svg></section></body></html>'


class CheckerTests(unittest.TestCase):
    def test_percent_coordinate_does_not_crash(self):
        result = check_explainer.check(Path('explainers/percent-eli5.html'), PERCENT_OK)
        self.assertFalse(any('percentage' in e or 'could not convert' in e for e in result['errors'] + result['warnings']))

    def test_missing_role_is_error(self):
        result = check_explainer.check(Path('explainers/bad-eli5.html'), BAD_ROLE)
        self.assertTrue(any('role' in e for e in result['errors']))

    def test_heading_too_long_is_error(self):
        result = check_explainer.check(Path('explainers/long-eli5.html'), LONG_HEADING)
        self.assertTrue(any('exceeds 8 words' in e for e in result['errors']))

    def test_verify_hash_rejects_stale(self):
        import json, tempfile, hashlib
        page = HERE / 'fixtures' / 'minimal-eli5.html'
        with tempfile.TemporaryDirectory() as tmp:
            audit = Path(tmp) / 'audit.json'
            audit.write_text(json.dumps({'verification': {'artifact_sha256': 'deadbeef'}}))
            code = check_explainer.main([str(page), '--audit', str(audit), '--verify-hash'])
            self.assertEqual(code, 1)
            self.assertEqual(json.loads(audit.read_text())['verification']['artifact_sha256'], 'deadbeef')


class AuditWriteTests(unittest.TestCase):
    def test_writes_hash_and_lint(self):
        import json, tempfile, hashlib
        page = HERE / 'fixtures' / 'minimal-eli5.html'
        with tempfile.TemporaryDirectory() as tmp:
            explainers = Path(tmp) / 'explainers'
            explainers.mkdir()
            copy = explainers / 'minimal-eli5.html'
            copy.write_bytes(page.read_bytes())
            audit = Path(tmp) / 'audit.json'
            audit.write_text(json.dumps({}))
            code = check_explainer.main([str(copy), '--audit', str(audit)])
            data = json.loads(audit.read_text())
            ver = data['verification']
            self.assertEqual(ver['artifact_sha256'], hashlib.sha256(copy.read_bytes()).hexdigest())
            self.assertIn('structural_lint', ver)
            self.assertEqual(code, 0)  # 0 errors, 1 warning = exit 0


if __name__ == '__main__':
    unittest.main()
