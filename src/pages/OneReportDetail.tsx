import ProjectQuickRead from '../components/ProjectQuickRead'
import ProjectArchitecture from '../components/ProjectArchitecture'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ProjectMetadata from '../components/ProjectMetadata'
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
      <div className="bluebell-case-meta"><span>구현·검증 · <time dateTime={item.validatedAt}>{item.validatedAt}</time></span></div>
      <h3>{title}</h3>
      <div className="bluebell-case-copy"><h4>해결할 문제</h4><p>{problem}</p></div>
      <div className="bluebell-case-copy"><h4>구현·수정</h4><p>{item.summary}</p></div>
      <div className="bluebell-case-result">
        <h4>구현 결과와 검증</h4>
        <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      </div>

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
            <div key={item.result}><strong>{item.result}</strong><span>{item.context}</span></div>
          ))}</div>
        </div>
      </section>

      <ProjectQuickRead project={project} />

      <div className="container bluebell-layout">
        <aside className="bluebell-toc"><nav aria-label="OneReport 사례 목차"><h2>읽을 내용</h2><ol>{onereportReading.sections.map((section) => (
          <li key={section.id}><Link to={`#${section.id}`}><span aria-hidden="true">{section.number}</span>{section.label}</Link></li>
        ))}</ol></nav></aside>

        <div className="bluebell-content">
          <ReadingSection section={overview}>
            <p className="bluebell-intro">{project.problem}</p>
            <ProjectMetadata project={project} />
            <div className="bluebell-subheading"><h3>프로젝트에서 맡은 일</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="tags" aria-label="OneReport 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>

          <ReadingSection section={flow}>
            <div className="bluebell-subheading"><h3>서비스 구조와 업무 흐름</h3></div>
            <ProjectArchitecture project={project} />
          </ReadingSection>

          <ReadingSection section={domain}>{domainSnapshot && <ImplementationCase item={domainSnapshot} {...onereportReading.cases.domain} />}</ReadingSection>
          <ReadingSection section={contract}>{contractSnapshot && <ImplementationCase item={contractSnapshot} {...onereportReading.cases.contract} />}</ReadingSection>
          <ReadingSection section={analysis}>{analysisSnapshot && <ImplementationCase item={analysisSnapshot} {...onereportReading.cases.analysis} />}</ReadingSection>

          <ReadingSection section={smoke}>
            <article className="bluebell-case onereport-smoke">
              <div className="bluebell-case-meta"><span>AWS PoC 배포 검증 · <time dateTime="2026-08-21">2026-08-21</time></span></div>
              <h3>AWS PoC 배포 정상화 이후 신고·기관 대응 흐름을 Smoke로 확인했습니다.</h3>
              <div className="bluebell-case-copy"><h4>함께 완성한 검증 흐름</h4><p>신고부터 기관 상태·Timeline까지 확인할 수 있도록 Demo Smoke Test를 작성·확장하고 팀의 AWS PoC 배포 점검에 연결했습니다.</p></div>
              <div className="bluebell-case-copy"><h4>AWS PoC 구성</h4><p>{project.projectResults?.[0]}</p></div>
              {project.validation && <div className="bluebell-validation">
                <h4>AWS PoC Smoke 확인 순서</h4>
                <ol>{[{ label: '진입·분석', start: 0, end: 3 }, { label: '데이터·저장', start: 3, end: 5 }, { label: '대응·운영', start: 5, end: 7 }, { label: '최종 결과', start: 7, end: 8 }].map((group) => (
                  <li key={group.label}><strong>{group.label}</strong><span>{project.validation?.slice(group.start, group.end).join(' → ')}</span></li>
                ))}</ol>
              </div>}

            </article>
          </ReadingSection>

          <ReadingSection section={boundary}>
            <div className="onereport-scope-table"><h3>구현 범위와 확장 구상</h3><table>
              <caption>구현한 PoC와 사업 제안의 비교</caption>
              <thead><tr><th scope="col">영역</th><th scope="col">실제 구현·검증</th><th scope="col">제안·확장 구상</th></tr></thead>
              <tbody>{onereportReading.scopeRows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.implemented}</td><td>{row.proposed}</td></tr>)}</tbody>
            </table></div>
            <div className="bluebell-closing">
              <div><h3>구현한 처리 흐름</h3><p>규칙 기반 분석·기관 배정·상태 변경·Timeline을 AWS PoC에서 연결했습니다. 기관 대응 화면은 PoC 데이터로 동작합니다.</p></div>
              <div><h3>구현에서 배운 점</h3><p>{project.learned}</p></div>
              
            </div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
