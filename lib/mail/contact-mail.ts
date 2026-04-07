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

const EVENT_TYPE_LABELS: Record<string, string> = {
  teambuilding: 'Teambuilding',
  school: 'Škola',
  'city-market': 'Město - trh',
  'creative-workshop': 'Kreativní dílna',
  other: 'Jiné',
}

function getEventTypeLabel(eventType: string) {
  return EVENT_TYPE_LABELS[eventType] ?? eventType
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
  const eventTypeLabel = getEventTypeLabel(data.eventType)

  return [
    'Nová poptávka z webu zivesklo.cz',
    '',
    `Jméno: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Typ akce: ${eventTypeLabel}`,
    `Datum a místo: ${data.datePlace}`,
    `Počet účastníků: ${data.participants}`,
    `GDPR souhlas: ${data.gdpr ? 'ano' : 'ne'}`,
    '',
    'Zpráva:',
    data.message || '(bez zpravy)',
  ].join('\n')
}

function formatHtmlBody(data: ContactSubmission) {
  const eventTypeLabel = getEventTypeLabel(data.eventType)

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f8;padding:24px;color:#121212;line-height:1.55;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e7e7;padding:24px;">
        <h2 style="margin:0 0 16px 0;font-size:22px;">Nová poptávka z webu zivesklo.cz</h2>
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          <tr><td style="width:180px;border-bottom:1px solid #efefef;"><strong>Jméno</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>E-mail</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.email)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Telefon</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Typ akce</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(eventTypeLabel)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Datum a místo</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.datePlace)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Počet účastníků</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.participants)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>GDPR souhlas</strong></td><td style="border-bottom:1px solid #efefef;">${data.gdpr ? 'ano' : 'ne'}</td></tr>
        </table>
        <h3 style="margin:20px 0 8px 0;font-size:18px;">Zpráva</h3>
        <p style="margin:0;white-space:pre-line;">${escapeHtml(data.message || '(bez zprávy)')}</p>
      </div>
    </div>
  `
}

function formatConfirmationTextBody(data: ContactSubmission) {
  const eventTypeLabel = getEventTypeLabel(data.eventType)

  return [
    `Dobrý den, ${data.name},`,
    '',
    'děkujeme za poptávku pro Živé Sklo.',
    'Vaši zprávu jsme přijali a ozveme se vám co nejdříve.',
    '',
    'Shrnutí poptávky:',
    `Typ akce: ${eventTypeLabel}`,
    `Datum a místo: ${data.datePlace}`,
    `Počet účastníků: ${data.participants}`,
    `Telefon: ${data.phone}`,
    '',
    'S pozdravem',
    'Živé Sklo',
  ].join('\n')
}

function formatConfirmationHtmlBody(data: ContactSubmission) {
  const eventTypeLabel = getEventTypeLabel(data.eventType)

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f8;padding:24px;color:#121212;line-height:1.55;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e7e7;padding:24px;">
        <h2 style="margin:0 0 16px 0;font-size:22px;">Děkujeme, poptávku jsme přijali</h2>
        <p style="margin:0 0 12px 0;">Dobrý den, ${escapeHtml(data.name)},</p>
        <p style="margin:0 0 16px 0;">děkujeme za poptávku pro Živé Sklo. Ozveme se vám co nejdříve.</p>
        <h3 style="margin:0 0 8px 0;font-size:18px;">Shrnutí poptávky</h3>
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          <tr><td style="width:180px;border-bottom:1px solid #efefef;"><strong>Typ akce</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(eventTypeLabel)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Datum a místo</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.datePlace)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Počet účastníků</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.participants)}</td></tr>
          <tr><td style="border-bottom:1px solid #efefef;"><strong>Telefon</strong></td><td style="border-bottom:1px solid #efefef;">${escapeHtml(data.phone)}</td></tr>
        </table>
        <p style="margin:16px 0 0 0;">S pozdravem<br/>Živé Sklo</p>
      </div>
    </div>
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
      subject: `Poptávka: ${getEventTypeLabel(data.eventType)} (${data.name})`,
      textContent: formatMessageBody(data),
      htmlContent: formatHtmlBody(data),
    })

    const normalizedContactTo = to.trim().toLowerCase()
    const normalizedSubmitterEmail = data.email.trim().toLowerCase()

    if (normalizedSubmitterEmail !== normalizedContactTo) {
      await client.transactionalEmails.sendTransacEmail({
        sender: {
          email: fromEmail,
          name: fromName,
        },
        to: [{ email: data.email, name: data.name }],
        replyTo: {
          email: to,
          name: fromName,
        },
        subject: 'Potvrzení přijetí poptávky - Živé Sklo',
        textContent: formatConfirmationTextBody(data),
        htmlContent: formatConfirmationHtmlBody(data),
      })
    }

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
