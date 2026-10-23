import ProjectQuickRead from '../components/ProjectQuickRead'
import ProjectArchitecture from '../components/ProjectArchitecture'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ProjectMetadata from '../components/ProjectMetadata'
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
      <div className="bluebell-case-meta"><span>구현·검증 · <time dateTime={item.validatedAt}>{item.validatedAt}</time></span></div>
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
      
      {item.href && <a className="story-link" href={item.href} target="_blank" rel="noreferrer">관련 구현 코드 ↗</a>}
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
            <div key={item.result}><strong>{item.result}</strong><span>{item.context}</span></div>
          ))}</div>
          <p className="story-hero-caption">팀이 구축한 가상 실습 플랫폼에서 <strong>Terminal·File·Live 사용 흐름</strong>을 구현하고, 세션·권한 변경에도 화면과 데이터가 안전하게 동작하도록 개선했습니다.</p>
        </div>
      </section>

      <ProjectQuickRead project={project} />

      <div className="container bluebell-layout">
        <aside className="bluebell-toc"><nav aria-label="Labbit 사례 목차"><h2>읽을 내용</h2><ol>{labbitReading.sections.map((section) => (
          <li key={section.id}><Link to={`#${section.id}`}><span aria-hidden="true">{section.number}</span>{section.label}</Link></li>
        ))}</ol></nav></aside>
        <div className="bluebell-content">
          <ReadingSection section={overview}>
            <p className="bluebell-intro">{project.problem}</p>
            <ProjectMetadata project={project} />
            <div className="bluebell-subheading"><h3>프로젝트에서 맡은 일</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="tags" aria-label="Labbit 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>
          <ReadingSection section={flow}>
            <div className="bluebell-subheading"><h3>플랫폼 아키텍처</h3></div>
            <ProjectArchitecture project={project} />
          </ReadingSection>

          {caseSections.map((section, index) => {
            const item = project.evidenceSnapshots?.[index]
            return <ReadingSection section={section} key={section.id}>{item && <ImplementationCase item={item} {...labbitReading.cases[index]} workspace={index === 0} />}</ReadingSection>
          })}

          <ReadingSection section={validation}>
            <p className="bluebell-intro">{project.boundaryNotes?.[0]}</p>
            <div className="bluebell-subheading"><h3>10월 주요 구현·안정화 작업</h3></div>
            <ul className="check-list" aria-label="최근 개인 FE 병합 대표 4건">
              <li>ADMIN Installer 승인 URL 연동 · <a href="https://github.com/ktcloud4-SL/labbit-app/pull/133" target="_blank" rel="noreferrer">PR #133 ↗</a></li>
              <li>학생 Live 읽기 전용 WSS 및 HTTP 5xx 경계 · <a href="https://github.com/ktcloud4-SL/labbit-app/pull/135" target="_blank" rel="noreferrer">PR #135 ↗</a></li>
              <li>권한/Generation 변경 후 이전 파일 캐시 차단 · <a href="https://github.com/ktcloud4-SL/labbit-app/pull/136" target="_blank" rel="noreferrer">PR #136 ↗</a></li>
              <li>Provision·LabSpec·Operation·Reset/Cleanup 회귀 · <a href="https://github.com/ktcloud4-SL/labbit-app/pull/143" target="_blank" rel="noreferrer">PR #143 ↗</a></li>
            </ul>
            <p className="bluebell-case-condition">위 네 PR은 개인 작성·main 병합이 확인된 코드 변경입니다. 실제 READY Workspace·Live fan-out·ADMIN 적용 브라우저 검증은 완료로 표시하지 않습니다.</p>
            <p className="story-inline-reference">
              이전 LabSpec 권한·빈 상태·Mapping UI도 함께 개선했습니다:
              {' '}<a href="https://github.com/ktcloud4-SL/labbit-app/pull/93" target="_blank" rel="noreferrer">권한 UI</a>
              {' · '}<a href="https://github.com/ktcloud4-SL/labbit-app/pull/98" target="_blank" rel="noreferrer">빈 상태</a>
              {' · '}<a href="https://github.com/ktcloud4-SL/labbit-app/pull/97" target="_blank" rel="noreferrer">Mapping</a>
            </p>
            <div className="bluebell-subheading"><h3>코드와 Backend 연동 상태</h3></div>
            <ol className="labbit-gates">
              <li><span className="labbit-gate-state">검증 완료</span><h3>코드·계약·CI</h3><p className="labbit-gate-label">{project.validation?.[0]}</p><p>{project.projectResults?.[0]}</p><p>{project.projectResults?.[2]}</p><p className="labbit-gate-note">각 PR의 병합·검사 시점은 위 원본 링크에서 확인할 수 있습니다.</p></li>
              <li><span className="labbit-gate-state">검증 완료</span><h3>실제 Backend Browser</h3><p className="labbit-gate-label">{project.validation?.[1]}</p><p>{project.projectResults?.[1]}</p><p>{project.boundaryNotes?.[1]}</p></li>
            </ol>
          </ReadingSection>
          <ReadingSection section={evidence}>
            <div className="bluebell-closing"><div><h3>구현에서 배운 점</h3><p>{project.learned}</p></div></div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
