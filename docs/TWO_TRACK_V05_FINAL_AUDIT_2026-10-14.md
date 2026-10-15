# 웹·PDF 2트랙 v0.5 독립 감사 · 2026-10-14

> 사용자 승인 전 검토 기록. PR #26은 Draft 유지. 운영 main·기제출 서류·13쪽 Master 변경 없음.

## 판단

v0.5의 10쪽 PDF와 편집용 PPTX는 그대로 유지한다. PDF는 담당 업무·결과·한계의 빠른 요약, 웹은 상세 조건·문제 해결·근거 탐색이라는 역할 구분이 성립한다. 시각 검토에서 전면 재설계나 본문 축소가 필요한 결함은 발견하지 않았다.

필수 수정은 최신 웹 문구와 Browser QA 기대값의 불일치였다. README와 홈 링크의 OneReport 표현도 AWS PoC로 맞췄다. 보호된 Vercel Preview의 실제 화면 확인은 로그인 제한으로 미완료이며 로컬 검증과 구분한다.

## 기준선과 발견

- PR 시작 HEAD: `617741f2dd5f7789a276055671cc61008d1416fb`.
- main 기준선: `4c574e27cbae94bcff8bdf884400c2fda2b24c0c`.
- [Web Portfolio CI 38547708227](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38547708227): 성공.
- [Browser QA 38547708071](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38547708071): 60 통과 / 2 실패. Job 115797929761 로그를 직접 확인했다.
- 두 실패는 desktop/mobile의 같은 테스트였다. 본문은 “8/21 AWS PoC 환경 Domain Smoke”로 바뀌었지만 테스트는 “8/21 운영 Domain Smoke”를 찾고 있었다. 실서버 health 502와 후속 PASS의 시점 구분은 유지한다.
- Vercel commit status success. Preview URL은 로그인 페이지로 연결됐다. 배포 성공은 실제 배포 화면 확인을 의미하지 않는다.

## 이번 수정

| 파일 | 변경과 이유 |
|---|---|
| tests/portfolio.spec.mjs | AWS PoC 환경의 정확한 문구로 기대값 갱신. 502와 PASS 검사를 모두 유지 |
| src/data/projects.ts | 홈 OneReport 링크를 “Backend 구현과 AWS PoC 검증 보기”로 통일 |
| README.md | 8/21 Smoke를 AWS PoC 환경의 검증으로 명시 |
| docs/README.md | v0.5 인계·감사 기록 연결 |

프로젝트 역할·증거·수치·상세 레이아웃은 보존했다. 이 수정으로 별도 PDF/PPTX 버전 증가가 필요하지 않다.

## PDF/PPTX 감사

첨부 파일의 바이트와 SHA-256이 v0.5 인계 기록과 일치했다.

| 파일 | 크기 | SHA-256 |
|---|---:|---|
| PDF | 222,072 bytes | `2545ca83bb59f1befb121c971373b471a631f8f0b88c8644d7207e7cc524322a` |
| PPTX | 80,101 bytes | `42ad0ae6a853228b5c4602c520ec8f6c1e52a9fad1446ea788e301cbb43e71c5` |

PDF 10쪽을 1440×810으로 개별 렌더링해 시각 검사했다. 페이지 밖 텍스트 블록 0개, 링크 11개다. PPTX 10슬라이드의 텍스트·도형은 편집 가능한 상태다. 슬라이드 텍스트와 PDF를 페이지별 대조했고 누락은 없었다.

PPTX를 LibreOffice로 별도 PDF 변환했다. 10쪽 텍스트(공백 정규화)와 11개 링크 대상이 첨부 PDF와 일치했다. 재렌더링의 픽셀은 완전히 같지 않으므로 동일 이미지라고 주장하지 않는다. 표지·p4·p8·p10의 재출력 화면도 추가 확인했다. Microsoft PowerPoint 네이티브 렌더링과 실물 인쇄는 미검증이다.

| 쪽 | 독립 검토 결과 |
|---|---|
| 1 | Navy 표지, 큰 제목, 신입·교육·팀 프로젝트 기반 표기와 웹 진입 유지 |
| 2 | 30초 요약 카드에서 프로젝트명과 개인 수행 내용 연결; 상세 페이지 번호로 탐색 가능 |
| 3 | 요청 제어와 Producer→Kafka→Consumer→MariaDB 비동기 흐름 구분; 원본 상세는 웹 연결 |
| 4 | 1→4→1이 주 결과, 300/300은 비동기 수락. 0.523초는 회청색 보조 정보이며 KPI 아님을 명시 |
| 5 | worker-03 단일 VM 복구와 Ready,SchedulingDisabled 상태 보존 |
| 6 | Bluebell Web–WAS 개인 구축·검증과 팀 자동화·DB·관측 구현 구분 |
| 7 | EventBridge Rule 2개 DISABLED 통제 시험과 자동 트리거 E2E 한계 표시 |
| 8 | 개인 Backend·규칙 기반 구현 / 팀 AWS PoC / AI·GIS·HA/DR 제안을 별도 영역으로 구분 |
| 9 | 코드·CI 및 Auth/Class 실제 Backend Browser 검증과 VM PTY/SFTP E2E 미완료 구분 |
| 10 | 군 통신 경험과 교육 프로젝트 경력 분리. 직접 기재한 군 경력 종료월 2025.09 유지 |

