import { test, expect } from '@playwright/test'

/**
 * Floating button tests — ScrollToTop visibility, footer collision, safe-area.
 * Run against a live dev server: npm run dev
 */

test.describe('ScrollToTop button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('is hidden on initial load (tabindex=-1)', async ({ page }) => {
    const btn = page.getByRole('button', { name: /zpět nahoru/i })
    await expect(btn).toHaveAttribute('tabindex', '-1')
  })

  test('appears after scrolling past 320px', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
    await page.waitForTimeout(400)

    const btn = page.getByRole('button', { name: /zpět nahoru/i })
    await expect(btn).toHaveAttribute('tabindex', '0')
  })

  test('hides again after scrolling back above 220px', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
    await page.waitForTimeout(400)

    await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }))
    await page.waitForTimeout(400)

    const btn = page.getByRole('button', { name: /zpět nahoru/i })
    await expect(btn).toHaveAttribute('tabindex', '-1')
  })

  test('scrolls back to top when clicked', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }))
    await page.waitForTimeout(400)

    const btn = page.getByRole('button', { name: /zpět nahoru/i })
    await expect(btn).toHaveAttribute('tabindex', '0')
    await btn.click()
    await page.waitForTimeout(800)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })

  test('is not keyboard-focusable when hidden', async ({ page }) => {
    // At top of page, button should be hidden — pressing Tab should not focus it
    const btn = page.getByRole('button', { name: /zpět nahoru/i })
    await expect(btn).toHaveAttribute('tabindex', '-1')

    // Inspect pointer-events via computed style workaround
    const pointerEvents = await btn.evaluate(
      (el) => getComputedStyle(el.closest('[style]') ?? el).pointerEvents
    )
    expect(pointerEvents).toBe('none')
  })
})
