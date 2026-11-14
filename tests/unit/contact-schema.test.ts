import { describe, expect, it } from 'vitest'

import { CONTACT_EVENT_TYPES, validateContactSubmission } from '@/lib/schemas/contact'

const validInput = {
  name: 'Jan Novák',
  email: 'jan@example.com',
  phone: '+420 777 123 456',
  eventType: 'teambuilding',
  datePlace: '15. 5. 2026, Praha',
  participants: '30',
  message: 'Prosím o nabídku',
  gdpr: true,
}

describe('validateContactSubmission', () => {
  it('accepts a valid payload', () => {
    const result = validateContactSubmission(validInput)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('jan@example.com')
      expect(result.data.eventType).toBe('teambuilding')
    }
  })

  it('rejects missing name', () => {
    const result = validateContactSubmission({ ...validInput, name: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.name).toMatch(/povinné/i)
    }
  })

  it('rejects invalid email', () => {
    const result = validateContactSubmission({ ...validInput, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.email).toBeTruthy()
    }
  })

  it('rejects zero participants', () => {
    const result = validateContactSubmission({ ...validInput, participants: '0' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.participants).toMatch(/větší než 0/i)
    }
  })

  it('rejects unknown event types', () => {
    const result = validateContactSubmission({ ...validInput, eventType: 'wedding' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.eventType).toBeTruthy()
    }
  })

  it('exports the shared event-type enum', () => {
    expect(CONTACT_EVENT_TYPES).toContain('city-market')
    expect(CONTACT_EVENT_TYPES).toHaveLength(5)
  })

  it('sanitizes control characters from text fields', () => {
    const result = validateContactSubmission({
      ...validInput,
      name: 'Jan\u0000 Novák',
      message: 'Ahoj\u0007 světe',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Jan Novák')
      expect(result.data.message).toBe('Ahoj světe')
    }
  })
})
