import { expect, test } from '@playwright/test'

/**
 * Navigation tests — desktop links, hero CTA, mobile menu open/close, aria-current.
 * Run against a live dev server: npm run dev
 */

const NAV_LINKS = [
  { label: 'Co nabízíme', href: '#nabidka' },
  { label: 'Pro koho jsme', href: '#pro-koho' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Kontakt', href: '#kontakt' },
] as const

test.describe('Desktop navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  for (const { label, href } of NAV_LINKS) {
    test(`"${label}" link scrolls to ${href}`, async ({ page }) => {
      const link = page.locator(`nav a[href="${href}"]`).first()
      await expect(link).toBeVisible()
      await link.click()
      await page.waitForTimeout(800)

      const sectionId = href.replace('#', '')
      const section = page.locator(`#${sectionId}`)
      await expect(section).toBeInViewport({ ratio: 0.1 })

      const navBottom = await page
        .locator('nav[data-nav-root="true"]')
        .first()
        .evaluate((element) => element.getBoundingClientRect().bottom)
      const sectionTop = await section.evaluate((element) => element.getBoundingClientRect().top)

      expect(sectionTop).toBeGreaterThanOrEqual(navBottom - 2)
    })
  }

  test('hero CTA "Poptat akci" scrolls to #kontakt', async ({ page }) => {
    const cta = page.getByRole('link', { name: /nezávazně poptat akci/i }).first()
    await expect(cta).toBeVisible()
    await cta.click()
    await page.waitForTimeout(800)
    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })

  test('logo link navigates to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
    await page.waitForTimeout(300)
    const logo = page.locator('nav a[href="#top"]').first()
    await expect(logo).toBeVisible()
    await logo.click()
    await page.waitForTimeout(800)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })

  test('active nav link gets aria-current="page" on scroll', async ({ page }) => {
    // Scroll into #nabidka section
    await page.evaluate(() => {
      const el = document.getElementById('nabidka')
      el?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })
    await page.waitForTimeout(600)

    const activeLink = page.locator('nav a[aria-current="page"][href="#nabidka"]')
    await expect(activeLink).toHaveCount(1)
    await expect(activeLink.first()).toBeVisible()
  })
})

test.describe('Mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hamburger button is visible on mobile', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await expect(hamburger).toBeVisible()
  })

  test('opens when hamburger is clicked', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await hamburger.click()

    const overlay = page.locator('#mobile-nav-overlay')
    await expect(overlay).toBeVisible()
  })

  test('hamburger aria-expanded is true when open', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  test('menu items are below the navigation bar', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await hamburger.click()
    await page.waitForTimeout(300)

    // First nav link inside the mobile overlay should be below ~60px (nav bar height)
    const firstLink = page.locator('#mobile-nav-overlay nav a').first()
    await expect(firstLink).toBeVisible()
    const box = await firstLink.boundingBox()
    expect(box?.y).toBeGreaterThan(60)
  })

  test('closes when close button is clicked', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await hamburger.click()

    const overlay = page.locator('#mobile-nav-overlay')
    await expect(overlay).toBeVisible()

    const closeBtn = overlay.getByRole('button', { name: /zavřít navigaci/i })
    await expect(closeBtn).toBeVisible()
    await closeBtn.click()
    await page.waitForTimeout(400)

    await expect(overlay).not.toBeVisible()
  })

  test('nav link inside menu closes overlay and scrolls', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await hamburger.click()
    const overlay = page.locator('#mobile-nav-overlay')
    await expect(overlay).toBeVisible()

    const link = overlay.getByRole('link', { name: /kontakt/i })
    await expect(link).toBeVisible()
    await link.click()
    await page.waitForTimeout(800)

    await expect(overlay).not.toBeVisible()
    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })
})

test.describe('Tablet navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 })
    await page.goto('/')
    await page.waitForLoadState('load')
  })

  test('uses hamburger navigation on iPad-sized viewport', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-nav-overlay"]')
    await expect(hamburger).toBeVisible()

    const desktopLink = page.locator('nav a[href="#nabidka"]').first()
    await expect(desktopLink).not.toBeVisible()
  })
})

test.describe('URL hash sync on scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('URL hash updates to active section on manual scroll', async ({ page }) => {
    await page.evaluate(() => {
      const section = document.getElementById('nabidka')
      if (!section) return
      const navEl = document.querySelector('nav[data-nav-root="true"]') as HTMLElement | null
      const offset = navEl ? navEl.getBoundingClientRect().height : 80
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset + 4, behavior: 'instant' })
    })

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#nabidka')
  })

  test('URL hash clears when scrolled back above all sections', async ({ page }) => {
    // First scroll into a section
    await page.evaluate(() => {
      const section = document.getElementById('nabidka')
      if (!section) return
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
    })
    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#nabidka')

    // Scroll back to top
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('')
  })

  test('URL hash does not use pushState on scroll (history length unchanged)', async ({ page }) => {
    const historyLengthBefore = await page.evaluate(() => window.history.length)

    await page.evaluate(() => {
      const section = document.getElementById('galerie')
      if (!section) return
      const navEl = document.querySelector('nav[data-nav-root="true"]') as HTMLElement | null
      const offset = navEl ? navEl.getBoundingClientRect().height : 80
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset + 4, behavior: 'instant' })
    })

    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#galerie')

    const historyLengthAfter = await page.evaluate(() => window.history.length)
    expect(historyLengthAfter).toBe(historyLengthBefore)
  })
})
