import { describe, expect, it } from 'vitest'

import {
  CONTACT_CLIENT_EMPTY_MESSAGES,
  validateContactFormClient,
} from '@/lib/schemas/contact-client'

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

describe('validateContactFormClient', () => {
  it('maps empty required fields to HEAD Czech strings', () => {
    const errors = validateContactFormClient({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      datePlace: '',
      participants: '',
      message: '',
      gdpr: false,
    })

    expect(errors.name).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.name)
    expect(errors.email).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.email)
    expect(errors.phone).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.phone)
    expect(errors.eventType).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.eventType)
    expect(errors.datePlace).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.datePlace)
    expect(errors.participants).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.participants)
    expect(errors.gdpr).toBe(CONTACT_CLIENT_EMPTY_MESSAGES.gdpr)
    expect(errors.name).toBe('Jméno je povinné')
    expect(errors.email).toBe('E-mail je povinný')
    expect(errors.phone).toBe('Telefon je povinný')
    expect(errors.eventType).toBe('Typ akce je povinný')
    expect(errors.participants).toBe('Počet účastníků je povinný')
  })

  it('accepts short datePlace like HEAD client (no min-3)', () => {
    const errors = validateContactFormClient({
      ...validInput,
      datePlace: 'ab',
    })
    expect(errors.datePlace).toBeUndefined()
  })

  it('rejects a message longer than 1200 characters', () => {
    const errors = validateContactFormClient({
      ...validInput,
      message: 'x'.repeat(1201),
    })
    expect(errors.message).toBe('Zpráva je příliš dlouhá')
  })

  it('accepts a message at the 1200 character limit', () => {
    const errors = validateContactFormClient({
      ...validInput,
      message: 'x'.repeat(1200),
    })
    expect(errors.message).toBeUndefined()
    expect(Object.keys(errors)).toHaveLength(0)
  })
})
