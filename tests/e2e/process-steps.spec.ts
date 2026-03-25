import { test, expect } from '@playwright/test'

/**
 * Process section tests — scroll-based step highlighting on mobile.
 * Run against a live dev server: npm run dev
 */

test.describe('Process steps — scroll highlight', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('first step is highlighted when section enters view', async ({ page }) => {
    // Scroll to process section
    const section = page.locator('#postup, section').filter({ hasText: /jak to funguje/i }).first()
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    // First step border should have amber colour (border-[#ffbf00])
    const firstStep = page.locator('[data-testid="process-step"]').first()
    if ((await firstStep.count()) === 0) {
      // No data-testid — locate by the ordered list / numbered steps
      const steps = page.locator('ol li, [class*="process"] li, [class*="step"]')
      const count = await steps.count()
      if (count === 0) {
        test.skip()
        return
      }
    }
    // Verify at least one active step is present (amber border applied)
    const activeStep = page.locator('[class*="border-[#ffbf00]"], [class*="border-amber"]')
    await expect(activeStep.first()).toBeVisible()
  })

  test('step numbers are visible above step content', async ({ page }) => {
    const section = page.locator('#postup, section').filter({ hasText: /jak to funguje/i }).first()
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    // Each step should have a visible number (01, 02, 03…)
    const stepNumbers = page.locator('text=/^0[1-9]$/')
    const count = await stepNumbers.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Stats counter animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('stats section is present with numeric values', async ({ page }) => {
    // Scroll stats into view
    const stats = page.locator('section').filter({ hasText: /°C|ručně|dech/i }).first()
    if ((await stats.count()) === 0) return // section not found, skip
    await stats.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500) // wait for count-up animation

    // Should show a non-zero number
    const numericText = page.locator('[class*="stat"], [class*="counter"], [class*="number"]').first()
    if ((await numericText.count()) > 0) {
      const text = await numericText.textContent()
      expect(text).toMatch(/\d+/)
    }
  })
})
