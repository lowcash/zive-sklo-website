export const COOKIE_CONSENT_STORAGE_KEY = 'zive-sklo-cookie-consent'
export const COOKIE_SETTINGS_OPEN_EVENT = 'zive-sklo:cookie-settings-open'
export const COOKIE_CONSENT_RENEW_AFTER_DAYS = 180

const COOKIE_CONSENT_RENEW_AFTER_MS = COOKIE_CONSENT_RENEW_AFTER_DAYS * 24 * 60 * 60 * 1000

export const COOKIE_CONSENT_STATUS = {
  accepted: 'accepted',
  declined: 'declined',
} as const

export type CookieConsentStatus = (typeof COOKIE_CONSENT_STATUS)[keyof typeof COOKIE_CONSENT_STATUS]

export type CookieConsentRecord = {
  status: CookieConsentStatus
  updatedAt: number
}

export function isCookieConsentStatus(value: string | null): value is CookieConsentStatus {
  return value === COOKIE_CONSENT_STATUS.accepted || value === COOKIE_CONSENT_STATUS.declined
}

export function parseCookieConsentRecord(value: string | null): CookieConsentRecord | null {
  if (!value) {
    return null
  }

  if (isCookieConsentStatus(value)) {
    return {
      status: value,
      updatedAt: 0,
    }
  }

  try {
    const parsedValue = JSON.parse(value) as Partial<CookieConsentRecord>
    const statusCandidate = parsedValue.status
    const updatedAt = parsedValue.updatedAt

    if (!isCookieConsentStatus(statusCandidate ?? null)) {
      return null
    }

    if (typeof updatedAt !== 'number' || !Number.isFinite(updatedAt)) {
      return null
    }

    const status = statusCandidate as CookieConsentStatus

    return {
      status,
      updatedAt,
    }
  } catch {
    return null
  }
}

export function isCookieConsentExpired(record: CookieConsentRecord, now = Date.now()) {
  return record.updatedAt <= 0 || now - record.updatedAt > COOKIE_CONSENT_RENEW_AFTER_MS
}

export function serializeCookieConsentRecord(status: CookieConsentStatus, updatedAt = Date.now()) {
  return JSON.stringify({
    status,
    updatedAt,
  } satisfies CookieConsentRecord)
}
