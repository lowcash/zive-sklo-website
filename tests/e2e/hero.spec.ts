import { expect, test } from '@playwright/test'

/**
 * Hero section tests — iOS dvh height, badge layout, CTA accessibility.
 * Run against a live dev server: npm run dev
 */

test.describe('Hero section — desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hero section is full viewport height', async ({ page }) => {
    const hero = page.locator('#top')
    const box = await hero.boundingBox()
    // Should be at least viewport height (dvh fallback to vh)
    expect(box?.height).toBeGreaterThanOrEqual(780)
  })

  test('badges fit in a single row on desktop', async ({ page }) => {
    // Locate all badge elements (spans inside the badges container)
    // Simpler: check that no badge wraps to a second line by comparing top offset
    const badgeEls = page
      .locator('section#top span')
      .filter({ hasText: /akce|škol|firem|svatebn/i })
    const count = await badgeEls.count()
    if (count < 2) return // no badges rendered, skip

    const boxes = await Promise.all(
      Array.from({ length: count }, (_, i) => badgeEls.nth(i).boundingBox())
    )
    const validBoxes = boxes.filter(Boolean) as {
      x: number
      y: number
      width: number
      height: number
    }[]
    // All badges should share the same top Y (single row)
    const firstY = validBoxes[0].y
    for (const b of validBoxes) {
      expect(Math.abs(b.y - firstY)).toBeLessThan(4) // 4px tolerance
    }
  })

  test('CTA link "Poptat akci" is visible and has valid href', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Poptat akci' }).first()
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
    const hero = page.locator('#top')
    const box = await hero.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(800)
  })

  test('CTA link is reachable on mobile', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Poptat akci' }).first()
    await expect(cta).toBeVisible()
  })
})
