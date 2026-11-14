import { COOKIE_CONSENT_STATUS, type CookieConsentStatus } from '@/lib/cookie-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

const GOOGLE_LOADER_SCRIPT_ID = 'google-analytics-script'
const GOOGLE_SCRIPT_SRC_MARKER = 'https://www.googletagmanager.com/gtag/js'

type ConsentState = CookieConsentStatus | 'unknown'

export function syncAnalyticsWithConsent(trackingId: string, consentState: ConsentState) {
  if (consentState === COOKIE_CONSENT_STATUS.accepted) {
    injectGoogleAnalytics(trackingId)
    return
  }

  disableGoogleAnalytics(trackingId)
}

function injectGoogleAnalytics(trackingId: string) {
  ensureGoogleAnalyticsLoaderScript(trackingId)

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

  setGaDisabledFlag(trackingId, false)
  window.gtag('js', new Date())
  window.gtag('config', trackingId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
}

function ensureGoogleAnalyticsLoaderScript(trackingId: string) {
  if (document.getElementById(GOOGLE_LOADER_SCRIPT_ID)) {
    return
  }

  const script = document.createElement('script')
  script.id = GOOGLE_LOADER_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  document.head.appendChild(script)
}

function setGaDisabledFlag(trackingId: string, value: boolean) {
  window[`ga-disable-${trackingId}`] = value
}

function disableGoogleAnalytics(trackingId: string) {
  setGaDisabledFlag(trackingId, true)

  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }

  removeGoogleAnalyticsScripts()
  window.dataLayer = []
  delete window.gtag
  removeGoogleAnalyticsCookies()
}

function removeGoogleAnalyticsScripts() {
  document.getElementById(GOOGLE_LOADER_SCRIPT_ID)?.remove()
  document
    .querySelectorAll(`script[src*="${GOOGLE_SCRIPT_SRC_MARKER}"]`)
    .forEach((scriptElement) => scriptElement.remove())
}

function removeGoogleAnalyticsCookies() {
  const gaCookieNames = document.cookie
    .split(';')
    .map((entry) => entry.trim().split('=')[0])
    .filter((name) => name.startsWith('_ga') || name === '_gid' || name === '_gat')

  for (const name of gaCookieNames) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
  }
}
