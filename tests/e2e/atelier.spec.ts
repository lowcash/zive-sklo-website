import { expect, test } from '@playwright/test'

/**
 * Atelier redesign: no decorative layers, reduced-motion safety,
 * LCP safety, click-to-play video, no horizontal overflow.
 */

test.describe('Restrained surface (no decorative layers)', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('no sky, thermometer or orb nodes exist', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.sky, .therm, .orb')).toHaveCount(0)
  })

  test('the h1 (LCP element) carries no animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    const animations = await page.evaluate(() => document.querySelector('h1')?.getAnimations().length ?? -1)
    expect(animations).toBe(0)
    const opacity = await page.locator('h1').evaluate((el) => getComputedStyle(el).opacity)
    expect(opacity).toBe('1')
  })

  test('reduced motion: no running animations and scroll reveal never hides content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
    const state = await page.evaluate(() => ({
      running: document.getAnimations().filter((a) => a.playState === 'running').length,
      hidden: Array.from(document.querySelectorAll('.reveal')).filter((el) => getComputedStyle(el).opacity !== '1')
        .length,
    }))
    expect(state.hidden).toBe(0)
    expect(state.running).toBe(0)
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
    await expect(page.getByRole('button', { name: /pozastavit video|přehrát video/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /ztlumit|zapnout zvuk/i })).toBeVisible()
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

  test('hero uses one static photo, no carousel', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header img')).toHaveCount(1)
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

test.describe('Conversion path', () => {
  test('FAQ answers open natively and every question is reachable by keyboard', async ({ page }) => {
    await page.goto('/')
    const items = page.locator('#faq details')
    await expect(items).toHaveCount(6)
    const first = items.first()
    await first.locator('summary').click()
    await expect(first).toHaveAttribute('open', '')
  })

  test('sections alternate between ink and ivory surfaces', async ({ page }) => {
    await page.goto('/')
    const tones = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main > section')).map((el) =>
        el.classList.contains('surface-ink') ? 'ink' : 'light',
      ),
    )
    expect(tones).toContain('ink')
    expect(tones).toContain('light')
    expect(tones.at(-1)).toBe('ink')
  })

  test('every section offers the same inquiry action target', async ({ page }) => {
    await page.goto('/')
    const hrefs = await page
      .locator('main a.ui-cta-primary, main a.link-arrow[href="#kontakt"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')))
    expect(hrefs.length).toBeGreaterThanOrEqual(5)
    expect(new Set(hrefs).size).toBe(1)
  })
})
