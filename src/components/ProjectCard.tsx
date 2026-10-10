import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const { home } = project
  const featured = home.group === 'featured'
  const titleId = `project-${project.slug}-title`

  return (
    <article className={`project-card ${featured ? 'project-card-featured' : 'project-card-compact'}`} aria-labelledby={titleId}>
      <div className="project-intro">
        <div className="project-card-top">
          <p className="project-name"><span aria-hidden="true">{project.order} · </span>{project.name}</p>
          {project.status && <span className="status-badge">{project.status}</span>}
        </div>
        <h3 id={titleId}>{home.headline}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        {featured && (
          <div className="tags" aria-label={`${project.name} 기술 스택`}>
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}
      </div>

      <div className="project-details">
        <dl className="project-role">
          <dt>담당 역할</dt>
          <dd>{home.role}</dd>
        </dl>
        <div className="project-results">
          <h4>확인한 결과</h4>
          <ul>
            {home.results.map((result) => (
              <li key={result.text}>
                <span className="project-result-scope" aria-label={result.scope === 'MY' ? '개인 기여·검증' : '팀·프로젝트 결과'}>{result.scope}</span>
                <span>{result.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="project-note"><span>검증 범위</span>{home.note}</p>
        <Link className="text-link project-case-link" to={`/projects/${project.slug}`} aria-label={`${project.name} · ${home.linkLabel}`}>
          {home.linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
