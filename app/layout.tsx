import type { Metadata, Viewport } from 'next'
import { Manrope, Noto_Serif } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

import { DESCRIPTION, KEYWORDS, SITE_URL, TITLE } from '@/lib/content'

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

export const viewport: Viewport = {
  themeColor: '#131313',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Živé Sklo',
  category: 'arts',
  keywords: KEYWORDS,
  authors: [{ name: 'Živé Sklo' }],
  creator: 'Živé Sklo',
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Živé Sklo',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Živé Sklo - Mobilní sklářská manufaktura z Vsetína',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Živé Sklo',
    description: DESCRIPTION,
    url: SITE_URL,
    telephone: '+420737206653',
    email: 'info@zivesklo.cz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vsetín',
      addressCountry: 'CZ',
    },
    areaServed: 'CZ',
    priceRange: '$$',
    sameAs: [
      'https://www.instagram.com/zivesklo/',
      'https://www.facebook.com/profile.php?id=61585612643034',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sklářské programy Živého Skla',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Živé divadlo řemesla' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Firemní event – Týmový rituál' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Školní program – Fyzika v plamenech' },
        },
      ],
    },
  }

  return (
    <html lang="cs" className={`scroll-smooth ${notoSerif.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to main content – accessible keyboard entry point */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-[#ffbf00] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#402d00]"
        >
          Přeskočit na hlavní obsah
        </a>
        {children}
        {gaTrackingId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}');
              `}
            </Script>
          </>
        ) : null}
        <Analytics />
      </body>
    </html>
  )
}
