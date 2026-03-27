# AGENTS.md — AI Agent Context for Aqif Ahmed's Portfolio

## Project Overview

This is **Aqif Ahmed's personal portfolio website** — a single-page, dark-themed, futuristic/cyberpunk-styled developer portfolio. The site presents Aqif as a **Backend & AI Engineer** specializing in Python, FastAPI, PyTorch, and LLM operations. The design uses a "neural OS" / terminal aesthetic with scan lines, grain overlays, animated counters, and a custom cursor (desktop only).

## Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Framework    | **Next.js 14.2.5** (App Router)                     |
| Language     | **TypeScript 5**                                    |
| UI Library   | **React 18**                                        |
| Styling      | **Tailwind CSS 3.4** with custom design tokens      |
| Animations   | **Framer Motion 11**                                |
| Icons        | **Google Material Symbols Outlined** (via CDN)      |
| Fonts        | **Space Grotesk** (headings), **Inter** (body/label) — loaded via Google Fonts CDN |
| PostCSS      | tailwindcss + autoprefixer                          |
| Package Mgr  | npm                                                 |

## Directory Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── github/route.ts   # API route — fetches live GitHub contributions
│   │   └── leetcode/route.ts  # API route — fetches live LeetCode stats via GraphQL
│   ├── components/          # All React components (client-side)
│   │   ├── Contact.tsx      # Contact form section with Web3Forms integration
│   │   ├── CustomCursor.tsx  # Custom cursor with trailing ring (desktop only, hidden on mobile)
│   │   ├── Footer.tsx       # Footer with social links
│   │   ├── Hero.tsx         # Hero section with portrait, parallax, letter animations
│   │   ├── Navbar.tsx       # Sticky navbar with responsive mobile menu
│   │   ├── Projects.tsx     # Project showcase with parallax images
│   │   └── StatsGrid.tsx    # Stats cards (live GitHub, live LeetCode, Core Stack)
│   ├── globals.css          # Global styles, grain/scanline effects, cursor overrides (desktop only)
│   ├── layout.tsx           # Root layout — metadata, fonts, dark mode class
│   └── page.tsx             # Home page — loading screen + assembles all sections
├── public/
│   └── perfil.png           # Portrait image used in Hero section
├── next.config.js           # Next.js config (empty/default)
├── tailwind.config.ts       # Tailwind config with custom Material Design 3 color tokens
├── postcss.config.js        # PostCSS config (tailwindcss + autoprefixer)
├── tsconfig.json            # TypeScript config (bundler resolution, strict mode)
└── package.json             # Dependencies and scripts
```

## Key Architecture Decisions

### App Router (Next.js 14)
- Uses the `app/` directory structure (App Router), **not** the `pages/` directory.
- All components use `"use client"` directive — the entire app is client-rendered.
- The root layout (`app/layout.tsx`) sets `<html lang="en" className="dark">` for Tailwind dark mode.
- API routes exist under `app/api/` for live data fetching (GitHub, LeetCode).

### Single-Page Design
- There is only **one route** (`/`) — `app/page.tsx`.
- Sections are separated by components: `Hero → StatsGrid → Projects → Contact → Footer`.
- Navigation uses anchor links (`#stats`, `#projects`, `#contact`).

### Loading Screen
- The `LoadingScreen` component is defined **inside `page.tsx`** (not a separate file).
- Simulates a "neural OS boot" sequence with progress bar and phase labels.
- Uses `AnimatePresence` to fade out, then reveals the main content.

### Custom Cursor
- The native cursor is hidden on desktop only via `@media (min-width: 768px)` in `globals.css`.
- `CustomCursor.tsx` renders a Framer Motion dot + trailing ring that follows mouse position with spring physics.
- The cursor changes size when hovering over interactive elements (links/buttons).
- Both cursor elements use `hidden md:block` so they are invisible on mobile.

### API Routes
- `app/api/github/route.ts` — Fetches GitHub contribution data from `github-contributions-api.jogruber.de`. Returns total contributions/year and last 12 weeks of bar chart heights. Cached for 1 hour via `next.revalidate`.
- `app/api/leetcode/route.ts` — Fetches LeetCode stats via GraphQL at `leetcode.com/graphql`. Returns total solved, easy/medium/hard breakdowns, total questions, and global ranking. Cached for 1 hour.

## Design System & Theming

### Color Palette
The `tailwind.config.ts` defines an extensive **Material Design 3-inspired** color token set. Key colors:

| Token            | Value       | Usage                              |
| ---------------- | ----------- | ---------------------------------- |
| `primary-dim`    | `#eb0000`   | **Main brand red** — buttons, accents, glows |
| `primary`        | `#ff8e7d`   | Lighter primary for hover states   |
| `background`     | `#0e0e0e`   | Page background (near-black)       |
| `on-background`  | `#ffffff`   | Primary text color                 |
| `on-surface-variant` | `#ababab` | Secondary/muted text             |
| `surface-container-high` | `#1f1f1f` | Card/container backgrounds    |
| `surface-container-low`  | `#131313` | Slightly elevated surfaces    |
| `outline`        | `#757575`   | Border/divider color               |

### Typography
- **Headlines**: `Space Grotesk` — bold, uppercase, tight tracking
- **Body/Labels**: `Inter` — clean, readable

### Animations (Tailwind Keyframes)
Custom keyframes defined in Tailwind config: `fade-up`, `fade-in`, `slide-in-right`, `scan`, `pulse-glow`, `flicker`, `counter`, `bar-fill`.

