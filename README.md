# Živé Sklo Website

Next.js 16 one-page site for Živé Sklo.

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

### Google Analytics

Set `NEXT_PUBLIC_GA_TRACKING_ID` in Vercel.
If the key is not set, GA scripts are not loaded.

### Contact Form Email

The contact form uses a Server Action running on Vercel functions with [Resend](https://resend.com) for email delivery.

Required variables (set in Vercel → Project Settings → Environment Variables):
- `RESEND_API_KEY` – API key from https://resend.com/api-keys
- `RESEND_FROM` – verified sender address, e.g. `Živé Sklo <no-reply@zivesklo.cz>`
- `CONTACT_TO` – recipient address for incoming inquiries

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
