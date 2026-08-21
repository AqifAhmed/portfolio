# aqifahmed.com — portfolio

Minimal terminal/CLI-themed portfolio positioned for AI Engineer roles. Plain
HTML / CSS / JS — no build step, no framework, no npm install. That's
deliberate: GitHub Pages serves it as-is, and there's nothing to break.

## Structure

- `index.html` — all content lives here. To edit a project, section, or link,
  edit the HTML directly (it's organized with clear `<!-- SECTION -->` markers).
- `css/style.css` — design tokens at the top (`:root` for light,
  `html[data-theme="dark"]` for dark), then one block per section.
- `js/main.js` — theme toggle, mobile menu, scroll reveal, local-time clock.
  One file, no dependencies.
- `assets/` — profile photo and résumé PDF.

## Design

- Terminal/CLI aesthetic: the hero is a terminal window with typed commands,
  sections read like `$ cat <file>.txt`, nav links are `~/` paths.
- Monochrome base with an acid-green accent, light + dark themes (toggle in the
  nav, respects system preference, persisted in `localStorage`).
- Typeface: Geist + Geist Mono, via Google Fonts.
- Texture: faint film grain + a soft accent glow behind the hero.
- Motion: terminal-typed commands on load, scroll progress bar, nav compaction,
  magnetic CTAs, IntersectionObserver scroll reveals, marquee.
  All honor `prefers-reduced-motion`.

## Editing content

Everything is in `index.html`:

- **Now** (`#now`) — a `$ cat now.txt` status block: status / building / learning / next.
  Each is a `.file-row`; copy one to add another.
- **Projects** (`#projects`) — the featured builds. Each is an
  `<article class="system">` block; copy one to add another.
- **Skills** (`#skills`) and **Education** (`#education`) — `$ cat <file>.txt`
  blocks; each item is a `.file-row`.
- **Contact** (`#contact`) — email + social links.

You can edit directly in GitHub's web editor; Pages redeploys automatically
in under a minute.

## Deploy

Already wired: push to `main`, GitHub Pages serves it at `aqifahmed.com`
(the `CNAME` file handles the custom domain).

## Local preview

Any static server works:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.
