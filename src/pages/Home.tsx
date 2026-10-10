import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const coreFocus = [
  {
    title: 'Infrastructure Integration & Recovery',
    project: 'Bluebell',
    body: 'AWS 3-Tier 통합 · ASG Replacement 이후 서비스 정상화 검증',
    href: '/projects/bluebell',
  },
  {
    title: 'Kubernetes Operations',
    project: 'Durian',
    body: '외부 HTTP 부하 · Kafka Lag 기반 KEDA Consumer 1→4→1 검증',
    href: '/projects/durian',
  },
  {
    title: 'IaC · Observability · Reproducibility',
    project: 'Durian / Bluebell',
    body: 'Terraform Drift 복구 · Git/Manifest/Monitoring과 Runtime 정합',
    href: '/projects/durian',
  },
  {
    title: 'Contract-driven Application Integration',
    project: 'OneReport / Labbit',
    body: 'Backend Domain/API · Frontend HTTP/WS Contract Consumer',
    href: '/projects/labbit',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">CLOUD INFRASTRUCTURE ENGINEER</span>
            <h1>박희철</h1>
            <p className="hero-lead">
              구축에서 끝내지 않고, 운영 상태를 관측하고
              <br />
              장애 이후 정상화까지 검증합니다.
            </p>
            <p className="hero-support">
              AWS·OpenStack·Kubernetes 환경에서 서비스 연결, 부하에 따른 확장,
              장애·설정 변경 이후 복구 상태를 검증했습니다.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">프로젝트 보기</a>
              <a className="button button-secondary" href="mailto:wkfkeha784@gmail.com">
                Email
              </a>
              <a className="text-link" href="https://github.com/wkfkeha784-pixel" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>

          <nav className="hero-projects" aria-labelledby="hero-projects-title">
            <h2 id="hero-projects-title">먼저 볼 프로젝트</h2>
            <p className="hero-projects-intro">관심 있는 운영 경험부터 살펴보세요.</p>
            <ol className="hero-project-list">
              <li>
                <Link to="/projects/durian" className="hero-project-link">
                  <span className="hero-project-number" aria-hidden="true">01</span>
                  <span className="hero-project-copy">
                    <span className="hero-project-name">Team Durian</span>
                    <strong>부하에 따른 확장과 Worker 복구</strong>
                    <span className="hero-project-description">Consumer 1→4→1 · Terraform 복구 검증</span>
                  </span>
                  <span className="hero-project-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/bluebell" className="hero-project-link">
                  <span className="hero-project-number" aria-hidden="true">02</span>
                  <span className="hero-project-copy">
                    <span className="hero-project-name">Bluebell</span>
                    <strong>서비스 연결과 장애 이후 정상화</strong>
                    <span className="hero-project-description">Web–WAS 구축 · Replacement 통합 검증</span>
                  </span>
                  <span className="hero-project-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">CORE FOCUS</span>
            <h2>운영 흐름을 연결하고 검증하는 역량</h2>
          </div>
          <div className="focus-grid">
            {coreFocus.map((item) => (
              <a className="focus-card" href={item.href} key={item.title}>
                <span>{item.project}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="projects">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">SELECTED PROJECTS</span>
            <h2>문제 → 역할 → 검증 근거로 보는 프로젝트</h2>
            <p>PDF에서 요약한 내용을 Case Study 형태로 확장했습니다.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="container split-section">
          <div>
            <span className="eyebrow">EXPERIENCE & EDUCATION</span>
            <h2>운영 책임 경험을 기술 프로젝트 역량으로 확장했습니다</h2>
          </div>
          <div className="timeline">
            <article>
              <span>2016.02–2020.03</span>
              <h3>육군사관학교 전자공학과 졸업</h3>
            </article>
            <article>
              <span>2020.03–2025.09</span>
              <h3>대한민국 육군 · 정보통신 병과 장교</h3>
              <p>예비역 중위</p>
              <p>조직·인원 운영 · 절차 기반 임무 수행 · 현장 이슈 대응 · 보고·문서화</p>
            </article>
            <article>
              <span>2026.05.12–2026.12.03</span>
              <h3>KT Cloud Infrastructure Bootcamp</h3>
              <p>진행 중 · AWS / OpenStack / Kubernetes</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container qualification-grid">
          <div>
            <span className="eyebrow">QUALIFICATIONS</span>
            <h2>Qualifications</h2>
          </div>
          <div className="qualification-list">
            <div><strong>컴퓨터활용능력 2급</strong></div>
            <div><strong>G-TELP Level 2 · 84점</strong></div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-card">
          <div>
            <span className="eyebrow">CONTACT</span>
            <h2>프로젝트와 경험을 더 자세히 확인할 수 있습니다.</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:wkfkeha784@gmail.com">wkfkeha784@gmail.com</a>
            <a href="https://github.com/wkfkeha784-pixel" target="_blank" rel="noreferrer">
              github.com/wkfkeha784-pixel ↗
            </a>
            <span className="contact-note">회사 제출용 PDF Portfolio는 지원 과정에서 제공합니다.</span>
          </div>
        </div>
      </section>
    </>
  )
}
