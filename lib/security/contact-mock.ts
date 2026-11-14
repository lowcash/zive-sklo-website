type ContactMockEnv = {
  E2E_MOCK_CONTACT?: string | undefined
  VERCEL_ENV?: string | undefined
  BREVO_API_KEY?: string | undefined
}

/**
 * E2E mock only when explicitly enabled, not on Vercel production, and only when
 * Brevo is unconfigured — a host with BREVO_API_KEY never silently drops mail.
 */
export function isE2EContactMockActive(env: ContactMockEnv = process.env as ContactMockEnv): boolean {
  return env.E2E_MOCK_CONTACT === 'true' && env.VERCEL_ENV !== 'production' && !env.BREVO_API_KEY
}
