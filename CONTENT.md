# Editing content

Everything on the site lives in `js/content.js`. You should never need to
touch `index.html`, any file in `css/`, or `js/main.js` / `js/nav.js` /
`js/motion.js` / `js/diagrams.js` just to change what's on the page.

The one rule that matters more than any field name: **`status: 'planned'`
never renders, anywhere.** It's a hard gate in `js/main.js`, not a
convention — there's no flag or query param that shows planned content. Use
`planned` freely as your own private roadmap; nothing leaks until you flip
the field.

## Add a shipped project

Copy this into the `projects` array in `js/content.js`:

```js
{
  id: 'my-project-slug',
  title: 'My Project',
  tagline: 'one line, lowercase, what it is',
  status: 'shipped',                 // REQUIRED to render at all

  summary: '2-3 plain-language sentences on what it does.',
  role: 'solo',                      // or the exact subsystems you owned on a team project — never the whole project

  problem: 'What was actually hard about this. Be specific.',
  approach: 'What you did, specifically. Not a tech-stack list — the actual decisions.',

  numbers: [                         // REQUIRED for real differentiation — measured, with units
    'p95 latency 340ms',
    '$0.42 per 1M tokens',
  ],

  stack: ['python', 'fastapi'],      // only tech actually used in THIS project — feeds ~/stack automatically

  evidence: [                        // REQUIRED — at least one link
    { label: 'live', url: 'https://example.com' },
    { label: 'github', url: 'https://github.com/you/repo' },
  ],

  repoUrl: 'https://github.com/you/repo',   // REQUIRED
  liveUrl: '',
  writeupUrl: '',
},
```

`validateContent()` logs a console error on page load if a `shipped` project
is missing `repoUrl` or has an empty `evidence` array — check the browser
console after adding one. It logs a warning (not an error) if `numbers` is
empty; fill it in with real measurements as soon as you have them.

Nothing else to do — `~/stack` and the "projects shipped" counter update on
their own from this array.

## Add a `~/log` entry

Copy this into the top of the `logEntries` array (newest first) in
`js/content.js`:

```js
{
  date: '2026-09-08',              // YYYY-MM-DD
  title: 'One line, what happened',
  body: 'One paragraph, plain language. What you did, why, what you found. Nothing invented — this is the part strangers use to tell the site is real.',
  link: '',                        // optional: url to a longer write-up
  projectId: '',                   // optional: id of a related project, shows as a tag on the entry
  status: 'shipped',                // 'planned' entries never render
},
```

## Flip a planned project to shipped

1. Find the project by `id` in the `projects` array (`inference-bench`,
   `rag-eval`, `outagenet`, or one you added as `planned`).
2. Fill in every field that's currently `''` or `[]`: `summary`, `role`
   (name the exact subsystems for a team project — never the whole thing),
   `problem`, `approach`, `numbers` (real, measured), `stack`, `evidence`,
   `repoUrl`.
3. Change `status: 'planned'` to `status: 'shipped'`.
4. Reload the page and check the browser console — `validateContent()` will
   tell you if `repoUrl`, `evidence`, or `numbers` are still missing.
5. If a `~/build` diagram in the `diagrams` array has `projectId` matching
   this project, flip its `status` to `'shipped'` too, once the diagram
   actually describes what you built.

That's it — the project card, its entry in `~/stack`, and the "projects
shipped" counter all update automatically. No other file changes.

## Add a `~/build` diagram

Diagrams explain one specific mechanism in one specific shipped project —
never a generic textbook concept. Copy into the `diagrams` array:

```js
{
  id: 'my-diagram-slug',
  type: 'pipeline',        // 'pipeline' | 'loop' | 'rank' — see js/diagrams.js for the animation each drives
  title: 'short label',    // rendered as "how {title} works in {project title}"
  projectId: 'my-project-slug',  // must match a project id
  tag: 'short caption under the title',
  desc: 'One or two sentences on the mechanism, specific to what you actually built.',
  status: 'planned',       // flip to 'shipped' once projectId's project is also shipped
},
```
