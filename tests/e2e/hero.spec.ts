import { expect, test } from '@playwright/test'

/**
 * Hero section tests — iOS dvh height, badge layout, CTA accessibility.
 */

test.describe('Hero section — desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hero section is full viewport height', async ({ page }) => {
    const hero = page.locator('header').first()
    const box = await hero.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(780)
  })

  test('badges fit in a single row on desktop', async ({ page }) => {
    const badgeEls = page.locator('header span').filter({ hasText: /výroba|škol|firem|městské/i })
    const count = await badgeEls.count()
    expect(count).toBeGreaterThanOrEqual(2)

    const boxes = await Promise.all(Array.from({ length: count }, (_, i) => badgeEls.nth(i).boundingBox()))
    const validBoxes = boxes.filter(Boolean) as {
      x: number
      y: number
      width: number
      height: number
    }[]
    const firstY = validBoxes[0].y
    for (const b of validBoxes) {
      expect(Math.abs(b.y - firstY)).toBeLessThan(4)
    }
  })

  test('CTA link "Nezávazně poptat akci" is visible and has valid href', async ({ page }) => {
    const cta = page.getByRole('link', { name: /nezávazně poptat akci/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#kontakt')
  })
})

test.describe('Hero section — mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hero section covers full mobile viewport', async ({ page }) => {
    const hero = page.locator('header').first()
    const box = await hero.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(800)
  })

  test('CTA link is reachable on mobile', async ({ page }) => {
    const cta = page.getByRole('link', { name: /nezávazně poptat akci/i }).first()
    await expect(cta).toBeVisible()
  })
})
