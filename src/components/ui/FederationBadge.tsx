import { FederationIcon } from './FederationIcon'

type FederationBadgeProps = {
  label?: string
}

/**
 * Компактный (12px) индикатор Федерации для строки списка чатов и строки отправителя.
 * Внешний вид (плашка на светлом фоне / без фона) переключается глобально через
 * data-fed-icon-variant на <html> — см. FederationIconVariantToggle в src/App.tsx.
 * Техническое допущение на время сравнения вариантов (20.10.2026), после выбора
 * переключатель убирается и остаётся один вариант.
 */
export function FederationBadge({ label = 'Федеративный чат' }: FederationBadgeProps) {
  return (
    <span className="collapse-federation-tile">
      <FederationIcon size="xxs" aria-label={label} />
    </span>
  )
}
