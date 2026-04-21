# Živé Sklo Website

One-page marketing site for Živé Sklo — a Czech interactive glass-art experience for corporate events, schools, and private celebrations.

## Tech Stack

| Tool          | Version | Purpose                            |
| ------------- | ------- | ---------------------------------- |
| Next.js       | 16      | SSR framework (App Router)         |
| React         | 19      | UI layer                           |
| TypeScript    | 5       | Type safety                        |
| Tailwind CSS  | 4       | Utility-first styling              |
| Framer Motion | 12.38   | Scroll-reveal and micro-animations |
| Zod           | 4       | Schema validation (contact form)   |
| Brevo         | 5       | Transactional email (contact form) |
| Playwright    | 1       | End-to-end tests                   |
| Lighthouse    | 12      | Performance baseline               |

## Architecture

High-level structure, key systems, and architectural decisions live in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Development Setup

```bash
cp .env.example .env.local   # fill in BREVO_API_KEY, BREVO_FROM_EMAIL, CONTACT_TO
npm install
npm run dev                  # http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

### Google Analytics

Set `NEXT_PUBLIC_GA_TRACKING_ID` to enable Google Analytics (e.g. `G-XXXXXXXXXX`).
If the key is not set, GA scripts are not loaded.
If the key is set, analytics still loads only after the visitor explicitly accepts analytical cookies in the consent banner.
In local development, the consent banner is also shown without the GA key so the UI can be reviewed before production setup.

### Contact Form Email

The contact form uses a Server Action with [Brevo](https://www.brevo.com) for email delivery.

Required variables:

- `BREVO_API_KEY` – API key from Brevo SMTP/API settings
- `BREVO_FROM_EMAIL` – verified sender address, e.g. `info@mail.akce.zivesklo.cz`
- `BREVO_FROM_NAME` – optional sender display name, e.g. `Živé Sklo`
- `CONTACT_TO` – recipient address for incoming inquiries

## Commands

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run test:e2e` runs the Playwright end-to-end suite.
- `npm run perf:lighthouse` runs local desktop and mobile Lighthouse audits.

For the full script list, see `package.json`.

## Testing

Three Playwright projects: `desktop-chrome`, `mobile-safari`, `mobile-chrome`.
Tests run against a production preview build on port 3102 to avoid port conflicts.
The `E2E_MOCK_CONTACT` env var is set automatically by the webServer config to bypass real email sending during tests.

## Security Baseline for Contact Form

- Server-side validation with Zod
- Honeypot hidden field
- Minimum dwell time check
- Basic per-identifier rate limit in server runtime memory

## Production

Production URL: [https://akce.zivesklo.cz](https://akce.zivesklo.cz)
Current production deployment target: Vercel

**Author**: Lowcash  
**License**: MIT
