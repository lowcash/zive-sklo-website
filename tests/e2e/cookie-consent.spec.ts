import { expect, test } from '@playwright/test'

const TEST_GA_TRACKING_ID = 'G-TEST123456'
const COOKIE_CONSENT_COOKIE_NAME = 'zive-sklo-cookie-consent'

async function getStoredConsent(page: import('@playwright/test').Page) {
  return page.evaluate((cookieName) => {
    const cookie = document.cookie
      .split(';')
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith(`${cookieName}=`))

    return cookie ? decodeURIComponent(cookie.slice(cookieName.length + 1)) : null
  }, COOKIE_CONSENT_COOKIE_NAME)
}

test.describe('Cookie consent', () => {
  test.use({
    storageState: {
      cookies: [],
      origins: [],
    },
  })

  test.beforeEach(async ({ page }) => {
    await page.route(`https://www.googletagmanager.com/gtag/js?id=${TEST_GA_TRACKING_ID}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: '',
      })
    })
  })

  test('keeps analytics unloaded until the visitor decides', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const consentDialog = page.getByRole('dialog', { name: /můžeme měřit návštěvnost webu/i })
    await expect(consentDialog).toBeVisible()

    await expect(page.locator(`#google-analytics-script`)).toHaveCount(0)

    const gaDisabled = await page.evaluate(
      (trackingId) => window[`ga-disable-${trackingId}` as keyof Window],
      TEST_GA_TRACKING_ID,
    )

    expect(gaDisabled).toBe(true)
    await expect.poll(async () => getStoredConsent(page)).toBe(null)
  })

  test('injects Google Analytics only after accept', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /povolit analytiku/i }).click()

    await expect(page.locator('#google-analytics-script')).toHaveCount(1)
    await expect(page.getByRole('dialog', { name: /můžeme měřit návštěvnost webu/i })).toHaveCount(0)

    const gaState = await page.evaluate((trackingId) => {
      const configEntry = Array.isArray(window.dataLayer)
        ? window.dataLayer.find((entry) => Array.isArray(entry) && entry[0] === 'config' && entry[1] === trackingId)
        : null

      return {
        disabled: window[`ga-disable-${trackingId}` as keyof Window],
        hasGtag: typeof window.gtag === 'function',
        configOptions:
          Array.isArray(configEntry) && typeof configEntry[2] === 'object' && configEntry[2] !== null
            ? configEntry[2]
            : null,
      }
    }, TEST_GA_TRACKING_ID)

    expect(gaState.disabled).toBe(false)
    expect(gaState.hasGtag).toBe(true)
    expect(gaState.configOptions).toMatchObject({
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })

    await expect.poll(async () => getStoredConsent(page)).toBe('accepted')
  })

  test('returns to the originating section from the cookies page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => {
      const contactSection = document.getElementById('kontakt')
      contactSection?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#kontakt')

    await page.getByRole('link', { name: /podrobnosti o cookies/i }).click()
    await expect(page).toHaveURL(/\/cookies\?returnTo=%2F%23kontakt/)

    await page.getByRole('link', { name: /zpět na web živé sklo/i }).click()

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#kontakt')
    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })

  test('returns to the originating section from the privacy page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /pokračovat bez analytiky/i }).click()

    await page.evaluate(() => {
      const contactSection = document.getElementById('kontakt')
      contactSection?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#kontakt')

    await page
      .locator('#kontakt')
      .getByRole('link', { name: /zásady ochrany osobních údajů/i })
      .click()
    await expect(page).toHaveURL(/\/ochrana-osobnich-udaju\?returnTo=%2F%23kontakt/)

    await page.getByRole('link', { name: /zpět na web živé sklo/i }).click()

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#kontakt')
    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })

  test('removes analytics again when consent is revoked from footer settings', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /povolit analytiku/i }).click()
    await expect(page.locator('#google-analytics-script')).toHaveCount(1)

    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
    await page.getByRole('button', { name: /nastavení cookies/i }).click()

    const consentDialog = page.getByRole('dialog', { name: /můžeme měřit návštěvnost webu/i })
    await expect(consentDialog).toBeVisible()

    await page.getByRole('button', { name: /pokračovat bez analytiky/i }).click()

    await expect(page.locator('#google-analytics-script')).toHaveCount(0)

    const gaState = await page.evaluate((trackingId) => {
      return {
        disabled: window[`ga-disable-${trackingId}` as keyof Window],
        hasGtag: typeof window.gtag === 'function',
      }
    }, TEST_GA_TRACKING_ID)

    expect(gaState.disabled).toBe(true)
    expect(gaState.hasGtag).toBe(false)

    await expect.poll(async () => getStoredConsent(page)).toBe('declined')
  })
})
