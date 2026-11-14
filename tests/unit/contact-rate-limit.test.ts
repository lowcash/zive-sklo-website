import { afterEach, describe, expect, it } from 'vitest'

import { checkContactRateLimit, resetContactRateLimitStoreForTests } from '@/lib/security/contact-rate-limit'

describe('checkContactRateLimit', () => {
  afterEach(() => {
    resetContactRateLimitStoreForTests()
  })

  it('allows the first attempts within the window', () => {
    expect(checkContactRateLimit('ip:1').allowed).toBe(true)
    expect(checkContactRateLimit('ip:1').allowed).toBe(true)
    expect(checkContactRateLimit('ip:1').allowed).toBe(true)
  })

  it('blocks after max attempts', () => {
    checkContactRateLimit('ip:2')
    checkContactRateLimit('ip:2')
    checkContactRateLimit('ip:2')
    const blocked = checkContactRateLimit('ip:2')
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('tracks identifiers independently', () => {
    checkContactRateLimit('ip:a')
    checkContactRateLimit('ip:a')
    checkContactRateLimit('ip:a')
    expect(checkContactRateLimit('ip:a').allowed).toBe(false)
    expect(checkContactRateLimit('ip:b').allowed).toBe(true)
  })
})
