#!/usr/bin/env python3
"""Capture YouTube VTT captions; timing checks are NOT completeness proof.

Usage: transcript.py URL [outdir] [--audit [PATH]] [--timeout 90]
Without outdir, creates a unique managed-scratch directory. A nonempty outdir
gets a fresh child, never deletion or reuse of stale captions. --audit without
a path writes a durable JSON under ~/.hermes/eli5-audits (outside the website).
Exit 0: timing heuristics passed, human content/visual review still required.
Exit 2: empty, incomplete, or unverified capture. Exit 1: operational failure.
Import parse_vtt(), transcript_text(), and diagnose() without network activity.
"""
import argparse
from dataclasses import dataclass, field
from datetime import datetime, timezone
import html
import json
import math
import os
from pathlib import Path
import re
import subprocess
import tempfile
import uuid


@dataclass
class Cue:
    start: float
    end: float
    text: str


@dataclass
class ParsedVTT:
    cues: list[Cue] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


STAMP = r'(?:\d{2,}:)?\d{2}:\d{2}\.\d{3}'
TIMING = re.compile(rf'^({STAMP})\s+-->\s+({STAMP})(?:\s+.*)?$')


def secs(stamp):
    parts = stamp.split(':')
    hours, minutes, seconds = (['0'] + parts if len(parts) == 2 else parts)
    if int(minutes) >= 60 or float(seconds) >= 60:
        raise ValueError('timestamp outside minute/second range')
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def parse_vtt(text):
    """Parse blank-line-delimited cues, retaining raw timing for diagnostics.

    Cue IDs and NOTE/STYLE/REGION blocks are never transcript content. Broken
    blocks are surfaced rather than silently treated as successful capture.
    """
    result = ParsedVTT()
    text = text.lstrip('\ufeff').replace('\r\n', '\n').replace('\r', '\n')
    if not text.startswith('WEBVTT'):
        result.warnings.append('Missing WEBVTT header')
    for index, block in enumerate(re.split(r'\n\s*\n', text.strip())):
        lines = block.splitlines()
        if not lines:
            continue
        first = lines[0].strip()
        if first.startswith('WEBVTT') or re.match(r'^(NOTE(?:\s|$)|STYLE$|REGION$)', first):
            continue
        timing_index = 0 if '-->' in first else 1
        match = TIMING.fullmatch(lines[timing_index].strip()) if len(lines) > timing_index else None
        if not match:
            result.warnings.append(f'Unparseable cue block {index}')
            continue
        try:
            start, end = map(secs, match.groups())
            if end <= start:
                raise ValueError('non-positive cue interval')
        except ValueError as exc:
            result.warnings.append(f'Invalid cue block {index}: {exc}')
            continue
        payload = ' '.join(lines[timing_index + 1:])
        payload = ' '.join(html.unescape(re.sub(r'<[^>]*>', '', payload)).split())
        if not payload:
            result.warnings.append(f'Empty cue block {index}')
            continue
        if result.cues and start < result.cues[-1].start:
            result.warnings.append(f'Out-of-order cue block {index}')
        result.cues.append(Cue(start, end, payload))
    return result


def transcript_text(cues):
    """Remove adjacent rolling suffix/prefix duplicates, not distant repeats."""
    chunks = []
    previous = None
    for cue in sorted(cues, key=lambda c: c.start):
        words = cue.text.split()
        overlap = 0
        if previous and cue.start <= previous.end + 0.5:
            old = previous.text.split()
            for size in range(min(len(old), len(words)), 0, -1):
                if old[-size:] == words[:size]:
                    overlap = size
                    break
        added = words[overlap:]
        if added:
            if not chunks or cue.start - chunks[-1][0] >= 30:
                chunks.append([cue.start, []])
            chunks[-1][1].extend(added)
        previous = cue
    return ''.join(f'[{int(s)//60:02d}:{int(s)%60:02d}] {" ".join(w)}\n' for s, w in chunks)


