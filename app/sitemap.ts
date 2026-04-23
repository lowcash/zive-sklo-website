import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site-config'

import { getCanonicalSiteUrl, isProductionLikeEnvironment } from './seo-env'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionLikeEnvironment()) {
    return []
  }

  const siteUrl = getCanonicalSiteUrl(SITE_URL)

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1,
    },
  ]
}
