import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3102',
    storageState: './tests/e2e/fixtures/declined-cookie-consent.storage.json',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm run preview:e2e',
    url: 'http://127.0.0.1:3102',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
    timeout: 240000,
    env: {
      E2E_MOCK_CONTACT: 'true',
      NEXT_PUBLIC_GA_TRACKING_ID: 'G-TEST123456',
      SITE_ENV: 'production',
    },
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/*.mobile.spec.ts'],
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
      testIgnore: ['**/*.desktop.spec.ts'],
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      testIgnore: ['**/*.desktop.spec.ts'],
    },
  ],
})
