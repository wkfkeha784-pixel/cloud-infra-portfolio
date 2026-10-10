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

  const cases = page.locator('#load-scaling .durian-case, #request-recovery .durian-case, #evidence .durian-case')
  await expect(cases).toHaveCount(3)

  await expect(page.getByText('300 / 300 HTTP 200 · Concurrency 50')).toBeVisible()
  await expect(page.getByText('POST_CUTOVER_E2E_SUCCESS')).toBeVisible()
  await expect(page.getByText('Final Health PASS 43 / WARN 0 / FAIL 0')).toBeVisible()

  await expect(cases.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cases.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cases.nth(2).getByText('PROJECT', { exact: true })).toBeVisible()
  for (const item of await cases.all()) {
    await expect(item.locator('time')).toHaveCount(1)
    await item.locator('summary').click()
    await expect(item.locator('.durian-source-name')).toBeVisible()
  }
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

test('onereport: PR evidence cards preserve validation snapshots and hide private-source links', async ({ page }) => {
  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(3)

  await expect(cards.nth(0).getByText('PR 시점 Backend 전체 테스트 41 passed · OpenAPI 생성 PASS')).toBeVisible()
  await expect(cards.nth(1).getByText('Timeline REST → { items, total } Contract 정합')).toBeVisible()
  await expect(cards.nth(2).getByText('LLM / AI 분석이 아니라 Rule-based Analysis입니다.')).toBeVisible()
  await expect(page.locator('a[href*="github.com/ktcloud4-SL/hackathon"]')).toHaveCount(0)
  await expect(page.getByText(/OneReport 팀 저장소는 비공개/)).toBeVisible()

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('MY', { exact: true })).toBeVisible()
})

test('labbit: evidence cards keep ongoing state, contract boundary, and PR snapshots visible', async ({ page }) => {
  await page.goto('/projects/labbit', { waitUntil: 'networkidle' })

  await expect(page.getByText('IN PROGRESS · 2026-10-10', { exact: true })).toBeVisible()

  const cards = page.locator('.evidence-snapshot-card')
  await expect(cards).toHaveCount(4)

  await expect(cards.nth(1).getByText('Mutation 401 → Login 복귀 · stale me 인증 Cache 폐기')).toBeVisible()
  await expect(cards.nth(2).getByText('Production Build는 설정과 무관하게 HTTP Consumer 사용')).toBeVisible()
  await expect(cards.nth(3).getByText('PR 기록의 기존 UI HEAD: capture 17 / 17')).toBeVisible()
  await expect(cards.nth(3).getByText(/프로젝트 전체 완료나 merge commit 재측정 수치로 확대하지 않습니다/)).toBeVisible()

  await expect(page.getByText('PR #62 main 병합 · Terminal·File 코드/CI 검증 완료', { exact: true })).toBeVisible()
  await expect(page.getByText(/Terminal·File은 PR #62로 main에 통합했습니다/)).toBeVisible()

  await expect(cards.nth(0).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(0).getByText(/실제 OpenStack VM PTY\/SFTP E2E는 후속 통합 검증/)).toBeVisible()

  for (const href of [
    'https://github.com/ktcloud4-SL/labbit-app/pull/62',
    'https://github.com/ktcloud4-SL/labbit-app/pull/23',
    'https://github.com/ktcloud4-SL/labbit-app/pull/25',
    'https://github.com/ktcloud4-SL/labbit-app/pull/28',
  ]) {
    await expect(cards.locator(`a[href="${href}"]`)).toHaveCount(1)
  }

  await expect(cards.nth(1).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('MY', { exact: true })).toBeVisible()
  await expect(cards.nth(3).getByText('MY', { exact: true })).toBeVisible()
})

test('home: four case-study cards and contact links are present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const caseStudyLinks = page.locator('.project-card .project-case-link')
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

test('evidence: only publicly accessible repository and PR links are exposed', async ({ page }) => {
  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })
  await expect(page.locator('a[href*="github.com/ktcloud4-SL/hackathon"]')).toHaveCount(0)

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

  await page.locator('.featured-project-list .project-case-link').first().click()
  await expect(page).toHaveURL(/\/projects\/durian$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2)

  await page.locator('.next-project').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await page.locator('.next-project a').click()
  await expect(page).toHaveURL(/\/projects\/bluebell$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2)

  await page.getByRole('link', { name: /Selected Projects/ }).click()
  await expect(page).toHaveURL(/\/#projects$/)
  await expect.poll(() => page.evaluate(() => {
    const section = document.querySelector('#projects').getBoundingClientRect()
    const header = document.querySelector('.site-header').getBoundingClientRect()
    return section.top >= header.bottom && section.top <= header.bottom + 32
  })).toBe(true)
})

test('home: introduction leads to both featured cases and the projects section', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const featured = page.getByRole('navigation', { name: '먼저 볼 프로젝트' })

  await featured.getByRole('link', { name: /Team Durian/ }).click()
  await expect(page).toHaveURL(/\/projects\/durian$/)
  await expect(page.locator('h1')).toContainText('Team Durian')

  await page.goto('/', { waitUntil: 'networkidle' })
  await featured.getByRole('link', { name: /Bluebell/ }).click()
  await expect(page).toHaveURL(/\/projects\/bluebell$/)
  await expect(page.locator('h1')).toContainText('Bluebell')

  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: '프로젝트 보기', exact: true }).click()
  await expect(page).toHaveURL(/\/#projects$/)
  await expect.poll(() => page.evaluate(() => {
    const section = document.querySelector('#projects').getBoundingClientRect()
    const header = document.querySelector('.site-header').getBoundingClientRect()
    return section.top >= header.bottom && section.top <= header.bottom + 32
  })).toBe(true)
})


