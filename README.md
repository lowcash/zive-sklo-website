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

Production checklist for `akce.zivesklo.cz`:
1. Confirm these variables are set for the exact deployment environment target (Production or custom production-like target), not only Preview.
2. Confirm `RESEND_FROM` uses a domain/address that is verified in Resend.
3. Deploy and submit the form once.
4. Open Vercel runtime logs and search for `[contact-form] failed to send inquiry`.
5. If present, use logged `reason`, `details`, and `requestId` to resolve provider/env issues in Resend or Vercel.

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
