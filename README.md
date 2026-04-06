# Živé Sklo Website

One-page marketing site for Živé Sklo — a Czech interactive glass-art experience for corporate events, schools, and private celebrations.

## Tech Stack

| Tool          | Version         | Purpose                            |
| ------------- | --------------- | ---------------------------------- |
| Next.js       | 16 (App Router) | SSR framework                      |
| React         | 19              | UI layer                           |
| TypeScript    | 5               | Type safety                        |
| Tailwind CSS  | 3               | Utility-first styling              |
| Framer Motion | 12              | Scroll-reveal & micro-animations   |
| shadcn/ui     | latest          | Headless component primitives      |
| Zod           | 3               | Schema validation (contact form)   |
| Brevo         | 5               | Transactional email (contact form) |
| Playwright    | 1               | End-to-end tests                   |

## Project Structure

```
app/               # Next.js App Router (pages, layout, route handlers)
  actions/         # Server Actions (contact form, validation)
  assets/          # Static assets bundled by Next.js
lib/               # Shared utilities (content, Zod schemas, security helpers)
  schemas/         # Zod contact schema
  security/        # Rate-limiter, honeypot helpers
ui/                # Component library
  components/      # General reusable components
  prefabs/         # Page-section components (Hero, Gallery, ContactForm …)
  layout/          # Header, Footer, MobileMenu
public/images/     # Optimised static images
tests/e2e/         # Playwright end-to-end tests
```

## Development Setup

```bash
cp .env.example .env.local   # fill in BREVO_API_KEY, BREVO_FROM_EMAIL, CONTACT_TO
npm install
npm run dev                  # http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

### Google Analytics

Set `NEXT_PUBLIC_GA_TRACKING_ID` in Vercel.
If the key is not set, GA scripts are not loaded.

### Contact Form Email

The contact form uses a Server Action running on Vercel functions with [Brevo](https://www.brevo.com) for email delivery.

Required variables (set in Vercel → Project Settings → Environment Variables):

- `BREVO_API_KEY` – API key from Brevo SMTP/API settings
- `BREVO_FROM_EMAIL` – verified sender address, e.g. `info@mail.akce.zivesklo.cz`
- `BREVO_FROM_NAME` – optional sender display name, e.g. `Živé Sklo`
- `CONTACT_TO` – recipient address for incoming inquiries

Production checklist for `akce.zivesklo.cz`:

1. Confirm these variables are set for the exact deployment environment target (Production or custom production-like target), not only Preview.
2. Confirm `BREVO_FROM_EMAIL` uses a domain/address that is verified in Brevo.
3. Deploy and submit the form once.
4. Open Vercel runtime logs and search for `[contact-form] failed to send inquiry`.
5. If present, use logged `reason`, `details`, and `requestId` to resolve provider/env issues in Brevo or Vercel.
6. If a user sees an error with `Kód: ...`, match this code to `requestId` in logs for fast traceability.

## Security Baseline for Contact Form

- Server-side validation with Zod.
- Honeypot hidden field.
- Minimum dwell time check.
- Basic per-identifier rate limit in server runtime memory.

## Commands

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e:baseline`
- `npm run perf:lighthouse:baseline`
