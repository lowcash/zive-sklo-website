import { Manrope, Noto_Serif } from 'next/font/google'

import { CookieConsentManager } from '@/ui/prefabs'

import { LOCAL_BUSINESS_JSON_LD, ROOT_METADATA, ROOT_VIEWPORT } from '@/app/site-metadata'

import './globals.css'

const notoSerif = Noto_Serif({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700'],
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const MATERIAL_SYMBOLS_HREF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap'

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
    <html lang='cs' data-scroll-behavior='smooth' className={`scroll-smooth ${notoSerif.variable} ${manrope.variable}`}>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='preload' as='style' href={MATERIAL_SYMBOLS_HREF} />
        <link rel='stylesheet' href={MATERIAL_SYMBOLS_HREF} media='print' />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelectorAll('link[href="${MATERIAL_SYMBOLS_HREF}"][media="print"]').forEach(function(l){l.media='all'})`,
          }}
        />
        <noscript>
          <link rel='stylesheet' href={MATERIAL_SYMBOLS_HREF} />
        </noscript>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
      </head>
      <body className='antialiased'>
        {/* Skip to main content – accessible keyboard entry point */}
        <a
          href='#top'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-[#ffbf00] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#402d00]'
        >
          Přeskočit na hlavní obsah
        </a>
        {children}
        <CookieConsentManager gaTrackingId={gaTrackingId} showBannerPreview={showCookieBannerPreview} />
      </body>
    </html>
  )
}
