import { Link, useParams } from 'react-router-dom'
import Badge from '../components/Badge'
import Flow from '../components/Flow'
import { projectBySlug, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? projectBySlug[slug] : undefined

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <h1>Project not found</h1>
          <Link className="text-link" to="/">홈으로 돌아가기 →</Link>
        </div>
      </section>
    )
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <section className="project-hero">
        <div className="container">
          <Link className="back-link" to="/#projects">← Selected Projects</Link>
          <div className="project-hero-meta">
            <span className="eyebrow">PROJECT {project.order}</span>
            {project.status && <span className="status-badge">{project.status}</span>}
          </div>
          <h1>{project.name}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p className="project-detail-summary">{project.summary}</p>
          <div className="tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-two-col">
          <div>
            <span className="eyebrow">PROBLEM</span>
            <h2>어떤 문제를 다뤘는가</h2>
          </div>
          <div className="detail-copy">
            <p>{project.problem}</p>
            <div className="role-box">
              <span>My Role</span>
              <strong>{project.role}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading compact">
            <Badge tone="project">PROJECT</Badge>
            <h2>Architecture / Flow</h2>
          </div>
          <Flow items={project.architecture} />
          {project.architectureNote && <p className="flow-note">{project.architectureNote}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container contribution-grid">
          <div>
            <Badge>MY CONTRIBUTION</Badge>
            <h2>내가 맡은 범위</h2>
            <ul className="check-list">
              {project.myContributions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          {project.projectResults && (
            <div>
              <Badge tone="project">PROJECT RESULT</Badge>
              <h2>프로젝트 결과</h2>
              <ul className="check-list">
                {project.projectResults.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </section>

      {project.troubleshooting && (
        <section className="section section-muted">
          <div className="container">
            <div className="section-heading compact">
              <Badge tone={project.troubleshooting.badge === 'MY' ? 'my' : 'project'}>
                {project.troubleshooting.badge}
              </Badge>
              <h2>{project.troubleshooting.title}</h2>
            </div>
            <div className="troubleshooting-grid">
              {project.troubleshooting.rows.map((row) => (
                <article className="troubleshooting-card" key={row.label}>
                  <span>{row.label}</span>
                  <p>{row.value}</p>
                </article>
              ))}
            </div>
            {project.troubleshooting.note && (
              <div className="insight-box">{project.troubleshooting.note}</div>
            )}
          </div>
        </section>
      )}

      {project.validation && (
        <section className="section">
          <div className="container">
            <div className="section-heading compact">
              <span className="eyebrow">VALIDATION</span>
              <h2>검증 흐름</h2>
            </div>
            <Flow items={project.validation} />
          </div>
        </section>
      )}

      {project.evidenceSnapshots && project.evidenceSnapshots.length > 0 && (
        <section className="section section-muted">
          <div className="container">
            <div className="section-heading compact">
              <span className="eyebrow">VALIDATION EVIDENCE</span>
              <h2>무엇을 실제로 확인했는가</h2>
              <p>시점·Scope·검증값을 함께 남겨 개인 기여와 프로젝트 결과를 구분합니다.</p>
            </div>
            <div className="evidence-snapshot-grid">
              {project.evidenceSnapshots.map((item) => (
                <article className="evidence-snapshot-card" key={item.title}>
                  <div className="evidence-snapshot-meta">
                    <Badge tone={item.scope === 'MY' ? 'my' : 'project'}>{item.scope}</Badge>
                    <span>VALIDATED · {item.validatedAt}</span>
                  </div>
                  {item.image && (
                    <figure className="evidence-snapshot-figure">
                      <img src={item.image} alt={item.imageAlt ?? item.title} />
                      {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
                    </figure>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <ul>
                    {item.facts.map((fact) => <li key={fact}>{fact}</li>)}
                  </ul>
                  <div className="evidence-source">
                    <strong>Source</strong>
                    <span>{item.source}</span>
                  </div>
                  {item.note && <p className="evidence-note">{item.note}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(project.learned || project.limitations) && (
        <section className="section section-muted">
          <div className="container lessons-grid">
            {project.learned && (
              <article>
                <span className="eyebrow">LEARNED</span>
                <p>{project.learned}</p>
              </article>
            )}
            {project.limitations && (
              <article>
                <span className="eyebrow">LIMITATIONS</span>
                <p>{project.limitations}</p>
              </article>
            )}
          </div>
        </section>
      )}

      {(project.evidence.length > 0 || project.boundaryNotes?.length) && (
        <section className="section">
          <div className="container detail-two-col">
            <div>
              <span className="eyebrow">EVIDENCE & BOUNDARY</span>
              <h2>근거와 역할 경계</h2>
            </div>
            <div>
              {project.evidence.length > 0 && (
                <div className="evidence-links">
                  {project.evidence.map((item) => (
                    <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                      {item.label} ↗
                    </a>
                  ))}
                </div>
              )}
              {project.boundaryNotes && (
                <ul className="boundary-list">
                  {project.boundaryNotes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="next-project">
        <div className="container next-project-inner">
          <span>Next Project</span>
          <Link to={`/projects/${nextProject.slug}`}>
            {nextProject.name} — {nextProject.subtitle} →
          </Link>
        </div>
      </section>
    </>
  )
}
