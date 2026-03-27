# CLAUDE.md — AI Agent Context for Aqif Ahmed's Portfolio

This file provides project context for Claude and other AI coding assistants.

## Quick Summary

**What**: Single-page portfolio website for Aqif Ahmed (Backend & AI Engineer).
**Stack**: Next.js 14 (App Router) + TypeScript + React 18 + Tailwind CSS 3.4 + Framer Motion 11.
**Style**: Dark cyberpunk/terminal "neural OS" aesthetic with red (#eb0000) accent color.
**Status**: Functional but incomplete — several placeholder links and a missing mobile menu.

## Project Structure

```
portfolio/
├── app/
│   ├── components/          # All 7 client components
│   │   ├── Contact.tsx      # Contact form (simulated submit, no real backend)
│   │   ├── CustomCursor.tsx  # Custom dot + ring cursor with spring physics
│   │   ├── Footer.tsx       # Footer with placeholder social links
│   │   ├── Hero.tsx         # Hero section: portrait, parallax, letter animation
│   │   ├── Navbar.tsx       # Glassmorphic navbar (mobile menu NOT rendered)
│   │   ├── Projects.tsx     # 2 project cards with parallax images
│   │   └── StatsGrid.tsx    # 3-col stats: GitHub 1248, LeetCode 452, Core Stack
│   ├── globals.css          # Resets, scanline/grain effects, cursor:none override
│   ├── layout.tsx           # Root layout: metadata, CDN fonts, dark mode
│   └── page.tsx             # Home page: loading screen + section assembly
├── public/perfil.png        # Portrait image
├── tailwind.config.ts       # MD3 color tokens, custom keyframes & animations
├── next.config.js           # Empty/default
├── postcss.config.js        # tailwindcss + autoprefixer
├── tsconfig.json            # Strict mode, bundler resolution
└── package.json             # aqif-portfolio@0.1.0
```

## Commands

```bash
npm install    # Install dependencies (if node_modules missing)
npm run dev    # Start dev server (Next.js)
npm run build  # Production build
npm run start  # Serve production build
```

## Critical Conventions

### Code Patterns
- **Every component** starts with `"use client"` — the app is entirely client-rendered.
- **Framer Motion** is the animation library — used for scroll animations (`useInView`, `useScroll`, `useTransform`), spring physics (`useSpring`, `useMotionValue`), staggered reveals (`variants`), and `AnimatePresence` for mount/unmount transitions.
- **Standard easing**: `[0.22, 1, 0.36, 1]` cubic-bezier used consistently across all animated transitions.
- **No data fetching / no API routes / no backend** — everything is hardcoded client-side.
- **No tests or linting config** — `eslint-config-next` is a devDependency but there's no `.eslintrc`.

### Styling Patterns
- **Tailwind CSS** with custom color tokens from `tailwind.config.ts` (Material Design 3 inspired).
- **Key colors**: `primary-dim` (#eb0000 red), `background` (#0e0e0e near-black), `on-background` (white), `on-surface-variant` (#ababab gray).
- **Typography**: `font-headline` = Space Grotesk, `font-body` / `font-label` = Inter.
- **All border-radius set to 0px** — sharp angles are the design language.
- **Terminal aesthetic**: labels mimic system commands in UPPERCASE_SNAKE_CASE with wide letter-spacing.
- **Global cursor: none** — `CustomCursor.tsx` replaces native cursor.

### File Organization
- Components all live in `app/components/`. No subdirectories, no barrel exports.
- No utility files, hooks, or lib directories exist.
- The single page (`app/page.tsx`) imports and composes all sections.
- `LoadingScreen` is an inline component within `page.tsx`, not a separate file.

## Section Flow

```
Loading Screen → Navbar → Hero → StatsGrid → Projects → Contact → Footer
```

Navigation anchors: `#projects`, `#contact` (no `#about` section exists despite the nav link).

## Visual Effects System

| Effect        | Location      | Mechanism                                     |
| ------------- | ------------- | --------------------------------------------- |
| Scanline      | globals.css   | CSS `@keyframes scanline`, 6s linear infinite  |
| Grain overlay | globals.css   | SVG `feTurbulence` noise, 4% opacity           |
| Kinetic glow  | globals.css   | `.kinetic-glow:hover` — red box-shadow         |
| Parallax      | Hero.tsx      | Framer `useSpring`/`useMotionValue` on mouse   |
| Custom cursor | CustomCursor  | Spring-following dot + trailing ring            |
| Scroll fade   | Hero.tsx      | `useScroll`/`useTransform` for opacity & y      |
| Counters      | StatsGrid.tsx | `requestAnimationFrame` eased count-up          |
| Letter hover  | Hero.tsx      | Per-letter `whileHover` spring bounce           |

## External Dependencies

- **Google Fonts CDN**: Space Grotesk, Inter, Material Symbols Outlined.
- **Project images**: Hosted on `lh3.googleusercontent.com/aida-public/...` (Google Cloud).
- **Portrait**: Local `/public/perfil.png`.

## Known Incomplete Features

1. **Mobile menu** — `menuOpen` state exists in Navbar but no mobile menu JSX is rendered.
2. **"ABOUT" nav link** — points to `#` with no corresponding section.
3. **Footer social links** — all `href="#"` (GitHub, LinkedIn, X).
4. **CTA buttons** — `INITIALIZE_PROJECT` and `VIEW_DOCS` have no click action.
5. **Contact form** — uses `setTimeout` to fake sending, no real endpoint.
6. **Copyright year** — hardcoded to 2024 in Footer.
7. **No SEO beyond basics** — only `<title>` and `<meta description>` via Next.js metadata.

## When Modifying This Project

- **Adding new sections**: Create component in `app/components/`, add `"use client"`, use Framer Motion for entry animations, follow the UPPERCASE_SNAKE_CASE label pattern, and import it in `app/page.tsx`.
- **Adding colors**: Extend `colors` in `tailwind.config.ts` following the MD3 token naming.
- **Adding animations**: Define keyframes in `tailwind.config.ts` or use Framer Motion inline.
- **Adding pages**: This is a single-page site; consider if a new section is more appropriate.
- **Font CDN duplication**: Fonts are loaded in both `globals.css` (`@import`) and `layout.tsx` (`<link>`). Ideally remove one.
