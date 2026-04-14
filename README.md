# LeRobot x FlexiTac Site

Static repo for a split site:

- `index.html` is the project landing page with per-task tactile/no-tactile videos
- `docs.html` is the traditional documentation page

## Local preview

From this directory, run:

```bash
npx serve -l 8080
```

Then open `http://localhost:8080`.

The first run prompts to install the `serve` package — accept with `y`. A `serve.json` in this repo sets `Cache-Control: no-cache` so file edits show up immediately on refresh.

> Avoid `python3 -m http.server` — it throws noisy `BrokenPipeError` tracebacks whenever the browser aborts an in-flight video download (and this repo has a few hundred MB of task videos).

## Publishing

This repo is zero-build. Enable GitHub Pages to deploy from the root of the default branch.

`.nojekyll` is included so the site can be served as plain static files without Jekyll processing.

## Updating content

Most updates should only touch:

- `assets/site-data.js` for task copy, references, status notes, command examples, and coverage cells
- `assets/media/` for experiment videos
- `index.html` or `docs.html` if the structure itself needs to change

## Known placeholders

- The custom gripper section still needs final mechanical details, photos, CAD links, and a BOM.
- The qualitative media slots are intentionally empty until final experiment clips are available.
- The custom gripper documentation still needs final public-facing hardware details.
