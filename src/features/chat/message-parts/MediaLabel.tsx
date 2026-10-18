import { CircleAlert } from 'lucide-react'
import './message-parts.css'

export type MediaLabelProps = {
  /** default — размер файла; loading — «загружено / всего»; error — «Ошибка». */
  condition?: 'default' | 'loading' | 'error'
  children?: string
}

const defaults = { default: '0.0 MB', loading: '0.0 MB / 0.0 MB', error: 'Ошибка' } as const

/** Figma my-Base «Label (media)» 10098:69404. Размеры файла показываем с одним знаком после точки: 000.0 MB / GB. */
export function MediaLabel({ condition = 'default', children }: MediaLabelProps) {
  return (
    <span className={`media-label media-label--${condition}`}>
      {condition === 'error' && <CircleAlert aria-hidden="true" />}
      <span>{children ?? defaults[condition]}</span>
    </span>
  )
}
