import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'transcript.py'
spec = importlib.util.spec_from_file_location('transcript', SCRIPT)
t = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = t
spec.loader.exec_module(t)
FIXTURES = Path(__file__).parent / 'fixtures'


class TranscriptTests(unittest.TestCase):
    def test_cue_ids_and_blocks(self):
        result = t.parse_vtt((FIXTURES / 'cue_ids.vtt').read_text())
        self.assertEqual([(c.start, c.end, c.text) for c in result.cues],
                         [(0.0, 2.5, 'Hello & welcome'), (2.5, 5.0, 'Next line')])
        self.assertEqual(result.warnings, [])

    def test_rolling_duplicates(self):
        parsed = t.parse_vtt('WEBVTT\n\n00:00.000 --> 00:02.000\nhello world\n\n00:01.500 --> 00:04.000\nhello world again\n\n00:03.500 --> 00:05.000\nworld again today\n')
        self.assertEqual(t.transcript_text(parsed.cues), '[00:00] hello world again today\n')
        self.assertEqual(len(parsed.cues), 3)

    def test_gap_despite_ending(self):
        parsed = t.parse_vtt((FIXTURES / 'gap_ending.vtt').read_text())
        d = t.diagnose(parsed, 120)
        self.assertEqual(d['status'], 'INCOMPLETE')
        self.assertTrue(d['ending_near_runtime'])
        self.assertEqual(d['internal_gaps'][0]['seconds'], 110)

    def test_empty_unknown_and_short_endpoint(self):
        self.assertEqual(t.diagnose(t.parse_vtt('WEBVTT\n'), 20)['status'], 'EMPTY')
        p = t.parse_vtt('WEBVTT\n\n00:00.000 --> 00:02.000\nhello\n')
        self.assertEqual(t.diagnose(p, None)['status'], 'UNVERIFIED')
        self.assertEqual(t.diagnose(p, 120)['status'], 'INCOMPLETE')
        self.assertEqual(t.diagnose(p, 2)['status'], 'TIMING_CHECKS_PASSED_REVIEW_REQUIRED')

    def test_malformed_and_nonadjacent_repetition(self):
        p = t.parse_vtt('WEBVTT\n\nbad --> time\nnot valid\n\n00:04.000 --> 00:02.000\nbad\n')
        self.assertTrue(p.warnings)
        self.assertEqual(p.cues, [])
        p = t.parse_vtt('WEBVTT\n\n00:00.000 --> 00:01.000\nyes\n\n00:10.000 --> 00:11.000\nyes\n')
        self.assertEqual(t.transcript_text(p.cues).count('yes'), 2)

    def test_audit_preserves_fields_and_reuse(self):
        with tempfile.TemporaryDirectory(dir=t.scratch_root()) as tmp:
            root = Path(tmp)
            audit = root / 'audit.json'
            audit.write_text(json.dumps({'inventory': [1], 'source': {'custom': 'keep'}}))
            t.write_audit(audit, {'url': 'new'})
            data = json.loads(audit.read_text())
            self.assertEqual(data['inventory'], [1])
            self.assertEqual(data['source'], {'custom': 'keep', 'url': 'new'})
            old = root / 'v.en.vtt'
            old.write_text('old')
            fresh = t.prepare_output(root)
            self.assertNotEqual(fresh, root)
            self.assertEqual(old.read_text(), 'old')

    def test_main_exit_and_metadata(self):
        for fixture, duration, expected in [('cue_ids.vtt', 5, 0), ('gap_ending.vtt', 120, 2)]:
            with self.subTest(fixture=fixture), tempfile.TemporaryDirectory(dir=t.scratch_root()) as tmp:
                root = Path(tmp)
                parsed = t.parse_vtt((FIXTURES / fixture).read_text())
                selected = (parsed, t.diagnose(parsed, duration), FIXTURES / fixture, 'manual', 'en')
                metadata = {'title': 'Fixture', 'channel': 'Test', 'upload_date': '20260101', 'duration': duration}
                with patch.object(t, 'capture', return_value=(metadata, selected, [])):
                    self.assertEqual(t.main(['https://example.test/video', str(root / 'out'), '--audit', str(root / 'audit.json')]), expected)
                audit = json.loads((root / 'audit.json').read_text())
                self.assertEqual(audit['source']['caption_type'], 'manual')
                self.assertEqual(audit['source']['url'], 'https://example.test/video')
                self.assertEqual(audit['source']['upload_date'], '20260101')
                self.assertIn('capture_date', audit['source'])

    def test_main_empty_and_timeout(self):
        with tempfile.TemporaryDirectory(dir=t.scratch_root()) as tmp:
            root = Path(tmp)
            with patch.object(t, 'capture', return_value=({'duration': 20}, None, [])):
                self.assertEqual(t.main(['https://example.test/video', str(root / 'empty')]), 2)
            with patch.object(t, 'capture', side_effect=t.subprocess.TimeoutExpired('yt-dlp', 1)):
                self.assertEqual(t.main(['https://example.test/video', str(root / 'timeout')]), 1)
            self.assertEqual(json.loads((root / 'timeout/source.json').read_text())['status'], 'CAPTURE_FAILED')

    def test_invalid_audit_is_not_overwritten(self):
        with tempfile.TemporaryDirectory(dir=t.scratch_root()) as tmp:
            path = Path(tmp) / 'audit.json'
            path.write_text('broken json')
            with self.assertRaises(ValueError):
                t.write_audit(path, {'url': 'test'})
            self.assertEqual(path.read_text(), 'broken json')

    def test_process_bounded(self):
        with patch.object(t.subprocess, 'run') as run:
            t.run_ytdlp(['--version'], 12)
            self.assertEqual(run.call_args.kwargs['timeout'], 12)
            self.assertTrue(run.call_args.kwargs['check'])


if __name__ == '__main__':
    unittest.main()
