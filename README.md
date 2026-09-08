# aqifahmed.com — portfolio

A portfolio styled like a hardware test report — paper, ink, spec tables, one
measured-value accent. Plain HTML / CSS / JS — no build step, no framework, no
npm install. That's deliberate: GitHub Pages serves it as-is, and there's
nothing to break.

## Structure

- `index.html` — section shells and static headings only. It renders empty
  until `js/main.js` fills it in from `js/content.js`.
- `js/content.js` — **all content lives here**: hero text, the `now` status
  block, projects, the `~/log` entries, education, contact links. This is the
  only file you should need to edit day to day — see `CONTENT.md`.
- `js/main.js` — the renderer. Reads `js/content.js`, enforces the
  shipped/planned status gate, computes the derived `~/stack` list, then
  starts the motion/nav code.
- `js/nav.js` — mobile menu open/close. That's all it does.
- `js/motion.js` — exactly two motion functions (see Design below). You
  shouldn't need to touch this to change content.
- `js/diagrams.js` — preserved but currently unused (not called from
  `js/main.js`) — see AGENTS.md.
- `css/tokens.css` — design tokens: the paper/ink palette, two accents, two
  typefaces, spacing scale. One visual mode, no toggle.
- `css/base.css` — reset and base typography.
- `css/app.css` — component and section styles.
- `assets/` — résumé PDF and OG image.

## Design — "Test Report"

The site presents as the datasheet stapled to a piece of benchmarked
hardware: paper and ink, a persistent left rail of report fields (Subject,
Status, Section, Reading), and projects rendered as spec tables rather than
cards. Deliberately not a hacker-terminal portfolio — see AGENTS.md → Design
freeze for the full reasoning.

- Palette: `--bg`/`--ink` (paper/ink) plus two accents — `--reading` (a
  measured value or primary action) and `--verified` (shipped / in good
  standing). No gradients, no drop shadows, minimal border-radius.
- Type: Source Serif 4 for headings and body prose, Martian Mono for labels,
  data, and measured values.
- Motion, exactly two moments, both honoring `prefers-reduced-motion`: the
  rail's Section field tracks scroll position, and a project's measured
  number counts up once the first time it scrolls into view.

See `AGENTS.md` for the design freeze this rebuild put in place, and what
does and doesn't require unfreezing it.

## Editing content

Don't edit `index.html`, `css/`, or the motion/nav/diagram JS files to change
what's on the site. Edit `js/content.js` — see `CONTENT.md` at the repo root
for exact templates:

- Adding a shipped project
- Adding a `~/log` entry
- Flipping a `planned` project to `shipped`

Every project, log entry, and diagram carries a `status` of `'shipped'` or
`'planned'`. `'planned'` items never render, anywhere — that's enforced in
`js/main.js`, not a convention. The `~/stack` section isn't edited directly
at all: it's computed as the union of `stack` arrays across shipped projects,
so it can't claim a technology no shipped project actually used.

You can edit `js/content.js` directly in GitHub's web editor; Pages
redeploys automatically in under a minute.

## Deploy

Already wired: push to `main`, GitHub Pages serves it at `aqifahmed.com`
(the `CNAME` file handles the custom domain).

## Local preview

```
python3 -m http.server 8720
```

then open `http://localhost:8720`.
