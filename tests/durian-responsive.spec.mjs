import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

const sections = ['overview', 'architecture', 'load-scaling', 'request-recovery', 'scheduling', 'worker-recovery', 'evidence']

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`durian ${width}px: contents reach each case and survive reload`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/projects/durian', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('h1')).toContainText('Team Durian')
    await expect(page.locator('h1')).toContainText('Consumer 확장·축소와 Kubernetes 운영 복구')
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)

    const toc = page.getByRole('navigation', { name: 'Durian 사례 목차' })
    await expect(toc.getByRole('link')).toHaveCount(7)
    const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((element) => element.id))
    expect(new Set(ids).size).toBe(ids.length)
    await page.screenshot({ path: `artifacts/screenshots/durian-${width}.png`, fullPage: true })

    for (const id of sections) {
      await toc.locator(`a[href$="#${id}"]`).click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      const heading = page.locator(`#${id}-title`)
      await expect.poll(() => heading.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        const header = document.querySelector('.site-header').getBoundingClientRect()
        return rect.top >= header.bottom && rect.bottom <= innerHeight
      })).toBe(true)
    }

    await toc.locator('a[href$="#worker-recovery"]').focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#worker-recovery$/)
    await page.reload({ waitUntil: 'networkidle' })
    await expect.poll(() => page.locator('#worker-recovery-title').evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return rect.top >= document.querySelector('.site-header').getBoundingClientRect().bottom && rect.bottom <= innerHeight
    })).toBe(true)
    await expect(page.getByRole('region', { name: 'Terraform Worker 복구' }).getByText('Ready,SchedulingDisabled', { exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Kafka 요청 경로 복구' }).getByText(/이 8\/6 Snapshot의 공식 Producer 경로에는 Redis 호출이 없었습니다/)).toBeVisible()
    expect(await page.locator('body').innerText()).not.toContain('QueuePilot')

    // Essential proof stays visible while only the longer records are collapsed.
    for (const id of ['load-scaling', 'request-recovery', 'scheduling', 'worker-recovery', 'evidence']) {
      const section = page.locator(`#${id}`)
      const details = section.locator('details')
      const summary = details.locator('summary')
      await expect(details).not.toHaveAttribute('open')
      await expect(section.locator('.durian-case-result')).toBeVisible()
      await summary.focus()
      await page.keyboard.press('Enter')
      await expect(details).toHaveAttribute('open', '')
      await expect(details.locator('.durian-source-name')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
      await page.keyboard.press('Space')
      await expect(details).not.toHaveAttribute('open')
      await expect(section.locator('.durian-case-result')).toBeVisible()
      await section.screenshot({ path: `artifacts/screenshots/durian-${width}-${id}.png` })
    }
    await page.locator('#architecture').screenshot({ path: `artifacts/screenshots/durian-${width}-architecture.png` })
  })
}
