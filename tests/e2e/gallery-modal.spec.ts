import { expect, test } from '@playwright/test'

test.describe('Gallery modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('gallery image opens modal and can be closed with Escape', async ({ page }) => {
    const galleryTrigger = page.getByRole('button', { name: /zobrazit fotografii:/i }).first()
    await galleryTrigger.scrollIntoViewIfNeeded()
    await expect(galleryTrigger).toBeVisible()

    await galleryTrigger.click()

    const dialog = page.getByRole('dialog', { name: /náhled galerie/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: /zavřít náhled/i })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })
})
