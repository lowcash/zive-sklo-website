import { expect, test } from '@playwright/test'

/**
 * Hot Glass redesign: scroll-driven temperature, reduced-motion fallbacks,
 * LCP safety, click-to-play video, no horizontal overflow.
 */

const readHeat = (page: import('@playwright/test').Page) =>
  page.evaluate(() =>
    Number.parseFloat(getComputedStyle(document.querySelector('.sky') as Element).getPropertyValue('--heat')),
  )

test.describe('Temperature driver (motion allowed)', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('--heat follows the scroll position from 0 to 1', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect.poll(() => readHeat(page)).toBeLessThan(0.05)

    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
    await expect.poll(() => readHeat(page), { timeout: 3000 }).toBeGreaterThan(0.95)

    await page.evaluate(() =>
      window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) / 2, behavior: 'instant' }),
    )
    await expect.poll(() => readHeat(page), { timeout: 3000 }).toBeGreaterThan(0.35)
    expect(await readHeat(page)).toBeLessThan(0.65)
  })

  test('the h1 (LCP element) carries no animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    const animations = await page.evaluate(() => document.querySelector('h1')?.getAnimations().length ?? -1)
    expect(animations).toBe(0)
    const opacity = await page.locator('h1').evaluate((el) => getComputedStyle(el).opacity)
    expect(opacity).toBe('1')
  })
})

test.describe('Temperature driver (reduced motion)', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('no animation runs and the temperature changes as hard steps', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const skyAnimations = await page.evaluate(() => document.querySelector('.sky')?.getAnimations().length ?? -1)
    expect(skyAnimations).toBe(0)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')

    await expect.poll(() => readHeat(page)).toBe(0)

    await page.evaluate(() =>
      document.getElementById('nabidka')?.scrollIntoView({ behavior: 'instant', block: 'center' }),
    )
    await expect.poll(() => readHeat(page), { timeout: 3000 }).toBeCloseTo(0.5, 2)

    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
    await expect.poll(() => readHeat(page), { timeout: 3000 }).toBe(1)
  })

  test('scroll reveal never hides content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const hidden = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll('.reveal')).filter((el) => getComputedStyle(el).opacity !== '1').length,
    )
    expect(hidden).toBe(0)
  })
})

test.describe('Video: poster first, no autoplay', () => {
  test('no <video> in the DOM until play is pressed', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('video')).toHaveCount(0)

    const play = page.getByTestId('video-play')
    await play.scrollIntoViewIfNeeded()
    await play.click()

    const video = page.locator('video')
    await expect(video).toHaveCount(1)
    await expect(video).toHaveAttribute('controls', '')
    await expect(play).toHaveCount(0)
  })
})

test.describe('Layout safety', () => {
  for (const width of [390, 820, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }

  test('hero uses one static photo and the decorative orb, no carousel', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header img')).toHaveCount(1)
    await expect(page.locator('header .orb')).toHaveCount(1)
  })
})

test.describe('Mobile menu keyboard', () => {
  test('Escape closes the menu and returns focus to the toggle', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const toggle = page.locator('[data-testid="mobile-menu-toggle"]')
    await toggle.click()
    const overlay = page.locator('#mobile-nav-overlay')
    await expect(overlay).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(overlay).not.toBeVisible()
    await expect(toggle).toBeFocused()
  })
})