def diagnose(parsed, duration, gap_threshold=15.0, endpoint_tolerance=10.0):
    """Flag timing risks, not absence of speech or semantic completeness.

    Defaults flag >15s internal silence, >10s initial/final gap. For short
    sources endpoint tolerance is capped at 5% of runtime (minimum 1s).
    """
    known = isinstance(duration, (int, float)) and not isinstance(duration, bool) and math.isfinite(duration) and duration > 0
    cues = sorted(parsed.cues, key=lambda c: c.start)
    tolerance = min(endpoint_tolerance, max(1.0, duration * .05)) if known else endpoint_tolerance
    gaps, covered, end = [], 0.0, 0.0
    for cue in cues:
        if end and cue.start - end > gap_threshold:
            gaps.append({'start': end, 'end': cue.start, 'seconds': cue.start - end})
        covered += max(0, cue.end - max(end, cue.start))
        end = max(end, cue.end)
    beginning = bool(cues) and cues[0].start <= tolerance
    ending = bool(cues) and known and abs(duration - end) <= tolerance
    if not cues:
        status = 'EMPTY'
    elif parsed.warnings or gaps or not beginning or (known and not ending):
        status = 'INCOMPLETE'
    elif not known:
        status = 'UNVERIFIED'
    else:
        status = 'TIMING_CHECKS_PASSED_REVIEW_REQUIRED'
    return {'status': status, 'cue_count': len(cues), 'first_start': cues[0].start if cues else None,
            'last_end': end if cues else None, 'duration_seconds': duration if known else None,
            'beginning_near_start': beginning, 'ending_near_runtime': ending,
            'endpoint_tolerance_seconds': tolerance, 'gap_threshold_seconds': gap_threshold,
            'internal_gaps': gaps, 'captioned_seconds': covered,
            'parser_warnings': parsed.warnings,
            'limitations': ['Timing is not proof of completeness; gaps may be silence or missing captions.',
                            'Human beginning/middle/ending and caption-quality review required.',
                            'Relevant visuals have not been inspected.']}


def scratch_root():
    root = Path.home() / '.hermes/cache/scratch'
    root.mkdir(parents=True, exist_ok=True)
    return root


def prepare_output(path=None):
    if path is None:
        return Path(tempfile.mkdtemp(prefix='eli5-source-', dir=scratch_root()))
    root = Path(path).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    if any(root.iterdir()):
        return Path(tempfile.mkdtemp(prefix='capture-', dir=root))
    return root


def write_audit(path, source):
    """Atomically merge source; preserve all other audit sections/unknown keys.

    An invalid existing audit raises rather than overwriting evidence. Concurrent
    audit writers require external coordination (atomic replacement isn't a lock).
    """
    path = Path(path).expanduser()
    path.parent.mkdir(parents=True, exist_ok=True)
    audit = json.loads(path.read_text()) if path.exists() else {'schema_version': 1}
    if not isinstance(audit, dict) or not isinstance(audit.get('source', {}), dict):
        raise ValueError('Audit and its source section must be objects')
    audit['source'] = {**audit.get('source', {}), **source}
    # Same-directory staging is required for atomic replacement; preserve it if
    # replacement fails so evidence is never silently deleted.
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', prefix='.audit-', suffix='.json',
                                     dir=path.parent, delete=False) as handle:
        json.dump(audit, handle, ensure_ascii=False, indent=2, allow_nan=False)
        handle.write('\n')
        handle.flush()
        os.fsync(handle.fileno())
    os.replace(handle.name, path)


def run_ytdlp(args, timeout):
    return subprocess.run(['yt-dlp', '--ignore-config', '--no-update', '--no-playlist',
                           '--socket-timeout', '20', '--retries', '1', *args],
                          capture_output=True, text=True, check=True, timeout=timeout)


