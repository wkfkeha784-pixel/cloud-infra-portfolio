import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
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
        <Badge tone={scope === 'MY' ? 'my' : 'project'}>{scope}</Badge>
        <span>{scope === 'MY' ? '개인 수행·검증' : '팀 결과·대응'}{date && <> · <time dateTime={date}>{date}</time></>}</span>
      </div>
      <h3>{title}</h3>
    </div>
  )
}

function CaseCopy({ label, children }: { label: string; children: ReactNode }) {
  return <div className="durian-case-copy"><h4>{label}</h4>{children}</div>
}

function CaseResult({ facts, condition }: { facts: string[]; condition?: string }) {
  return (
    <div className="durian-case-result">
      <h4>확인한 결과</h4>
      <ul>{facts.map((fact) => <li key={fact}>{/^[A-Z]+(?:_[A-Z0-9]+)+$/.test(fact) ? <code>{fact}</code> : fact}</li>)}</ul>
      {condition && <p className="durian-case-condition">{condition}</p>}
    </div>
  )
}

function CaseSource({ source, summary = '검증 기록·출처', children }: { source: string; summary?: string; children?: ReactNode }) {
  return (
    <details className="durian-case-source">
      <summary>{summary}</summary>
      <div><p className="durian-source-name">{source}</p>{children}</div>
    </details>
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
            <figure className="durian-architecture">
              {[{ title: '요청 제어', start: 0, end: 4 }, { title: '비동기 처리', start: 4, end: 8 }].map((group) => (
                <div className="durian-architecture-stage" key={group.title}>
                  <h4>{group.title}</h4>
                  <ol start={group.start + 1}>
                    {project.architecture.slice(group.start, group.end).map((item, index) => (
                      <li key={item}><span aria-hidden="true">{group.start + index + 1}</span>{item}</li>
                    ))}
                  </ol>
                </div>
              ))}
              <figcaption>위의 요청 제어에서 아래의 메시지 발행·처리로 이어지는 팀 서비스 구조입니다. 개인 담당은 Redis·Kafka/KEDA와 Kubernetes 운영·복구입니다.</figcaption>
            </figure>
            <dl className="durian-signals">
              <div><dt>확장 신호</dt><dd>Kafka Lag → KEDA/HPA → Consumer Scaling</dd></div>
              <div><dt>관측</dt><dd>Prometheus → Grafana</dd></div>
            </dl>
            <CaseSource source="Durian 최종 발표자료 · 서비스 아키텍처·결과 요약" summary="팀 구현 범위 보기">
              <ul>{project.projectResults?.map((item) => <li key={item}>{item}</li>)}</ul>
            </CaseSource>
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
                <CaseResult facts={loadSnapshot.facts} condition={durianReading.cases.load.condition} />
                <CaseSource source={loadSnapshot.source} summary="시험 조건·측정 기록·출처">
                  <p>{durianReading.cases.load.measurement}</p>
                </CaseSource>
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
                <CaseResult facts={requestSnapshot.facts.slice(1)} condition={durianReading.cases.request.condition} />
                <CaseSource source={requestSnapshot.source}><p>{requestSnapshot.title}</p></CaseSource>
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
                <CaseResult facts={project.troubleshooting.rows.filter((row) => row.label === 'Result').map((row) => row.value)} condition={durianReading.cases.scheduling.condition} />
                {project.troubleshooting.note && <p className="durian-lesson">{project.troubleshooting.note}</p>}
                <CaseSource source={durianReading.cases.scheduling.source}><p>{project.troubleshooting.title}</p></CaseSource>
              </article>
            )}
          </CaseSection>

          <CaseSection section={workerRecovery}>
            <article className="durian-case" aria-label="Terraform Worker 개인 복구 사례">
              <CaseLead title={durianReading.cases.worker.title} scope="MY" />
              {durianReading.workerRecovery.facts.slice(0, 2).map((fact) => (
                <CaseCopy key={fact.label} label={fact.label}><p>{fact.value}</p></CaseCopy>
              ))}
              <CaseResult facts={[durianReading.workerRecovery.facts[2].value]} condition={durianReading.workerRecovery.note} />
              <p className="durian-lesson">{durianReading.cases.worker.lesson}</p>
              <CaseSource source={durianReading.workerRecovery.source} />
            </article>
          </CaseSection>

          <CaseSection section={evidence}>
            <div className="durian-subheading"><Badge>MY</Badge><h3>모니터링 인수와 Runtime 정합성 검증</h3></div>
            <p className="durian-intro">{durianReading.cases.operations.personal}</p>
            {healthSnapshot && <RuntimeEvidence item={healthSnapshot} />}
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
      <CaseSource source={item.source}><p>{item.title}</p></CaseSource>
    </article>
  )
}
