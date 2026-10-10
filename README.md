# 박희철의 클라우드 인프라 포트폴리오

AWS·Kubernetes 프로젝트에서 맡은 일과 운영·복구 검증 결과를 정리한 웹 포트폴리오입니다. 이 저장소에는 포트폴리오 사이트의 소스와 브라우저 테스트가 있습니다.

**[포트폴리오 열기 →](https://cloud-infra-portfolio.vercel.app/)** · [GitHub 프로필](https://github.com/wkfkeha784-pixel) · [이메일](mailto:wkfkeha784@gmail.com)

## 프로젝트

| 프로젝트 | 담당한 일과 검증 범위 |
|---|---|
| [**Team Durian**](https://cloud-infra-portfolio.vercel.app/projects/durian) | Kubernetes·Redis·Kafka·KEDA 운영, HTTP 요청 수락과 확장·축소, Terraform worker-03 재생성·재가입 |
| [**Bluebell**](https://cloud-infra-portfolio.vercel.app/projects/bluebell) | 팀장, AWS Web–WAS 구축과 인스턴스 교체 후 서비스 정상화 검증 |
| [**OneReport**](https://cloud-infra-portfolio.vercel.app/projects/onereport) | Backend 도메인·DB·라우팅·API 계약과 규칙 기반 분석 |
| [**Labbit**](https://cloud-infra-portfolio.vercel.app/projects/labbit) | Frontend·디자인, HTTP·WebSocket 연동, Terminal·파일 기능의 코드·CI 검증 |

상세 페이지에는 서비스 구성, 해결한 문제, 개인 기여와 팀 결과를 정리했습니다. 결과를 확인한 조건과 아직 검증하지 않은 범위도 함께 표시합니다.

- **Durian:** HTTP 300/300은 비동기 요청 수락 결과입니다. DB 저장 300건 완료를 의미하지 않습니다.
- **Bluebell:** 최종 E2E는 EventBridge 규칙 2개를 비활성화한 통제 실행입니다. 자동 실행 설계와 구분합니다.
- **OneReport:** 규칙 기반 분석을 구현했습니다. PR #30 당시 health 502와 배포 정상화 후 8/21 운영 Smoke Test PASS는 서로 다른 시점의 결과입니다.
- **Labbit:** PR #62의 병합·코드·CI 검증을 완료했습니다. 실제 OpenStack VM의 PTY/SFTP 연동은 후속 검증 범위입니다.

팀 프로젝트의 공개 코드·PR은 각 상세 페이지에서 연결합니다. 비공개 저장소는 공개 가능한 검증 자료로 소개합니다.

## 웹 구현

React · TypeScript · Vite · React Router로 구성했습니다. Playwright와 GitHub Actions로 브라우저 동작을 검사하고 Vercel에 배포합니다.

이 목록은 포트폴리오 사이트의 구현 기술입니다. 프로젝트별 담당 기술과 역할은 위 상세 페이지에서 확인할 수 있습니다.

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

[이메일](mailto:wkfkeha784@gmail.com) · [GitHub](https://github.com/wkfkeha784-pixel)

전화번호가 포함된 회사 제출용 PDF는 지원 과정에서 별도로 제공합니다. 공개 웹과 이 저장소에는 게시하지 않습니다.
