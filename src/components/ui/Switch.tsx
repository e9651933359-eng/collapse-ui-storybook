import type { ButtonHTMLAttributes } from 'react'

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  selected: boolean
  label: string
  onChange?: (selected: boolean) => void
  pressed?: boolean
  hovered?: boolean
  /** s — компактный размер (40×28), техническое допущение, Figma описывает только m (52×28). Ревью 09.11.2026. */
  size?: 's' | 'm'
}

export function Switch({ selected, label, onChange, pressed = false, hovered = false, size = 'm', className = '', type = 'button', ...props }: SwitchProps) {
  return (
    <button
      className={`collapse-switch collapse-switch--${size} ${selected ? 'is-on' : ''} ${pressed ? 'is-pressed' : ''} ${hovered ? 'is-hovered' : ''} ${className}`}
      type={type}
      role="switch"
      aria-checked={selected}
      aria-label={label}
      {...props}
      onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented) onChange?.(!selected) }}
    >
      <span aria-hidden="true" />
    </button>
  )
}
