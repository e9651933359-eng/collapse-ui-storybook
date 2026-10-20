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

/* Два варианта компактной (12px) плашки Федерации на согласование: A — тайл на светлом оранжевом фоне, B — иконка без фона. Применены к тем же местам, что в продукте: строка списка чатов и строка отправителя в сообщении. */
export const CompactComparisonTile: Story = {
  name: 'Сравнение / A — тайл 20×20, иконка 12',
  render: () => (
    <div className="ui-story-row" style={{ alignItems: 'center', gap: 12 }}>
      <span className="collapse-federation-tile"><FederationIcon size="xxs" aria-label="Федеративный чат" /></span>
      <span style={{ fontSize: 14 }}>Запуск общего продукта</span>
    </div>
  ),
}
export const CompactComparisonBare: Story = {
  name: 'Сравнение / B — без фона, иконка 12',
  render: () => (
    <div className="ui-story-row" style={{ alignItems: 'center', gap: 12 }}>
      <FederationIcon size="xxs" aria-label="Федеративный чат" />
      <span style={{ fontSize: 14 }}>Запуск общего продукта</span>
    </div>
  ),
}
