# 웹·PDF 2트랙 독립 감사 · 2026-10-14

## 기준선과 결론

- 운영 main: `4c574e27cbae94bcff8bdf884400c2fda2b24c0c`.
- 이번 후속 작업 시작점: Draft [PR #26](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/pull/26), head `92e34b4125b34391a2a02cfd2119c1a582f5c16c`.
- 해당 head의 Web Portfolio CI ([38529725543](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38529725543))와 Browser QA ([38529725544](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/actions/runs/38529725544))는 성공했다. 이전 기록의 QA 대기는 해소됐다.
- 현재 PDF/PPTX는 **v0.4 검토본**이다. 운영 병합 및 기존 제출용 Master 교체는 하지 않았다.

## 관점별 발견과 조치

| 관점 | 발견 | 조치 |
|---|---|---|
| 채용 담당자 | PDF 2쪽의 일반 역량명이 실제 프로젝트와 바로 연결되지 않음 | 프로젝트명·페이지·개인 수행 내용을 카드에 배치 |
| 기술면접관 | Durian 요약 흐름에서 Producer 생략이 Redis→Kafka 직접 전달로 읽힐 수 있음 | 요청 제어와 Producer→Kafka→Consumer→DB 비동기 처리를 분리 |
| 현업 엔지니어 | HTTP 수락, 단일 노드 재가입, 통제 복구, 실제 VM E2E의 범위 구분이 중요 | 결과 가까이에 검증 조건·미완료 범위를 유지하고 관련 웹 섹션으로 연결 |
| UI/UX | PDF의 일괄 그림자와 링크 기본색이 Navy·Teal 위계를 흐림 | 그림자를 제거하고 얇은 경계·기존 색상·명시적 링크 서식 적용 |
| 웹 탐색 | 상세 첫 화면의 결과에서 근거까지 이동 거리가 김 | 네 상세에 핵심 근거 바로가기 3개씩 배치; 기존 전체 목차 보존 |
| 접근성 | 기여·검증 상태의 의미 설명과 본문 이동 진입점 보완 필요 | MY/PROJECT/OPEN 텍스트 범례, OPEN 색상, 건너뛰기 링크, 키보드 동작 검증 |

## PDF 페이지별 변경

| 쪽 | 변경 |
|---|---|
| 1 | 신입·교육 및 팀 프로젝트 기반임을 유지; 웹 링크 추가 |
| 2 | 일반 역량명 대신 프로젝트와 담당 업무·결과를 연결 |
| 3 | 요청 제어와 비동기 처리의 논리적 요약 흐름; Producer 명시 |
| 4 | 2026-08-10, 외부 Ops VM, 요청 300·동시성 50 조건; HTTP 수락≠DB Commit, 지속 처리량·P95 미측정 유지 |
| 5 | worker-03 단일 VM 재생성·재가입과 Ready,SchedulingDisabled 상태를 분리해 설명 |
| 6 | Bluebell 개인 Web–WAS 구축·통합 검증과 팀 자동화·DB·관측 구현을 분리 |
| 7 | EventBridge Rule 2개 비활성 통제 시험 및 자동 트리거 E2E 한계를 강조 |
| 8 | 실제 AWS PoC의 Frontend/FastAPI·RDS PostgreSQL/S3 경로와 AI/GIS/HA/DR 제안 분리 |
| 9 | Labbit 2026-10-10 검증 기준, 코드/CI·Auth/Class 실제 Backend Browser와 VM PTY/SFTP 후속 검증 분리 |
| 10 | 군 통신 경험·교육·자격을 유지; 웹/GitHub/메일 탐색 |

10쪽 모두 개별 렌더링을 시각 검사했다. PDF는 텍스트 추출 가능, 페이지 밖 텍스트 블록 0개, 링크 11개다. PPTX는 텍스트·도형이 편집 가능한 상태로 유지된다. PPTX 구조 검증과 LibreOffice PDF 출력 검증을 수행했으며, Microsoft PowerPoint 앱에서의 개별 렌더링까지 확인한 것은 아니다. 편집 환경에는 Noto Sans CJK KR 글꼴이 필요하다.

## 기술적 사실과 보존 범위

- `src/data/projects.ts`, `src/data/*Reading.ts`, 첨부 프로젝트 발표·검증 자료와 교차 확인했다. 공개 웹의 프로젝트 데이터와 원본 증거는 수정하지 않았다.
- Durian의 8월 6일 Kafka 전달 검증과 8월 10일 부하·확장 시험은 다른 스냅샷이다. HTTP 300/300은 비동기 요청 수락이며 DB 저장 300건이 아니다.
- Terraform 결과는 worker-03에 한정되며 전체 클러스터 복구·업무 트래픽 정상화를 주장하지 않는다.
- Bluebell 자동화·DB·모니터링은 팀 구현이다. 개인 기여는 Web–WAS 구축과 연결·복구 통합 검증으로 구분한다.
- OneReport PR 당시 health 502 기록과 이후 2026-08-21 AWS PoC Smoke PASS 시점을 유지한다. 규칙 기반 분석을 LLM 구현으로 확대하지 않는다.
- Labbit 테스트 개수를 합산하거나 코드/CI를 실제 VM E2E로 해석하지 않는다.
- 군 통신 운용·현장 조율을 상용 클라우드 운영 경력으로 표현하지 않는다. 개인정보 원본·회사별 제출 서류는 공개하지 않는다.

## 로컬 실제 브라우저 검증

- `npm run lint`, `npm run build` 성공.
- 홈과 네 상세를 1440/768/390/320px에서 렌더링: 20개 조합 모두 가로 넘침 0px. 이전 head와 수정본의 동일 화면 폭 스크린샷 비교.
- 기존 54개 테스트 중 최초 50개 통과. Labbit 4개 실패는 새 OPEN 라벨에 대한 기존 문자열 기대값 불일치였다. 기대값 갱신 후 해당 4개 모두 재통과했다.
- 새 핵심 근거 탐색 테스트 8개 통과: 네 프로젝트 × 1440/390px, 키보드 진입, 섹션 포커스, 고정 헤더 아래 제목 노출, 검증 범위, 새로고침, 본문 건너뛰기.
- 총 62개 고유 시나리오를 로컬에서 확인했다. 전체 62개를 한 번에 실행한 결과와 구분한다. Playwright Chromium 기반 검사이며 Safari·실물 기기·스크린리더 전체 인증은 아니다.
- 운영 도메인 첫 화면의 기존 버전 정상 렌더링도 별도 브라우저로 확인했다. 로컬 통과를 운영 변경 완료로 표현하지 않는다.

## 최종 검토 전 남은 사항

- 새 커밋의 GitHub CI·Browser QA·Vercel Preview 상태는 PR의 최신 commit checks를 기준으로 확인한다. 위 과거 성공을 새 커밋 성공으로 대체하지 않는다.
- 사용자의 v0.4 시각 검토와 개인 배경 날짜 최종 확인. 이미 제출한 서류와 13쪽 Master는 그대로 보존한다.
- 기존 13쪽 Master 전체를 새 PPTX에 동기화한 작업이 아니다. 상세 증거를 웹에 남기는 10쪽 요약 목적을 유지한다.
