import { expect, test } from '@playwright/test'

test.describe('SEO outputs', () => {
  test('root page exposes canonical, social and JSON-LD metadata', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://akce.zivesklo.cz')
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest')
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /https:\/\/akce\.zivesklo\.cz\/opengraph-image(\?.+)?$/,
    )
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')

    const jsonLdContent = await page.locator('script[type="application/ld+json"]').first().textContent()
    const jsonLd = JSON.parse(jsonLdContent ?? '{}')

    expect(jsonLd['@type']).toBe('LocalBusiness')
    expect(jsonLd.url).toBe('https://akce.zivesklo.cz')
    expect(jsonLd.email).toBe('info@zivesklo.cz')
    expect(jsonLd.sameAs).toContain('https://www.instagram.com/zivesklo/')
    expect(jsonLd.hasOfferCatalog.itemListElement.length).toBeGreaterThanOrEqual(3)
  })

  test('legal information pages stay crawlable but not indexable', async ({ page }) => {
    await page.goto('/cookies')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex, follow/i)
  })

  test('serves robots.txt for production-like deployments', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.ok()).toBe(true)

    const body = await response.text()
    expect(body).toContain('User-Agent: *')
    expect(body).toContain('Allow: /')
    expect(body).toContain('Sitemap: https://akce.zivesklo.cz/sitemap.xml')
  })

  test('serves sitemap.xml with the canonical root URL', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.ok()).toBe(true)

    const body = await response.text()
    expect(body).toContain('<loc>https://akce.zivesklo.cz</loc>')
    expect(body).not.toContain('changefreq')
  })

  test('serves manifest, Seznam verification and generated og image routes', async ({ request }) => {
    const manifestResponse = await request.get('/manifest.webmanifest')
    expect(manifestResponse.ok()).toBe(true)
    expect(manifestResponse.headers()['content-type']).toContain('application/manifest+json')

    const manifest = await manifestResponse.json()
    expect(manifest.name).toBe('Živé Sklo - mobilní sklářská dílna')
    expect(manifest.theme_color).toBe('#131313')

    const seznamResponse = await request.get('/seznam-wmt-15ZnCzbW3y1tIpltBFGSyVB6I07YQ9GN.txt')
    expect(seznamResponse.ok()).toBe(true)
    expect(await seznamResponse.text()).toBe('15ZnCzbW3y1tIpltBFGSyVB6I07YQ9GN')

    const imageResponse = await request.get('/opengraph-image')
    expect(imageResponse.ok()).toBe(true)
    expect(imageResponse.headers()['content-type']).toContain('image/png')
    expect((await imageResponse.body()).byteLength).toBeGreaterThan(0)
  })
})
