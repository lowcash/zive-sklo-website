import { BrevoClient } from '@getbrevo/brevo'

import type { ContactSubmission } from '@/lib/schemas/contact'

type MissingEnvKey = 'BREVO_API_KEY' | 'BREVO_FROM_EMAIL' | 'CONTACT_TO'

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
  const apiKey = process.env.BREVO_API_KEY
  const fromEmail = process.env.BREVO_FROM_EMAIL
  const fromName = process.env.BREVO_FROM_NAME || 'Zive Sklo'
  const to = process.env.CONTACT_TO

  const missingEnv: MissingEnvKey[] = []

  if (!apiKey) {
    missingEnv.push('BREVO_API_KEY')
  }

  if (!fromEmail) {
    missingEnv.push('BREVO_FROM_EMAIL')
  }

  if (!to) {
    missingEnv.push('CONTACT_TO')
  }

  if (!apiKey || !fromEmail || !to) {
    return {
      ok: false,
      reason: 'missing-env',
      details: {
        missingEnv,
      },
    }
  }

  const client = new BrevoClient({
    apiKey,
  })

  try {
    await client.transactionalEmails.sendTransacEmail({
      sender: {
        email: fromEmail,
        name: fromName,
      },
      to: [{ email: to }],
      replyTo: {
        email: data.email,
        name: data.name,
      },
      subject: `Poptavka: ${data.eventType} (${data.name})`,
      textContent: formatMessageBody(data),
      htmlContent: formatHtmlBody(data),
    })

    return { ok: true }
  } catch (error) {
    const maybeError = error as {
      name?: string
      message?: string
      code?: number
      statusCode?: number
      response?: {
        statusCode?: number
      }
    }

    const providerStatusCode = maybeError.statusCode ?? maybeError.response?.statusCode ?? maybeError.code

    return {
      ok: false,
      reason: 'transport-error',
      details: {
        providerError: {
          name: maybeError.name,
          message: maybeError.message,
          statusCode: providerStatusCode,
        },
      },
    }
  }
}
