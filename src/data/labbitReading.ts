// Reading metadata; canonical snapshots, dates and claim boundaries stay intact.
export const labbitReading = {
  headline: '실습 화면의 Terminal·File·Live 연동과 사용자 상태 보호를 구현했습니다.',
  sections: [
    { id: 'overview', number: '01', label: '프로젝트·담당 역할', title: '프로젝트와 담당 역할' },
    { id: 'flow', number: '02', label: 'API 연동·검증 흐름', title: '팀 API 계약에 맞춘 연동과 브라우저 검증' },
    { id: 'workspace', number: '03', label: '터미널·파일 통합', title: '터미널·파일 구현과 main 통합' },
    { id: 'session', number: '04', label: '세션·권한·변경 요청', title: '세션·권한 변경과 안전한 사용자 동작' },
    { id: 'http', number: '05', label: 'Mock·HTTP 경계', title: '개발 Mock과 Production HTTP의 경계' },
    { id: 'prototype', number: '06', label: '시제품·화면 캡처', title: '팀 검토를 위한 시제품과 화면 캡처' },
    { id: 'validation', number: '07', label: '후속 구현·연동 기록', title: '후속 Frontend 구현과 Backend 연동 기록' },
    { id: 'evidence', number: '08', label: '원본 자료·배운 점', title: '원본 자료와 구현에서 배운 점' },
  ],
  highlights: [
    { result: 'Terminal·File 구현', context: '개인 PR #62 병합 · 세션·ETag 충돌 보호' },
    { result: 'Live·파일 접근 경계', context: '개인 PR #135/#136 병합 · 코드·CI 검증' },
    { result: '사용자 Flow 안정화', context: '개인 PR #143 병합 · 실제 VM E2E 별도' },
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
