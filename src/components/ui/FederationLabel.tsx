import type { HTMLAttributes, ReactNode } from 'react'
import { FederationIcon } from './FederationIcon'
import { FederationBadge } from './FederationBadge'

type FederationLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  iconLabel?: string
  iconPosition?: 'start' | 'end'
  iconSize?: 'xs' | 's' | 'm'
  /** Компактный (12px) вариант иконки — для повторяющейся строки отправителя в сообщении. */
  compact?: boolean
}

export function FederationLabel({ children, className = '', iconLabel = 'Федерация', iconPosition = 'end', iconSize = 's', compact = false, ...props }: FederationLabelProps) {
  const icon = compact ? <FederationBadge label={iconLabel} /> : <FederationIcon size={iconSize} aria-label={iconLabel} />
  return (
    <span className={`collapse-federation-label collapse-federation-label--${iconPosition} ${compact ? 'collapse-federation-label--compact' : ''} ${className}`} {...props}>
      {iconPosition === 'start' && icon}
      <span className="collapse-federation-label__text">{children}</span>
      {iconPosition === 'end' && icon}
    </span>
  )
}
