import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './feedback.css'

/**
 * `top-*`/`bottom-*` — направление зафиксировано вызывающим кодом (например, панель у нижнего края
 * композера всегда открывается вверх). `auto-*` — вертикаль подбирается по месту во вьюпорте
 * (вниз по умолчанию, вверх только если снизу не хватает места); горизонтальное выравнивание (`start`/`end`)
 * остаётся фиксированным. Используй `auto-*` там, где элемент-триггер может оказаться у любого края
 * прокручиваемого списка (строка файла в ленте сообщений и т.п.).
 */
export type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto-start' | 'auto-end'

type PopoverProps = {
  children: ReactNode
  contentClassName?: string
  content: ReactNode
  defaultOpen?: boolean
  gap?: 'default' | 'clear'
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: PopoverPlacement
}

export function Popover({ children, contentClassName = '', content, defaultOpen = false, gap = 'default', onOpenChange, open, placement = 'bottom-start' }: PopoverProps) {
  const id = useId()
  const rootRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [autoVertical, setAutoVertical] = useState<'top' | 'bottom'>('bottom')
  const isOpen = open ?? internalOpen
  const isAuto = placement === 'auto-start' || placement === 'auto-end'
  const resolvedPlacement = isAuto ? `${autoVertical}-${placement === 'auto-start' ? 'start' : 'end'}` : placement

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!isOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen || !isAuto || !rootRef.current || !panelRef.current) return
    const triggerRect = rootRef.current.getBoundingClientRect()
    const panelHeight = panelRef.current.offsetHeight
    const spaceBelow = window.innerHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top
    setAutoVertical(spaceBelow >= panelHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top')
  }, [isOpen, isAuto])

  return (
    <span ref={rootRef} className="collapse-popover-trigger">
      <span
        className="collapse-popover-trigger__control"
        aria-controls={isOpen ? id : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setOpen(!isOpen)}
        onKeyDownCapture={(event) => {
          if (event.key === 'Escape') setOpen(false)
          if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
            event.preventDefault()
            setOpen(!isOpen)
          }
        }}
      >{children}</span>
      {isOpen && (
        <div
          ref={panelRef}
          id={id}
          className={`collapse-popover collapse-popover--${resolvedPlacement} collapse-popover--gap-${gap} ${contentClassName}`}
          role="dialog"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              const focusTarget = rootRef.current?.querySelector<HTMLElement>('button,[href],[tabindex="0"]')
              focusTarget?.focus()
            }
          }}
        >{content}</div>
      )}
    </span>
  )
}
