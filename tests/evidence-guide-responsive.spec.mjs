import { test, expect } from '@playwright/test'

const cases = [
  ['durian', 'load-scaling', '비동기'],
  ['bluebell', 'recovery', 'EventBridge'],
  ['onereport', 'boundary', '제안'],
  ['labbit', 'validation', 'Actual OpenStack VM E2E'],
]

for (const width of [1440, 390]) {
  for (const [slug, id, boundary] of cases) {
    test(`${slug} ${width}px: keyboard shortcut reaches proof and preserves scope on reload`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(`/projects/${slug}`)
      const guide = page.getByRole('navigation', { name: '핵심 검증 근거 바로가기' })
      await expect(guide.getByRole('link')).toHaveCount(3)
      await expect(page.getByLabel('기여와 검증 범위 표기')).toContainText('제안·후속 검증')
      await guide.locator(`a[href$="#${id}"]`).focus()
      await page.keyboard.press('Enter')
      const section = page.locator(`#${id}`)
      await expect(section).toBeFocused()
      await expect(section).toContainText(boundary)
      await expect(section.locator('h2')).toBeInViewport()
      await expect.poll(() => section.locator('h2').evaluate(element =>
        element.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom,
      )).toBe(true)
      await page.reload()
      await expect(section).toBeFocused()
      await expect(section).toContainText(boundary)
      await page.locator('.skip-link').focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('#main-content')).toBeFocused()
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    })
  }
}
