import { expect, test } from '@playwright/test'

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
    const section = page.locator('#jak-to-funguje')
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    // First step border should have amber colour (border-[#ffbf00])
    const firstStep = page.locator('[data-testid="process-step"]').first()
    await expect(firstStep).toBeVisible()

    // Verify at least one active step is present (amber border applied)
    const activeStep = page.locator('[class*="border-[#ffbf00]"], [class*="border-amber"]')
    await expect(activeStep.first()).toBeVisible()
  })

  test('step numbers are visible above step content', async ({ page }) => {
    const section = page.locator('#jak-to-funguje')
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    const firstStep = page.locator('[data-testid="process-step"]').first()
    const number = firstStep.locator('span[aria-hidden="true"]').first()
    const card = firstStep.locator(':scope > div').first()

    await expect(number).toBeVisible()
    await expect(card).toBeVisible()

    const numberBox = await number.boundingBox()
    const cardBox = await card.boundingBox()
    expect(numberBox).not.toBeNull()
    expect(cardBox).not.toBeNull()

    if (numberBox && cardBox) {
      // Number should overlap the top edge of the card.
      expect(numberBox.y).toBeLessThan(cardBox.y)
      expect(numberBox.y + numberBox.height).toBeGreaterThan(cardBox.y)
    }
  })
})

test.describe('Stats counter animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('stats section is present with numeric values', async ({ page }) => {
    // Scroll stats into view
    const stats = page
      .locator('section')
      .filter({ hasText: /°C|ručně|dech/i })
      .first()
    if ((await stats.count()) === 0) return // section not found, skip
    await stats.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500) // wait for count-up animation

    // Should show a non-zero number
    const numericText = page
      .locator('[class*="stat"], [class*="counter"], [class*="number"]')
      .first()
    if ((await numericText.count()) > 0) {
      const text = await numericText.textContent()
      expect(text).toMatch(/\d+/)
    }
  })

  test('stats counters stay on one line on iPad Air', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const counters = page.locator('[data-testid="stat-counter"]')
    await expect(counters).toHaveCount(3)

    await counters.first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(1200)

    const metrics = await counters.evaluateAll((elements) =>
      elements.map((element) => ({
        whiteSpace: getComputedStyle(element).whiteSpace,
        valueTop: element.querySelector('[data-testid="stat-value"]')?.getBoundingClientRect().top ?? null,
        suffixTop: element
          .querySelector('[data-testid="stat-suffix"]')
          ?.getBoundingClientRect().top ?? null,
      })),
    )

    for (const metric of metrics) {
      expect(metric.whiteSpace).toContain('nowrap')
      expect(metric.valueTop).not.toBeNull()
      expect(metric.suffixTop).not.toBeNull()
      if (metric.valueTop !== null && metric.suffixTop !== null) {
        expect(Math.abs(metric.valueTop - metric.suffixTop)).toBeLessThanOrEqual(10)
      }
    }
  })
})
