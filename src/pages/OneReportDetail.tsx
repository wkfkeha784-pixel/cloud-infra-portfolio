import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import { onereportReading } from '../data/onereportReading'
import type { EvidenceSnapshot, Project } from '../data/projects'
import '../styles/onereport.css'

type Section = typeof onereportReading.sections[number]

// Reuse the established reading layout and typography without changing Bluebell.
function ReadingSection({ section, children }: { section: Section; children: ReactNode }) {
  return (
    <section id={section.id} className="bluebell-section onereport-section" aria-labelledby={`${section.id}-title`} tabIndex={-1}>
      <div className="bluebell-section-heading"><span className="eyebrow">{section.number}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div>
      {children}
    </section>
  )
}

function ImplementationCase({ item, title, problem }: { item: EvidenceSnapshot; title: string; problem: string }) {
  return (
    <article className="evidence-snapshot-card bluebell-case onereport-case">
      <div className="bluebell-case-meta"><Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge><span>개인 구현·검증 · <time dateTime={item.validatedAt}>{item.validatedAt}</time></span></div>
      <h3>{title}</h3>
      <div className="bluebell-case-copy"><h4>해결할 문제</h4><p>{problem}</p></div>
      <div className="bluebell-case-copy"><h4>구현·수정</h4><p>{item.summary}</p></div>
      <div className="bluebell-case-result">
        <h4>구현 결과와 검증</h4>
        <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        {item.note && <p className="bluebell-case-condition">{item.note}</p>}
      </div>
      <details className="bluebell-case-source"><summary>PR 검증 기록·출처</summary><div><p className="onereport-source-name">{item.source}</p><p>{item.title}</p></div></details>
    </article>
  )
}

