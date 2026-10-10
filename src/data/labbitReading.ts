// Reading metadata; canonical snapshots, dates and claim boundaries stay intact.
export const labbitReading = {
  headline: '브라우저 실습 화면의 터미널·파일 기능을 구현하고 main에 통합했습니다.',
  sections: [
    { id: 'overview', number: '01', label: '프로젝트·담당 역할', title: '프로젝트와 담당 역할' },
    { id: 'flow', number: '02', label: 'API 연동·검증 흐름', title: '팀 API 계약에 맞춘 연동과 브라우저 검증' },
    { id: 'workspace', number: '03', label: '터미널·파일 통합', title: '터미널·파일 구현과 main 통합' },
    { id: 'session', number: '04', label: '세션·권한·변경 요청', title: '세션·권한 변경과 안전한 사용자 동작' },
    { id: 'http', number: '05', label: 'Mock·HTTP 경계', title: '개발 Mock과 Production HTTP의 경계' },
    { id: 'prototype', number: '06', label: '시제품·화면 캡처', title: '팀 검토를 위한 시제품과 화면 캡처' },
    { id: 'validation', number: '07', label: '단계별 검증 범위', title: '확인한 단계와 남은 통합 검증' },
    { id: 'evidence', number: '08', label: '원본 자료·배운 점', title: '원본 자료와 구현에서 배운 점' },
  ],
  highlights: [
    { result: 'PR #62 main 병합', context: '터미널·파일 API 연동 · 2026-10-07' },
    { result: '세션·파일 안전 처리', context: '종료·재연결·충돌·편집 보호 코드/CI 검증' },
    { result: '인증·수업 화면 연동 검증', context: '실제 Backend 흐름 · VM PTY/SFTP E2E는 후속' },
  ],
  cases: [
    {
      title: 'Terminal 연결과 파일 편집을 Workspace에 통합하고 상태·충돌을 보호했습니다.',
      problem: '세션 종료 뒤 재연결이나 이전 연결의 지연 출력, 동시 파일 수정과 미저장 이동을 구분해 처리해야 했습니다.',
    },
    {
      title: '세션 만료·권한 변경·충돌을 구분하고 잘못된 반복 요청을 막았습니다.',
      problem: '보호 화면과 변경 요청에서 인증 만료, 요청 시점 권한 변경, 이미 진행 중인 동작을 같은 오류로 처리할 수 없었습니다.',
    },
    {
      title: 'Mock으로 UI를 개발하면서 Production은 실제 HTTP 계약을 소비하게 했습니다.',
      problem: 'UI-only 개발 환경과 실제 Backend 통합 환경을 전환하면서 Production에 Mock이 남지 않도록 경계를 정리해야 했습니다.',
    },
    {
      title: '대표 UI 상태를 재현해 팀이 검토할 수 있는 Functional Prototype으로 정리했습니다.',
      problem: 'Class·Workspace·LabSpec과 Reset/Cleanup의 상태·확인 동작을 팀이 같은 기준으로 리뷰할 수 있어야 했습니다.',
    },
  ],
} as const
