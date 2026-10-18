import { useState } from 'react'
import { Pin } from 'lucide-react'
import type { MessageReaction } from '../../../types/chat'
import { Avatar } from '../../../components/ui/Avatar'
import { CommentsLink } from './CommentsLink'
import { MessageStatus, type MessageStatusType } from './MessageStatus'
import { PollList, type PollOption } from './PollList'
import { PollStatusBar } from './PollStatusBar'
import './message-parts.css'

export type PollMessageProps = {
  question: string
  options: PollOption[]
  anonymous?: boolean
  multiple?: boolean
  /** Голос уже отдан (или опрос закрыт): показываются результаты. */
  voted?: boolean
  /** Выбор пользователя при voted. */
  votedFor?: string[]
  author?: 'me' | 'other'
  sender?: string
  avatarImage?: string
  time: string
  status?: MessageStatusType
  pinned?: boolean
  reactions?: MessageReaction[]
  comments?: number
  onVote?: (selected: string[]) => void
  onOpenComments?: () => void
}

/** Figma my-Base «BubblePollDesktop» 17198:25566: заголовок опроса, варианты, PollStatusBar, реакции, время, комментарии. */
export function PollMessage({
  question,
  options,
  anonymous = true,
  multiple = false,
  voted = false,
  votedFor = [],
  author = 'other',
  sender,
  avatarImage,
  time,
  status = 'read',
  pinned = false,
  reactions = [],
  comments,
  onVote,
  onOpenComments,
}: PollMessageProps) {
  const mine = author === 'me'
  const hasComments = comments !== undefined && comments > 0
  const [draft, setDraft] = useState<string[]>([])
  return (
    <article className={`message message--poll ${mine ? 'message--mine' : 'message--other'}`} aria-label={`Опрос, ${time}`}>
      <div className="message__row">
        {!mine && <Avatar label={sender ?? 'Участник'} image={avatarImage} />}
        <div className={`message__stack ${hasComments ? 'has-comments' : ''}`}>
          <div className="message__bubble">
            {!mine && sender && <div className="message__sender">{sender}</div>}
            <div className="poll-message__header">
              <div className="poll-message__question">{question}</div>
              <div className="poll-message__kind">{anonymous ? 'Анонимный опрос' : 'Открытый опрос'}{multiple ? ' · несколько ответов' : ''}</div>
            </div>
            <div className="poll-message__options">
              <PollList
                options={options}
                condition={voted ? 'answer' : 'question'}
                type={multiple ? 'multiple' : 'single'}
                selected={voted ? votedFor : draft}
                onSelectedChange={setDraft}
                name={`poll-${question}`}
              />
            </div>
            {voted
              ? <PollStatusBar state="text" label={anonymous ? 'Анонимный опрос' : 'Открытый опрос'} />
              : <PollStatusBar state="button" onVote={() => onVote?.(draft)} disabled={draft.length === 0} />}
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
                {mine && <MessageStatus status={status} />}
              </span>
            </div>
            {!mine && !hasComments && <img className="message__tail" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
          </div>
          {hasComments && <CommentsLink count={comments} mine={mine} onClick={onOpenComments} />}
          {!mine && hasComments && <img className="message__tail message__tail--stack" src="assets/figma/bubble-tail-incoming.svg" alt="" aria-hidden="true" />}
        </div>
      </div>
    </article>
  )
}
