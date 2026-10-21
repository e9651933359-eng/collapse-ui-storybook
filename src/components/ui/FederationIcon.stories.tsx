import type { Meta, StoryObj } from '@storybook/react-vite'
import { FederationIcon } from './FederationIcon'

const meta = {
  title: 'UI/FederationIcon',
  component: FederationIcon,
  args: { 'aria-label': 'Федерация' },
} satisfies Meta<typeof FederationIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 's' } }
export const ExtraSmall: Story = { args: { size: 'xs' } }

/* Компактная (12px) иконка Федерации без фона — итоговый вариант, выбран пользователем 21.10.2026 по сравнению A (тайл на фоне) / B (без фона). Используется единообразно во всех местах продукта: строка списка чатов (FederationBadge), строка отправителя и заголовок чата (FederationLabel с compact). */
export const Compact: Story = {
  name: 'Компактная (12px), как в продукте',
  render: () => (
    <div className="ui-story-row" style={{ alignItems: 'center', gap: 6 }}>
      <FederationIcon size="xxs" aria-label="Федеративный чат" />
      <span style={{ fontSize: 14 }}>Запуск общего продукта</span>
    </div>
  ),
}
