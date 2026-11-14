import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sendTransacEmail = vi.fn()

vi.mock('@getbrevo/brevo', () => ({
  BrevoClient: class {
    transactionalEmails = {
      sendTransacEmail,
    }
  },
}))

import { formatMessageBody, sendContactMail } from '@/lib/mail/contact-mail'
import type { ContactSubmission } from '@/lib/schemas/contact'

const baseSubmission: ContactSubmission = {
  name: 'Jan Novák',
  email: 'jan@example.com',
  phone: '+420 777 123 456',
  eventType: 'city-market',
  datePlace: '15. 5. 2026, Praha',
  participants: '30',
  message: undefined,
  gdpr: true,
}

describe('formatMessageBody', () => {
  it('uses HEAD hyphen city-market label and bez zpravy placeholder', () => {
    const body = formatMessageBody(baseSubmission)
    expect(body).toContain('Typ akce: Město - trh')
    expect(body).not.toContain('Město – trh')
    expect(body).toContain('(bez zpravy)')
    expect(body).not.toContain('(bez zprávy)')
  })
})

describe('sendContactMail confirmation failure logging', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    sendTransacEmail.mockReset()
    process.env.BREVO_API_KEY = 'test-key'
    process.env.BREVO_FROM_EMAIL = 'from@example.com'
    process.env.CONTACT_TO = 'info@example.com'
    delete process.env.BREVO_FROM_NAME
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('logs only provider name/statusCode and requestId — never submitter email or provider message', async () => {
    sendTransacEmail
      .mockResolvedValueOnce({})
      .mockRejectedValueOnce(
        Object.assign(new Error('secret provider detail with jan@example.com'), {
          name: 'BrevoError',
          statusCode: 429,
        }),
      )

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await sendContactMail(baseSubmission, { requestId: 'req-abc-123' })

    expect(result.ok).toBe(true)
    expect(errorSpy).toHaveBeenCalledTimes(1)

    const [label, payload] = errorSpy.mock.calls[0] as [string, Record<string, unknown>]
    expect(label).toBe('[contact-form] confirmation email failed after inquiry delivery')
    expect(payload).toEqual({
      requestId: 'req-abc-123',
      providerError: {
        name: 'BrevoError',
        statusCode: 429,
      },
    })

    const serialized = JSON.stringify(payload)
    expect(serialized).not.toContain('jan@example.com')
    expect(serialized).not.toContain('submitterEmail')
    expect(serialized).not.toContain('secret provider detail')
  })

  it('defaults sender name to HEAD Zive Sklo when BREVO_FROM_NAME is unset', async () => {
    sendTransacEmail.mockResolvedValue({})

    await sendContactMail({ ...baseSubmission, email: 'info@example.com' })

    expect(sendTransacEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: expect.objectContaining({ name: 'Zive Sklo' }),
      }),
    )
  })
})
