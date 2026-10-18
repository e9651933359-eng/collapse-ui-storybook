import { ArrowDown, ArrowUp, X } from 'lucide-react'
import './message-parts.css'

export type MediaButtonType = 'loading' | 'download' | 'send'

export type MediaButtonProps = {
  /** loading — отмена загрузки/скачивания (× и кольцо прогресса); download — скачать; send — отправить. */
  type?: MediaButtonType
  size?: 'large' | 'medium'
  /** default — тёмная плашка поверх изображения; accent — фирменная заливка. */
  background?: 'default' | 'accent'
  onClick?: () => void
  label?: string
  /** Состояние hover для документации; в интерфейсе работает :hover. */
  hovered?: boolean
}

const defaultLabels: Record<MediaButtonType, string> = { loading: 'Отменить загрузку', download: 'Скачать', send: 'Отправить' }

/** Figma my-Base «Buttons (media)» Large 10092:125388 и Medium 10092:125424: Type × Background × Hover. */
export function MediaButton({ type = 'download', size = 'large', background = 'default', onClick, label, hovered = false }: MediaButtonProps) {
  const Icon = type === 'loading' ? X : type === 'download' ? ArrowDown : ArrowUp
  return (
    <button
      type="button"
      className={`media-button media-button--${size} media-button--${background} ${type === 'loading' ? 'is-loading' : ''} ${hovered ? 'is-hovered' : ''}`}
      aria-label={label ?? defaultLabels[type]}
      aria-busy={type === 'loading' || undefined}
      onClick={onClick}
    >
      {type === 'loading' && <span className="media-button__ring" aria-hidden="true" />}
      <Icon aria-hidden="true" />
    </button>
  )
}
