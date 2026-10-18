import type { ReactNode } from 'react'

/** Только для stories: поверхность чата и бабл-контейнер для компонентов, которые живут внутри бабла. */
export function ChatSurface({ children, width = 640 }: { children: ReactNode; width?: number }) {
  return <div style={{ width, padding: 48, display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--surface-primary)', borderRadius: 'var(--radius-xl)' }}>{children}</div>
}

export function BubbleFrame({ children, mine = false }: { children: ReactNode; mine?: boolean }) {
  return (
    <div className={`message ${mine ? 'message--mine' : 'message--other'}`}>
      <div className="message__stack" style={{ width: 'auto' }}>
        <div className="message__bubble" style={{ width: 'auto', paddingBlock: 'var(--collapse-spacing-horizontal-s)' }}>{children}</div>
      </div>
    </div>
  )
}