test('v2.10 sync: home and project claim boundaries expose the refreshed evidence', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const projects = page.getByRole('region', { name: '운영과 복구를 검증한 대표 프로젝트' })
  await expect(projects.getByText(/모니터링 인수/)).toBeVisible()
  await expect(projects.getByText('Terraform', { exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: '서비스 구현과 팀 시스템 통합 경험' }).getByText(/HTTP·WebSocket Contract Consumer/)).toBeVisible()

  await page.goto('/projects/durian', { waitUntil: 'networkidle' })
  await expect(page.getByText('Terraform worker-03 Drift Recovery', { exact: true })).toBeVisible()
  await expect(page.getByText(/Terraform 범위는 worker-03 단일 Compute Instance/)).toBeVisible()

  await page.goto('/projects/bluebell', { waitUntil: 'networkidle' })
  await expect(page.getByText(/Recovery Trigger는 EventBridge → SSM 구조로 설계했지만 최종 7\/13 E2E에서는 EventBridge Rule 2개를 DISABLED/)).toBeVisible()
  await expect(page.getByText(/EventBridge Rule 2개를 DISABLED/)).toBeVisible()

  await page.goto('/projects/onereport', { waitUntil: 'networkidle' })
  await expect(page.getByText(/PR #30 시점 실서버 \/api\/health는 502/)).toBeVisible()
  await expect(page.getByText(/8\/21 운영 Domain Smoke에서 FINAL: PASS/)).toBeVisible()
})


test('home: project summaries keep result scope visible and open the matching case', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const featured = page.getByRole('region', { name: '운영과 복구를 검증한 대표 프로젝트' })
  const additional = page.getByRole('region', { name: '서비스 구현과 팀 시스템 통합 경험' })
  await expect(featured.getByRole('article')).toHaveCount(2)
  await expect(additional.getByRole('article')).toHaveCount(2)

  const durian = featured.getByRole('article').filter({ hasText: 'Team Durian' })
  await expect(durian.getByText(/HTTP 200은 비동기 요청 수락 기준/)).toBeVisible()
  const bluebell = featured.getByRole('article').filter({ hasText: 'Bluebell' })
  await expect(bluebell.getByText(/복구 자동화는 팀 구현/)).toBeVisible()
  const onereport = additional.getByRole('article').filter({ hasText: 'OneReport' })
  await expect(onereport.getByText('PROJECT', { exact: true })).toBeVisible()
  await expect(onereport.getByText(/규칙 기반 분석 · 실제 공공기관 연계 없음/)).toBeVisible()
  const labbit = additional.getByRole('article').filter({ hasText: 'Labbit' })
  await expect(labbit.getByText(/IN PROGRESS/)).toBeVisible()
  await expect(labbit.getByText(/실제 OpenStack VM PTY\/SFTP E2E는 후속/)).toBeVisible()

  for (const [slug, name] of [['durian', 'Team Durian'], ['bluebell', 'Bluebell'], ['onereport', 'OneReport'], ['labbit', 'Labbit']]) {
    const card = page.getByRole('article').filter({ hasText: name })
    await card.getByRole('link').click()
    await expect(page).toHaveURL(new RegExp('/projects/' + slug + '$'))
    await expect(page.locator('h1')).toContainText(name)
    await page.goto('/', { waitUntil: 'networkidle' })
  }
})
