import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'

const routes = [
  ['home', '/', '박희철'],
  ['durian', '/projects/durian', 'Team Durian'],
  ['bluebell', '/projects/bluebell', 'Bluebell'],
  ['onereport', '/projects/onereport', 'OneReport'],
  ['labbit', '/projects/labbit', 'Labbit'],
]

test.beforeAll(async () => {
  await fs.mkdir('artifacts/screenshots', { recursive: true })
})

for (const [name, route, marker] of routes) {
  test(`${name}: route renders, reloads, and has no horizontal overflow`, async ({ page }, testInfo) => {
    const response = await page.goto(route, { waitUntil: 'networkidle' })
    expect(response, `${route} should return a response`).not.toBeNull()
    expect(response.status(), `${route} should not return an HTTP error`).toBeLessThan(400)

    await page.evaluate(() => document.fonts?.ready)
    await expect(page.getByText(marker, { exact: false }).first()).toBeVisible()

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }))
    expect(
      overflow.scrollWidth,
      `${route} has horizontal overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
    ).toBeLessThanOrEqual(overflow.innerWidth + 2)

    const bodyText = await page.locator('body').innerText()
    expect(bodyText).not.toContain('010-3247-0587')
    expect(bodyText).not.toContain('01032470587')

    await page.screenshot({
      path: `artifacts/screenshots/${testInfo.project.name}-${name}.png`,
      fullPage: true,
    })

    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.getByText(marker, { exact: false }).first()).toBeVisible()
  })
}

test('durian: validation evidence snapshots expose dated proof and scope', async ({ page }) => {
  await page.goto('/projects/durian', { waitUntil: 'networkidle' })

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)

  await expect(page.getByText('300 / 300 HTTP 200 · Concurrency 50')).toBeVisible()
  await expect(page.getByText('POST_CUTOVER_E2E_SUCCESS')).toBeVisible()
  await expect(page.getByText('Final Health PASS 43 / WARN 0 / FAIL 0')).toBeVisible()

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('PROJECT', { exact: true })).toBeVisible()
})

test('bluebell: recovery validation evidence exposes images, scope, and completion criteria', async ({ page }) => {
  await page.goto('/projects/bluebell', { waitUntil: 'networkidle' })

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)
  await expect(cards.locator('img')).toHaveCount(3)

  await expect(page.getByText('AWS Web/WAS + Local DB 하이브리드 3-Tier 인프라', { exact: true })).toBeVisible()
  await expect(page.getByText('환경 경계: AWS Web/WAS/Bastion/Monitoring · Local(On-Premise) HAProxy/MariaDB · 운영 지원: Ansible/Swarm/Recovery', { exact: true })).toBeVisible()
  await expect(page.getByText('Web / WAS Target Group 2 healthy · 0 unhealthy')).toBeVisible()
  await expect(page.getByText('Target Group healthy · / · /api/health · /api/server 200')).toBeVisible()
  await expect(cards.nth(2).getByText('Grafana 관측 대상 갱신', { exact: true })).toBeVisible()

  const evidenceImagesLoaded = await cards.locator('img').evaluateAll((images) =>
    images.every((image) => image.complete && image.naturalWidth > 0),
  )
  expect(evidenceImagesLoaded).toBe(true)

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('PROJECT', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('PROJECT', { exact: true })).toBeVisible()
})

test('onereport: PR evidence cards preserve validation snapshots and rule-based boundary', async ({ page }) => {
  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)

  await expect(cards.nth(0).getByText('PR 시점 Backend 전체 테스트 41 passed · OpenAPI 생성 PASS')).toBeVisible()
  await expect(cards.nth(1).getByText('Timeline REST → { items, total } Contract 정합')).toBeVisible()
  await expect(cards.nth(2).getByText('LLM / AI 분석이 아니라 Rule-based Analysis입니다.')).toBeVisible()

  for (const href of [
    'https://github.com/ktcloud4-SL/hackathon/pull/9',
    'https://github.com/ktcloud4-SL/hackathon/pull/14',
    'https://github.com/ktcloud4-SL/hackathon/pull/27',
  ]) {
    await expect(page.locator('.evidence-snapshot-card').locator(`a[href="${href}"]`)).toHaveCount(1)
  }

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('MY', { exact: true })).toBeVisible()
})

test('labbit: evidence cards keep ongoing state, contract boundary, and PR snapshots visible', async ({ page }) => {
  await page.goto('/projects/labbit', { waitUntil: 'networkidle' })

  await expect(page.getByText('ONGOING', { exact: true })).toBeVisible()

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)

  await expect(cards.nth(0).getByText('Mutation 401 → Login 복귀 · stale me 인증 Cache 폐기')).toBeVisible()
  await expect(cards.nth(1).getByText('Production Build는 설정과 무관하게 HTTP Consumer 사용')).toBeVisible()
  await expect(cards.nth(2).getByText('PR 기록의 기존 UI HEAD: capture 17 / 17')).toBeVisible()
  await expect(cards.nth(2).getByText(/프로젝트 전체 완료나 merge commit 재측정 수치로 확대하지 않습니다/)).toBeVisible()

  for (const href of [
    'https://github.com/ktcloud4-SL/labbit-app/pull/23',
    'https://github.com/ktcloud4-SL/labbit-app/pull/25',
    'https://github.com/ktcloud4-SL/labbit-app/pull/28',
  ]) {
    await expect(cards.locator(`a[href="${href}"]`)).toHaveCount(1)
  }

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('MY', { exact: true })).toBeVisible()
})

test('home: four case-study cards and contact links are present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const caseStudyLinks = page.getByRole('link', { name: /View Case Study/ })
  await expect(caseStudyLinks).toHaveCount(4)

  for (const href of [
    '/projects/durian',
    '/projects/bluebell',
    '/projects/onereport',
    '/projects/labbit',
  ]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible()
  }

  await expect(page.locator('#contact a[href="mailto:wkfkeha784@gmail.com"]')).toBeVisible()
  await expect(page.locator('#contact a[href="https://github.com/wkfkeha784-pixel"]')).toBeVisible()

  const timelineTitles = await page.locator('#experience .timeline article h3').allTextContents()
  expect(timelineTitles).toEqual([
    '육군사관학교 전자공학과 졸업',
    '대한민국 육군 · 정보통신 병과 장교',
    'KT Cloud Infrastructure Bootcamp',
  ])
  const timelineDates = await page.locator('#experience .timeline article > span').allTextContents()
  expect(timelineDates).toEqual([
    '2016.02–2020.03',
    '2020.03–2025.09',
    '2026.05.12–2026.12.03',
  ])
  await expect(page.getByText('AWS Web/WAS + Local DB 하이브리드 3-Tier 인프라', { exact: true }).first()).toBeVisible()
})

test('evidence: public repository and PR links are wired correctly', async ({ page }) => {
  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })
  await expect(page.locator('a[href="https://github.com/ktcloud4-SL/hackathon"]')).toHaveCount(1)
  for (const href of [
    'https://github.com/ktcloud4-SL/hackathon/pull/9',
    'https://github.com/ktcloud4-SL/hackathon/pull/14',
    'https://github.com/ktcloud4-SL/hackathon/pull/27',
  ]) {
    await expect(page.locator('.evidence-snapshot-card').locator(`a[href="${href}"]`)).toHaveCount(1)
  }

  await page.goto('/projects/labbit', { waitUntil: 'networkidle' })
  await expect(page.locator('a[href="https://github.com/ktcloud4-SL/labbit-app"]')).toHaveCount(1)
  for (const href of [
    'https://github.com/ktcloud4-SL/labbit-app/pull/23',
    'https://github.com/ktcloud4-SL/labbit-app/pull/25',
    'https://github.com/ktcloud4-SL/labbit-app/pull/28',
  ]) {
    await expect(page.locator('.evidence-snapshot-card').locator(`a[href="${href}"]`)).toHaveCount(1)
  }
})


test('navigation: project routes start at top while the home projects anchor remains usable', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.locator('#projects').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await page.getByRole('link', { name: /View Case Study/ }).first().click()
  await expect(page).toHaveURL(/\/projects\/durian$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2)

  await page.locator('.next-project').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await page.locator('.next-project a').click()
  await expect(page).toHaveURL(/\/projects\/bluebell$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2)

  await page.getByRole('link', { name: /Selected Projects/ }).click()
  await expect(page).toHaveURL(/\/#projects$/)
  await expect.poll(async () =>
    page.locator('#projects').evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
  ).toBeLessThanOrEqual(2)
})
