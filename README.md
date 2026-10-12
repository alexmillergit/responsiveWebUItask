# Responsive Web UI Task

Navigation header and hero section for a SaaS landing page, implemented from the Figma design
(mobile-first React + TypeScript, built with Vite). No UI library: buttons, typography, text field
and links are small base components under `src/components/ui`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm test           # unit tests (vitest)
```

Optional: copy `.env.example` to `.env` to point the sign-up mutation at another GraphQL endpoint.

## What's implemented

- **Responsive layout (mobile first)** with the four design frames as breakpoints: mobile (default),
  tablet ≥ 768px, laptop ≥ 1024px, desktop ≥ 1280px. Content is held in a container with a
  **max-width of 1280px** centred on larger screens (implementation note).
- **Header**: logo, nav links, "Log in" and "Start free trial" from tablet up; a hamburger button below that.
- **Mobile menu** (implementation notes): opens by sliding down while fading in, opacity 0 → 1,
  ease-in-out, **500ms**; the close button, a tap on the overlay and Esc close it by sliding up while
  fading out, opacity 1 → 0, ease-in-out, **300ms**. It is a modal dialog: focus moves in, is trapped,
  and returns to the menu button; page scroll is locked while open; `prefers-reduced-motion` is respected.
- **Hero**: "We're hiring" badge, headline, lead copy, email form, terms note and the illustration.
- **Component states** from the design's component sheet: hover and focus for buttons, links, the
  text field, the menu trigger and the close button.
- **Bonus: "Start free trial"** validates the email and runs the `createUser` GraphQL mutation against
  `https://graphqlzero.almansi.me/api`, with loading, success and error feedback
  (`src/api`, `src/hooks/useStartFreeTrial.ts`). The API requires a name and username, so both are
  derived from the local part of the email.

## Structure

```
src/
  api/          graphqlClient (fetch-based), createUser mutation
  components/
    ui/         Button, Typography, TextField, Link (base components, CSS Modules)
    Header/     Header, MobileMenu
    Hero/       Hero, HiringBadge, TrialForm
    icons/      Logo and icons (exported from the design)
  hooks/        useStartFreeTrial
  styles/       design tokens, fonts, global styles
```

Design tokens (colours, spacing, motion durations, breakpoints) live in `src/styles/tokens.css`.
Inter is self-hosted (`src/assets/fonts`, SIL OFL).

## Verification notes

Built output was compared against the exported Figma frames (mobile menu closed and open, tablet,
laptop, desktop): remaining pixel differences are text anti-aliasing only. Menu timings, focus
handling, the mutation payload and error paths were exercised in a headless browser.
