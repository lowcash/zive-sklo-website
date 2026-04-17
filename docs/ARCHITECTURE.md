# Project Architecture

## Overview

**Živé Sklo Website** is a marketing and booking site for an interactive glass-art experience, built with **Next.js 16+ (App Router)** and **React 19+**. It emphasizes dynamic content, customer engagement, and a seamless contact/inquiry flow.

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

**Implementation**: `app/actions/` + `lib/mail/contact-mail.ts` using Brevo SDK

**Flow**:
1. User submits form in `ui/prefabs/ContactForm.tsx`
2. Server Action validates with Zod (`lib/schemas/contact.ts`)
3. Security checks: honeypot, rate-limiter, minimum dwell time
4. Email sent via Brevo (credentials: `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, `CONTACT_TO`)

**Benefits**: Server-side validation prevents spam; sensitive API keys never exposed to client.

### 2. Google Analytics

**Implementation**: Conditional GA script injection in layout based on `NEXT_PUBLIC_GA_TRACKING_ID`

**Behavior**: GA script loads only if env var is set (off by default in dev); no PII collected.

### 3. Scroll-Reveal Animations

**Implementation**: Framer Motion for entrance animations triggered on viewport visibility

**Pattern**: CSS-in-JS with `initial` → `whileInView` states; respects `prefers-reduced-motion`

---

## Tech Stack Decisions

- **Next.js App Router**: Server Actions simplify form handling and validation without client-side fetch logic.
- **Brevo**: Lightweight, managed email service; no SMTP infrastructure overhead.
- **Zod**: Runtime schema validation ensures form data safety before server processing.
- **Framer Motion**: Smooth scroll-reveal animations that respect `prefers-reduced-motion`.
- **Tailwind CSS**: Rapid, consistent styling with mobile-first utilities.
