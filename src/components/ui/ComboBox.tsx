import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'

export type ComboBoxOption = {
  value: string
  label: string
  supporting?: string
}

type ComboBoxProps = {
  ariaLabel: string
  className?: string
  defaultOpen?: boolean
  onChange?: (value: string) => void
  options: ComboBoxOption[]
  /** Без этого пропа ориентация меню определяется автоматически по месту во вьюпорте при каждом открытии (вниз по умолчанию, вверх — только если снизу не хватает места). Передавайте явное значение только когда нужно принудительно закрепить сторону. */
  placement?: 'top' | 'bottom'
  value: string
}

/** Зазор между полем и меню — паритет с --collapse-spacing-horizontal-xs (4px), которым раньше задавался top/bottom в CSS. */
const menuGap = 4

export function ComboBox({
  ariaLabel,
  className = '',
  defaultOpen = false,
  onChange,
  options,
  placement,
  value,
}: ComboBoxProps) {
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(defaultOpen)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [autoPlacement, setAutoPlacement] = useState<'top' | 'bottom'>('bottom')
  const resolvedPlacement = placement ?? autoPlacement
  const selected = options.find((option) => option.value === value) ?? options[0]
  // Меню рендерится через портал в document.body и позиционируется как fixed — иначе его обрезает
  // overflow: hidden и скролл родительской модалки (например, FolderManagementModal). Ревью 09.11.2026.
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(null)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      // Меню теперь в портале (document.body), а не внутри rootRef — проверяем оба узла.
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [open])

  // Проход 1: пока высота меню не известна, ставим его временно под полем во viewport-координатах
  // (портал рендерит его в document.body, поэтому position: fixed по getBoundingClientRect).
  useLayoutEffect(() => {
    if (!open) { setMenuPosition(null); return }
    if (!rootRef.current) return
    const fieldRect = rootRef.current.getBoundingClientRect()
    setMenuPosition((prev) => prev ?? { top: fieldRect.bottom + menuGap, left: fieldRect.left, width: fieldRect.width })
  }, [open])

  // Проход 2: меню уже отрисовано на временной позиции — меряем его реальную высоту и выбираем
  // ориентацию (вниз по умолчанию, вверх — только если снизу во viewport не хватает места), затем
  // пересчитываем точную позицию. Повторяется при скролле/ресайзе, пока меню открыто — это и снимает
  // обрезание выпадающего списка краем модалки (ревью 09.11.2026, см. docs/design-system/BASE.md).
  useEffect(() => {
    if (!open || !menuPosition) return
    const updatePosition = () => {
      if (!rootRef.current || !menuRef.current) return
      const fieldRect = rootRef.current.getBoundingClientRect()
      const menuHeight = menuRef.current.offsetHeight
      let vertical: 'top' | 'bottom' = placement ?? 'bottom'
      if (!placement) {
        const spaceBelow = window.innerHeight - fieldRect.bottom
        const spaceAbove = fieldRect.top
        vertical = spaceBelow >= menuHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top'
        setAutoPlacement(vertical)
      }
      const nextTop = vertical === 'bottom' ? fieldRect.bottom + menuGap : fieldRect.top - menuHeight - menuGap
      setMenuPosition((prev) => (prev && prev.top === nextTop && prev.left === fieldRect.left && prev.width === fieldRect.width
        ? prev
        : { top: nextTop, left: fieldRect.left, width: fieldRect.width }))
    }
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, placement, options.length, Boolean(menuPosition)])

  const selectOption = (option: ComboBoxOption) => {
    onChange?.(option.value)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (options.length === 0) return
      setOpen(true)
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setHighlightedIndex((current) => (current + direction + options.length) % options.length)
      return
    }

    if (event.key === 'Enter' && open && options[highlightedIndex]) {
      event.preventDefault()
      selectOption(options[highlightedIndex])
    }
  }

  return (
    <div ref={rootRef} className={`combo-box ${open ? 'is-active' : ''} ${className}`}>
      <button
        className="combo-box__field"
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className="combo-box__value">{selected?.label}</span>
        <span className="combo-box__action" aria-hidden="true">
          <img src="assets/figma/ic-chevron-down-combobox.svg" alt="" />
        </span>
      </button>

      {open && menuPosition && createPortal(
        <div
          ref={menuRef}
          id={listboxId}
          className={`combo-box__menu combo-box__menu--${resolvedPlacement}`}
          role="listbox"
          aria-label={ariaLabel}
          style={{ position: 'fixed', top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`combo-box__option ${index === highlightedIndex ? 'is-highlighted' : ''}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(option)}
            >
              <span className="combo-box__option-copy">
                <span>{option.label}</span>
                {option.supporting && <small>{option.supporting}</small>}
              </span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  )
}
