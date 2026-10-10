# 공개 포트폴리오·GitHub 첫인상 점검 · 2026-10-10

후속 확인: **2026-10-11 (한국시간)**. 공개 계정 설정 1–4번과 README 문구 정리를 완료했습니다. 현재 상태와 유지보수 기준은 [문서 목록](README.md)에서 확인합니다.

## 목적과 범위

채용 담당자와 현업 엔지니어가 첫 화면과 몇 번의 링크 이동으로 보는 공개 경로를 점검했습니다. 전체 소스·모든 PR·원본 증빙을 다시 감사하는 작업은 아닙니다.

기준 main: `e421208294ad45bac87840a5a7b35ad60234474a`

| 공개 화면 | 확인한 내용 |
|---|---|
| [Web Home](https://cloud-infra-portfolio.vercel.app/) | 직무·이름·소개·대표 프로젝트·경력·자격·연락처 |
| Durian / Bluebell / OneReport / Labbit | 상세 첫 화면·개인/팀 역할·주요 결과·검증 조건·원본 이동 |
| [GitHub Profile](https://github.com/wkfkeha784-pixel) | 공개 Bio·Profile README·고정 항목·웹 링크 |
| [포트폴리오 저장소](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio) | About·README·프로젝트 바로가기·파일 경로 |
| [프로필 저장소](https://github.com/wkfkeha784-pixel/wkfkeha784-pixel) | README의 공개 문구·링크 |
| 개인 `rabbit-app` 포크 (최초 점검 당시) | 초기 main 소개 확인. 10/11 사용자가 삭제했으며 현재 진입 링크로 사용하지 않음 |
| [Labbit 공동 저장소](https://github.com/ktcloud4-SL/labbit-app) 및 PR #23/#25/#28/#59/#62 | 로그아웃 상태에서 접근 가능 여부·제목·개인 구현 근거 이동 |

최초 점검 당시 개인 계정의 공개 저장소는 3개였습니다. 10/11 포크 삭제 후 공개 저장소는 프로필과 포트폴리오 두 개입니다. 비공개 관리 자료를 공개하거나 그 목록/내용을 이 기록에 싣지 않았습니다. Labbit 공동 저장소와 협업용 포크의 문서·코드·설정을 수정하지 않았습니다.

## 2026-10-10 최초 점검

공개 진입 경로에서 채용 자료 사용을 막을 수준의 깨진 링크·임시 문구·미완성 화면은 발견하지 못했습니다. 이는 이번 범위에서의 판단이며 전체 코드의 결함 부재나 실제 채용 효과를 의미하지 않습니다.

- 웹의 직무·이름·대표 프로젝트가 먼저 읽히고, 상세의 역할·확인한 결과가 가깝게 배치되어 있습니다.
- Durian HTTP 수락/DB 완료, Bluebell 통제 실행/Trigger 설계, OneReport 개인 기여/팀 Smoke, Labbit 코드 검증/실제 VM 후속 범위를 유지했습니다.
- OneReport 비공개 Repository/PR 링크와 공개 전화번호는 진입 경로에 없습니다.
- GitHub Bio는 `Cloud Infrastructure Engineer | Kubernetes · Observability · Recovery`로 이미 정리되어 있습니다.
- 고정 항목의 현재 순서는 Labbit → cloud-infra-portfolio입니다. 카드 설명이 없는 포트폴리오보다 Labbit 팀 저장소가 먼저 보입니다.
- GitHub 공개 사이드바에는 포트폴리오 URL이 없습니다. README에는 링크가 있습니다.
- 포트폴리오 저장소 Description과 Topics가 비어 있습니다.
- 개인 rabbit-app main은 2026-09-18의 초기 스켈레톤 기준입니다. 저장소에는 최근 push와 별도 branch가 있어 폐기된 저장소로 단정하지 않습니다.

## 이번에 반영한 보완

| 파일 | 변경 |
|---|---|
| `index.html` | 명시적 favicon·Open Graph·Twitter Card 제목/소개/이미지/대체 설명 |
| `public/favicon.svg` | 기존 PH 모노그램·Navy/Teal 벡터 아이콘 |
| `public/favicon.ico` | 기존 ICO 요청에 대응하는 다중 크기 아이콘 |
| `public/social/portfolio.png` | 1200×630 공유 카드 · 이름·기존 소개 문구·기술·프로젝트명 |
| `README.md` | 이 점검 기록의 바로가기 |
| 이 기록 | 확인 범위·판단·직접 처리할 설정·검증 한계 |

기존 라이브 HTML에는 icon/Open Graph 태그가 없었고 `/favicon.ico` 요청은 HTML fallback을 반환했습니다. 이를 실제 이미지 리소스로 보완했습니다. 카드에는 임의의 수치·새로운 역할·검증 완료 주장을 넣지 않았습니다.

공유 카드는 기존 Navy/Teal과 Noto Sans KR를 사용한 정적 타이포그래피 이미지입니다. 글꼴은 공식 google/fonts의 Noto Sans KR로 렌더링했으며, 글꼴 파일이나 새로운 런타임 의존성을 저장소에 추가하지 않았습니다.

프로젝트별 별도 공유 카드를 만들거나 SPA의 프로젝트별 서버 렌더링/검색 최적화를 구현한 작업은 아닙니다. 본문 구성·프로젝트 사실·연락처·라우팅·CSS·테스트·CI 설정은 유지했습니다.

## 계정 설정 완료 · 2026-10-11

사용자가 설정 화면에서 변경한 뒤 공개 API·로그아웃 HTML·공개 저장소 검색으로 확인했습니다.

| 항목 | 최종 상태 |
|---|---|
| 포트폴리오 Description | 박희철의 클라우드 인프라 포트폴리오 — Kubernetes 운영·AWS 서비스 통합·복구 검증 사례 |
| 포트폴리오 Website | `https://cloud-infra-portfolio.vercel.app/` |
| Topics | `portfolio`, `cloud-infrastructure`, `kubernetes`, `aws` |
| About 표시 | 사용자가 Releases·Packages를 해제하고 Deployments를 유지했다고 완료 보고. 공개 화면에서 Releases·Packages 미표시 확인; Deployments의 별도 표시 상태는 검증하지 않음 |
| 고정 순서 | 포트폴리오 → `ktcloud4-SL/labbit-app` |
| 프로필 URL | `https://cloud-infra-portfolio.vercel.app/` |
| 프로필 Bio | 기존 Cloud Infrastructure Engineer / Kubernetes / Observability / Recovery 소개 유지 |
| 개인 포크 | 사용자가 `wkfkeha784-pixel/rabbit-app` 삭제. 공개 GET 404·검색 목록에서 제외됨을 확인 |
| 프로필 사진 | 기존 identicon 유지. 변경할 필수 항목은 아님 |

React·TypeScript는 웹 소스의 실제 구현 기술이지만 Topics는 직무와 프로젝트 주제로 좁혔습니다. 소스의 Languages 표시를 개인 숙련도 주장으로 사용하지 않습니다.

### 포크 삭제 전 확인한 내용

삭제 전에 팀 `main`과 남아 있던 브랜치 세 개를 비교했습니다.

| 브랜치 | 확인한 HEAD | 팀 main 대비 추가 커밋 | 뒤처진 커밋 |
|---|---|---:|---:|
| `main` | `805cfddd2694f4309a56601cdc34452cd74e03b3` | 0 | 279 |
| `fix/runtime-structured-logging` | `8f6de38b5b5d2278f20c27b9ca2998a0f760e8e7` | 0 | 280 |
| `chore/repository-skeleton` | `bbab936038cbf0f5d79da244fd270d99be40ff54` | 0 | 285 |

브랜치 비교 당시 팀 main 기준의 수치입니다. 열린 팀 PR 세 개 중 사용자 PR #81은 팀 저장소의 `docs/LBT-53-frontend-handoff-20261008` 브랜치를 사용했습니다. 개인 포크 자체의 PR #1은 병합되지 않은 채 철회된 문서 제안이었고, 이슈·위키·토론 기능은 꺼져 있었습니다.

이 근거로 현재 협업과 포트폴리오에 포크가 필요하지 않다고 판단했습니다. PC 로컬의 미전송 작업·원격 설정이나 삭제된 모든 과거 브랜치까지 확인한 것은 아닙니다. 팀 저장소·PR·코드는 수정하지 않았습니다.

### 후속 README 정리

- 프로필의 추상적인 표현과 영어 조합을 줄이고 담당한 일·확인한 결과를 한국어 문장으로 정리했습니다.
- 프로젝트별 개인 역할·팀 결과·수치·검증 조건·공개 근거 링크를 유지했습니다.
- 포트폴리오 README는 프로젝트, 웹 구현, 실행·검증 명령과 소스 경로 중심으로 줄였습니다.
- 긴 작업 기록과 배포 설명은 문서 목록으로 모았습니다. 기존 기록은 유지했습니다.
- 두 저장소의 `AGENTS.md`에 공개 문구·근거·기록 관리 기준을 추가했습니다. 도구 사용 여부나 작성자의 숙련도를 허위로 설명하지 않습니다.
- 프로필·포트폴리오 저장소는 각각 공개 소개와 사이트 소스 역할이 있어 공개로 유지합니다. 공개 범위를 바꿀 필요가 있는 자료는 먼저 실제 노출·연결 용도를 확인합니다.

GitHub의 고정 항목 설정 안내: [공식 문서](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile). 포크 삭제 안내: [공식 문서](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository).

## 확인한 근거와 검증 한계

아래는 10/10 최초 점검의 결과입니다. 삭제 후 목록과 계정 설정, 앱 검사 결과는 앞의 완료 표와 마지막 후속 확인을 기준으로 읽습니다.

- Web Home + 4개 상세: 로그아웃 HTTP GET에서 모두 200 HTML 응답.
- 개인 공개 저장소 3개 + Labbit 공동 저장소 + PR 5개: 로그아웃 HTTP GET에서 모두 200이며 로그인 화면으로 이동하지 않음.
- 공개 저장소 목록은 GitHub public 검색과 계정 소유 저장소의 visibility 정보로 교차 확인.
- GitHub Profile의 Bio·고정 순서·외부 URL은 로그인하지 않은 공개 HTML로 확인.
- 기존 GitHub Actions 화면 캡처에서 Home/상세 첫 화면과 모바일 하단을 재검토. 해당 앱 소스 29개 파일은 기준 main과 blob SHA가 일치함을 확인.
- 이번 세션에서 새 실기기 탐색이나 새 브라우저 조작을 수행한 것은 아님.
- 신규 공유 PNG와 아이콘의 렌더링·글자·여백을 이미지로 확인.
- 반영 시 GitHub tree 차이는 위 파일로 한정하고, main의 Build/Browser QA 및 배포 리소스를 확인.
- 공유 플랫폼의 실제 미리보기 렌더링이나 캐시는 별도 확인하지 않음. 메타 태그·이미지 URL 제공과 실제 플랫폼 표시를 구분.
- 이전 PDF/PPTX와 증명서 원본은 이번 공개 진입 경로 점검의 대상이 아님.

최신 실행 결과는 [main GitHub Actions](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions?query=branch%3Amain), 공개 반영은 [Live Portfolio](https://cloud-infra-portfolio.vercel.app/)에서 확인합니다. 수동 설정은 위 후속 확인 표의 상태로 완료 처리했습니다.

## 코드 검증과 후속 문서 확인

아이콘·메타 태그를 추가한 앱 기준은 `b12b056e99becfd88ed14af8f5ac3412803ff752`입니다.

- [Build CI 38060504622](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38060504622): PASS.
- [Browser QA 38060504572](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38060504572): **54개 PASS**. 포트폴리오 페이지 테스트이며 Labbit VM 연동 검증을 뜻하지 않습니다.
- Vercel Production `dpl_AuvU5KYp9sTimfHLFMXTP1JVUsFA`: READY, 위 앱 commit과 일치.
- 홈·네 상세와 favicon SVG/ICO·공유 PNG가 HTTP 200. 이미지 Content-Type과 로컬 생성본 바이트 일치 확인.
- 10/11 설정 정리 후 홈·네 상세, 프로필, Labbit 팀 저장소와 PR #59/#62를 로그아웃 GET으로 다시 확인했고 모두 HTTP 200.
- 공개 저장소 검색 결과는 프로필·포트폴리오 두 개입니다. 삭제한 포크를 현재 안내 링크로 사용하지 않습니다.
- 이번 후속 변경은 README·작성 지침·관리 기록만 대상으로 합니다. 앱·테스트·workflow·배포 설정과 프로젝트 사실은 바꾸지 않았습니다.
- 후속 문서의 상대 링크·코드 블록·필수 사실과 파일 변경 범위를 확인하고 main 반영본을 작성본과 비교합니다.
- 새 브라우저 조작·실기기 검증·공유 플랫폼의 캐시 확인을 추가 수행한 것으로 기록하지 않습니다.

남아 있는 필수 계정 정리 단계는 없습니다. 새 프로젝트 근거와 공개 링크 변경이 생기면 해당 범위를 갱신합니다.

프로필 문구·관리 기록 반영: [`458911a`](https://github.com/wkfkeha784-pixel/wkfkeha784-pixel/commit/458911aa60bc0107d1efc5e78971273a3aed0bae). 포트폴리오의 이 후속 반영은 문서 네 파일만 변경합니다.
