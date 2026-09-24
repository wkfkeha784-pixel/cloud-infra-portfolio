import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

const routes = [
  ['home', '/', '박희철'],
  ['durian', '/projects/durian', 'Team Durian'],
  ['bluebell', '/projects/bluebell', 'Bluebell'],
  ['onereport', '/projects/onereport', 'OneReport'],
  ['labbit', '/projects/labbit', 'Labbit'],
]

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const [name, route, marker] of routes) {
  test(`${name}: route renders, reloads, and has no horizontal overflow`, async ({ page }, testInfo) => {
    const response = await page.goto(route, { waitUntil: 'networkidle' })
    expect(response, `${route} should return a response`).not.toBeNull()
    expect(response.status(), `${route} should not return an HTTP error`).toBeLessThan(400)

    await page.evaluate(() => document.fonts?.ready)
    await expect(page.getByText(marker, { exact: false }).first()).toBeVisible()

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }))
    expect(
      overflow.scrollWidth,
      `${route} has horizontal overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
    ).toBeLessThanOrEqual(overflow.innerWidth + 2)

    const bodyText = await page.locator('body').innerText()
    expect(bodyText).not.toContain('010-3247-0587')
    expect(bodyText).not.toContain('01032470587')

    await page.screenshot({
      path: `artifacts/screenshots/${testInfo.project.name}-${name}.png`,
      fullPage: true,
    })

    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.getByText(marker, { exact: false }).first()).toBeVisible()
  })
}

test('durian: validation evidence snapshots expose dated proof and scope', async ({ page }) => {
  await page.goto('/projects/durian', { waitUntil: 'networkidle' })

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)

  await expect(page.getByText('300 / 300 HTTP 200 · Concurrency 50')).toBeVisible()
  await expect(page.getByText('POST_CUTOVER_E2E_SUCCESS')).toBeVisible()
  await expect(page.getByText('Final Health PASS 43 / WARN 0 / FAIL 0')).toBeVisible()

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('PROJECT', { exact: true })).toBeVisible()
})

test('home: four case-study cards and contact links are present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const caseStudyLinks = page.getByRole('link', { name: /View Case Study/ })
  await expect(caseStudyLinks).toHaveCount(4)

  for (const href of [
    '/projects/durian',
    '/projects/bluebell',
    '/projects/onereport',
    '/projects/labbit',
  ]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible()
  }

  await expect(page.locator('#contact a[href="mailto:wkfkeha784@gmail.com"]')).toBeVisible()
  await expect(page.locator('#contact a[href="https://github.com/wkfkeha784-pixel"]')).toBeVisible()
})

test('evidence: public repository and PR links are wired correctly', async ({ page }) => {
  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })
  for (const href of [
    'https://github.com/ktcloud4-SL/hackathon',
    'https://github.com/ktcloud4-SL/hackathon/pull/9',
    'https://github.com/ktcloud4-SL/hackathon/pull/14',
    'https://github.com/ktcloud4-SL/hackathon/pull/27',
  ]) {
    await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1)
  }

  await page.goto('/projects/labbit', { waitUntil: 'networkidle' })
  for (const href of [
    'https://github.com/ktcloud4-SL/labbit-app',
    'https://github.com/ktcloud4-SL/labbit-app/pull/23',
    'https://github.com/ktcloud4-SL/labbit-app/pull/28',
  ]) {
    await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1)
  }
})
