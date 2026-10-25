import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`reading journey ${width}px: home to proof and back with keyboard focus`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/', { waitUntil: 'networkidle' })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))

    await page.getByRole('navigation', { name: '먼저 볼 프로젝트' }).getByRole('link', { name: /Team Durian/ }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/durian$/)
    await expect(page.locator('main h1')).toBeFocused()
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThanOrEqual(2)

    const toc = page.getByRole('navigation', { name: 'Durian 사례 목차' })
    await toc.locator('a[href$="#load-scaling"]').focus()
    await page.keyboard.press('Enter')
    const load = page.locator('#load-scaling')
    await expect(load).toBeFocused()
    await expect(load.getByText('300 / 300 HTTP 200 · 비동기 요청 수락 · Concurrency 50')).toBeVisible()
    // Core result and architecture are directly visible; no source accordion is needed.
    await expect(load.locator('details')).toHaveCount(0)
    await expect(load.locator('.durian-case-result')).toBeVisible()
    await expect(page.locator('#architecture .story-architecture')).toBeVisible()
    const measured = load.getByText(/HTTP 300\/300|300 \/ 300 HTTP 200/)
    await expect(measured.first()).toBeVisible()

    await toc.locator('a[href$="#request-recovery"]').click()
    await expect(page.locator('#request-recovery')).toBeFocused()
    await expect(page.locator('#request-recovery').getByText('POST_CUTOVER_E2E_SUCCESS')).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(/#load-scaling$/)
    await expect(load).toBeFocused()
    await expect.poll(() => load.locator('h2').evaluate((element) => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/journey-${width}-case.png` })

    await page.getByRole('link', { name: /Selected Projects/ }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeFocused()
    await page.locator('.featured-project-list .project-case-link').first().focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('main h1')).toBeFocused()
    await page.locator('.next-project a').focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/bluebell$/)
    await expect(page.locator('main h1')).toBeFocused()
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThanOrEqual(2)

    const menu = page.locator('.menu-button')
    if (width <= 760) {
      await menu.click()
      await expect(menu).toHaveAttribute('aria-expanded', 'true')
    }
    await page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeFocused()
    if (width <= 760) await expect(menu).toHaveAttribute('aria-expanded', 'false')
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    expect(errors).toEqual([])
  })
}
