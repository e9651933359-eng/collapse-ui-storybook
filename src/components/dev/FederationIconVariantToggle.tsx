import { useEffect, useState } from 'react'

const STORAGE_KEY = 'collapse-fed-icon-variant'
type Variant = 'tile' | 'bare'

function readVariant(): Variant {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'bare' ? 'bare' : 'tile'
  } catch {
    return 'tile'
  }
}

/**
 * Временный переключатель для сравнения двух вариантов компактной (12px) иконки
 * Федерации: A — тайл на светлом оранжевом фоне, B — без фона. Применяется сразу
 * в обоих местах продукта (строка списка чатов и строка отправителя сообщения)
 * через CSS-атрибут data-fed-icon-variant на <html>. Удалить после выбора варианта.
 */
export function FederationIconVariantToggle() {
  const [variant, setVariant] = useState<Variant>(() => readVariant())

  useEffect(() => {
    document.documentElement.setAttribute('data-fed-icon-variant', variant)
    try {
      window.localStorage.setItem(STORAGE_KEY, variant)
    } catch {
      // игнорируем — не критично для сравнения вариантов
    }
  }, [variant])

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 9999,
        display: 'flex',
        gap: 4,
        padding: 4,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,.18)',
        fontFamily: 'inherit',
      }}
    >
      {(['tile', 'bare'] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setVariant(value)}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            background: variant === value ? '#e94a24' : 'transparent',
            color: variant === value ? '#fff' : '#1a1a1a',
            fontWeight: variant === value ? 600 : 400,
          }}
        >
          {value === 'tile' ? 'A: с фоном' : 'B: без фона'}
        </button>
      ))}
    </div>
  )
}
