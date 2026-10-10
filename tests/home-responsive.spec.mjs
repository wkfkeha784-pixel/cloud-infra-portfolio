import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`home ${width}px: sections, menu, anchors, and keyboard navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)

    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    await expect(page.getByRole('region', { name: '경력과 학력' })).toBeVisible()
    await expect(page.getByRole('region', { name: '보유 자격' })).toBeVisible()
    await expect(page.getByRole('region', { name: '연락처' })).toBeVisible()
    await page.screenshot({ path: `artifacts/screenshots/home-${width}.png`, fullPage: true })

    const menu = page.locator('.menu-button')
    if (width <= 760) {
      await expect(menu).toBeVisible()
      const box = await menu.boundingBox()
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
      await menu.click()
      await expect(menu).toHaveAccessibleName('메뉴 닫기')
      await page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link', { name: 'Projects', exact: true }).focus()
      await page.keyboard.press('Escape')
      await expect(menu).toHaveAttribute('aria-expanded', 'false')
      await expect(menu).toBeFocused()
    }

    for (const [label, anchor, heading] of [
      ['Projects', 'projects', '운영과 복구를 검증한 대표 프로젝트'],
      ['Experience', 'experience', '경력과 학력'],
      ['Contact', 'contact', '연락처'],
    ]) {
      if (width <= 760) await menu.click()
      await page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link', { name: label, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`#${anchor}$`))
      if (width <= 760) await expect(menu).toHaveAttribute('aria-expanded', 'false')
      const title = page.getByRole('heading', { name: heading, exact: true })
      await expect.poll(() => title.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        const header = document.querySelector('.site-header').getBoundingClientRect()
        return rect.top >= header.bottom && rect.bottom <= innerHeight
      })).toBe(true)
    }

    const email = page.locator('#contact a[href="mailto:wkfkeha784@gmail.com"]')
    await email.focus()
    await page.keyboard.press('Tab')
    await expect(page.locator('#contact a[href="https://github.com/wkfkeha784-pixel"]')).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(email).toBeFocused()
    expect(await email.evaluate((element) => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
    })).toBe(true)

    await page.locator('.featured-project-list .project-case-link').first().focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/durian$/)
    await expect(page.locator('h1')).toContainText('Team Durian')
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThanOrEqual(2)
  })
}
