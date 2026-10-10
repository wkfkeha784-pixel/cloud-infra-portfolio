# 공개 포트폴리오·GitHub 첫인상 점검 · 2026-10-10

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
| [개인 rabbit-app 포크](https://github.com/wkfkeha784-pixel/rabbit-app) | 초기 main 소개와 최신 공동 저장소의 혼동 가능성 |
| [Labbit 공동 저장소](https://github.com/ktcloud4-SL/labbit-app) 및 PR #23/#25/#28/#59/#62 | 로그아웃 상태에서 접근 가능 여부·제목·개인 구현 근거 이동 |

개인 계정에서 공개된 저장소는 위 개인 저장소 3개입니다. 비공개 관리 자료를 공개하거나 그 목록/내용을 이 기록에 싣지 않았습니다. Labbit 공동 저장소와 협업용 포크의 문서·코드·설정을 수정하지 않았습니다.

## 첫인상 판단

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

## 사용자가 직접 처리할 계정 설정

이 항목은 문서/파일 변경과 구분되는 GitHub 계정·저장소 화면 설정이며 이번 작업에서 변경하지 않았습니다.

| 우선순위 | 위치 | 권장 설정 |
|---|---|---|
| 1 | 포트폴리오 저장소 → About 옆 톱니바퀴 | Description: **박희철의 클라우드 인프라 포트폴리오 — Kubernetes 운영·AWS 서비스 통합·복구 검증 사례** |
| 1 | 같은 About 설정 | Website는 기존 `https://cloud-infra-portfolio.vercel.app/` 유지. Topics: `portfolio`, `cloud-infrastructure`, `kubernetes`, `aws`, `react`, `typescript` |
| 2 | Profile → Customize your pins | cloud-infra-portfolio를 첫 번째, ktcloud4-SL/labbit-app을 두 번째로 배치. 고정 개수를 억지로 늘리지 않음 |
| 2 | [Public profile 설정](https://github.com/settings/profile) → URL | `https://cloud-infra-portfolio.vercel.app/` 추가. 기존 Bio는 유지 가능 |
| 3 | 개인 rabbit-app → About | **Labbit 협업용 개인 포크 — 최신 공동 저장소: ktcloud4-SL/labbit-app** |
| 선택 | Public profile → Profile picture | 기본 identicon은 그대로 사용 가능. 바꾸고 싶다면 단정한 사진 또는 PH 모노그램으로 통일 |

rabbit-app은 업무에 사용하는 포크인지 먼저 판단합니다. 공개 이름이나 초기 main만 보고 삭제·보관 처리하지 않습니다. 최신 근거를 확인하려는 방문자는 현재 README의 Labbit 공동 저장소와 개인 PR 링크로 안내합니다. 실제 공동 저장소의 README는 팀의 문서이므로 개인 포트폴리오 목적으로 변경하지 않습니다.

GitHub의 고정 항목 설정/순서 변경 안내: [공식 문서](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile). 취업용 Profile 구성 안내: [공식 문서](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume).

## 확인한 근거와 검증 한계

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

최신 실행 결과는 [main GitHub Actions](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions?query=branch%3Amain), 공개 반영은 [Live Portfolio](https://cloud-infra-portfolio.vercel.app/)에서 확인합니다. 위 수동 설정은 사용자가 처리한 후 실제 공개 화면을 다시 확인하기 전까지 완료로 표시하지 않습니다.
