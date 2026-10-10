import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const width of [1440, 768, 390, 320]) {
  test(`Bluebell ${width}px: reading order, proof, keyboard and return journey`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('.featured-project-list .project-case-link').nth(1).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/bluebell$/)
    await expect(page.locator('main h1')).toBeFocused()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AWS Web–WAS를 구축하고 Replacement 이후 서비스 정상화')
    await page.evaluate(() => document.fonts.ready)

    const toc = page.getByRole('navigation', { name: 'Bluebell 사례 목차' })
    const sections = page.locator('.bluebell-section')
    await expect(toc.getByRole('link')).toHaveCount(6)
    await expect(sections).toHaveCount(6)
    await expect(page.locator('.bluebell-case')).toHaveCount(3)
    await expect(page.locator('.bluebell-case details[open]')).toHaveCount(0)
    await expect(page.locator('#overview').getByText('프로젝트 Team Lead', { exact: true })).toBeVisible()
    await expect(page.locator('#architecture').getByText(/Local\(On-Premise\) HAProxy\/MariaDB/)).toBeVisible()
    await expect(page.locator('#architecture ol li')).toHaveCount(7)
    await expect(page.locator('#web-was .bluebell-case-meta .scope-badge')).toHaveText('MY')
    await expect(page.locator('#recovery .bluebell-case-meta .scope-badge')).toHaveText('PROJECT')
    await expect(page.locator('#monitoring .bluebell-case-meta .scope-badge')).toHaveText('PROJECT')
    await expect(page.locator('.bluebell-case img')).toHaveCount(3)
    await expect.poll(() => page.locator('.bluebell-case img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true)

    for (const id of ['overview', 'architecture', 'web-was', 'recovery', 'monitoring', 'closing']) {
      await toc.locator(`a[href$="#${id}"]`).click()
      const section = page.locator(`#${id}`)
      await expect(section).toBeFocused()
      await expect(section.locator('h2')).toBeInViewport()
      await expect.poll(() => section.locator('h2').evaluate(element => element.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom)).toBe(true)
    }
    const recovery = page.locator('#recovery')
    await toc.locator('a[href$="#recovery"]').focus()
    await page.keyboard.press('Enter')
    await expect(recovery).toBeFocused()
    await expect(recovery.locator('.bluebell-recovery-condition')).toContainText('EventBridge Rule 2개를 DISABLED')
    await expect(recovery.locator('.bluebell-recovery-condition')).toContainText('최종 7/13 E2E')
    await expect(recovery.locator('.bluebell-case-result')).toContainText('Target Group healthy')
    await page.keyboard.press('Tab')
    const summary = recovery.locator('summary')
    await expect(summary).toBeFocused()
    expect(await summary.evaluate(element => {
      const style = getComputedStyle(element)
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
    })).toBe(true)
    await page.keyboard.press('Enter')
    await expect(recovery.locator('.bluebell-source-name')).toBeVisible()
    await expect(recovery.locator('details')).toHaveAttribute('open', '')
    await page.keyboard.press('Space')
    await expect(recovery.locator('details')).not.toHaveAttribute('open')
    await expect(recovery.locator('.bluebell-recovery-condition')).toBeVisible()
    await expect(recovery.locator('.bluebell-case-result')).toBeVisible()

    await page.reload({ waitUntil: 'networkidle' })
    await expect(page).toHaveURL(/#recovery$/)
    await expect(recovery).toBeFocused()
    await toc.locator('a[href$="#monitoring"]').click()
    await expect(page.locator('#monitoring')).toBeFocused()
    await page.goBack()
    await expect(page).toHaveURL(/#recovery$/)
    await expect(recovery).toBeFocused()
    await expect.poll(() => recovery.locator('h2').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 100
    })).toBe(true)
    await page.screenshot({ path: `artifacts/screenshots/bluebell-${width}-recovery.png` })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(2)
    await page.screenshot({ path: `artifacts/screenshots/bluebell-${width}-full.png`, fullPage: true })

    await page.getByRole('link', { name: /Selected Projects/ }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeFocused()
    await page.locator('.featured-project-list .project-case-link').nth(1).click()
    await page.locator('.next-project a').focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/onereport$/)
    await expect(page.locator('main h1')).toBeFocused()
    expect(errors).toEqual([])
  })
}
