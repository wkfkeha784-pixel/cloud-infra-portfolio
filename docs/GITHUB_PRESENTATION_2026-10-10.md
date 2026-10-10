# GitHub 소개 화면 정리 · 2026-10-10

## 범위와 기준

웹 개선 1–8단계 완료 이후, 웹에서 연결되는 GitHub 소개 화면을 정리한 별도 문서 작업입니다.

| 저장소 | 변경 파일 |
|---|---|
| `wkfkeha784-pixel/wkfkeha784-pixel` | Profile README · 프로필 정리 기록 |
| `wkfkeha784-pixel/cloud-infra-portfolio` | README · 이 기록 |

- 포트폴리오 기준 main: `00106ab46969c798e46f0a23d155e971a098d770`
- 프로필 반영 커밋: [`a27ea27`](https://github.com/wkfkeha784-pixel/wkfkeha784-pixel/commit/a27ea27e9de9ba03e84d7a465b92f38eb6a5d143)
- [프로필 작업 상세](https://github.com/wkfkeha784-pixel/wkfkeha784-pixel/blob/main/docs/GITHUB_PROFILE_POLISH_2026-10-10.md)
- [기존 웹 개선 완료 기록](PORTFOLIO_WEB_REDESIGN_2026-10-10.md)
- 작성 기준: [AGENTS.md](../AGENTS.md), [문서 시각화 공통 원칙](https://github.com/wkfkeha784-pixel/wkfkeha784-pixel/blob/main/DOCUMENTATION_VISUALIZATION_GUIDE.md)

## README 구성 개선

1. 첫 화면에서 Live Portfolio·Profile·Email에 바로 접근하도록 배치했습니다.
2. 4개 Case Study를 역할과 주요 경험을 담은 프로젝트 표로 연결했습니다.
3. PDF/Web/GitHub의 역할과 이 저장소가 웹 소스라는 점을 구분했습니다.
4. 기술 목록을 Application·Verification·Hosting으로 묶었습니다.
5. 소스 경로를 파일·폴더 바로가기 표로 정리했습니다.
6. 배포 흐름은 PR 검토 후 main CI/QA와 Vercel 배포가 나뉘는 관계를 작은 Mermaid로 표시했습니다.
7. 개인 성과·팀 결과·검증 조건·공개 연락처 정책을 유지했습니다.

## 실행 안내 검토

실제 `package.json`, `playwright.config.mjs`, 두 GitHub Actions workflow와 대조했습니다.

- lockfile이 없으므로 설치 안내는 `npm install`입니다.
- CI Node.js 버전은 20입니다.
- `lint`, `build`, `preview`, `qa:ui` 명령은 실제 scripts에 존재합니다.
- Playwright 기본 대상은 `http://127.0.0.1:4173`이며 `webServer` 설정이 없습니다.
- 따라서 build → Chromium 설치 → Preview 서버 시작 → 다른 터미널에서 QA 실행 순서를 안내합니다.
- main push에서 기존 Build CI·Browser QA가 자동 실행됩니다. 이 문서 수정 때문에 테스트를 추가하거나 웹 검증 설정을 바꾸지 않았습니다.

## 성과 및 공개 범위 검토

- Durian: HTTP 300/300 비동기 요청 수락과 DB Commit 완료를 구분했습니다.
- Bluebell: 팀장·Web–WAS 구축·Replacement 정상화 검증을 유지하며, 최종 통제 실행과 Trigger 설계를 구분했습니다.
- OneReport: Backend 개인 PR 근거와 팀 운영 Smoke 결과를 구분하고 비공개 직접 링크를 추가하지 않았습니다.
- Labbit: [PR #62](https://github.com/ktcloud4-SL/labbit-app/pull/62)의 2026-10-07 main 병합·코드/CI 검증과 실제 VM PTY/SFTP 후속 검증을 구분했습니다.
- 팀 프로젝트 저장소는 수정하지 않았습니다.
- 전화번호나 회사 제출용 PDF를 공개하지 않았습니다.

## 검증 및 인수인계

- Web Home + Durian/Bluebell/OneReport/Labbit 링크 모두 HTTP 200 HTML 응답 확인.
- README의 상대 링크 대상은 기준 GitHub tree의 실제 경로와 대조.
- 기존 프로필의 공개 Case Study·Labbit Repository/PR #59·이메일 링크 보존.
- Markdown 코드 Fence·Mermaid 노드/연결·수치·역할·검증 조건 검토.
- GitHub 반영 후 main 파일 내용과 변경 범위를 확인. 수정 범위는 위 두 저장소의 README와 정리 기록뿐입니다.
- GitHub 모바일·태블릿 실기기 렌더링 검증은 수행하지 않았습니다.
- React 소스·프로젝트 데이터·CSS·tests·workflows·배포 설정·PDF·PPTX를 수정하지 않았습니다.

웹 개선 완료 상태는 기존 기록을 참조합니다. 이 작업을 웹 재설계의 미완료 단계로 해석하거나 기존 1–8단계를 자동 재실행하지 않습니다. 프로젝트 사실이나 상태를 갱신할 때는 새로운 근거를 먼저 확인합니다.
