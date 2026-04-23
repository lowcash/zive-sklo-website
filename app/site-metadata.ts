import type { Metadata, MetadataRoute, Viewport } from 'next'

import type { LocalBusiness, Offer, WithContext } from 'schema-dts'

import { OFFER } from '@/lib/content'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  DESCRIPTION,
  KEYWORDS,
  OPEN_GRAPH_IMAGE_ALT,
  OPEN_GRAPH_IMAGE_PATH,
  OPEN_GRAPH_IMAGE_SIZE,
  SITE_AREA_SERVED,
  SITE_CATEGORY,
  SITE_COUNTRY_CODE,
  SITE_KNOWS_ABOUT,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_LOCALITY,
  SITE_MANIFEST_PATH,
  SITE_NAME,
  SITE_OFFER_CATALOG_NAME,
  SITE_PRICE_RANGE,
  SITE_SHORT_NAME,
  SITE_SOCIAL_URLS,
  SITE_THEME_COLOR,
  SITE_URL,
  SITE_WEB_APP_DESCRIPTION,
  SITE_WEB_APP_NAME,
  TITLE,
} from '@/lib/site-config'

export { OPEN_GRAPH_IMAGE_PATH, OPEN_GRAPH_IMAGE_SIZE }

const SERVICE_CATALOG_ITEMS: Offer[] = [...OFFER.primary, ...OFFER.secondary].map((service) => ({
  '@type': 'Offer',
  itemOffered: {
    '@type': 'Service',
    name: service.title,
    description: service.description,
  },
}))

export const ROOT_TWITTER = {
  card: 'summary_large_image',
  title: TITLE,
  description: DESCRIPTION,
  images: [OPEN_GRAPH_IMAGE_PATH],
} satisfies NonNullable<Metadata['twitter']>

export const ROOT_APPLE_WEB_APP = {
  title: SITE_SHORT_NAME,
  capable: true,
  statusBarStyle: 'default',
} satisfies NonNullable<Metadata['appleWebApp']>

export const ROOT_VIEWPORT: Viewport = {
  themeColor: SITE_THEME_COLOR,
  viewportFit: 'cover',
}

export const ROOT_OPEN_GRAPH = {
  type: 'website',
  locale: SITE_LOCALE,
  url: SITE_URL,
  title: TITLE,
  description: DESCRIPTION,
  siteName: SITE_NAME,
  images: [
    {
      url: OPEN_GRAPH_IMAGE_PATH,
      width: OPEN_GRAPH_IMAGE_SIZE.width,
      height: OPEN_GRAPH_IMAGE_SIZE.height,
      alt: OPEN_GRAPH_IMAGE_ALT,
    },
  ],
} satisfies NonNullable<Metadata['openGraph']>

export const ROOT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
} satisfies NonNullable<Metadata['robots']>

export const ROOT_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  category: SITE_CATEGORY,
  keywords: [...KEYWORDS],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  manifest: SITE_MANIFEST_PATH,
  alternates: {
    canonical: '/',
  },
  openGraph: ROOT_OPEN_GRAPH,
  robots: ROOT_ROBOTS,
  twitter: ROOT_TWITTER,
  appleWebApp: ROOT_APPLE_WEB_APP,
}

export const LOCAL_BUSINESS_JSON_LD: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: CONTACT_PHONE_E164,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE_LOCALITY,
    addressCountry: SITE_COUNTRY_CODE,
  },
  areaServed: SITE_AREA_SERVED,
  priceRange: SITE_PRICE_RANGE,
  sameAs: SITE_SOCIAL_URLS,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: SITE_OFFER_CATALOG_NAME,
    itemListElement: SERVICE_CATALOG_ITEMS,
  },
  knowsAbout: SITE_KNOWS_ABOUT,
}

export const MANIFEST_METADATA: MetadataRoute.Manifest = {
  name: SITE_WEB_APP_NAME,
  short_name: SITE_SHORT_NAME,
  description: SITE_WEB_APP_DESCRIPTION,
  start_url: '/',
  display: 'standalone',
  background_color: SITE_THEME_COLOR,
  theme_color: SITE_THEME_COLOR,
  lang: SITE_LANGUAGE,
  icons: [
    {
      src: '/icon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any',
    },
  ],
}
