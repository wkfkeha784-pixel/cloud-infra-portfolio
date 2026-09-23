export default function Flow({ items }: { items: string[] }) {
  return (
    <div className="flow" aria-label="프로세스 흐름">
      {items.map((item, index) => (
        <div className="flow-part" key={`${item}-${index}`}>
          <div className="flow-node">{item}</div>
          {index < items.length - 1 && <div className="flow-arrow" aria-hidden="true">↓</div>}
        </div>
      ))}
    </div>
  )
}
