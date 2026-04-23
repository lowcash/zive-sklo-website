export type SiteConfig = {
  readonly brand: {
    readonly name: string
    readonly tagline: string
  }
  readonly business: {
    readonly areaServed: string
    readonly countryCode: string
    readonly email: string
    readonly facebookUrl: `https://${string}`
    readonly instagramUrl: `https://${string}`
    readonly knowsAbout: readonly string[]
    readonly locality: string
    readonly offerCatalogName: string
    readonly phoneDisplay: string
    readonly phoneE164: `+${string}`
    readonly priceRange: '$' | '$$' | '$$$'
  }
  readonly category: string
  readonly description: string
  readonly keywords: readonly string[]
  readonly language: string
  readonly locale: string
  readonly manifestPath: `/${string}`
  readonly openGraphImagePath: `/${string}`
  readonly openGraphImageSize: {
    readonly width: number
    readonly height: number
  }
  readonly openGraphImage: {
    readonly alt: string
    readonly brandLabel: string
    readonly description: string
    readonly footerLocation: string
    readonly headline: string
  }
  readonly shortName: string
  readonly siteName: string
  readonly siteUrl: `https://${string}`
  readonly themeColor: `#${string}`
  readonly title: string
  readonly webAppDescription: string
  readonly webAppName: string
}

export const SITE_CONFIG = {
  siteUrl: 'https://akce.zivesklo.cz',
  siteName: 'Živé Sklo',
  shortName: 'Živé Sklo',
  title: 'Živé Sklo | Mobilní sklářská dílna pro akce, školy a firmy',
  description:
    'Mobilní sklářská dílna, která přijede až za vámi. Foukání skla naživo pro firemní akce, školy i městské slavnosti - hosté sledují práci skláře zblízka a odnášejí si vlastní skleněný výrobek.',
  keywords: [
    'živé sklo',
    'sklářská manufaktura',
    'foukání skla',
    'Vsetín',
    'mobilní sklářská dílna',
    'sklářská show',
    'firemní akce',
    'školní exkurze',
    'vánoční trhy',
    'teambuilding',
    'skleněné ozdoby',
    'sklář',
  ],
  brand: {
    name: 'ŽIVÉ SKLO',
    tagline: 'Vsetínská mobilní manufaktura foukaného skla.',
  },
  business: {
    email: 'info@zivesklo.cz',
    phoneDisplay: '+420 737 206 653',
    phoneE164: '+420737206653',
    locality: 'Vsetín',
    offerCatalogName: 'Sklářské programy Živého Skla',
    countryCode: 'CZ',
    areaServed: 'CZ',
    priceRange: '$$',
    instagramUrl: 'https://www.instagram.com/zivesklo/',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61585612643034',
    knowsAbout: [
      'Foukání skla',
      'Sklářské řemeslo',
      'Firemní eventy',
      'Teambuilding akce',
      'Školní programy',
      'Ručně vyráběné sklo',
      'Skleněné předměty',
      'Manufaktura',
    ],
  },
  category: 'arts',
  language: 'cs',
  locale: 'cs_CZ',
  themeColor: '#131313',
  manifestPath: '/manifest.webmanifest',
  openGraphImagePath: '/opengraph-image',
  openGraphImageSize: {
    width: 1200,
    height: 630,
  },
  openGraphImage: {
    alt: 'Živé Sklo - mobilní sklářská dílna pro akce, školy a firmy',
    brandLabel: 'ŽIVÉ SKLO',
    headline: 'Mobilní sklářská dílna',
    description: 'Oheň, sklo a zážitek pro firemní akce, školy i městské slavnosti.',
    footerLocation: 'VSETÍN',
  },
  webAppName: 'Živé Sklo - mobilní sklářská dílna',
  webAppDescription: 'Přivezeme živou sklářskou dílnu na firemní akce, školní programy i městské slavnosti.',
} as const satisfies SiteConfig

export const SITE_URL = SITE_CONFIG.siteUrl
export const SITE_NAME = SITE_CONFIG.siteName
export const SITE_SHORT_NAME = SITE_CONFIG.shortName
export const TITLE = SITE_CONFIG.title
export const DESCRIPTION = SITE_CONFIG.description
export const KEYWORDS = SITE_CONFIG.keywords
export const BRAND = SITE_CONFIG.brand
export const CONTACT_EMAIL = SITE_CONFIG.business.email
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}` as const
export const CONTACT_PHONE_DISPLAY = SITE_CONFIG.business.phoneDisplay
export const CONTACT_PHONE_E164 = SITE_CONFIG.business.phoneE164
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE_E164}` as const
export const SITE_LOCALITY = SITE_CONFIG.business.locality
export const SITE_OFFER_CATALOG_NAME = SITE_CONFIG.business.offerCatalogName
export const SITE_COUNTRY_CODE = SITE_CONFIG.business.countryCode
export const SITE_AREA_SERVED = SITE_CONFIG.business.areaServed
export const SITE_PRICE_RANGE = SITE_CONFIG.business.priceRange
export const INSTAGRAM_URL = SITE_CONFIG.business.instagramUrl
export const FACEBOOK_URL = SITE_CONFIG.business.facebookUrl
export const SITE_SOCIAL_URLS = [INSTAGRAM_URL, FACEBOOK_URL] as const
export const SITE_KNOWS_ABOUT = SITE_CONFIG.business.knowsAbout
export const SITE_CATEGORY = SITE_CONFIG.category
export const SITE_LANGUAGE = SITE_CONFIG.language
export const SITE_LOCALE = SITE_CONFIG.locale
export const SITE_THEME_COLOR = SITE_CONFIG.themeColor
export const SITE_MANIFEST_PATH = SITE_CONFIG.manifestPath
export const OPEN_GRAPH_IMAGE_PATH = SITE_CONFIG.openGraphImagePath
export const OPEN_GRAPH_IMAGE_SIZE = SITE_CONFIG.openGraphImageSize
export const OPEN_GRAPH_IMAGE_ALT = SITE_CONFIG.openGraphImage.alt
export const OPEN_GRAPH_IMAGE_BRAND_LABEL = SITE_CONFIG.openGraphImage.brandLabel
export const OPEN_GRAPH_IMAGE_HEADLINE = SITE_CONFIG.openGraphImage.headline
export const OPEN_GRAPH_IMAGE_DESCRIPTION = SITE_CONFIG.openGraphImage.description
export const OPEN_GRAPH_IMAGE_FOOTER_LOCATION = SITE_CONFIG.openGraphImage.footerLocation
export const SITE_WEB_APP_NAME = SITE_CONFIG.webAppName
export const SITE_WEB_APP_DESCRIPTION = SITE_CONFIG.webAppDescription
