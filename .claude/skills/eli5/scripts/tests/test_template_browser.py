"""Browser regression checks; python3.12 -m unittest discover -s scripts/tests."""
import re
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright

TEMPLATE = Path(__file__).resolve().parents[2] / 'template.html'

class TemplateBrowserTests(unittest.TestCase):
    def test_renderer(self):
        src = re.sub(r'{{.*?}}', 'Example', TEMPLATE.read_text())
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='chrome')
            page = browser.new_page()
            page.set_content(src)
            self.assertTrue(page.evaluate('window.labResults.valid'))
            self.assertEqual(page.evaluate('window.labResults.rows'), [0, 0])
            page.evaluate("compute=()=>({truth:10,rows:[['Correct',10,'#ff8059'],['Wrong',-478.89,'#f87171'],['Other',-441,'#c3b8ff']],ledger:[]});update()")
            self.assertEqual(page.evaluate('window.labResults.clipped'), [False, True, True])
            page.evaluate('document.querySelectorAll("#labChart text").forEach(t=>t.remove())')
            self.assertEqual(2, page.locator('#labChart .overflow-marker').count())
            self.assertEqual(520, page.evaluate('document.getElementById("labChart").viewBox.baseVal.width'))
            self.assertGreater(page.evaluate('document.getElementById("labChart").viewBox.baseVal.height'), 350)
            page.evaluate("compute=()=>({truth:0,rows:Array.from({length:6},(_,i)=>['Row '+i,i,'#ff8059']),ledger:[]});update()")
            self.assertGreater(page.evaluate('document.getElementById("labChart").viewBox.baseVal.height'), 600)
            page.evaluate("labConfig.format=v=>v+' ms';update()")
            self.assertEqual(page.locator('#labChart .overflow-marker').count(), 0)
            page.evaluate("compute=()=>({truth:32,rows:[['Compounded',32,'#ff8059'],['Added',30,'#f87171']],ledger:[]});labConfig.format=v=>v+'%';update()")
            ticks = page.evaluate("[...document.querySelectorAll('#labChart .tick')].map(t=>[+t.dataset.v,+t.getAttribute('x'),t.textContent])")
            self.assertEqual(ticks, [[0, 60, '0%'], [20, 260, '20%'], [40, 460, '40%']])
            self.assertEqual(page.evaluate("+document.querySelector('#labChart rect').getAttribute('x')"), 60)
            page.evaluate("compute=()=>({truth:0,rows:[['Broken',1/0,'#ff8059']],ledger:[]})")
            with self.assertRaises(Exception):
                page.evaluate('update()')
            self.assertFalse(page.evaluate('window.labResults.valid'))
            self.assertEqual(page.locator('#labChart rect').count(), 0)
            browser.close()

if __name__ == '__main__':
    unittest.main()
