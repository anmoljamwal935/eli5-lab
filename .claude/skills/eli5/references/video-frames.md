# Inspect visual teaching, not just captions

Prerequisites: yt-dlp and ffmpeg. Check commands exist before use. Run commands with bounded timeouts. Set URL to the exact source URL; WORK must be a unique managed scratch run directory, never the public website repository. Do not overwrite existing downloads. Do not supply credentials in commands.

## Reconnaissance

```bash
mkdir -p "$WORK/video" "$WORK/frames"
yt-dlp --no-playlist --no-overwrites --socket-timeout 30 --retries 2 -f 'bv*[height<=480]+ba/b[height<=480]/worst' --merge-output-format mkv -o "$WORK/video/source.%(ext)s" "$URL"
```

Discover the actual resulting media path (extension can differ); set VIDEO to that absolute path. Then:

```bash
ffmpeg -nostdin -n -i "$VIDEO" -vf 'fps=1/30,scale=640:-2' "$WORK/frames/periodic-%05d.jpg"
```

Periodic sampling is only reconnaissance. A short equation or correction may appear between samples. Inspect the generated images in bounded batches with the image tool. Record file names actually viewed and findings; never mark every generated frame reviewed automatically. The fps filter selects frames on its output sampling grid; use exact timestamp extraction below for evidence, rather than claiming each filename equals an exact source timestamp.

## Targeted inspection

Whenever captions or reconnaissance indicate a diagram, chart, equation, demo, or visual correction, extract the relevant timestamp and nearby frames. Set STAMP (for example 00:04:03) and TAG (a safe unique name) explicitly:

```bash
ffmpeg -nostdin -n -ss "$STAMP" -i "$VIDEO" -frames:v 1 -vf 'scale=1280:-2' "$WORK/frames/target-$TAG.jpg"
```

Inspect this image and enough nearby frames to understand the sequence. Add substantive visual teachings and source timestamps to the inventory. For a fast demo use denser sampling over the relevant interval. Do not interpret unreadable chart numbers by guessing; extract at higher resolution or flag the gap.

Record capture mode, periodic sampling interval, inspected filenames, targeted timestamps, findings, and unresolved visual gaps under source.visual_review in the audit. Frame extraction success is not visual-review success. Essential inaccessible visual information blocks a full-source claim. Topic-only/text-only sources mark this step not applicable with a reason.
