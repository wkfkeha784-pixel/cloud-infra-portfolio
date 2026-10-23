import type { Project } from '../data/projects'

type ArchitectureLane = { environment: string; nodes: { title: string; detail: string }[] }
type ArchitectureView = { introduction: string; lanes: ArchitectureLane[]; supporting: string[]; caveat?: string }

const views: Record<string, ArchitectureView> = {
  durian: {
    introduction: '진입 요청을 대기열에서 제어하고, Kafka에 쌓인 작업량에 따라 Consumer를 확장하는 구조입니다.',
    lanes: [
      { environment: '요청 제어 · Kubernetes / OpenStack', nodes: [
        { title: '사용자', detail: '수강신청 요청' },
        { title: 'Kong Ingress', detail: '서비스 진입' },
        { title: 'Redis Waiting Room', detail: '진입 제어·대기열' },
        { title: 'Producer', detail: '작업 메시지 발행' },
      ] },
      { environment: '비동기 처리 · Kubernetes / OpenStack', nodes: [
        { title: 'Kafka', detail: '요청 메시지 큐' },
        { title: 'Consumer', detail: '비동기 처리' },
        { title: 'MariaDB', detail: '신청 데이터' },
      ] },
    ],
    supporting: ['Kafka Lag → KEDA/HPA → Consumer 자동 확장', 'Prometheus / Grafana로 서비스·리소스 관측'],
    caveat: '8/10 팀 시험의 HTTP 300/300은 비동기 요청 수락 기준이며, DB 300건 저장을 뜻하지 않습니다.',
  },
  bluebell: {
    introduction: 'AWS에서 Web·WAS를 처리하고, 내부 연결을 통해 온프레미스 DB로 이어지는 3-Tier 구조입니다.',
    lanes: [
      { environment: 'AWS · Web / WAS', nodes: [
        { title: 'Public ALB', detail: '외부 요청 분산' },
        { title: 'Web · Nginx', detail: '웹 계층' },
        { title: 'Internal WAS LB', detail: '내부 로드밸런싱' },
        { title: 'WAS · Flask', detail: 'API 처리' },
      ] },
      { environment: 'Local · On-Premise', nodes: [
        { title: 'HAProxy', detail: 'DB 연결 프록시' },
        { title: 'MariaDB', detail: '데이터 저장' },
      ] },
    ],
    supporting: ['Ansible / Docker Swarm으로 구성·배포', 'ASG 교체 후 Target Group · HTTP · Monitoring 확인'],
    caveat: '최종 복구 시험은 EventBridge 자동 트리거가 아닌 통제 실행으로 검증했습니다.',
  },
  onereport: {
    introduction: '신고부터 기관 배정·처리 이력까지 연결한 서비스입니다. 아래는 해커톤에서 구현한 AWS PoC 기준입니다.',
    lanes: [
      { environment: 'AWS PoC · 서비스 구성', nodes: [
        { title: 'Route 53', detail: '도메인 진입' },
        { title: 'EC2 · Nginx', detail: 'Frontend / API 연결' },
        { title: 'FastAPI', detail: '신고·사건·기관 API' },
        { title: 'RDS / S3', detail: '데이터·첨부 저장' },
      ] },
      { environment: '업무 흐름', nodes: [
        { title: 'Report', detail: '신고 접수' },
        { title: '규칙 분석', detail: '유형·위험도 추천' },
        { title: '기관 Routing', detail: '사건 배정' },
        { title: 'Incident / Timeline', detail: '상태·처리 이력' },
      ] },
    ],
    supporting: ['PostgreSQL 기반 상태 관리', 'Timeline REST · SSE로 진행 상태 전달'],
    caveat: '규칙 기반 분석 PoC이며 실제 112·119 연동이나 LLM 기반 분석은 구현 범위에 포함되지 않습니다.',
  },
  labbit: {
    introduction: '브라우저에서 실습 환경을 신청하고, Terminal·파일·Live 화면으로 학습하는 가상 실습 플랫폼입니다.',
    lanes: [
      { environment: '사용자 화면 · Frontend', nodes: [
        { title: 'React 웹', detail: '수업·실습 관리 화면' },
        { title: 'HTTP API', detail: '인증·수업·Workspace' },
        { title: 'Terminal / File', detail: '세션·편집·저장' },
        { title: 'Live WSS', detail: '학생 읽기 전용 출력' },
      ] },
      { environment: '팀 서비스 · 연동 대상', nodes: [
        { title: 'Backend', detail: '권한·실습 상태 확인' },
        { title: 'Workspace', detail: 'Provision / Reset / Cleanup' },
        { title: 'OpenStack 실습 VM', detail: 'Terminal·파일 실습 대상' },
      ] },
    ],
    supporting: ['React / TypeScript · API 계약 기반 연동', '권한 만료·파일 충돌·상태 변경 시 사용자 데이터 보호'],
    caveat: 'Frontend PR·자동 검증과 실제 VM/Live/ADMIN 브라우저 E2E는 별개입니다.',
  },
}

export default function ProjectArchitecture({ project }: { project: Project }) {
  const view = views[project.slug]
  if (!view) return null

  return (
    <figure className="story-architecture" aria-label={`${project.name} 서비스 아키텍처`}>
      <p className="story-architecture-intro">{view.introduction}</p>
      {view.lanes.map((lane) => (
        <div className="story-architecture-lane" key={lane.environment}>
          <h3>{lane.environment}</h3>
          <ol className="story-architecture-nodes">
            {lane.nodes.map((node) => (
              <li key={node.title} className="story-architecture-node">
                <strong>{node.title}</strong>
                <span>{node.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <div className="story-architecture-support">
        {view.supporting.map((item) => <p key={item}>{item}</p>)}
      </div>
      {view.caveat && <figcaption>{view.caveat}</figcaption>}
    </figure>
  )
}
