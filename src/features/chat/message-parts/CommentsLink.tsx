import { ChevronRight } from 'lucide-react'
import './message-parts.css'

/** «3 комментария»: склонение для русского языка. */
export function formatCommentsCount(count: number) {
  const lastTwo = count % 100
  const last = count % 10
  const noun = lastTwo >= 11 && lastTwo <= 14 ? 'комментариев' : last === 1 ? 'комментарий' : last >= 2 && last <= 4 ? 'комментария' : 'комментариев'
  return `${count} ${noun}`
}

export type CommentsLinkProps = {
  count: number
  /** Исходящее сообщение: градиентная подложка как у бабла. */
  mine?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Блок комментариев под баблом. Figma my-Base «Comments» 10092:108369 / 4924:7364:
 * padding 12/10, радиусы 4 сверху и 24 снизу, стрелка 16px.
 */
export function CommentsLink({ count, mine = false, onClick, className = '' }: CommentsLinkProps) {
  return (
    <button type="button" className={`message__comments ${mine ? 'is-mine' : ''} ${className}`} onClick={onClick}>
      <span>{formatCommentsCount(count)}</span>
      <ChevronRight aria-hidden="true" />
    </button>
  )
}
