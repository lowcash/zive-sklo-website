import { test, expect } from '@playwright/test'

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
      const link = page.locator(`header a[href="${href}"]`).first()
      await expect(link).toBeVisible()
      await link.click()
      await page.waitForTimeout(800)

      const sectionId = href.replace('#', '')
      const section = page.locator(`#${sectionId}`)
      await expect(section).toBeInViewport({ ratio: 0.1 })
    })
  }

  test('hero CTA "Poptat akci" scrolls to #kontakt', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Poptat akci' }).first()
    await expect(cta).toBeVisible()
    await cta.click()
    await page.waitForTimeout(800)
    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })

  test('logo link navigates to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
    await page.waitForTimeout(300)
    const logo = page.locator('header a[href="#top"]')
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

    const activeLink = page.locator('header a[aria-current="page"]')
    await expect(activeLink).toHaveCount(1)
    await expect(activeLink).toHaveAttribute('href', '#nabidka')
  })
})

test.describe('Mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hamburger button is visible on mobile', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await expect(hamburger).toBeVisible()
  })

  test('opens when hamburger is clicked', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await hamburger.click()

    const overlay = page.locator('[role="dialog"]')
    await expect(overlay).toBeVisible()
  })

  test('hamburger aria-expanded is true when open', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  test('menu items are below the navigation bar', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await hamburger.click()
    await page.waitForTimeout(300)

    // First nav link inside the mobile overlay should be below ~60px (nav bar height)
    const firstLink = page.locator('[role="dialog"] nav a').first()
    await expect(firstLink).toBeVisible()
    const box = await firstLink.boundingBox()
    expect(box?.y).toBeGreaterThan(60)
  })

  test('closes when close button is clicked', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await hamburger.click()

    const closeBtn = page.getByRole('button', { name: /zavřít navigaci/i })
    await expect(closeBtn).toBeVisible()
    await closeBtn.click()
    await page.waitForTimeout(400)

    const overlay = page.locator('[role="dialog"]')
    await expect(overlay).not.toBeVisible()
  })

  test('nav link inside menu closes overlay and scrolls', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /otevřít navigaci/i })
    await hamburger.click()
    await page.waitForTimeout(300)

    const link = page.locator('[role="dialog"] nav a[href="#kontakt"]')
    await expect(link).toBeVisible()
    await link.click()
    await page.waitForTimeout(800)

    await expect(page.locator('#kontakt')).toBeInViewport({ ratio: 0.1 })
  })
})
