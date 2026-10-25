import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`Labbit ${width}px: workspace proof, validation stages and keyboard reading journey`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('.additional-project-list .project-case-link').nth(1).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/labbit$/)
    await expect(page.locator('main h1')).toBeFocused()
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByText('개발 진행 중', { exact: true })).toBeVisible()

    const toc = page.getByRole('navigation', { name: 'Labbit 사례 목차' })
    await expect(toc.getByRole('link')).toHaveCount(8)
    await expect(page.locator('.labbit-case')).toHaveCount(4)
    await expect(page.locator('.labbit-case')).toHaveCount(4)
    await expect(page.locator('#validation details')).toHaveCount(0)
    await expect(page.locator('#validation .story-inline-reference a')).toHaveCount(3)
    await expect(page.locator('#flow .story-architecture-node')).toHaveCount(7)
    await expect(page.locator('#flow')).toContainText('React 웹')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('ETag/If-Match · 412 충돌 보호')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('저장 결과 불명확 시 자동 재저장 차단')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('2026-10-07 main 병합')
    await expect(page.locator('#session .bluebell-case-result')).toContainText('Mutation 403 → 요청 시점 권한 변경 안내')
    await expect(page.locator('#http .bluebell-case-result')).toContainText('Production Build는 설정과 무관하게 HTTP Consumer 사용')
    await expect(page.locator('#prototype .bluebell-case-result')).toContainText('Vitest 69 / 69')
    await expect(page.locator('#prototype .bluebell-case-result')).toContainText('capture 17 / 17')
    await expect(page.locator('#prototype .bluebell-case-result')).toContainText('CodeQL 후속 HEAD')

    for (const id of ['overview', 'flow', 'workspace', 'session', 'http', 'prototype', 'validation', 'evidence']) {
      await toc.locator(`a[href$="#${id}"]`).click()
      const section = page.locator(`#${id}`)
      await expect(section).toBeFocused()
      await expect(section.locator('h2')).toBeInViewport()
      await expect.poll(() => section.locator('h2').evaluate(element => element.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom)).toBe(true)
    }

    const workspace = page.locator('#workspace')
    await toc.locator('a[href$="#workspace"]').focus()
    await page.keyboard.press('Enter')
    await expect(workspace).toBeFocused()
    await expect(workspace.locator('details')).toHaveCount(0)
    await expect(workspace.locator('.bluebell-case-result')).toBeVisible()
    await expect(workspace.locator('.labbit-merge-result')).toContainText('Web/Contracts/Go/CodeQL 검사 PASS')
    const original = workspace.getByRole('link', { name: '관련 구현 코드 ↗' })
    await original.focus()
    await expect(original).toBeFocused()
    await expect(original).toHaveAttribute('href', 'https://github.com/ktcloud4-SL/labbit-app/pull/62')
    await expect(original).toHaveAttribute('target', '_blank')
    await page.reload({ waitUntil: 'networkidle' })
    await expect(page).toHaveURL(/#workspace$/)
    await expect(workspace).toBeFocused()

    await toc.locator('a[href$="#validation"]').click()
    const validation = page.locator('#validation')
    await expect(validation).toBeFocused()
    const stages = validation.locator('.labbit-gates > li')
    await expect(stages).toHaveCount(2)
    await expect(stages.locator('.labbit-gate-state')).toHaveText(['검증 완료', '검증 완료'])
    await expect(stages.nth(0)).toContainText('개인 FE PR 병합')
    await expect(stages.nth(1).locator('h3')).toHaveText('인증·수업 Backend 연동')
    await expect(stages.nth(1)).toContainText('인증·수업 화면을 실제 Backend에 연결해 브라우저에서 검증했습니다.')
    await expect(validation).not.toContainText('Actual OpenStack VM E2E · Pending')
    await expect(validation).not.toContainText('실제 OpenStack VM')
    await expect.poll(() => validation.locator('h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/labbit-${width}-validation.png` })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)

    // G28: after scrolling away, reactivating the very same hash must
    // return the reader to the destination without adding a history entry.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(500)
    const sameHashLink = toc.locator('a[href$="#validation"]')
    await sameHashLink.focus()
    await expect(sameHashLink).toBeFocused()
    await sameHashLink.press('Enter')
    await expect(page).toHaveURL(/#validation$/)
    await expect(validation).toBeFocused()
    const validationAligned = () => validation.locator('h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })
    await expect.poll(validationAligned).toBe(true)

    // The original G28 failure was a repeated pointer click.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(500)
    await sameHashLink.click()
    await expect(page).toHaveURL(/#validation$/)
    await expect(validation).toBeFocused()
    await expect.poll(validationAligned).toBe(true)
    await page.goBack()
    await expect(page).toHaveURL(/#workspace$/)
    await expect(workspace).toBeFocused()
    await expect.poll(() => workspace.locator('h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/labbit-${width}-workspace.png` })
    await page.screenshot({ path: `artifacts/screenshots/labbit-${width}-full.png`, fullPage: true })

    await page.getByRole('link', { name: /Selected Projects/ }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeFocused()
    await page.locator('.additional-project-list .project-case-link').nth(1).click()
    await expect(page).toHaveURL(/\/projects\/labbit$/)
    const nextProjectLink = page.locator('.next-project a')
    await expect(nextProjectLink).toHaveAttribute('href', '/projects/durian')
    await nextProjectLink.focus()
    await expect(nextProjectLink).toBeFocused()
    await nextProjectLink.press('Enter')
    await expect(page).toHaveURL(/\/projects\/durian$/)
    await expect(page.locator('main h1')).toBeFocused()
    expect(errors).toEqual([])
  })
}
