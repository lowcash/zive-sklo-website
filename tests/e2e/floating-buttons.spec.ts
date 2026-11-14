import { expect, test } from '@playwright/test'

/**
 * Floating button tests — ScrollToTop visibility, footer collision, safe-area.
 */

test.describe('ScrollToTop button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('is hidden on initial load (tabindex=-1)', async ({ page }) => {
    const btn = page.locator('button[aria-label="Posunout na začátek stránky"]')
    await expect(btn).toHaveAttribute('tabindex', '-1')
  })

  test('appears after scrolling past 320px', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))

    const btn = page.locator('button[aria-label="Posunout na začátek stránky"]')
    await expect.poll(async () => btn.getAttribute('tabindex'), { timeout: 3000 }).toBe('0')
  })

  test('hides again after scrolling back above 220px', async ({ page }) => {
    const btn = page.locator('button[aria-label="Posunout na začátek stránky"]')
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
    await page.mouse.wheel(0, 1)
    await expect.poll(async () => btn.getAttribute('tabindex'), { timeout: 5000 }).toBe('0')

    await page.evaluate(() => window.scrollTo({ top: 50, behavior: 'instant' }))
    await page.mouse.wheel(0, -1)
    await expect.poll(async () => btn.getAttribute('tabindex'), { timeout: 5000 }).toBe('-1')
  })

  test('scrolls back to top when clicked', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }))
    const btn = page.locator('button[aria-label="Posunout na začátek stránky"]')
    await expect.poll(async () => btn.getAttribute('tabindex'), { timeout: 3000 }).toBe('0')
    await btn.click()
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 }).toBeLessThan(100)
  })

  test('is not keyboard-focusable when hidden', async ({ page }) => {
    const btn = page.locator('button[aria-label="Posunout na začátek stránky"]')
    await expect(btn).toHaveAttribute('tabindex', '-1')
    await expect(btn).toHaveAttribute('aria-hidden', 'true')
  })
})