### 하이퍼링크

PDF와 PPTX의 11개 링크 대상이 일치한다. 홈 2개, 프로젝트 딥링크 7개, GitHub 프로필 1개, mailto 1개다.

- Durian: `#architecture`, `#load-scaling`, `#worker-recovery`
- Bluebell: `#architecture`, `#recovery`
- OneReport: `#smoke`
- Labbit: `#validation`

프로젝트 링크는 운영 도메인을 유지한다. 브랜치 로컬 빌드에서 해당 섹션과 이동·포커스·새로고침 동작을 확인했다. 이를 보호된 Preview 또는 아직 병합하지 않은 운영 신규 화면의 검증으로 간주하지 않는다. mailto는 주소 대조만 했으며 메일을 발송하지 않았다.

## 웹 화면과 브라우저 검증

- 홈·Durian·Bluebell·OneReport·Labbit를 1440/768/390/320px, 높이 1000px로 캡처: 20개 조합 모두 document 가로 넘침 0px.
- 모든 폭의 첫 화면을 시각 확인했고 결과 카드, MY/PROJECT/OPEN 범례, 바로가기와 모바일 줄바꿈을 검토했다. 주요 검증 섹션 화면도 확인했다.
- 데스크톱의 좌측 목차는 태블릿·모바일에서 본문 흐름에 배치된다. 모바일 메뉴·키보드 진입·고정 헤더 아래 섹션 제목·reload·본문 건너뛰기·증거 접기/펼치기는 기존 테스트로 검증한다.
- `npm run lint`, `npm run build` 성공.
- 로컬 전체 Browser QA 결과: **62개 전체를 한 번에 실행하여 62 passed (2.9m)**.
- GitHub 재검사는 이 변경을 포함한 최신 HEAD의 PR checks를 기준으로 판단한다. 과거 HEAD의 성공으로 대체하지 않는다.

로컬은 Playwright Chromium을 이용했다. Safari·실물 모바일 기기·스크린리더 전체 호환성 인증은 수행하지 않았다. 테스트 초기에 로컬 Chromium 실행 파일이 불완전해 브라우저가 시작되지 않았고, 설치된 패키지에서 다시 추출한 뒤 정상 실행했다. 이는 GitHub의 문구 불일치 실패와 별개의 환경 문제다.

## 사실관계와 보존

웹 데이터·검증 범위와 PDF 요약을 교차 대조했다. HTTP 수락≠DB Commit, worker-03 단일 노드, Bluebell 통제 시험, OneReport 실제 AWS PoC와 제안 구분, Labbit 실제 VM E2E 후속 상태를 모두 유지한다. 군 정보통신 경력은 상용 클라우드 경력이 아니다.

이번 첨부에는 최신 이력서 원본이 없으므로 모든 회사 제출본과의 완전한 일치까지 보증하지 않는다. 사용자가 확인한 군 경력 종료일을 기준으로 직접 기재한 2025.09는 수정 대상에서 제외했다. 비공개 증명서·개별 지원서 원본은 공개 저장소에 추가하지 않았다.

v0.4 PDF·Before/After의 과거 체크섬 불일치는 [v0.5 인계 기록](TWO_TRACK_V05_REVIEW_HANDOFF_2026-10-14.md)에 보존한다. 이번 v0.5 파일과 혼동하지 않는다.

## 완료·미검증·승인

| 구분 | 상태 |
|---|---|
| 필수 수정 | OneReport 테스트 기대값 및 공개 안내 문구 일치 처리 |
| PDF/PPTX | v0.5 검토본 유지, 내용·링크·레이아웃 감사 완료 |
| 선택 개선 | 추가 장식·페이지 축소는 적용하지 않음. 실제 채용 담당자의 읽기 시간 측정은 하지 않음 |
| 미검증 | 보호된 Preview 실제 화면, PowerPoint 네이티브 출력, 실물 기기·인쇄 |
| 승인 대기 | 사용자 v0.5 시안 검토, Draft 해제·운영 병합·FINAL 확정 |

Preview 인증 접근이 확보되면 동일 HEAD의 실제 배포 화면을 마지막으로 확인한다. 운영 병합과 FINAL 확정은 사용자 명시 승인 후 별도 단계로 진행한다.

