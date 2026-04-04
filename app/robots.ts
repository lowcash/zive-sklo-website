import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/content'

import { getProductionSiteUrl, isProductionLikeEnvironment } from './seo-env'

export default function robots(): MetadataRoute.Robots {
  const isProductionLike = isProductionLikeEnvironment()
  const siteUrl = getProductionSiteUrl(SITE_URL)

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
