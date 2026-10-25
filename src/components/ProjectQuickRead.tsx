import type { Project } from '../data/projects'

/** Concise recruiter-facing introduction. The detailed evidence below remains intact. */
export default function ProjectQuickRead({ project }: { project: Project }) {
  const summary = [
    { title: '프로젝트 소개', description: project.subtitle },
    { title: '사용 기술', description: project.tags.slice(0, 5).join(' · ') },
    { title: '주요 결과', description: project.home.headline },
    { title: '담당 역할', description: project.role },
  ]

  return (
    <section className="project-quick-read" aria-labelledby={`quick-read-${project.slug}`}>
      <div className="container">
        <div className="project-quick-title">
          <span className="eyebrow">PROJECT AT A GLANCE</span>
          <h2 id={`quick-read-${project.slug}`}>30초 프로젝트 소개</h2>
        </div>
        <dl className="project-quick-grid">
          {summary.map((item) => (
            <div className="project-quick-item" key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
