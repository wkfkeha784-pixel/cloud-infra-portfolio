import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const featuredProjects = projects.filter((project) => project.home.group === 'featured')
const additionalProjects = projects.filter((project) => project.home.group === 'additional')

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
              <br />{' '}
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
                    <span className="hero-project-description">Web–WAS 구축 · 인스턴스 교체 후 복구 검증</span>
                  </span>
                  <span className="hero-project-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="section section-muted" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">SELECTED PROJECTS</span>
            <h2 id="projects-title">운영과 복구를 검증한 대표 프로젝트</h2>
            <p>담당 역할과 확인한 결과를 중심으로 정리했습니다.</p>
          </div>
          <div className="featured-project-list">
            {featuredProjects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section additional-projects" aria-labelledby="additional-projects-title">
        <div className="container">
          <div className="section-heading compact">
            <span className="eyebrow">MORE PROJECTS</span>
            <h2 id="additional-projects-title">서비스 구현과 팀 시스템 통합 경험</h2>
            <p>Backend 구현부터 Frontend 계약 연동까지, 담당한 구현과 통합 경험입니다.</p>
          </div>
          <div className="additional-project-list">
            {additionalProjects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="container home-info-grid">
          <div>
            <span className="eyebrow">EXPERIENCE & EDUCATION</span>
            <h2 id="experience-title">경력과 학력</h2>
          </div>
          <div className="timeline">
            <article>
              <span>2016.02–2020.03</span>
              <div className="timeline-content">
                <span className="timeline-category">학력</span>
                <h3>육군사관학교 전자공학과 졸업</h3>
              </div>
            </article>
            <article>
              <span>2020.03–2025.09</span>
              <div className="timeline-content">
                <span className="timeline-category">군 경력</span>
                <h3>대한민국 육군 · 정보통신 병과 장교</h3>
                <p>예비역 중위</p>
                <p>조직·인원 운영 · 절차 기반 임무 수행 · 현장 이슈 대응 · 보고·문서화</p>
              </div>
            </article>
            <article>
              <span>2026.05.12–2026.12.03</span>
              <div className="timeline-content">
                <span className="timeline-category">교육</span>
                <h3>KT Cloud Infrastructure Bootcamp</h3>
                <p>진행 중 · AWS / OpenStack / Kubernetes</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="qualifications-title">
        <div className="container home-info-grid">
          <div>
            <span className="eyebrow">QUALIFICATIONS</span>
            <h2 id="qualifications-title">보유 자격</h2>
          </div>
          <ul className="qualification-list">
            <li><span>자격증</span><strong>컴퓨터활용능력 2급</strong></li>
            <li><span>어학</span><strong>G-TELP Level 2 · 84점</strong></li>
          </ul>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="container contact-card">
          <div>
            <span className="eyebrow">CONTACT</span>
            <h2 id="contact-title">연락처</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:wkfkeha784@gmail.com"><span>Email</span><strong>wkfkeha784@gmail.com</strong></a>
            <a href="https://github.com/wkfkeha784-pixel" target="_blank" rel="noreferrer">
              <span>GitHub</span><strong>wkfkeha784-pixel ↗</strong>
            </a>
            <span className="contact-note">회사 제출용 PDF Portfolio는 지원 과정에서 제공합니다.</span>
          </div>
        </div>
      </section>
    </>
  )
}
