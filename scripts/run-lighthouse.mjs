import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const mode = process.argv[2] === 'mobile' ? 'mobile' : 'desktop'
const url = process.env.LIGHTHOUSE_URL ?? 'http://127.0.0.1:3000'
const outputDir = path.resolve(process.cwd(), 'test-results')
const outputPath = path.join(outputDir, `lighthouse-${mode}.html`)
const summaryPath = path.join(outputDir, `lighthouse-${mode}.json`)

await fs.mkdir(outputDir, { recursive: true })

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
})

try {
  const runnerResult = await lighthouse(url, {
    port: chrome.port,
    output: 'html',
    logLevel: 'info',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    preset: mode === 'desktop' ? 'desktop' : undefined,
    formFactor: mode,
    screenEmulation:
      mode === 'mobile'
        ? {
            mobile: true,
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            disabled: false,
          }
        : {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
  })

  if (!runnerResult?.report) {
    throw new Error('Lighthouse did not produce a report')
  }

  await fs.writeFile(outputPath, runnerResult.report)

  const categories = runnerResult.lhr.categories
  const formatScore = (key) => Math.round((categories[key]?.score ?? 0) * 100)
  const summary = {
    mode,
    url,
    outputPath,
    generatedAt: new Date().toISOString(),
    scores: {
      performance: formatScore('performance'),
      accessibility: formatScore('accessibility'),
      bestPractices: formatScore('best-practices'),
      seo: formatScore('seo'),
    },
  }

  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2))

  console.log(JSON.stringify({ ...summary, summaryPath }, null, 2))
} finally {
  await chrome.kill()
}
