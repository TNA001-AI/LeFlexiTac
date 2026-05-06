# LeFlexiTac Site

Static project page for the LeFlexiTac project: adding FlexiTac tactile sensing to the LeRobot stack and evaluating tactile-conditioned policies across contact-rich manipulation tasks.

Two pages:

- `index.html` — landing page with motivation, per-task results, and tactile/no-tactile videos
- `docs.html` — step-by-step reproduction guide (hardware, sensor, data collection, training, evaluation)

## Local preview

From this directory:

```bash
npx serve -l 8080
```

Then open <http://localhost:8080>.

The first run prompts to install the `serve` package — accept with `y`. `serve.json` sets `Cache-Control: no-cache` so file edits show up immediately on refresh.

> Avoid `python3 -m http.server`. It throws noisy `BrokenPipeError` tracebacks whenever the browser aborts an in-flight video request, which happens every time you navigate away from the landing page.

## Publishing

Zero-build static site. Deployed via GitHub Pages from the `master` branch root.

- Live URL: <https://tna001-ai.github.io/LeFlexiTac/>
- `.nojekyll` is included so underscore-prefixed files are served as-is.
- All asset paths are relative, so the site also works under a subdirectory.

## Updating content

Most edits touch only:

- **`assets/site-data.js`** — task results, video labels, tip cards, reference cards, reproduction step commands
- **`assets/media/tube/`, `assets/media/peg/`, `assets/media/pen/`** — per-task videos
- **`assets/architectures/`** — policy architecture diagrams (PNG)
- **`index.html`, `docs.html`** — only when the page structure itself changes
- **`assets/styles.css`, `assets/app.js`** — styling and rendering logic

## Media encoding

Task videos are committed directly to the repo (no Git LFS). To keep files small and GitHub Pages happy, re-encode new captures with:

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 26 -preset veryslow -tune film \
  -an -movflags +faststart \
  output.mp4
```

- `-crf 26` — visually near-lossless for 1080p demo clips
- `-an` — strip audio (videos play muted on the site)
- `-movflags +faststart` — put moov atom at the start so videos can play while downloading
- `-preset veryslow` — best compression ratio; encode once, serve forever

Current total media footprint is ~90 MB for six 1080p clips.
