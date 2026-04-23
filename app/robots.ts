import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site-config'

import { getCanonicalSiteUrl, isProductionLikeEnvironment } from './seo-env'

export default function robots(): MetadataRoute.Robots {
  const isProductionLike = isProductionLikeEnvironment()
  const siteUrl = getCanonicalSiteUrl(SITE_URL)

  return {
    rules: isProductionLike
      ? {
          userAgent: '*',
          allow: '/',
        }
      : {
          userAgent: '*',
          disallow: '/',
        },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
