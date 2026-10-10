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
    await expect(load.getByText(/HTTP 200은 비동기 요청 수락 기준/)).toBeVisible()
    await page.keyboard.press('Tab')
    const summary = load.locator('summary')
    await expect(summary).toBeFocused()
    expect(await summary.evaluate((element) => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
    })).toBe(true)
    await page.keyboard.press('Enter')
    await expect(load.locator('.durian-source-name')).toBeVisible()
    await expect(load.getByText(/573\.68 req\/s · 0\.523초/)).toBeVisible()
    await page.keyboard.press('Space')
    await expect(load.locator('details')).not.toHaveAttribute('open')
    await expect(load.locator('.durian-case-result')).toBeVisible()

    await toc.locator('a[href$="#request-recovery"]').click()
    await expect(page.locator('#request-recovery')).toBeFocused()
    await expect(page.locator('#request-recovery').getByText(/Producer 경로에는 Redis 호출이 없었습니다/)).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(/#load-scaling$/)
    await expect(load).toBeFocused()
    await expect.poll(() => load.locator('h2').evaluate((element) => element.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom)).toBe(true)
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
