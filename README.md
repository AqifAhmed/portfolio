# aqifahmed.com — portfolio

Plain HTML / CSS / JS. No build step, no framework, no npm install.
That's on purpose — see "Updating your projects" below.

JS is split into small ES6 modules under `js/`, each with one job:
- `theme.js` — dark/light toggle
- `nav.js` — mobile menu + footer year
- `terminal.js` — the hero terminal typing animation
- `reveal.js` — scroll-reveal + magnetic button effect
- `projects.js` — reads `data/projects.json` and renders Work + Roadmap
- `main.js` — wires the above together, loaded as the only `<script>` tag

## Deploy to GitHub Pages

1. Create a repo (e.g. `aqifahmed/portfolio` or `aqifahmed/aqifahmed.github.io`
   if you want it at the root domain).
2. Push these files to the `main` branch:
   ```
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/aqifahmed/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → main / (root)**.
4. Your site goes live at `https://aqifahmed.github.io/portfolio/`
   (or `https://aqifahmed.github.io/` if you used the special repo name).
5. To use your custom domain `aqifahmed.com`, add a `CNAME` file in this folder
   containing just `aqifahmed.com`, and point your domain's DNS at GitHub Pages
   (GitHub's docs: Settings → Pages → Custom domain, it walks you through it).

## Updating your projects (no code editing)

Everything in the **Work** and **Roadmap** sections is read from one file:

```
data/projects.json
```

To add, edit, or remove a project, open that file (directly in GitHub's web
editor — no local setup needed) and edit the JSON. Two lists:

- `"shipped"` — finished projects, shown in the Work section.
- `"roadmap"` — planned/learning projects, shown in the Roadmap section.

Example — adding a new shipped project:

```json
{
  "title": "Inbox Triage Agent",
  "subtitle": "AI Email Automation",
  "description": "One or two sentences on what it does.",
  "tech": ["n8n", "OpenAI API", "Python"],
  "status": "shipped",
  "year": "2026",
  "github": "https://github.com/aqifahmed/inbox-agent",
  "demo": ""
}
```

Steps on GitHub.com, no terminal required:
1. Go to your repo → `data/projects.json`.
2. Click the pencil (Edit) icon.
3. Add your project object inside the `"shipped"` array (comma-separate it
   from the one before it).
4. Scroll down → "Commit changes".
5. GitHub Pages redeploys automatically in under a minute. Refresh your site.

Moving a project from "planned" into "shipped" once you finish it: cut the
object out of `roadmap` and paste it into `shipped`, add `"github"` and
`"year"`, done.

## Local preview

Because `main.js` fetches `data/projects.json`, opening `index.html` directly
via `file://` will fail (browsers block local `fetch` on that protocol). Run
a tiny local server instead:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.
