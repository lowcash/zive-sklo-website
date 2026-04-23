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
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        />
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
