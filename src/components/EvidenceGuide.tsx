import { Link } from 'react-router-dom'
import Badge from './Badge'

const evidenceLinks: Record<string, { id: string; label: string }[]> = {
  durian: [
    { id: 'load-scaling', label: '부하·확장 검증' },
    { id: 'request-recovery', label: 'Kafka 장애 분석' },
    { id: 'worker-recovery', label: '단일 노드 복구' },
  ],
  bluebell: [
    { id: 'web-was', label: 'Web–WAS 구축' },
    { id: 'recovery', label: '통제 복구 시험' },
    { id: 'monitoring', label: '관측·알림 복원' },
  ],
  onereport: [
    { id: 'domain', label: 'Backend 구현' },
    { id: 'smoke', label: 'AWS PoC 검증' },
    { id: 'boundary', label: '구현·제안 구분' },
  ],
  labbit: [
    { id: 'workspace', label: '터미널·파일 구현' },
    { id: 'prototype', label: '화면·시제품' },
    { id: 'validation', label: '단계별 검증 범위' },
  ],
}

export function EvidenceLegend() {
  return (
    <ul className="evidence-legend" aria-label="기여와 검증 범위 표기">
      <li><Badge>MY</Badge><span>개인 수행·검증</span></li>
      <li><Badge tone="project">PROJECT</Badge><span>팀 구현·결과</span></li>
      <li><Badge tone="open">OPEN</Badge><span>제안·후속 검증</span></li>
    </ul>
  )
}

export default function EvidenceGuide({ slug }: { slug: string }) {
  return (
    <div className="evidence-guide">
      <nav className="evidence-shortcuts" aria-label="핵심 검증 근거 바로가기">
        {evidenceLinks[slug]?.map(({ id, label }) => (
          <Link key={id} to={`#${id}`}>{label}<span aria-hidden="true">↗</span></Link>
        ))}
      </nav>
      <EvidenceLegend />
    </div>
  )
}
