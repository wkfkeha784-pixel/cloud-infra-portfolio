# 공통 포트폴리오 PDF 정확성 보완 · 2026-10-14

## 작업 성격과 적용 대상

- **공통(회사 무관) 포트폴리오**의 정밀화. 엘리스·토스 등 특정 회사의 지원동기·기업명·직무 홍보를 삽입하지 않음.
- 원본(보존): `박희철_클라우드인프라_포트폴리오.pdf` / 13쪽, 756,930 bytes / SHA-256 `91fb1264e8ecddc71af8146f04ed68b106388d58b593261a9b3518b0362bc9b3`.
- 신규 PDF(이 대화에서 별도 전달, **Git 저장소에 바이너리 추가 없음**): `박희철_클라우드인프라_포트폴리오_20261014.pdf` / 13쪽, 785,874 bytes / SHA-256 `5d2bb4b261d8ef187a91bdaf383e21e992335e7a7e74ba24c148f12dd25ed1dc` (전체 SHA는 파일로 재계산 가능).
- 사용자 이력서 `이력서_20261014 (2).pdf`는 **엘리스 전용 이력서**. 자체 내용은 별도로 유지하고 PDF 공통본을 기업별로 분기하지 않음.
- 본 웹 저장소의 [README](../README.md), [Durian](../src/pages/DurianDetail.tsx), [OneReport](../src/pages/OneReportDetail.tsx), [reading 데이터](../src/data/onereportReading.ts)와 관련 검증 경계를 대조함. **웹 소스의 표현은 이미 부하 Script 측정/DB Commit 구분 및 AWS PoC와 제안 구분을 보존하므로 웹 앱 코드는 변경하지 않음**.

## 변경 내용 (변경 페이지는 p5, p10뿐)

| 페이지 | PDF 원문 | 새로운 표현 | 근거 및 변경 이유 |
|---|---|---|---|
| p5 | `Demo Throughput` | `Demo Script Snapshot` | 단발성 부하 스크립트의 계산 속도를 **지속 처리량 KPI로 오해하지 않도록** 측정 조건을 먼저 표시 |
| p5 | `약 573.68 req/s` | `HTTP 요청 300건` | 실제 근거가 있는 요청 횟수. **300/300은 HTTP 비동기 요청 수락이지 DB Commit 완료 아님** |
| p5 | `0.523 초 Demo Script 수치` | `0.523초 · 단발성 측정` | 데모 실행 시간은 보존, 재현/지속 성능으로 해석하지 않음 |
| p10 | `Source Test 와 실제 운영 Smoke 를 분리해 Backend 변경부터 AWS 연결까지 검증했습니다` | `Source Test 와 AWS PoC Smoke 를 구분해 Backend 변경부터 배포 검증까지 확인했습니다` | 상용 운영으로 읽힐 수 있는 표현을 **AWS에 배포한 PoC 검증**으로 한정 |
| p10 | `개인 PR Evidence, Final CI, 운영 Domain Smoke 와 Production 제안 범위를 구분했습니다.` | `개인 PR Evidence, Final CI, AWS PoC Smoke 와 확장 제안 범위를 구분했습니다.` | PR·CI·PoC·제안의 근거 경계 명료화 |
| p10 | `Final Production-domain Smoke` | `Final AWS PoC Smoke` | 실서비스 상용 환경 검증으로 오해 가능성 감소 |
| p10 | `PR #30 시점 /api/health 502 → 배포 정상화 후 8/21 운영 Smoke FINAL: PASS` | `PR #30 시점 /api/health 502 → 배포 정상화 후 8/21 AWS PoC Smoke FINAL: PASS` | 검증 시점과 PoC 환경 구분 |

## 변경하지 않은 내용

- 전체 13쪽 구조, 디자인·레이아웃, 아키텍처 도표, 날짜, 수치 증거 및 URL/메일 링크.
- **Durian:** KEDA Consumer 1→4→1, worker-03 단일 컴퓨트 인스턴스 재생성·재가입과 최종 `Ready,SchedulingDisabled`, HTTP 요청 수락과 DB 적재 검증 경계.
- **Bluebell:** 최종 시험의 EventBridge 비활성·통제 실행, 본인과 팀 구현 범위 구분.
- **OneReport:** 실제 AWS PoC·Rule 기반 분석·기관 연계 미구현, AI/LLM/Vision·HA/DR 확장은 제안.
- **Labbit:** CI 및 브라우저 확인된 범위와 실제 OpenStack VM 연동 미완료.
- 이력서, 기존 회사 제출 PDF, 팀 저장소, 웹 배포 소스, 지원 건수는 변경하지 않음.

## 결과 검증과 후속 원본 관리

- PyMuPDF 원본 PDF에 **텍스트를 실제 교체**하고, 한국어 폰트 일부만 내장해 PDF로 내보냄. 원본은 덮어쓰지 않음.
- 원본/수정본 13쪽의 렌더 비교에서 **픽셀 변화는 p5와 p10에서만 발생**, p1–p4·p6–p9·p11–p13 페이지는 동일하게 렌더링됨.
- 각 페이지 URL 링크 및 PDF 전체 페이지 개수 **원본과 동일**; 수정 대상 원문 문자열 삭제와 새 문자열 텍스트 검색 가능 여부 확인.
- 저장소에는 **PPTX/원본 PDF의 바이너리 소스가 없음**. 개인 Library의 `Park_Heecheol_Portfolio_Master_v2.11.pptx` 파일은 조회되지만, 이번 세션에서 바이너리 원본을 편집용 컨테이너로 가져오지 못함. 따라서 **편집 가능한 PPTX Master 자체는 업데이트되지 않았음**. 이후 Master를 재출력할 때 이 7개 변경을 동기화해야 함. 이 대화에서 만든 공통 PDF가 최신 제출본이며, 기존 Master와 완전 동일한 PDF라 주장하면 안 됨.
- PDF가 Git 저장소에 업로드되거나 웹사이트가 새 배포된 것은 아님. 실제 제출은 완료 화면이 확인된 뒤 [지원 일정표](https://github.com/wkfkeha784-pixel/career-application-log/blob/main/planning/2026-q4-application-schedule.md)에 기록.
