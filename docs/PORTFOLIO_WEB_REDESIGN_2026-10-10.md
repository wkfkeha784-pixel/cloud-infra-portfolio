# 웹 포트폴리오 구성 개선 설계 및 진행 기록

작성일: 2026-10-10 (Asia/Seoul)
진행 상태: 1단계 구성 설계 완료 / 화면 구현 전
대상: 박희철의 신입·주니어 Cloud Infrastructure / DevOps / Platform 지원용 웹
저장소: wkfkeha784-pixel/cloud-infra-portfolio
작업 브랜치: feat/web-reading-structure-20261010
설계 기준 main: 58380868e18b3734d5bb6d15d20fffa780575bb1 (PR #18 반영)

## 1. 사용자 요청과 이번 작업 범위

사용자는 색상·글씨 크기·폰트보다 정보 구성에 불만이 있다. 문단과 항목의 경계, 강조점, 읽는 순서가 불분명하고, 보기 좋은 요소들이 이해하기 좋은 전체 구성을 만들지 못한다는 문제다.

- Navy + Teal / Noto Sans KR를 기반으로 정보 순서·묶음·강조 체계를 개선한다.
- 근거 있는 성과를 충분히 표현한다. 불필요한 축소와 반복적인 방어 문구를 줄인다.
- 개인 역할, 팀 결과, 시험 조건과 진행 상태는 해당 성과를 이해하는 위치에 명확히 둔다.
- 한 번에 하나의 목표를 구현·검토·기록한다. 이번 단계는 구성 설계이며 화면 코드는 수정하지 않는다.
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
OneReport와 Labbit을 대표 프로젝트보다 간결한 행으로 배치한다. 각 행은 성과 제목 → 프로젝트명·역할 → 결과 → 상태·조건 → 상세 링크 순이다.

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
- 이 사례 전용 Snapshot이 현재 projects.ts에는 없으므로 구현 시 기존 Master 및 확보된 원본 근거를 확인한다. 날짜를 추정하지 않는다.

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
| 1 | 완료(구현 전) | 구성·보존표·문구·계획 기록 | 각 주요 성과와 근거의 새 위치 확인 |
| 2 | 다음 작업 | 홈 소개와 대표 프로젝트 진입 | 직무·강점·프로젝트 이동이 분명함 |
| 3 | 예정 | 홈 대표·추가 프로젝트 | 역할·성과·조건의 위치가 일정하고 중복 설명 정리 |
| 4 | 예정 | 홈 하단과 모바일 마감 | 홈 전체 읽기 순서와 메뉴·연락처 동작 확인 |
| 5 | 예정 | Durian 상단·목차·구조 | 제목·목차만으로 사례 내용을 구분 가능 |
| 6 | 예정 | Durian 네 사례와 운영 마감 | 각 조치·결과·증거가 같은 구역에서 연결됨 |
| 7 | 예정 | 홈·Durian 통합 사용 검토 | Desktop/Tablet/Mobile, navigation, overflow, focus·details 검증 |
| 8 | 예정 | Bluebell → OneReport → Labbit | 공통 구성과 프로젝트 고유 강점이 함께 유지됨 |

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

새 채팅에서는 AGENTS.md → README.md → 이 문서 → 최신 작업 브랜치 및 관련 파일 순서로 읽고 완료한 단계를 반복하지 않는다. 실행 시 최신 main/브랜치 상태와 실제 문서 내용을 확인한다.
후속 작업이 끝나면 해당 단계 상태, 변경 파일·commit/PR, 검증 결과와 남은 리스크, 바로 다음 시작점을 이 문서에 갱신한다.
