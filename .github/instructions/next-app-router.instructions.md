---
applyTo: 'app/**/*.{ts,tsx},ui/**/*.{ts,tsx},lib/**/*.{ts,tsx}'
---

# Next.js App Router Implementation (Next.js 16+)

**Note**: Update version references (`16+`, `17+`, etc.) when the project upgrades.

## App Router Boundaries

### Document shell (`app/layout.tsx`)

- Define `<html>`, `<head>`, and `<body>`.
- Import global CSS once at the root layout.
- Export static `metadata` when values are stable.
- Keep this layer server-only: no hooks, no event handlers, no browser APIs.

### Page assembly (`app/page.tsx` and route pages)

- Default to server components.
- Compose prefab sections and layout wrappers.
- Fetch data here (or in server components) when needed.
- Avoid local interactive UI state in server pages.

## Client Orchestration

- Prefer the smallest client boundary needed for interactivity.
- Keep listener cleanup strict and debounce high-frequency work with `requestAnimationFrame`.
- Pass derived state down as props instead of duplicating global listeners.

## Metadata and SEO

- Keep `metadata` static unless route-dependent values require `generateMetadata`.
- Use file-based metadata conventions only for assets and channels the project actively uses.
- Keep JSON-LD in root layout via `application/ld+json` script when needed.

## Static Assets

- `public/images/` is the standard location for static image assets.
- Reference images by URL path in `<Image>` src; do not import them as modules.

## Server Actions and Fullstack Boundaries

- Use server actions (`'use server'`) for authenticated mutations and server-side writes.
- Validate action input at the boundary (Zod) and return typed results.
- Keep secrets, database access, and privileged logic server-only.
- Use route handlers for public HTTP endpoints, webhooks, or integrations.
- Avoid duplicating mutation logic between client fetch calls and server actions.

## Styling in App Router

- Import global CSS only in `app/layout.tsx`.
- Use CSS variables for frequently changing visual values.
- Keep styling decisions in UI components; prefab components should compose those.

## Performance Guardrails

- Keep client JavaScript minimal; default to server components.
- Avoid duplicate global listeners for the same signal (scroll/resize/pointer).
- Respect `prefers-reduced-motion` and avoid unnecessary animation work.
- Measure performance in production mode (`npm run build` + `npm run start`) before diagnosing regressions.

## Imports

Import path ownership rules are defined in `imports.instructions.md`.
