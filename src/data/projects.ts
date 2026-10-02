export type Evidence = {
  label: string
  href: string
}

export type EvidenceSnapshot = {
  title: string
  scope: 'MY' | 'PROJECT'
  validatedAt: string
  source: string
  summary: string
  facts: string[]
  note?: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  href?: string
  linkLabel?: string
}

export type Project = {
  slug: string
  order: string
  name: string
  status?: string
  subtitle: string
  problem: string
  role: string
  summary: string
  tags: string[]
  cardEvidence: string[]
  architecture: string[]
  architectureNote?: string
  myContributions: string[]
  projectResults?: string[]
  troubleshooting?: {
    title: string
    badge: 'PROJECT' | 'MY'
    rows: { label: string; value: string }[]
    note?: string
  }
  validation?: string[]
  learned?: string
  limitations?: string
  evidence: Evidence[]
  evidenceSnapshots?: EvidenceSnapshot[]
  boundaryNotes?: string[]
}

export const projects: Project[] = [
  {
    slug: 'durian',
    order: '01',
    name: 'Team Durian',
    subtitle: '수강신청 폭주 대응을 위한 대기열 오토스케일링 플랫폼',
    problem: '갑작스러운 수강신청 요청이 애플리케이션과 DB로 한꺼번에 전달되는 상황',
    role: 'Kubernetes · Redis/Kafka/KEDA Operations / Monitoring / Terraform',
    summary:
      'Waiting Room으로 진입을 제어하고 Kafka 비동기 처리와 KEDA Autoscaling을 연결했습니다. Kubernetes Runtime과 Redis·Kafka/KEDA 운영, Monitoring·복구·Terraform 정합성 검증을 담당했습니다.',
    tags: ['OpenStack', 'Kubernetes', 'Kafka', 'Redis', 'KEDA', 'Prometheus', 'Grafana'],
    cardEvidence: ['[MY] 외부 HTTP 300/300 → Consumer 1→4→1', '[MY] Terraform worker-03 Drift Recovery'],
    architecture: [
      'User',
      'Kong Ingress',
      'Redis Waiting Room',
      'Queue Token / Courses UI / CAPTCHA',
      'Producer / Redis admission-control',
      'Kafka',
      'Consumer',
      'MariaDB',
    ],
    architectureNote: '운영·관측: Kafka Lag → KEDA/HPA → Consumer Scaling · Prometheus → Grafana',
    myContributions: [
      'Kubernetes Runtime 운영·복구',
      'Redis–Kafka–Consumer E2E 재검증',
      'Kafka Lag 기반 KEDA 운영',
      'Monitoring 인수·재구성',
      'Terraform worker-03 Drift Recovery',
      'Runtime ↔ Git/Manifest 정합성 검증',
    ],
    projectResults: [
      'Redis Waiting Room + Kafka 비동기 처리',
      'Kafka Lag 기반 KEDA/HPA 확장·축소',
      'Prometheus / Grafana 기반 관측',
      'Terraform Worker 복구 PoC',
    ],
    troubleshooting: {
      title: 'Scale-out 과정의 Consumer Pod Pending',
      badge: 'PROJECT',
      rows: [
        { label: 'Symptom', value: 'KEDA Scale-out 과정에서 일부 Consumer Pod가 Pending' },
        { label: 'Cause', value: 'Consumer Pod가 특정 Worker에 편중되며 Worker-02 메모리 부족 발생' },
        { label: 'Action', value: 'Node Affinity · Topology Spread 및 운영 컴포넌트 배치 조정' },
        { label: 'Result', value: 'Consumer 분산 적용 및 Strimzi Operator·Metrics Server 배치 조정' },
      ],
      note: 'Auto Scaling에서는 Replica 수뿐 아니라 Scheduling과 Node Resource 상태도 함께 확인해야 했습니다.',
    },
    validation: [
      'Traffic 증가',
      'Kafka Lag 증가',
      'KEDA Trigger',
      'Consumer Scale-out',
      'Lag 감소',
      'Scale-in',
    ],
    evidenceSnapshots: [
      {
        title: '외부 HTTP 부하 → Redis / Kafka → KEDA 1→4→1',
        scope: 'MY',
        validatedAt: '2026-08-10',
        source: '0810_05 외부 HTTP 부하 KEDA 최종 E2E',
        summary:
          'Kubernetes 외부 Ops VM에서 실제 수강신청 요청을 넣고 Kafka Lag 증가부터 Consumer 자동 확장·축소까지 운영 흐름을 확인했습니다.',
        facts: [
          '300 / 300 HTTP 200 · Concurrency 50',
          'HPA External Metric 약 60 / 5 → Consumer 1 → 4',
          'Worker-01 2개 · Worker-02 2개로 분산',
          'Lag 해소 후 4 → 1 Scale-in · Kafka Broker Running',
        ],
        note:
          'HTTP 200은 요청 수락 증거이며 300건 전체 DB Commit 완료로 확대 해석하지 않습니다. 573.68 req/s도 짧은 Demo 전송 처리량 Snapshot입니다.',
      },
      {
        title: '공식 Kafka E2E · 최소권한 Cutover 검증',
        scope: 'MY',
        validatedAt: '2026-08-06',
        source: '0806_01 공식 요청 경로 Kafka E2E 복구와 검증',
        summary:
          'Mainpage의 실제 요청 경로에서 NetworkPolicy → TLS Trust → SCRAM → Topic / Group ACL을 순서대로 복구하고 MariaDB 반영까지 재검증했습니다.',
        facts: [
          'Mainpage → Kong → Producer → Kafka → Consumer → MariaDB',
          'HTTP 200 · Enrollment 2 → 3 · New Enrollment ID 44',
          'Consumer Ready=true · Restart=0 · Error=false',
          'POST_CUTOVER_E2E_SUCCESS',
        ],
        note:
          '이 8/6 Snapshot의 공식 Producer 경로에는 Redis 호출이 없었습니다. Redis 포함 최종 흐름과 시점을 섞지 않습니다.',
      },
      {
        title: 'Observability · Final Runtime Health Snapshot',
        scope: 'PROJECT',
        validatedAt: '2026-08-13',
        source: 'Durian Final Snapshot / Current Status',
        summary:
          '최종 Runtime에서 KEDA 재현성, Prometheus/Grafana 관측 스택과 전체 Health Check가 함께 정상 상태인지 확인한 프로젝트 결과입니다.',
        facts: [
          'KEDA Manifest server-side dry-run PASS · kubectl diff RC=0',
          'Prometheus · Grafana · Alertmanager · kube-state-metrics Running',
          'QueuePilot Operations + Service Dashboard 운영',
          'Final Health PASS 43 / WARN 0 / FAIL 0',
        ],
        note:
          'Project-level 최종 결과입니다. 개인 기여는 Monitoring 인수·재구성과 KEDA 운영 범위로 구분합니다.',
      },
    ],
    learned: '개별 기술보다 전체 운영 흐름이 연결되는지 검증하는 것이 중요했습니다.',
    limitations: 'HTTP 300/300은 비동기 요청 수락 Evidence이며 DB 300건 Commit을 의미하지 않습니다. Terraform 범위는 worker-03 단일 Compute Instance이고 반복 시험 기반 P95/SLI/SLO는 후속 과제입니다.',
    evidence: [],
    boundaryNotes: ['Project Troubleshooting은 팀·프로젝트 결과로 구분합니다.'],
  },
  {
    slug: 'bluebell',
    order: '02',
    name: 'Bluebell',
    subtitle: 'AWS Web/WAS + Local DB 하이브리드 3-Tier 인프라',
    problem: '수작업 복구와 서버 재구성 시 설정 편차, 복구 완료 판단 기준 부족',
    role: 'Team Lead / Web–WAS / Integration Validation',
    summary:
      'Web–WAS 계층을 구축하고 각 담당 영역을 Web → WAS → DB E2E 요청 흐름으로 연결해 통합 검증했습니다.',
    tags: ['AWS', 'Ansible', 'Docker Swarm', 'Nginx', 'Prometheus', 'Grafana'],
    cardEvidence: ['[MY] ASG Replacement 통합 검증', '[BOUNDARY] Recovery Design ≠ Final Trigger Test'],
    architecture: ['User', 'Public ALB', 'Web / Nginx', 'Internal WAS LB', 'WAS / Flask API', 'DB Proxy', 'MariaDB'],
    architectureNote:
      '환경 경계: AWS Web/WAS/Bastion/Monitoring · Local(On-Premise) HAProxy/MariaDB · 운영 지원: Ansible/Swarm/Recovery',
    myContributions: [
      '프로젝트 Team Lead',
      'Web–WAS Traffic Flow 통합',
      'Public ALB / Internal WAS LB / Target Group 검증',
      'ASG Web Replacement E2E · Dynamic Inventory 검증',
      'Cleanup / Baseline Recovery',
      '일정·문서·발표 및 통합 상태 관리',
    ],
    projectResults: [
      'Automation · Ansible / Docker Swarm',
      'Recovery Design · EventBridge / SSM / ASG',
      'Monitoring · Prometheus / Grafana',
      'DB · Cluster / Backup',
    ],
    troubleshooting: {
      title: 'Recovery Validation',
      badge: 'PROJECT',
      rows: [
        { label: 'Replacement', value: '신규 Web Node 생성 · Private IP 자동 할당' },
        { label: 'Service', value: 'Replacement task Running · Web / WAS 2/2' },
        { label: 'Load Balancer', value: 'Target Group Healthy · /, /api/health, /api/server HTTP 200' },
        { label: 'Monitoring', value: 'node_exporter / cAdvisor 재편입 · Grafana 관측 대상 갱신 · Instance Down Alert 확인' },
      ],
      note: 'Node Created ≠ Recovery Complete',
    },
    validation: [
      'ASG Desired 0→1',
      'Replacement EC2',
      'Dynamic Inventory',
      'Ansible / Exporter',
      'Swarm Join / Label',
      'Target Group Healthy',
      'Public ALB HTTP 200',
      'Prometheus UP',
      'Cleanup / Baseline',
    ],
    evidenceSnapshots: [
      {
        title: 'Web–WAS 통합 검증 · Target Group Healthy',
        scope: 'MY',
        validatedAt: '2026-07-14',
        source: 'Bluebell final presentation p.9',
        summary:
          'Web–WAS 구축 담당 범위에서 Public ALB부터 Internal WAS LB까지 요청 흐름과 서비스·Target Group 정상 상태를 통합 검증했습니다.',
        facts: [
          'Public ALB → Web → Internal WAS LB → WAS',
          'bluebell-web_nginx 2/2 · bluebell-was_flask 2/2',
          '/api/health · /api/server 응답 확인',
          'Web / WAS Target Group 2 healthy · 0 unhealthy',
        ],
        image: '/evidence/bluebell/web-was-target-healthy.svg',
        imageAlt: 'Bluebell Web 및 WAS Target Group이 각각 2 healthy, 0 unhealthy인 검증 화면',
        imageCaption: 'Web / WAS Target Group · 2 healthy · 0 unhealthy',
        note:
          '개인 기여는 Web–WAS 구축과 AWS·통합 검증 범위입니다. Ansible·Swarm 자동화 전체를 개인 구현으로 표현하지 않습니다.',
      },
      {
        title: 'ASG Replacement → Service / Target Group 정상화',
        scope: 'PROJECT',
        validatedAt: '2026-07-14',
        source: 'Bluebell final presentation p.13',
        summary:
          '장애 감지 이후 Replacement 노드가 생성되고 Swarm 서비스와 Target Group으로 다시 편입되는 복구 흐름을 프로젝트 결과로 검증했습니다.',
        facts: [
          '신규 Web Node 생성 · Private IP 자동 할당',
          'Dynamic Inventory web · swarm_workers · Ansible failed=0',
          'Replacement task Running · Web / WAS 2/2',
          'Target Group healthy · / · /api/health · /api/server 200',
        ],
        image: '/evidence/bluebell/replacement-target-healthy.svg',
        imageAlt: 'Bluebell Replacement 인스턴스가 Target Group에서 healthy로 확인된 화면',
        imageCaption: 'Replacement instance → Target Group healthy',
        note:
          'Recovery 자동화 자체는 팀 구현입니다. 개인 포인트는 각 담당 영역을 연결해 복구 완료 상태를 통합 검증한 부분입니다.',
      },
      {
        title: 'Monitoring Restored · Replacement 관측 연속성',
        scope: 'PROJECT',
        validatedAt: '2026-07-14',
        source: 'Bluebell final presentation p.13 / p.18',
        summary:
          '복구 완료를 서버 생성으로 끝내지 않고 Exporter 재편입과 Grafana 관측·Alerting까지 이어지는 운영 상태를 확인했습니다.',
        facts: [
          'node_exporter · cAdvisor 재편입',
          'Grafana 관측 대상 갱신',
          'Instance Down 감지 · Email / Contact Point 알림',
          '신규 Web Node → Service → Target Group → Monitoring 연속성 검증',
        ],
        image: '/evidence/bluebell/monitoring-restored.svg',
        imageAlt: 'Bluebell Replacement 노드가 Grafana Node Exporter 대시보드에 다시 관측되는 화면',
        imageCaption: 'Replacement node · Grafana monitoring continuity',
        note:
          'Monitoring 구축·프로비저닝은 팀 담당 영역이며, 이 카드는 Project Result로 구분합니다.',
      },
    ],
    learned:
      '복구 완료 여부를 서버 생성에 두지 않고, Service Running + Target Healthy + HTTP 200 + Monitoring Restored까지 확인했습니다.',
    evidence: [],
    boundaryNotes: [
      'Recovery Trigger는 EventBridge → SSM 구조로 설계했지만 최종 7/13 E2E에서는 EventBridge Rule 2개를 DISABLED로 유지하고 동일 복구 경로를 통제 실행했습니다.',
      'Recovery 자동화 전체와 DB/Monitoring 세부 구현은 팀 범위이며 개인 기여는 Web–WAS/AWS 통합 및 Recovery Validation 중심입니다.',
    ],
  },
  {
    slug: 'onereport',
    order: '03',
    name: 'OneReport',
    subtitle: '복합사고 다기관 공동대응 운영 플랫폼',
    problem: '기관별 배정·상태·이력이 분리되면 전체 대응 상황을 파악하기 어려운 문제',
    role: 'Backend — Domain / DB / Routing / Contract / Rule Classification',
    summary:
      'Report와 Incident를 중심으로 기관 배정, 상태 전이, Timeline을 연결하고 규칙 기반 분석과 Smoke Test를 구현했습니다.',
    tags: ['FastAPI', 'PostgreSQL', 'AWS', 'S3', 'SSE'],
    cardEvidence: ['[MY] PR #9/#14/#27/#30 — Backend Evidence', '[PROJECT] Final 운영 Smoke · FINAL: PASS'],
    architecture: ['Report', 'Rule-based Analysis', 'Routing', 'Incident', 'Agency Status', 'Timeline'],
    architectureNote: '규칙 기반 분석 · 실제 공공기관 시스템 연계 없음',
    myContributions: [
      'Report / Incident·기관 대응 Model',
      'Category 기반 Agency Routing',
      '상태 전이 · Alembic Migration',
      'Timeline REST / SSE',
      'OpenAPI / Contract · Backend Test',
      'Demo Smoke Test 작성·확장',
    ],
    projectResults: [
      'Implemented AWS PoC: Route53 → EC2 + Nginx → Frontend / Backend · FastAPI → RDS PostgreSQL / S3',
      '제안 범위와 실제 구현 범위를 분리',
    ],
    validation: ['HTTPS / Auth', 'Rule Analysis', 'Routing', 'Report / Incident / RDS', 'S3', 'Agency Status / Timeline', 'Admin', 'FINAL: PASS'],
    evidenceSnapshots: [
      {
        title: 'PR #9 · Core Domain / DB',
        scope: 'MY',
        validatedAt: '2026-08-20',
        source: 'GitHub PR #9 · 핵심 도메인 및 DB 흐름 구현',
        summary:
          'Report / Incident와 기관 대응 모델을 구현하고 Category 기반 기관 배정, 상태 전이, Timeline 흐름을 DB·Migration과 함께 연결했습니다.',
        facts: [
          'Report / Incident · 기관 대응 DB Model',
          'Category 기반 기관 자동 배정 · 상태 전이',
          'Alembic Migration · Domain Test',
          'PR 시점 Backend 전체 테스트 41 passed · OpenAPI 생성 PASS',
        ],
        note:
          '41 passed는 PR #9 검증 시점의 Snapshot입니다. 다른 PR의 테스트 수와 합산하지 않습니다.',
      },
      {
        title: 'PR #14 · Timeline Contract',
        scope: 'MY',
        validatedAt: '2026-08-20',
        source: 'GitHub PR #14 · Timeline 응답 형식 수정',
        summary:
          'Frontend가 기대하는 Timeline REST 계약에 맞춰 응답 형식을 { items, total }로 통일하고 SSE / Timeline item payload는 유지했습니다.',
        facts: [
          'Timeline REST → { items, total } Contract 정합',
          'SSE / Timeline item payload는 변경하지 않음',
          'API Contract 문서 최신화',
          'PR 시점 Backend 전체 테스트 49 passed · OpenAPI 생성 PASS',
        ],
        note:
          '49 passed는 PR #14 시점의 독립 검증값이며 PR #9 / #27과 합산하지 않습니다.',
      },
      {
        title: 'PR #27 · Rule-based Analysis',
        scope: 'MY',
        validatedAt: '2026-08-20',
        source: 'GitHub PR #27 · 신고 내용 자동분석 및 기관 추천 기능',
        summary:
          '신고 설명을 규칙 기반으로 분석해 사고 유형·위험도를 추천하고 기존 Routing 로직으로 대응기관을 연결했습니다. 실패·미분류 시 수동 선택으로 돌아가도록 설계했습니다.',
        facts: [
          'POST /api/analyze-report Rule-based Analysis',
          '기존 route_categories() 기반 대응기관 추천',
          '분석 실패 / 미분류 → 수동 선택 fallback',
          'PR 시점 Backend 65 passed · Frontend 분석 흐름 3 passed · production build PASS',
        ],
        note:
          'LLM / AI 분석이 아니라 Rule-based Analysis입니다. 테스트 수치는 이 PR의 검증 Snapshot으로만 사용합니다.',
      },
    ],
    learned: 'Domain·DB·API 상태가 실제 Incident 운영 흐름과 일치하도록 구현하고 검증했습니다.',
    evidence: [],
    boundaryNotes: [
      'Rule-based Analysis이며 LLM 기반 분석이 아닙니다.',
      '실제 112·119 등 공공기관 시스템 연계는 구현 범위가 아닙니다.',
      'PR #30 시점 실서버 /api/health는 502였고, 배포 정상화 후 8/21 운영 Domain Smoke에서 FINAL: PASS를 확인했습니다.',
      'PR별 테스트 수치는 해당 시점 Snapshot이며 합산하지 않습니다.',
      'OneReport 팀 저장소는 비공개이므로 공개 Web에서는 직접 Repository/PR 링크를 노출하지 않고 검증 Snapshot만 요약합니다.',
    ],
  },
  {
    slug: 'labbit',
    order: '04',
    name: 'Labbit',
    status: 'IN PROGRESS · 2026-10-03',
    subtitle: 'OpenStack 기반 Virtual Lab Platform',
    problem: 'Multi-VM 실습환경의 복잡한 상태·권한·오류를 Browser Workspace에서 안전하게 표현해야 하는 문제',
    role: 'Frontend / Design / Contract Consumer',
    summary:
      'React SPA가 기존 HTTP/WS 계약을 안전하게 소비하도록 Auth·권한·오류 UX를 구현하고, 실제 Backend Auth/Class Browser Flow를 검증했습니다.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'OpenAPI', 'WebSocket', 'Vitest', 'CI'],
    cardEvidence: ['[MY] Auth/Class 실제 Backend Browser Flow', '[DRAFT] Terminal/File Consumer · VM E2E Pending'],
    architecture: ['Team SSOT', 'React SPA', 'HTTP / WS Consumer', 'Auth / Permission / Error UX', 'Regression Test', 'Browser Acceptance'],
    architectureNote: 'Frontend는 계약에 없는 Endpoint·Token·Error Code를 임의 정의하지 않음',
    myContributions: [
      'unknown state fallback',
      '401 / 403 / 409 처리',
      'destructive action guard',
      'Mock / HTTP boundary',
      'Class / Workspace / LabSpec UI',
      '실제 Auth/Class HTTP Browser Acceptance',
      'Terminal/File Consumer Draft · 오류/동시성 UX',
    ],
    projectResults: ['PR #59 merged · Vitest 109', 'Auth/Class actual Backend Browser 검증', 'PR #62/#68/#70/#71 Open Draft · VM E2E Pending'],
    validation: ['Contract / Unit / CI', 'Actual Backend Browser', 'Actual OpenStack VM E2E · Pending'],
    evidenceSnapshots: [
      {
        title: 'PR #23 · Session / Mutation Safety',
        scope: 'MY',
        validatedAt: '2026-09-22',
        source: 'GitHub PR #23 · 세션·로그아웃·mutation 안전 UX 통합',
        summary:
          '보호 Route와 mutation에서 세션 만료·권한 변경·충돌을 구분해 처리하고, 동일 destructive action이 잘못 반복되지 않도록 상태 재동기화와 Guard를 연결했습니다.',
        facts: [
          'Mutation 401 → Login 복귀 · stale me 인증 Cache 폐기',
          'Mutation 403 → 요청 시점 권한 변경 안내',
          'Provision / Reset 409 → Class·LabExecution 재조회 + 동일 요청 즉시 재시도 차단',
          '기존 OpenAPI 401 / 403 의미만 Consumer로 사용 · 새 Error Code 미정의',
        ],
        href: 'https://github.com/ktcloud4-SL/labbit-app/pull/23',
        linkLabel: 'PR #23 원본 보기',
        note:
          'Server authorization이 최종 권한 경계이며 Frontend는 계약을 소비하고 잘못된 사용자 동작을 줄이는 역할에 집중했습니다.',
      },
      {
        title: 'PR #25 / #26 · Mock–HTTP Boundary',
        scope: 'MY',
        validatedAt: '2026-09-22',
        source: 'GitHub PR #25 · Mock·HTTP 선택 / PR #26 · production Mock fixture 정리',
        summary:
          'UI-only 개발 흐름은 Mock으로 유지하면서 실제 Backend 통합 시 기존 /api/v1 Contract를 그대로 소비하도록 개발·Production 경계를 분리했습니다.',
        facts: [
          '개발 기본값 Mock · VITE_LABBIT_API_MODE=http에서 HTTP Consumer 선택',
          'Production Build는 설정과 무관하게 HTTP Consumer 사용',
          'Vite /api/v1 Proxy · LABBIT_DEV_BACKEND_URL로 Local Backend 대상 분리',
          'PR #25 Contracts #100 · Go #101 · Web #129 success · PR #26 DEV guard / lazy Mock 정리',
        ],
        href: 'https://github.com/ktcloud4-SL/labbit-app/pull/25',
        linkLabel: 'PR #25 원본 보기',
        note:
          '새 HTTP Contract를 정의한 작업이 아니라 기존 Contract Consumer 경계와 개발환경 전환 방식을 정리한 작업입니다.',
      },
      {
        title: 'PR #28 · Functional Prototype / UI Capture',
        scope: 'MY',
        validatedAt: '2026-09-23',
        source: 'GitHub PR #28 · Functional Prototype UI polish 및 capture 자동화',
        summary:
          'Class·Workspace·LabSpec·Provision·Operation과 Reset/Cleanup 안전 UX를 팀 리뷰 가능한 Functional Prototype으로 정리하고 대표 상태를 자동 재현하는 Capture 흐름을 추가했습니다.',
        facts: [
          'Login부터 Reset 확인까지 대표 17개 화면 상태 정의',
          'PR 기록의 기존 UI HEAD: typecheck · lint · build PASS · Vitest 69 / 69',
          'PR 기록의 기존 UI HEAD: capture 17 / 17',
          'CodeQL 후속 HEAD: Web · Go · Contracts · PR Security check PASS',
        ],
        href: 'https://github.com/ktcloud4-SL/labbit-app/pull/28',
        linkLabel: 'PR #28 원본 보기',
        note:
          '69/69과 capture 17/17은 PR 본문에 기록된 당시 UI HEAD Snapshot입니다. 프로젝트 전체 완료나 merge commit 재측정 수치로 확대하지 않습니다.',
      },
    ],
    learned: 'Server authorization을 최종 권한 경계로 두고 Frontend에서는 계약을 소비하는 역할에 집중했습니다.',
    evidence: [
      { label: 'Repository', href: 'https://github.com/ktcloud4-SL/labbit-app' },
    ],
    boundaryNotes: [
      '프로젝트는 IN PROGRESS이며 Snapshot은 2026-10-03 기준입니다.',
      'Auth/Class는 실제 Backend Browser 단계까지 검증했습니다.',
      'PR #62/#68/#70/#71은 Open Draft이며 Terminal/File actual OpenStack VM PTY/SFTP E2E는 아직 완료하지 않았습니다.',
      'Preview/Live/AWS Browser Flow도 완료 성과로 표현하지 않습니다.',
    ],
  },
]

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))
