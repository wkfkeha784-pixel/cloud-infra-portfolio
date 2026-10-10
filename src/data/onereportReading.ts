// Reading metadata only; PR snapshots and canonical project data stay intact.
export const onereportReading = {
  headline: '신고·기관 배정·처리 이력을 하나의 백엔드 흐름으로 구현했습니다.',
  sections: [
    { id: 'overview', number: '01', label: '프로젝트·담당 역할', title: '프로젝트와 담당 역할' },
    { id: 'flow', number: '02', label: '신고부터 대응 이력까지', title: '신고부터 기관 대응과 처리 이력까지' },
    { id: 'domain', number: '03', label: 'Domain·DB·기관 배정', title: '도메인과 DB로 대응 흐름 연결' },
    { id: 'contract', number: '04', label: 'Timeline REST·SSE', title: 'Timeline 응답 계약 정합성' },
    { id: 'analysis', number: '05', label: '규칙 분석·수동 선택', title: '규칙 기반 분석과 수동 선택 복귀' },
    { id: 'smoke', number: '06', label: 'AWS PoC·운영 검증', title: '팀 AWS PoC와 운영 Smoke 검증' },
    { id: 'boundary', number: '07', label: '구현·제안 범위', title: '실제 구현과 제안의 범위' },
  ],
  highlights: [
    { scope: 'MY', result: 'Report → Incident', context: '기관 배정·상태 전이·DB Model 연결' },
    { scope: 'MY', result: 'Timeline REST·SSE', context: '응답 계약 정합·분석 실패 시 수동 선택' },
    { scope: 'PROJECT', result: '운영 Smoke FINAL: PASS', context: '팀 AWS PoC · 배포 정상화 후 2026-08-21' },
  ],
  cases: {
    domain: {
      title: '신고와 Incident, 기관 배정·상태 전이를 DB 흐름으로 연결했습니다.',
      problem: '기관별 배정과 처리 상태가 분리되면 하나의 사고가 어디까지 대응됐는지 일관되게 확인하기 어려웠습니다.',
    },
    contract: {
      title: 'Timeline REST 응답을 Frontend 계약에 맞추고 SSE payload를 유지했습니다.',
      problem: 'Timeline 목록의 응답 형태가 Frontend가 기대하는 계약과 맞지 않아 REST 응답 형식을 정리해야 했습니다.',
    },
    analysis: {
      title: '신고 설명을 규칙으로 분석하고 기존 Routing과 수동 선택으로 연결했습니다.',
      problem: '신고 내용에서 사고 유형·위험도·기관을 추천하면서 분석 실패나 미분류에도 신고 흐름이 이어져야 했습니다.',
    },
  },
  scopeRows: [
    { label: '분석', implemented: '규칙 기반 사고 유형·위험도 추천과 기관 Routing', proposed: 'AI를 활용한 사건 파악·검토' },
    { label: '기관 대응', implemented: '기관 배정·상태·Timeline의 PoC 운영 흐름', proposed: '112·119 및 민간 협력체의 실제 시스템 연계' },
    { label: '운영 기반', implemented: 'Route53 · EC2/Nginx · FastAPI · RDS PostgreSQL · S3', proposed: 'KT G-Cloud · Managed KS · GitOps / Blue-Green 등 확장 운영' },
  ],
} as const
