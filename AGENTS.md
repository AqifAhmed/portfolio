# AGENTS.md — AI Agent Context for Aqif Ahmed's Portfolio

## Project Overview

This is **Aqif Ahmed's personal portfolio website** — a single-page, dark-themed, futuristic/cyberpunk-styled developer portfolio. The site presents Aqif as a **Backend & AI Engineer** specializing in Python, FastAPI, PyTorch, and LLM operations. The design uses a "neural OS" / terminal aesthetic with scan lines, grain overlays, animated counters, and a custom cursor.

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
│   ├── components/          # All React components (client-side)
│   │   ├── Contact.tsx      # Contact form section with animated inputs
│   │   ├── CustomCursor.tsx  # Custom cursor with trailing ring effect
│   │   ├── Footer.tsx       # Footer with social links
│   │   ├── Hero.tsx         # Hero section with portrait, parallax, letter animations
│   │   ├── Navbar.tsx       # Sticky navbar with scroll-aware backdrop blur
│   │   ├── Projects.tsx     # Project showcase with parallax images
│   │   └── StatsGrid.tsx    # Stats cards (GitHub, LeetCode, Core Stack)
│   ├── globals.css          # Global styles, grain/scanline effects, cursor overrides
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

### Single-Page Design
- There is only **one route** (`/`) — `app/page.tsx`.
- Sections are separated by components: `Hero → StatsGrid → Projects → Contact → Footer`.
- Navigation uses anchor links (`#projects`, `#contact`).

### Loading Screen
- The `LoadingScreen` component is defined **inside `page.tsx`** (not a separate file).
- Simulates a "neural OS boot" sequence with progress bar and phase labels.
- Uses `AnimatePresence` to fade out, then reveals the main content.

### Custom Cursor
- The native cursor is hidden globally via `*, *::before, *::after { cursor: none !important; }` in `globals.css`.
- `CustomCursor.tsx` renders a Framer Motion dot + trailing ring that follows mouse position with spring physics.
- The cursor changes size when hovering over interactive elements (links/buttons).

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
- Two CTA buttons: `INITIALIZE_PROJECT` and `VIEW_DOCS`.
- Portrait image from `/perfil.png` with grayscale-to-color hover effect.

### `StatsGrid.tsx`
- 3-column grid showing:
  1. **GitHub Engineering** — animated counter to 1248 contributions/year + bar chart.
  2. **Algo Proficiency** — animated counter to 452 LeetCode solved + progress bar.
  3. **Core Stack** — tech tags (Python 3.12, FastAPI, PyTorch, PostgreSQL, Docker, LLM_OPS).
- Uses `useInView` for scroll-triggered animations (fires once).

### `Projects.tsx`
- Displays 2 featured projects (`NEURAL_OS`, `ETHER_SHIELD`) in alternating layouts.
- Project images are hosted on Google Cloud (external URLs).
- Each project card has parallax image scrolling via `useScroll` / `useTransform`.
- Hover effects: brightness change, scan line, corner decorations.

### `Contact.tsx`
- Contact form with animated floating labels (peer CSS technique).
- Fields: `IDENTIFIER` (name), `COMM_CHANNEL` (email), `MANIFESTO / REQUEST` (message).
- Submit button has 3 states: default → `ENCRYPTING...` (spinner) → `TRANSMITTED` (checkmark).
- **No real backend** — form submission is simulated with `setTimeout`.
- Grid background pattern and ambient glow effects.

### `Navbar.tsx`
- Fixed position, full width, z-50.
- Scroll-aware: transparent when at top, glassmorphic (`backdrop-blur-xl`) when scrolled past 40px.
- Logo: `AQIF.AI` (red "AQIF" + white ".AI").
- Desktop nav links: `ABOUT`, `PROJECTS`, `CONTACT`.
- Terminal icon button on the right (decorative, no action).
- Mobile menu state exists (`menuOpen`) but **mobile menu rendering is not yet implemented**.

### `Footer.tsx`
- Simple footer with name, copyright, and social links (GITHUB, LINKEDIN, X).
- Links are placeholder (`href="#"`) — not connected to actual profiles.

### `CustomCursor.tsx`
- Main dot: 8px white circle (40px when hovering interactive elements).
- Trailing ring: 32px bordered circle with `primary-dim` color (60px on hover).
- Both use spring physics for smooth following.
- `mix-blend-mode: difference` on the main dot.

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
5. **No API routes, no database** — this is a purely static portfolio site.
6. **No testing setup** — no test framework or tests exist.
7. **No ESLint config file** — uses `eslint-config-next` from devDependencies.
8. **Images**: Portrait is local (`/public/perfil.png`), project images are external Google Cloud URLs.

## Known Gaps / TODOs

- Mobile hamburger menu is state-tracked but **not rendered** (Navbar has `menuOpen` state but no mobile menu JSX).
- Footer social links (`GITHUB`, `LINKEDIN`, `X`) are **placeholder `#` hrefs**.
- Contact form has **no real submission logic** (simulated with setTimeout).
- CTA buttons in Hero (`INITIALIZE_PROJECT`, `VIEW_DOCS`) link to **nothing**.
- The `ABOUT` nav link points to `#` with **no About section** on the page.
- Copyright year is hardcoded to **2024**.
- `node_modules` may or may not be installed — run `npm install` if missing.
