# Cloud Infrastructure Portfolio · 박희철

AWS·OpenStack·Kubernetes 기반 팀 프로젝트의 **서비스 구조, 담당 역할, 장애 분석 및 복구 검증**을 소개하는 웹 포트폴리오입니다. 이 저장소에는 React 사이트 소스와 반응형·브라우저 회귀 테스트가 있습니다.

**[웹 포트폴리오 열기](https://cloud-infra-portfolio.vercel.app/)** · [GitHub 프로필](https://github.com/wkfkeha784-pixel) · [이메일](mailto:wkfkeha784@gmail.com)

## 프로젝트

| 서비스 | 담당 역할 및 대표 검증 |
|---|---|
| [**Durian — 수강신청 폭주 대응 대기열 서비스**](https://cloud-infra-portfolio.vercel.app/projects/durian) | OpenStack/Kubernetes·Redis/Kafka/KEDA 운영, Kafka 통신·인증·권한 장애 분석과 모니터링 인수. 팀 시험에서 **HTTP 300/300 비동기 요청 수락, Consumer 1→4→1** 확인. 단일 worker-03 복구 검증 참여 |
| [**Bluebell — 장애 복구·모니터링 웹 API 운영환경**](https://cloud-infra-portfolio.vercel.app/projects/bluebell) | **5인 팀의 팀장**·AWS Web/WAS 구축 및 로드밸런서 연결. 인스턴스 교체 후 Target Group·HTTP 응답·관측 정상화 검증 |
| [**OneReport — 복합사고 다기관 공동대응 플랫폼 PoC**](https://cloud-infra-portfolio.vercel.app/projects/onereport) | Backend **공동 구현**. Report/Incident 모델, 기관 배정, Timeline REST/SSE와 AWS PoC Smoke Test |
| [**Labbit — 클라우드 가상 실습실 플랫폼**](https://cloud-infra-portfolio.vercel.app/projects/labbit) | Frontend/UI·UX 및 API/WSS·Terminal/File/Live 브라우저 검증. 인증·권한·파일 충돌·오류 상태 점검, **서울–오사카 DR 절차·중단 조건 사전검토 진행 중** |

웹 상세 페이지에서 각 서비스의 아키텍처, 구현·운영 과정, 검증 결과를 확인할 수 있습니다. Labbit의 공개 코드와 관련 PR도 상세 페이지에서 연결합니다.

## 웹 구현

React · TypeScript · Vite · React Router로 구성했습니다. Playwright와 GitHub Actions로 브라우저 동작을 검사하고 Vercel에 배포합니다.

## 로컬 실행

GitHub Actions는 Node.js 20을 사용합니다.

```bash
npm install
npm run dev
```

## 검증

개발 서버를 종료한 뒤 아래 명령을 실행합니다.

```bash
npm run lint
npm run build
npx playwright install chromium
npm run preview -- --host 127.0.0.1
```

Preview 서버를 켜 둔 상태로 **다른 터미널**에서 브라우저 테스트를 실행합니다.

```bash
npm run qa:ui
```

기본 대상은 `http://127.0.0.1:4173`입니다. 테스트가 서버를 자동으로 시작하지 않으므로 Preview 서버를 먼저 실행해야 합니다.

테스트는 홈·네 프로젝트 상세의 이동과 새로고침, 화면 폭에 따른 가로 넘침, 키보드 탐색, 섹션 링크와 브라우저 뒤로 가기를 검사합니다. 공개 연락처와 비공개 링크 노출 여부, 프로젝트 설명의 주요 검증 조건도 확인합니다.

## 소스 구성

| 경로 | 내용 |
|---|---|
| [`src/data/projects.ts`](src/data/projects.ts) · [`src/data/`](src/data/) | 프로젝트 역할·결과·검증 자료와 상세 구성 |
| [`src/pages/`](src/pages/) · [`src/components/`](src/components/) | 홈·프로젝트 상세·공통 화면 |
| [`src/styles/`](src/styles/) | 공통·프로젝트별 반응형 스타일 |
| [`src/App.tsx`](src/App.tsx) · [`src/main.tsx`](src/main.tsx) | 라우팅·앱 진입 |
| [`tests/`](tests/) · [`.github/workflows/`](.github/workflows/) | 브라우저 테스트·CI |
| [`docs/`](docs/README.md) | 웹 구성 변경·공개 화면 점검·배포 기록 |

## 연락처

[이메일](mailto:wkfkeha784@gmail.com) · [GitHub 프로필](https://github.com/wkfkeha784-pixel)
