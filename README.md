# Cloud Infrastructure Portfolio

박희철의 회사 제출용 PDF Portfolio를 보완하는 공개 Web Portfolio입니다.

**Live:** https://cloud-infra-portfolio.vercel.app/

## 역할

- **PDF**: 회사 지원 시 제출하는 핵심 요약본
- **Web**: 프로젝트별 상세 Case Study
- **GitHub**: 코드, PR, 테스트, Evidence 원본

## Included

- Home / Core Focus
- Team Durian Case Study
- Bluebell Case Study
- OneReport Case Study
- Labbit Case Study
- Experience & Education
- Qualifications & Contact
- Responsive layout
- Automated desktop/mobile browser QA

## Stack

- React
- TypeScript
- Vite
- React Router
- Playwright
- GitHub Actions
- Vercel

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Browser QA

```bash
npm run qa:ui
```

GitHub Actions에서 다음을 자동 검증합니다.

- Home + 4개 Case Study 직접 접근
- Reload 후 route 유지
- Desktop / Mobile 렌더링
- Horizontal overflow
- 공개 Web의 전화번호 미노출
- Project navigation
- OneReport / Labbit Evidence link
- Full-page screenshot artifact

운영 흐름:

```text
Branch
→ Pull Request
→ Build CI
→ Browser QA
→ Screenshot Review
→ Merge
→ Vercel Production
```

Browser QA는 PR과 `main` push에서 실행됩니다.

## Structure

```text
src/
├─ components/
├─ data/
│  └─ projects.ts
├─ pages/
├─ styles/
├─ App.tsx
└─ main.tsx

tests/
└─ portfolio.spec.mjs
```

## Claim boundary

- 개인 기여와 Team / Project Result를 구분합니다.
- 검증되지 않은 KPI를 만들지 않습니다.
- OneReport는 Rule-based Analysis로 표현합니다.
- Labbit은 Ongoing 상태를 유지합니다.
- 접근이 불안정한 Repository 링크를 억지로 노출하지 않습니다.

## Public contact policy

공개 Web에는 Email과 GitHub만 노출하며 전화번호는 표시하지 않습니다.

> 전화번호가 포함된 회사 제출용 PDF Portfolio는 공개 저장소나 공개 Web에 게시하지 않고 지원 과정에서 별도로 제공합니다.
