import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import { bluebellReading } from '../data/bluebellReading'
import type { EvidenceSnapshot, Project } from '../data/projects'

type ReadingSection = typeof bluebellReading.sections[number]

function ReadingSection({ section, children }: { section: ReadingSection; children: ReactNode }) {
  return (
    <section id={section.id} className="bluebell-section" aria-labelledby={`${section.id}-title`} tabIndex={-1}>
      <div className="bluebell-section-heading">
        <span className="eyebrow">{section.number}</span>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
      </div>
      {children}
    </section>
  )
}

function CaseCopy({ label, children }: { label: string; children: ReactNode }) {
  return <div className="bluebell-case-copy"><h4>{label}</h4>{children}</div>
}

function EvidenceCase({ item, title, problem, action, children }: {
  item: EvidenceSnapshot
  title: string
  problem: string
  action: string
  children?: ReactNode
}) {
  return (
    <article className="evidence-snapshot-card bluebell-case">
      <div className="bluebell-case-meta">
        <Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge>
        <span>{item.scope === 'MY' ? '개인 수행·검증' : '팀 결과·통합 검증'} · 발표 근거 <time dateTime={item.validatedAt}>{item.validatedAt}</time></span>
      </div>
      <h3>{title}</h3>
      <CaseCopy label="확인할 문제"><p>{problem}</p></CaseCopy>
      <CaseCopy label="수행·검증"><p>{action}</p></CaseCopy>
      {children}
      <div className="bluebell-case-result">
        <h4>확인한 결과</h4>
        <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        {item.note && <p className="bluebell-case-condition">{item.note}</p>}
      </div>
      {item.image && (
        <figure className="evidence-snapshot-figure bluebell-evidence-figure">
          <img src={item.image} alt={item.imageAlt ?? item.title} />
          {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
        </figure>
      )}
      <details className="bluebell-case-source">
        <summary>검증 기록·출처</summary>
        <div><p className="bluebell-source-name">{item.source}</p><p>{item.title}</p><p>{item.summary}</p></div>
      </details>
    </article>
  )
}

export default function BluebellDetail({ project }: { project: Project }) {
  const [overview, architecture, webWas, recovery, monitoring, closing] = bluebellReading.sections
  const [webSnapshot, recoverySnapshot, monitoringSnapshot] = project.evidenceSnapshots ?? []

  return (
    <div className="bluebell-detail">
      <section className="project-hero bluebell-hero">
        <div className="container">
          <Link className="back-link" to="/#projects">← Selected Projects</Link>
          <span className="eyebrow">PROJECT {project.order} · CLOUD INFRASTRUCTURE</span>
          <h1><span className="bluebell-project-name">{project.name}</span>{' '}<span className="bluebell-headline">{bluebellReading.headline}</span></h1>
          <p className="bluebell-subtitle">{project.subtitle}</p>
          <p className="project-detail-summary">{project.summary}</p>
          <h2 className="bluebell-results-title">확인한 핵심 결과</h2>
          <div className="bluebell-highlights" aria-label="Bluebell 핵심 성과">
            {bluebellReading.highlights.map((item) => (
              <div key={item.result}>
                <Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge>
                <strong>{item.result}</strong><span>{item.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container bluebell-layout">
        <aside className="bluebell-toc">
          <nav aria-label="Bluebell 사례 목차">
            <h2>읽을 내용</h2>
            <ol>{bluebellReading.sections.map((section) => (
              <li key={section.id}><Link to={`#${section.id}`}><span aria-hidden="true">{section.number}</span>{section.label}</Link></li>
            ))}</ol>
          </nav>
        </aside>
        <div className="bluebell-content">
          <ReadingSection section={overview}>
            <p className="bluebell-intro">{project.problem}</p>
            <dl className="bluebell-role"><dt>담당 역할</dt><dd>{project.home.role}</dd></dl>
            <div className="bluebell-subheading"><Badge>MY</Badge><h3>개인 담당 범위</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="bluebell-team-scope">
              <div className="bluebell-subheading"><Badge tone="project">PROJECT</Badge><h3>함께 연결한 팀 구현</h3></div>
              <ul>{project.projectResults?.map((item) => <li key={item}>{item}</li>)}</ul>
              <p>{project.boundaryNotes?.[1]}</p>
            </div>
            <div className="tags" aria-label="Bluebell 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>

          <ReadingSection section={architecture}>
            <div className="bluebell-subheading"><Badge tone="project">PROJECT</Badge><h3>서비스 요청 경로</h3></div>
            <figure className="bluebell-architecture">
              {[{ title: '외부 진입 → AWS Web·WAS', start: 0, end: 5 }, { title: 'WAS → Local(On-Premise) DB', start: 5, end: 7 }].map((group) => (
                <div className="bluebell-architecture-stage" key={group.title}>
                  <h4>{group.title}</h4>
                  <ol start={group.start + 1}>{project.architecture.slice(group.start, group.end).map((item, index) => (
                    <li key={item}><span aria-hidden="true">{group.start + index + 1}</span>{item}</li>
                  ))}</ol>
                </div>
              ))}
              <figcaption>{project.architectureNote}</figcaption>
            </figure>
          </ReadingSection>

          <ReadingSection section={webWas}>
            {webSnapshot && <EvidenceCase item={webSnapshot} {...bluebellReading.cases.web} />}
          </ReadingSection>

          <ReadingSection section={recovery}>
            {recoverySnapshot && (
              <EvidenceCase item={recoverySnapshot} {...bluebellReading.cases.recovery}>
                <div className="bluebell-recovery-condition">
                  <h4>복구 설계와 최종 시험 조건</h4>
                  <p className="bluebell-trigger">{bluebellReading.cases.recovery.trigger}</p>
                  <p>{project.boundaryNotes?.[0]}</p>
                </div>
                {project.validation && <div className="bluebell-validation">
                  <h4>복구부터 운영 마감까지 확인한 순서</h4>
                  <ol>{[{ label: '노드 교체', start: 0, end: 2 }, { label: '운영 편입', start: 2, end: 5 }, { label: '서비스·관측 확인', start: 5, end: 8 }, { label: '마감', start: 8, end: 9 }].map((group) => (
                    <li key={group.label}><strong>{group.label}</strong><span>{project.validation?.slice(group.start, group.end).join(' → ')}</span></li>
                  ))}</ol>
                </div>}
              </EvidenceCase>
            )}
          </ReadingSection>

          <ReadingSection section={monitoring}>
            {monitoringSnapshot && <EvidenceCase item={monitoringSnapshot} {...bluebellReading.cases.monitoring} />}
          </ReadingSection>

          <ReadingSection section={closing}>
            <div className="bluebell-closing">
              <div><h3>Node Created ≠ Recovery Complete</h3><p>{project.learned}</p></div>
              <div><h3>프로젝트에서 배운 점</h3><p>노드 생성, 서비스 편입, 요청 응답과 관측 복원을 한 흐름으로 확인하며 각 담당 영역의 완료 기준을 연결했습니다.</p></div>
              <div><h3>다음 검증 과제</h3><p>{bluebellReading.followup}</p></div>
              <div><h3>원본 자료</h3><p>Bluebell 최종 발표자료 p.7 담당 역할 · p.9 Web/WAS · p.13 Replacement · p.18 Alerting · p.20 개선 방향</p></div>
            </div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
