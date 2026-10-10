import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import Flow from '../components/Flow'
import EvidenceSnapshotCard from '../components/EvidenceSnapshotCard'
import { durianReading, type Project } from '../data/projects'

type ReadingSection = typeof durianReading.sections[number]

function CaseSection({ section, children }: { section: ReadingSection; children: ReactNode }) {
  return (
    <section id={section.id} className="durian-section" aria-labelledby={`${section.id}-title`} tabIndex={-1}>
      <div className="durian-section-heading">
        <span className="eyebrow">{section.number}</span>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function DurianDetail({ project }: { project: Project }) {
  const [overview, architecture, loadScaling, requestRecovery, scheduling, workerRecovery, evidence] = durianReading.sections
  const [loadSnapshot, requestSnapshot, healthSnapshot] = project.evidenceSnapshots ?? []

  return (
    <div className="durian-detail">
      <section className="project-hero durian-hero">
        <div className="container">
          <Link className="back-link" to="/#projects">← Selected Projects</Link>
          <span className="eyebrow">PROJECT {project.order} · KUBERNETES OPERATIONS</span>
          <h1>
            <span className="durian-project-name">{project.name}</span>{' '}
            <span className="durian-headline">{durianReading.headline}</span>
          </h1>
          <p className="durian-subtitle">{project.subtitle}</p>
          <p className="project-detail-summary">{project.summary}</p>
          <div className="durian-subheading"><Badge>MY</Badge><h2 className="durian-results-title">확인한 핵심 결과</h2></div>
          <div className="durian-highlights" aria-label="개인 기여·검증의 핵심 결과">
            {durianReading.highlights.map((item) => (
              <div key={item.result}>
                <strong>{item.result}</strong>
                <span>{item.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container durian-layout">
        <aside className="durian-toc">
          <nav aria-label="Durian 사례 목차">
            <h2>읽을 내용</h2>
            <ol>
              {durianReading.sections.map((section) => (
                <li key={section.id}>
                  <Link to={`#${section.id}`}>
                    <span aria-hidden="true">{section.number}</span>{section.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="durian-content">
          <CaseSection section={overview}>
            <p className="durian-intro">{project.problem}</p>
            <dl className="durian-role">
              <dt>담당 역할</dt>
              <dd>{project.home.role}</dd>
            </dl>
            <div className="durian-subheading"><Badge>MY</Badge><h3>개인 담당 범위</h3></div>
            <ul className="check-list durian-contributions">
              {project.myContributions.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="tags" aria-label="Team Durian 기술 스택">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </CaseSection>

          <CaseSection section={architecture}>
            <div className="durian-subheading"><Badge tone="project">PROJECT</Badge><h3>서비스 요청 경로</h3></div>
            <Flow items={project.architecture} />
            {project.architectureNote && <p className="flow-note">{project.architectureNote}</p>}
            <h3 className="durian-minor-heading">팀 구현 결과</h3>
            <ul className="check-list durian-contributions">
              {project.projectResults?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseSection>

          <CaseSection section={loadScaling}>
            {project.validation && (
              <div className="durian-validation">
                <h3>검증 흐름</h3>
                <Flow items={project.validation} />
              </div>
            )}
            {loadSnapshot && <EvidenceSnapshotCard item={loadSnapshot} />}
          </CaseSection>

          <CaseSection section={requestRecovery}>
            {requestSnapshot && <EvidenceSnapshotCard item={requestSnapshot} />}
          </CaseSection>

          <CaseSection section={scheduling}>
            {project.troubleshooting && (
              <>
                <div className="durian-subheading">
                  <Badge tone="project">{project.troubleshooting.badge}</Badge>
                  <h3>{project.troubleshooting.title}</h3>
                </div>
                <dl className="durian-facts">
                  {project.troubleshooting.rows.map((row) => (
                    <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>
                  ))}
                </dl>
                {project.troubleshooting.note && <p className="insight-box">{project.troubleshooting.note}</p>}
              </>
            )}
          </CaseSection>

          <CaseSection section={workerRecovery}>
            <div className="durian-subheading"><Badge>MY</Badge><h3>{project.home.results[1].text}</h3></div>
            <dl className="durian-facts">
              {durianReading.workerRecovery.facts.map((fact) => (
                <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
              ))}
            </dl>
            <p className="durian-condition">{durianReading.workerRecovery.note}</p>
            <div className="evidence-source"><strong>Source</strong><span>{durianReading.workerRecovery.source}</span></div>
          </CaseSection>

          <CaseSection section={evidence}>
            {healthSnapshot && <EvidenceSnapshotCard item={healthSnapshot} />}
            <div className="durian-closing">
              {project.learned && <div><h3>운영에서 배운 점</h3><p>{project.learned}</p></div>}
              {project.limitations && <div><h3>검증 범위와 후속 과제</h3><p>{project.limitations}</p></div>}
              {project.boundaryNotes && project.boundaryNotes.length > 0 && <ul className="boundary-list">{project.boundaryNotes.map((note) => <li key={note}>{note}</li>)}</ul>}
              {project.evidence.length > 0 && <div className="evidence-links">{project.evidence.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</div>}
            </div>
          </CaseSection>
        </div>
      </div>
    </div>
  )
}
