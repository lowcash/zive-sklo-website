import { Resend } from 'resend'

import type { ContactSubmission } from '@/lib/schemas/contact'

type MissingEnvKey = 'RESEND_API_KEY' | 'RESEND_FROM' | 'CONTACT_TO'

type MailResult =
  | { ok: true }
  | {
      ok: false
      reason: 'missing-env' | 'transport-error'
      details?: {
        missingEnv?: MissingEnvKey[]
        providerError?: {
          name?: string
          message?: string
          statusCode?: number
        }
      }
    }

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatMessageBody(data: ContactSubmission) {
  return [
    'Nova poptavka z webu zivesklo.cz',
    '',
    `Jmeno: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Typ akce: ${data.eventType}`,
    `Datum a misto: ${data.datePlace}`,
    `Pocet ucastniku: ${data.participants}`,
    `GDPR souhlas: ${data.gdpr ? 'ano' : 'ne'}`,
    '',
    'Zprava:',
    data.message || '(bez zpravy)',
  ].join('\n')
}

function formatHtmlBody(data: ContactSubmission) {
  return `
    <h2>Nova poptavka z webu zivesklo.cz</h2>
    <table cellpadding="8" cellspacing="0" border="0">
      <tr><td><strong>Jmeno</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>E-mail</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Telefon</strong></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><strong>Typ akce</strong></td><td>${escapeHtml(data.eventType)}</td></tr>
      <tr><td><strong>Datum a misto</strong></td><td>${escapeHtml(data.datePlace)}</td></tr>
      <tr><td><strong>Pocet ucastniku</strong></td><td>${escapeHtml(data.participants)}</td></tr>
      <tr><td><strong>GDPR souhlas</strong></td><td>${data.gdpr ? 'ano' : 'ne'}</td></tr>
    </table>
    <h3>Zprava</h3>
    <p>${escapeHtml(data.message || '(bez zpravy)')}</p>
  `
}

export async function sendContactMail(data: ContactSubmission): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  const to = process.env.CONTACT_TO

  const missingEnv: MissingEnvKey[] = []

  if (!apiKey) {
    missingEnv.push('RESEND_API_KEY')
  }

  if (!from) {
    missingEnv.push('RESEND_FROM')
  }

  if (!to) {
    missingEnv.push('CONTACT_TO')
  }

  if (!apiKey || !from || !to) {
    return {
      ok: false,
      reason: 'missing-env',
      details: {
        missingEnv,
      },
    }
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Poptavka: ${data.eventType} (${data.name})`,
      text: formatMessageBody(data),
      html: formatHtmlBody(data),
    })

    if (error) {
      return {
        ok: false,
        reason: 'transport-error',
        details: {
          providerError: {
            name: error.name,
            message: error.message,
            statusCode:
              'statusCode' in error && typeof error.statusCode === 'number'
                ? error.statusCode
                : undefined,
          },
        },
      }
    }

    return { ok: true }
  } catch (error) {
    const maybeError = error as {
      name?: string
      message?: string
      statusCode?: number
    }

    return {
      ok: false,
      reason: 'transport-error',
      details: {
        providerError: {
          name: maybeError.name,
          message: maybeError.message,
          statusCode: maybeError.statusCode,
        },
      },
    }
  }
}
