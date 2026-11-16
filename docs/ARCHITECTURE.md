# Project Architecture

## Overview

Živé Sklo Website is a Next.js App Router marketing site focused on inquiry capture, server-side form handling, and media-rich storytelling for the glass-art experience.

## Project Structure

```
app/
├── actions/                     # Server actions for contact handling
├── assets/                      # Static assets bundled by Next.js
├── informacni-list/
├── layout.tsx
├── page.tsx
└── globals.css
ui/
├── core/                        # Reusable layout and section primitives
└── prefabs/                     # Content-heavy page sections and client leaves
lib/
├── mail/
├── schemas/
├── security/
└── content.ts
public/
tests/
```

## Key Systems

### 1. Inquiry Pipeline

**Implementation**: `app/actions/*`, `ui/prefabs/ContactForm.tsx`, `lib/mail/contact-mail.ts`

Contact submissions stay on the server, where they are validated with Zod, filtered by honeypot, dwell-time, and rate-limit checks, and then sent through Brevo without exposing credentials to the client.

### 2. Prefab-Based Content Sections

**Implementation**: `ui/prefabs/*`, `lib/content.ts`

Content-heavy sections are assembled from server-rendered prefabs that read structured copy and media from `lib/content.ts`. Interactive client leaves are kept narrow to carousels, counters, and gallery controls.

### 3. Gallery & Motion Leaves

**Implementation**: `ui/prefabs/GallerySection.tsx`, `ui/prefabs/GalleryControls.tsx`, `ui/prefabs/GalleryModal.tsx`, `ui/prefabs/VideoPlayer.tsx`

The gallery mosaic, modal browsing and the click-to-play video are isolated into focused client leaves so media interaction stays rich without turning the whole page into a client-rendered app.

## Tech Stack Decisions

- **Next.js App Router + Server Actions** keep inquiry handling server-side and avoid a separate client API surface.
- **Root-level `ui/` with `core/` and `prefabs/`** separates reusable building blocks from page sections in a way that matches the content-led site structure.
- **Zod + runtime abuse checks** keep validation and spam protection at the same mutation boundary.
- **Brevo behind a mail adapter** keeps email delivery swappable and server-only.

## Visual Language (redesign/2026-11, Atelier)

Alternating ink and ivory surfaces (`.surface-ink`, `.surface-light`, `.surface-paper` re-map the colour tokens), Newsreader + Instrument Sans, one ember accent, one `.wrap` container and `.grid-12` grid, shared `SectionHead` (eyebrow, h2, lead) in `ui/core`. The gallery is a 12-column mosaic with a modal; the FAQ is native `details`. Clickable cards (`.card-hit` + one stretched `InquiryLink`) make the whole card the inquiry target. Motion is a small scroll reveal, a one-time hero fade-in (never the h1), gentle hover states gated by `@supports` and `prefers-reduced-motion` and a hover zoom on fine pointers. Full rationale, palette contrast values and the asset audit: [design-spec.md](./design-spec.md).
