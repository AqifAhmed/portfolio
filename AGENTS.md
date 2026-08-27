# Memory

## Project Overview
See @README.md for project overview. This is a static site with no package manager, build step, or dependencies — plain HTML/CSS/JS served directly. Run locally with `python3 -m http.server 8720`.

## Code Style Guidelines
- Use descriptive variable names
- Follow existing patterns in the codebase
- Extract complex conditions into meaningful boolean variables

## Architecture Notes
- `index.html` — all markup, single page
- `css/tokens.css` — design tokens (palette, type scale, spacing)
- `css/base.css` — reset, base typography, layout primitives
- `css/app.css` — components and sections
- `js/main.js` — entry point, imports and calls the inits below
- `js/nav.js` — mobile menu, nav compaction, active-section highlighting
- `js/motion.js` — scroll reveal, clock, scroll progress, typing, title scramble, terminal glow, stack card expand
- `js/diagrams.js` — plays each diagram's entrance animation once on scroll-enter
- Dark theme only — no light mode, no toggle.

## Common Workflows
Document frequently used workflows and commands here.
