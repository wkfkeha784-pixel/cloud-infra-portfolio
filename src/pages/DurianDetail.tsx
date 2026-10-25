import ProjectQuickRead from '../components/ProjectQuickRead'
import ProjectArchitecture from '../components/ProjectArchitecture'
import VideoStill from '../components/VideoStill'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ProjectMetadata from '../components/ProjectMetadata'
import { durianReading, type EvidenceSnapshot, type Project } from '../data/projects'

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

function CaseLead({ title, scope, date }: { title: string; scope: 'MY' | 'PROJECT'; date?: string }) {
  return (
    <div className="durian-case-lead">
      <div className="durian-case-meta">
        <span>{scope === 'MY' ? '구현·연동 검증' : '프로젝트 시험·대응'}{date && <> · <time dateTime={date}>{date}</time></>}</span>
      </div>
      <h3>{title}</h3>
    </div>
  )
}

function CaseCopy({ label, children }: { label: string; children: ReactNode }) {
  return <div className="durian-case-copy"><h4>{label}</h4>{children}</div>
}

function CaseResult({ facts }: { facts: string[] }) {
  return (
    <div className="durian-case-result">
      <h4>확인한 결과</h4>
      <ul>{facts.map((fact) => <li key={fact}>{/^[A-Z]+(?:_[A-Z0-9]+)+$/.test(fact) ? <code>{fact}</code> : fact}</li>)}</ul>
    </div>
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
          <div className="durian-subheading"><h2 className="durian-results-title">프로젝트에서 확인한 핵심 결과</h2></div>
          <div className="durian-highlights" aria-label="팀 시험·실행의 핵심 결과">
            {durianReading.highlights.map((item) => (
              <div key={item.result}>
                <strong>{item.result}</strong>
                <span>{item.context}</span>
              </div>
            ))}
          </div>
          <p className="story-hero-caption">수강신청 폭주 상황을 <strong>대기열·비동기 처리·자동 확장</strong>으로 해결하고, 장애 복구와 관측까지 함께 검증했습니다.</p>
        </div>
      </section>

      <ProjectQuickRead project={project} />

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
            <ProjectMetadata project={project} />
            <div className="durian-subheading"><h3>프로젝트에서 맡은 일</h3></div>
            <ul className="check-list durian-contributions">
              {project.myContributions.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="tags" aria-label="Team Durian 기술 스택">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </CaseSection>

          <CaseSection section={architecture}>
            <div className="durian-subheading"><h3>서비스 아키텍처</h3></div>
            <ProjectArchitecture project={project} />
            <VideoStill
              src="/evidence/video/durian-service.webp"
              alt="Durian 수강신청 웹서비스에서 학생 입장 완료와 강좌 목록이 표시된 실제 화면"
              caption="시연 당시 수강신청 화면. 학생 입장과 강좌 조회·신청 기능을 구현했습니다."
            />
          </CaseSection>

          <CaseSection section={loadScaling}>
            {loadSnapshot && (
              <article className="durian-case" aria-label="외부 부하 검증 사례">
                <CaseLead title={durianReading.cases.load.title} scope={loadSnapshot.scope} date={loadSnapshot.validatedAt} />
                <CaseCopy label="확인할 문제"><p>{durianReading.cases.load.problem}</p></CaseCopy>
                <CaseCopy label="수행">
                  <p>{loadSnapshot.summary}</p>
                  {project.validation && <ol className="durian-case-steps">
                    {[0, 2, 4].map((start) => <li key={start}>{project.validation?.slice(start, start + 2).join(' → ')}</li>)}
                  </ol>}
                </CaseCopy>
                <CaseResult facts={loadSnapshot.facts} />
                
              </article>
            )}
          </CaseSection>

          <CaseSection section={requestRecovery}>
            {requestSnapshot && (
              <article className="durian-case" aria-label="Kafka 복구 검증 사례">
                <CaseLead title={durianReading.cases.request.title} scope={requestSnapshot.scope} date={requestSnapshot.validatedAt} />
                <CaseCopy label="복구할 문제"><p>{durianReading.cases.request.problem}</p></CaseCopy>
                <CaseCopy label="조치"><p>{durianReading.cases.request.action}</p></CaseCopy>
                <CaseCopy label="당시 요청 경로"><p className="durian-historical-path">{requestSnapshot.facts[0]}</p></CaseCopy>
                <CaseResult facts={requestSnapshot.facts.slice(1)} />
                
              </article>
            )}
          </CaseSection>

          <CaseSection section={scheduling}>
            {project.troubleshooting && (
              <article className="durian-case" aria-label="Consumer Pending 팀 대응 사례">
                <CaseLead title={durianReading.cases.scheduling.title} scope={project.troubleshooting.badge} />
                {project.troubleshooting.rows.filter((row) => row.label !== 'Result').map((row) => (
                  <CaseCopy key={row.label} label={durianReading.cases.scheduling.labels[row.label] ?? row.label}><p>{row.value}</p></CaseCopy>
                ))}
                <CaseResult facts={project.troubleshooting.rows.filter((row) => row.label === 'Result').map((row) => row.value)} />
                {project.troubleshooting.note && <p className="durian-lesson">{project.troubleshooting.note}</p>}
                
              </article>
            )}
          </CaseSection>

          <CaseSection section={workerRecovery}>
            <article className="durian-case" aria-label="Terraform Worker 팀 복구 기록과 개인 검증 범위">
              <CaseLead title={durianReading.cases.worker.title} scope="PROJECT" />
              {durianReading.workerRecovery.facts.slice(0, 2).map((fact) => (
                <CaseCopy key={fact.label} label={fact.label}><p>{fact.value}</p></CaseCopy>
              ))}
              <CaseResult facts={[durianReading.workerRecovery.facts[2].value]} />
              <p className="durian-lesson">Terraform 구성 변경과 장애 분석, 노드 재가입 결과를 팀과 함께 검증했습니다.</p>
              
            </article>
          </CaseSection>

          <CaseSection section={evidence}>
            <div className="durian-subheading"><h3>모니터링과 Runtime 정합성 검증</h3></div>
            <p className="durian-intro">{durianReading.cases.operations.personal}</p>
            {healthSnapshot && <RuntimeEvidence item={healthSnapshot} />}
            <VideoStill
              src="/evidence/video/durian-monitoring.webp"
              alt="Durian Kafka 및 KEDA 관측을 위해 사용한 Grafana 대시보드의 실제 시연 화면"
              caption="시연 당시 Grafana 대시보드."
            />
            <div className="durian-closing">
              {project.learned && <div><h3>운영에서 배운 점</h3><p>{project.learned}</p></div>}
              <div><h3>다음 검증 과제</h3><p>{durianReading.cases.operations.followup}</p></div>
              {project.evidence.length > 0 && <div className="evidence-links">{project.evidence.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</div>}
            </div>
          </CaseSection>
        </div>
      </div>
    </div>
  )
}

function RuntimeEvidence({ item }: { item: EvidenceSnapshot }) {
  return (
    <article className="durian-case" aria-label="팀 최종 운영 상태">
      <CaseLead title="관측 스택과 팀 최종 Health 상태를 함께 확인했습니다." scope={item.scope} date={item.validatedAt} />
      <p className="durian-intro">{item.summary}</p>
      <CaseResult facts={item.facts} />
      
    </article>
  )
}
