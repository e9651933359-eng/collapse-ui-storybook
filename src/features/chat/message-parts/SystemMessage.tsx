import { Pin } from 'lucide-react'
import type { MessageReaction } from '../../../types/chat'
import { Avatar } from '../../../components/ui/Avatar'
import { Button } from '../../../components/ui/Button'
import { Chip } from '../../../components/ui/Chip'
import { CommentsLink } from './CommentsLink'
import './message-parts.css'

export type SystemMessageAction = 'none' | 'call' | 'bot'

export type SystemMessageProps = {
  title: string
  text?: string
  /** none — без кнопок; call — «Присоединиться» (success); bot — ряд Assistive chips (*ItemsBot). */
  action?: SystemMessageAction
  callLabel?: string
  botActions?: string[]
  time: string
  pinned?: boolean
  reactions?: MessageReaction[]
  comments?: number
  /** Автор — как правило бот или сервис; аватар с индикатором онлайн. */
  sender?: string
  avatarImage?: string
  onCall?: () => void
  onBotAction?: (label: string) => void
  onOpenComments?: () => void
}

/** Figma my-Base «SystemMessagesDesktop» 10100:73473: Type Button = Call / Bot / No button, Comment, Reactions. */
export function SystemMessage({
  title,
  text,
  action = 'none',
  callLabel = 'Присоединиться',
  botActions = [],
  time,
  pinned = false,
  reactions = [],
  comments,
  sender = 'Система',
  avatarImage,
  onCall,
  onBotAction,
  onOpenComments,
}: SystemMessageProps) {
  const hasComments = comments !== undefined && comments > 0
  return (
    <article className="message message--other message--system" aria-label={`Системное сообщение, ${time}`}>
      <div className="message__row">
        <Avatar label={sender} image={avatarImage} status="online" />
        <div className={`message__stack ${hasComments ? 'has-comments' : ''}`}>
          <div className="message__bubble">
            <div className="system-message__title">{title}</div>
            {text && <div className="system-message__text">{text}</div>}
            {action === 'call' && (
              <div className="system-message__button"><Button intent="success" onClick={onCall}>{callLabel}</Button></div>
            )}
            {action === 'bot' && botActions.length > 0 && (
              <div className="system-message__bot-actions" aria-label="Действия бота">
                {botActions.map((label) => <Chip key={label} kind="assistive" onClick={() => onBotAction?.(label)}>{label}</Chip>)}
              </div>
            )}
            <div className="system-message__footer">
              <div className="system-message__reactions" aria-label={reactions.length ? 'Реакции на сообщение' : undefined}>
                {reactions.map((reaction) => (
                  <span key={reaction.emoji} className={`message__reaction ${reaction.reacted ? 'is-selected' : ''}`}>
                    <span aria-hidden="true">{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </span>
                ))}
              </div>
              <span className="message__meta">
                {pinned && <Pin aria-label="Закреплено" />}
                {time}
              </span>
            </div>
            {!hasComments && <img className="message__tail" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
          </div>
          {hasComments && <CommentsLink count={comments} onClick={onOpenComments} />}
          {hasComments && <img className="message__tail message__tail--stack" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
        </div>
      </div>
    </article>
  )
}
