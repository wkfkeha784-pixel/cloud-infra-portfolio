import type { Project } from '../data/projects'

type ArchitectureLane = { environment: string; nodes: { title: string; detail: string }[]; layout?: 'flow' | 'parallel' }
type ArchitectureView = { introduction: string; lanes: ArchitectureLane[]; supporting: string[]; laneConnection?: string }

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
    supporting: ['Kafka Lag를 기준으로 KEDA가 Consumer 수 조절', 'Prometheus·Grafana로 서비스 상태 확인'],
    laneConnection: 'Kafka로 전달된 요청을 Consumer가 비동기로 처리',
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
    supporting: ['Ansible·Docker Swarm으로 구성·배포', 'ASG 교체 후 Target Group·HTTP·모니터링 확인'],
    laneConnection: 'AWS의 API 서버에서 온프레미스 DB로 연결',
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
      { environment: '신고 처리 절차 · 서비스 기능', nodes: [
        { title: 'Report', detail: '신고 접수' },
        { title: '규칙 분석', detail: '유형·위험도 추천' },
        { title: '기관 Routing', detail: '사건 배정' },
        { title: 'Incident / Timeline', detail: '상태·처리 이력' },
      ] },
    ],
    supporting: ['PostgreSQL 기반 상태 관리', 'Timeline REST · SSE로 진행 상태 전달'],
  },
  labbit: {
    introduction: '브라우저에서 실습 환경을 신청하고, Terminal·파일·Live 화면으로 학습하는 가상 실습 플랫폼입니다.',
    lanes: [
      { environment: '브라우저에서 사용하는 기능 · 병렬 경로', layout: 'parallel', nodes: [
        { title: 'React 웹', detail: '수업·실습 관리 화면' },
        { title: 'HTTP API', detail: '인증·수업·Workspace' },
        { title: 'Terminal / File', detail: '세션·편집·저장' },
        { title: 'Live WSS', detail: '학생 읽기 전용 출력' },
      ] },
      { environment: '실습환경 구성 · 연결 대상', layout: 'parallel', nodes: [
        { title: 'Backend', detail: '권한·실습 상태 확인' },
        { title: 'Workspace', detail: 'Provision / Reset / Cleanup' },
        { title: 'OpenStack 실습 VM', detail: 'Terminal·파일 실습 대상' },
      ] },
    ],
    supporting: ['HTTP API로 수업·실습 상태 조회', 'Terminal·File·Live는 각각 필요한 HTTP/WSS 경로로 통신'],
  },
}

export default function ProjectArchitecture({ project }: { project: Project }) {
  const view = views[project.slug]
  if (!view) return null

  return (
    <figure className="story-architecture" aria-label={`${project.name} 서비스 아키텍처`}>
      <p className="story-architecture-intro">{view.introduction}</p>
      {view.lanes.map((lane, index) => (
        <div className="story-architecture-block" key={lane.environment}>
        <div className="story-architecture-lane">
          <h3>{lane.environment}</h3>
          <ol className={`story-architecture-nodes${lane.layout === 'parallel' ? ' story-architecture-nodes-parallel' : ''}`}>
            {lane.nodes.map((node) => (
              <li key={node.title} className="story-architecture-node">
                <strong>{node.title}</strong>
                <span>{node.detail}</span>
              </li>
            ))}
          </ol>
        </div>
        {view.laneConnection && index === 0 && <p className="story-architecture-connection" aria-label="두 환경 간 연결">↓ {view.laneConnection}</p>}
        </div>
      ))}
      <div className="story-architecture-support">
        {view.supporting.map((item) => <p key={item}>{item}</p>)}
      </div>
    </figure>
  )
}