def capture(url, out, timeout):
    meta = json.loads(run_ytdlp(['-J', '--skip-download', '--', url], timeout).stdout)
    (out / 'metadata.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    candidates = []
    for kind, mapping in [('manual', meta.get('subtitles') or {}),
                          ('automatic', meta.get('automatic_captions') or {})]:
        languages = sorted(mapping, key=lambda lang: (not lang.endswith('-orig'), lang != 'en', lang))
        candidates.extend((kind, lang) for lang in languages if lang != 'live_chat')
    attempts = []
    best = None
    for index, (kind, lang) in enumerate(candidates[:6]):
        attempt = out / f'track-{index}'
        attempt.mkdir()
        try:
            run_ytdlp(['--skip-download', '--write-subs' if kind == 'manual' else '--write-auto-subs',
                       '--sub-langs', re.escape(lang), '--sub-format', 'vtt',
                       '-o', str(attempt / 'v.%(ext)s'), '--', url], timeout)
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as exc:
            attempts.append({'language': lang, 'caption_type': kind, 'error': str(exc)})
            continue
        files = sorted(attempt.glob('*.vtt'))
        for path in files:
            parsed = parse_vtt(path.read_text(encoding='utf-8-sig'))
            diagnostic = diagnose(parsed, meta.get('duration'))
            candidate = (parsed, diagnostic, path, kind, lang)
            if best is None or diagnostic['captioned_seconds'] > best[1]['captioned_seconds']:
                best = candidate
            if diagnostic['status'] == 'TIMING_CHECKS_PASSED_REVIEW_REQUIRED':
                return meta, candidate, attempts
    return meta, best, attempts


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('url')
    parser.add_argument('outdir', nargs='?')
    parser.add_argument('--audit', nargs='?', const='default', help='merge source evidence into JSON; omitted path uses durable audit directory')
    parser.add_argument('--timeout', type=float, default=90, help='per-process seconds, 1..300; at most 7 processes')
    args = parser.parse_args(argv)
    if not math.isfinite(args.timeout) or not 1 <= args.timeout <= 300:
        parser.error('--timeout must be 1..300 seconds')
    out = prepare_output(args.outdir)
    captured_at = datetime.now(timezone.utc).isoformat()
    source = {'url': args.url, 'capture_date': captured_at, 'capture_mode': 'transcript-only',
              'sampled_visual_timestamps': [], 'output_directory': str(out)}
    code = 1
    try:
        meta, selected, attempts = capture(args.url, out, args.timeout)
        parsed, diagnostic, path, kind, lang = selected if selected else (ParsedVTT(), diagnose(ParsedVTT(), meta.get('duration')), None, 'none', None)
        text_path = out / 'transcript.txt'
        text_path.write_text(transcript_text(parsed.cues), encoding='utf-8')
        source.update({'title': meta.get('title'), 'author': meta.get('channel') or meta.get('uploader'),
                       'date': meta.get('upload_date') or 'unknown', 'date_provenance': 'yt-dlp upload_date; not independently verified',
                       'upload_date': meta.get('upload_date'), 'release_date': meta.get('release_date'),
                       'canonical_url': meta.get('webpage_url'), 'duration': meta.get('duration'),
                       'language': lang, 'caption_type': kind, 'timing_diagnostics': diagnostic,
                       'beginning_middle_ending_evidence': {'automated': diagnostic, 'human_review': 'not performed'},
                       'source_paths': {'metadata': str(out / 'metadata.json'), 'transcript': str(text_path),
                                        'captions': str(path) if path else None},
                       'limitations': diagnostic['limitations'], 'attempt_errors': attempts,
                       'status': diagnostic['status']})
        code = 0 if diagnostic['status'] == 'TIMING_CHECKS_PASSED_REVIEW_REQUIRED' else 2
    except (OSError, ValueError, subprocess.SubprocessError) as exc:
        source.update({'status': 'CAPTURE_FAILED', 'error': str(exc)})
    (out / 'source.json').write_text(json.dumps(source, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    if args.audit:
        audit_path = Path.home() / '.hermes/eli5-audits' / f'{out.name}-{uuid.uuid4().hex[:8]}.audit.json' if args.audit == 'default' else Path(args.audit).expanduser()
        try:
            write_audit(audit_path, source)
            print(f'audit: {audit_path}')
        except (OSError, ValueError) as exc:
            print(f'AUDIT_FAILED: {exc}')
            code = 1
    print(f"{source['status']}\nsource: {out / 'source.json'}")
    print('Timing checks cannot establish content completeness or visual coverage.')
    return code


if __name__ == '__main__':
    raise SystemExit(main())
