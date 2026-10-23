import { test, expect } from '@playwright/test'

const cases = [
  ['durian', 'load-scaling', '비동기', 'architecture'],
  ['bluebell', 'recovery', 'EventBridge', 'architecture'],
  ['onereport', 'boundary', '제안', 'flow'],
  ['labbit', 'validation', '개인 작성·main 병합이 확인된 코드 변경', 'flow'],
]

for (const width of [1440, 390]) {
  for (const [slug, id, boundary, architectureId] of cases) {
    test(`${slug} ${width}px: natural project navigation, architecture and focus survive reload`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(`/projects/${slug}`)
      await expect(page.getByRole('navigation', { name: '핵심 검증 근거 바로가기' })).toHaveCount(0)
      const toc = page.locator('.durian-toc nav, .bluebell-toc nav')
      await expect(toc).toBeVisible()
      await expect(page.locator(`#${architectureId} .story-architecture`)).toBeVisible()
      await toc.locator(`a[href$="#${id}"]`).focus()
      await page.keyboard.press('Enter')
      const section = page.locator(`#${id}`)
      await expect(section).toBeFocused()
      await expect(section).toContainText(boundary)
      await expect(section.locator('h2')).toBeInViewport()
      await page.reload()
      await expect(section).toBeFocused()
      await page.locator('.skip-link').focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('#main-content')).toBeFocused()
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    })
  }
}
