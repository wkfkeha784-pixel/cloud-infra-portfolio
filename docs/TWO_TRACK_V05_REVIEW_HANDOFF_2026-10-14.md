# 취업 포트폴리오 웹·PDF 2트랙 — v0.5 검토본·Work 인계 (2026-10-14)

> **검토 단계. 최종 승인 / 운영 병합 / 기존 제출용 PDF 교체 전.** 본 기록은 GitHub 공개 개인 저장소의 텍스트 관리 문서이고, 실제 PDF·PPTX 및 비공개 증명서·회사 지원서 바이트는 이 저장소에 업로드하지 않았다.

## 범위

- 웹 상세 증빙: 신입 클라우드/시스템/DevOps 구직을 위한 Evidence Library. 사실관계는 기존 프로젝트 자료/웹 데이터 우선.
- PDF 요약형: HR용 10쪽 Recruiter Brief, Navy·Teal, 큰 결과/간결한 흐름/프로젝트별 개인 기여와 검증 한계 유지.
- 대상 브랜치: `design/two-track-portfolio-v01-20261014`, [Draft PR #26](https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/pull/26). **운영 main과 Vercel Production을 직접 수정하거나 병합하지 않았음**.

## v0.5 PDF / PPTX 변경

1. 기존 v0.4 PPTX **10슬라이드**를 편집 원본으로 사용해 `v0.5 검토본` footer만 갱신. 표지 등 디자인/레이아웃 전면 교체 없음.
2. **p4 Durian:** 1→4→1의 대표 결과는 원래 크기로 유지. `0.523초`는 **26pt 굵은 숫자 → 18pt 보조 표시, 회청색**, 설명 `단발성 측정 · KPI 아님`으로 정밀화. 측정값 삭제·수정 없음. 300/300 HTTP 200 = 비동기 요청 수락, DB Commit 비입증, 지속 처리량·P95 미측정 그대로 유지.
3. 나머지 p1~p10: 텍스트 본문, 프로젝트별 개인 기여/검증 한계/11개 하이퍼링크 유지. PPTX 편집 가능. 새로운 PDF는 PPTX에서 LibreOffice로 재출력하여 사용.
4. 산출 파일 (대화에 별도 첨부되어 있으며 이 공개 저장소 바이너리 미저장):
   - `박희철_클라우드인프라_포트폴리오_리디자인_v0.5_검토본_20261014.pptx`: **80,101 bytes**, SHA-256 `42ad0ae6a853228b5c4602c520ec8f6c1e52a9fad1446ea788e301cbb43e71c5`
   - `박희철_클라우드인프라_포트폴리오_리디자인_v0.5_검토본_20261014.pdf`: **222,072 bytes**, SHA-256 `2545ca83bb59f1befb121c971373b471a631f8f0b88c8644d7207e7cc524322a`
5. **검증:** PDF 10쪽, 슬라이드 10장, PDF 링크 11개, 페이지 바깥 텍스트 블록 0개. 양쪽 PDF의 추출 본문을 p1~p10 대조하여 **버전 표기 및 p4 측정 설명 외 차이 없음**. 전 페이지 리렌더 시 PDF 엔진/서브셋 폰트 차이에 따른 소규모 시각 차이가 있음(도표/의미 차이로 단정하지 않음). **최종 확정 전 반드시 실제 크기 화면과 PDF↔PPTX 시각 품질 별도 재검토**. Microsoft PowerPoint 네이티브 렌더러/실물 인쇄 검증은 미완료.

## 웹 PR에서 반영한 표현 통일 (운영 변경 전)

- `src/pages/OneReportDetail.tsx`: 「실제 운영 흐름」→「AWS PoC 배포 정상화 이후 신고·기관 대응 흐름」, 「운영 Smoke」→「AWS PoC Smoke」; 팀 AWS PoC 배포·검증임을 명확히 표시.
- `src/data/onereportReading.ts`: AWS PoC의 제목/결과/배포 검증 표현으로 통일.
- `src/data/projects.ts`: 홈 결과와 역사적 2026-08-21 Domain Smoke PASS의 **팀 PoC 범위** 명시. `PR #30` 시점의 `/api/health 502`와 이후 PASS 구분을 유지.
- 이는 **검증 사실 변경이 아니라 오해 소지가 있는 사용자 노출 문구 정밀화**다. 사업 제안 항목을 실제 구현으로 표현하지 않는다.
- 개인 Bluebell·Durian·OneReport·Labbit 역할, 300 요청 수락, worker-03 단일 VM, EventBridge 통제 시험, Labbit VM E2E 미완료를 보존한다.

## 이전 v0.4 감사 파일 식별 주의

기존 `docs/TWO_TRACK_REDESIGN_AUDIT_2026-10-14.md`에 기록된 v0.4:
- 감사 문서가 적은 PDF SHA-256: `2bd8d8919f9cc50106e3ff7b7a68f3d67429b2c08f07ecfa7de8b740f469e1e2`
- **이번 세션에 실제 첨부돼 검토한 v0.4 PDF** SHA-256: `2b99d90581ef395331035815f821f5d554d4ab9bce80a4790e1b5cd8a1cc77e1`
- 감사 문서의 Web Before/After PDF SHA-256: `e212180073b83160d6062d73145babe1108ecf8a295d74dcd7f6999a2526880d`
- **이번 세션 실제 첨부 Before/After PDF** SHA-256: `a63a320354a9d4384f9a77be58c5c0153c5628d2c3a28e1ac9a90d3bc71abace`
- 감사 문서 v0.4 PPTX SHA-256 `2e430efc3844401e5e3bc1c4233b397525127227ff7c4fd588a26bf2b0c5bb09`는 실제 첨부와 일치.
- **불일치를 조용히 덮어쓰거나 같은 바이트라고 주장하지 않는다.** v0.5는 이번 세션의 실제 산출물로 별도 체크섬을 기록했으며, 기존 v0.4 감사는 과거 시점 기록으로 남긴다.

## 남은 Work 작업

1. Draft PR #26 **최신 HEAD의** Web Portfolio CI, Portfolio Browser QA, Vercel Preview 상태 새로 읽기(과거 성공 대체 금지). 테스트 통과와 **보호된 Preview 실제 브라우저 검증**을 구분.
2. Work의 브라우저에서 접근 가능한 경우 실제 Preview를 열어 **1440/768/390/320px** 홈+네 상세, 내 역할/팀 결과/OPEN 범례, 근거 딥링크, OneReport PoC 표현, 포커스/overflow 점검. Preview 로그인이 불가능하면 차단 이유 기록하고 로컬 QA로 대체한 사실을 명시.
3. v0.5 PDF/PPTX 실제 10쪽 UI/UX 검토 — p4 `0.523초` 시각 우선순위, 한글 글꼴 표시, 링크 11개, 중요한 증거가 지나치게 축약됐는지 확인. 최종 승인 전에 사용자에게 시안 보여주기.
4. 공개 웹의 원본 검증 내용과 HR PDF 요약의 용어·수치·기여 범위 일치 여부 독립 감사.
5. 최종 승인 전 **PR #26은 Draft 유지 / merge 금지 / 운영 main·기제출 PDF 변경 금지**. 사용자가 구체적으로 승인하면 최신 브라우저/PR 상태 재검토 후 병합 및 운영 검증 단계로 진행.

