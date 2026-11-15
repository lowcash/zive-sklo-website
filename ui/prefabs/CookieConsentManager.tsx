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
          <div className='mx-auto max-w-360 px-(--gutter)'>
            <div
              role='dialog'
              aria-labelledby='cookie-consent-title'
              aria-describedby='cookie-consent-description'
              className='border-line-strong bg-panel pointer-events-auto mx-auto max-w-5xl border shadow-[0_-16px_40px_rgba(0,0,0,0.32)]'
            >
              <div className='grid gap-6 p-5 md:grid-cols-[1.8fr_auto] md:items-end md:p-6'>
                <div className='space-y-3'>
                  <p className='eyebrow'>{applyCzechNbsp(COOKIE_NOTICE.banner.eyebrow)}</p>
                  <div className='space-y-2'>
                    <h2 id='cookie-consent-title' className='text-step-3'>
                      {applyCzechNbsp(COOKIE_NOTICE.banner.title)}
                    </h2>
                    <p
                      id='cookie-consent-description'
                      className='text-fg-2 max-w-3xl text-sm leading-relaxed md:text-[0.95rem]'
                    >
                      {applyCzechNbsp(COOKIE_NOTICE.banner.description)}
                    </p>
                  </div>
                  <p className='text-fg-3 text-step--1 leading-relaxed'>
                    <PolicyLink
                      href='/cookies'
                      className='ui-surface-hover border-line-strong text-amber-hi hover:border-amber-hi border-b'
                    >
                      {applyCzechNbsp(COOKIE_NOTICE.banner.detailsLabel)}
                    </PolicyLink>
                  </p>
                  {isPreviewWithoutAnalytics ? (
                    <p className='text-amber text-step--1 leading-relaxed'>
                      Náhled v lokálním vývoji: bez nastaveného NEXT_PUBLIC_GA_TRACKING_ID se po kliknutí žádná
                      analytika nenačte.
                    </p>
                  ) : null}
                </div>

                <div className='flex flex-col gap-3 sm:flex-row md:flex-col'>
                  <button
                    type='button'
                    onClick={() => updateConsent(COOKIE_CONSENT_STATUS.accepted)}
                    className='ui-cta-primary inline-flex min-w-56 items-center justify-center px-5 py-3 text-sm font-bold'
                  >
                    {applyCzechNbsp(COOKIE_NOTICE.banner.acceptLabel)}
                  </button>
                  <button
                    type='button'
                    onClick={() => updateConsent(COOKIE_CONSENT_STATUS.declined)}
                    className='ui-cta-ghost inline-flex min-h-12 min-w-56 items-center justify-center px-5 py-3 text-sm font-bold'
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
