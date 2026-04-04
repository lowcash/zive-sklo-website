'use server'

import { headers } from 'next/headers'

import { sendContactMail } from '@/lib/mail/contact-mail'
import { validateContactSubmission } from '@/lib/schemas/contact'
import { checkContactRateLimit } from '@/lib/security/contact-rate-limit'

export type ContactActionState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors: Record<string, string>
}

function getSendFailureMessage(reason: 'missing-env' | 'transport-error') {
  if (reason === 'missing-env') {
    return 'Formulář je dočasně nedostupný. Kontaktujte nás prosím telefonicky.'
  }

  return 'Odeslání se nepodařilo. Kontaktujte nás prosím telefonicky.'
}

function logSendFailure(input: {
  reason: 'missing-env' | 'transport-error'
  details?: {
    missingEnv?: Array<'RESEND_API_KEY' | 'RESEND_FROM' | 'CONTACT_TO'>
    providerError?: {
      name?: string
      message?: string
      statusCode?: number
    }
  }
  requestId: string
}) {
  console.error('[contact-form] failed to send inquiry', {
    reason: input.reason,
    requestId: input.requestId,
    details: input.details,
    deploymentEnv: process.env.VERCEL_ENV ?? 'local',
    targetEnv: process.env.VERCEL_TARGET_ENV ?? null,
  })
}

function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value : ''
}

function hasPassedDwellTime(startedAtRaw: string) {
  const startedAt = Number(startedAtRaw)

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return false
  }

  return Date.now() - startedAt >= 2500
}

function getClientIdentifier(value: string, fallbackEmail: string) {
  const normalized = value.split(',')[0]?.trim()

  if (normalized) {
    return normalized
  }

  if (fallbackEmail) {
    return `email:${fallbackEmail.toLowerCase()}`
  }

  return 'unknown'
}

export async function submitContactAction(
  _previous: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const honeypot = toStringValue(formData.get('companyName'))

  if (honeypot.trim()) {
    return {
      status: 'success',
      message: 'Děkujeme, ozveme se vám co nejdříve.',
      fieldErrors: {},
    }
  }

  const startedAt = toStringValue(formData.get('startedAt'))

  if (!hasPassedDwellTime(startedAt)) {
    return {
      status: 'error',
      message: 'Odeslání bylo příliš rychlé. Zkuste to prosím znovu.',
      fieldErrors: {},
    }
  }

  const rawInput = {
    name: toStringValue(formData.get('name')),
    email: toStringValue(formData.get('email')),
    phone: toStringValue(formData.get('phone')),
    eventType: toStringValue(formData.get('eventType')),
    datePlace: toStringValue(formData.get('datePlace')),
    participants: toStringValue(formData.get('participants')),
    message: toStringValue(formData.get('message')),
    gdpr: formData.get('gdpr') === 'on',
  }

  const validation = validateContactSubmission(rawInput)

  if (!validation.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(validation.errors).filter(([, value]) => typeof value === 'string')
    ) as Record<string, string>

    return {
      status: 'error',
      message: 'Zkontrolujte prosím označená pole.',
      fieldErrors,
    }
  }

  const requestHeaders = await headers()
  const clientIp = requestHeaders.get('x-forwarded-for') ?? ''
  const requestId =
    requestHeaders.get('x-vercel-id') ??
    requestHeaders.get('x-request-id') ??
    requestHeaders.get('x-amzn-trace-id') ??
    'unknown'
  const identifier = getClientIdentifier(clientIp, validation.data.email)

  const rateLimit = checkContactRateLimit(identifier)

  if (!rateLimit.allowed) {
    return {
      status: 'error',
      message: `Příliš mnoho pokusů. Zkuste to znovu za ${rateLimit.retryAfterSeconds} s.`,
      fieldErrors: {},
    }
  }

  const sendResult = await sendContactMail(validation.data)

  if (!sendResult.ok) {
    logSendFailure({
      reason: sendResult.reason,
      details: sendResult.details,
      requestId,
    })

    return {
      status: 'error',
      message: getSendFailureMessage(sendResult.reason),
      fieldErrors: {},
    }
  }

  return {
    status: 'success',
    message: 'Děkujeme za poptávku. Ozveme se vám co nejdříve.',
    fieldErrors: {},
  }
}
