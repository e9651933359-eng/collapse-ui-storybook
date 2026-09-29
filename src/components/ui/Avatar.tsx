import type { CSSProperties } from 'react'

export type AvatarColor = 'default' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type AvatarProps = {
  label: string
  image?: string
  /** Палитра Figma Avatar Color: default, 1–8. Фон и цвет текста зависят от filled. */
  color?: AvatarColor
  /** Произвольный фон (совместимость: градиенты и служебные цвета). Перекрывает color. */
  tone?: string
  size?: 28 | 40 | 44 | 124
  emoji?: string
  filled?: boolean
  shape?: 'round' | 'squircle'
  status?: 'online' | 'offline' | 'busy'
  uploader?: boolean
}

export function Avatar({ label, image, color = 'default', tone, size = 40, emoji, filled = true, shape = 'round', status, uploader = false }: AvatarProps) {
  return (
    <span
      className={`avatar avatar--${shape} avatar--size-${size} ${color === 'default' ? '' : `avatar--color-${color}`} ${image ? 'avatar--image' : filled ? 'avatar--filled' : 'avatar--unfilled'}`}
      style={{ '--avatar-tone': tone } as CSSProperties}
      aria-label={label}
      role="img"
    >
      {image ? <img src={image} alt="" /> : emoji ?? label.slice(0, 2).toUpperCase()}
      {uploader && <span className="avatar__upload" aria-hidden="true">+</span>}
      {status && <span className={`avatar__status avatar__status--${status}`} aria-label={status} />}
    </span>
  )
}
