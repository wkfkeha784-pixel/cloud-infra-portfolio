import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`OneReport ${width}px: implementation proof, scope and keyboard reading journey`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('.additional-project-list .project-case-link').first().focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/onereport$/)
    await expect(page.locator('main h1')).toBeFocused()
    await page.evaluate(() => document.fonts.ready)

    const toc = page.getByRole('navigation', { name: 'OneReport 사례 목차' })
    await expect(toc.getByRole('link')).toHaveCount(7)
    await expect(page.locator('.onereport-case')).toHaveCount(3)
    await expect(page.locator('.onereport-case .scope-badge')).toHaveText(['MY', 'MY', 'MY'])
    await expect(page.locator('#flow li')).toHaveCount(6)
    await expect(page.locator('#flow').getByText('규칙 기반 분석 · 실제 공공기관 시스템 연계 없음', { exact: true })).toBeVisible()
    await expect(page.locator('#domain .bluebell-case-result')).toContainText('41 passed')
    await expect(page.locator('#contract .bluebell-case-result')).toContainText('49 passed')
    await expect(page.locator('#analysis .bluebell-case-result')).toContainText('65 passed')
    await expect(page.locator('#analysis .bluebell-case-result')).toContainText('분석 실패 / 미분류 → 수동 선택 fallback')

    for (const id of ['overview', 'flow', 'domain', 'contract', 'analysis', 'smoke', 'boundary']) {
      await toc.locator(`a[href$="#${id}"]`).click()
      const section = page.locator(`#${id}`)
      await expect(section).toBeFocused()
      await expect(section.locator('h2')).toBeInViewport()
      await expect.poll(() => section.locator('h2').evaluate(element => element.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom)).toBe(true)
    }
    const contract = page.locator('#contract')
    await toc.locator('a[href$="#contract"]').focus()
    await page.keyboard.press('Enter')
    await expect(contract).toBeFocused()
    await page.keyboard.press('Tab')
    const summary = contract.locator('summary')
    await expect(summary).toBeFocused()
    expect(await summary.evaluate(element => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
    })).toBe(true)
    await page.keyboard.press('Enter')
    await expect(contract.locator('.onereport-source-name')).toBeVisible()
    await page.keyboard.press('Space')
    await expect(contract.locator('details')).not.toHaveAttribute('open')
    await expect(contract.locator('.bluebell-case-result')).toBeVisible()
    await expect(contract.locator('.bluebell-case-condition')).toBeVisible()

    await toc.locator('a[href$="#smoke"]').click()
    const smoke = page.locator('#smoke')
    await expect(smoke.locator('.scope-badge')).toHaveText('PROJECT')
    await expect(smoke.locator('.onereport-smoke-condition')).toContainText('PR #30 시점 실서버 /api/health는 502')
    await expect(smoke.locator('.onereport-smoke-condition')).toContainText('배포 정상화 후 8/21')
    await expect(smoke.locator('.bluebell-validation')).toContainText('FINAL: PASS')
    await page.reload({ waitUntil: 'networkidle' })
    await expect(page).toHaveURL(/#smoke$/)
    await expect(smoke).toBeFocused()
    await toc.locator('a[href$="#boundary"]').click()
    await expect(page.locator('#boundary')).toBeFocused()
    await expect(page.locator('table')).toHaveAccessibleName('구현한 PoC와 사업 제안의 비교')
    await expect(page.locator('table')).toContainText('실제 구현·검증')
    await expect(page.locator('table')).toContainText('제안·확장 구상')
    await expect(page.locator('#boundary')).toContainText('실제 112·119 등 공공기관 시스템 연계는 구현 범위가 아닙니다.')
    await expect(page.locator('a[href*="github.com/ktcloud4-SL/hackathon"]')).toHaveCount(0)
    await expect.poll(() => page.locator('#boundary h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/onereport-${width}-boundary.png` })
    await page.goBack()
    await expect(page).toHaveURL(/#smoke$/)
    await expect(smoke).toBeFocused()
    await expect.poll(() => smoke.locator('h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/onereport-${width}-smoke.png` })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    await page.screenshot({ path: `artifacts/screenshots/onereport-${width}-full.png`, fullPage: true })

    await page.getByRole('link', { name: /Selected Projects/ }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeFocused()
    await page.locator('.additional-project-list .project-case-link').first().click()
    await page.locator('.next-project a').focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/labbit$/)
    await expect(page.locator('main h1')).toBeFocused()
    expect(errors).toEqual([])
  })
}
