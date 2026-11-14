import { expect, test } from '@playwright/test'

/**
 * Process section tests — scroll-based step highlighting on mobile.
 */

test.describe('Process steps — scroll highlight', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('first step is highlighted when section enters view', async ({ page }) => {
    const firstStep = page.locator('[data-testid="process-step"]').first()
    await expect(firstStep).toBeVisible()

    await page.evaluate(() => {
      const step = document.querySelector('[data-testid="process-step"]')
      if (!step) return
      const top = step.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45
      window.scrollTo({ top, behavior: 'instant' })
    })

    await expect.poll(async () => firstStep.getAttribute('data-active'), { timeout: 5000 }).toBe('true')
  })


  test('step numbers are visible above step content', async ({ page }) => {
    const section = page.locator('#jak-to-funguje')
    await section.scrollIntoViewIfNeeded()

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
    const counters = page.locator('[data-testid="stat-counter"]')
    await expect(counters).toHaveCount(3)
    await counters.first().scrollIntoViewIfNeeded()

    await expect
      .poll(async () => counters.first().locator('[data-testid="stat-value"]').textContent(), { timeout: 3000 })
      .toMatch(/\d+/)
  })

  test('stats counters stay on one line on iPad Air', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 })
    await page.goto('/')
    await page.waitForLoadState('load')

    const counters = page.locator('[data-testid="stat-counter"]')
    await expect(counters).toHaveCount(3)

    await counters.first().scrollIntoViewIfNeeded()
    await expect
      .poll(
        async () => {
          const text = await counters.first().locator('[data-testid="stat-value"]').textContent()
          return text && /\d/.test(text) ? 'ready' : 'waiting'
        },
        { timeout: 3000 },
      )
      .toBe('ready')

    const metrics = await counters.evaluateAll((elements) =>
      elements.map((element) => ({
        whiteSpace: getComputedStyle(element).whiteSpace,
        valueTop: element.querySelector('[data-testid="stat-value"]')?.getBoundingClientRect().top ?? null,
        suffixTop: element.querySelector('[data-testid="stat-suffix"]')?.getBoundingClientRect().top ?? null,
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