export default function OneReportDetail({ project }: { project: Project }) {
  const [overview, flow, domain, contract, analysis, smoke, boundary] = onereportReading.sections
  const [domainSnapshot, contractSnapshot, analysisSnapshot] = project.evidenceSnapshots ?? []

  return (
    <div className="onereport-detail">
      <section className="project-hero bluebell-hero">
        <div className="container">
          <Link className="back-link" to="/#projects">← Selected Projects</Link>
          <span className="eyebrow">PROJECT {project.order} · BACKEND & INTEGRATION</span>
          <h1><span className="bluebell-project-name">{project.name}</span>{' '}<span className="bluebell-headline">{onereportReading.headline}</span></h1>
          <p className="bluebell-subtitle">{project.subtitle}</p>
          <p className="project-detail-summary">{project.summary}</p>
          <h2 className="bluebell-results-title">확인한 핵심 결과</h2>
          <div className="bluebell-highlights" aria-label="OneReport 핵심 성과">{onereportReading.highlights.map((item) => (
            <div key={item.result}><Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge><strong>{item.result}</strong><span>{item.context}</span></div>
          ))}</div>
        </div>
      </section>

      <div className="container bluebell-layout">
        <aside className="bluebell-toc"><nav aria-label="OneReport 사례 목차"><h2>읽을 내용</h2><ol>{onereportReading.sections.map((section) => (
          <li key={section.id}><Link to={`#${section.id}`}><span aria-hidden="true">{section.number}</span>{section.label}</Link></li>
        ))}</ol></nav></aside>

        <div className="bluebell-content">
          <ReadingSection section={overview}>
            <p className="bluebell-intro">{project.problem}</p>
            <dl className="bluebell-role"><dt>담당 역할</dt><dd>{project.home.role}</dd></dl>
            <div className="bluebell-subheading"><Badge>MY</Badge><h3>개인 담당 범위</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="tags" aria-label="OneReport 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>

          <ReadingSection section={flow}>
            <div className="bluebell-subheading"><Badge tone="project">PROJECT</Badge><h3>Incident 운영 흐름</h3></div>
            <figure className="bluebell-architecture">
              {[{ title: '신고 분석과 기관 배정', start: 0, end: 3 }, { title: '사건·대응 상태·처리 이력', start: 3, end: 6 }].map((group) => (
                <div className="bluebell-architecture-stage" key={group.title}>
                  <h4>{group.title}</h4><ol start={group.start + 1}>{project.architecture.slice(group.start, group.end).map((item, index) => (
                    <li key={item}><span aria-hidden="true">{group.start + index + 1}</span>{item}</li>
                  ))}</ol>
                </div>
              ))}<figcaption>{project.architectureNote}</figcaption>
            </figure>
          </ReadingSection>

          <ReadingSection section={domain}>{domainSnapshot && <ImplementationCase item={domainSnapshot} {...onereportReading.cases.domain} />}</ReadingSection>
          <ReadingSection section={contract}>{contractSnapshot && <ImplementationCase item={contractSnapshot} {...onereportReading.cases.contract} />}</ReadingSection>
          <ReadingSection section={analysis}>{analysisSnapshot && <ImplementationCase item={analysisSnapshot} {...onereportReading.cases.analysis} />}</ReadingSection>

          <ReadingSection section={smoke}>
            <article className="bluebell-case onereport-smoke">
              <div className="bluebell-case-meta"><Badge tone="project">PROJECT</Badge><span>팀 AWS PoC · 운영 검증 <time dateTime="2026-08-21">2026-08-21</time></span></div>
              <h3>배포 정상화 이후 실제 운영 흐름을 Smoke로 확인했습니다.</h3>
              <div className="bluebell-case-copy"><h4>개인 기여</h4><p>PR #30에서 Demo Smoke Test를 작성·확장해 신고부터 기관 상태·Timeline까지 확인하는 검증 흐름을 연결했습니다.</p></div>
              <div className="onereport-smoke-condition"><h4>검증 시점과 결과</h4><p>{project.boundaryNotes?.[2]}</p></div>
              <div className="bluebell-case-copy"><h4>팀이 구현한 AWS PoC</h4><p>{project.projectResults?.[0]}</p></div>
              {project.validation && <div className="bluebell-validation">
                <h4>운영 Smoke 확인 순서</h4>
                <ol>{[{ label: '진입·분석', start: 0, end: 3 }, { label: '데이터·저장', start: 3, end: 5 }, { label: '대응·운영', start: 5, end: 7 }, { label: '최종 결과', start: 7, end: 8 }].map((group) => (
                  <li key={group.label}><strong>{group.label}</strong><span>{project.validation?.slice(group.start, group.end).join(' → ')}</span></li>
                ))}</ol>
              </div>}
              <details className="bluebell-case-source"><summary>운영 검증 기록·출처</summary><div><p>PR #30 · Demo Smoke Test / 2026-08-21 운영 Domain Smoke 최종 검증 기록</p></div></details>
            </article>
          </ReadingSection>

          <ReadingSection section={boundary}>
            <p className="bluebell-intro">{project.projectResults?.[1]}</p>
            <div className="onereport-scope-table"><table>
              <caption>구현한 PoC와 사업 제안의 비교</caption>
              <thead><tr><th scope="col">영역</th><th scope="col">실제 구현·검증</th><th scope="col">제안·확장 구상</th></tr></thead>
              <tbody>{onereportReading.scopeRows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.implemented}</td><td>{row.proposed}</td></tr>)}</tbody>
            </table></div>
            <div className="bluebell-closing">
              <div><h3>공공기관 연계 범위</h3><p>{project.boundaryNotes?.[1]}</p></div>
              <div><h3>구현에서 배운 점</h3><p>{project.learned}</p></div>
              <div><h3>공개 검증 근거</h3><p>{project.boundaryNotes?.[4]}</p><p>위 사례의 PR별 검증 기록과 2026-08-21 사업 제안서를 통해 구현과 제안의 시점을 구분했습니다.</p></div>
            </div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
