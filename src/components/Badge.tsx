import type { ReactNode } from 'react'

export default function Badge({
  children,
  tone = 'my',
}: {
  children: ReactNode
  tone?: 'my' | 'project'
}) {
  return <span className={`scope-badge scope-${tone}`}>{children}</span>
}
