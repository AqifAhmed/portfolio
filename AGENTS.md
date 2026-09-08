# Memory

## Project Overview
See @README.md for project overview. This is a static site with no package manager, build step, or dependencies — plain HTML/CSS/JS served directly. Run locally with `python3 -m http.server 8720`.

## Design freeze

As of this rebuild (2026-09), the visual design, layout, motion, and section
structure are frozen. Ongoing work on this repo is limited to editing
`js/content.js` — adding shipped projects, log entries, and flipping
`status: 'planned'` to `status: 'shipped'` as work actually ships. See
`CONTENT.md` for how.

The current visual system is **"Test Report"**: the page presents as the
datasheet stapled to a piece of benchmarked hardware, not a hacker-terminal
portfolio. Concretely:

- Palette: paper and ink (`--bg`/`--ink` in `css/tokens.css`), plus two
  accents — `--reading` (a measured value, or a primary action) and
  `--verified` (shipped / in good standing). No near-black-and-lime, no
  gradient glow, no drop shadows. Flat, ruled, printed-document-flat.
- Type: Source Serif 4 (`--font-serif`) for headings and body prose, Martian
  Mono (`--font-mono`) for labels, data, and measured values. Two families,
  used for two distinct jobs — never mixed within one string.
- Layout: a persistent left rail (`.rail`) holding four fields — Subject,
  Status, Section, Reading — that together replace what used to be three
  separate systems (a nav index counter, a scroll-progress bar, and a
  sidebar stat block). Below the 960px sidebar breakpoint, `.rail` becomes a
  top-of-page strip and would otherwise scroll out of view, so `.mobile-rail`
  (a slim sticky strip showing just the live "Section" field) takes over
  persistence on small screens — both are updated together by
  `initSectionAwareness()`. Projects and the stack render as spec tables,
  not cards.
- Motion budget, exactly two moments, both in `js/motion.js`:
  `initSectionAwareness()` (the rail's Section field and the nav's
  active-link state track scroll position) and `initValueSettle()` (a
  project's measured `numbers` count up once on first scroll-into-view, like
  an instrument settling on a reading). Nothing else animates. Do not add a
  third.

The following require a deliberate decision to unfreeze, not a casual edit:

- Adding or removing a section (a new `<section>` in `index.html` plus its
  renderer in `js/main.js`).
- Changing anything in `css/tokens.css` — palette, type scale, spacing scale.
- Adding a dependency, a build step, a framework, or anything that would
  require `npm install` before the site works.
- Changing the rendering model in `js/main.js` (the status gate, the derived
  `~/stack` computation, `validateContent()`).
- Changing the `Project`, log entry, or diagram shapes documented in
  `CONTENT.md`.
- Adding a third motion moment, or restoring any of the discarded ones
  (scroll reveal, a live clock, a scroll-progress bar, terminal typing, a
  title scramble, a pointer-tracked glow, stack-card expand). They were cut
  deliberately, not overlooked — see the commit that introduced this system
  if you need the reasoning.

If one of these is genuinely needed, treat it as a real decision: say why the
frozen version doesn't work, then change it — don't drift into it one small
edit at a time.

## Claims policy

This site is the primary evidence a stranger uses to decide whether to reply
to a cold email. It only works if every claim on it is true and checkable.

- Every rendered claim maps to a linked artifact. If there's nothing to link
  to, the claim doesn't render — see the `evidence` field on `Project` in
  `js/content.js`.
- `status: 'planned'` never renders, anywhere, under any condition. There is
  no flag, query parameter, or config switch that shows planned content. This
  is enforced once, in the status-gate filter in `js/main.js` — don't add a
  second path around it.
- Team projects always name the specific subsystems owned in `role`, never
  the whole project. A team project's card must read as a team project, in
  progress — never imply solo authorship of the whole thing.
- No technology appears in `~/stack` unless a `status: 'shipped'` project's
  `stack` array actually uses it. That section is computed, not authored —
  see `deriveStack()` in `js/main.js`. Don't add a hardcoded stack list back.
- A shipped project without measured `numbers` still renders, but
  `validateContent()` logs a console warning — numbers are the point of
  differentiation on this site, so a missing one should be visible to
  whoever is editing content, not silently accepted.

## Architecture Notes
- `index.html` — section shells and static headings only. No project, log,
  or stack content is hardcoded here — see `js/content.js`.
- `js/content.js` — every piece of content on the site: hero text, `now`
  status lines, projects, log entries, diagrams, education, contact links.
  This is the only file that should change routinely.
- `js/main.js` — entry point. Runs `validateContent()`, renders every section
  from `js/content.js` (including the derived `~/stack` table), then calls
  the two motion inits and the nav init.
- `css/tokens.css` — design tokens (palette, type scale, spacing). Frozen —
  see Design freeze above.
- `css/base.css` — reset, base typography, layout primitives.
- `css/app.css` — components and sections.
- `js/nav.js` — mobile menu open/close. Nothing else.
- `js/motion.js` — exactly two functions: `initSectionAwareness()` and
  `initValueSettle()`. See Design freeze above for what each does and why
  nothing else lives here.
- `js/diagrams.js` — preserved but **not called** from `js/main.js` right
  now. Diagram markup is data-driven and gated by project status; the file
  comes back into use the moment a shipped project's diagram entrance
  animation is needed again — don't delete it in the meantime.
- One visual mode — paper/ink, no dark mode, no toggle.

## Common Workflows
Adding a project, a log entry, or flipping something to shipped: see
`CONTENT.md` at the repo root — it has copy-paste templates for each.
