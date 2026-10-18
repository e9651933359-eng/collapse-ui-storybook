import { TextButton } from '../../../components/ui/TextButton'
import './message-parts.css'

export type PollStatusBarProps = {
  /** text — пояснение (опрос завершён, голос принят); button — действие «Голосовать». */
  state?: 'text' | 'button'
  label?: string
  onVote?: () => void
  disabled?: boolean
}

/** Figma my-Base «PollStatusBar» 18791:34863: States Text | Button. Высота 40px. */
export function PollStatusBar({ state = 'text', label, onVote, disabled = false }: PollStatusBarProps) {
  if (state === 'button') {
    return <div className="poll-status poll-status--button"><TextButton tone="base" onClick={onVote} disabled={disabled}>{label ?? 'Голосовать'}</TextButton></div>
  }
  return <div className="poll-status poll-status--text"><span>{label ?? 'Анонимный опрос'}</span></div>
}
