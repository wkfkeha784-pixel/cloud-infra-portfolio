import { test, expect } from '@playwright/test'

// Expectations come from the approved portfolio wording, not the data module.
const projects = [
  { slug: 'durian', timeline: '2026.07.15-08.18', team: '최종 3명', role: '팀원' },
  { slug: 'bluebell', timeline: '교육 프로젝트 2026.06.11-07.14', team: '최종 5명', role: '팀장' },
  { slug: 'onereport', timeline: '2026.08.19-08.21 해커톤', team: '역할표 8명 · Backend 공동 2명', role: 'Backend 공동' },
  { slug: 'labbit', timeline: '개발 착수안 2026.09.17 · 수록 PR 10.07-10.15 · 검증 기준 2026.10.16', team: '9/17 착수안 팀 구성표 8명(개발 4 / 운영 4)', role: 'Frontend' },
]

for (const width of [1440, 768, 390, 320]) {
  test(`project metadata preserves scope and fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    for (const project of projects) {
      await page.goto(`/projects/${project.slug}`)
      const metadata = page.locator('#overview .project-metadata')
      await expect(metadata).toBeVisible()
      await expect(metadata.locator('dd').nth(0)).toHaveText(project.timeline)
      await expect(metadata.locator('dd').nth(1)).toHaveText(project.team)
      await expect(metadata.locator('dd').nth(2)).toContainText(project.role)
      expect(await metadata.evaluate((element) => {
        const viewport = document.documentElement.clientWidth
        return [element, ...element.querySelectorAll('dt, dd')].every((node) => {
          const box = node.getBoundingClientRect()
          return box.left >= -1 && box.right <= viewport + 1 && node.scrollWidth <= node.clientWidth + 1
        })
      })).toBe(true)
      // The added rows must leave the following contribution section below them.
      const nextSectionTop = await page.locator('#overview .bluebell-subheading, #overview .durian-subheading').first().evaluate((node) => node.getBoundingClientRect().top)
      const metadataBottom = await metadata.evaluate((node) => node.getBoundingClientRect().bottom)
      expect(nextSectionTop).toBeGreaterThanOrEqual(metadataBottom)
    }
  })
}
