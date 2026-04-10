import { expect, test } from '@playwright/test'

/**
 * Contact form E2E tests — renders, client-side validation, and submission.
 * Submission test waits past the 2500ms server-side dwell-time guard and expects
 * any server response (success OR "missing env" error in CI without BREVO credentials).
 */

async function gotoContact(page: import('@playwright/test').Page) {
  await page.goto('/', { waitUntil: 'load' })
  const contactSection = page.locator('#kontakt')
  await contactSection.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
  await expect(contactSection).toBeVisible()
}

const VALID_FORM = {
  name: 'Jan Novák',
  email: 'jan@example.com',
  phone: '+420 123 456 789',
  eventType: 'teambuilding',
  datePlace: 'Praha, červen 2026',
  participants: '25',
} as const

async function fillValidForm(page: import('@playwright/test').Page) {
  await page.locator('#field-name').fill(VALID_FORM.name)
  await page.locator('#field-email').fill(VALID_FORM.email)
  await page.locator('#field-phone').fill(VALID_FORM.phone)
  await page.locator('#field-eventType').selectOption({ value: VALID_FORM.eventType })
  await page.locator('#field-datePlace').fill(VALID_FORM.datePlace)
  await page.locator('#field-participants').fill(VALID_FORM.participants)
  // Click the visible label wrapper — sr-only input can't be .check()-ed on Safari WebKit
  await page.locator('label:has(input[name="gdpr"])').click()
}

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await gotoContact(page)
  })

  test('form is visible with all required fields and submit button', async ({ page }) => {
    const form = page.locator('form[aria-label*="Formulář"]')
    await expect(form).toBeVisible()

    await expect(page.locator('#field-name')).toBeVisible()
    await expect(page.locator('#field-email')).toBeVisible()
    await expect(page.locator('#field-phone')).toBeVisible()
    await expect(page.locator('#field-eventType')).toBeVisible()
    await expect(page.locator('#field-datePlace')).toBeVisible()
    await expect(page.locator('#field-participants')).toBeVisible()
    await expect(page.locator('#field-message')).toBeVisible()
    await expect(page.locator('input[name="gdpr"]')).toBeAttached()

    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
    await expect(submitButton).toBeEnabled()
    await expect(submitButton).toContainText('Odeslat poptávku')
  })

  test('empty submit shows all required field validation errors', async ({ page }) => {
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-name')).toBeVisible()
    await expect(page.locator('#error-email')).toBeVisible()
    await expect(page.locator('#error-phone')).toBeVisible()
    await expect(page.locator('#error-eventType')).toBeVisible()
    await expect(page.locator('#error-datePlace')).toBeVisible()
    await expect(page.locator('#error-participants')).toBeVisible()
    await expect(page.locator('#error-gdpr')).toBeVisible()
  })

  test('error messages clear when the corrected field is changed', async ({ page }) => {
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('#error-name')).toBeVisible()

    await page.locator('#field-name').fill('Jan Novák')
    await expect(page.locator('#error-name')).not.toBeVisible()
  })

  test('invalid email format shows email error, not other field errors', async ({ page }) => {
    await page.locator('#field-name').fill(VALID_FORM.name)
    await page.locator('#field-email').fill('notanemail')
    await page.locator('#field-phone').fill(VALID_FORM.phone)
    await page.locator('#field-eventType').selectOption({ value: VALID_FORM.eventType })
    await page.locator('#field-datePlace').fill(VALID_FORM.datePlace)
    await page.locator('#field-participants').fill(VALID_FORM.participants)
    await page.locator('label:has(input[name="gdpr"])').click()

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-email')).toBeVisible()
    await expect(page.locator('#error-email')).toContainText(/platný e-mail/i)

    await expect(page.locator('#error-name')).not.toBeVisible()
    await expect(page.locator('#error-phone')).not.toBeVisible()
    await expect(page.locator('#error-eventType')).not.toBeVisible()
    await expect(page.locator('#error-gdpr')).not.toBeVisible()
  })

  test('phone number too short shows phone format error', async ({ page }) => {
    await page.locator('#field-name').fill(VALID_FORM.name)
    await page.locator('#field-email').fill(VALID_FORM.email)
    await page.locator('#field-phone').fill('123') // too short (< 8 chars)
    await page.locator('#field-eventType').selectOption({ value: VALID_FORM.eventType })
    await page.locator('#field-datePlace').fill(VALID_FORM.datePlace)
    await page.locator('#field-participants').fill(VALID_FORM.participants)
    await page.locator('label:has(input[name="gdpr"])').click()

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-phone')).toBeVisible()
    await expect(page.locator('#error-phone')).toContainText(/telefonní číslo/i)

    await expect(page.locator('#error-email')).not.toBeVisible()
    await expect(page.locator('#error-name')).not.toBeVisible()
  })

  test('unchecked GDPR shows gdpr error when everything else is valid', async ({ page }) => {
    await page.locator('#field-name').fill(VALID_FORM.name)
    await page.locator('#field-email').fill(VALID_FORM.email)
    await page.locator('#field-phone').fill(VALID_FORM.phone)
    await page.locator('#field-eventType').selectOption({ value: VALID_FORM.eventType })
    await page.locator('#field-datePlace').fill(VALID_FORM.datePlace)
    await page.locator('#field-participants').fill(VALID_FORM.participants)
    // deliberately skip GDPR

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-gdpr')).toBeVisible()
    await expect(page.locator('#error-name')).not.toBeVisible()
    await expect(page.locator('#error-email')).not.toBeVisible()
    await expect(page.locator('#error-phone')).not.toBeVisible()
  })

  test('zero participants shows participants error', async ({ page }) => {
    await page.locator('#field-name').fill(VALID_FORM.name)
    await page.locator('#field-email').fill(VALID_FORM.email)
    await page.locator('#field-phone').fill(VALID_FORM.phone)
    await page.locator('#field-eventType').selectOption({ value: VALID_FORM.eventType })
    await page.locator('#field-datePlace').fill(VALID_FORM.datePlace)
    await page.locator('#field-participants').fill('0')
    await page.locator('label:has(input[name="gdpr"])').click()

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-participants')).toBeVisible()
  })

  test('valid complete form shows no client-side errors when submitted', async ({ page }) => {
    await fillValidForm(page)
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('#error-name')).not.toBeVisible()
    await expect(page.locator('#error-email')).not.toBeVisible()
    await expect(page.locator('#error-phone')).not.toBeVisible()
    await expect(page.locator('#error-eventType')).not.toBeVisible()
    await expect(page.locator('#error-datePlace')).not.toBeVisible()
    await expect(page.locator('#error-participants')).not.toBeVisible()
    await expect(page.locator('#error-gdpr')).not.toBeVisible()
  })

  test('submit button is disabled while the form is submitting', async ({ page }) => {
    // Delay POST responses so the pending-disabled window is long enough to assert
    // on all browsers including mobile WebKit under full-suite load.
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await new Promise<void>((resolve) => setTimeout(resolve, 600))
      }
      await route.continue()
    })

    await fillValidForm(page)

    const submitButton = page.locator('button[type="submit"]')
    await page.locator('button[type="submit"]').click()

    // Button must be disabled while the server action is in-flight.
    await expect(submitButton).toBeDisabled()

    await page.unrouteAll()
  })

  test('full submission flow shows success message', async ({ page }) => {
    await fillValidForm(page)
    await page.locator('button[type="submit"]').click()

    // E2E_MOCK_CONTACT=true bypasses Brevo — expect the specific success message.
    const responseMsg = page.locator('form p[role="alert"], form p[role="status"]')
    await expect(responseMsg).toBeVisible({ timeout: 10000 })
    await expect(responseMsg).toContainText('Děkujeme za poptávku')
  })
})
