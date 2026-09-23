import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="eyebrow">PROJECT {project.order}</span>
        {project.status && <span className="status-badge">{project.status}</span>}
      </div>
      <h3>{project.name}</h3>
      <p className="project-subtitle">{project.subtitle}</p>

      <div className="project-meta">
        <span>Problem</span>
        <p>{project.problem}</p>
        <span>My Role</span>
        <p>{project.role}</p>
      </div>

      <div className="evidence-mini">
        {project.cardEvidence.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>

      <div className="tags" aria-label={`${project.name} 기술 스택`}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <Link className="text-link" to={`/projects/${project.slug}`}>
        View Case Study →
      </Link>
    </article>
  )
}
