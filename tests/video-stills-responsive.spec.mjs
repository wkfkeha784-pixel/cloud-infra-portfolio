import { test, expect } from '@playwright/test'

const cases = [
  { slug: 'durian', images: [
    ['#architecture', '/evidence/video/durian-service.webp'],
    ['#evidence', '/evidence/video/durian-monitoring.webp'],
  ] },
  { slug: 'bluebell', images: [
    ['#architecture', '/evidence/video/bluebell-service.webp'],
    ['#web-was', '/evidence/video/bluebell-target-healthy.webp'],
    ['#monitoring', '/evidence/video/bluebell-monitoring.webp'],
  ] },
]

for (const width of [1440, 390, 320]) {
  for (const item of cases) {
    test(`${item.slug} ${width}px: real video stills load, read and fit`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      const missing = []
      page.on('response', (response) => {
        if (response.url().includes('/evidence/video/') && response.status() >= 400) missing.push(response.url())
      })
      await page.goto(`/projects/${item.slug}`)
      for (const [sectionId, file] of item.images) {
        const shot = page.locator(`${sectionId} img[src="${file}"]`)
        await shot.scrollIntoViewIfNeeded()
        await expect(shot).toBeVisible()
        await expect.poll(() => shot.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
        const alt = await shot.getAttribute('alt')
        expect(alt?.length).toBeGreaterThan(10)
        const caption = shot.locator('..').locator('figcaption')
        await expect(caption).toBeVisible()
        expect(await caption.innerText()).not.toMatch(/출처 펼치기|원본 증거 보기/)
        const box = await shot.boundingBox()
        expect(box.x).toBeGreaterThanOrEqual(-1)
        expect(box.x + box.width).toBeLessThanOrEqual(width + 1)
      }
      expect(missing).toEqual([])
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    })
  }
}
