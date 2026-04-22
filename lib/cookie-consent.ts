export const COOKIE_CONSENT_COOKIE_NAME = 'zive-sklo-cookie-consent'
export const COOKIE_SETTINGS_OPEN_EVENT = 'zive-sklo:cookie-settings-open'
export const COOKIE_CONSENT_RENEW_AFTER_DAYS = 180
export const LEGACY_COOKIE_CONSENT_STORAGE_KEY = COOKIE_CONSENT_COOKIE_NAME

const COOKIE_CONSENT_MAX_AGE_SECONDS = COOKIE_CONSENT_RENEW_AFTER_DAYS * 24 * 60 * 60
const COOKIE_CONSENT_RENEW_AFTER_MS = COOKIE_CONSENT_MAX_AGE_SECONDS * 1000

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

function readCookieValue(cookieHeader: string, name: string) {
  const cookies = cookieHeader.split(';')

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim()

    if (!trimmedCookie.startsWith(`${name}=`)) {
      continue
    }

    return decodeURIComponent(trimmedCookie.slice(name.length + 1))
  }

  return null
}

export function readCookieConsent(cookieHeader: string) {
  const value = readCookieValue(cookieHeader, COOKIE_CONSENT_COOKIE_NAME)
  return isCookieConsentStatus(value) ? value : null
}

export function writeCookieConsent(status: CookieConsentStatus) {
  const attributes = [
    `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(status)}`,
    `Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
  ]

  if (window.location.protocol === 'https:') {
    attributes.push('Secure')
  }

  document.cookie = attributes.join('; ')
}

function parseCookieConsentRecord(value: string | null): CookieConsentRecord | null {
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

function isCookieConsentExpired(record: CookieConsentRecord, now = Date.now()) {
  return record.updatedAt <= 0 || now - record.updatedAt > COOKIE_CONSENT_RENEW_AFTER_MS
}

export function readLegacyCookieConsentFromStorage() {
  const storedRecord = parseCookieConsentRecord(window.localStorage.getItem(LEGACY_COOKIE_CONSENT_STORAGE_KEY))

  if (!storedRecord) {
    return null
  }

  window.localStorage.removeItem(LEGACY_COOKIE_CONSENT_STORAGE_KEY)

  if (isCookieConsentExpired(storedRecord)) {
    return null
  }

  return storedRecord.status
}
