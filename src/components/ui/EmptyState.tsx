import type { ReactNode } from 'react'

type EmptyStateProps = {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`collapse-empty-state ${className}`} role="status">
      {icon && <span className="collapse-empty-state__icon" aria-hidden="true">{icon}</span>}
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </div>
  )
}
