'use client'

import { useEffect, useState } from 'react'

import { syncAnalyticsWithConsent } from '@/lib/analytics/ga'
import { COOKIE_NOTICE } from '@/lib/content'
import {
  COOKIE_CONSENT_STATUS,
  COOKIE_SETTINGS_OPEN_EVENT,
  type CookieConsentStatus,
  readCookieConsent,
  writeCookieConsent,
} from '@/lib/cookie-consent'
import { applyCzechNbsp } from '@/lib/typography'

import { PolicyLink } from './PolicyLink'

type CookieConsentManagerProps = {
  gaTrackingId?: string
  showBannerPreview?: boolean
}

type ConsentState = CookieConsentStatus | 'unknown'

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

    syncAnalyticsWithConsent(gaTrackingId, consentState)
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
                      Náhled v lokálním vývoji: bez nastaveného NEXT_PUBLIC_GA_TRACKING_ID se po kliknutí žádná
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

function readStoredConsent(): ConsentState {
  return readCookieConsent(document.cookie) ?? 'unknown'
}
