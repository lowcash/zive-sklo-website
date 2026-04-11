# Živé Sklo Website

One-page marketing site for Živé Sklo — a Czech interactive glass-art experience for corporate events, schools, and private celebrations.

## Tech Stack

| Tool          | Version | Purpose                            |
| ------------- | ------- | ---------------------------------- |
| Next.js       | 16      | SSR framework (App Router)         |
| React         | 19      | UI layer                           |
| TypeScript    | 5       | Type safety                        |
| Tailwind CSS  | 4       | Utility-first styling              |
| Framer Motion | 12      | Scroll-reveal and micro-animations |
| Zod           | 4       | Schema validation (contact form)   |
| Brevo         | 5       | Transactional email (contact form) |
| Playwright    | 1       | End-to-end tests                   |
| Lighthouse    | 12      | Performance baseline               |

## Project Structure

```
app/                    # Next.js App Router (pages, layout, route handlers)
  actions/              # Server Actions (contact form, validation)
  assets/               # Static assets bundled by Next.js
lib/                    # Shared utilities (content, Zod schemas, security helpers)
  schemas/              # Zod contact schema
  security/             # Rate-limiter, honeypot helpers
  mail/                 # Brevo email client
ui/                     # Component library
  components/           # General reusable components
  prefabs/              # Page-section components (Hero, Gallery, ContactForm …)
  layout/               # Header, Footer, MobileMenu
public/images/          # Optimised static images
tests/e2e/              # Playwright end-to-end tests
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

Set `NEXT_PUBLIC_GA_TRACKING_ID` in Vercel (e.g. `G-XXXXXXXXXX`).
If the key is not set, GA scripts are not loaded.

### Contact Form Email

The contact form uses a Server Action with [Brevo](https://www.brevo.com) for email delivery.

Required variables (set in Vercel → Project Settings → Environment Variables):

- `BREVO_API_KEY` – API key from Brevo SMTP/API settings
- `BREVO_FROM_EMAIL` – verified sender address, e.g. `info@mail.akce.zivesklo.cz`
- `BREVO_FROM_NAME` – optional sender display name, e.g. `Živé Sklo`
- `CONTACT_TO` – recipient address for incoming inquiries

## Commands

| Command                            | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| `npm run dev`                      | Start dev server (port 3000)         |
| `npm run build`                    | Production build                     |
| `npm run preview`                  | Serve production build locally       |
| `npm run lint`                     | ESLint                               |
| `npm run typecheck`                | TypeScript check                     |
| `npm run format`                   | Prettier                             |
| `npm run test:e2e`                 | Run all Playwright tests             |
| `npm run test:e2e:baseline`        | Smoke + navigation tests (CI subset) |
| `npm run perf:lighthouse:baseline` | Build + Lighthouse + threshold check |

## Testing

Three Playwright projects: `desktop-chrome`, `mobile-safari`, `mobile-chrome`.
Tests run against a production preview build on port 3102 to avoid port conflicts.
The `E2E_MOCK_CONTACT` env var is set automatically by the webServer config to bypass real email sending during tests.

```bash
npm run test:e2e
npm run test:e2e:ui   # interactive UI mode
```

## Security Baseline for Contact Form

- Server-side validation with Zod
- Honeypot hidden field
- Minimum dwell time check
- Basic per-identifier rate limit in server runtime memory

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

---

**Author**: Lowcash  
**License**: MIT
