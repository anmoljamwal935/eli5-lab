"""Card lint: example cards pass; boxes, unsafe markup, crowded edges fail."""
import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts'))
import check_card  # noqa: E402

CARDS = Path(__file__).resolve().parents[2] / 'examples' / 'cards'
SHELL = '<svg viewBox="0 0 320 155" role="img" aria-label="x">{}</svg>'
LABEL = '<text x="60" y="80" font-size="9">{}</text>'


class CardLint(unittest.TestCase):
    def test_examples_pass(self):
        for card in CARDS.glob('*.svg'):
            self.assertEqual(check_card.check(card.read_text())[0], [], card.name)

    def test_failures(self):
        cases = {
            'boxes': SHELL.format('<rect x="40" y="60" width="80" height="40" fill="none" stroke="#ff8059"/>' + LABEL.format('FAB')),
            'script': SHELL.format('<script>alert(1)</script>'),
            'edge': SHELL.format('<text x="4" y="80" font-size="9">EDGE</text>'),
            'tiny': SHELL.format('<text x="60" y="80" font-size="7">TINY</text>'),
            'sentence': SHELL.format(LABEL.format('THIS IS FAR TOO LONG')),
            'labels': SHELL.format(LABEL.format('A') * 4),
            'shell': '<svg viewBox="0 0 100 100" role="img" aria-label="x"></svg>',
            'aria': '<svg viewBox="0 0 320 155"></svg>',
        }
        for name, src in cases.items():
            self.assertTrue(check_card.check(src)[0], name)


if __name__ == '__main__':
    unittest.main()
