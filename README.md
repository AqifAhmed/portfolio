# aqifahmed.com — portfolio

Minimal, monochrome portfolio. Plain HTML / CSS / JS — no build step, no
framework, no npm install. That's deliberate: GitHub Pages serves it as-is,
and there's nothing to break.

## Structure

- `index.html` — all content lives here. To edit a project, section, or link,
  edit the HTML directly (it's organized with clear `<!-- SECTION -->` markers).
- `css/style.css` — design tokens at the top (`:root` for light,
  `html[data-theme="dark"]` for dark), then one block per section.
- `js/main.js` — theme toggle, mobile menu, scroll reveal, local-time clock.
  One file, no dependencies.
- `assets/` — profile photo and résumé PDF.

## Design

- Strict black-and-white monochrome, light + dark themes (toggle in the nav,
  respects system preference, persisted in `localStorage`).
- Typeface: Geist + Geist Mono via Google Fonts.
- Animations: hero line-reveal on load, IntersectionObserver scroll reveals,
  marquee. All honor `prefers-reduced-motion`.

## Editing content

Everything is in `index.html`:

- **Systems** (`#systems`) — the three featured automation case studies.
  Each is an `<article class="system">` block; copy one to add another.
- **Method** (`#method`) — the six build principles.
- **Stack** (`#stack`) — the capability rows.
- **Background** (`#background`) — bio, portrait, earlier projects list.
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
