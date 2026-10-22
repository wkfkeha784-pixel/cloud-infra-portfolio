import type { Project } from '../data/projects'

/** Concise recruiter-facing introduction. The detailed evidence below remains intact. */
export default function ProjectQuickRead({ project }: { project: Project }) {
  const summary = [
    { title: '프로젝트 소개', description: project.subtitle },
    { title: '사용 기술', description: project.tags.slice(0, 5).join(' · ') },
    { title: '주요 내용', description: project.home.headline },
    { title: '내 역할·기여도', description: project.home.role },
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
        <p className="project-quick-guide">대표 결과와 상세 검증 자료는 아래에서 확인할 수 있습니다.</p>
      </div>
    </section>
  )
}
