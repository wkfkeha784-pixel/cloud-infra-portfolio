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
    await expect(page.getByText('IN PROGRESS · 2026-10-16', { exact: true })).toBeVisible()

    const toc = page.getByRole('navigation', { name: 'Labbit 사례 목차' })
    await expect(toc.getByRole('link')).toHaveCount(8)
    await expect(page.locator('.labbit-case')).toHaveCount(4)
    await expect(page.locator('.labbit-case .scope-badge')).toHaveText(['MY', 'MY', 'MY', 'MY'])
    await expect(page.getByRole('list', { name: '개인 Frontend 후속 PR 세 건' }).getByRole('link')).toHaveCount(3)
    await expect(page.locator('#flow li')).toHaveCount(6)
    await expect(page.locator('#flow')).toContainText('Frontend는 계약에 없는 Endpoint·Token·Error Code를 임의 정의하지 않음')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('ETag/If-Match · 412 충돌 보호')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('저장 결과 불명확 시 자동 재저장 차단')
    await expect(page.locator('#workspace .bluebell-case-result')).toContainText('2026-10-07 main 병합')
    await expect(page.locator('#session .bluebell-case-result')).toContainText('Server authorization이 최종 권한 경계')
    await expect(page.locator('#http .bluebell-case-result')).toContainText('Production Build는 설정과 무관하게 HTTP Consumer 사용')
    await expect(page.locator('#prototype .bluebell-case-result')).toContainText('Vitest 69 / 69')
    await expect(page.locator('#prototype .bluebell-case-result')).toContainText('capture 17 / 17')
    await expect(page.locator('#prototype .bluebell-case-condition')).toContainText('당시 UI HEAD Snapshot')

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
    await page.keyboard.press('Tab')
    const summary = workspace.locator('summary')
    await expect(summary).toBeFocused()
    expect(await summary.evaluate(element => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
    })).toBe(true)
    await page.keyboard.press('Enter')
    await expect(workspace.locator('.labbit-source-name')).toContainText('최종 PR HEAD 011de5d')
    await page.keyboard.press('Space')
    await expect(workspace.locator('details')).not.toHaveAttribute('open')
    await expect(workspace.locator('.bluebell-case-result')).toBeVisible()
    await expect(workspace.locator('.bluebell-case-condition')).toContainText('실제 OpenStack VM PTY/SFTP E2E는 후속 통합 검증')
    await page.keyboard.press('Tab')
    const original = workspace.getByRole('link', { name: 'PR #62 구현·검증 보기 ↗' })
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
    await expect(stages).toHaveCount(3)
    await expect(stages.locator('.labbit-gate-state')).toHaveText(['검증 완료', '검증 완료', 'OPEN 후속 통합 검증'])
    await expect(stages.nth(0)).toContainText('PR #59 merged · Vitest 109')
    await expect(stages.nth(1)).toContainText('Auth/Class는 당시 실제 Backend Browser 단계까지 검증했습니다.')
    await expect(stages.nth(2)).toContainText('Actual OpenStack VM E2E · Pending')
    await expect(stages.nth(2)).toContainText('실제 VM 전체 E2E 및 Preview/Live/AWS 전 구간은 완료로 주장하지 않습니다.')
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
