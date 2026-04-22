'use client'

import { useEffect, useState } from 'react'

import { COOKIE_NOTICE } from '@/lib/content'
import {
  COOKIE_CONSENT_STATUS,
  COOKIE_SETTINGS_OPEN_EVENT,
  type CookieConsentStatus,
  readCookieConsent,
  readLegacyCookieConsentFromStorage,
  writeCookieConsent,
} from '@/lib/cookie-consent'
import { applyCzechNbsp } from '@/lib/utils'

import { PolicyLink } from './PolicyLink'

type CookieConsentManagerProps = {
  gaTrackingId?: string
  showBannerPreview?: boolean
}

type ConsentState = CookieConsentStatus | 'unknown'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

const GOOGLE_SCRIPT_ID = 'google-analytics-script'
const GOOGLE_INIT_SCRIPT_ID = 'google-analytics-init'
const GOOGLE_SCRIPT_SRC_MARKER = 'https://www.googletagmanager.com/gtag/js'

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

function readStoredConsent(): ConsentState {
  const cookieConsent = readCookieConsent(document.cookie)

  if (cookieConsent) {
    return cookieConsent
  }

  const legacyConsent = readLegacyCookieConsentFromStorage()

  if (legacyConsent) {
    writeCookieConsent(legacyConsent)
    return legacyConsent
  }

  return 'unknown'
}

function setGaDisabledFlag(trackingId: string, value: boolean) {
  window[`ga-disable-${trackingId}`] = value
}

function injectGoogleAnalytics(trackingId: string) {
  if (!document.getElementById(GOOGLE_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GOOGLE_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    document.head.appendChild(script)
  }

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

  if (!document.getElementById(GOOGLE_INIT_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GOOGLE_INIT_SCRIPT_ID
    script.text = [
      'window.dataLayer = window.dataLayer || [];',
      'window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};',
    ].join('\n')
    document.head.appendChild(script)
  }

  setGaDisabledFlag(trackingId, false)
  window.gtag('js', new Date())
  window.gtag('config', trackingId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
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

  document.getElementById(GOOGLE_SCRIPT_ID)?.remove()
  document.getElementById(GOOGLE_INIT_SCRIPT_ID)?.remove()
  document
    .querySelectorAll(`script[src*="${GOOGLE_SCRIPT_SRC_MARKER}"]`)
    .forEach((scriptElement) => scriptElement.remove())

  window.dataLayer = []
  delete window.gtag
  removeGoogleAnalyticsCookies()
}

export function CookieConsentManager({ gaTrackingId, showBannerPreview = false }: CookieConsentManagerProps) {
  const [consentState, setConsentState] = useState<ConsentState>('unknown')
  const [isHydrated, setIsHydrated] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const shouldExposeConsentUi = Boolean(gaTrackingId) || showBannerPreview
  const isPreviewWithoutAnalytics = showBannerPreview && !gaTrackingId

  useEffect(() => {
    setConsentState(readStoredConsent())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsSettingsOpen(true)
    }

    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleOpenSettings)

    return () => {
      window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleOpenSettings)
    }
  }, [])

  useEffect(() => {
    if (!gaTrackingId || !isHydrated) {
      return
    }

    if (consentState === COOKIE_CONSENT_STATUS.accepted) {
      injectGoogleAnalytics(gaTrackingId)
      return
    }

    disableGoogleAnalytics(gaTrackingId)
  }, [gaTrackingId, consentState, isHydrated])

  const shouldShowBanner = shouldExposeConsentUi && isHydrated && (consentState === 'unknown' || isSettingsOpen)

  const updateConsent = (nextState: CookieConsentStatus) => {
    writeCookieConsent(nextState)
    setConsentState(nextState)
    setIsSettingsOpen(false)
  }

  return (
    <>
      {shouldShowBanner ? (
        <div className='pb-safe pointer-events-none fixed inset-x-0 bottom-0 z-80 pb-4'>
          <div className='mx-auto max-w-360 px-6 md:px-20'>
            <div
              role='dialog'
              aria-labelledby='cookie-consent-title'
              aria-describedby='cookie-consent-description'
              className='pointer-events-auto mx-auto max-w-5xl border border-[#6c5a3899] bg-[#131313f2] shadow-[0_-16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md'
            >
              <div className='grid gap-6 p-5 md:grid-cols-[1.8fr_auto] md:items-end md:p-6'>
                <div className='space-y-3'>
                  <p className='font-label text-xs tracking-[0.22em] text-[#ffcf42cc] uppercase'>
                    {applyCzechNbsp(COOKIE_NOTICE.banner.eyebrow)}
                  </p>
                  <div className='space-y-2'>
                    <h2 id='cookie-consent-title' className='font-display text-2xl text-[#E5E2E1] md:text-[2rem]'>
                      {applyCzechNbsp(COOKIE_NOTICE.banner.title)}
                    </h2>
                    <p
                      id='cookie-consent-description'
                      className='max-w-3xl text-sm leading-relaxed text-[#E5E2E1CC] md:text-[0.95rem]'
                    >
                      {applyCzechNbsp(COOKIE_NOTICE.banner.description)}
                    </p>
                  </div>
                  <p className='text-xs leading-relaxed text-[#d4c5abb3]'>
                    <PolicyLink
                      href='/cookies'
                      className='ui-surface-hover border-b border-[#6c5a38] text-[#FFD79B] hover:border-[#FFD79B]'
                    >
                      {applyCzechNbsp(COOKIE_NOTICE.banner.detailsLabel)}
                    </PolicyLink>
                  </p>
                  {isPreviewWithoutAnalytics ? (
                    <p className='text-xs leading-relaxed text-[#ffcf42cc]'>
                      Náhled v lokálním vývoji: bez nastaveného `NEXT_PUBLIC_GA_TRACKING_ID` se po kliknutí žádná
                      analytika nenačte.
                    </p>
                  ) : null}
                </div>

                <div className='flex flex-col gap-3 sm:flex-row md:flex-col'>
                  <button
                    type='button'
                    onClick={() => updateConsent(COOKIE_CONSENT_STATUS.accepted)}
                    className='ui-cta-primary min-w-56 px-5 py-3 text-sm font-bold'
                  >
                    {applyCzechNbsp(COOKIE_NOTICE.banner.acceptLabel)}
                  </button>
                  <button
                    type='button'
                    onClick={() => updateConsent(COOKIE_CONSENT_STATUS.declined)}
                    className='ui-surface-hover min-w-56 border border-[#6c5a38] px-5 py-3 text-sm font-bold text-[#E5E2E1] hover:border-[#FFD79B] hover:text-[#FFD79B]'
                  >
                    {applyCzechNbsp(COOKIE_NOTICE.banner.declineLabel)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
