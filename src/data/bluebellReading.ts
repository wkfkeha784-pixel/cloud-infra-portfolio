// Presentation metadata. The canonical project and evidence objects stay intact.
export const bluebellReading = {
  headline: 'AWS Web–WAS를 구축하고 Replacement 이후 서비스 정상화를 검증했습니다.',
  sections: [
    { id: 'overview', number: '01', label: '프로젝트·담당 역할', title: '프로젝트와 담당 역할' },
    { id: 'architecture', number: '02', label: '하이브리드 요청 구조', title: 'AWS와 Local DB를 연결한 요청 구조' },
    { id: 'web-was', number: '03', label: 'Web–WAS 구축·검증', title: 'Web–WAS 구축과 통합 검증' },
    { id: 'recovery', number: '04', label: 'Replacement 복구', title: 'Replacement 이후 서비스 정상화' },
    { id: 'monitoring', number: '05', label: '관측·알림 복원', title: '복구 이후 관측과 알림의 연속성' },
    { id: 'closing', number: '06', label: '복구 기준·후속 과제', title: '복구 완료 기준과 다음 과제' },
  ],
  highlights: [
    { scope: 'MY', result: 'Web·WAS 2/2', context: '서비스·Target Group·API 응답 통합 검증' },
    { scope: 'MY', result: 'Replacement 정상화', context: '팀 복구 경로의 서비스 재편입·HTTP 응답 확인' },
    { scope: 'PROJECT', result: 'Monitoring Restored', context: 'Exporter 재편입·Grafana 관측·알림 확인' },
  ],
  cases: {
    web: {
      title: 'Web과 WAS를 연결하고 서비스·Target Group·API 응답을 확인했습니다.',
      problem: '계층별 서버가 실행 중이어도 외부 요청이 Web과 WAS를 거쳐 정상 응답하는지는 별도로 확인해야 했습니다.',
      action: 'Web–WAS 계층을 구축하고 Public ALB → Web Nginx → Internal WAS LB → Flask API의 연결을 검증했습니다. 서비스 replica와 Target Group 상태를 API 응답과 함께 확인했습니다.',
    },
    recovery: {
      title: '새 노드 생성부터 서비스 재편입과 HTTP 응답까지 복구 상태를 확인했습니다.',
      problem: 'EC2 교체 이후에도 Swarm 가입·label, 서비스 배치와 Target Group 편입이 이어져야 요청을 다시 처리할 수 있었습니다.',
      action: '팀 복구 경로를 통제 실행하고 신규 노드의 Inventory → Ansible·Exporter → Swarm Join·Label → Target Group·HTTP 상태를 연결해 검증했습니다.',
      trigger: 'EC2 상태 이벤트 → EventBridge → SSM → Bastion 복구 스크립트',
    },
    monitoring: {
      title: 'Replacement 노드를 관측 대상으로 다시 편입하고 알림 상태를 확인했습니다.',
      problem: '서비스가 복구돼도 교체된 노드가 관측 대상에서 빠지면 이후 장애를 판단하기 어려웠습니다.',
      action: '팀이 구성한 Exporter·Grafana·Alerting을 복구 흐름과 연결해 신규 노드 재편입, 관측 대상 갱신과 Instance Down 알림을 확인했습니다.',
    },
  },
  followup: '반복 장애 시험과 RTO/RPO 측정 자동화, HTTPS·보안그룹 보완, DB 정합성·failover 검증 및 알림 체계 이중화를 후속 과제로 정리했습니다.',
} as const
