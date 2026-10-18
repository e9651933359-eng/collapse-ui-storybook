import { AlertCircle, Check, CheckCheck } from 'lucide-react'
import { Loader } from '../../../components/ui/Loader'
import './message-parts.css'

/** Figma my-Base «Message status» 10092:121775: Sended / Readed / Loading / Error, Light true/false. */
export type MessageStatusType = 'sent' | 'read' | 'loading' | 'error'

export type MessageStatusProps = {
  status?: MessageStatusType
  /** Светлый вариант для тёмных подложек (медиа). */
  light?: boolean
  className?: string
}

export const messageStatusLabels: Record<MessageStatusType, string> = {
  sent: 'Отправлено',
  read: 'Прочитано',
  loading: 'Отправляется',
  error: 'Не отправлено',
}

export function MessageStatus({ status = 'read', light = false, className = '' }: MessageStatusProps) {
  const classes = `message-status message-status--${status} ${light ? 'is-light' : ''} ${className}`
  if (status === 'loading') {
    return <span className={classes}><Loader size="small" tone={light ? 'light' : 'accent'} label={messageStatusLabels.loading} /></span>
  }
  const Icon = status === 'read' ? CheckCheck : status === 'sent' ? Check : AlertCircle
  return <span className={classes} role="img" aria-label={messageStatusLabels[status]}><Icon aria-hidden="true" /></span>
}
