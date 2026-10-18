import { Info, Phone } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { IconButton } from '../../../components/ui/IconButton'
import './message-parts.css'

export type CallMessageState = 'ended' | 'started'

export type CallMessageProps = {
  /** ended — «Завершён (…)» с иконкой и кнопкой информации; started — «Начался» с кнопкой присоединения. */
  state?: CallMessageState
  /** Раскладка кнопки для started: рядом с текстом или под ним. */
  layout?: 'horizontal' | 'vertical'
  title?: string
  /** Для ended — длительность, для started — «Начался». */
  description?: string
  joinLabel?: string
  onJoin?: () => void
  onInfo?: () => void
}

/** Figma my-Base «Call» 11696:71972: Call is over / Call start (Horizontally) / Vertically. Содержимое бабла звонка. */
export function CallMessage({
  state = 'ended',
  layout = 'horizontal',
  title = 'Исходящий звонок',
  description,
  joinLabel = 'Присоединиться',
  onJoin,
  onInfo,
}: CallMessageProps) {
  const text = description ?? (state === 'ended' ? 'Завершён (1 ч. 20 мин. 46 сек.)' : 'Начался')
  return (
    <div className={`call-message call-message--${state} ${state === 'started' ? `call-message--${layout}` : ''}`}>
      {state === 'ended' && <span className="call-message__icon" aria-hidden="true"><Phone /></span>}
      <div className="call-message__text">
        <span className="call-message__title">{title}</span>
        <span className="call-message__description">{text}</span>
      </div>
      {state === 'ended'
        ? <IconButton size="s" label="Информация о звонке" icon={<Info />} onClick={onInfo} />
        : <Button intent="success" onClick={onJoin}>{joinLabel}</Button>}
    </div>
  )
}
