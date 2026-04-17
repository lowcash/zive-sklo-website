# Project Architecture

## Overview

**Živé Sklo Website** is a marketing and booking site for an interactive glass-art experience, built with **Next.js 16+ (App Router)**. It emphasizes dynamic content, customer engagement, and a seamless contact/inquiry flow.

**Framework**: Next.js 16+ (App Router) — currently 16.2.2  
**React**: 19+ — currently 19.2.4  
**TypeScript**: 5+ — currently 5.9.3  
**Styling**: Tailwind CSS 4+

Architectural principles and component layering guidelines are documented in [`.github/instructions/architecture.instructions.md`](./.github/instructions/architecture.instructions.md).

---

## Directory Structure

```
app/                    # Next.js App Router (pages, layout, route handlers)
  actions/              # Server Actions (contact form, validation)
  assets/               # Static assets bundled by Next.js
lib/                    # Shared utilities (content, Zod schemas, security helpers)
  schemas/              # Zod contact schema
  security/             # Rate-limiter, honeypot helpers
  mail/                 # Brevo email client
ui/                     # Component library (root level, not src/)
  components/           # General reusable components
  prefabs/              # Page-section components (Hero, Gallery, ContactForm …)
  layout/               # Header, Footer, MobileMenu
public/images/          # Optimised static images
tests/e2e/              # Playwright end-to-end tests
```

---

## Key Systems

### 1. Contact Form & Email Delivery

**Implementation**: `app/actions/` + `lib/mail/contact-mail.ts`

**Flow**:
1. User submits form in `ui/prefabs/ContactForm.tsx`
2. Server Action validates with Zod (`lib/schemas/contact.ts`)
3. Security checks: honeypot, rate-limiter, minimum dwell time
4. Brevo SDK sends email via `BrevoClient`

**Environment Variables**:
- `BREVO_API_KEY` – API key
- `BREVO_FROM_EMAIL` – verified sender, e.g. `no-reply@mail.akce.zivesklo.cz`
- `BREVO_FROM_NAME` – optional display name
- `CONTACT_TO` – recipient address

**Benefits**: Server-side validation prevents spam, sensitive keys never exposed to client.

### 2. Google Analytics

**Implementation**: Conditional script injection in layout

**Behavior**:
- If `NEXT_PUBLIC_GA_TRACKING_ID` is set, GA initialization script loads
- No tracking if env var is unset (local dev, testing)
- Safe: no PII collected, complies with privacy defaults

### 3. Scroll-Reveal Animations

**Implementation**: Framer Motion + `InView` component wrapper

**Pattern**:
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
  {children}
</motion.div>
```

**Benefits**: GPU-accelerated, respects `prefers-reduced-motion` when configured.

---

## Tech Stack Decisions

- **Next.js App Router**: Server Actions simplify form handling and backend logic.
- **Brevo**: Lightweight email service, no heavy SMTP infrastructure.
- **Zod**: Runtime schema validation ensures form safety before processing.
- **Framer Motion**: Smooth, accessible animations for engagement.
- **Tailwind CSS**: Rapid, consistent styling with mobile-first approach.

---

## Development Notes

- **Forms**: All form submissions are Server Actions (no fetch required from client).
- **Security**: Honeypot + rate-limit headers prevent automated abuse.
- **Images**: Static images in `public/images/`, optimized with Next.js Image component.
- **Testing**: Playwright E2E tests cover contact form flow and key user journeys.