### Visual Effects
- **Scanline**: A thin horizontal line continuously scrolling down the viewport (CSS animation in `globals.css`).
- **Grain overlay**: SVG noise texture overlaid on the entire page at very low opacity.
- **Kinetic glow**: Red box-shadow glow on hover (`.kinetic-glow` class).
- **Parallax**: Mouse-following parallax on the Hero portrait image via Framer Motion springs.

## Component Details

### `page.tsx` — Home Page
- **State**: `loading` (boolean) — toggles between LoadingScreen and main content.
- **LoadingScreen**: Progress bar with 3 phases (`BOOTING`, `LOADING_NEURAL_OS`, `INIT_COMPLETE`). Auto-completes.
- **Renders**: `CustomCursor`, scanline div, grain div, then `Navbar`, `Hero`, `StatsGrid`, `Projects`, `Contact`, `Footer`.

### `Hero.tsx`
- Scroll-driven opacity fade and Y translation via `useScroll` / `useTransform`.
- Mouse parallax on the portrait via `useMotionValue` / `useSpring`.
- Animated letter-by-letter rendering of "AQIF AHMED" with hover bounce.
- Two CTA buttons: `INITIALIZE_PROJECT` (scrolls to contact) and `VIEW_RESUME` (opens resume PDF in new tab).
- Portrait image from `/perfil.png` with grayscale-to-color hover effect.

### `StatsGrid.tsx`
- 3-column grid showing:
  1. **GitHub Engineering** — animated counter with **live data** from `/api/github` + bar chart.
  2. **Algo Proficiency** — animated counter with **live data** from `/api/leetcode` + difficulty progress bars + global ranking.
  3. **Core Stack** — tech tags (Python 3.12, FastAPI, PyTorch, PostgreSQL, Docker, LLM_OPS).
- Uses `useInView` for scroll-triggered animations (fires once).
- Shows skeleton loading states while data loads, error states on failure.

### `Projects.tsx`
- Displays 2 featured projects (`NEURAL_OS`, `ETHER_SHIELD`) in alternating layouts.
- Project images are hosted on Google Cloud (external URLs).
- Each project card has parallax image scrolling via `useScroll` / `useTransform`.
- Hover effects: brightness change, scan line, corner decorations.

### `Contact.tsx`
- Contact form with animated floating labels (peer CSS technique).
- Fields: `IDENTIFIER` (name), `COMM_CHANNEL` (email), `MANIFESTO / REQUEST` (message).
- Submit button has 3 states: default → `ENCRYPTING...` (spinner) → `TRANSMITTED` (checkmark).
- **Uses Web3Forms API** for real form submissions (`api.web3forms.com/submit`).
- Grid background pattern and ambient glow effects.

### `Navbar.tsx`
- Fixed position, full width, z-50.
- Scroll-aware: transparent when at top, glassmorphic (`backdrop-blur-xl`) when scrolled past 40px.
- Logo: `Aqif Ahmed` (red "Aqif" + white " Ahmed").
- **Desktop**: Centered nav links (`ABOUT`, `PROJECTS`, `CONTACT`) + decorative terminal icon on right.
- **Mobile**: Hamburger menu icon that toggles a full-width dropdown menu with animated link entries, red dot accents, and divider lines between items.
- Uses flexbox layout with `justify-between` for proper mobile alignment.

### `Footer.tsx`
- Simple footer with name, copyright, and social links (GITHUB, LINKEDIN, X).
- Links point to actual social profiles.
- Copyright year is hardcoded to 2024.

### `CustomCursor.tsx`
- Main dot: 8px white circle (40px when hovering interactive elements).
- Trailing ring: 32px bordered circle with `primary-dim` color (60px on hover).
- Both use spring physics for smooth following.
- `mix-blend-mode: difference` on the main dot.
- **Hidden on mobile** via `hidden md:block` classes.

## Scripts

```bash
npm run dev    # Start Next.js dev server
npm run build  # Production build
npm run start  # Start production server
```

## Important Patterns

1. **All components are client components** (`"use client"` directive).
2. **Framer Motion is used extensively** — every section uses scroll-triggered, staggered, and spring animations.
3. **The cubic-bezier easing `[0.22, 1, 0.36, 1]`** is used consistently across all animation transitions.
4. **Uppercase/monospace terminal aesthetic** — labels are styled as system commands (e.g., `COMMIT_FLOW: STEADY_STATE`, `PROTOCOL: START_TRANSMISSION`).
5. **API routes exist** for GitHub and LeetCode live stats — cached for 1 hour.
6. **Contact form uses Web3Forms** for real email delivery.
7. **No testing setup** — no test framework or tests exist.
8. **No ESLint config file** — uses `eslint-config-next` from devDependencies.
9. **Images**: Portrait is local (`/public/perfil.png`), project images are external Google Cloud URLs.
10. **Custom cursor is desktop-only** — hidden via `hidden md:block` and CSS `cursor: none` is scoped to `@media (min-width: 768px)`.

## Known Gaps / TODOs

- Footer copyright year is hardcoded to **2024**.
- **No SEO beyond basics** — only `<title>` and `<meta description>` via Next.js metadata.
- **Font CDN duplication** — fonts are loaded in both `globals.css` (`@import`) and `layout.tsx` (`<link>`). Ideally remove one.
- Project `VIEW_RESOURCES` links are **placeholder `#` hrefs**.
