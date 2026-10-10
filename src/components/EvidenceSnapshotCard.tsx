import Badge from './Badge'
import type { EvidenceSnapshot } from '../data/projects'

export default function EvidenceSnapshotCard({ item }: { item: EvidenceSnapshot }) {
  return (
    <article className="evidence-snapshot-card">
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
      {item.href && (
        <a className="evidence-snapshot-link" href={item.href} target="_blank" rel="noreferrer">
          {item.linkLabel ?? 'Evidence 원본 보기'} ↗
        </a>
      )}
      {item.note && <p className="evidence-note">{item.note}</p>}
    </article>
  )
}
