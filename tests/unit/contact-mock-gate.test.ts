import { describe, expect, it } from 'vitest'

import { isE2EContactMockActive } from '@/lib/security/contact-mock'

describe('isE2EContactMockActive', () => {
  it('is active for local Playwright (mock on, non-prod, no Brevo key)', () => {
    expect(
      isE2EContactMockActive({
        E2E_MOCK_CONTACT: 'true',
        VERCEL_ENV: 'preview',
      }),
    ).toBe(true)

    expect(
      isE2EContactMockActive({
        E2E_MOCK_CONTACT: 'true',
      }),
    ).toBe(true)
  })

  it('never activates on Vercel production', () => {
    expect(
      isE2EContactMockActive({
        E2E_MOCK_CONTACT: 'true',
        VERCEL_ENV: 'production',
      }),
    ).toBe(false)
  })

  it('never activates when BREVO_API_KEY is configured', () => {
    expect(
      isE2EContactMockActive({
        E2E_MOCK_CONTACT: 'true',
        VERCEL_ENV: 'preview',
        BREVO_API_KEY: 'xkeysib-present',
      }),
    ).toBe(false)
  })

  it('stays off when mock flag is missing', () => {
    expect(
      isE2EContactMockActive({
        VERCEL_ENV: 'preview',
      }),
    ).toBe(false)
  })
})
