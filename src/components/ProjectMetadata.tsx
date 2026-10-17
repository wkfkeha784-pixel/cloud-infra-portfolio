import type { Project } from '../data/projects'
import '../styles/project-metadata.css'

export default function ProjectMetadata({ project }: { project: Project }) {
  return (
    <dl className="project-metadata" aria-label="프로젝트 일정·팀 구성·담당 역할">
      <div>
        <dt>일정·기준</dt>
        <dd>{project.metadata.timeline}</dd>
      </div>
      <div>
        <dt>팀 구성 기준</dt>
        <dd>{project.metadata.team}</dd>
      </div>
      <div>
        <dt>담당 역할</dt>
        <dd>{project.metadata.role ?? project.home.role}</dd>
      </div>
    </dl>
  )
}
