import { Instrument_Sans, Newsreader } from 'next/font/google'

import { CookieConsentManager } from '@/ui/prefabs'

import { LOCAL_BUSINESS_JSON_LD, ROOT_METADATA, ROOT_VIEWPORT } from '@/app/site-metadata'

import './globals.css'

const display = Newsreader({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
})

const body = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport = ROOT_VIEWPORT

export const metadata = ROOT_METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID
  const showCookieBannerPreview = process.env.NODE_ENV !== 'production'

  return (
    <html lang='cs' data-scroll-behavior='smooth' className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
      </head>
      <body className='antialiased'>
        {/* Skip to main content – accessible keyboard entry point */}
        <a
          href='#top'
          className='focus:bg-ember focus:text-on-ember sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:text-sm focus:font-bold'
        >
          Přeskočit na hlavní obsah
        </a>
        {children}
        <CookieConsentManager gaTrackingId={gaTrackingId} showBannerPreview={showCookieBannerPreview} />
      </body>
    </html>
  )
}
