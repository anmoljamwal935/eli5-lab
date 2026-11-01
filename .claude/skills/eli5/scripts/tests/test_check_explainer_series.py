"""Series pages: parts load series data and strip slots; series maps are their own page type."""
import importlib.util
from pathlib import Path
import unittest

SPEC = importlib.util.spec_from_file_location('checker', Path(__file__).resolve().parents[1] / 'check_explainer.py')
checker = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checker)
STRUCT = importlib.util.spec_from_file_location('structural', Path(__file__).resolve().parent / 'test_check_explainer_structural.py')
structural = importlib.util.module_from_spec(STRUCT)
STRUCT.loader.exec_module(structural)

STRIPS = "<div class='series-strip' data-series='top'></div>"
END = "<div class='series-strip' data-series='end'></div>"


def part(scripts="<script src='../series.js'></script><script src='../eli5-study.js'></script>", strips=STRIPS + END, sid='test-eli5'):
    html = structural.page().replace('<body>', f"<body data-series-id='{sid}'>", 1)
    html = html.replace("<div class='legend'></div>", "<div class='legend'></div>" + strips, 1)
    return html.replace("<script src='../eli5-study.js'></script>", scripts, 1)


def hub(extra=''):
    return ("<!doctype html><html><head><link rel='stylesheet' href='../eli5-study.css'><style>@media (max-width:700px){figure{overflow-x:auto}}</style></head><body data-series-id='hub'>"
            "<header class='study-masthead'></header><main class='eli5-study-container'>" + STRIPS +
            "<section class='panel'><p class='kicker'>The reading list</p><h2>Every study, in order</h2><ol id='reading'></ol></section>"
            "<div class='eli5-takeaway-card'>x</div></main>" + extra +
            "<script src='../series.js'></script><script src='../eli5-study.js'></script></body></html>")


class SeriesTests(unittest.TestCase):
    def lint(self, html, name='test-eli5.html'):
        return checker.check(Path('explainers') / name, html)['errors']

    def test_part_passes_with_series_data_and_slots(self):
        self.assertEqual([], self.lint(part()))
        later = "<script src='../series.js'></script><script src='../series-money-basics.js'></script><script src='../eli5-study.js'></script>"
        self.assertEqual([], self.lint(part(scripts=later)))

    def test_series_scripts_only_allowed_on_series_pages(self):
        html = structural.page().replace("<script src='../eli5-study.js'>", "<script src='../series.js'></script><script src='../eli5-study.js'>", 1)
        self.assertTrue(any('external stylesheet/script not allowed: ../series.js' in e for e in self.lint(html)))

    def test_part_needs_data_before_study_js(self):
        self.assertTrue(any('must load its series data' in e for e in self.lint(part(scripts="<script src='../eli5-study.js'></script>"))))
        late = "<script src='../eli5-study.js'></script><script src='../series.js'></script>"
        self.assertTrue(any('before ../eli5-study.js' in e for e in self.lint(part(scripts=late))))

    def test_part_needs_both_strip_slots_and_matching_id(self):
        self.assertTrue(any('data-series="end"' in e for e in self.lint(part(strips=STRIPS))))
        self.assertTrue(any('must equal the file name' in e for e in self.lint(part(sid='other-eli5'))))

    def test_other_scripts_still_rejected_on_parts(self):
        bad = "<script src='../series.js'></script><script src='https://cdn.example/x.js'></script><script src='../eli5-study.js'></script>"
        self.assertTrue(any('cdn.example' in e for e in self.lint(part(scripts=bad))))

    def test_hub_is_its_own_page_type(self):
        self.assertEqual([], self.lint(hub(), 'money-basics-from-scratch.html'))
        errors = self.lint(hub().replace("<ol id='reading'></ol>", ''), 'money-basics-from-scratch.html')
        self.assertTrue(any('reading list' in e for e in errors))
        self.assertTrue(any('series data' in e for e in self.lint(hub().replace("<script src='../series.js'></script>", ''), 'x-series.html')))


if __name__ == '__main__':
    unittest.main()
