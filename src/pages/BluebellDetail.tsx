import ProjectQuickRead from '../components/ProjectQuickRead'
import ProjectArchitecture from '../components/ProjectArchitecture'
import VideoStill from '../components/VideoStill'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ProjectMetadata from '../components/ProjectMetadata'
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
        <span>구축·운영 검증 · <time dateTime={item.validatedAt}>{item.validatedAt}</time></span>
      </div>
      <h3>{title}</h3>
      <CaseCopy label="확인할 문제"><p>{problem}</p></CaseCopy>
      <CaseCopy label="수행·검증"><p>{action}</p></CaseCopy>
      {children}
      <div className="bluebell-case-result">
        <h4>확인한 결과</h4>
        <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      </div>
      {item.image && (
        <figure className="evidence-snapshot-figure bluebell-evidence-figure">
          <img src={item.image} alt={item.imageAlt ?? item.title} />
          {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
        </figure>
      )}
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
                <strong>{item.result}</strong><span>{item.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectQuickRead project={project} />

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
            <ProjectMetadata project={project} />
            <div className="bluebell-subheading"><h3>프로젝트에서 맡은 일</h3></div>
            <ul className="check-list bluebell-contributions">{project.myContributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="bluebell-team-scope">
              <div className="bluebell-subheading"><h3>팀과 함께 구축한 운영 영역</h3></div>
              <ul>{project.projectResults?.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="tags" aria-label="Bluebell 기술 스택">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </ReadingSection>

          <ReadingSection section={architecture}>
            <div className="bluebell-subheading"><h3>서비스 아키텍처</h3></div>
            <ProjectArchitecture project={project} />
            <VideoStill
              src="/evidence/video/bluebell-service.webp"
              alt="Bluebell Web WAS DB 하이브리드 3-Tier 구조에서 작동하는 방명록 서비스 실제 시연 화면"
              caption="팀이 구현한 방명록 서비스. Web·WAS를 거쳐 MariaDB에 저장되는 흐름을 확인했습니다."
            />
          </ReadingSection>

          <ReadingSection section={webWas}>
            {webSnapshot && <EvidenceCase item={webSnapshot} {...bluebellReading.cases.web} />}
          </ReadingSection>

          <ReadingSection section={recovery}>
            {recoverySnapshot && (
              <EvidenceCase item={recoverySnapshot} {...bluebellReading.cases.recovery}>
                <CaseCopy label="복구 이벤트 경로"><p>{bluebellReading.cases.recovery.trigger}</p></CaseCopy>
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
              <div><h3>서비스와 관측까지 확인한 복구 기준</h3><p>{project.learned}</p></div>
              <div><h3>프로젝트에서 배운 점</h3><p>노드 생성, 서비스 편입, 요청 응답과 관측 복원을 한 흐름으로 확인하며 각 담당 영역의 완료 기준을 연결했습니다.</p></div>
              <div><h3>다음 검증 과제</h3><p>{bluebellReading.followup}</p></div>
              
            </div>
          </ReadingSection>
        </div>
      </div>
    </div>
  )
}
