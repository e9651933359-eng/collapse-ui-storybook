import { FederationIcon } from './FederationIcon'

type FederationBadgeProps = {
  label?: string
}

/**
 * Компактный (12px) индикатор Федерации — единый вид без фона-плашки
 * (вариант B из сравнения 20.10.2026, зафиксирован пользователем 21.10.2026).
 * Используется везде, где отмечается федеративный чат: строка списка, строка
 * отправителя, заголовок чата — размер и вид должны совпадать во всех местах.
 */
export function FederationBadge({ label = 'Федеративный чат' }: FederationBadgeProps) {
  return <FederationIcon size="xxs" aria-label={label} />
}
