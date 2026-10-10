# 웹 포트폴리오 구성 개선 설계 및 진행 기록

작성일: 2026-10-10 (Asia/Seoul)
진행 상태: 1~7단계 및 8단계 Bluebell 완료·공개 반영 / 다음 OneReport 상세 구성
대상: 박희철의 신입·주니어 Cloud Infrastructure / DevOps / Platform 지원용 웹
저장소: wkfkeha784-pixel/cloud-infra-portfolio
완료 브랜치: feat/durian-reading-structure-20261010 (PR #20 병합 완료)
완료 브랜치: feat/bluebell-reading-structure-20261010 (PR #21 병합 완료)
현재 작업 기준 main: e6fa300cf1c97139292a7e59e79bc29ccd9fe8ed (Bluebell PR #21 병합; 이 후속 기록은 문서만 변경)
최초 설계 기준 main: 58380868e18b3734d5bb6d15d20fffa780575bb1 (PR #18 반영)

## 1. 사용자 요청과 이번 작업 범위

사용자는 색상·글씨 크기·폰트보다 정보 구성에 불만이 있다. 문단과 항목의 경계, 강조점, 읽는 순서가 불분명하고, 보기 좋은 요소들이 이해하기 좋은 전체 구성을 만들지 못한다는 문제다.

- Navy + Teal / Noto Sans KR를 기반으로 정보 순서·묶음·강조 체계를 개선한다.
- 근거 있는 성과를 충분히 표현한다. 불필요한 축소와 반복적인 방어 문구를 줄인다.
- 개인 역할, 팀 결과, 시험 조건과 진행 상태는 해당 성과를 이해하는 위치에 명확히 둔다.
- 한 번에 하나의 목표를 구현·검토·기록한다. 1단계에서 구성을 설계하고, 2단계에서 홈 소개와 대표 프로젝트 진입을 구현했다.
- 우선 홈과 Durian을 완성한다. 이후 Bluebell → OneReport → Labbit 순으로 확장한다.
- PDF/PPTX는 이번 웹 구성 개선의 대상이 아니다.
- 개인 저장소에만 작업한다. 팀 저장소나 비공개 자료의 공개 범위를 확장하지 않는다.

## 2. 확인한 현재 구조와 변경 이유

2026-10-10 홈의 실제 렌더링, Durian 상세 DOM, Home.tsx / ProjectDetail.tsx / ProjectCard.tsx / projects.ts / global.css를 확인했다.

| 현재 단위 | 문제 | 결정 |
|---|---|---|
| 큰 소개와 Operations Loop | 추상적인 업무 절차가 대표 성과보다 큰 공간을 차지함 | 소개를 간결하게, Loop는 짧은 보조 문구로 통합 |
| Core Focus 카드 4개 | 프로젝트 목록과 동일 성과·기술을 반복함 | 독립 구역을 제거하고 프로젝트의 역할·핵심 기술에 통합 |
| 동일한 2열 프로젝트 카드 | 각 카드가 작은 보고서처럼 길고, 대표 성과의 위치가 약함 | 대표 2개는 일정한 순서의 넓은 행, 나머지 2개는 간결한 목록 |
| 상세의 기여·팀 결과·검증 흐름·증거 분리 | 한 사례의 행동과 증거가 서로 멀리 있음 | 사례 단위로 문제·조치·결과·증거를 함께 배치 |
| 비슷한 카드·색상을 여러 목적으로 사용 | 핵심 결과·보조 설명·출처가 비슷한 중요도로 보임 | 표현 역할을 성과 강조 / 본문 / 절차 / 증거로 구분 |
| 반복되는 Boundary / Limitations | 읽는 흐름을 끊고 성과가 방어적으로 들림 | 중요한 조건은 근처에 한 번, 긴 조건·출처는 마지막 자료 영역 |

직접 고용담당자 사용성 시험은 하지 않았다. 아래 기준은 설계 목표이며 검증된 채용 효과나 성능 KPI가 아니다.

## 3. 홈페이지 구성과 실제 문구

### 3.1 상단 소개

읽는 순서: 지원 직무 → 이름 → 강점 문장 → 짧은 근거 설명 → 대표 프로젝트로 이동.

- 직무: Cloud Infrastructure Engineer
- 이름: 박희철
- 핵심 문장: **구축에서 끝내지 않고, 운영 상태를 관측하고 장애 이후 정상화까지 검증합니다.**
- 설명: **AWS·OpenStack·Kubernetes 환경에서 서비스 연결, 부하에 따른 확장, 장애·설정 변경 이후 복구 상태를 검증했습니다.**
- 주 행동: **프로젝트 보기** → 기존 #projects 유지
- 보조 행동: GitHub / Email. 공개 연락처는 기존 정책 유지.
- Operations Loop: 큰 독립 시각 요소 대신 Build · Observe · Recover · Verify 보조 문구 또는 생략. 첫 화면에 무근거 숫자 요약과 장식용 지표를 추가하지 않는다.

상단은 화면 너비와 실제 문장 줄바꿈을 보고 조정한다. 폰트 교체나 과도한 크기 확대를 해결책으로 삼지 않는다.

### 3.2 대표 프로젝트 (#projects)

제목: **운영과 복구를 검증한 대표 프로젝트**
짧은 설명: **담당 역할과 확인한 결과를 중심으로 정리했습니다.**

PC: Durian → Bluebell을 각각 한 행으로 배치한다. 행 내부는 제목·설명과 역할·결과 영역으로 나눌 수 있으나, 서로 다른 프로젝트를 양쪽에 놓고 읽게 하지 않는다.
모바일: 같은 순서로 한 열에 배치한다. 프로젝트마다 레이블과 결과 위치를 일정하게 유지한다.

| 항목 | Team Durian | Bluebell |
|---|---|---|
| 성과 제목 | 외부 요청 부하에 따른 Consumer 확장·축소와 Worker 복구 검증 | AWS Web–WAS 구축과 Replacement 이후 서비스 정상화 검증 |
| 프로젝트 설명 | 수강신청 폭주에 대응하는 대기열 오토스케일링 플랫폼 | AWS Web/WAS와 Local DB를 연결한 하이브리드 3-Tier 인프라 |
| 개인 역할 | Kubernetes·Redis/Kafka/KEDA 운영 / 모니터링 인수 / Terraform 복구 | 팀장 / Web–WAS 구축 / AWS·복구 통합 검증 |
| 결과 1 | 외부 HTTP 요청 300/300 수락 · Consumer 1→4→1 | Replacement 이후 서비스·Target Group·HTTP 응답 정상화 확인 |
| 결과 2 | worker-03 삭제 후 Terraform 재생성·클러스터 재가입 | 관측 대상 재편입 및 Cleanup 후 Baseline 검증 |
| 짧은 조건 | HTTP 200은 비동기 요청 수락 기준 | 최종 복구 시험은 EventBridge 비활성 상태에서 통제 실행 |
| 보조 기술 | OpenStack · Kubernetes · Kafka/KEDA · Terraform | AWS · Nginx · Ansible/Swarm · Prometheus |
| 이동 문구 | 운영 문제와 검증 과정 보기 → | 구축과 복구 검증 과정 보기 → |

조건은 링크 뒤나 펼침 영역에 숨기지 않는다. 표의 결과는 기존 자료로 지원되는 성과이며 응답 수락과 DB Commit, 팀 자동화 구현과 개인 통합 검증을 혼동하지 않는다.

### 3.3 추가 프로젝트

제목: **서비스 구현과 팀 시스템 통합 경험**
OneReport와 Labbit을 대표 프로젝트보다 간결한 행으로 배치한다. 작은 프로젝트명·상태 레이블 → 성과 제목 → 담당 역할 → 확인한 결과 → 검증 범위 → 상세 링크 순이며, 기술 태그는 대표 프로젝트에만 노출한다.

| 항목 | OneReport | Labbit |
|---|---|---|
| 성과 제목 | 신고·기관 배정·상태 흐름을 연결하는 Backend 구현 | Browser Workspace의 Terminal·File 구현과 main 통합 |
| 역할 | Backend / Domain·DB·Routing·Contract·Rule Analysis | Frontend / Design / Contract Consumer |
| 핵심 결과 | 핵심 Backend PR과 테스트 · 팀 AWS PoC 운영 Smoke FINAL: PASS | PR #62 main 병합 · 세션·파일 충돌·편집 보호 코드/CI 검증 |
| 조건 | 규칙 기반 분석 · 실제 공공기관 연계 없음 | 진행 중(2026-10-10) · 실제 VM PTY/SFTP E2E 후속 |
| 링크 | Backend 구현과 운영 검증 보기 → | Workspace 구현과 통합 과정 보기 → |

### 3.4 경력·학력·자격·연락처

- 경력·학력: 기존 사실과 날짜 유지. 제목은 **경력과 학력**. 각 날짜와 항목이 한 묶음으로 읽히게 한다.
- 자격: **보유 자격** 아래 컴퓨터활용능력 2급 / G-TELP Level 2 · 84점. 취득 전 자격을 보유 목록에 넣지 않는다.
- 연락처: **연락처** / Email·GitHub. PDF 관련 안내는 보조 문구.
- 해당 구역에 대형 추상적 슬로건을 반복하지 않는다.
- 메뉴의 #projects / #experience / #contact와 기존 URL은 유지한다.

## 4. 기존 홈 항목 보존·이동표

| 기존 데이터/요소 | 새 위치 | 보존 방식 |
|---|---|---|
| Hero 핵심 문장 | 상단 소개 | 그대로 유지 |
| Hero 지원 설명 | 상단 소개 | 의미를 유지하고 짧게 정리 |
| Operations Loop | 소개 보조 문구 | 독립 장식 박스 축소 |
| Core Focus의 Infrastructure / Kubernetes | Durian·Bluebell 역할·성과 | 프로젝트 근거와 직접 연결 |
| Core Focus의 IaC·Observability | Durian 상세 복구·마감 / Bluebell 복구 사례 | 성과·근거 보존 |
| Core Focus의 Contract Integration | OneReport·Labbit 행과 상세 | 개인 구현 역할 보존 |
| Project Problem | 상세의 배경과 각 사례 | 홈의 장문 반복 제거 |
| cardEvidence | 홈 결과 요약 / 상세 사례 | 수치·병합 사실·범위 유지 |
| 전체 tags | 상세의 기술 정보 | 홈은 핵심 기술만 노출 |
| 경력·학력·보유 자격 | 홈 하단 | 사실과 기간 유지 |
| 공개 연락처 | 메뉴·홈 하단 | 기존 공개 정책 유지 |

## 5. Durian 상세 구성

상단 성과 제목: **외부 부하에 따른 Consumer 확장·축소와 Kubernetes 운영 복구를 검증했습니다.**
프로젝트명: Team Durian
설명: **수강신청 요청을 Waiting Room과 Kafka로 완충하고, Kafka Lag에 따라 Consumer를 확장하는 플랫폼입니다. Kubernetes·Redis/Kafka/KEDA 운영과 모니터링 인수, Terraform 복구를 담당했습니다.**

상단 결과 요약은 Consumer 1→4→1 / HTTP 300/300 요청 수락 / worker-03 재생성·재가입을 각 의미와 함께 표시한다. 숫자만 크게 표시하거나 지속 성능·전체 DB 처리 완료로 해석하게 하지 않는다.

PC에서는 보조 목차를 본문 옆에 두고, 모바일에서는 상단의 짧은 링크 목차를 사용한다. 목차는 본문 폭을 침범하지 않고 고정 헤더와 충돌하지 않게 한다. 스크롤 감지·애니메이션은 필요성이 확인되기 전 추가하지 않는다.

| 목차·ID | 담을 내용 | 근거·범위 |
|---|---|---|
| 프로젝트와 담당 역할 (#overview) | 문제, 전체 목적, 개인 담당, 팀 구현 | 개인/팀 역할을 한 번에 설명 |
| 요청 처리 구조 (#architecture) | 공식 요청 경로 + Lag 기반 확장 신호 + 관측 | 최신 구조와 과거 시험 시점 구분 |
| 외부 부하와 자동 확장·축소 (#load-scaling) | 조건·시험·결과·증거 | [MY] 2026-08-10 외부 HTTP 시험 |
| Kafka 요청 경로 복구 (#request-recovery) | 접근·인증 문제 복구와 DB 반영 | [MY] 2026-08-06 공식 Kafka E2E |
| Consumer Pending 대응 (#scheduling) | 증상·원인·팀 조치·결과 | [PROJECT] 기존 Troubleshooting |
| Terraform Worker 복구 (#worker-recovery) | Drift·plan·apply·재가입·최종 상태 | [MY] worker-03 단일 인스턴스 |
| 운영 상태와 원본 자료 (#evidence) | 모니터링·정합성·팀 최종 Health·출처·후속 과제 | [MY] 수행 범위와 [PROJECT] 최종 Snapshot 구분 |

### 5.1 요청 처리 구조

- 서비스 경로: User → Kong → Redis Waiting Room → Queue Token / Courses / CAPTCHA → Producer / Redis admission-control → Kafka → Consumer → MariaDB.
- 확장 신호: Kafka Lag → KEDA/HPA → Consumer Scaling.
- 관측: Prometheus → Grafana.
- 긴 경로를 동일한 작은 노드 8개로 한 줄에 강제 배치하지 않는다. 요청 제어와 비동기 처리의 의미 단위로 읽히게 하고, 경로는 끊김 없이 이해할 수 있게 설계한다.
- 개인 운영 담당과 팀 구조를 캡션으로 설명한다. 전체 구조를 개인 단독 구현으로 표시하지 않는다.
- 8/6의 Producer 경로에는 Redis 호출이 없었으므로 그 사례의 경로를 최신 구성과 혼합하지 않는다.

### 5.2 외부 부하와 자동 확장·축소

제목: **클러스터 밖의 요청으로 Consumer 1→4→1을 확인했습니다.**

- 배경: 내부 상태만으로 외부 요청에 따른 확장 흐름을 판단하기 어려움.
- 수행: 외부 Ops VM에서 실제 수강신청 HTTP 요청 300건, 동시 50으로 시험하고 Lag·External Metric·Replica·Node 상태 관측.
- 결과: 300/300 HTTP 200, External Metric 약 60/5, Consumer 1→4, Worker 2+2 분산, Lag 해소 후 4→1, Kafka Broker Running.
- 함께 보이는 조건: HTTP 200은 비동기 요청 수락. 전체 DB 300건 Commit 시험이 아님.
- 상세 출처: 0810_05 외부 HTTP 부하 KEDA 최종 E2E / 2026-08-10.
- 약 573.68 req/s / 0.523초는 상세 측정 조건으로만 보존. 대표 KPI로 강조하지 않는다.
- 기존 Validation 흐름을 이 사례의 과정에 통합한다.

### 5.3 Kafka 요청 경로 복구

제목: **접근·인증 설정을 복구하고 실제 DB 반영까지 재검증했습니다.**

- 수행: NetworkPolicy → TLS Trust → SCRAM → Topic/Group ACL 순으로 공식 요청 경로 복구와 최소권한 Cutover 검증.
- 결과: HTTP 200, Enrollment 2→3, New Enrollment ID 44, Consumer Ready=true / Restart=0 / Error=false, POST_CUTOVER_E2E_SUCCESS.
- 해당 경로: Mainpage → Kong → Producer → Kafka → Consumer → MariaDB.
- 날짜·조건: 2026-08-06. 이 Snapshot의 Producer에는 Redis 호출이 없음.
- 출처: 0806_01 공식 요청 경로 Kafka E2E 복구와 검증.

### 5.4 Consumer Pending 대응

제목: **확장된 Consumer가 실행되지 않는 원인과 배치를 조정했습니다.**
범위: [PROJECT] 팀 대응 사례. 개인 단독 수행으로 표현하지 않는다.

- 증상: Scale-out 과정에서 일부 Consumer Pending.
- 원인: 특정 Worker 편중과 Worker-02 메모리 부족.
- 조치: Node Affinity / Topology Spread 및 운영 컴포넌트 배치 조정.
- 기록된 결과: Consumer 분산 적용 및 Strimzi Operator·Metrics Server 배치 조정.
- 교훈: Replica뿐 아니라 Scheduling과 Node Resource도 함께 확인.
- 기존 자료가 직접 지원하지 않는 해소 시간·메모리 절감률·무중단 KPI를 추가하지 않는다. 8/10 부하 시험의 분산 결과를 별도 시험 시점으로 표시한다.

### 5.5 Terraform Worker 복구

제목: **삭제된 worker-03을 Terraform으로 재생성하고 클러스터에 재가입시켰습니다.**

- 문제: 실제 VM은 삭제되었지만 Terraform State에는 존재.
- 조치: Plan 1 add / 0 change / 0 destroy → apply → kubeadm join.
- 최종 상태: Ready,SchedulingDisabled. 재가입을 곧바로 workload scheduling 가능 상태로 확대하지 않는다.
- 범위: worker-03 단일 Compute Instance 복구 PoC.
- 기존 myContributions의 수행 주장 보존. 상세 plan·명령·이미지는 실제 기록 확인 후 연결한다. 스크린샷이나 로그를 만들어 증거처럼 제시하지 않는다.
- 5단계에서 Master v2.11 p.6 Drift Recovery Evidence의 실제 화면을 확인해 복구 대상·과정·최종 상태와 출처를 표시했다. 전용 로그·이미지와 시험 날짜는 새로 추가하지 않았으며 날짜를 추정하지 않는다.

### 5.6 운영 상태와 원본 자료

- 개인 기여: Monitoring 인수·재구성 / Runtime ↔ Git·Manifest 정합성 검증.
- 팀 최종 Snapshot(2026-08-13): KEDA server-side dry-run PASS / kubectl diff RC=0 / 관측 스택 Running / Final Health PASS 43, WARN 0, FAIL 0.
- 43 PASS는 팀 전체 Health Check 결과로 표시하고 개인 시험 수치로 합산하지 않는다.
- 기존의 QueuePilot 명칭은 사용자 정책에 따라 공개 표기를 **운영·서비스 대시보드**로 정리하되 모니터링 성과는 유지한다.
- 반복 시험 기반 P95·SLI/SLO는 후속 검증 범위로 한 번 정리한다.
- 대표 결과와 해석에 필요한 조건은 본문에 노출. 긴 명령·출처 설명만 details로 펼쳐본다.
- 공개 불가·불안정한 저장소 링크를 새로 노출하지 않는다. 접근 가능한 원본이 없는 항목은 실제 source 이름과 날짜를 정확히 표시한다.

## 6. 기존 Durian 항목 보존·이동표

| 기존 데이터 | 새 위치 |
|---|---|
| problem / summary / role | overview와 각 사례의 배경 |
| architecture / architectureNote | architecture |
| Kubernetes Runtime 운영·복구 | overview + request-recovery / worker-recovery |
| Redis–Kafka–Consumer E2E 재검증 / KEDA 운영 | load-scaling |
| Monitoring 인수·재구성 / Runtime 정합성 | evidence |
| projectResults | 해당 구조·사례의 팀 설명에 통합 |
| troubleshooting 전체와 note | scheduling |
| validation 흐름 | load-scaling 과정 |
| evidenceSnapshots[외부 HTTP] | load-scaling |
| evidenceSnapshots[공식 Kafka E2E] | request-recovery |
| evidenceSnapshots[Final Runtime Health] | evidence |
| learned | 사례별 교훈 + 마무리 짧은 요약 |
| limitations | 해당 조건은 각 사례 근처, 후속 과제는 evidence |
| boundaryNotes | 해당 사례의 Scope 레이블·짧은 조건으로 통합 |
| 모든 tags / 출처·날짜 | overview 보조 정보 / 해당 사례 출처 |

## 7. 디자인·구현 규칙

- 제목은 해당 구역에서 무엇을 해냈는지 설명한다. 범용 영문 제목을 반복하지 않는다.
- 표현 역할: 핵심 결과는 성과 강조 영역, 설명은 본문, 절차는 단계, 증거는 figure·caption·출처.
- 카드가 필요한 곳만 카드 사용. 사례 본문은 일정한 좌측 기준과 구역 간 간격으로 구분한다.
- 레이블 바로 아래 관련 내용 배치. 구역 사이 간격은 구역 내부 간격보다 크게 두어 소속 관계를 표현한다.
- 색상만으로 구분하지 않고 제목·레이블·구조를 함께 사용한다.
- PC 다열 배치에서 모바일로 내려올 때 의미 순서를 유지한다. 고정 높이로 본문을 잘라 카드 높이를 맞추지 않는다.
- 숨김/접기: 대표 성과·역할·중요 조건을 숨기지 않는다. details에는 명확한 제목과 keyboard focus가 필요하다.
- 목차·행 링크는 의미 있는 a 요소와 고유 ID 사용. 고정 헤더 아래 scroll-margin을 고려한다.
- 모션·새 라이브러리·이미지 생성은 이번 목적에 필요할 때만 검토한다. 구조 개선을 장식 추가로 대체하지 않는다.
- 기존 프로젝트 URL과 공개 연락처 정책 유지. React UI에 Mermaid 렌더러를 추가하지 않는다.

## 8. 단계별 범위·완료 기준

| 단계 | 상태 | 범위 | 완료 조건 |
|---|---|---|---|
| 1 | 완료 | 구성·보존표·문구·계획 기록 | 각 주요 성과와 근거의 새 위치 확인 |
| 2 | 완료 | 홈 소개와 대표 프로젝트 진입 | 직무·강점·프로젝트 이동이 분명함 |
| 3 | 완료 | 홈 대표·추가 프로젝트 | 역할·성과·조건의 위치가 일정하고 중복 설명 정리 |
| 4 | 완료 | 홈 하단과 모바일 마감 | 홈 전체 읽기 순서와 메뉴·연락처 동작 확인 |
| 5 | 완료 | Durian 상단·목차·구조 | 제목·목차만으로 사례 내용을 구분 가능 |
| 6 | 완료 | Durian 네 사례와 운영 마감 | 각 조치·결과·증거가 같은 구역에서 연결됨 |
| 7 | 완료 | 홈·Durian 통합 사용 검토·공개 반영 | Desktop/Tablet/Mobile, navigation, overflow, focus·details 및 배포 검증 완료 |
| 8 | 진행 중 | Bluebell → OneReport → Labbit | Bluebell 완료·공개 반영. 다음 OneReport, 이후 Labbit |

검토 화면: 1440px PC / 768px Tablet / 390px Mobile, 필요 시 기존 320px 최소 너비도 확인.
실제 제목·역할·결과 찾기와 경로 이동을 브라우저에서 확인한다. 작은 수정마다 전체 QA를 반복하지 않고, 변경된 부분을 확인한 후 단계 마감 시 build/lint 및 필요한 Browser QA 수행.
측정치 그대로의 테스트를 새로 만들지 않는다. 목차 이동·접기·모바일 overflow 같은 실제 회귀 위험을 확인한다.
PR/main CI 통과는 내용 읽기 품질의 대체물이 아니다. 화면 검토 결과도 기록한다.

## 9. 구현 파일과 데이터 전환

- 2~4단계: src/pages/Home.tsx / src/components/ProjectCard.tsx / src/styles/global.css.
- 5~6단계: src/pages/ProjectDetail.tsx / 필요한 사례 컴포넌트 / src/data/projects.ts 또는 별도 typed presentation data.
- Durian만 먼저 새 상세 구성 적용. 다른 프로젝트는 확장 단계에서 옮긴다.
- 기존 facts·scope·source·date를 임의 삭제하지 않는다. 새 case 데이터로 옮길 경우 이전 필드와 대응 확인 후 사용하지 않는 필드를 정리한다. 같은 facts를 여러 파일에 복제해서 유지하지 않는다.
- tests/portfolio.spec.mjs의 기존 내용·역할 검증을 보존하고 변경된 제목·구조와 실제 navigation 위험에 맞춰 조정한다.
- 단계마다 작업 브랜치에서 확인. 완성 단위를 PR로 검증 후 main 반영. 미완성 페이지를 production으로 승격하지 않는다.

## 10. 참고자료와 이번 설계의 판단

이미 조사한 자료를 반복 조사하지 않고 활용한다.

- Brittany Chiang: https://brittanychiang.com/ — 경력·프로젝트·글 분리, 항목별 제목·설명·기술 위치의 일관성.
- Josh W. Comeau: https://www.joshwcomeau.com/ — 목록에서 제목·요약으로 선택, 상세에서 깊게 설명.
- NN/g Layer-Cake: https://www.nngroup.com/articles/layer-cake-pattern-scanning/ — 내용을 설명하는 소제목과 관련 본문의 명확한 소속 관계.
- NN/g Cards: https://www.nngroup.com/articles/cards-component/ — 일정한 위치에 정보를 제공하는 목록은 비교·탐색에 유리할 수 있음.
- Google SRE Toil 사례: https://sre.google/workbook/eliminating-toil/ — 운영 문제·판단·개선 과정의 설명 방식 참고.

이 자료들이 희철님의 채용 결과나 특정 화면 개선 효과를 보증하지 않는다. 실제 기존 자료와 웹 독자의 정보 요구에 맞춰 적용한 설계 판단이다.

## 11. 진행 기록과 다음 채팅 시작점

### 2026-10-10 / Step 1

- 완료: 현재 main 기준 확인, 홈·Durian의 내용 보존·이동표, 제목·요약·조건 문구, 단계·검토 기준 작성.
- 결정: 홈은 대표 인프라 프로젝트부터. Durian은 네 사례 구성으로 공식 Kafka E2E 보안·DB 반영 성과까지 보존.
- 점검: 현재 데이터와 주요 주장·수치·Scope 대응 확인. 화면 코드 변경이 없으므로 build/UI QA를 재실행하지 않음.
- 미완료: 화면 구현, 새 구조의 시각 검토, PR/production 반영.
- 다음: **2단계 Home.tsx 소개와 대표 프로젝트 진입만 구현**. 최종 설계의 프로젝트 목록은 3단계에서 구현한다. 중간 홈을 바로 production으로 배포하지 않는다.
- 권장 모델: 구성 설계·종합 판단 Astra High / 구현 Sol High / 명확한 작은 수정 Sol Medium. 필요할 때만 설정 변경 안내.

### 2026-10-10 / Step 2

- 완료: 홈 설명 간결화, Operations Loop 제거, Durian·Bluebell의 핵심 경험과 상세 링크 배치. 기존 직무·이름·강점 문장과 상세 성과는 보존.
- 읽는 구조: 소개와 대표 프로젝트 진입을 PC에서 세로 구분선으로 나누고, 모바일에서는 소개 다음에 가로 구분선과 두 프로젝트를 순서대로 배치. 각 항목은 프로젝트명 → 핵심 경험 → 검증 요약 → 이동 순서.
- 이동: 프로젝트 보기 버튼은 #projects로 이동. #projects / #experience / #contact에 scroll-margin을 적용해 고정 헤더 아래 제목이 보이도록 함.
- 변경 파일: src/pages/Home.tsx / src/styles/global.css / tests/portfolio.spec.mjs.
- 저장: Draft PR #19 — https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/pull/19. 코드·테스트 검증 commit: ef0aeb6dbd8ad5173f8c844208d8f02c95256fac.
- 검증: 로컬 build / lint / git diff --check PASS. Web Portfolio CI #52 PASS. Portfolio Browser QA #46의 Desktop / Pixel 7 Mobile 총 28개 검사 PASS. 대표 프로젝트 링크 2개, 프로젝트 앵커와 고정 헤더 가림, 기존 상세 경로·근거·overflow 회귀 검사를 포함.
- 화면 검토: CI에서 생성한 PC 1440px / 모바일 412px 화면의 실제 소개, 구분선, 두 프로젝트 제목·요약 줄바꿈 확인. 모바일에서도 프로젝트별 제목과 요약이 구분됨. Tablet 768px 및 최소 320px 시각 검토는 4단계 홈 마감에서 수행.
- 미리보기: Vercel Ready. 브랜치 Preview는 Vercel 로그인 보호가 있어 이 세션의 직접 조작 검토 대신 동일 코드의 CI 브라우저 화면·동작 검사로 검증. 보호 설정을 변경하지 않음.
- 미완료: Core Focus와 기존 프로젝트 카드의 중복은 3단계 대상. 현재 홈 전체를 완성했다고 간주하지 않으며 main / production으로 승격하지 않음.
- 다음: **3단계 #projects 목록 재구성과 Core Focus 통합만 구현**. Durian·Bluebell은 넓은 대표 행, OneReport·Labbit은 짧은 추가 목록으로 정리. 3.2~3.4 문구·역할·조건과 보존표를 적용하고 변경된 목록의 PC·모바일 구성을 검토한다.

### 2026-10-10 / Step 3

- 구현: Core Focus 독립 구역을 제거하고 인프라·운영·관측·IaC·계약 통합의 강점을 해당 프로젝트 역할·성과·기술 및 상세에 연결. 소개 다음에 대표 프로젝트가 바로 이어짐.
- 구성: Durian → Bluebell은 한 프로젝트당 넓은 행. 작은 프로젝트명, 성과 제목과 설명·기술은 왼쪽, 담당 역할·결과·범위·링크는 오른쪽. 모바일에서는 동일 순서로 한 열.
- 추가 목록: OneReport → Labbit을 별도 구역의 선으로 나눈 행으로 배치. 성과 제목·역할·결과·진행 상태·조건을 유지하고 기술 태그와 장문 Problem 반복은 상세로 넘김.
- 내용 관리: 기존 cardEvidence를 typed home presentation으로 대체. 프로젝트명·URL·상태는 기존 공통 필드 재사용. MY / PROJECT 구분을 각 결과 근처에 노출. Bluebell 자동화 팀 구현, Durian 비동기 수락, OneReport 규칙 기반·공공기관 미연계, Labbit 실제 VM E2E 후속 범위를 직접 표시.
- 보존: 기존 4개 상세 프로젝트 데이터 전체를 이전 브랜치와 객체 비교해 그대로 유지됨을 확인. 공통 기술 태그에는 실제 수행한 Durian Terraform만 추가.
- 변경: Home.tsx / ProjectCard.tsx / projects.ts / global.css / tests/portfolio.spec.mjs / README.md.
- 검증 진행: 로컬 build / lint / diff PASS. React 컴포넌트 구조·semantic section / article / heading / dl·기존 focus style·타입·안정적인 key 확인. 첫 CI #48은 기존 영문 View Case Study 문구를 찾는 검사 1개가 PC·모바일에서 실패했고 나머지 28개는 PASS. 네 상세 링크·연락처·경력 검사 목적을 유지하고 현재 링크 selector로 수정.
- 화면 점검: 1440px PC에서 대표 2개와 추가 2개의 제목·역할·성과·범위·이동 위치를 확인. 412px 모바일에서 한 열 순서와 구역 경계 확인. 제목의 단어 중간 줄바꿈을 수정하고 Durian의 짧은 조건은 비동기 요청 수락 기준으로 정리. Worker 상태 상세는 설계 문서의 해당 사례에서 유지.
- 최종 검증: 코드 commit 2407b20c91208fe257781b763d95f3ee5b05d489 기준 Web Portfolio CI #55 PASS / Portfolio Browser QA #49 PC·모바일 총 30개 검사 PASS. 4개 목록의 상세 이동, 검증 범위·진행 상태 노출, 기존 상세 근거·연락처·경력·privacy·overflow·앵커 회귀 포함.
- 저장: Draft PR #19 유지. Vercel Preview Ready, 기존 main / production 유지. 후속 문서 커밋은 코드 변경이 없음.
- 다음: **4단계 홈 하단과 반응형 마감만 진행**. 경력·학력·보유 자격·연락처의 제목과 항목 묶음 정리. 1440 / 768 / 390 / 필요 시 320px에서 홈 전체 읽기 순서·메뉴·연락처·앵커·focus·overflow 확인. 홈 완성 단위 검토 후 PR/main 반영 여부 판단. Durian 상세 재구성은 5단계부터.

### 2026-10-10 / Step 4

- 구현: 경력과 학력 / 보유 자격 / 연락처로 구역 제목을 정리. 경력은 날짜와 분류·제목·설명을 한 행으로 묶고 구분선 적용. 자격은 종류와 보유 내용을 일정한 열에 배치. 연락처는 Email·GitHub 레이블과 링크를 분리하고 PDF 안내를 보조 내용으로 유지.
- 반응형: PC는 구역 제목 옆에 목록, Tablet은 제목 아래 목록, Mobile은 각 경력 날짜 바로 아래 해당 내용. 군 경력·학력·교육 기간과 보유 자격·점수·링크·privacy 정책은 보존.
- 메뉴: 44px 이상 버튼, 열림/닫힘 accessible name과 aria-controls 연결, Escape 닫기와 버튼 focus 복귀, 메뉴 항목과 홈 로고 선택 시 닫기.
- 화면 마감: 1440 / 768 / 390 / 320px 실제 전체 캡처에서 소개 → 대표 2개 → 추가 2개 → 경력·학력 → 자격 → 연락처 순서와 항목 경계 확인. 320px에서 발견한 숨김 br의 띄어쓰기 누락을 수정하고 소개 문장을 단어 단위로 줄바꿈. GitHub 표시를 계정명으로 간결화해 화살표 단독 줄바꿈 제거. 모바일 성과의 Scope 열 여백을 줄여 본문 폭 확보. 폰트·색상·성과 문구는 유지.
- 변경 파일: Home.tsx / Header.tsx / global.css / playwright.config.mjs / tests/home-responsive.spec.mjs. 다른 상세 페이지의 구성·데이터는 변경하지 않음.
- 검증: 최종 코드 84f341166b564b857be0fa063c5eaa7c0ef3b8a7 기준 로컬 build / lint / git diff --check PASS. Web Portfolio CI #58 PASS / Portfolio Browser QA #52 총 34개 PASS. 후속 문서 커밋은 검증 기록만 갱신.
- 검사 범위: 기존 PC·Pixel 7 Mobile 30개 회귀 검사 유지, 네 너비의 메뉴·앵커 제목 가림·키보드 연락처/상세 이동·overflow 4개 추가. 네 너비 행렬은 desktop context에서 실행해 mobile project 중복 제외. 최초 Browser QA #51의 34개 PASS 후 실제 화면에서 발견한 줄바꿈만 수정해 최종 게이트 재실행.
- 검토 한계: branch Preview는 Vercel 로그인 보호. 보호 설정 변경 없이 동일 소스의 CI 브라우저 화면과 실제 동작 검사 사용. 직접 채용담당자 사용성 평가를 수행한 것은 아님.
- 반영 단위: **홈 1~4단계 완성본은 PR #19로 main에 반영**. Durian 상세 재구성은 다음 작업 브랜치에서 5단계부터 분리한다.
- 다음: **5단계 Durian 상단·목차·구조만 구현**. 성과 제목·역할 요약·7개 목차를 배치하고 기존 상세 내용의 구역 이동과 보존 대응을 확인한다. 네 사례의 문제·조치·결과·증거를 함께 재구성하는 작업은 6단계에서 진행한다.

### 2026-10-10 / Step 5

- 구현: Durian 전용 상세에 프로젝트명 → 성과 제목 → 프로젝트 설명 → 개인 핵심 결과 세 항목을 배치. Consumer 1→4→1 / HTTP 300/300 수락 / worker-03 재생성·재가입의 의미와 조건을 함께 표시했다.
- 구역: overview / architecture / load-scaling / request-recovery / scheduling / worker-recovery / evidence의 일곱 번호·제목·고유 앵커로 기존 내용을 이동. PC는 본문 옆 고정 목차, Tablet·Mobile은 본문 앞 링크 목차. 구역 사이 선과 간격으로 소속 관계를 구분했다.
- 보존: 기존 프로젝트 네 객체를 원본과 비교해 운영 대시보드 공개 명칭 한 필드 외 동일함을 확인. 날짜·수치·MY/PROJECT·출처·기술·교훈·조건·자료 링크를 유지했다. 세 Snapshot은 해당 사례 안에 배치하고 기존 카드 마크업을 공통 컴포넌트로 추출했다. 다른 상세의 구성은 유지했다.
- 근거 확인: Durian 원본의 개인 담당과 팀 Terraform 범위를 확인하고 Master v2.11 p.6의 worker-03 Drift Recovery를 직접 확인. 실제 VM 삭제 / State에는 존재 → 1 add, 0 change, 0 destroy → apply → kubeadm join → Ready,SchedulingDisabled를 해당 구역에 표시. 팀 최종 Health 43 PASS와 분리했으며 날짜·로그·이미지를 만들어 넣지 않았다.
- 변경 파일: ProjectDetail.tsx / 새 DurianDetail.tsx / 새 EvidenceSnapshotCard.tsx / projects.ts / global.css / playwright.config.mjs / 새 tests/durian-responsive.spec.mjs. Durian presentation metadata는 기존 데이터 파일에서 관리하고 CSS는 Durian 범위에 한정했다.
- 검증: 최초 구현 a8001bf535747574510cb1df9ca6cca3e29445d6 기준 Web Portfolio CI #61 PASS / Portfolio Browser QA #55 총 38개 PASS. 최종 화면 수정 1398e98b34296ef675ef5d20193dade6fd5a9914 기준 로컬 build / lint / git diff --check PASS, Web Portfolio CI #62 PASS / Portfolio Browser QA #56 총 38개 PASS. 후속 문서 커밋은 검증 기록만 갱신한다.
- 검사 범위: 기존 34개 검사를 유지하고 1440 / 768 / 390 / 320px에서 일곱 목차 클릭, 고유 ID, 고정 헤더 아래 제목 노출, keyboard Enter, hash reload, 가로 overflow 4개 추가. MY Worker 최종 상태와 8/6 Redis 경로 조건·공개 명칭 유지도 확인했다.
- 화면 검토: 네 너비에서 상단 결과·목차·본문 순서와 구역 경계를 확인. 사례·마지막 자료 영역의 실제 줄바꿈도 검토. PC·Tablet에서 돌아가기 링크와 분류 문구가 같은 줄에 붙어 있던 것을 별도 줄로 수정했다.
- 저장: Draft PR #20 — https://github.com/wkfkeha784-pixel/cloud-infra-portfolio/pull/20. branch Preview는 로그인 보호가 있어 동일 코드의 CI 화면·동작 검사로 검토했다. main과 공개 홈페이지는 홈 1~4단계 완성본을 유지한다.
- 남은 작업: 긴 요청 경로의 좁은 노드·모바일 세로 길이, 사례 안의 설명 우선순위, 반복 조건 정리는 6단계 대상. 이번 검토는 구조·이동의 완료이며 Durian 전체의 최종 완성이 아니다.
- 다음: **6단계 Durian 네 사례와 운영 마감만 진행**. 외부 부하 / Kafka 복구 / Pending / Worker 복구 각각의 문제 → 조치 → 결과 → 근거가 한 구역에서 읽히도록 정리한다. 요청 경로는 요청 제어와 비동기 처리 단위로 묶고 최신 구조와 8/6 경로를 분리한다. 중복 조건은 해당 사례 근처에 모으며 성과를 축소하지 않는다. 7단계 홈·Durian 통합 검토까지 이 브랜치·PR을 유지하고 이후 완성 단위로 반영한다.

### 2026-10-10 / Step 6

- 구현: 외부 부하 / Kafka 복구 / Pending / Worker 복구를 사례 본문으로 구성. 문제·조치 다음에 실제 결과와 해당 조건을 배치. MY/PROJECT와 확인된 날짜는 사례의 시작 부분에 표시했다.
- 구조: 요청 제어 1~4 → 비동기 처리 5~8의 두 단계로 긴 요청 경로를 묶었다. 모바일은 단계 안에서 두 열로 읽고, 확장 신호·관측 경로는 별도로 표시한다. 8/6 Redis 미호출 경로는 Kafka 복구 사례에 유지했다.
- 근거: 핵심 결과와 요청 수락/DB Commit 구분, Worker SchedulingDisabled 상태는 항상 보인다. 긴 측정 기록과 출처만 native details로 제공한다. 부하 시험의 약 573.68 req/s·0.523초는 기존 Master p.5의 Demo Script Snapshot으로 보존했다.
- 운영: 개인 Monitoring 인수·재구성 / Runtime 정합성과 PROJECT 최종 Health 43 PASS를 분리. 반복 조건은 각 사례로 모으고 P95·SLI/SLO는 후속 과제로 한 번 표시했다.
- 보존: PR #20 head b4f10c7c2c8e14a8f7eebb73fa1605b9b9797400과 로컬 수정 대상 파일의 blob SHA 일치 확인 후 작업. 네 canonical 프로젝트 객체의 전체 비교 PASS. 기존 facts·scope·date·source·기타 프로젝트는 변경하지 않았다.
- 변경: DurianDetail.tsx / projects.ts의 Durian presentation 문구 / Durian 범위 CSS / 기존 Durian QA 검사 확장 / 이 진행 기록.
- 로컬 검증: build / lint / git diff --check PASS. React 점검: 모듈 범위 컴포넌트, native details/summary, ordered list, time·heading 구조와 기존 focus 스타일, 새로운 라이브러리·스크롤 state 없음.
- 검토 경로: 기존 CI QA의 실제 브라우저 동작 및 1440 / 768 / 390 / 320px 캡처. 로그인 보호된 Preview 대신 동일 코드의 CI 결과를 검토했다.
- 중간 QA: 5ce0e084fab3fd96bbb651e451a523dae56dddae 기준 CI #64 PASS. Browser QA #58은 36 PASS / 2 FAIL. 실패는 같은 기존 문장 selector가 PC·Mobile에서 바뀐 Worker 조건 문구를 찾지 못한 것으로, 단일 Compute Instance 범위와 SchedulingDisabled 상태를 해당 복구 구역에서 확인하도록 유지·보강했다. 네 너비 목차·hash reload·접기 keyboard/overflow 검사는 모두 PASS.
- 화면 점검: 사례별 본문·조치·결과의 경계, 조건과 팀/개인 Scope의 소속 관계 확인. 320px의 POST_CUTOVER_E2E_SUCCESS 마지막 글자 줄바꿈은 작은 code 표시로 다듬었다. summary 포커스 스타일을 명시했다. 사례 전용 캡처에서는 고정 헤더를 임시 제외해 긴 요소 캡처 중의 헤더 중첩만 피한다. 실제 navigation/전체 화면 검사에서는 헤더를 유지한다.
- 최종 검증: 코드 46aa84f04610ea41cb98ab5f78cbdf60177f27a3 기준 로컬 build / lint / diff PASS, Web Portfolio CI #65 PASS, Portfolio Browser QA #59 **38개 PASS**. 목차·앵커·reload·공개 연락처·기존 상세 회귀를 유지하고, 결과 상시 노출 및 details의 Enter/Space 열기·닫기와 펼친 상태 overflow 검사를 포함했다.
- 최종 화면: 네 너비의 사례 캡처에서 본문·결과·조건·출처 구분 확인. 320px 성공 코드의 단독 글자 줄바꿈 해소 확인. PC·Tablet 요청 구조와 Mobile 요청/처리 두 열 순서, Worker 상태 및 개인 Monitoring/팀 Health 구분 검토. 검토용 화면: Park_Heecheol_Web_Step6_Durian_2026-10-10.png.
- 저장: PR #20에서 구현·QA·화면 마감 완료. 이 후속 문서 커밋은 진행 기록만 변경하며 검증된 코드는 동일하다. main/공개 홈페이지는 홈 1~4단계 완성본 유지.
- 다음: **7단계 홈·Durian 통합 사용 검토**. 대표 프로젝트 진입 → 목차 → 사례 → 출처 확인 → 프로젝트 목록/다음 프로젝트 이동의 읽기·탐색 흐름, Mobile 메뉴, focus/접기 및 필수 조건 노출을 종합 검토한다. 이미 끝난 5~6단계 구현과 같은 QA를 이유 없이 반복하지 않는다. 완성 단위 검토 후 PR/main 반영 판단. 다른 세 프로젝트 개편은 8단계.

### 2026-10-10 / Step 7

- 대상: 홈 대표 진입 → Durian → 목차 → 사례·출처 → 프로젝트 목록 / 다음 프로젝트로 이어지는 전체 읽기·탐색 흐름. 기존 5~6단계 내용과 디자인은 유지했다.
- 기준 확인: PR #20 head 5bb9e4a9c1361618a0b240db788cb5b67d6a15b3의 CI #66 / Browser QA #60 PASS와 Vercel Preview 성공 확인. 공개 production은 bf07918d0683ac21f34aafff412c4fb06b35b0f1 홈 완성본임을 Vercel metadata로 확인했다.
- 발견·수정: hash 이동 시 화면만 이동하고 키보드 focus는 목차에 남는 문제. route/hash 목적지로 focus를 옮기고 tabindex=-1로 Tab 순서에 추가하지 않았다. 다음 Tab은 해당 사례 출처 summary로 이어진다. 페이지 전환 시 제목 focus와 상단 이동, 뒤로가기 hash 복귀도 같은 방식으로 처리하며 stale animation frame은 cleanup한다.
- 검증 추가: 1440 / 768 / 390 / 320px에서 대표 진입, keyboard Enter, 목차 이후 Tab/접기, 실제 focus outline, 뒤로가기, 목록 복귀, 다음 프로젝트, 다른 상세에서 Mobile 메뉴로 목록 복귀, overflow / pageerror를 이어서 확인하는 journey 검사 4개. 기존 38개 검사는 유지했다.
- 변경: src/App.tsx / 목적지 focus 스타일 / tests/reading-journey-responsive.spec.mjs / 이 기록. 로컬 build / lint / diff PASS.
- 최종 검증: fbdd5caae2f97cd5925058002bc2577e03297774 기준 Web Portfolio CI #68 PASS / Portfolio Browser QA #62 **42개 PASS**. 네 너비의 통합 journey와 기존 38개 회귀 검사 포함. 앞선 QA #61도 42개 PASS였지만 캡처에서 smooth scroll 도중 촬영을 확인하여 뒤로가기 제목의 위치를 고정 헤더 아래부터 100px 이내로 검사하도록 보강했다. 최종 320 / 390 / 1440px 캡처에서 목적지 제목 도착 확인; 768px 위치 검사도 PASS.
- 공개 반영: PR #20을 squash 병합. main b997943824547225ba3f1b1e8e3ed7339ab7789e 기준 Web Portfolio CI #69 PASS / Portfolio Browser QA #63 **42개 PASS**. Vercel production dpl_Au96pAm6jEcdXh3469pujYqqQghH가 READY이며 같은 commit과 공개 alias cloud-infra-portfolio.vercel.app를 확인했다.
- 실제 제공 코드: 공개 홈 /projects/durian /projects/bluebell 모두 HTTP 200. index-DhgYxpLa.js와 index-Dg_ptq9w.css가 검증한 로컬 build와 byte 단위 일치. JS SHA-256 f193cd724dd11726cd34bb41700542887cc9f16cc858038be73608d66b8ebf7b / CSS 97989ac94512d20265baa7dbdad818e01e6ae358cf5729a66aa02e38011c1482.
- 검증 범위: 실제 Chromium 화면·키보드·history 흐름은 GitHub Actions에서 빌드된 화면으로 확인했고, 공개 배포는 commit / READY / HTTP / bundle 일치로 확인했다. 공개 domain에 대한 원격 브라우저 조작을 추가 수행했다고 기록하지 않는다. 이 후속 commit은 진행 문서만 갱신하며 검증된 앱 코드는 동일하다.
- 다음 시작점: **8단계 Bluebell 상세 구성부터**. 최신 main에서 별도 브랜치를 시작한다. 현재 Bluebell의 canonical 데이터·근거·개인/팀 범위 보존표를 먼저 확인하고, 상단 성과 → 담당 역할 → Web–WAS 구축 → 장애·복구와 Terraform → 검증 근거 순으로 읽기 구조를 정리한다. Durian 구성의 공통 원칙을 적용하되 Bluebell의 AWS·복구 통합 검증 강점을 유지한다. 한 작업에서 세 프로젝트를 모두 개편하지 않는다. Bluebell 마감 뒤 OneReport, 그 다음 Labbit으로 이어간다.

### 2026-10-10 / Step 8 — Bluebell

- 기준: main 8144de9eb093544a8dc1870d18b330f2eec3a920의 ProjectDetail / projects / styles / 진행 문서를 직접 읽고 로컬 blob 일치 확인. 별도 브랜치에서 Bluebell만 변경한다.
- 자료: Bluebell 최종 발표자료 p.7 역할, p.9 Web/WAS, p.13 Replacement, p.18 Alerting, p.20 개선 방향. p.7 / p.13 원본 화면도 확인. 발표의 EventBridge Enabled 설명을 최종 시험으로 일반화하지 않고 최신 canonical boundary의 최종 7/13 Rule 2개 DISABLED·통제 실행 조건을 유지한다. 각 Snapshot의 2026-07-14는 발표 근거 시점으로 표시한다.
- 구조: 상단 성과 → 여섯 목차 → 프로젝트·역할 → AWS/Local 요청 구조 → Web–WAS → Replacement → 관측·알림 → 복구 기준·후속 과제. PC 옆 목차 / Tablet·Mobile 상단 목차. 각 사례에서 문제·수행·결과·조건·이미지를 연결하고 출처의 세부 설명만 native details로 접는다.
- 범위: 개인 Team Lead / Web–WAS 구축 / AWS·복구 통합 검증. 팀 Ansible·Swarm / EventBridge·SSM·ASG / Monitoring / DB 구현 구분. Terraform은 발표의 개선 방향이므로 Bluebell 구현 성과에 추가하지 않는다.

| 기존 항목 | 새 위치·보존 방식 |
|---|---|
| 이름·subtitle·summary | 상단 성과 제목과 소개 |
| problem·role·myContributions | 프로젝트·담당 역할, 개인 범위 |
| architecture·architectureNote | 번호를 유지한 AWS 1~5 → Local DB 6~7 경로 및 환경 경계 |
| projectResults·팀 구현 경계 | 담당 역할 다음 팀 구현 목록 |
| Web/WAS Snapshot·이미지·scope·date | Web–WAS 사례의 결과·원본 화면·발표 근거·출처 |
| Replacement Snapshot·이미지·scope·date | 복구 사례의 결과·원본 화면·발표 근거·출처 |
| 최종 Trigger 시험 조건 | 복구 설계 바로 아래 항상 노출 |
| validation 전체 9개 | 노드 교체 → 운영 편입 → 서비스·관측 확인 → Cleanup/Baseline |
| Recovery Validation 네 결과 | 복구·관측 사례의 결과, Snapshot에 있는 동일 검증값으로 연결 |
| Monitoring Snapshot·이미지·scope·date | 관측 사례의 결과·원본 화면·발표 근거·출처 |
| learned·Node Created ≠ Recovery Complete | 복구 완료 기준 |
| 원본 자료·후속 과제 | 마감 구역; 확인되지 않은 RTO/RPO 수치는 만들지 않음 |

- 변경: BluebellDetail.tsx / bluebellReading.ts / bluebell.css / ProjectDetail의 Bluebell 분기 / main의 CSS import / bluebell-responsive.spec.mjs / 이 기록. src/data/projects.ts와 기존 다른 상세 파일은 그대로 유지한다.
- 최종 코드 검증: 570a5854813d7063b32ee05f2a27d5d21582a2b6 기준 로컬 build / lint / whitespace PASS. Web Portfolio CI #72 PASS / Portfolio Browser QA #66 **46개 PASS**. 기존 42개와 네 너비의 Bluebell 통합 읽기·키보드·hash reload/history·원본 이미지·목록/다음 프로젝트 검사 4개 포함. React 검토: 렌더 중 정의한 컴포넌트·추가 effect/state·외부 의존성 없음, key·semantic heading·aria label·native details·focus 목적지 확인.
- 화면 검토: 1440 / 768 / 390 / 320px 목차·복구 제목·결과·조건 배치 및 PC 전체 흐름 확인. 앞선 QA #65도 46개 PASS였지만 고정 이미지 비율로 생긴 큰 여백과 과도한 확대를 발견해 원래 비율과 640px / Replacement 480px 확대 상한을 적용하고 최종 재검증했다. 원본 이미지 3개·caption·alt는 그대로 유지한다. PC 전체 페이지 높이는 7256px → 6717px로 줄었으며 세부 수치·상태는 읽기 가능한 본문에도 항상 표시한다. 원본 근거 이미지의 해상도를 새로 생성했다고 표현하지 않는다.
- 공개 반영: PR #21 squash 병합. main e6fa300cf1c97139292a7e59e79bc29ccd9fe8ed 기준 Web Portfolio CI #73 PASS / Portfolio Browser QA #67 **46개 PASS**. Vercel production dpl_6oox6uv34yMTbvtd4qgoJ474u8Ev READY·동일 commit·공개 alias cloud-infra-portfolio.vercel.app 확인. Bluebell 구현·화면 마감·통합 검사·공개 반영까지 완료했다.
- 실제 제공 코드: 공개 홈 /projects/bluebell /projects/durian /projects/onereport 모두 HTTP 200. index-I1HIz42v.js와 index-Ckz3R00E.css가 검증한 로컬 build와 byte 단위 일치. JS SHA-256 290cc37c1631f70bbb368878f855eb311d265422aa7041711b09846c803dc9a1 / CSS bfc05fa34dff4025b3aca6ff19c7e80ed62e429396d22342cebc27ce85f2f826.
- 검증 범위: Chromium 화면·키보드·history는 GitHub Actions의 실제 빌드 화면에서 검증했고, 공개 배포는 commit / READY / HTTP / bundle 일치로 검증했다. 원격 공개 domain 브라우저를 추가 조작했다고 기록하지 않는다. 이 후속 commit은 진행 문서만 갱신하며 검증된 앱 코드는 동일하다.
- 다음 시작점: **8단계 OneReport 상세 구성**. 최신 main과 ProjectDetail / OneReport canonical 데이터·검증 Snapshot을 읽고 보존표부터 확인한다. 실제 구현 성과·개인/팀 역할·PoC와 제안 범위·검증 시점을 유지하며 문제 → 수행 → 결과 → 근거를 연결한다. 별도 브랜치에서 OneReport 하나만 구현·검토·마감한 뒤 Labbit으로 진행한다. 완료한 Bluebell·홈·Durian을 다시 개편하지 않는다.

새 채팅에서는 AGENTS.md → README.md → 이 문서 → 최신 main 및 관련 파일 순서로 읽고 완료한 단계를 반복하지 않는다. 다음 시작점은 Step 8 — Bluebell 기록의 **OneReport 상세 구성**이다. PR #20의 1~7단계와 PR #21의 Bluebell 구현은 공개 반영했으므로 다시 시작하지 않는다. 실행 시 최신 main/브랜치 상태와 실제 문서 내용을 확인하고 새 작업 브랜치에서 이어간다.
후속 작업이 끝나면 해당 단계 상태, 변경 파일·commit/PR, 검증 결과와 남은 리스크, 바로 다음 시작점을 이 문서에 갱신한다.
