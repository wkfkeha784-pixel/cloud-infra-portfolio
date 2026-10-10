import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import { labbitReading } from '../data/labbitReading'
import type { EvidenceSnapshot, Project } from '../data/projects'
import '../styles/labbit.css'

type Section = typeof labbitReading.sections[number]

function ReadingSection({ section, children }: { section: Section; children: ReactNode }) {
  return (
    <section id={section.id} className="bluebell-section labbit-section" aria-labelledby={`${section.id}-title`} tabIndex={-1}>
      <div className="bluebell-section-heading"><span className="eyebrow">{section.number}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div>
      {children}
    </section>
  )
}

function ImplementationCase({ item, title, problem, workspace = false }: { item: EvidenceSnapshot; title: string; problem: string; workspace?: boolean }) {
  return (
    <article className="evidence-snapshot-card bluebell-case labbit-case">
      <div className="bluebell-case-meta"><Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge><span>개인 구현·검증 · <time dateTime={item.validatedAt}>{item.validatedAt}</time></span></div>
      <h3>{title}</h3>
      <div className="bluebell-case-copy"><h4>해결할 문제</h4><p>{problem}</p></div>
      <div className="bluebell-case-copy"><h4>구현·수정</h4><p>{item.summary}</p></div>
      <div className="bluebell-case-result">
        <h4>구현 결과와 검증</h4>
        {workspace ? <>
          {[{ label: 'Terminal 세션', start: 0, end: 2 }, { label: '파일 편집·저장', start: 2, end: 4 }].map((group) => (
            <div className="labbit-result-group" key={group.label}><h5>{group.label}</h5><ul>{item.facts.slice(group.start, group.end).map((fact) => <li key={fact}>{fact}</li>)}</ul></div>
          ))}
          <p className="labbit-merge-result">{item.facts[4]}</p>
        </> : <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
        {item.note && <p className="bluebell-case-condition">{item.note}</p>}
      </div>
      <details className="bluebell-case-source"><summary>PR 검증 기록·출처</summary><div><p className="labbit-source-name">{item.source}</p><p>{item.title}</p></div></details>
      {item.href && <a className="evidence-snapshot-link labbit-original-link" href={item.href} target="_blank" rel="noreferrer">{item.linkLabel ?? 'Evidence 원본 보기'} ↗</a>}
    </article>
  )
}

export default function LabbitDetail({ project }: { project: Project }) {
  const [overview, flow, workspace, session, http, prototype, validation, evidence] = labbitReading.sections
  const caseSections = [workspace, session, http, prototype]

  return (
    <div className="labbit-detail">
      <section className="project-hero bluebell-hero">
        <div className="container">
          <Link className="back-link" to="/#projects">← Selected Projects</Link>
          <div className="project-hero-meta"><span className="eyebrow">PROJECT {project.order} · FRONTEND & INTEGRATION</span>{project.status && <span className="status-badge">{project.status}</span>}</div>
          <h1><span className="bluebell-project-name">{project.name}</span>{' '}<span className="bluebell-headline">{labbitReading.headline}</span></h1>
          <p className="bluebell-subtitle">{project.subtitle}</p>
          <p className="project-detail-summary">{project.summary}</p>
          <h2 className="bluebell-results-title">확인한 핵심 결과</h2>
          <div className="bluebell-highlights" aria-label="Labbit 핵심 성과">{labbitReading.highlights.map((item) => (
            <div key={item.result}><Badge>MY</Badge><strong>{item.result}</strong><span>{item.context}</span></div>
          ))}</div>
        </div>
      </section>

      <div className="container bluebell-layout">
        <aside className="bluebell-toc"><nav aria-label="Labbit 사례 목차"><h2>읽을 내용</h2><ol>{labbitReading.sections.map((section) => (
          <li key={section.id}><Link to={`#${section.id}`}><span aria-hidden="true">{section.number}</span>{section.label}</Link></li>
        ))}</ol></nav></aside>
        <div className="bluebell-content">
          <ReadingSection section={overview}>
            <p className="bluebell-intro">{project.problem}</p>
            <dl className="bluebell-role"><dt>담당 역할</dt><dd>{project.role}</dd></dl>
            <div className="bluebell-subheading"><Badge>MY</Badge><h3>개인 담당 범위</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="tags" aria-label="Labbit 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>
          <ReadingSection section={flow}>
            <div className="bluebell-subheading"><Badge>MY</Badge><h3>Frontend 작업 흐름</h3></div>
            <figure className="bluebell-architecture">
              {[{ title: '팀 기준과 계약 소비', start: 0, end: 3 }, { title: '오류·안전 UX와 검증', start: 3, end: 6 }].map((group) => (
                <div className="bluebell-architecture-stage" key={group.title}><h4>{group.title}</h4><ol start={group.start + 1}>{project.architecture.slice(group.start, group.end).map((item, index) => (
                  <li key={item}><span aria-hidden="true">{group.start + index + 1}</span>{item}</li>
                ))}</ol></div>
              ))}<figcaption>{project.architectureNote}</figcaption>
            </figure>
          </ReadingSection>

          {caseSections.map((section, index) => {
            const item = project.evidenceSnapshots?.[index]
            return <ReadingSection section={section} key={section.id}>{item && <ImplementationCase item={item} {...labbitReading.cases[index]} workspace={index === 0} />}</ReadingSection>
          })}

          <ReadingSection section={validation}>
            <p className="bluebell-intro">{project.boundaryNotes?.[0]}</p>
            <div className="bluebell-subheading"><Badge tone="project">PROJECT</Badge><h3>팀 통합 기준의 확인 기록</h3></div>
            <ol className="labbit-gates">
              <li><span className="labbit-gate-state">검증 완료</span><h3>코드·계약·CI</h3><p className="labbit-gate-label">{project.validation?.[0]}</p><p>{project.projectResults?.[0]}</p><p>{project.projectResults?.[2]}</p><p className="labbit-gate-note">PR별 검증 시점의 기록이며 테스트 수치를 합산하지 않습니다.</p></li>
              <li><span className="labbit-gate-state">검증 완료</span><h3>실제 Backend Browser</h3><p className="labbit-gate-label">{project.validation?.[1]}</p><p>{project.projectResults?.[1]}</p><p>{project.boundaryNotes?.[1]}</p></li>
              <li><span className="labbit-gate-state">후속 통합 검증</span><h3>실제 OpenStack VM</h3><p className="labbit-gate-label">{project.validation?.[2]}</p><p>{project.boundaryNotes?.[2]}</p><p>{project.boundaryNotes?.[3]}</p></li>
            </ol>
          </ReadingSection>
          <ReadingSection section={evidence}>
            <div className="bluebell-closing"><div><h3>구현에서 배운 점</h3><p>{project.learned}</p></div><div><h3>공개 원본 자료</h3><p>각 사례의 PR 원본에서 구현·검증 시점과 범위를 확인할 수 있습니다.</p><div className="evidence-links">{project.evidence.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</div></div></div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
