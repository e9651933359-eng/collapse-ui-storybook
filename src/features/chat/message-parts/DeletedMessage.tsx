import { Trash2 } from 'lucide-react'
import { CommentsLink } from './CommentsLink'
import './message-parts.css'

export type DeletedMessageType = 'other' | 'other-group' | 'my'

export type DeletedMessageProps = {
  /** other — личный чат; other-group — группа (аватар-корзина слева); my — исходящее. */
  type?: DeletedMessageType
  comments?: number
  /** Хвостик бабла. В Figma — свойство bubbletail. */
  bubbleTail?: boolean
  onOpenComments?: () => void
}

/** Figma my-Base «DeletedMessageDesktop» 10227:75515 (Other (Group) / Other / My × Comment). */
export function DeletedMessage({ type = 'other', comments, bubbleTail = true, onOpenComments }: DeletedMessageProps) {
  const mine = type === 'my'
  const hasComments = comments !== undefined && comments > 0
  return (
    <article className={`message message--deleted ${mine ? 'message--mine' : 'message--other'}`} aria-label="Удалённое сообщение">
      <div className="message__row">
        {type === 'other-group' && <span className="message__deleted-avatar" aria-hidden="true"><Trash2 /></span>}
        <div className={`message__stack ${hasComments ? 'has-comments' : ''} ${bubbleTail ? '' : 'no-tail'}`}>
          <div className="message__bubble">
            <div className="message__content"><span className="message__text">Сообщение удалено</span></div>
            {!mine && bubbleTail && !hasComments && <img className="message__tail" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
          </div>
          {hasComments && <CommentsLink count={comments} mine={mine} onClick={onOpenComments} />}
          {!mine && bubbleTail && hasComments && <img className="message__tail message__tail--stack" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
        </div>
      </div>
    </article>
  )
}
