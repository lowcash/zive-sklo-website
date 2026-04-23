export const COOKIE_CONSENT_COOKIE_NAME = 'zive-sklo-cookie-consent'
export const COOKIE_SETTINGS_OPEN_EVENT = 'zive-sklo:cookie-settings-open'
export const COOKIE_CONSENT_RENEW_AFTER_DAYS = 180

const COOKIE_CONSENT_MAX_AGE_SECONDS = COOKIE_CONSENT_RENEW_AFTER_DAYS * 24 * 60 * 60

export const COOKIE_CONSENT_STATUS = {
  accepted: 'accepted',
  declined: 'declined',
} as const

export type CookieConsentStatus = (typeof COOKIE_CONSENT_STATUS)[keyof typeof COOKIE_CONSENT_STATUS]

export function readCookieConsent(cookieHeader: string) {
  const value = readCookieValue(cookieHeader, COOKIE_CONSENT_COOKIE_NAME)

  return isCookieConsentStatus(value) ? value : null
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

function isCookieConsentStatus(value: string | null): value is CookieConsentStatus {
  return value === COOKIE_CONSENT_STATUS.accepted || value === COOKIE_CONSENT_STATUS.declined
}

export function writeCookieConsent(status: CookieConsentStatus) {
  writeCookieValue(COOKIE_CONSENT_COOKIE_NAME, status, COOKIE_CONSENT_MAX_AGE_SECONDS)
}

function writeCookieValue(name: string, value: string, maxAgeSeconds: number) {
  const attributes = [`${name}=${encodeURIComponent(value)}`, `Max-Age=${maxAgeSeconds}`, 'Path=/', 'SameSite=Lax']

  if (window.location.protocol === 'https:') {
    attributes.push('Secure')
  }

  document.cookie = attributes.join('; ')
}
